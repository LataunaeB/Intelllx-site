import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { zoomAPI } from '@/lib/zoom-api';
import { OAuth2Client } from 'google-auth-library';

export async function POST(request: NextRequest) {
  try {
    const { 
      accessToken, 
      startTime, 
      endTime, 
      attendeeEmail, 
      attendeeName,
      meetingTitle = 'Discovery Call with Intelllx',
      meetingDescription = 'Discovery call to discuss your LeadFlow chatbot needs'
    } = await request.json();

    if (!accessToken || !startTime || !endTime || !attendeeEmail) {
      return NextResponse.json(
        { error: 'Missing required fields: accessToken, startTime, endTime, attendeeEmail' },
        { status: 400 }
      );
    }

    // Create OAuth2 client
    const oauth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    // Set the access token
    oauth2Client.setCredentials({
      access_token: accessToken
    });

    // Create Calendar API instance
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

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
          { method: 'popup', minutes: 10 }, // 10 minutes before
        ],
      },
    };

    // Insert the event
    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      conferenceDataVersion: zoomMeeting ? 0 : 1, // Don't use conferenceDataVersion for Zoom
    });

    // Get the final meeting link
    if (!meetingLink && response.data.conferenceData?.entryPoints?.[0]?.uri) {
      meetingLink = response.data.conferenceData.entryPoints[0].uri;
    }

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
    return NextResponse.json(
      { error: 'Failed to create calendar event' },
      { status: 500 }
    );
  }
}


