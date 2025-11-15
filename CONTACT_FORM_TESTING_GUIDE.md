# 🧪 Contact Form Testing Guide

## ✅ Deployment Status

Your changes have been pushed to production. Vercel should automatically deploy within 2-5 minutes.

**Check deployment status:**
1. Go to https://vercel.com/dashboard
2. Select your `intelllx-site` project
3. Check the "Deployments" tab for the latest deployment
4. Wait for status to show "Ready" (green checkmark)

---

## 📋 Step-by-Step Testing Instructions

### **Test 1: Visit the Contact Page**

1. **Go to:** https://intelllx.com/contact
2. **Verify:**
   - ✅ You see a custom contact form (NOT Calendly embedded)
   - ✅ Form has fields: Name, Email, Company, Service, Message
   - ✅ Form has modern design with icons
   - ✅ No Calendly branding visible on the page

---

### **Test 2: Form Validation (Real-time)**

1. **Click on the Name field** and type just "A"
   - ✅ Should show red border/error when you click away
   - ✅ Error message: "Name must be at least 2 characters"

2. **Click on Email field** and type "invalid-email"
   - ✅ Should show red border/error
   - ✅ Error message: "Please enter a valid email address"

3. **Fill in valid information:**
   - Name: "John Doe"
   - Email: "test@example.com"
   - Company: "Test Company"
   - Service: Select "LeadFlow Chatbot"
   - Message: "I'm interested in learning more about your chatbot services"
   - ✅ All fields should show green checkmarks when valid

---

### **Test 3: Submit Form (Hot Lead Test)**

**Create a high-intent submission to test "Hot Lead" email:**

1. **Fill out the form with:**
   - Name: "Sarah Johnson"
   - Email: **Use YOUR personal email** (so you can check the welcome email)
   - Company: "Tech Solutions Inc"
   - Service: "Both Services" (highest score)
   - Message: "I'm ready to start immediately. We need this ASAP and want to get started today. Our company is looking for a custom AI chatbot solution that can handle our customer inquiries 24/7. We're very interested and want to move forward quickly."
   - Preferred Date: Select tomorrow's date
   - Preferred Time: Select "2:00 PM"

2. **Click "Send Message"**
   - ✅ Button should show "Sending..." and be disabled
   - ✅ After 1-2 seconds, you should see success message
   - ✅ Success message should say "Message Sent Successfully!"
   - ✅ Should show "Book Your Discovery Call" button

3. **Click "Book Your Discovery Call" button**
   - ✅ Should open Calendly in a new tab
   - ✅ No Calendly branding on the contact form page itself

---

### **Test 4: Check Your Notification Email**

1. **Check your inbox:** `hello@intelllx.com`
2. **Look for email with subject:** "New Lead — Intelllx"
3. **Verify email contains:**
   - ✅ Lead's name, email, company
   - ✅ Service interest
   - ✅ Full message
   - ✅ Preferred meeting time
   - ✅ Timestamp

---

### **Test 5: Check Customer Welcome Email (Hot Lead)**

1. **Check the email you used in the form** (the test email you submitted)
2. **Look for email with subject:** "🚀 Ready to transform your business? Let's talk!"
3. **Verify:**
   - ✅ Email is from `hello@send.intelllx.com`
   - ✅ Personalized greeting with your name
   - ✅ Hot lead template (urgent, action-oriented)
   - ✅ Calendly booking link included
   - ✅ Professional HTML formatting

---

### **Test 6: Submit Warm Lead**

**Test the "Warm Lead" email template:**

1. **Fill out form with:**
   - Name: "Mike Smith"
   - Email: **Use a different email** (or your email again)
   - Company: "Small Business Co"
   - Service: "LeadFlow Chatbot"
   - Message: "I'm interested in learning more about chatbots. Can you tell me more about your services?"
   - Leave Preferred Date/Time empty

2. **Submit the form**

