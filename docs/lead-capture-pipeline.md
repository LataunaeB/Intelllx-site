# Lead Capture Pipeline Documentation

## Overview

The lead capture pipeline is a branded, server-side solution that captures leads from your chat widget, stores them in Supabase, sends email notifications, and optionally syncs to HubSpot CRM—all without exposing HubSpot scripts or branding on the frontend.

## Architecture

```
Visitor → Chat Widget → /api/leads → Supabase → Email (Resend) → HubSpot CRM (optional)
```

### Flow

1. **Visitor interaction**: User chats with LeadFlow chatbot
2. **Lead capture**: User provides email/name/message
3. **API call**: Widget calls `POST /api/leads`
4. **Supabase storage**: Lead/conversation/message saved to database
5. **Email notification**: Email sent to your inbox via Resend
6. **HubSpot sync** (optional): Contact created/updated + note added (server-side only)

## Environment Variables

### Required

#### Business Hours
```bash
TIMEZONE=America/Los_Angeles
NEXT_PUBLIC_BUSINESS_START_HOUR=9
NEXT_PUBLIC_BUSINESS_END_HOUR=18
```

- **TIMEZONE**: IANA timezone for business hours calculation
- **NEXT_PUBLIC_BUSINESS_START_HOUR**: Start hour (24-hour format, 0-23)
- **NEXT_PUBLIC_BUSINESS_END_HOUR**: End hour (24-hour format, 0-23)

#### Supabase
```bash
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

- **SUPABASE_URL**: Your Supabase project URL
- **SUPABASE_ANON_KEY**: Anonymous/public key (safe for client-side)
- **SUPABASE_SERVICE_ROLE_KEY**: Service role key (server-side only, **NEVER expose to client**)

Get these from: Supabase Dashboard → Settings → API

#### Resend (Email Notifications)
```bash
RESEND_API_KEY=re_xxxxxxxxxx
EMAIL_FROM=leads@intelllx.com
EMAIL_TO=hello@intelllx.com
```

- **RESEND_API_KEY**: API key from [resend.com/api-keys](https://resend.com/api-keys)
- **EMAIL_FROM**: Sender email (must be verified domain in Resend)
- **EMAIL_TO**: Recipient email for lead notifications

### Optional

#### HubSpot CRM Sync (Server-side only)
```bash
HUBSPOT_PRIVATE_APP_TOKEN=pat-na1-xxxxxxxx
HUBSPOT_PORTAL_ID=244071022
```

- **HUBSPOT_PRIVATE_APP_TOKEN**: Private app access token (server-side only)
- **HUBSPOT_PORTAL_ID**: Your HubSpot portal ID (for reference)

**How to create Private App Token:**
1. Go to HubSpot → Settings → Integrations → Private Apps
2. Create new app
3. Required scopes:
   - `crm.objects.contacts.write`
   - `crm.objects.notes.write`
4. Copy the access token

## Database Schema

### Tables

#### leads
Stores contact information for potential customers.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `email` | TEXT | Email address (unique) |
| `name` | TEXT | Full name (optional) |
| `source` | TEXT | Lead source (e.g., 'chat', 'contact-form') |
| `page_url` | TEXT | Page where lead was captured |
| `created_at` | TIMESTAMPTZ | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | Last update timestamp |

#### conversations
Groups messages by lead for chat conversations.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `lead_id` | UUID | Foreign key → leads.id |
| `status` | TEXT | 'active', 'closed', or 'archived' |
| `created_at` | TIMESTAMPTZ | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | Last update timestamp |

#### messages
Individual messages in conversations.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `conversation_id` | UUID | Foreign key → conversations.id |
| `role` | TEXT | 'user' (customer), 'assistant' (AI/staff), or 'system' |
| `content` | TEXT | Message text |
| `created_at` | TIMESTAMPTZ | Creation timestamp |

### Row Level Security (RLS)

All tables have RLS enabled with the following policies:

- **Service role**: Full access (SELECT, INSERT, UPDATE, DELETE)
- **Anonymous users**: INSERT only (for lead capture)
- **No public reads**: Data can only be read server-side

This ensures:
- Leads can be captured from the frontend
- Data is only accessible via authenticated API routes
- No sensitive information is exposed to clients

## API Endpoint: /api/leads

### POST /api/leads

Captures a lead, saves to Supabase, sends email, and syncs to HubSpot (if configured).

#### Request

```typescript
POST /api/leads
Content-Type: application/json

