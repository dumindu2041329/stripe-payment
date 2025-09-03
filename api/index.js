import express from 'express';
import cors from 'cors';
import stripe from 'stripe';

const app = express();

// Initialize Stripe with secret key
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'https://your-vercel-app.vercel.app'
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Create Stripe Checkout Session
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: process.env.PDF_NAME || 'Modern Web Development Guide',
              description: 'A comprehensive guide to modern web development practices, including React, TypeScript, and best practices for building scalable applications.',
              images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&auto=format'],
            },
            unit_amount: Math.round((parseFloat(process.env.PDF_PRICE_USD) || 10.00) * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/`,
      metadata: {
        product_type: 'pdf_download',
        product_name: process.env.PDF_NAME || 'Modern Web Development Guide'
      }
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ 
      error: 'Failed to create checkout session',
      details: error.message 
    });
  }
});

// Verify payment session
app.get('/api/verify-session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await stripeInstance.checkout.sessions.retrieve(sessionId);
    
    res.json({
      payment_status: session.payment_status,
      customer_email: session.customer_details?.email,
      amount_total: session.amount_total,
      currency: session.currency,
      metadata: session.metadata
    });
  } catch (error) {
    console.error('Error verifying session:', error);
    res.status(500).json({ 
      error: 'Failed to verify session',
      details: error.message 
    });
  }
});

// Get product info
app.get('/api/product-info', (req, res) => {
  res.json({
    name: process.env.PDF_NAME || 'Modern Web Development Guide',
    price: parseFloat(process.env.PDF_PRICE_USD) || 10.00,
    currency: 'USD',
    description: 'A comprehensive guide to modern web development practices, including React, TypeScript, and best practices for building scalable applications.'
  });
});

// For Vercel, we need to export the app
export default app;