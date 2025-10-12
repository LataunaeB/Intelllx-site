# Contact Form Flow Documentation

This document explains how the contact form works, including Supabase storage, Resend email notifications, and the single booking CTA on success.

---

## Overview

The contact form is available 24/7 and provides:
- **Persistent storage** in Supabase (leads, conversations, messages)
- **Email notifications** via Resend to `hello@intelllx.com`
- **Single CTA on success**: "Book a discovery call" button
- **Graceful degradation**: Works even if Resend DNS isn't verified yet

---

## Environment Variables

### Required for Local Development

Add these to `.env.local`:

```bash
# Supabase (get from https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Resend (get from https://resend.com/api-keys)
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM=leads@intelllx.com          # Sender email
RESEND_TO=hello@intelllx.com            # Where notifications go

# Scheduler (Calendly, Cal.com, etc.)
NEXT_PUBLIC_MEETINGS_URL=https://calendly.com/lataunaeb-intelllx-discovery/30min

# Business hours (for "Away" message display)
TIMEZONE=America/Los_Angeles
NEXT_PUBLIC_BUSINESS_START_HOUR=9
NEXT_PUBLIC_BUSINESS_END_HOUR=18
```

### Required for Production (Vercel)

Add the same environment variables in Vercel:

1. Go to https://vercel.com/dashboard
2. Select your project (`intelllx-site`)
3. Go to **Settings** → **Environment Variables**
4. Add each variable above for **Production**, **Preview**, and **Development** environments

**Important:** 
- `SUPABASE_SERVICE_ROLE_KEY` should be **server-only** (never exposed to client)
- Only `NEXT_PUBLIC_*` variables are available in the browser

---

## Database Schema

### Tables

The schema is defined in `supabase/migrations/20251012_contact_leads_schema.sql`.

#### 1. `leads` Table
Stores core contact information.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `email` | TEXT | Email address (unique) |
| `name` | TEXT | Contact name (optional) |
| `phone` | TEXT | Phone number (optional) |
| `source` | TEXT | Source of lead (e.g., 'contact_form', 'chat_widget') |
| `page_url` | TEXT | Page where submission occurred |
| `created_at` | TIMESTAMPTZ | When lead was first created |
| `updated_at` | TIMESTAMPTZ | Last update timestamp |

#### 2. `conversations` Table
Tracks interactions with leads.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `lead_id` | UUID | Foreign key to leads table |
| `status` | TEXT | Status: 'new', 'in_progress', 'closed' |
| `created_at` | TIMESTAMPTZ | When conversation started |
| `updated_at` | TIMESTAMPTZ | Last update timestamp |

#### 3. `messages` Table
Stores all messages in conversations.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `conversation_id` | UUID | Foreign key to conversations table |
| `content` | TEXT | Message content |
| `is_from_lead` | BOOLEAN | true if from lead, false if from support |
| `created_at` | TIMESTAMPTZ | When message was sent |

### Running the Migration

**Option 1: Supabase Dashboard (Recommended)**

1. Go to https://supabase.com/dashboard/project/YOUR_PROJECT/sql
2. Click **New Query**
3. Copy the contents of `supabase/migrations/20251012_contact_leads_schema.sql`
4. Paste into the SQL editor
5. Click **Run** (or Cmd/Ctrl + Enter)
6. Verify tables were created in the **Table Editor**

**Option 2: Supabase CLI**

```bash
cd /path/to/intelllx-site
supabase db push
```

---

## API Endpoint: POST /api/leads

### Request

