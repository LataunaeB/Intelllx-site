/**
 * Zoom API Integration
 * 
 * Creates Zoom meetings via Server-to-Server OAuth.
 * Requires: ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET
 */

interface ZoomMeeting {
  joinUrl: string;
  meetingId: string;
  startTime: string;
}

export function isZoomConfigured(): boolean {
  return !!(
    process.env.ZOOM_ACCOUNT_ID &&
    process.env.ZOOM_CLIENT_ID &&
    process.env.ZOOM_CLIENT_SECRET
  );
}

/**
 * Get Zoom Server-to-Server OAuth access token
 */
async function getZoomAccessToken(): Promise<string> {
  const accountId = process.env.ZOOM_ACCOUNT_ID;
  const clientId = process.env.ZOOM_CLIENT_ID;
  const clientSecret = process.env.ZOOM_CLIENT_SECRET;

  if (!accountId || !clientId || !clientSecret) {
    throw new Error('[Zoom] Missing credentials: ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, or ZOOM_CLIENT_SECRET');
  }

  const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch(
    `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`[Zoom] OAuth failed: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return data.access_token;
}

/**
 * Get the Zoom user ID (required to create meetings)
 */
async function getZoomUserId(accessToken: string): Promise<string> {
  const response = await fetch('https://api.zoom.us/v2/users/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`[Zoom] Failed to get user: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return data.id;
}

/**
 * Create a Zoom meeting
 * 
 * @param leadName - Name of the person booking
 * @param leadEmail - Email of the person booking
 * @param preferredDateTime - ISO 8601 datetime string (optional)
 * @returns Meeting details (joinUrl, meetingId, startTime)
 */
export async function createZoomMeeting(
  leadName: string,
  leadEmail: string,
  preferredDateTime?: string
): Promise<ZoomMeeting> {
  if (!isZoomConfigured()) {
    throw new Error('[Zoom] Not configured. Missing environment variables.');
  }

  try {
    // Get access token
    const accessToken = await getZoomAccessToken();

    // Get user ID
    const userId = await getZoomUserId(accessToken);

    // Parse preferred date/time or default to 24 hours from now
    const startTime = preferredDateTime
      ? new Date(preferredDateTime)
      : new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Create meeting
    const meetingData = {
      topic: `Discovery Call with ${leadName}`,
      type: 2, // Scheduled meeting
      start_time: startTime.toISOString(),
      duration: 45, // 45 minutes
      timezone: process.env.NEXT_PUBLIC_TIMEZONE || 'America/Los_Angeles',
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: false,
        waiting_room: true,
        registration_type: 1,
        approval_type: 0, // Automatically approve
        registrants_email_notification: true,
      },
    };

    const response = await fetch(`https://api.zoom.us/v2/users/${userId}/meetings`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(meetingData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`[Zoom] Failed to create meeting: ${response.status} ${errorText}`);
    }

    const meeting = await response.json();

    // Register the lead as a participant
    if (meeting.id) {
      await registerZoomParticipant(accessToken, meeting.id, leadName, leadEmail);
    }

    return {
      joinUrl: meeting.join_url,
      meetingId: meeting.id.toString(),
      startTime: meeting.start_time,
    };
  } catch (error) {
    console.error('[Zoom] Error creating meeting:', error);
    throw error;
  }
}

/**
 * Register a participant for a Zoom meeting
 */
async function registerZoomParticipant(
  accessToken: string,
  meetingId: number,
  name: string,
  email: string
): Promise<void> {
  try {
    const response = await fetch(
      `https://api.zoom.us/v2/meetings/${meetingId}/registrants`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          first_name: name.split(' ')[0] || name,
          last_name: name.split(' ').slice(1).join(' ') || '',
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.warn(`[Zoom] Failed to register participant: ${response.status} ${errorText}`);
    }
  } catch (error) {
    console.warn('[Zoom] Error registering participant:', error);
  }
}

