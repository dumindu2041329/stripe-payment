# 🚀 Vercel Deployment Guide

This guide will help you deploy your Stripe Payment application to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code should be pushed to a GitHub repository
3. **Stripe Account**: You'll need your Stripe API keys

## 📋 Deployment Steps

### 1. Prepare Your Environment Variables

Create a `.env` file (not committed to Git) with your actual Stripe keys:

```env
# Frontend (Publishable Key - safe to expose)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here

# Backend (Secret Key - keep this secure!)
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here

# App Configuration
CLIENT_URL=https://your-vercel-app.vercel.app

# Product Configuration
PDF_PRICE_USD=10.00
PDF_NAME=Modern Web Development Guide
```

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy your project:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? **Your username**
   - Link to existing project? **N**
   - Project name? **stripe-payment** (or your preferred name)
   - In which directory is your code located? **./**

#### Option B: Using Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 3. Configure Environment Variables in Vercel

1. Go to your project dashboard on Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_STRIPE_PUBLISHABLE_KEY` | `pk_test_your_actual_key` | Production, Preview, Development |
| `STRIPE_SECRET_KEY` | `sk_test_your_actual_key` | Production, Preview, Development |
| `CLIENT_URL` | `https://your-project.vercel.app` | Production, Preview, Development |
| `PDF_PRICE_USD` | `10.00` | Production, Preview, Development |
| `PDF_NAME` | `Modern Web Development Guide` | Production, Preview, Development |

⚠️ **Important**: Replace `your-project.vercel.app` with your actual Vercel domain.

### 4. Update CLIENT_URL

After deployment, update the `CLIENT_URL` environment variable with your actual Vercel domain:

1. Copy your Vercel domain (e.g., `https://stripe-payment-abc123.vercel.app`)
2. Update the `CLIENT_URL` environment variable in Vercel settings
3. Redeploy if necessary

### 5. Test Your Deployment

1. Visit your deployed application
2. Test the payment flow:
   - Click "Buy Now"
   - Use Stripe test card: `4242 4242 4242 4242`
   - Complete the checkout process
   - Verify redirect to success page
   - Test download functionality

## 🔧 Configuration Files

The following files have been created/modified for Vercel deployment:

- **`vercel.json`**: Vercel configuration for routing and builds
- **`api/index.js`**: Serverless API endpoints for Stripe integration
- **Updated components**: Modified to use relative API paths instead of localhost URLs

## 🚨 Security Notes

1. **Never commit `.env` files** - They contain sensitive Stripe secret keys
2. **Use test keys during development** - Switch to live keys only in production
3. **Verify webhook endpoints** if you add Stripe webhooks later
4. **Monitor your Stripe dashboard** for any unauthorized transactions

## 🐛 Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure `CLIENT_URL` matches your Vercel domain exactly
2. **API Not Found**: Verify the API routes are accessible at `/api/endpoint`
3. **Stripe Errors**: Check that your environment variables are set correctly
4. **Build Failures**: Ensure all dependencies are in `package.json`

### Debug Steps:

1. Check Vercel function logs in the dashboard
2. Verify environment variables are set
3. Test API endpoints directly (e.g., `/api/health`)
4. Check browser console for errors

## 🎉 Success!

Once deployed, your Stripe payment application will be accessible at your Vercel domain with:

- ✅ Secure payment processing
- ✅ Route protection for downloads
- ✅ Serverless backend API
- ✅ Automatic deployments from Git
- ✅ SSL certificate included

Your application is now ready for production use!