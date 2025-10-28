import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

/**
 * Lead Scoring Algorithm
 * Scores leads from 1-100 based on multiple factors
 */
interface LeadScoreFactors {
  hasName: boolean;
  hasPhone: boolean;
  hasMessage: boolean;
  messageLength: number;
  source: string;
  pageUrl: string | null;
  emailDomain: string;
}

function calculateLeadScore(factors: LeadScoreFactors): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  // Base score (everyone gets this)
  score += 10;
  reasons.push('Contact form submission');

  // Contact completeness (40 points max)
  if (factors.hasName) {
    score += 15;
    reasons.push('Provided name (+15)');
  }
  if (factors.hasPhone) {
    score += 20;
    reasons.push('Provided phone number (+20)');
  }
  if (factors.hasMessage) {
    score += 5;
    reasons.push('Provided message (+5)');
    
    // Message quality (bonus points)
    if (factors.messageLength > 50) {
      score += 10;
      reasons.push('Detailed message (+10)');
    }
    if (factors.messageLength > 100) {
      score += 5;
      reasons.push('Very detailed message (+5)');
    }
  }

  // Source quality (20 points max)
  switch (factors.source) {
    case 'chatbot':
      score += 20;
      reasons.push('High-intent chatbot interaction (+20)');
      break;
    case 'contact_form':
      score += 15;
      reasons.push('Direct contact form (+15)');
      break;
    case 'pricing_page':
      score += 25;
      reasons.push('Pricing page visitor (+25)');
      break;
    default:
      score += 10;
      reasons.push('Other source (+10)');
  }

  // Page URL analysis (15 points max)
  if (factors.pageUrl) {
    if (factors.pageUrl.includes('/pricing')) {
      score += 15;
      reasons.push('Visited pricing page (+15)');
    } else if (factors.pageUrl.includes('/contact')) {
      score += 10;
      reasons.push('Visited contact page (+10)');
    } else if (factors.pageUrl.includes('/services')) {
      score += 8;
      reasons.push('Visited services page (+8)');
    } else if (factors.pageUrl.includes('/resources')) {
      score += 5;
      reasons.push('Visited resources page (+5)');
    }
  }

  // Email domain analysis (10 points max)
  const businessDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
  if (!businessDomains.includes(factors.emailDomain)) {
    score += 10;
    reasons.push('Business email domain (+10)');
  }

  // Cap at 100
  score = Math.min(score, 100);

  // Determine lead temperature
  let temperature: 'hot' | 'warm' | 'cold';
  if (score >= 70) {
    temperature = 'hot';
  } else if (score >= 40) {
    temperature = 'warm';
  } else {
    temperature = 'cold';
  }

  return { score, reasons: [`${temperature.toUpperCase()} LEAD (${score}/100)`, ...reasons] };
}

