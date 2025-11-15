# 📅 Custom Calendar Booking System - Setup Guide

## ✅ What's Been Built

Your contact form is now a **custom embedded calendar booking widget** that works exactly like Calendly, but completely custom and without any third-party branding!

### Features:
- ✅ **Custom Calendar Widget** - Month view with available dates
- ✅ **Time Slot Selection** - Shows available times (9 AM - 6 PM PST)
- ✅ **Direct Booking** - Books directly into your Google Calendar
- ✅ **Automatic Zoom/Google Meet** - Creates meeting links automatically
- ✅ **Lead Capture** - Saves all data to Supabase
- ✅ **Automated Emails** - Sends notifications and welcome emails
- ✅ **No Weekends** - Monday-Friday only
- ✅ **2-Week Advance Booking** - Users can book up to 14 days in advance
- ✅ **30-Minute Meetings** - All bookings are 30 minutes

---

## 🚀 How It Works

### User Flow:
1. **User visits** `/contact` page
2. **Sees calendar widget** with available dates highlighted
3. **Clicks a date** → sees available time slots for that day
4. **Clicks a time slot** → booking form appears
5. **Fills out form** (name, email, company, service, message)
6. **Submits** → appointment is booked directly into your Google Calendar
7. **Receives confirmation** with meeting link (Zoom/Google Meet)

### What Happens Behind the Scenes:
- ✅ Checks Google Calendar for availability (excludes busy times)
- ✅ Saves lead to Supabase database
- ✅ Creates calendar event in your Google Calendar
- ✅ Creates Zoom meeting (if configured) or Google Meet link
- ✅ Sends notification email to you
- ✅ Sends automated welcome email to customer
- ✅ Shows confirmation screen with meeting details

---

## 🔧 Environment Variables Needed

To make this work fully, you need to configure Google Calendar access. You have **3 options** (choose one):

### **Option 1: Service Account (Recommended - Easiest)**

This is the best option for server-side booking - no user authentication needed!

1. **Create a Service Account:**
   - Go to https://console.cloud.google.com/
   - Create a new project or select existing
   - Go to "IAM & Admin" → "Service Accounts"
   - Click "Create Service Account"
   - Name it (e.g., "intelllx-calendar-booking")
   - Click "Create and Continue" → Skip roles → Click "Done"

2. **Create Key:**
   - Click on the service account you created
   - Go to "Keys" tab
   - Click "Add Key" → "Create new key"
   - Choose "JSON"
   - Download the JSON file

3. **Share Calendar:**
   - Open Google Calendar
   - Click the calendar you want to use (or create a new one)
   - Click "Settings and sharing"
   - Under "Share with specific people", click "Add people"
   - Enter the service account email (from JSON file: `client_email`)
   - Give it "Make changes to events" permission
   - Click "Send"

4. **Get Values from JSON:**
   - Open the downloaded JSON file
   - Copy `client_email` → This is `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - Copy `private_key` → This is `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`
   - Note the calendar ID (email address) → This is `GOOGLE_CALENDAR_ID`

5. **Add to Vercel:**
   ```
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   GOOGLE_CALENDAR_ID=hello@intelllx.com
   ```

### **Option 2: Refresh Token (Alternative)**

If you already have OAuth set up:

1. **Get Refresh Token:**
   - Use the existing OAuth flow
   - Capture the refresh token after authentication
   - Store it as an environment variable

2. **Add to Vercel:**
   ```
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   GOOGLE_REFRESH_TOKEN=your-refresh-token
   GOOGLE_CALENDAR_ID=hello@intelllx.com
   ```

### **Option 3: User OAuth (Fallback)**

The booking API will fall back to user-provided access tokens if neither of the above is configured. This requires users to authenticate with Google, which is not ideal for public booking.

---

## 📋 Complete Environment Variable List

### Required:
```bash
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Resend
RESEND_API_KEY=re_your_api_key
RESEND_FROM=hello@send.intelllx.com
RESEND_TO=hello@intelllx.com

# Google Calendar (choose one method above)
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_ID=hello@intelllx.com

# OR use refresh token instead:
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REFRESH_TOKEN=your-refresh-token

# Zoom (optional - falls back to Google Meet if not configured)
ZOOM_CLIENT_ID=your-zoom-client-id
ZOOM_CLIENT_SECRET=your-zoom-client-secret
```

---

## 🎯 Business Rules Configured

- **Meeting Duration:** 30 minutes
- **Business Hours:** 9 AM - 6 PM PST (Monday-Friday)
- **Weekends:** Excluded completely
- **Advance Booking:** Up to 2 weeks (14 days)
- **Time Slots:** Every 30 minutes (9:00, 9:30, 10:00, etc.)

---

## 🧪 Testing

1. **Visit:** https://intelllx.com/contact
2. **Should see:** Calendar widget (not Calendly)
3. **Click a date:** Should show available time slots
4. **Click a time:** Should show booking form
5. **Fill out and submit:** Should book appointment
6. **Check your Google Calendar:** Event should appear
7. **Check your email:** Should receive notification
8. **Check customer email:** Should receive welcome email

---

## 🔍 Troubleshooting

### Calendar availability not showing?
- Check if service account or refresh token is configured
- Verify calendar is shared with service account (Option 1)
- Check Vercel logs for errors

### Booking fails?
- Verify Google Calendar credentials are correct
- Check if calendar ID is correct
- Ensure service account has "Make changes to events" permission

### Time slots not accurate?
- Verify timezone is set to PST (`America/Los_Angeles`)
- Check if business hours are correct (9 AM - 6 PM)
- Ensure calendar is checking the right calendar ID

---

## 📝 Notes

- **Static Availability:** If Google Calendar credentials aren't configured, the widget will show static availability (all business hours as available). This allows testing, but real-time availability checking requires proper setup.
- **Weekends:** Automatically excluded - no configuration needed
- **Past Dates:** Automatically disabled - no configuration needed
- **2-Week Limit:** Automatically enforced - no configuration needed

---

## ✅ You're All Set!

Your custom calendar booking system is ready. Just configure the Google Calendar credentials (Option 1 is recommended) and you're good to go!

No more Calendly branding - everything is 100% custom and yours! 🎉

