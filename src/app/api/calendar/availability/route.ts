import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

/**
 * GET /api/calendar/availability
 * 
 * Returns available time slots for booking
 * 
 * Query params:
 * - startDate: ISO date string (optional, defaults to today)
 * - endDate: ISO date string (optional, defaults to 1 month from today)
 * 
 * Business Rules:
 * - Monday-Friday only (no weekends)
 * - 9 AM - 6 PM PST
 * - 30-minute meetings
 * - 1 month (30 days) advance booking limit
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');

    // Business configuration
    const TIMEZONE = 'America/Los_Angeles';
    const BUSINESS_START_HOUR = 9; // 9 AM
    const BUSINESS_END_HOUR = 18; // 6 PM (18:00)
    const MEETING_DURATION_MINUTES = 30;
    const ADVANCE_BOOKING_DAYS = 30; // 1 month

    // Calculate date range
    const now = new Date();
    const today = new Date(now.toLocaleString('en-US', { timeZone: TIMEZONE }));
    today.setHours(0, 0, 0, 0);

    const startDate = startDateParam 
      ? new Date(startDateParam)
      : today;
    
    const maxAdvanceDate = new Date(today);
    maxAdvanceDate.setDate(today.getDate() + ADVANCE_BOOKING_DAYS);
    
    const endDate = endDateParam 
      ? new Date(endDateParam)
      : maxAdvanceDate;

    // Ensure we don't go beyond 1 month (30 days)
    const queryEndDate = endDate > maxAdvanceDate ? maxAdvanceDate : endDate;

    // Check if we have service account credentials (preferred) or need OAuth token
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

    let calendar;

    if (serviceAccountEmail && serviceAccountKey) {
      // Use service account (server-side, no user auth needed)
      const auth = new google.auth.JWT({
        email: serviceAccountEmail,
        key: serviceAccountKey.replace(/\\n/g, '\n'),
        scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
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
    } else {
      // Fallback: return static availability (no calendar checking)
      // This allows the widget to work even without calendar integration
      console.warn('[Calendar Availability] No Google Calendar credentials found. Returning static availability.');
      
      const staticAvailability = generateStaticAvailability(
        startDate,
        queryEndDate,
        BUSINESS_START_HOUR,
        BUSINESS_END_HOUR,
        MEETING_DURATION_MINUTES,
        TIMEZONE
      );

      return NextResponse.json({
        availableSlots: staticAvailability,
        calendarConnected: false,
        message: 'Using static availability. Configure Google Calendar for real-time availability.'
      });
    }

    // Query Google Calendar for busy times
    const timeMin = new Date(startDate);
    timeMin.setHours(0, 0, 0, 0);

    const timeMax = new Date(queryEndDate);
    timeMax.setHours(23, 59, 59, 999);

    const freeBusyResponse = await calendar.freebusy.query({
      requestBody: {
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        timeZone: TIMEZONE,
        items: [{ id: calendarId }],
      },
    });

    const busyPeriods = freeBusyResponse.data.calendars?.[calendarId]?.busy || [];

    // Generate all possible time slots
    const allSlots = generateTimeSlots(
      startDate,
      queryEndDate,
      BUSINESS_START_HOUR,
      BUSINESS_END_HOUR,
      MEETING_DURATION_MINUTES,
      TIMEZONE
    );

    // Filter out busy slots
    const availableSlots = allSlots.filter(slot => {
      const slotStart = new Date(slot.startTime);
      const slotEnd = new Date(slot.endTime);

      // Check if slot overlaps with any busy period
      const isBusy = busyPeriods.some((busy: { start?: string; end?: string }) => {
        if (!busy.start || !busy.end) return false;
        
        const busyStart = new Date(busy.start);
        const busyEnd = new Date(busy.end);

        // Slot overlaps if it starts before busy ends and ends after busy starts
        return slotStart < busyEnd && slotEnd > busyStart;
      });

      return !isBusy;
    });

    return NextResponse.json({
      availableSlots,
      calendarConnected: true,
      timezone: TIMEZONE,
    });

  } catch (error) {
    console.error('[Calendar Availability] Error:', error);
    
    // Return error but don't break the widget
    return NextResponse.json(
      {
        availableSlots: [],
        calendarConnected: false,
        error: 'Failed to check calendar availability. Please try again later.',
      },
      { status: 500 }
    );
  }
}

/**
 * Generate all possible time slots within business hours
 */
function generateTimeSlots(
  startDate: Date,
  endDate: Date,
  startHour: number,
  endHour: number,
  durationMinutes: number,
  timezone: string
): Array<{ startTime: string; endTime: string; date: string; time: string; displayDate: string; displayTime: string }> {
  const slots: Array<{ startTime: string; endTime: string; date: string; time: string; displayDate: string; displayTime: string }> = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    // Skip weekends (Saturday = 6, Sunday = 0)
    const dayOfWeek = current.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      current.setDate(current.getDate() + 1);
      continue;
    }

    // Generate slots for this day
    const dateStr = current.toISOString().split('T')[0];
    const displayDate = current.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      timeZone: timezone,
    });

    for (let hour = startHour; hour < endHour; hour++) {
      // Generate slots every durationMinutes (e.g., 30 minutes = 2 slots per hour)
      const slotsPerHour = Math.floor(60 / durationMinutes);
      
      for (let slot = 0; slot < slotsPerHour; slot++) {
        const slotMinutes = slot * durationMinutes;
        const slotHour = hour;
        
        // Skip if slot would extend past business end time
        const slotStartMinutes = hour * 60 + slotMinutes;
        const slotEndMinutes = slotStartMinutes + durationMinutes;
        const businessEndMinutes = endHour * 60;
        
        if (slotEndMinutes > businessEndMinutes) {
          continue; // Skip this slot as it extends past business hours
        }
        
        // Create date in the timezone
        const slotDate = new Date(current);
        slotDate.setHours(slotHour, slotMinutes, 0, 0);
        
        // Convert to ISO for timezone handling
        const slotStartISO = slotDate.toISOString();
        const slotEndDate = new Date(slotDate);
        slotEndDate.setMinutes(slotEndDate.getMinutes() + durationMinutes);
        const slotEndISO = slotEndDate.toISOString();

        // Format display time
        const displayTime = slotDate.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
          timeZone: timezone,
        });

        slots.push({
          startTime: slotStartISO,
          endTime: slotEndISO,
          date: dateStr,
          time: `${slotHour.toString().padStart(2, '0')}:${slotMinutes.toString().padStart(2, '0')}`,
          displayDate,
          displayTime,
        });
      }
    }

    current.setDate(current.getDate() + 1);
  }

  return slots;
}

/**
 * Generate static availability when calendar is not connected
 */
function generateStaticAvailability(
  startDate: Date,
  endDate: Date,
  startHour: number,
  endHour: number,
  durationMinutes: number,
  timezone: string
): Array<{ startTime: string; endTime: string; date: string; time: string; displayDate: string; displayTime: string }> {
  return generateTimeSlots(startDate, endDate, startHour, endHour, durationMinutes, timezone);
}