3. **Check the welcome email:**
   - ✅ Subject: "Thanks for your interest! Here's how we can help..."
   - ✅ Warm lead template (nurturing, resource-focused)
   - ✅ Includes links to resources
   - ✅ Less urgent tone than hot lead

---

### **Test 7: Submit Cold Lead**

**Test the "Cold Lead" email template:**

1. **Fill out form with minimal info:**
   - Name: "Jane"
   - Email: **Use another email**
   - Company: "ABC"
   - Service: "Consultation"
   - Message: "Hi, just checking this out."

2. **Submit the form**

3. **Check the welcome email:**
   - ✅ Subject: "Welcome! Here's how AI chatbots can grow your business"
   - ✅ Cold lead template (educational, low-pressure)
   - ✅ Focuses on education and value
   - ✅ Gentle CTA

---

### **Test 8: Verify Data in Supabase**

1. **Go to:** https://supabase.com/dashboard
2. **Select your project**
3. **Go to:** Table Editor → `leads` table
4. **Verify:**
   - ✅ All form submissions are saved
   - ✅ Data includes: email, name, company, service, message
   - ✅ Timestamps are correct
   - ✅ Source shows "contact_form"

---

### **Test 9: Check Resend Dashboard**

1. **Go to:** https://resend.com/emails
2. **Verify:**
   - ✅ You see notification emails sent to `hello@intelllx.com`
   - ✅ You see welcome emails sent to test email addresses
   - ✅ All emails show "Delivered" status
   - ✅ Emails are from `hello@send.intelllx.com`

---

### **Test 10: Error Handling**

1. **Temporarily disable Resend** (for testing):
   - Go to Vercel → Environment Variables
   - Temporarily remove or invalidate `RESEND_API_KEY`
   - Redeploy

2. **Submit the form again**
   - ✅ Form should still submit successfully
   - ✅ Lead should still be saved to Supabase
   - ✅ User should see success message
   - ✅ No error shown to user (graceful degradation)

3. **Re-enable Resend** after testing

---

## 🎯 What to Look For

### ✅ Success Indicators:
- Form submits without errors
- You receive notification emails
- Customers receive welcome emails within seconds
- Different email templates for hot/warm/cold leads
- Calendly button works correctly
- No Calendly branding on contact form
- All data saved to Supabase
- Professional, polished user experience

### ⚠️ If Something Doesn't Work:

1. **Check Vercel logs:**
   - Go to Vercel Dashboard → Your Project → Deployments → Latest → Functions
   - Look for errors in `/api/leads` function

2. **Check Resend dashboard:**
   - Verify domain is still verified
   - Check if emails are being sent
   - Look for bounce/delivery issues

3. **Check environment variables:**
   - `RESEND_API_KEY` is set
   - `SUPABASE_URL` is set
   - `SUPABASE_SERVICE_ROLE_KEY` is set

4. **Check browser console:**
   - Open DevTools (F12)
   - Look for JavaScript errors

---

## 📊 Lead Scoring Breakdown

**Hot Lead (70+ points):**
- Service: "Both Services" (+30)
- Long detailed message (+25)
- High-intent keywords (+5-25)
- Preferred date/time (+15)
- Company name (+10)

**Warm Lead (40-69 points):**
- Service: "LeadFlow Chatbot" (+20)
- Medium message (+15)
- Some keywords (+5-10)
- Company name (+10)

**Cold Lead (<40 points):**
- Service: "Consultation" or "Other" (+5-10)
- Short message (+10)
- No preferred time
- Minimal company info

---

## 🚀 You're All Set!

Your custom contact form is now live with:
- ✅ No third-party branding
- ✅ Automated follow-up emails
- ✅ Intelligent lead scoring
- ✅ Professional user experience
- ✅ Full data capture

**Next Steps:**
1. Monitor form submissions in Supabase
2. Check Resend dashboard for email delivery
3. Review lead scores to identify hot prospects
4. Follow up on high-scoring leads quickly!

---

**Questions or Issues?**
- Check Vercel logs for errors
- Verify all environment variables are set
- Test with different email addresses
- Check spam folders if emails don't arrive

