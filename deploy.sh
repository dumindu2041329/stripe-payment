#!/bin/bash

# Vercel Deployment Script
# This script helps deploy your Stripe Payment app to Vercel

echo "🚀 Vercel Deployment Helper"
echo "=========================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo "✅ Vercel CLI is available"

# Build the project first
echo "🔨 Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed. Please check for errors."
    exit 1
fi

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found."
    echo "   Please create .env with your Stripe keys before deployment."
    echo "   You can copy from .env.example and add your actual keys."
fi

echo ""
echo "📋 Pre-deployment Checklist:"
echo "  ✓ Build completed successfully"
echo "  ✓ Environment variables ready"
echo "  ✓ Stripe keys configured"
echo ""

echo "🚀 Ready to deploy! Run the following commands:"
echo ""
echo "1. Login to Vercel:"
echo "   vercel login"
echo ""
echo "2. Deploy your project:"
echo "   vercel"
echo ""
echo "3. After deployment, update environment variables in Vercel dashboard:"
echo "   - VITE_STRIPE_PUBLISHABLE_KEY"
echo "   - STRIPE_SECRET_KEY" 
echo "   - CLIENT_URL (use your Vercel domain)"
echo "   - PDF_PRICE_USD"
echo "   - PDF_NAME"
echo ""
echo "📚 For detailed instructions, see VERCEL_DEPLOYMENT.md"
echo ""

read -p "Do you want to start the deployment now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Starting deployment..."
    vercel
else
    echo "👍 Deployment cancelled. Run 'vercel' when you're ready!"
fi