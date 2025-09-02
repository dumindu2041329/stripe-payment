# stripe-payment
>>>>>>> 0107a93cbaf8d5b06e8dd9576fbb3d41ecf76965
# Stripe Payment Integration for PDF Downloads

A modern React application with Stripe payment integration for selling and downloading PDF documents. Built with React, TypeScript, Vite, and Tailwind CSS.

## 🚀 Features

- **Secure Payment Processing**: Integrated with Stripe for secure credit card transactions
- **Modern UI/UX**: Clean, responsive design built with Tailwind CSS
- **PDF Download**: Secure PDF delivery after successful payment
- **Payment Flow**: Complete checkout → payment → success → download flow
- **Type Safety**: Full TypeScript implementation
- **Fast Development**: Vite for lightning-fast builds and HMR

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS
- **Backend**: Express.js + Node.js
- **Payment**: Stripe Checkout + Stripe SDK
- **Routing**: React Router
- **Styling**: Tailwind CSS + Custom Components
- **Build Tool**: Vite with HMR

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Stripe Account (free at [stripe.com](https://stripe.com))

## ⚙️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/dumindu2041329/stripe-payment.git
   cd stripe-payment
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Add your Stripe keys to .env
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
   STRIPE_SECRET_KEY=sk_test_your_secret_key
   ```

4. **Run the application**:
   ```bash
   # Start both frontend and backend
   npm run dev:all
   
   # Or run separately:
   npm run dev      # Frontend (port 5173)
   npm run server   # Backend (port 3001)
   ```

## 🔑 Getting Stripe Keys

1. Sign up at [stripe.com](https://stripe.com)
2. Go to Dashboard → Developers → API keys
3. Copy your **Publishable key** and **Secret key**
4. Use test keys for development (they start with `pk_test_` and `sk_test_`)

## 💳 Testing Payments

Use these test card numbers:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Expiry**: Any future date
- **CVC**: Any 3-digit number

## 📁 Project Structure

```
stripe-payment/
├── backend/
│   └── server.cjs          # Express server with Stripe integration
├── src/
│   ├── components/
│   │   ├── PdfDownloadPage.tsx  # Main product page
│   │   └── SuccessPage.tsx      # Post-payment success page
│   └── App.tsx             # Router configuration
├── public/
│   └── sample-document.pdf # PDF file for download
├── .env.example           # Environment variables template
└── STRIPE_SETUP.md       # Detailed setup guide
```

## 🔄 Payment Flow

1. User visits the PDF download page
2. Clicks "Buy Now" button ($10.00)
3. Redirected to Stripe Checkout
4. Completes payment with test card
5. Redirected to success page
6. Downloads PDF immediately

## 🌐 Live Demo

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## 📚 API Endpoints

- `POST /create-checkout-session` - Create Stripe checkout
- `GET /verify-session/:id` - Verify payment
- `GET /product-info` - Product details
- `GET /health` - Server status

## 🚀 Deployment

For production deployment:

1. Replace test Stripe keys with live keys
2. Update `CLIENT_URL` in `.env`
3. Deploy frontend to Vercel/Netlify
4. Deploy backend to Heroku/Railway
5. Ensure HTTPS (required for live payments)

## 🔧 Development

This project uses Vite with the following plugins:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) - Uses Babel for Fast Refresh
- TypeScript support with strict type checking
- ESLint with React-specific rules
- Tailwind CSS for utility-first styling

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

- **Stripe Docs**: https://stripe.com/docs
- **Issues**: Open an issue on GitHub
- **Email**: dumindu2041329@gmail.com

---

**Ready to start selling digital products?** 🚀
=======
# stripe-payment
>>>>>>> 0107a93cbaf8d5b06e8dd9576fbb3d41ecf76965
