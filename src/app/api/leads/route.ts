import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { createZoomMeeting, isZoomConfigured } from '@/lib/zoom';
import { getBusinessHoursMessage } from '@/lib/business-hours';

/**
 * POST /api/leads
 * 
 * Handles lead capture from chat widget:
 * 1. Validates input
 * 2. Upserts lead in Supabase
 * 3. Creates conversation and message
 * 4. Schedules Zoom meeting (if configured and datetime provided)
 * 5. Sends email notification via Resend
 * 6. Optionally syncs to HubSpot CRM (if configured)
 */
export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();
    const { email, name, phone, message, source, pageUrl, preferredDateTime } = body;

    // Validate required fields
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Initialize Supabase client (service role for RLS bypass)
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('[API] Missing Supabase credentials');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 1. Upsert lead
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .upsert(
        {
          email,
          name: name || null,
          phone: phone || null,
          source: source || 'chat_widget',
          page_url: pageUrl || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'email' }
      )
      .select()
      .single();

    if (leadError || !lead) {
      console.error('[API] Supabase lead error:', leadError);
      return NextResponse.json(
        { error: 'Failed to save lead' },
        { status: 500 }
      );
    }

    // 2. Create conversation
    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .insert({
        lead_id: lead.id,
        status: 'active',
      })
      .select()
      .single();

    if (convError || !conversation) {
      console.error('[API] Supabase conversation error:', convError);
      return NextResponse.json(
        { error: 'Failed to create conversation' },
        { status: 500 }
      );
    }

    // 3. Create message (if provided)
    if (message) {
      const { error: messageError } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversation.id,
          role: 'user',
          content: message,
        });

      if (messageError) {
        console.warn('[API] Supabase message error:', messageError);
      }
    }

    // 4. Create Zoom meeting (if configured and datetime provided)
    let zoomMeetingUrl: string | null = null;
    let zoomStartTime: string | null = null;

    if (isZoomConfigured() && preferredDateTime) {
      try {
        const zoomMeeting = await createZoomMeeting(
          name || email,
          email,
          preferredDateTime
        );
        zoomMeetingUrl = zoomMeeting.joinUrl;
        zoomStartTime = zoomMeeting.startTime;
        console.log('[API] Zoom meeting created:', zoomMeeting.meetingId);
      } catch (zoomError) {
        console.error('[API] Zoom error:', zoomError);
        // Continue even if Zoom fails
      }
    }

    // 5. Send email notification via Resend
    await sendEmailNotification({
      email,
      name: name || null,
      phone: phone || null,
      message,
      source: source || 'chat_widget',
      pageUrl: pageUrl || null,
      zoomMeetingUrl,
      zoomStartTime,
    });

    // 6. Optional: Sync to HubSpot CRM (server-side)
    if (process.env.HUBSPOT_PRIVATE_APP_TOKEN) {
      await syncToHubSpot(email, name, phone, message);
    }

    return NextResponse.json({
      ok: true,
      leadId: lead.id,
      conversationId: conversation.id,
      zoomMeetingUrl,
    });
  } catch (error) {
    console.error('[API] Unhandled error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Send email notification via Resend
 */
async function sendEmailNotification(data: {
  email: string;
  name: string | null;
  phone?: string | null;
  message?: string;
  source: string | null;
  pageUrl: string | null;
  zoomMeetingUrl?: string | null;
  zoomStartTime?: string | null;
}) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const emailFrom = process.env.EMAIL_FROM || 'leads@intelllx.com';
  const emailTo = process.env.EMAIL_TO || 'hello@intelllx.com';

  if (!resendApiKey) {
    console.warn('[API] Resend not configured, skipping email');
    return;
  }

  try {
    const resend = new Resend(resendApiKey);

    const displayName = data.name || 'Anonymous';
    const businessHours = getBusinessHoursMessage();

    // Format Zoom meeting details
    let zoomDetails = '';
    if (data.zoomMeetingUrl && data.zoomStartTime) {
      const meetingDate = new Date(data.zoomStartTime);
      zoomDetails = `
        <div style="margin: 20px 0; padding: 15px; background: #f0f9ff; border-left: 4px solid #3b82f6; border-radius: 4px;">
          <h3 style="margin: 0 0 10px 0; color: #1e40af;">Zoom Meeting Scheduled</h3>
          <p style="margin: 5px 0;"><strong>Date & Time:</strong> ${meetingDate.toLocaleString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: 'numeric', 
            minute: '2-digit',
            timeZoneName: 'short'
          })}</p>
          <p style="margin: 5px 0;"><strong>Join URL:</strong> <a href="${data.zoomMeetingUrl}" style="color: #3b82f6;">${data.zoomMeetingUrl}</a></p>
        </div>
      `;
    }

    await resend.emails.send({
      from: emailFrom,
      to: emailTo,
      subject: `New Lead: ${displayName} (${data.email})`,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
            New Lead from Chat Widget
          </h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${displayName}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #3b82f6;">${data.email}</a></p>
            ${data.phone ? `<p style="margin: 10px 0;"><strong>Phone:</strong> ${data.phone}</p>` : ''}
            ${data.message ? `<p style="margin: 10px 0;"><strong>Message:</strong><br/>${data.message.replace(/\n/g, '<br/>')}</p>` : ''}
          </div>

          ${zoomDetails}

          <div style="margin: 20px 0; padding: 15px; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
            <p style="margin: 0;"><strong>Source:</strong> ${data.source || 'Unknown'}</p>
            ${data.pageUrl ? `<p style="margin: 5px 0 0 0;"><strong>Page:</strong> <a href="${data.pageUrl}" style="color: #d97706;">${data.pageUrl}</a></p>` : ''}
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
            <p><strong>Business Hours:</strong> ${businessHours}</p>
            <p>This notification was sent from your IntellLX lead capture system.</p>
          </div>
        </div>
      `,
    });

    console.log('[API] Email sent successfully');
  } catch (error) {
    console.error('[API] Resend error:', error);
    // Don't throw - continue even if email fails
  }
}

/**
 * Sync lead to HubSpot CRM (optional)
 */
async function syncToHubSpot(
  email: string,
  name: string | null,
  phone: string | null,
  message?: string
) {
  const hubspotToken = process.env.HUBSPOT_PRIVATE_APP_TOKEN;

  if (!hubspotToken) {
    return;
  }

  try {
    // Search for existing contact
    const searchResponse = await fetch(
      'https://api.hubapi.com/crm/v3/objects/contacts/search',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${hubspotToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filterGroups: [
            {
              filters: [
                {
                  propertyName: 'email',
                  operator: 'EQ',
                  value: email,
                },
              ],
            },
          ],
        }),
      }
    );

    const searchData = await searchResponse.json();
    let contactId: string;

    if (searchData.results && searchData.results.length > 0) {
      // Update existing contact
      contactId = searchData.results[0].id;
      await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${hubspotToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: {
            ...(name && { firstname: name.split(' ')[0], lastname: name.split(' ').slice(1).join(' ') }),
            ...(phone && { phone }),
          },
        }),
      });
    } else {
      // Create new contact
      const createResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${hubspotToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: {
            email,
            ...(name && { firstname: name.split(' ')[0], lastname: name.split(' ').slice(1).join(' ') }),
            ...(phone && { phone }),
          },
        }),
      });

      const createData = await createResponse.json();
      contactId = createData.id;
    }

    // Create note with message (if provided)
    if (message && contactId) {
      await fetch('https://api.hubapi.com/crm/v3/objects/notes', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${hubspotToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: {
            hs_note_body: message,
            hs_timestamp: new Date().getTime(),
          },
          associations: [
            {
              to: { id: contactId },
              types: [
                {
                  associationCategory: 'HUBSPOT_DEFINED',
                  associationTypeId: 202, // Note to Contact
                },
              ],
            },
          ],
        }),
      });
    }

    console.log('[API] HubSpot sync successful');
  } catch (error) {
    console.error('[API] HubSpot sync error:', error);
    // Don't throw - continue even if HubSpot fails
  }
}

