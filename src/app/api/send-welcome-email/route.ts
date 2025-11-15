import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { emailTemplates, processEmailTemplate } from '@/lib/email-templates';
import { site } from '@/config/site';

/**
 * POST /api/send-welcome-email
 * 
 * Sends automated welcome email based on lead temperature
 * 
 * Request body:
 * - email: string (required)
 * - name: string (optional)
 * - leadTemperature: 'hot' | 'warm' | 'cold' (required)
 * - leadScore: number (optional)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, leadTemperature, leadScore } = body;

    // Validate required fields
    if (!email || !leadTemperature) {
      return NextResponse.json(
        { ok: false, error: 'Email and lead temperature are required' },
        { status: 400 }
      );
    }

    // Validate lead temperature
    if (!['hot', 'warm', 'cold'].includes(leadTemperature)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid lead temperature' },
        { status: 400 }
      );
    }

    // Get Resend configuration
    const resendApiKey = process.env.RESEND_API_KEY;
    // Use your verified send.intelllx.com domain (from Resend dashboard)
    const resendFrom = process.env.RESEND_FROM || process.env.EMAIL_FROM || 'hello@send.intelllx.com';

    if (!resendApiKey) {
      console.error('[API /send-welcome-email] RESEND_API_KEY not configured');
      return NextResponse.json(
        { ok: false, error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Select template based on lead temperature
    let template;
    switch (leadTemperature) {
      case 'hot':
        template = emailTemplates.hotLead;
        break;
      case 'warm':
        template = emailTemplates.warmLead;
        break;
      case 'cold':
        template = emailTemplates.coldLead;
        break;
      default:
        template = emailTemplates.coldLead;
    }

    // Process template with variables
    const processedTemplate = processEmailTemplate(template, {
      name: name || 'there',
      calendlyLink: site.calendly,
      leadScore: leadScore?.toString() || 'N/A'
    });

    // Send email via Resend
    const resend = new Resend(resendApiKey);
    
    console.log('[API /send-welcome-email] Sending email:', {
      to: email,
      temperature: leadTemperature,
      score: leadScore,
      template: leadTemperature
    });

    const emailResult = await resend.emails.send({
      from: resendFrom,
      to: email,
      subject: processedTemplate.subject,
      html: processedTemplate.html,
      text: processedTemplate.text,
      replyTo: resendFrom
    });

    console.log('[API /send-welcome-email] Email sent successfully:', {
      emailId: emailResult.data?.id,
      to: email,
      temperature: leadTemperature
    });

    return NextResponse.json({ 
      ok: true,
      emailId: emailResult.data?.id,
      temperature: leadTemperature,
      score: leadScore
    });

  } catch (error) {
    console.error('[API /send-welcome-email] Error:', error);
    return NextResponse.json(
      { ok: false, error: 'Failed to send welcome email' },
      { status: 500 }
    );
  }
}











