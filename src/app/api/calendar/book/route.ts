import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { zoomAPI } from '@/lib/zoom-api';
import { OAuth2Client } from 'google-auth-library';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const { 
      accessToken, // Optional - for user OAuth flow
      startTime, 
      endTime, 
      attendeeEmail, 
      attendeeName,
      meetingTitle = 'Discovery Call with Intelllx',
      meetingDescription = 'Discovery call to discuss your LeadFlow chatbot needs'
    } = await request.json();

    if (!startTime || !endTime || !attendeeEmail) {
      return NextResponse.json(
        { error: 'Missing required fields: startTime, endTime, attendeeEmail' },
        { status: 400 }
      );
    }

    let calendar;
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

    // Try service account first (preferred for server-side booking)
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

    if (serviceAccountEmail && serviceAccountKey) {
      // Use service account (no user auth needed)
      const auth = new google.auth.JWT({
        email: serviceAccountEmail,
        key: serviceAccountKey.replace(/\\n/g, '\n'),
        scopes: ['https://www.googleapis.com/auth/calendar.events'],
      });

      calendar = google.calendar({ version: 'v3', auth });
    } else if (process.env.GOOGLE_REFRESH_TOKEN) {
      // Use stored refresh token
      const oauth2Client = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET
      );

      oauth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
      });

      // Get new access token
      const { credentials } = await oauth2Client.refreshAccessToken();
      oauth2Client.setCredentials(credentials);

      calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    } else if (accessToken) {
      // Fallback to user-provided access token (OAuth flow)
      const oauth2Client = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET
      );

      oauth2Client.setCredentials({
        access_token: accessToken
      });

      calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    } else {
      return NextResponse.json(
        { error: 'No Google Calendar credentials configured. Please set up service account or refresh token.' },
        { status: 500 }
      );
    }

    // Create Zoom meeting if credentials are available
    let zoomMeeting = null;
    let meetingLink = '';
    
    if (process.env.ZOOM_CLIENT_ID) {
      try {
        const duration = Math.round((new Date(endTime).getTime() - new Date(startTime).getTime()) / (1000 * 60));
        
        zoomMeeting = await zoomAPI.createMeeting({
          topic: meetingTitle,
          startTime: startTime,
          duration: duration,
          timezone: 'America/Los_Angeles',
          agenda: meetingDescription,
        });

        meetingLink = zoomMeeting.join_url;
      } catch (zoomError) {
        console.warn('Failed to create Zoom meeting, falling back to Google Meet:', zoomError);
        // Will fall back to Google Meet below
      }
    }

    // Create calendar event
    const event: Record<string, any> = {
      summary: meetingTitle,
      description: meetingDescription,
      start: {
        dateTime: startTime,
        timeZone: 'America/Los_Angeles', // Adjust timezone as needed
      },
      end: {
        dateTime: endTime,
        timeZone: 'America/Los_Angeles',
      },
      attendees: [
        {
          email: attendeeEmail,
          displayName: attendeeName || attendeeEmail,
        },
        {
          email: 'hello@intelllx.com', // Your email
          displayName: 'Intelllx Team',
        },
      ],
      // Add conference data based on meeting type
      ...(zoomMeeting ? {
        // Add Zoom meeting details to description
        description: `${meetingDescription}\n\nZoom Meeting Details:\nJoin URL: ${zoomMeeting.join_url}${zoomMeeting.password ? `\nPassword: ${zoomMeeting.password}` : ''}`,
      } : {
        // Use Google Meet if Zoom failed or not configured
        conferenceData: {
          createRequest: {
            requestId: `intelllx-${Date.now()}`,
            conferenceSolutionKey: {
              type: 'hangoutsMeet'
            }
          }
        }
      }),
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 24 hours before
          { method: 'email', minutes: 60 }, // 1 hour before
          { method: 'popup', minutes: 10 }, // 10 minutes before
        ],
      },
    };

    // Insert the event
    const response = await calendar.events.insert({
      calendarId: calendarId,
      requestBody: event,
      conferenceDataVersion: zoomMeeting ? 0 : 1, // Don't use conferenceDataVersion for Zoom
    });

    // Get the final meeting link
    if (!meetingLink && response.data.conferenceData?.entryPoints?.[0]?.uri) {
      meetingLink = response.data.conferenceData.entryPoints[0].uri;
    }

    // Send booking confirmation email via Resend (non-blocking)
    (async () => {
      try {
        const resendApiKey = process.env.RESEND_API_KEY;
        if (!resendApiKey) return;
        const resendFrom =
          (process.env.RESEND_FROM?.trim() ||
            process.env.EMAIL_FROM?.trim() ||
            'hello@send.intelllx.com');
        const ccEmail = 'hello@intelllx.com';
        const timezone = 'America/Los_Angeles';

        const start = new Date(startTime);
        const end = new Date(endTime);
        const displayDate = start.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          timeZone: timezone,
        });
        const displayTime = `${start.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
          timeZone: timezone,
        })} – ${end.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
          timeZone: timezone,
        })} ${Intl.DateTimeFormat('en-US', { timeZoneName: 'short', timeZone: timezone }).format(start).split(' ').pop()}`;

        const calendarLink = response.data.htmlLink as string | undefined;
        // Build Google Calendar "Add" link as a template URL
        const gcalAddUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(meetingTitle)}&dates=${dtStart}/${dtEnd}&details=${encodeURIComponent(meetingDescription || '')}%0AJoin%20link:%20${encodeURIComponent(meetingLink)}&location=${encodeURIComponent(meetingLink)}&ctz=America/Los_Angeles`;
        // Build an absolute ICS download URL for Apple/Outlook users
        const origin = new URL(request.url).origin;
        const icsDownloadUrl = `${origin}/api/calendar/ics?title=${encodeURIComponent(meetingTitle)}&start=${encodeURIComponent(dtStart)}&end=${encodeURIComponent(dtEnd)}&desc=${encodeURIComponent(meetingDescription || '')}&loc=${encodeURIComponent(meetingLink)}&attendee=${encodeURIComponent(attendeeEmail)}&uid=${encodeURIComponent(uid)}`;
        const isGoogleMeet = !zoomMeeting;
        const meetingType = isGoogleMeet ? 'Google Meet (video)' : 'Zoom (video)';
        
        // Detect if this is a stylist booking
        const isStylistBooking = meetingTitle.toLowerCase().includes('stylist') || 
                                  meetingDescription.toLowerCase().includes('stylist');

        // Stylist-specific email content
        const html = isStylistBooking ? `
          <!DOCTYPE html>
          <html>
            <body style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
              <div style="background: linear-gradient(135deg, #06B6D4 0%, #6D28D9 100%); color: white; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
                <h2 style="margin:0 0 8px; font-size: 24px;">✨ Your Discovery Call is Confirmed!</h2>
                <p style="margin:0; opacity: 0.95;">Stylist AI Booking System</p>
              </div>
              <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
                <p style="margin:0 0 16px; font-size: 16px;">Hi ${attendeeName || 'there'},</p>
                <p style="margin:0 0 20px;">I'm excited to discuss your <strong>Stylist AI Booking System</strong>! This 30-minute call is where we'll map out exactly how to get your chair fully booked on autopilot.</p>
                <div style="background:#fff; border:1px solid #e5e7eb; border-radius:8px; padding:20px; margin-bottom:20px;">
                  <p style="margin:0 0 12px;"><strong style="color: #6D28D9;">📅 When:</strong> ${displayDate}, ${displayTime}</p>
                  <p style="margin:0 0 12px;"><strong style="color: #6D28D9;">💻 Meeting:</strong> ${meetingType}</p>
                  <p style="margin:0 0 12px;"><strong style="color: #6D28D9;">🔗 Join Link:</strong> <a href="${meetingLink}" target="_blank" rel="noopener" style="color: #06B6D4; text-decoration: underline;">${meetingLink}</a></p>
                </div>
                <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 6px; margin-bottom: 20px;">
                  <p style="margin:0 0 8px; font-weight: 600;">💇🏽‍♀️ What to Expect:</p>
                  <ul style="margin: 0; padding-left: 20px;">
                    <li>We'll discuss your current booking situation</li>
                    <li>I'll show you how the AI system works for stylists</li>
                    <li>We'll map out your custom booking site + DM assistant</li>
                    <li>You'll learn about the $497 founder offer</li>
                  </ul>
                </div>
                <div style="margin:20px 0;">
                  <a href="${gcalAddUrl}" target="_blank" rel="noopener" style="display:inline-block;background:#06B6D4;color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none;font-weight:600;margin-right:8px;">Add to Google Calendar</a>
                  <a href="${icsDownloadUrl}" target="_blank" rel="noopener" style="display:inline-block;background:#6D28D9;color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none;font-weight:600;">Add to Apple/Outlook</a>
                </div>
                <p style="margin:20px 0 0; font-size: 14px; color: #6b7280;">Please join a few minutes early to test your audio/video. If you need to reschedule, just reply to this email.</p>
                <p style="margin:16px 0 0; font-size: 14px;">Looking forward to helping you get fully booked!<br><strong>LaTaunae</strong><br>INTELLLX</p>
              </div>
            </body>
          </html>
        ` : `
          <!DOCTYPE html>
          <html>
            <body style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
              <h2 style="margin:0 0 10px;">Your meeting is confirmed</h2>
              <p style="margin:0 0 16px;">Hi ${attendeeName || ''}, thanks for booking with Intelllx.</p>
              <div style="background:#f8fafc; border:1px solid #e5e7eb; border-radius:8px; padding:16px; margin-bottom:16px;">
                <p style="margin:0 0 8px;"><strong>Topic:</strong> ${meetingTitle}</p>
                <p style="margin:0 0 8px;"><strong>When:</strong> ${displayDate}, ${displayTime}</p>
                <p style="margin:0 0 8px;"><strong>Meeting type:</strong> ${meetingType}</p>
                <p style="margin:0;"><strong>Join link:</strong> <a href="${meetingLink}" target="_blank" rel="noopener">${meetingLink}</a></p>
              </div>
              <p style="margin:0 0 16px;">We'll meet on ${isGoogleMeet ? 'Google Meet' : 'Zoom'}. Please join a few minutes early to test audio/video.</p>
              <div style="margin:16px 0;">
                <a href="${gcalAddUrl}" target="_blank" rel="noopener" style="display:inline-block;background:#2563eb;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none;font-weight:600;margin-right:8px;">Add to Google Calendar</a>
                <a href="${icsDownloadUrl}" target="_blank" rel="noopener" style="display:inline-block;background:#0ea5e9;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none;font-weight:600;">Add to Apple/Outlook</a>
              </div>
              ${meetingDescription ? `<p style="margin:16px 0 0;"><strong>Notes:</strong><br/>${meetingDescription.replace(/\n/g, '<br/>')}</p>` : ''}
              <p style="margin:24px 0 0; font-size:12px; color:#6b7280;">If you need to reschedule, just reply to this email.</p>
            </body>
          </html>
        `;

        const text = isStylistBooking ? `
