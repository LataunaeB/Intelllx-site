# Booking Setup Guide

This document explains how to configure the chat widget's booking functionality and business hours restrictions.

---

## Environment Variables

Add these to your `.env.local` (local) and Vercel (production):

```bash
# Required: Timezone for business hours calculations (IANA timezone format)
NEXT_PUBLIC_TIMEZONE=America/Los_Angeles

# Required: Business hours (24-hour format, 0-23)
NEXT_PUBLIC_BUSINESS_START_HOUR=9   # 9 AM
NEXT_PUBLIC_BUSINESS_END_HOUR=18    # 6 PM

# Optional: External scheduler URL (Cal.com, Calendly, HubSpot Meetings, etc.)
# If provided, the "Book a discovery call" button will open this URL instead of the in-widget form
NEXT_PUBLIC_MEETINGS_URL=https://calendly.com/your-link
# or
# NEXT_PUBLIC_MEETINGS_URL=https://cal.com/your-username
# or
# NEXT_PUBLIC_MEETINGS_URL=https://meetings.hubspot.com/your-link
```

---

## How It Works

### 24/7 Chat Availability

The chat widget is **always available**, regardless of the time or day. Users can:
- Open the chat widget anytime
- Send messages and get automated responses
- Access the "Book a discovery call" CTA

### Business Hours Display

The widget uses the configured timezone (`NEXT_PUBLIC_TIMEZONE`) and hours (`NEXT_PUBLIC_BUSINESS_START_HOUR`, `NEXT_PUBLIC_BUSINESS_END_HOUR`) to:

1. **Show an "Away" ribbon** when outside business hours:
   - Displays: "Away now—we'll reply next business day. (Monday–Friday, 9 AM–6 PM Los Angeles)"
   - Does NOT prevent users from using the chat or booking

2. **Restrict booking slots** (in-widget form only):
   - Date picker: Only allows weekdays (Monday–Friday)
   - Time picker: Only shows slots between 9 AM–6 PM PT (configurable)
   - Automatically filters out invalid dates/times

### Local Time Conversion

The business hours check happens in **server time** (wherever your app is deployed), using `Intl.DateTimeFormat` with the specified `NEXT_PUBLIC_TIMEZONE`:

```typescript
const formatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Los_Angeles',
  hour: 'numeric',
  hour12: false,
});
```

This ensures accurate timezone conversion regardless of the visitor's location.

---

## Booking Configuration

You have two options:

### Option 1: In-Widget Form (Default)

If `NEXT_PUBLIC_MEETINGS_URL` is **NOT set**, users see an embedded booking form with:

- Name, email, phone fields
- Date picker (restricted to Mon–Fri, next 30 days)
- Time picker (restricted to 9 AM–6 PM PT)
- Automatic validation

**Submissions are sent to `/api/leads` and:**
- Saved to Supabase
- Create a Zoom meeting (if Zoom configured)
- Send email notification

**Advantages:**
- Keeps users in-app
- Automatically enforces business hours
- Captures conversation context
- No external service needed

**Setup:**
1. Ensure Supabase, Resend, and Zoom credentials are configured
2. Leave `NEXT_PUBLIC_MEETINGS_URL` unset
3. Done! The form will appear when users click "Book a discovery call"

---

### Option 2: External Scheduler (Calendly, Cal.com, HubSpot)

If `NEXT_PUBLIC_MEETINGS_URL` **IS set**, users are redirected to an external booking page.

**The button will:**
- Open the URL in a new tab (`rel="noopener"`)
- Show a note: "Bookings available Monday–Friday, 9 AM–6 PM Los Angeles"

**You MUST configure your external scheduler** to match these hours:

#### Calendly Setup

1. Go to: https://calendly.com/event_types
2. Select your meeting type
3. **Availability** → Set to:
   - Days: Monday–Friday only
   - Hours: 9:00 AM – 6:00 PM
4. **Advanced** → Timezone: `America/Los_Angeles (Pacific Time)`
5. Save

#### Cal.com Setup

1. Go to: https://app.cal.com/availability
2. Edit your availability
3. Set working hours:
   - Days: Mon, Tue, Wed, Thu, Fri
   - Hours: 09:00 – 18:00
4. Timezone: `America/Los_Angeles`
5. Save

#### HubSpot Meetings Setup

1. Go to: https://app.hubspot.com/meetings
2. Select your meeting link
3. **Availability** tab:
   - Days: Monday–Friday
   - Hours: 9:00 AM – 6:00 PM PT
4. **Timezone**: Pacific Time (US & Canada)
5. Save