**URL:** `POST /api/leads`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "email": "customer@example.com",       // required
  "name": "John Doe",                    // optional
  "phone": "+1 (555) 123-4567",          // optional
  "message": "I'd like to learn more",   // optional
  "source": "contact_form",              // optional, default: 'contact_form'
  "pageUrl": "https://intelllx.com/contact" // optional
}
```

### Response

**Success (200):**
```json
{
  "ok": true
}
```

**Validation Error (400):**
```json
{
  "ok": false,
  "error": "Valid email address is required"
}
```

**Server Error (500):**
```json
{
  "ok": false,
  "error": "An unexpected error occurred"
}
```

### What Happens Internally

1. **Validate email** - Ensures valid email format
2. **Trim & sanitize** all fields
3. **Upsert lead** - Insert or update existing lead by email
4. **Create/get conversation** - Finds or creates a conversation for this lead
5. **Insert message** - Adds message to conversation (if provided)
6. **Send email notification** - Attempts to send via Resend
   - If Resend fails (e.g., DNS not verified), logs warning but still returns success
   - This ensures the form never breaks due to email issues
7. **Return success** - Client sees success message

---

## Resend Email Configuration

### Setup Steps

1. **Sign up for Resend**: https://resend.com
2. **Get API key**: https://resend.com/api-keys
3. **Add domain**: https://resend.com/domains
   - Add `intelllx.com`
   - Configure DNS records (SPF, MX, DKIM)

### DNS Records Required

**SPF Record (TXT):**
```
v=spf1 include:_spf.google.com include:amazonses.com ~all
```
*(Includes both Google Workspace and Resend)*

**MX Record 1:**
```
Priority: 1
Value: SMTP.GOOGLE.COM.
```

**MX Record 2:**
```
Priority: 10
Value: feedback-smtp.us-east-1.amazonses.com
```

**DKIM Records:**
Follow Resend's instructions (3 TXT records provided by Resend)

### DNS Propagation

- DNS changes can take 24-48 hours to fully propagate
- **The form will still work** during this time:
  - Submissions are saved to Supabase ✅
  - Email delivery may be unreliable ⚠️
  - No errors shown to users ✅

### Checking Email Deliverability

**Before DNS Verification:**
- Emails may go to spam or be rejected
- Check Resend dashboard for delivery status
- Check Supabase to confirm submissions are being stored

**After DNS Verification:**
- All emails should deliver reliably
- Test by submitting the contact form
- Check `hello@intelllx.com` inbox

---

## Success Flow

### What Users See

1. **Fill out form** and click "Send Message"
2. **Loading state** - Button shows "Sending..." and is disabled
3. **Success message** appears:
   - ✅ Confirmation text
   - 📅 Single CTA: "Book a Discovery Call" button
   - Button opens `NEXT_PUBLIC_MEETINGS_URL` in new tab

### Code Flow

```typescript
// 1. User submits form
await fetch('/api/leads', {
  method: 'POST',
  body: JSON.stringify({ email, name, message, ... })
});

// 2. Server saves to Supabase
const { data: lead } = await supabase
  .from('leads')
  .upsert({ email, name, ... });

// 3. Server sends email (or logs warning if it fails)
await resend.emails.send({
  from: 'leads@intelllx.com',
  to: 'hello@intelllx.com',
  subject: 'New Lead — Intelllx',
  html: '<email HTML>'
});

// 4. Client shows success + CTA
setSubmitStatus('success');
// User clicks "Book a Discovery Call"
window.open(NEXT_PUBLIC_MEETINGS_URL, '_blank');
```

---

## Updating the Scheduler URL

To change the booking link (e.g., switch from Calendly to Cal.com):

**Local Development:**

1. Edit `.env.local`:
   ```bash
   NEXT_PUBLIC_MEETINGS_URL=https://cal.com/your-username
   ```
2. Restart dev server: `npm run dev`

**Production (Vercel):**

1. Go to Vercel dashboard → Settings → Environment Variables
2. Edit `NEXT_PUBLIC_MEETINGS_URL`
3. Change value to new URL
4. Redeploy (Vercel will auto-redeploy)

**No code changes needed!** The URL is read from the environment variable.

---

## Business Hours & "Away" Message

The contact form is **always available**, but shows an "Away" message outside business hours (Mon-Fri 9 AM-6 PM PT).

### Configuration

Set these in `.env.local` and Vercel:

```bash
TIMEZONE=America/Los_Angeles
NEXT_PUBLIC_BUSINESS_START_HOUR=9   # 9 AM
NEXT_PUBLIC_BUSINESS_END_HOUR=18    # 6 PM
```

### Display Logic

**Within business hours (Mon-Fri 9 AM-6 PM PT):**
- Form displays normally
- No "away" message

**Outside business hours:**
- Small note: "Away—replies next business day"
- Form still works normally
- Users can submit anytime

**Implementation:**
```typescript
const isBusinessHours = () => {
  const now = new Date();
  const day = now.getDay(); // 0-6 (Sun-Sat)
  const hour = now.getHours(); // 0-23
  
  const isWeekday = day >= 1 && day <= 5; // Mon-Fri
  const isDuringHours = hour >= 9 && hour < 18; // 9 AM-6 PM
  
  return isWeekday && isDuringHours;
};
```

---

## Troubleshooting

### Issue: Form submission fails with "Server configuration error"

**Cause:** Supabase credentials missing or incorrect

**Fix:**
1. Check `.env.local` has `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
2. Verify keys are correct (copy from Supabase dashboard)
3. Restart dev server