Your Stylist AI Booking System Discovery Call is Confirmed!

Hi ${attendeeName || 'there'},

I'm excited to discuss your Stylist AI Booking System! This 30-minute call is where we'll map out exactly how to get your chair fully booked on autopilot.

When: ${displayDate}, ${displayTime}
Meeting: ${meetingType}
Join Link: ${meetingLink}

What to Expect:
• We'll discuss your current booking situation
• I'll show you how the AI system works for stylists
• We'll map out your custom booking site + DM assistant
• You'll learn about the $497 founder offer

Please join a few minutes early to test your audio/video. If you need to reschedule, just reply to this email.

Looking forward to helping you get fully booked!

LaTaunae
INTELLLX

Add to calendar: ${gcalAddUrl}
        `.trim() : `
Your meeting is confirmed.

Topic: ${meetingTitle}
When: ${displayDate}, ${displayTime}
Meeting type: ${meetingType}
Join link: ${meetingLink}
${meetingDescription ? `\nNotes:\n${meetingDescription}\n` : ''}
Add to calendar: ${addToCalendarUrl || meetingLink}
        `.trim();

        const resend = new Resend(resendApiKey);
        // Build universal .ics calendar attachment
        const toUtcStamp = (d: Date) =>
          d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        const dtStamp = toUtcStamp(new Date());
        const dtStart = toUtcStamp(new Date(startTime));
        const dtEnd = toUtcStamp(new Date(endTime));
        const uid = `intelllx-${response.data.id || Date.now()}@intelllx.com`;
        const organizerEmail = ccEmail;
        const safeDescription = (meetingDescription || '')
          .replace(/\r?\n/g, '\\n')
          .replace(/,/g, '\\,');
        const icsContent =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Intelllx//Booking//EN
METHOD:REQUEST
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${dtStamp}
DTSTART:${dtStart}
DTEND:${dtEnd}
SUMMARY:${meetingTitle}
DESCRIPTION:${safeDescription}\\nJoin link: ${meetingLink}
LOCATION:${meetingLink}
ORGANIZER;CN=Intelllx:MAILTO:${organizerEmail}
ATTENDEE;CN=${attendeeName || attendeeEmail};ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE:MAILTO:${attendeeEmail}
END:VEVENT
END:VCALENDAR`;
        const icsBase64 = Buffer.from(icsContent, 'utf8').toString('base64');

        await resend.emails.send({
          from: resendFrom,
          to: attendeeEmail,
          cc: ccEmail,
          subject: `Confirmed: ${meetingTitle} — ${displayDate}`,
          html,
          text,
          replyTo: ccEmail,
          attachments: [
            {
              filename: 'meeting.ics',
              content: icsBase64,
              contentType: 'text/calendar; charset=utf-8; method=REQUEST'
            }
          ]
        });
      } catch (emailError) {
        console.warn('Booking confirmation email failed:', emailError);
      }
    })();

    return NextResponse.json({
      success: true,
      eventId: response.data.id,
      meetingLink: meetingLink,
      calendarLink: response.data.htmlLink,
      zoomMeeting: zoomMeeting,
      meetingType: zoomMeeting ? 'zoom' : 'google-meet'
    });

  } catch (error) {
    console.error('Calendar booking error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create calendar event';
    const errorDetails = error instanceof Error && 'response' in error 
      ? (error as any).response?.data 
      : null;
    
    return NextResponse.json(
      { 
        success: false,
        error: errorMessage,
        details: errorDetails || (error instanceof Error ? error.stack : undefined)
      },
      { status: 500 }
    );
  }
}


