# Stripe Payment Integration Setup Guide

## 🚀 Quick Start

Your Stripe payment integration is now complete! Follow these steps to set up and test the payment flow.

## 📋 Prerequisites

1. **Stripe Account**: Create a free account at [stripe.com](https://stripe.com)
2. **Node.js**: Make sure you have Node.js installed

## ⚙️ Configuration Steps

### 1. Get Your Stripe Keys

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com/)
2. Go to **Developers > API keys**
3. Copy your **Publishable key** (starts with `pk_test_`)
4. Copy your **Secret key** (starts with `sk_test_`)

### 2. Update Environment Variables

1. Open the `.env` file in your project root
2. Replace the placeholder keys with your actual Stripe keys:

```env
# Frontend (Publishable Key - safe to expose)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here

# Backend (Secret Key - keep this secure!)
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here

# App Configuration (you can keep these as is)
PORT=3001
CLIENT_URL=http://localhost:5173
PDF_PRICE_USD=10.00
PDF_NAME=Modern Web Development Guide
```

## 🏃‍♂️ Running the Application

### Option 1: Run Both Servers Separately

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Option 2: Run Both Together (Recommended)
```bash
npm run dev:all
```

## 🔗 URLs

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## 💳 Testing Payments

Use Stripe's test card numbers for testing:

### Success Cards:
- **Visa**: `4242 4242 4242 4242`
- **Mastercard**: `5555 5555 5555 4444`
- **American Express**: `3782 8224 6310 005`

### Test Details:
- **Expiry**: Any future date (e.g., 12/25)
- **CVC**: Any 3-digit number (4 digits for Amex)
- **ZIP**: Any 5-digit number

### Decline Cards (for testing failures):
- **Generic decline**: `4000 0000 0000 0002`
- **Insufficient funds**: `4000 0000 0000 9995`

## 🔄 Payment Flow

1. **User visits** the PDF download page
2. **User clicks** "Buy Now - $10.00"
3. **Redirected** to Stripe Checkout
4. **Completes payment** using test cards
5. **Redirected back** to success page
6. **Can download** the PDF immediately

## 📁 Project Structure

```
stripe-payment/
├── backend/
│   └── server.cjs          # Express server with Stripe integration
├── src/
│   ├── components/
│   │   ├── PdfDownloadPage.tsx  # Main landing page
│   │   └── SuccessPage.tsx      # Post-payment success page
│   └── App.tsx             # Router configuration
├── public/
│   └── sample-document.pdf # The PDF file for download
├── .env                    # Environment variables (Stripe keys)
└── package.json           # Dependencies and scripts
```

## 🛠️ API Endpoints

- **POST** `/create-checkout-session` - Creates Stripe checkout session
- **GET** `/verify-session/:sessionId` - Verifies payment completion
- **GET** `/product-info` - Gets product details
- **GET** `/health` - Server health check

## 🔐 Security Notes

- Never expose your **Secret Key** in frontend code
- The **Publishable Key** is safe to use in frontend
- All sensitive operations happen on the backend
- Payment processing is handled entirely by Stripe

## 🐛 Troubleshooting

### Common Issues:

1. **"Failed to create checkout session"**
   - Check if backend is running on port 3001
   - Verify Stripe Secret Key is correct

2. **"Payment verification failed"**
   - Check if session_id is in the URL
   - Verify backend can communicate with Stripe

3. **CORS errors**
   - Make sure frontend URL matches CLIENT_URL in .env

### Debug Steps:

1. Check browser console for errors
2. Verify both servers are running
3. Test backend health: http://localhost:3001/health
4. Check environment variables are loaded correctly

## 🎉 Production Deployment

Before going live:

1. **Replace test keys** with live Stripe keys
2. **Update CLIENT_URL** to your production domain
3. **Enable HTTPS** (required for live payments)
4. **Test with real payments** in small amounts

## 📞 Support

- **Stripe Documentation**: https://stripe.com/docs
- **Stripe Dashboard**: https://dashboard.stripe.com
- **Test Cards**: https://stripe.com/docs/testing

---

**Ready to test?** Click the preview button to see your payment-enabled PDF download page! 🚀