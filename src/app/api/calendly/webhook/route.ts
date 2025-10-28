import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * POST /api/calendly/webhook
 * 
 * Webhook endpoint to receive Calendly booking events
 * Called automatically when someone books a meeting via Calendly
 * 
 * Expected payload from Calendly:
 * - invitee details (name, email, phone)
 * - answers to custom questions
 * - booking details (date, time, meeting link)
 */
export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    
    console.log('[Calendly Webhook] Received event:', {
      event: payload.event,
      createdAt: payload.created_at
    });

    // Calendly webhook structure
    // When someone books, Calendly sends: invitation.created event
    const { event, created_at } = payload;

    // Get Supabase credentials
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('[Calendly Webhook] Supabase credentials missing');
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

    // Only process 'invitee.created' events (when someone books)
    if (event === 'invitee.created') {
      const invitee = payload.payload?.invitee;
      const eventDetails = payload.payload?.event;
      const questions = payload.payload?.questions_and_answers || [];

      if (!invitee || !eventDetails) {
        console.error('[Calendly Webhook] Missing invitee or event data');
        return NextResponse.json({ ok: false, error: 'Invalid webhook payload' }, { status: 400 });
      }

      // Extract basic info
      const email = invitee.email;
      const name = invitee.name || `${invitee.first_name || ''} ${invitee.last_name || ''}`.trim();
      const phone = invitee.phone_number || null;
      const bookingUri = invitee.uri;
      const meetingUri = eventDetails?.uri;

      // Parse custom questions
      const customAnswers: Record<string, string> = {};
      questions.forEach((qa: any) => {
        if (qa.question) {
          const questionKey = qa.question.toLowerCase().replace(/[^a-z0-9]+/g, '_');
          customAnswers[questionKey] = qa.answer || '';
        }
      });

      // Extract common fields from custom questions
      const company = customAnswers.company || customAnswers.company_name || null;
      const service = customAnswers.service || customAnswers.service_interest || customAnswers.which_service || null;
      const message = customAnswers.message || customAnswers.project_details || customAnswers.additional_info || null;

      // Format booking details
      const bookingDate = new Date(invitee.event_start_time).toISOString();

      console.log('[Calendly Webhook] Processing booking:', {
        email,
        name,
        phone,
        company,
        service,
        hasMessage: !!message,
        bookingDate
      });

      // Save to Supabase
      const leadData: Record<string, unknown> = {
        email: email.toLowerCase(),
        name: name || null,
        phone: phone || null,
        company: company || null,
        service: service || null,
        message: message || null,
        source: 'calendly_booking',
        page_url: invitee.event || meetingUri || 'https://calendly.com',
        created_at: created_at || new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Add booking details if columns exist
      if (bookingDate) {
        leadData.preferred_date = new Date(bookingDate).toLocaleDateString();
        leadData.preferred_time = new Date(bookingDate).toLocaleTimeString();
      }

      const { data: lead, error: leadError } = await supabase
        .from('leads')
        .upsert(leadData, {
          onConflict: 'email',
          ignoreDuplicates: false
        })
        .select()
        .single();

      if (leadError) {
        console.error('[Calendly Webhook] Failed to save lead:', leadError);
        return NextResponse.json(
          { ok: false, error: 'Failed to save booking data' },
          { status: 500 }
        );
      }

      console.log('[Calendly Webhook] Booking saved successfully:', {
        leadId: lead?.id,
        email,
        name
      });

      return NextResponse.json({
        ok: true,
        message: 'Booking processed successfully',
        leadId: lead?.id
      }, { status: 200 });
    }

    // Handle other event types
    console.log('[Calendly Webhook] Event not processed:', event);
    return NextResponse.json({ ok: true, message: 'Event received but not processed' }, { status: 200 });

  } catch (error) {
    console.error('[Calendly Webhook] Error:', error);
    return NextResponse.json(
      { ok: false, error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}