{
  "email": "user@example.com",     // Required
  "name": "John Doe",               // Optional
  "message": "First message...",    // Optional
  "source": "chat",                 // Optional (default: "chat")
  "pageUrl": "https://..."          // Optional
}
```

#### Response

**Success (200)**:
```json
{
  "ok": true,
  "leadId": "uuid-here",
  "conversationId": "uuid-here"
}
```

**Error (400/500)**:
```json
{
  "error": "Error message"
}
```

#### Validation

- Email is required and must be valid format
- Duplicate emails update existing lead (upsert)
- Empty/missing email returns 400 error

#### Processing Steps

1. **Validate** email format
2. **Upsert lead** in Supabase (insert or update by email)
3. **Find or create conversation** for the lead
4. **Insert message** if provided
5. **Send email** notification via Resend
6. **Sync to HubSpot** (if token configured):
   - Search for contact by email
   - Create contact if not found
   - Create note with message and associate to contact

## Business Hours Logic

The chat widget checks business hours on load and adjusts its behavior:

### Within Business Hours (Mon-Fri, 9 AM - 6 PM PT)
- Standard welcome message
- Normal operation

### Outside Business Hours
- "Away" message displayed
- Prompts user to leave information
- Mentions "We'll reply next business day"
- Still captures leads normally

### Implementation

```typescript
import { isWithinBusinessHours, getAwayMessage } from '@/lib/business-hours';

// Check if within hours
const withinHours = isWithinBusinessHours();

// Get away message
const message = getAwayMessage();
```

## Chat Widget Integration

The `LeadFlowChatbot` component automatically:

1. **Checks business hours** on mount
2. **Shows appropriate welcome message**
3. **Captures lead data** (name, email, phone)
4. **Calls /api/leads** when user submits
5. **Handles success/error states**
6. **Opens Calendly** for booking

### Lead Submission Flow

```typescript
// User fills form (name, email, phone)
// On submit:
handleLeadSubmit() {
  1. Get last user message as context
  2. POST to /api/leads with email, name, message, source, pageUrl
  3. Show loading state
  4. On success:
     - Show confirmation
     - Open Calendly
     - Reset form
  5. On error:
     - Show error message with fallback contact info
}
```

## HubSpot CRM Integration (Server-side)

When `HUBSPOT_PRIVATE_APP_TOKEN` is configured, the API automatically syncs leads to HubSpot.

### API Endpoints Used

1. **Contacts Search API**
   ```
   POST https://api.hubapi.com/crm/v3/objects/contacts/search
   ```
   Searches for existing contact by email.

2. **Contacts API**
   ```
   POST https://api.hubapi.com/crm/v3/objects/contacts
   ```
   Creates new contact if not found.

3. **Notes API**
   ```
   POST https://api.hubapi.com/crm/v3/objects/notes
   ```
   Creates note with message and associates to contact.

### Note Format

```
Lead Capture - chat