---

### Issue: Email notifications not arriving

**Cause:** Resend DNS not verified or API key missing

**Check:**
1. **Supabase**: Go to Table Editor → `leads` → Verify row was created ✅
2. **Resend Dashboard**: Check delivery status at https://resend.com/emails
3. **DNS**: Check status at https://resend.com/domains
4. **Spam folder**: Check `hello@intelllx.com` spam

**Remember:** The form will still work and save submissions even if email fails!

---

### Issue: "Book a Discovery Call" button doesn't work

**Cause:** `NEXT_PUBLIC_MEETINGS_URL` not set or incorrect

**Fix:**
1. Set `NEXT_PUBLIC_MEETINGS_URL` in `.env.local` and Vercel
2. Ensure URL starts with `https://`
3. Redeploy

---

### Issue: Submissions not saving to Supabase

**Check:**
1. **Migration ran successfully** - Verify tables exist
2. **RLS policies** - Ensure anon can INSERT
3. **Service role key** - Use service role, not anon key in API route
4. **Supabase logs** - Check for errors in dashboard

---

## Testing Checklist

### Local Testing

- [ ] Fill out contact form with valid data
- [ ] Click "Send Message" - button shows loading state
- [ ] Success message appears with "Book a Discovery Call" CTA
- [ ] Check Supabase: New row in `leads` table
- [ ] Check email: Notification delivered to `hello@intelllx.com`
- [ ] Click "Book a Discovery Call" - opens scheduler in new tab

### Production Testing

- [ ] All local tests pass
- [ ] Test on live site (https://intelllx.com/contact)
- [ ] Test on mobile device
- [ ] Verify emails arrive in production inbox
- [ ] Check Supabase production database

---

## Security Notes

### Server-Only Secrets

These keys are **NEVER** exposed to the browser:
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- Any non-`NEXT_PUBLIC_` variables

### Client-Safe Variables

These are safe to expose (but still keep private):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_MEETINGS_URL`
- `NEXT_PUBLIC_BUSINESS_START_HOUR`
- `NEXT_PUBLIC_BUSINESS_END_HOUR`

### Row Level Security (RLS)

Supabase RLS policies ensure:
- Anonymous users can only INSERT (create new leads)
- Service role can do everything (via API route)
- No direct SELECT/UPDATE/DELETE from client

---

## Summary

**Contact Form Features:**
- ✅ 24/7 available
- ✅ Persistent storage in Supabase
- ✅ Email notifications via Resend
- ✅ Single "Book a Discovery Call" CTA on success
- ✅ Graceful degradation (works even if email fails)
- ✅ No HubSpot dependencies
- ✅ Full keyboard accessibility
- ✅ WCAG AA compliant

**Data Flow:**
1. User submits form
2. POST /api/leads validates and saves to Supabase
3. Email notification sent via Resend (best effort)
4. Success message with booking CTA shown
5. User can book discovery call instantly

---

*Last Updated: 2025-10-12*  
*Branch: `fix/contact-resend`*  
*Status: Production Ready*

