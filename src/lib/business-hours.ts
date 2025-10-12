/**
 * Business Hours Utility
 * 
 * Checks if current time is within configured business hours.
 * Default: Monday-Friday, 9 AM - 6 PM America/Los_Angeles
 * 
 * Note: These checks are for display/messaging purposes only.
 * The chat widget itself is available 24/7.
 */

/**
 * Check if a given date is a business day (Mon-Fri)
 */
export function isBusinessDay(date: Date): boolean {
  const day = date.getDay();
  return day >= 1 && day <= 5; // Monday = 1, Friday = 5
}

/**
 * Check if a given date/time is within business hours in the specified timezone
 * 
 * @param date - The date to check
 * @param timezone - IANA timezone (e.g., 'America/Los_Angeles')
 * @param startHour - Business start hour (0-23)
 * @param endHour - Business end hour (0-23)
 * @returns true if within business hours, false otherwise
 */
export function isBusinessHour(
  date: Date,
  timezone: string,
  startHour: number,
  endHour: number
): boolean {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      hour12: false,
    });

    const parts = formatter.formatToParts(date);
    const hour = parseInt(parts.find(p => p.type === 'hour')?.value || '0', 10);

    return hour >= startHour && hour < endHour;
  } catch (error) {
    console.error('[Business Hours] Error checking hour:', error);
    return true;
  }
}

/**
 * Check if current time is within business hours
 * Uses env vars for configuration
 * Note: Uses NEXT_PUBLIC_ prefix for client-side availability
 */
export function isWithinBusinessHours(): boolean {
  const timezone = process.env.NEXT_PUBLIC_TIMEZONE || 'America/Los_Angeles';
  const startHour = parseInt(process.env.NEXT_PUBLIC_BUSINESS_START_HOUR || '9', 10);
  const endHour = parseInt(process.env.NEXT_PUBLIC_BUSINESS_END_HOUR || '18', 10);

  const now = new Date();
  
  return isBusinessDay(now) && isBusinessHour(now, timezone, startHour, endHour);
}

/**
 * Get a human-readable business hours message
 */
export function getBusinessHoursMessage(): string {
  const startHour = parseInt(process.env.NEXT_PUBLIC_BUSINESS_START_HOUR || '9', 10);
  const endHour = parseInt(process.env.NEXT_PUBLIC_BUSINESS_END_HOUR || '18', 10);
  const timezone = process.env.NEXT_PUBLIC_TIMEZONE || 'America/Los_Angeles';
  
  const formatHour = (hour: number) => {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
  };
  
  const tzName = timezone.split('/')[1]?.replace('_', ' ') || 'PT';
  return `Monday–Friday, ${formatHour(startHour)}–${formatHour(endHour)} ${tzName}`;
}

/**
 * Get time slots for a given date (Mon-Fri 9-6 PT only)
 * Returns array of { value: 'HH:mm', label: 'H:MM AM/PM' }
 */
export function getAvailableTimeSlots(date: Date): Array<{ value: string; label: string }> {
  if (!isBusinessDay(date)) {
    return [];
  }

  const slots: Array<{ value: string; label: string }> = [];
  const startHour = parseInt(process.env.NEXT_PUBLIC_BUSINESS_START_HOUR || '9', 10);
  const endHour = parseInt(process.env.NEXT_PUBLIC_BUSINESS_END_HOUR || '18', 10);

  for (let hour = startHour; hour < endHour; hour++) {
    for (const minute of [0, 30]) {
      const value = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      
      let label: string;
      if (hour === 0) label = `12:${String(minute).padStart(2, '0')} AM`;
      else if (hour < 12) label = `${hour}:${String(minute).padStart(2, '0')} AM`;
      else if (hour === 12) label = `12:${String(minute).padStart(2, '0')} PM`;
      else label = `${hour - 12}:${String(minute).padStart(2, '0')} PM`;

      slots.push({ value, label });
    }
  }

  return slots;
}

