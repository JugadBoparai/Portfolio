# Contact Form Setup Guide

Your contact form is now configured to send emails to: **Jugadboparai@gmail.com**

## Setup Steps (Takes 2 minutes)

### 1. Get Your Web3Forms Access Key

1. Go to: https://web3forms.com/
2. Scroll down to "Get Started for Free"
3. Enter your email: `Jugadboparai@gmail.com`
4. Click "Create Access Key"
5. Check your email for the access key (arrives instantly)

### 2. Add the Access Key to Your Project

Open `.env.local` in your project root and replace the placeholder:

```env
VITE_WEB3FORMS_ACCESS_KEY=your_actual_access_key_here
```

### 3. Restart Your Dev Server

```bash
# Stop the current server (Ctrl+C) and restart:
npm run dev
```

### 4. Add to Vercel (for production)

In your Vercel dashboard:
1. Go to: https://vercel.com/jugad-singh-boparais-projects/portfolio/settings/environment-variables
2. Add a new environment variable:
   - **Name:** `VITE_WEB3FORMS_ACCESS_KEY`
   - **Value:** Your access key from Web3Forms
   - **Environment:** Production, Preview, Development
3. Redeploy your site

Or via CLI:
```bash
npx vercel env add VITE_WEB3FORMS_ACCESS_KEY
# Paste your access key when prompted
# Select: Production, Preview, Development (all)
```

### 5. Test It

1. Fill out the contact form on your site
2. Submit the message
3. Check `Jugadboparai@gmail.com` for the message

## Features

✅ Real-time form submission
✅ Email notifications to your Gmail
✅ Loading state while sending
✅ Success/error feedback
✅ Form reset after successful submission
✅ Fallback to direct email if submission fails

## No Signup Required

Web3Forms is completely free and requires no account creation. You just need the access key they email you.
