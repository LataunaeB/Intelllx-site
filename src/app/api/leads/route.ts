import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

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
 * - company: string (optional)
 * - service: string (optional)
 * - preferredDate: string (optional)
 * - preferredTime: string (optional)
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
      company,
      service,
      preferredDate,
      preferredTime,
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

    // Initialize Supabase client (service role for admin operations)
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

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
      preferred_date: trimmedPreferredDate,
      preferred_time: trimmedPreferredTime,
      updated_at: new Date().toISOString()
    };
    
    
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .upsert(leadData, { 
        onConflict: 'email',
        ignoreDuplicates: false 
      })
      .select()
      .single();

    if (leadError) {
      console.error('[API /leads] Supabase lead upsert error:', leadError);
      return NextResponse.json(
        { ok: false, error: 'Failed to save lead' },
        { status: 500 }
      );
    }

    console.log('[API /leads] Lead upserted:', lead.id);

    // 2. Create or get conversation for this lead
    const { data: existingConversation } = await supabase
      .from('conversations')
      .select('id')
      .eq('lead_id', lead.id)
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
          lead_id: lead.id,
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
    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFrom =
      process.env.RESEND_FROM?.trim() ||
      process.env.EMAIL_FROM?.trim() ||
      'hello@send.intelllx.com';
    const resendTo = process.env.RESEND_TO || process.env.EMAIL_TO || 'hello@intelllx.com';

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
                  <h2 style="margin: 0;">🎯 New Lead — Intelllx</h2>
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
                  ${trimmedCompany ? `
                  <div class="field">
                    <div class="label">Company:</div>
                    <div class="value">${trimmedCompany}</div>
                  </div>
                  ` : ''}
                  ${trimmedService ? `
                  <div class="field">
                    <div class="label">Service:</div>
                    <div class="value">${trimmedService}</div>
                  </div>
                  ` : ''}
                  ${trimmedPageUrl ? `
                  <div class="field">
                    <div class="label">Page URL:</div>
                    <div class="value">${trimmedPageUrl}</div>
                  </div>
                  ` : ''}
                  ${trimmedPreferredDate || trimmedPreferredTime ? `
                  <div class="field">
                    <div class="label">Preferred Scheduling:</div>
                    <div class="value">
                      ${trimmedPreferredDate ? `Date: ${trimmedPreferredDate}<br>` : ''}
                      ${trimmedPreferredTime ? `Time: ${trimmedPreferredTime}` : ''}
                    </div>
                  </div>
                  ` : ''}
                  <div class="field">
                    <div class="label">Source:</div>
                    <div class="value">${trimmedSource}</div>
                  </div>
                  <div class="field">
                    <div class="label">Timestamp (PT):</div>
                    <div class="value">${ptTime}</div>
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
          from: resendFrom,
          to: resendTo,
          subject: `New Lead — Intelllx`,
          html: emailHtml,
          replyTo: trimmedEmail,
          text: [
            `New lead captured at ${ptTime}`,
            `Email: ${trimmedEmail}`,
            trimmedName ? `Name: ${trimmedName}` : null,
            trimmedPhone ? `Phone: ${trimmedPhone}` : null,
            trimmedCompany ? `Company: ${trimmedCompany}` : null,
            trimmedService ? `Service: ${trimmedService}` : null,
            trimmedPreferredDate ? `Preferred Date: ${trimmedPreferredDate}` : null,
            trimmedPreferredTime ? `Preferred Time: ${trimmedPreferredTime}` : null,
            `Source: ${trimmedSource}`,
            trimmedPageUrl ? `Page URL: ${trimmedPageUrl}` : null,
            '',
            `Message:`,
            trimmedMessage ?? 'No message provided'
          ].filter(Boolean).join('\n')
        });

        console.log('[API /leads] Resend email sent successfully!', {
          emailId: emailResult.data?.id,
          result: JSON.stringify(emailResult)
        });
      } catch (resendError) {
        // Log detailed error for debugging
        const error = resendError as Error & { response?: { status?: number; data?: unknown } };
        console.error('=== EMAIL SEND FAILED ===');
        console.error('Error message:', error?.message);
        console.error('Error status:', error?.response?.status);
        console.error('Error data:', error?.response?.data);
        console.error('From address:', resendFrom);
        console.error('To address:', resendTo);
        console.error('=== END ERROR ===');
        // Continue anyway - lead was saved successfully
      }
    } else {
      console.warn('[API /leads] RESEND_API_KEY not configured - skipping email');
    }

    // 5. Calculate lead score and send automated welcome email to customer
    if (resendApiKey && trimmedEmail) {
      try {
        // Calculate lead score (0-100)
        let leadScore = 0;
        
        // Base score for submitting form
        leadScore += 10;
        
        // Service interest scoring
        if (trimmedService === 'leadflow-chatbot') leadScore += 20;
        if (trimmedService === 'both') leadScore += 30;
        if (trimmedService === 'website-development') leadScore += 15;
        
        // Message quality scoring
        if (trimmedMessage) {
          const messageLength = trimmedMessage.length;
          if (messageLength > 200) leadScore += 25;
          else if (messageLength > 100) leadScore += 15;
          else if (messageLength > 50) leadScore += 10;
          
          // Keywords indicating high intent
          const highIntentKeywords = ['ready', 'interested', 'want', 'need', 'asap', 'urgent', 'start', 'immediately', 'now', 'today'];
          const lowerMessage = trimmedMessage.toLowerCase();
          const keywordMatches = highIntentKeywords.filter(keyword => lowerMessage.includes(keyword)).length;
          leadScore += keywordMatches * 5;
        }
        
        // Preferred date/time indicates urgency
        if (trimmedPreferredDate || trimmedPreferredTime) {
          leadScore += 15;
        }
        
        // Company indicates business intent
        if (trimmedCompany) {
          leadScore += 10;
        }
        
        // Cap score at 100
        leadScore = Math.min(leadScore, 100);
        
        // Determine lead temperature
        let leadTemperature: 'hot' | 'warm' | 'cold';
        if (leadScore >= 70) {
          leadTemperature = 'hot';
        } else if (leadScore >= 40) {
          leadTemperature = 'warm';
        } else {
          leadTemperature = 'cold';
        }
        
        console.log('[API /leads] Lead scoring:', {
          email: trimmedEmail,
          score: leadScore,
          temperature: leadTemperature,
          service: trimmedService,
          messageLength: trimmedMessage?.length || 0
        });
        
        // Send automated welcome email to customer
        try {
          // Import email template functionality
          const { emailTemplates, processEmailTemplate } = await import('@/lib/email-templates');
          const siteConfig = await import('@/config/site');
          
          // Check if this is a stylist booking
          const isStylistBooking = trimmedSource === 'stylist_contact' || trimmedSource === 'stylist_calendar_booking';
          
          // Select template based on source (stylist vs general) and lead temperature
          let template;
          if (isStylistBooking) {
            // Use stylist-specific template
            template = emailTemplates.stylistWelcome;
          } else {
            // Use general templates based on lead temperature
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
          }
          
          // Process template with variables
          const processedTemplate = processEmailTemplate(template, {
            name: trimmedName || 'there',
            calendlyLink: siteConfig.site.calendly,
            leadScore: leadScore.toString()
          });
          
          // Send email via Resend
          const resend = new Resend(resendApiKey);
          
          console.log('[API /leads] Sending automated welcome email:', {
            to: trimmedEmail,
            source: trimmedSource,
            isStylist: isStylistBooking,
            temperature: leadTemperature,
            score: leadScore,
            template: isStylistBooking ? 'stylistWelcome' : leadTemperature
          });
          
          const emailResult = await resend.emails.send({
            from: resendFrom,
            to: trimmedEmail,
            subject: processedTemplate.subject,
            html: processedTemplate.html,
            text: processedTemplate.text,
            replyTo: resendFrom
          });
          
          console.log('[API /leads] Welcome email sent successfully:', {
            emailId: emailResult.data?.id,
            to: trimmedEmail,
            source: trimmedSource,
            isStylist: isStylistBooking,
            temperature: leadTemperature,
            score: leadScore
          });
        } catch (welcomeEmailError) {
          // Don't fail the main request if welcome email fails
          console.error('[API /leads] Failed to send welcome email:', welcomeEmailError);
        }
      } catch (scoringError) {
        // Don't fail the main request if scoring fails
        console.error('[API /leads] Lead scoring error:', scoringError);
      }
    }

    // Return success (with debug info in non-production)
    return NextResponse.json({ 
      ok: true,
      debug: {
        supabaseWorked: !!lead,
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

