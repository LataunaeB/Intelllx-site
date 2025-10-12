/**
 * Business Hours Utility
 * 
 * Determines if current time is within business hours based on env vars
 */

export interface BusinessHoursConfig {
  timezone: string;
  startHour: number;
  endHour: number;
}

/**
 * Check if current time is within business hours
 */
export function isWithinBusinessHours(): boolean {
  const timezone = process.env.TIMEZONE || 'America/Los_Angeles';
  const startHour = parseInt(process.env.NEXT_PUBLIC_BUSINESS_START_HOUR || '9', 10);
  const endHour = parseInt(process.env.NEXT_PUBLIC_BUSINESS_END_HOUR || '18', 10);

  try {
    // Get current time in the specified timezone
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      hour12: false,
      weekday: 'short',
    });

    const parts = formatter.formatToParts(now);
    const hourPart = parts.find(part => part.type === 'hour');
    const weekdayPart = parts.find(part => part.type === 'weekday');

    if (!hourPart || !weekdayPart) {
      return true; // Default to available if we can't determine time
    }

    const currentHour = parseInt(hourPart.value, 10);
    const weekday = weekdayPart.value;

    // Check if it's a weekend
    if (weekday === 'Sat' || weekday === 'Sun') {
      return false;
    }

    // Check if within business hours
    return currentHour >= startHour && currentHour < endHour;
  } catch (error) {
    console.error('[Business Hours] Error checking hours:', error);
    return true; // Default to available on error
  }
}

/**
 * Get formatted business hours string
 */
export function getBusinessHoursString(): string {
  const startHour = parseInt(process.env.NEXT_PUBLIC_BUSINESS_START_HOUR || '9', 10);
  const endHour = parseInt(process.env.NEXT_PUBLIC_BUSINESS_END_HOUR || '18', 10);
  const timezone = process.env.TIMEZONE || 'America/Los_Angeles';

  const formatHour = (hour: number): string => {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
  };

  const tzAbbr = timezone === 'America/Los_Angeles' ? 'PT' : 
                 timezone === 'America/New_York' ? 'ET' :
                 timezone === 'America/Chicago' ? 'CT' :
                 timezone === 'America/Denver' ? 'MT' : '';

  return `Monday-Friday, ${formatHour(startHour)} - ${formatHour(endHour)} ${tzAbbr}`;
}

/**
 * Get away message for after-hours
 */
export function getAwayMessage(): string {
  const hours = getBusinessHoursString();
  return `Thanks for reaching out! We're currently away from our desk. Our business hours are ${hours}. Please leave your information and message, and we'll get back to you on the next business day!`;
}

