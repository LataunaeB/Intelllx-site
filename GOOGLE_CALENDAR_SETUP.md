# Google Calendar Booking Setup

This guide explains how to set up Google Calendar integration for booking meetings.

---

## Required Environment Variables

You need **ONE** of these authentication methods:

### Option 1: Service Account (Recommended for Production)

Service account authentication is the easiest and most secure for server-side booking.

**Required variables:**
- `GOOGLE_SERVICE_ACCOUNT_EMAIL` - Your service account email
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` - Your service account private key
- `GOOGLE_CALENDAR_ID` (optional) - Calendar ID to use, defaults to `'primary'`

**How to set up:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select a project
3. Enable Google Calendar API:
   - Go to **APIs & Services** → **Library**
   - Search for "Google Calendar API"
   - Click **Enable**
4. Create a service account:
   - Go to **APIs & Services** → **Credentials**
   - Click **Create Credentials** → **Service Account**
   - Name it (e.g., "calendar-booking-service")
   - Click **Create and Continue**
   - Skip role assignment → **Continue**
   - Click **Done**
5. Create a key:
   - Click on your service account
   - Go to **Keys** tab
   - Click **Add Key** → **Create New Key**
   - Choose **JSON** format
   - Download the JSON file
6. Share your calendar:
   - Open [Google Calendar](https://calendar.google.com/)
   - Click the **Settings** gear icon
   - Go to **Settings for my calendars** → Select your calendar
   - Scroll to **Share with specific people**
   - Click **Add people**
   - Add the service account email (found in the downloaded JSON file as `client_email`)
   - Give it **Make changes to events** permission
   - Click **Send**
7. Get credentials from JSON:
   - Open the downloaded JSON file
   - Copy `client_email` → This is `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - Copy `private_key` → This is `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`
   - The private key includes `\n` characters - keep them as-is

**Set in Vercel:**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL` = (from JSON `client_email`)
   - `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` = (from JSON `private_key` - keep `\n` characters)
   - `GOOGLE_CALENDAR_ID` = `primary` (or your specific calendar ID)
5. Select **Production**, **Preview**, and **Development**
6. Click **Save**
7. Redeploy your project

---

### Option 2: OAuth Refresh Token

Use this if you prefer OAuth flow instead of service account.

**Required variables:**
- `GOOGLE_CLIENT_ID` - OAuth client ID
- `GOOGLE_CLIENT_SECRET` - OAuth client secret
- `GOOGLE_REFRESH_TOKEN` - Refresh token (obtained after OAuth flow)
- `GOOGLE_CALENDAR_ID` (optional) - Calendar ID, defaults to `'primary'`

**How to set up:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select a project
3. Enable Google Calendar API (same as Option 1, step 3)
4. Create OAuth credentials:
   - Go to **APIs & Services** → **Credentials**
   - Click **Create Credentials** → **OAuth client ID**
   - Choose **Web application**
   - Name it (e.g., "calendar-booking")
   - Add authorized redirect URIs:
     - For local dev: `http://localhost:3000/api/auth/callback/google`
     - For production: `https://yourdomain.com/api/auth/callback/google`
   - Click **Create**
   - Copy the **Client ID** and **Client Secret**
5. Get refresh token:
   - You'll need to complete an OAuth flow to get a refresh token
   - The refresh token allows long-term access without re-authenticating
   - See [Google OAuth 2.0 documentation](https://developers.google.com/identity/protocols/oauth2) for details

**Set in Vercel:**
- `GOOGLE_CLIENT_ID` = (from OAuth credentials)
- `GOOGLE_CLIENT_SECRET` = (from OAuth credentials)
- `GOOGLE_REFRESH_TOKEN` = (from OAuth flow)
- `GOOGLE_CALENDAR_ID` = `primary` (optional)

---

## Testing

After setting up credentials:

1. Fill out the contact form
2. Select a date and time
3. Submit the booking
4. Check for error messages (they'll now show specific details)
5. If successful, check your Google Calendar for the new event

---

## Troubleshooting

### Error: "No Google Calendar credentials configured"
- You need to set up either Option 1 or Option 2 above
- Make sure environment variables are set in Vercel
- Redeploy after adding environment variables

### Error: "Permission denied" or "Calendar not found"
- Make sure you shared your calendar with the service account email (Option 1)
- Check that `GOOGLE_CALENDAR_ID` is correct (try `'primary'` first)
- Verify the service account has "Make changes to events" permission

### Error: "Invalid credentials"
- Check that `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` includes `\n` characters
- Don't remove or escape the newline characters in the private key
- For OAuth, verify the refresh token is still valid

### Booking succeeds but no event appears
- Check your Google Calendar spam/deleted items
- Verify the calendar ID is correct
- Check Google Calendar settings for the calendar you're using

---

## Current Status

✅ Error handling improved - shows specific error messages
❌ **Google Calendar credentials need to be configured**

Once credentials are set up, the booking should work automatically!