**Advantages:**
- Uses your existing scheduling tool
- Handles cancellations/rescheduling automatically
- May integrate with your existing workflows

**Setup:**
1. Configure your external scheduler (see above)
2. Add `NEXT_PUBLIC_MEETINGS_URL=https://your-link` to env
3. Redeploy
4. Done! The button will redirect to your external scheduler

---

## Testing

### Test Business Hours Logic

**During business hours (Mon–Fri 9 AM–6 PM PT):**
- ✅ No "Away" ribbon should appear
- ✅ All time slots should be available in the date/time picker

**Outside business hours:**
- ✅ Yellow "Away" ribbon should appear at top
- ✅ Chat still opens and works
- ✅ Booking form restricts to valid slots only

### Test Date/Time Restrictions

**Try selecting:**
- ❌ Saturday or Sunday → Should show alert "Please select a weekday"
- ❌ Time before 9 AM or after 5:30 PM → Not available in dropdown
- ✅ Monday–Friday, 9 AM–5:30 PM → Should work

### Test External URL (if configured)

1. Set `NEXT_PUBLIC_MEETINGS_URL`
2. Click "Book a discovery call"
3. ✅ Should open external URL in new tab
4. ✅ Should show note about availability hours

---

## Accessibility

The widget includes:

- ✅ **Keyboard navigation**: Tab through all controls, Escape to close
- ✅ **ARIA labels**: All buttons and inputs have descriptive labels
- ✅ **Focus indicators**: Visible focus rings on all interactive elements
- ✅ **Role attributes**: `role="dialog"`, `aria-modal="true"`, `aria-label`
- ✅ **Required field indicators**: `aria-required="true"` on required inputs
- ✅ **No hydration warnings**: Client-only checks for time-sensitive data

---

## Troubleshooting

### "Away" ribbon always shows (even during business hours)

**Check:**
1. `NEXT_PUBLIC_TIMEZONE` is set correctly (e.g., `America/Los_Angeles`)
2. `NEXT_PUBLIC_BUSINESS_START_HOUR` and `NEXT_PUBLIC_BUSINESS_END_HOUR` are correct
3. Verify env vars are deployed to Vercel (check project settings → Environment Variables)
4. Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R) after deploying env changes

**Note:** The check happens client-side using the specified timezone. All env vars need the `NEXT_PUBLIC_` prefix to be available in the browser.

### Date picker allows weekends

**Check:**
1. Browser JavaScript is enabled
2. Console for errors
3. The `isBusinessDay()` function in `src/lib/business-hours.ts`

### Time picker shows invalid times

**Check:**
1. `NEXT_PUBLIC_BUSINESS_START_HOUR` and `NEXT_PUBLIC_BUSINESS_END_HOUR` in env
2. Redeploy after changing env vars
3. Hard refresh browser (Ctrl+Shift+R)

### External URL doesn't open

**Check:**
1. `NEXT_PUBLIC_MEETINGS_URL` is set correctly
2. URL includes protocol (`https://`)
3. URL is valid and accessible
4. Browser isn't blocking popups

---

## Best Practices

### For External Schedulers

1. **Match the hours exactly**: Set your external scheduler to Mon–Fri 9 AM–6 PM PT
2. **Set buffer times**: Add 15-30 min buffer between meetings
3. **Limit future booking**: Don't allow bookings more than 30 days out
4. **Add confirmation email**: Ensure attendees receive calendar invites
5. **Set reminders**: Configure 24-hour and 1-hour reminders

### For In-Widget Form

1. **Monitor Supabase**: Check the `leads` table regularly
2. **Test email delivery**: Ensure Resend domain is verified
3. **Test Zoom integration**: Verify meetings are created correctly
4. **Check business hours**: Test during and outside hours
5. **Validate form data**: Ensure all fields are captured

---

## Additional Resources

- [Supabase Setup](./lead-capture-pipeline.md)
- [Zoom API Documentation](https://developers.zoom.us/docs/api/)
- [Resend Documentation](https://resend.com/docs)
- [Calendly API](https://developer.calendly.com/)
- [Cal.com Documentation](https://cal.com/docs)
- [HubSpot Meetings](https://knowledge.hubspot.com/meetings-tool/create-a-meeting-link)

---

## Summary

- ✅ Chat is available **24/7**
- ✅ "Away" ribbon shows outside hours (but doesn't block usage)
- ✅ "Book a discovery call" CTA is **always visible**
- ✅ In-widget booking restricts to **Mon–Fri 9 AM–6 PM PT**
- ✅ External scheduler requires **manual configuration** to match hours
- ✅ All features are **accessible** and follow best practices



