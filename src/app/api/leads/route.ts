import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

/**
 * POST /api/leads
 * 
 * Lead capture endpoint that:
 * 1. Validates and stores lead data in Supabase
 * 2. Sends email notification via Resend
 * 3. Optionally syncs to HubSpot CRM (server-side only)
 * 
 * Request body:
 * {
 *   email: string (required)
 *   name?: string
 *   message?: string
 *   source?: string (e.g., 'chat', 'contact-form')
 *   pageUrl?: string
 * }
 */

interface LeadRequest {
  email: string;
  name?: string;
  message?: string;
  source?: string;
  pageUrl?: string;
}

interface Lead {
  id: string;
  email: string;
  name: string | null;
  source: string | null;
  page_url: string | null;
  created_at: string;
}

interface Conversation {
  id: string;
  lead_id: string;
  status: string;
  created_at: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body: LeadRequest = await request.json();
    
    // Validate email
    if (!body.email || typeof body.email !== 'string') {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Initialize Supabase client (server-side with service role)
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('[Leads API] Supabase credentials not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // ========================================================================
    // STEP 1: Upsert lead (insert or update if email exists)
    // ========================================================================
    
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .upsert(
        {
          email: body.email.toLowerCase().trim(),
          name: body.name || null,
          source: body.source || 'chat',
          page_url: body.pageUrl || null,
        },
        {
          onConflict: 'email',
          ignoreDuplicates: false,
        }
      )
      .select()
      .single<Lead>();

    if (leadError || !lead) {
      console.error('[Leads API] Error upserting lead:', leadError);
      return NextResponse.json(
        { error: 'Failed to save lead' },
        { status: 500 }
      );
    }

    console.log('[Leads API] Lead upserted:', lead.id, lead.email);

    // ========================================================================
    // STEP 2: Find or create active conversation
    // ========================================================================
    
    // Check for existing active conversation
    const { data: existingConversations } = await supabase
      .from('conversations')
      .select('*')
      .eq('lead_id', lead.id)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1);

    let conversation: Conversation;

    if (existingConversations && existingConversations.length > 0) {
      conversation = existingConversations[0];
      console.log('[Leads API] Using existing conversation:', conversation.id);
    } else {
      // Create new conversation
      const { data: newConversation, error: conversationError } = await supabase
        .from('conversations')
        .insert({
          lead_id: lead.id,
          status: 'active',
        })
        .select()
        .single<Conversation>();

      if (conversationError || !newConversation) {
        console.error('[Leads API] Error creating conversation:', conversationError);
        return NextResponse.json(
          { error: 'Failed to create conversation' },
          { status: 500 }
        );
      }

      conversation = newConversation;
      console.log('[Leads API] New conversation created:', conversation.id);
    }

    // ========================================================================
    // STEP 3: Insert message if provided
    // ========================================================================
    
    if (body.message && body.message.trim()) {
      const { error: messageError } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversation.id,
          role: 'user',
          content: body.message.trim(),
        });

      if (messageError) {
        console.error('[Leads API] Error saving message:', messageError);
        // Don't fail the request if message save fails
      } else {
        console.log('[Leads API] Message saved to conversation:', conversation.id);
      }
    }

    // ========================================================================
    // STEP 4: Send email notification via Resend
    // ========================================================================
    
    await sendEmailNotification({
      email: lead.email,
      name: lead.name,
      message: body.message,
      source: lead.source,
      pageUrl: lead.page_url,
    });

    // ========================================================================
    // STEP 5: Optional HubSpot CRM sync (server-side only)
    // ========================================================================
    
    if (process.env.HUBSPOT_PRIVATE_APP_TOKEN) {
      await syncToHubSpot({
        email: lead.email,
        name: lead.name,
        message: body.message,
        source: lead.source,
        pageUrl: lead.page_url,
      });
    }

    // ========================================================================
    // Return success response
    // ========================================================================
    
    return NextResponse.json({
      ok: true,
      leadId: lead.id,
      conversationId: conversation.id,
    });

  } catch (error) {
    console.error('[Leads API] Unexpected error:', error);
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
  message?: string;
  source: string | null;
  pageUrl: string | null;
}) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const emailFrom = process.env.EMAIL_FROM || 'leads@intelllx.com';
    const emailTo = process.env.EMAIL_TO || 'hello@intelllx.com';

    if (!resendApiKey) {
      console.warn('[Leads API] Resend API key not configured, skipping email');
      return;
    }

    const resend = new Resend(resendApiKey);

    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: process.env.TIMEZONE || 'America/Los_Angeles',
      dateStyle: 'full',
      timeStyle: 'long',
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #374151; }
            .value { color: #111827; margin-top: 5px; }
            .message-box { background: white; padding: 15px; border-left: 4px solid #667eea; margin-top: 10px; border-radius: 4px; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #e5e7eb; font-size: 12px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">🎯 New Lead Captured</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">📧 Email:</div>
                <div class="value">${data.email}</div>
              </div>
              
              ${data.name ? `
              <div class="field">
                <div class="label">👤 Name:</div>
                <div class="value">${data.name}</div>
              </div>
              ` : ''}
              
              ${data.message ? `
              <div class="field">
                <div class="label">💬 Message:</div>
                <div class="message-box">${data.message.replace(/\n/g, '<br>')}</div>
              </div>
              ` : ''}
              
              <div class="field">
                <div class="label">📍 Source:</div>
                <div class="value">${data.source || 'unknown'}</div>
              </div>
              
              ${data.pageUrl ? `
              <div class="field">
                <div class="label">🔗 Page URL:</div>
                <div class="value"><a href="${data.pageUrl}">${data.pageUrl}</a></div>
              </div>
              ` : ''}
              
              <div class="footer">
                <strong>Timestamp:</strong> ${timestamp}
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: emailFrom,
      to: emailTo,
      subject: `New Lead: ${data.name || data.email}`,
      html: htmlContent,
    });

    if (emailError) {
      console.error('[Leads API] Error sending email:', emailError);
    } else {
      console.log('[Leads API] Email sent successfully:', emailData?.id);
    }
  } catch (error) {
    console.error('[Leads API] Email notification failed:', error);
  }
}