Message: [user's message]

Page: [page URL]

Captured: [ISO timestamp]
```

### Documentation References

- [HubSpot Contacts Search API](https://developers.hubspot.com/docs/api/crm/search)
- [HubSpot Contacts API](https://developers.hubspot.com/docs/api/crm/contacts)
- [HubSpot Notes API](https://developers.hubspot.com/docs/api/crm/notes)

## Setup Instructions

### 1. Supabase Setup

1. Create Supabase project at [supabase.com](https://supabase.com)
2. Run migration:
   - Go to SQL Editor in Supabase dashboard
   - Copy contents of `supabase/migrations/20251011_lead_capture_schema.sql`
   - Run the SQL
3. Verify tables created: leads, conversations, messages
4. Copy credentials from Settings → API

### 2. Resend Setup

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain
3. Create API key at [resend.com/api-keys](https://resend.com/api-keys)
4. Configure `EMAIL_FROM` with verified domain

### 3. HubSpot Setup (Optional)

1. Go to HubSpot → Settings → Integrations → Private Apps
2. Create private app with scopes:
   - `crm.objects.contacts.write`
   - `crm.objects.notes.write`
3. Copy access token
4. Add to `HUBSPOT_PRIVATE_APP_TOKEN` env var

### 4. Vercel Configuration

Add all environment variables in Vercel:
1. Go to Project → Settings → Environment Variables
2. Add each variable for Production and Preview
3. Redeploy to apply changes

**Important**: Never expose `SUPABASE_SERVICE_ROLE_KEY` or `HUBSPOT_PRIVATE_APP_TOKEN` to the client.

## Testing

### 1. Local Testing

```bash
# Add env vars to .env.local
cp .env.local.example .env.local
# Edit .env.local with your credentials

# Run dev server
npm run dev

# Open http://localhost:3000
# Open chat widget
# Fill form and submit
```

### 2. Verify Supabase Storage

1. Go to Supabase Dashboard → Table Editor
2. Check `leads` table for new row
3. Check `conversations` and `messages` tables

### 3. Verify Email

Check your inbox (`EMAIL_TO`) for notification email.

### 4. Verify HubSpot Sync

1. Go to HubSpot → Contacts
2. Search for the email you used
3. Check contact record for new note

## Troubleshooting

### No email received

- Check Resend dashboard for delivery status
- Verify `EMAIL_FROM` domain is verified
- Check spam folder
- Verify `RESEND_API_KEY` is correct

### Supabase errors

- Verify service role key is correct
- Check RLS policies are enabled
- Review Supabase logs in dashboard

### HubSpot sync fails

- Verify private app token has correct scopes
- Check HubSpot rate limits (100 requests/10 seconds)
- Review server logs for API errors

### Chat widget not showing away message

- Verify `TIMEZONE` is valid IANA timezone
- Check `NEXT_PUBLIC_BUSINESS_START_HOUR` and `NEXT_PUBLIC_BUSINESS_END_HOUR`
- Verify business hours logic with `console.log(isWithinBusinessHours())`

## Security Considerations

✅ **Do:**
- Use service role key server-side only
- Validate all user inputs
- Use RLS policies on Supabase
- Rate limit API endpoints
- Use HTTPS everywhere

❌ **Don't:**
- Expose service role key to client
- Expose HubSpot private app token to client
- Skip input validation
- Disable RLS policies
- Hardcode credentials

## Monitoring

### Key Metrics to Track

1. **Lead capture rate**: Leads captured / widget opens
2. **Email delivery rate**: Emails sent / emails delivered
3. **HubSpot sync success rate**: Syncs attempted / syncs succeeded
4. **API response time**: Average time for /api/leads

### Logs to Monitor

- Supabase database logs
- Vercel function logs
- Resend delivery logs
- HubSpot API response logs

## Maintenance

### Regular Tasks

- **Weekly**: Review lead data in Supabase
- **Monthly**: Check email deliverability
- **Quarterly**: Review HubSpot sync accuracy
- **As needed**: Update business hours for holidays

### Backups

Supabase automatically backs up your database. To download:
1. Go to Supabase Dashboard → Database
2. Click "Backups"
3. Download latest backup

## Support

For issues or questions:
- Check server logs in Vercel
- Review Supabase logs
- Check Resend dashboard
- Review HubSpot API documentation

## Migration from HubSpot Frontend

This system replaces:
- ✅ HubSpot tracking scripts (removed)
- ✅ HubSpot form embeds (removed)
- ✅ HubSpot chat widget (using custom widget)
- ✅ Frontend HubSpot APIs (now server-side only)

Benefits:
- ✅ Branded experience (no HubSpot branding)
- ✅ Full control over data
- ✅ Faster page load (fewer scripts)
- ✅ Better privacy (server-side only)
- ✅ Own your data (Supabase)

