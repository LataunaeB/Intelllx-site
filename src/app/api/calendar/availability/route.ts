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
 * - endDate: ISO date string (optional, defaults to 1 year from today for year-round booking)
 * 
 * Business Rules:
 * - Monday-Friday only (no weekends)
 * - 9 AM - 6 PM PST
 * - 30-minute meetings
 * - Year-round booking (no advance limit)
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

    // Calculate date range
    const now = new Date();
    const today = new Date(now.toLocaleString('en-US', { timeZone: TIMEZONE }));
    today.setHours(0, 0, 0, 0);

    const startDate = startDateParam 
      ? new Date(startDateParam)
      : today;
    
    // Default to 1 year ahead if no endDate specified (year-round booking)
    const defaultEndDate = new Date(today);
    defaultEndDate.setFullYear(today.getFullYear() + 1);
    
    const endDate = endDateParam 
      ? new Date(endDateParam)
      : defaultEndDate;

    const queryEndDate = endDate;

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
 * Check if a date is in daylight saving time for Pacific timezone (America/Los_Angeles)
 * DST: 2nd Sunday in March to 1st Sunday in November
 */
function isDaylightSavingTime(year: number, month: number, day: number): boolean {
  // DST in Pacific timezone (America/Los_Angeles):
  // Starts: 2nd Sunday in March at 2:00 AM
  // Ends: 1st Sunday in November at 2:00 AM
  
  // Get 2nd Sunday in March
  const marchSecondSunday = getNthSundayInMonth(year, 3, 2);
  // Get 1st Sunday in November
  const novemberFirstSunday = getNthSundayInMonth(year, 11, 1);
  
  // Create date objects for comparison (using UTC to avoid local timezone issues)
  const testDate = new Date(Date.UTC(year, month - 1, day));
  const dstStart = new Date(Date.UTC(year, 2, marchSecondSunday, 10)); // March 2nd Sunday, 2 AM PST = 10 AM UTC
  const dstEnd = new Date(Date.UTC(year, 10, novemberFirstSunday, 9)); // November 1st Sunday, 2 AM PDT = 9 AM UTC
  
  // DST is active from 2nd Sunday March to 1st Sunday November
  return testDate >= dstStart && testDate < dstEnd;
}

/**
 * Get the date of the Nth Sunday in a given month
 */
function getNthSundayInMonth(year: number, month: number, n: number): number {
  // Find first Sunday of the month
  const firstDay = new Date(year, month - 1, 1);
  const firstSunday = 1 + (7 - firstDay.getDay()) % 7;
  
  // Get Nth Sunday
  return firstSunday + (n - 1) * 7;
}

/**
 * Get the Nth weekday (0=Sunday, 1=Monday, etc.) in a given month
 */
function getNthWeekdayInMonth(year: number, month: number, weekday: number, n: number): number {
  // Find first occurrence of the weekday in the month
  const firstDay = new Date(year, month - 1, 1);
  const firstWeekday = 1 + (weekday - firstDay.getDay() + 7) % 7;
  
  // Get Nth occurrence
  return firstWeekday + (n - 1) * 7;
}

/**
 * Get the last weekday (0=Sunday, 1=Monday, etc.) in a given month
 */
function getLastWeekdayInMonth(year: number, month: number, weekday: number): number {
  // Start from the last day of the month
  const lastDay = new Date(year, month, 0);
  const lastDayOfWeek = lastDay.getDay();
  
  // Calculate how many days to go back to reach the target weekday
  const daysBack = (lastDayOfWeek - weekday + 7) % 7;
  
  return lastDay.getDate() - daysBack;
}

/**
 * Check if a date is a US federal holiday
 * Returns true if the date is a holiday, false otherwise
 */