/**
 * Sync lead to HubSpot CRM (server-side only)
 * 
 * Uses HubSpot CRM v3 API:
 * - Contacts Search API: https://developers.hubspot.com/docs/api/crm/search
 * - Contacts API: https://developers.hubspot.com/docs/api/crm/contacts
 * - Notes API: https://developers.hubspot.com/docs/api/crm/notes
 */
async function syncToHubSpot(data: {
  email: string;
  name: string | null;
  message?: string;
  source: string | null;
  pageUrl: string | null;
}) {
  try {
    const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
    
    if (!token) {
      return; // Silent skip if not configured
    }

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    // ========================================================================
    // Search for existing contact by email
    // API: https://developers.hubspot.com/docs/api/crm/search
    // ========================================================================
    
    const searchResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        filterGroups: [{
          filters: [{
            propertyName: 'email',
            operator: 'EQ',
            value: data.email,
          }],
        }],
        limit: 1,
      }),
    });

    let contactId: string;

    if (!searchResponse.ok) {
      console.error('[Leads API] HubSpot search failed:', await searchResponse.text());
      return;
    }

    const searchData = await searchResponse.json();

    if (searchData.results && searchData.results.length > 0) {
      // Contact exists
      contactId = searchData.results[0].id;
      console.log('[Leads API] Found existing HubSpot contact:', contactId);
    } else {
      // ======================================================================
      // Create new contact
      // API: https://developers.hubspot.com/docs/api/crm/contacts
      // ======================================================================
      
      const createResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          properties: {
            email: data.email,
            firstname: data.name?.split(' ')[0] || '',
            lastname: data.name?.split(' ').slice(1).join(' ') || '',
            lifecyclestage: 'lead',
            hs_lead_status: 'NEW',
          },
        }),
      });

      if (!createResponse.ok) {
        console.error('[Leads API] HubSpot contact creation failed:', await createResponse.text());
        return;
      }

      const createData = await createResponse.json();
      contactId = createData.id;
      console.log('[Leads API] Created new HubSpot contact:', contactId);
    }

    // ========================================================================
    // Create note and associate with contact
    // API: https://developers.hubspot.com/docs/api/crm/notes
    // ========================================================================
    
    if (data.message && data.message.trim()) {
      const noteBody = `
Lead Capture - ${data.source || 'chat'}

Message: ${data.message}

${data.pageUrl ? `Page: ${data.pageUrl}` : ''}

Captured: ${new Date().toISOString()}
      `.trim();

      const noteResponse = await fetch('https://api.hubapi.com/crm/v3/objects/notes', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          properties: {
            hs_note_body: noteBody,
            hs_timestamp: new Date().getTime(),
          },
          associations: [
            {
              to: { id: contactId },
              types: [
                {
                  associationCategory: 'HUBSPOT_DEFINED',
                  associationTypeId: 202, // Note to Contact association type
                },
              ],
            },
          ],
        }),
      });

      if (!noteResponse.ok) {
        console.error('[Leads API] HubSpot note creation failed:', await noteResponse.text());
      } else {
        const noteData = await noteResponse.json();
        console.log('[Leads API] Created HubSpot note:', noteData.id);
      }
    }

  } catch (error) {
    console.error('[Leads API] HubSpot sync failed:', error);
  }
}

