import { OAuth2Client } from 'google-auth-library';

export function generateGoogleAuthUrl(redirectUri: string, state?: string): string {
  const oauth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    redirectUri
  );

  const scopes = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events',
  ];

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    state: state || 'calendar-booking',
    prompt: 'consent', // Force consent screen to get refresh token
  });
}

export function createGoogleOAuthClient(redirectUri: string): OAuth2Client {
  return new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    redirectUri
  );
}










