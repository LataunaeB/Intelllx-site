# AI Integration Setup Guide

This guide walks you through adding OpenAI, Anthropic, and Stability AI API keys to enable enhanced AI capabilities for development and content creation.

---

## Step 1: Get Your API Keys

### OpenAI (Great for code + general content)
1. Visit: https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Give it a name (e.g., "Intelllx Development")
5. Copy the key (starts with `sk-`)

### Anthropic (Excellent at structured copy/UX)
1. Visit: https://console.anthropic.com/
2. Sign up or log in
3. Go to "API Keys"
4. Click "Create Key"
5. Copy the key (starts with `sk-ant-`)

### Stability AI / Stable Diffusion (Image generation)
1. Visit: https://platform.stability.ai/
2. Sign up or log in
3. Go to "API Keys" in your account
4. Click "Generate API Key"
5. Copy the key

---

## Step 2: Add Keys to Vercel

1. Go to: https://vercel.com/dashboard
2. Select your project: `intelllx-site`
3. Click **Settings** → **Environment Variables**
4. Add each key below (click "Add" for each one)

### Add This Variable:
**Name:** `OPENAI_API_KEY`  
**Value:** `sk-your-openai-key-here`  
**Environment:** Select all (Production, Preview, Development)  
**Click:** "Save"

### Add This Variable:
**Name:** `ANTHROPIC_API_KEY`  
**Value:** `sk-ant-your-anthropic-key-here`  
**Environment:** Select all (Production, Preview, Development)  
**Click:** "Save"

### Add This Variable:
**Name:** `STABILITY_API_KEY`  
**Value:** `your-stability-key-here`  
**Environment:** Select all (Production, Preview, Development)  
**Click:** "Save"

---

## Step 3: Redeploy

After adding all three keys:

1. Go to the **Deployments** tab in Vercel
2. Click the **...** (three dots) on your latest deployment
3. Click **Redeploy**
4. Wait ~1-2 minutes for the build to complete

---

## Step 4: Test (Optional)

Once deployed, the AI integrations are ready to use. You can test them by:

1. Making a request to your API routes that use AI
2. Checking the console logs in Vercel to see if the keys are being read correctly

---

## What These Keys Enable

### OpenAI
- Generate code snippets and functions
- Create general content and text
- Code explanations and documentation
- API endpoint descriptions

### Anthropic
- Structured content creation
- UX copy and microcopy
- Formatted text with specific tone
- Business communication templates

### Stability AI
- AI image generation
- Logo variations
- Marketing assets
- UI mockups and wireframes

---

## Local Development (Optional)

If you want to test locally, create a `.env.local` file in the project root:

```bash
OPENAI_API_KEY=sk-your-key-here
ANTHROPIC_API_KEY=sk-ant-your-key-here
STABILITY_API_KEY=your-key-here
```

**Important:** Never commit this file to Git!

---

## Need Help?

- OpenAI Docs: https://platform.openai.com/docs
- Anthropic Docs: https://docs.anthropic.com/
- Stability AI Docs: https://platform.stability.ai/docs

---

## Security Notes

✅ **DO:**
- Store keys in Vercel environment variables
- Use different keys for production and development
- Rotate keys periodically

❌ **DON'T:**
- Commit API keys to Git
- Share keys publicly
- Use production keys in local development (use test keys)