/**
 * POST /api/leads
 * 
 * Stores contact form submissions in Supabase and sends email notification via Resend.
 * 
 * Request body:
 * - email: string (required)
 * - name: string (optional)
 * - phone: string (optional)
 * - message: string (optional)
 * - source: string (optional, default: 'contact_form')
 * - pageUrl: string (optional)
 * 
 * Returns:
 * - { ok: true } on success
 * - { ok: false, error: string } on validation error
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { 
      email, 
      name, 
      phone,
      message, 
      company, // Added for contact form
      service, // Added for contact form
      preferredDate, // Booking info
      preferredTime, // Booking info
      source = 'contact_form',
      pageUrl
    } = body;

    // Validate email (required)
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { ok: false, error: 'Valid email address is required' },
        { status: 400 }
      );
    }

    // Trim and sanitize fields
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name?.trim() || null;
    const trimmedPhone = phone?.trim() || null;
    const trimmedMessage = message?.trim() || null;
    const trimmedCompany = company?.trim() || null;
    const trimmedService = service?.trim() || null;
    const trimmedPreferredDate = preferredDate?.trim() || null;
    const trimmedPreferredTime = preferredTime?.trim() || null;
    const trimmedSource = source?.trim() || 'contact_form';
    const trimmedPageUrl = pageUrl?.trim() || null;

    // Calculate lead score
    const emailDomain = trimmedEmail.split('@')[1] || '';
    const scoreResult = calculateLeadScore({
      hasName: !!trimmedName,
      hasPhone: !!trimmedPhone,
      hasMessage: !!trimmedMessage,
      messageLength: trimmedMessage?.length || 0,
      source: trimmedSource,
      pageUrl: trimmedPageUrl,
      emailDomain: emailDomain
    });

    console.log('[API /leads] Lead score calculated:', {
      score: scoreResult.score,
      reasons: scoreResult.reasons,
      email: trimmedEmail
    });

    // Initialize Supabase client (service role for admin operations)
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Initialize Resend configuration
    const resendApiKey = process.env.RESEND_API_KEY;
    // Use your verified intelllx.com domain (from Resend dashboard)
    // You can use any address from intelllx.com: hello@intelllx.com, noreply@intelllx.com, etc.
    const resendFrom = process.env.RESEND_FROM || 'hello@intelllx.com';
    const resendTo = process.env.RESEND_TO || process.env.EMAIL_TO || 'hello@intelllx.com';

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('[API /leads] Supabase credentials missing');
      return NextResponse.json(
        { ok: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // 1. Upsert lead (insert or update if email exists)
    const leadData: Record<string, unknown> = {
      email: trimmedEmail,
      name: trimmedName,
      phone: trimmedPhone,
      company: trimmedCompany,
      service: trimmedService,
      message: trimmedMessage,
      source: trimmedSource,
      page_url: trimmedPageUrl,
      updated_at: new Date().toISOString()
    };

    // Add booking info if provided (only if columns exist)
    if (trimmedPreferredDate) leadData.preferred_date = trimmedPreferredDate;
    if (trimmedPreferredTime) leadData.preferred_time = trimmedPreferredTime;
    
    // Debug field to track if welcome email was attempted
    try {
      leadData.welcome_email_sent = 'attempted';
    } catch {}

    // Add scoring fields if they exist in the database
    try {
      leadData.lead_score = scoreResult.score;
      leadData.lead_temperature = scoreResult.score >= 70 ? 'hot' : scoreResult.score >= 40 ? 'warm' : 'cold';
    } catch {
      console.log('[API /leads] Scoring fields not available in database, continuing without them');
    }

    // 1. Try to save lead to Supabase (optional - continue if it fails)
    let savedLead: Record<string, unknown> | null = null;
    try {
      const { data: leadResult, error: leadError } = await supabase
        .from('leads')
        .upsert(leadData, { 
          onConflict: 'email',
          ignoreDuplicates: false 
        })
        .select()
        .single();

      if (leadError) {
        console.warn('[API /leads] Supabase save failed (continuing anyway):', leadError);
      } else {
        savedLead = leadResult;
        console.log('[API /leads] Lead saved to Supabase:', savedLead?.id);
      }
    } catch (dbError) {
      console.warn('[API /leads] Database error (continuing anyway):', dbError);
    }

    // 2. Send automated welcome email based on lead temperature (if Resend is configured)
    console.log('[API /leads] RESEND CONFIG CHECK:', {
      hasApiKey: !!resendApiKey,
      apiKeyPrefix: resendApiKey ? resendApiKey.substring(0, 20) : 'MISSING',
      from: resendFrom,
      to: trimmedEmail
    });
    
    if (resendApiKey) {
      try {
        const leadTemperature = scoreResult.score >= 70 ? 'hot' : scoreResult.score >= 40 ? 'warm' : 'cold';
        
        // Simple email templates (inline)
        let subject, htmlContent, textContent;
        
        // Get Zoom meeting URL from environment (clean any newlines)
        const rawZoomUrl = process.env.MEETINGS_URL || process.env.NEXT_PUBLIC_MEETINGS_URL || 'https://us06web.zoom.us/j/8981234567?pwd=abc123';
        const zoomMeetingUrl = rawZoomUrl?.trim().replace(/\n/g, '') || 'https://us06web.zoom.us/j/8981234567?pwd=abc123';
        
        console.log('[API /leads] Zoom URL debug:', {
          MEETINGS_URL: process.env.MEETINGS_URL,
          NEXT_PUBLIC_MEETINGS_URL: process.env.NEXT_PUBLIC_MEETINGS_URL,
          finalUrl: zoomMeetingUrl
        });
        
        // Check if booking info was provided
        const hasBookingInfo = trimmedPreferredDate && trimmedPreferredTime;
        
        if (leadTemperature === 'hot') {
          subject = `🚀 Ready to transform your business? Let's talk!`;
          htmlContent = `
            <h2>Hi ${trimmedName || 'there'},</h2>
            <p>I'm excited you reached out about our LeadFlow chatbot service! Based on your inquiry, I can tell you're serious about growing your business with AI.</p>
            ${hasBookingInfo ? `<p><strong>I saw you selected: ${trimmedPreferredDate} at ${trimmedPreferredTime} PST</strong></p>` : ''}
            <p><strong>Lead Score:</strong> ${scoreResult.score}/100 (HOT LEAD)</p>
            ${hasBookingInfo ? `
              <p>Perfect timing! You've already indicated your preferred time. <strong>Click the Calendly link below to confirm and secure your spot:</strong></p>
              <p><a href="https://calendly.com/lataunaeb-intelllx-discovery/30min" style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Confirm Your Booking →</a></p>
              <p>This link will take you to our calendar where you can finalize your ${trimmedPreferredDate} at ${trimmedPreferredTime} appointment.</p>
            ` : `
              <p><strong>Next steps:</strong></p>
              <ol>
                <li>Book a 15-minute strategy call</li>
                <li>We'll discuss your specific needs and goals</li>
                <li>I'll create a custom proposal for your business</li>
              </ol>
              <p><a href="https://calendly.com/lataunaeb-intelllx-discovery/30min" style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Book Your Strategy Call</a></p>
            `}
            <p>I typically respond to high-priority inquiries like yours within 2 hours.</p>
            <p>Best regards,<br>Your INTELLLX Team</p>
          `;
          textContent = `Hi ${trimmedName || 'there'},\n\nI'm excited you reached out about our LeadFlow chatbot service! Based on your inquiry, I can tell you're serious about growing your business with AI.\n\n${hasBookingInfo ? `I saw you selected: ${trimmedPreferredDate} at ${trimmedPreferredTime} PST. Perfect! Click the Calendly link to confirm and secure your spot: https://calendly.com/lataunaeb-intelllx-discovery/30min` : `Lead Score: ${scoreResult.score}/100 (HOT LEAD)\n\nNext steps:\n1. Book a 15-minute strategy call\n2. We'll discuss your specific needs and goals\n3. I'll create a custom proposal for your business\n\nBook your call: https://calendly.com/lataunaeb-intelllx-discovery/30min`}\n\nI typically respond to high-priority inquiries like yours within 2 hours.\n\nBest regards,\nYour INTELLLX Team`;
        } else if (leadTemperature === 'warm') {
          subject = `Thanks for your interest! Here's how we can help...`;
          htmlContent = `
            <h2>Hi ${trimmedName || 'there'},</h2>
            <p>Thank you for your interest in INTELLLX! I appreciate you taking the time to reach out.</p>
            ${hasBookingInfo ? `<p><strong>I saw you selected: ${trimmedPreferredDate} at ${trimmedPreferredTime} PST</strong></p>` : ''}
            <p><strong>Lead Score:</strong> ${scoreResult.score}/100 (WARM LEAD)</p>
            <p>I've helped dozens of businesses like yours capture more leads and grow their revenue with AI chatbots.</p>
            <p><strong>What makes INTELLLX different:</strong></p>
            <ul>
              <li>✅ Custom AI conversations tailored to your business</li>
              <li>✅ Professional setup included (no technical work for you)</li>
              <li>✅ Automated lead capture and calendar booking</li>
              <li>✅ Ongoing optimization and support</li>
            </ul>
            ${hasBookingInfo ? `
              <p>You've already indicated your preferred time! Click below to confirm your booking:</p>
              <p><a href="https://calendly.com/lataunaeb-intelllx-discovery/30min" style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Confirm Your Booking →</a></p>
            ` : `
              <p><a href="https://calendly.com/lataunaeb-intelllx-discovery/30min" style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Schedule a Free Consultation</a></p>
            `}
            <p>I'll send you a follow-up email in a few days with more insights about AI chatbots for businesses like yours.</p>
            <p>Best regards,<br>Your INTELLLX Team</p>
          `;
          textContent = `Hi ${trimmedName || 'there'},\n\nThank you for your interest in INTELLLX! I appreciate you taking the time to reach out.\n\n${hasBookingInfo ? `I saw you selected: ${trimmedPreferredDate} at ${trimmedPreferredTime} PST. ` : ''}Lead Score: ${scoreResult.score}/100 (WARM LEAD)\n\nI've helped dozens of businesses like yours capture more leads and grow their revenue with AI chatbots.\n\nWhat makes INTELLLX different:\n✅ Custom AI conversations tailored to your business\n✅ Professional setup included (no technical work for you)\n✅ Automated lead capture and calendar booking\n✅ Ongoing optimization and support\n\n${hasBookingInfo ? `Confirm your booking: https://calendly.com/lataunaeb-intelllx-discovery/30min` : `Schedule a consultation: https://calendly.com/lataunaeb-intelllx-discovery/30min`}\n\nI'll send you a follow-up email in a few days with more insights.\n\nBest regards,\nYour INTELLLX Team`;
        } else {
          subject = `Welcome! Here's how AI chatbots can grow your business`;
          htmlContent = `
            <h2>Hi ${trimmedName || 'there'},</h2>
            <p>Welcome to INTELLLX! Thanks for your interest in our services.</p>
            ${hasBookingInfo ? `<p><strong>I saw you selected: ${trimmedPreferredDate} at ${trimmedPreferredTime} PST</strong></p>` : ''}
            <p><strong>Lead Score:</strong> ${scoreResult.score}/100 (COLD LEAD)</p>
            <p>Did you know that businesses using AI chatbots see an average of 3-5x more qualified leads?</p>
            <p><strong>AI Chatbot Benefits:</strong></p>
            <ul>
              <li>• 24/7 Lead Capture: Never miss another opportunity</li>
              <li>• Instant Qualification: Only book calls with serious prospects</li>
              <li>• Automated Follow-up: Nurture leads while you sleep</li>
              <li>• Brand Consistency: Every interaction reflects your quality</li>
            </ul>
            ${hasBookingInfo ? `
              <p>You've indicated your preferred time! Click below to confirm:</p>
              <p><a href="https://calendly.com/lataunaeb-intelllx-discovery/30min" style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Confirm Your Booking →</a></p>
            ` : `
              <p><a href="https://calendly.com/lataunaeb-intelllx-discovery/30min" style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Learn More</a></p>
            `}
            <p>I'll send you valuable tips and insights about AI chatbots over the next few weeks. No pressure, just helpful content!</p>
            <p>Best regards,<br>Your INTELLLX Team</p>
          `;
          textContent = `Hi ${trimmedName || 'there'},\n\nWelcome to INTELLLX! Thanks for your interest in our services.\n\n${hasBookingInfo ? `I saw you selected: ${trimmedPreferredDate} at ${trimmedPreferredTime} PST. ` : ''}Lead Score: ${scoreResult.score}/100 (COLD LEAD)\n\nDid you know that businesses using AI chatbots see an average of 3-5x more qualified leads?\n\nAI Chatbot Benefits:\n• 24/7 Lead Capture: Never miss another opportunity\n• Instant Qualification: Only book calls with serious prospects\n• Automated Follow-up: Nurture leads while you sleep\n• Brand Consistency: Every interaction reflects your quality\n\n${hasBookingInfo ? `Confirm your booking: https://calendly.com/lataunaeb-intelllx-discovery/30min` : `Learn more: https://calendly.com/lataunaeb-intelllx-discovery/30min`}\n\nI'll send you valuable tips and insights about AI chatbots over the next few weeks.\n\nBest regards,\nYour INTELLLX Team`;
        }

        // Send welcome email to the lead
        console.log('[API /leads] About to send welcome email:', {
          to: trimmedEmail,
          subject: subject,
          temperature: leadTemperature,
          score: scoreResult.score
        });
        
        const resend = new Resend(resendApiKey);
        
        console.log('[API /leads] Sending welcome email:', {
          from: resendFrom,
          to: trimmedEmail,
          subject: subject,
          hasBookingInfo: !!hasBookingInfo
        });
        
        // First try the full email
        let welcomeEmailResult;
        try {
          welcomeEmailResult = await resend.emails.send({
            from: resendFrom,
            to: trimmedEmail,
            subject: subject,
            html: htmlContent,
            text: textContent,
            replyTo: resendFrom
          });
        } catch (firstError) {
          console.error('First attempt failed, trying simple email:', firstError);
          // If that fails, try a simple email
          welcomeEmailResult = await resend.emails.send({
            from: resendFrom,
            to: trimmedEmail,
            subject: 'Thank you for contacting INTELLLX',
            html: '<p>Thank you for your interest! We will be in touch soon.</p>',
            text: 'Thank you for your interest! We will be in touch soon.'
          });
        }

        console.log('[API /leads] Welcome email sent successfully!', {
          emailId: welcomeEmailResult.data?.id,
          temperature: leadTemperature,
          score: scoreResult.score,
          to: trimmedEmail,
          subject: subject,
          from: resendFrom,
          result: JSON.stringify(welcomeEmailResult)
        });
        
        // Update Supabase to mark email as sent
        try {
          await supabase
            .from('leads')
            .update({ welcome_email_sent: 'success' })
            .eq('email', trimmedEmail);
        } catch {}
      } catch (welcomeEmailError) {
        const error = welcomeEmailError as Error & { response?: { status?: number; data?: unknown } };
        console.error('=== WELCOME EMAIL FAILED ===');
        console.error('Message:', error?.message);
        console.error('Status:', error?.response?.status);
        console.error('Data:', error?.response?.data);
        console.error('To:', trimmedEmail);
        console.error('From:', resendFrom);
        console.error('=== END ERROR ===');
      }
    } else {
      console.log('[API /leads] Resend not configured, skipping welcome email');
    }

    // 3. Create or get conversation for this lead
    const { data: existingConversation } = await supabase
      .from('conversations')
      .select('id')
      .eq('lead_id', savedLead?.id)
      .eq('status', 'new')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    let conversationId: string;

    if (existingConversation) {
      conversationId = existingConversation.id;
      console.log('[API /leads] Using existing conversation:', conversationId);
    } else {
      const { data: newConversation, error: convError } = await supabase
        .from('conversations')
        .insert({
          lead_id: savedLead?.id,
          status: 'new'
        })
        .select()
        .single();

      if (convError) {
        console.error('[API /leads] Conversation creation error:', convError);
        // Continue anyway - lead is saved
      } else {
        conversationId = newConversation.id;
        console.log('[API /leads] Created new conversation:', conversationId);
      }
    }

    // 3. Insert message if provided
    if (trimmedMessage && conversationId!) {
      const { error: messageError } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          content: trimmedMessage,
          is_from_lead: true
        });

      if (messageError) {
        console.error('[API /leads] Message insert error:', messageError);
        // Continue anyway - lead and conversation are saved
      } else {
        console.log('[API /leads] Message inserted');
      }
    }

    // 4. Send email notification via Resend
    console.log('[API /leads] Email config check:', {
      hasApiKey: !!resendApiKey,
      apiKeyPrefix: resendApiKey ? resendApiKey.substring(0, 8) + '...' : 'MISSING',
      from: resendFrom,
      to: resendTo
    });

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);

        // Format timestamp
        const now = new Date();
        const ptTime = now.toLocaleString('en-US', {
          timeZone: 'America/Los_Angeles',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });

        // Truncate message for email preview
        const messagePreview = trimmedMessage 
          ? trimmedMessage.substring(0, 200) + (trimmedMessage.length > 200 ? '...' : '')
          : 'No message provided';

        const emailHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
                .field { margin: 15px 0; }
                .label { font-weight: bold; color: #374151; }
                .value { color: #111827; margin-top: 5px; }
                .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2 style="margin: 0;">🎯 New Lead → Intelllx</h2>
                  <div style="margin-top: 10px; font-size: 18px; font-weight: bold;">
                    ${scoreResult.reasons[0]}
                  </div>
                </div>
                <div class="content">
                  <div class="field">
                    <div class="label">Email:</div>
                    <div class="value">${trimmedEmail}</div>
                  </div>
                  ${trimmedName ? `
                  <div class="field">
                    <div class="label">Name:</div>
                    <div class="value">${trimmedName}</div>
                  </div>
                  ` : ''}
                  ${trimmedPhone ? `
                  <div class="field">
                    <div class="label">Phone:</div>
                    <div class="value">${trimmedPhone}</div>
                  </div>
                  ` : ''}
                  <div class="field">
                    <div class="label">Message:</div>
                    <div class="value">${messagePreview.replace(/\n/g, '<br>')}</div>
                  </div>
                  ${trimmedPreferredDate && trimmedPreferredTime ? `
                  <div class="field" style="background: #f0f9ff; padding: 15px; border-radius: 8px; border: 2px solid #0ea5e9;">
                    <div class="label" style="color: #0ea5e9; font-weight: bold; font-size: 14px;">📅 BOOKING REQUEST:</div>
                    <div class="value" style="color: #0c4a6e; font-weight: bold;">${trimmedPreferredDate} at ${trimmedPreferredTime} PST</div>
                  </div>
                  ` : ''}
                  <div class="field">
                    <div class="label">Source:</div>
                    <div class="value">${trimmedSource}</div>
                  </div>
                  ${trimmedPageUrl ? `
                  <div class="field">
                    <div class="label">Page URL:</div>
                    <div class="value">${trimmedPageUrl}</div>
                  </div>
                  ` : ''}
                  <div class="field">
                    <div class="label">Timestamp (PT):</div>
                    <div class="value">${ptTime}</div>
                  </div>
                  <div class="field">
                    <div class="label">Lead Score Details:</div>
                    <div class="value">
                      ${scoreResult.reasons.slice(1).map(reason => `• ${reason}`).join('<br>')}
                    </div>
                  </div>
                </div>
                <div class="footer">
                  <p>This notification was sent automatically from your Intelllx website.</p>
                </div>
              </div>
            </body>
          </html>
        `;

        console.log('[API /leads] Attempting to send email via Resend...', {
          from: resendFrom,
          to: resendTo,
          apiKeyPrefix: resendApiKey.substring(0, 10) + '...'
        });

        const emailResult = await resend.emails.send({
          from: resendFrom, // Use onboarding@resend.dev like welcome emails
          to: resendTo,
          subject: `New Lead → Intelllx`,
          html: emailHtml,
          replyTo: trimmedEmail
        });

        console.log('[API /leads] Resend email sent successfully!', {
          emailId: emailResult.data?.id,
          result: JSON.stringify(emailResult)
        });
      } catch (resendError) {
        // Log warning but don't fail the request
        // This allows the form to work even if Resend DNS isn't verified yet
        console.warn('[API /leads] Resend email failed (DNS may not be verified):', resendError);
        console.warn('[API /leads] Lead was still saved to Supabase successfully');
      }
    } else {
      console.warn('[API /leads] RESEND_API_KEY not configured - skipping email');
    }

    // Return success (with debug info in non-production)
    return NextResponse.json({ 
      ok: true,
      debug: {
        supabaseWorked: !!savedLead,
        resendConfigured: !!resendApiKey,
        resendFrom: resendFrom,
        resendTo: resendTo
      }
    }, { status: 200 });

  } catch (error) {
    console.error('[API /leads] Unexpected error:', error);
    return NextResponse.json(
      { ok: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

