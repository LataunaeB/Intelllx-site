# Calendly Native Setup - Complete Instructions

## ✅ What's Been Done

1. **Webhook endpoint created**: `src/app/api/calendly/webhook/route.ts`
   - Receives booking data from Calendly
   - Saves to Supabase leads table
   - URL: `https://intelllx.com/api/calendly/webhook`

2. **Database migration created**: `supabase/migrations/add_calendly_fields.sql`
   - Adds: company, service, message, preferred_date, preferred_time fields
   - Run this in your Supabase SQL editor

3. **Contact page updated**: Now shows embedded Calendly widget instead of form

## 📋 What You Need To Do

### Step 1: Run Database Migration

1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **SQL Editor**
4. Run this SQL:

```sql
-- Add columns if they don't exist
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS company TEXT,
ADD COLUMN IF NOT EXISTS service TEXT,
ADD COLUMN IF NOT EXISTS message TEXT,
ADD COLUMN IF NOT EXISTS preferred_date TEXT,
ADD COLUMN IF NOT EXISTS preferred_time TEXT;
```

5. Click "Run"

---

### Step 2: Add Custom Questions to Your Calendly Event

1. Go to https://calendly.com/lataunaeb-intelllx-discovery/30min
2. Click "Edit Event"
3. Scroll to "Questions"
4. Add these questions **in this exact order**:

| Question Text | Field Type | Required? |
|--------------|-----------|-----------|
| **What's your company name?** | Text | Yes |
| **Which service are you interested in?** | Dropdown | Yes |
| - LeadFlow Chatbot | | |
| - Website Development | | |
| - Both Services | | |
| - Consultation | | |
| - Other | | |
| **Phone number** | Text | Yes |
| **Tell us about your project** | Long text | No |

5. Save changes

---

### Step 3: Set Up Calendly Webhook

1. Go to https://calendly.com/integrations
2. Click **Webhooks** (or go to Settings → Integrations → Webhooks)
3. Click **"New webhook subscription"**
4. Configure:

**Webhook URL:**
```
https://intelllx.com/api/calendly/webhook
```

**Events to subscribe to:**
- ✅ `invitee.created` (when someone books)

5. Click **"Create"**

6. Calendly will test the webhook - you should see a success message

---

### Step 4: Deploy Everything

1. Commit all changes:
```bash
git add .
git commit -m "Replace contact form with Calendly native booking"
git push origin main
```

2. Vercel will auto-deploy
3. Wait 2-3 minutes

---

## 🧪 Testing

1. Go to https://intelllx.com/contact
2. You should see the embedded Calendly widget
3. Book a test appointment
4. Check:
   - ✅ Supabase: New lead in leads table
   - ✅ Your email: Calendly booking confirmation
   - ✅ Calendly dashboard: Shows the booking

---

## 📊 What Gets Saved to Supabase

When someone books through Calendly, this data is saved:

```json
{
  "email": "client@example.com",
  "name": "John Doe",
  "phone": "+1234567890",
  "company": "ABC Corp",
  "service": "leadflow-chatbot",
  "message": "We need a chatbot for our law firm...",
  "source": "calendly_booking",
  "preferred_date": "2025-10-30",
  "preferred_time": "2:00 PM"
}
```

---

## 🎯 Complete Flow

**Client Journey:**
1. Visits https://intelllx.com/contact
2. Sees your available times in embedded Calendly
3. Fills out info + books appointment
4. Receives booking confirmation with Zoom link

**Your Journey:**
1. Receive Calendly email with booking details
2. Check Supabase for lead info
3. Show up to your Zoom meeting
4. Follow up with client

---

## 🔧 Troubleshooting

**Webhook not receiving data?**
- Check webhook URL is: `https://intelllx.com/api/calendly/webhook`
- Make sure event is: `invitee.created`
- Check Vercel logs for errors

**Data not saving to Supabase?**
- Verify you ran the database migration
- Check Supabase RLS policies allow inserts
- Look at API route console logs

**Calendly widget not showing?**
- Clear browser cache
- Check if you're using the free Calendly plan (may have limitations)
- Verify the Calendly event URL is correct

---

## 💡 Need Help?

If the webhook isn't working, share the error from Vercel logs and I can help debug!

