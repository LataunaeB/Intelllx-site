# Environment Variables You Need to Add

## Missing Variables (Must Add to `.env.local` and Vercel)

### 1. Supabase Credentials

**Where to get them:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **API**
4. Copy these values:

```bash
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M...
```

**Add to:**
- `.env.local` (local development)
- Vercel Environment Variables (production)

---

### 2. Resend API Key

**Where to get it:**
1. Go to https://resend.com/api-keys
2. Click "Create API Key"
3. Copy the key (starts with `re_`)

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM=hello@intelllx.com
RESEND_TO=hello@intelllx.com
```

**Add to:**
- `.env.local` (local development)
- Vercel Environment Variables (production)

---

### 3. Scheduler URL

Already have this, just need to set it:

```bash
NEXT_PUBLIC_MEETINGS_URL=https://calendly.com/lataunaeb-intelllx-discovery/30min
```

---

## Quick Setup Instructions

### Local Development:
1. Edit your `.env.local` file
2. Add the variables above
3. Restart your dev server: `npm run dev`

### Production (Vercel):
1. Go to https://vercel.com/dashboard
2. Select `intelllx-site` project
3. Go to **Settings** → **Environment Variables**
4. Add each variable for **Production**, **Preview**, and **Development**
5. Redeploy (Vercel will auto-redeploy)

---

## What Each Variable Does

| Variable | Purpose |
|----------|---------|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin key for saving leads |
| `RESEND_API_KEY` | API key for sending emails |
| `RESEND_FROM` | Email address to send from (hello@intelllx.com) |
| `RESEND_TO` | Email address to send notifications to |
| `NEXT_PUBLIC_MEETINGS_URL` | Calendly/scheduling link |

---

## After Adding Variables

1. **Test locally:** `npm run dev` and submit the contact form
2. **Check Supabase:** Go to Table Editor → `leads` table
3. **Check Resend:** Go to https://resend.com/emails
4. **Check your email:** Look for notifications at hello@intelllx.com

---

## Need Help?

If you're stuck, tell me which values you need and I can help you find them in your Supabase/Resend dashboards!