function isHoliday(year: number, month: number, day: number): boolean {
  // New Year's Day (January 1)
  if (month === 1 && day === 1) return true;
  
  // Martin Luther King Jr. Day (3rd Monday in January)
  const mlkDay = getNthWeekdayInMonth(year, 1, 1, 3); // 1 = Monday, 3rd occurrence
  if (month === 1 && day === mlkDay) return true;
  
  // Presidents' Day (3rd Monday in February)
  const presidentsDay = getNthWeekdayInMonth(year, 2, 1, 3);
  if (month === 2 && day === presidentsDay) return true;
  
  // Memorial Day (last Monday in May)
  const memorialDay = getLastWeekdayInMonth(year, 5, 1);
  if (month === 5 && day === memorialDay) return true;
  
  // Independence Day (July 4)
  if (month === 7 && day === 4) return true;
  
  // Labor Day (1st Monday in September)
  const laborDay = getNthWeekdayInMonth(year, 9, 1, 1);
  if (month === 9 && day === laborDay) return true;
  
  // Columbus Day / Indigenous Peoples' Day (2nd Monday in October)
  const columbusDay = getNthWeekdayInMonth(year, 10, 1, 2);
  if (month === 10 && day === columbusDay) return true;
  
  // Veterans Day (November 11)
  if (month === 11 && day === 11) return true;
  
  // Thanksgiving (4th Thursday in November)
  const thanksgiving = getNthWeekdayInMonth(year, 11, 4, 4); // 4 = Thursday
  if (month === 11 && day === thanksgiving) return true;
  
  // Christmas (December 25)
  if (month === 12 && day === 25) return true;
  
  return false;
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
    // Get the date in PST timezone to avoid timezone issues
    const dateStrPST = current.toLocaleDateString('en-CA', { timeZone: timezone }); // YYYY-MM-DD format
    const dateStr = dateStrPST; // Use PST date string
    
    // Extract date components for use later
    const [year, month, day] = dateStrPST.split('-');
    
    // Skip holidays
    const yearNum = parseInt(year);
    const monthNum = parseInt(month);
    const dayNum = parseInt(day);
    if (isHoliday(yearNum, monthNum, dayNum)) {
      current.setDate(current.getDate() + 1);
      continue;
    }
    
    // Format display date directly from PST date components to avoid timezone conversion issues
    // Create a date in PST by using noon PST (to avoid date boundary issues)
    const dateStrPSTNoon = `${dateStrPST}T12:00:00`;
    // Get UTC offset for PST/PDT on this date
    const isDST = isDaylightSavingTime(parseInt(year), parseInt(month), parseInt(day));
    const offset = isDST ? '-07:00' : '-08:00';
    const dateInPST = new Date(`${dateStrPSTNoon}${offset}`);
    
    // Format display date in PST timezone
    const displayDate = dateInPST.toLocaleDateString('en-US', {
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
        
        // Use the PST date components already extracted above (already parsed for holiday check)
        
        // Create time string in HH:MM format
        const timeStr = `${String(slotHour).padStart(2, '0')}:${String(slotMinutes).padStart(2, '0')}:00`;
        
        // Create a date string that represents the time in PST
        // Format: YYYY-MM-DDTHH:MM:SS
        const dateTimeStrPST = `${dateStrPST}T${timeStr}`;
        
        // Check if DST applies (PST is -08:00, PDT is -07:00)
        // DST in US Pacific: 2nd Sunday in March to 1st Sunday in November
        const isDST = isDaylightSavingTime(yearNum, monthNum, dayNum);
        const offset = isDST ? '-07:00' : '-08:00';
        
        // Create date with proper PST/PDT offset
        const slotDateCorrect = new Date(`${dateTimeStrPST}${offset}`);
        const slotStartISO = slotDateCorrect.toISOString();
        
        const slotEndDate = new Date(slotDateCorrect);
        slotEndDate.setMinutes(slotEndDate.getMinutes() + durationMinutes);
        const slotEndISO = slotEndDate.toISOString();

        // Format display time in PST (should match slotHour:slotMinutes)
        const displayTime = slotDateCorrect.toLocaleTimeString('en-US', {
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

