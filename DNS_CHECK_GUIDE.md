# DNS Records Check for Resend

## What Resend Needs

When you connect a domain to Resend, you need to add DNS records. Here's how to check if yours are correct:

## Step 1: Check What Resend Wants

1. Go to https://resend.com/domains
2. Click on `intelllx.com` (or the domain you added)
3. Look at the DNS records it shows you need to add
4. **Take a screenshot or copy the records** you see there

Typical Resend DNS records look like:
```
Type: TXT
Name: @
Value: "v=spf1 include:_spf.resend.com ~all"

Type: CNAME
Name: resend._domainkey
Value: resend._domainkey.resend.com
```

## Step 2: Get Your Current DNS Records

Tell me:
1. Where is your DNS hosted? (GoDaddy, Namecheap, Cloudflare, etc.)
2. Can you access your DNS management panel?

Then I'll help you compare what you have vs. what Resend needs.

## Common Issues

- **Missing records**: Some DNS providers hide certain record types
- **Wrong values**: Typo in the record value
- **Propagation delay**: DNS changes can take 24-48 hours
- **Wrong domain level**: Records might be at subdomain instead of root domain

## Let Me Help

Once you share:
1. Screenshot of what Resend dashboard shows you need
2. What DNS records you currently have at intelllx.com

I can tell you exactly what's missing or wrong!

