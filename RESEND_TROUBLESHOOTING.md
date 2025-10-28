# Resend Troubleshooting

## Current Configuration
- **FROM:** `onboarding@resend.dev` 
- **TO:** `hello@intelllx.com`
- **Status:** Not receiving emails

## Possible Issues

### Issue 1: Resend Rate Limits
`onboarding@resend.dev` has strict limits:
- May only send to addresses you added to your Resend account
- May have daily/hourly rate limits
- Check: https://resend.com/api-keys → Look for rate limit warnings

### Issue 2: hello@intelllx.com Not Verified in Resend
Resend may require you to verify the recipient email:
1. Go to https://resend.com/domains
2. Check if hello@intelllx.com is verified/allowed

### Issue 3: API Key Issues
Check if your API key is active:
1. Go to https://resend.com/api-keys
2. Make sure the key is active (not revoked)
3. Check if it's in Production or Development mode

## Quick Test

Try changing the recipient to a Gmail address to test:

```bash
# In Vercel Environment Variables, add:
RESEND_TO=yourname@gmail.com
```

This will help determine if the issue is:
- ❌ Resend/onboarding@resend.dev itself
- ✅ The hello@intelllx.com address specifically

## Recommended Solution

Until your domain is verified, you have these options:

### Option A: Verify hello@intelllx.com in Resend
Add it as an allowed recipient in your Resend account

### Option B: Use a Different Email
Temporarily use a Gmail/personal email that's easier to verify

### Option C: Check Supabase Only
Since leads ARE being saved to Supabase, just check the database for new leads

## Next Steps

**Immediately check:**
1. Resend dashboard: https://resend.com/emails - Do you see the email attempts?
2. Supabase dashboard: Is the lead showing up in the database?
3. API key status: Is it active?

