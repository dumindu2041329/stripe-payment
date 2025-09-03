import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { usePayment } from '../contexts/PaymentContext';
import { useNavigate } from 'react-router-dom';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface PdfDocument {
  id: string;
  title: string;
  description: string;
  size: string;
  pages: number;
  downloadUrl: string;
  previewImage?: string;
}

const PdfDownloadPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [productInfo, setProductInfo] = useState({
    name: 'Modern Web Development Guide',
    price: 10.00,
    currency: 'USD',
    description: 'A comprehensive guide to modern web development practices'
  });
  
  const { isPaymentVerified } = usePayment();
  const navigate = useNavigate();

  // Fetch product info from backend
  useEffect(() => {
    const fetchProductInfo = async () => {
      try {
        const response = await fetch('/api/product-info');
        if (response.ok) {
          const data = await response.json();
          setProductInfo(data);
        }
      } catch (error) {
        console.error('Failed to fetch product info:', error);
      }
    };
    
    fetchProductInfo();
  }, []);
  // Sample PDF document data
  const pdfDocument: PdfDocument = {
    id: '1',
    title: productInfo.name,
    description: productInfo.description,
    size: '579 KB',
    pages: 44,
    downloadUrl: '/sample-document.pdf',
    previewImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&auto=format'
  };

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      
      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }
      
      const { url } = await response.json();
      
      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Payment failed. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccessContent = () => {
    if (isPaymentVerified) {
      navigate('/download');
    } else {
      handleCheckout();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {isPaymentVerified ? 'Access Your Content' : 'Download Premium Document'}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {isPaymentVerified 
              ? 'Welcome back! Your purchase is verified and ready for access.'
              : 'Get instant access to high-quality resources designed to accelerate your learning journey.'
            }
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="md:flex">
            {/* PDF Preview/Image Section */}
            <div className="md:w-1/3 bg-gradient-to-br from-blue-500 to-purple-600 p-8 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-24 h-32 bg-white/20 backdrop-blur-sm rounded-lg mx-auto mb-4 flex items-center justify-center border border-white/30">
                  <svg 
                    className="w-12 h-12 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                    />
                  </svg>
                </div>
                <div className="text-sm font-medium opacity-90">PDF Document</div>
                <div className="text-xs opacity-75">{pdfDocument.pages} pages • {pdfDocument.size}</div>
              </div>
            </div>

            {/* Content Section */}
            <div className="md:w-2/3 p-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {pdfDocument.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {pdfDocument.description}
                  </p>
                </div>

                {/* Document Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-1">File Size</div>
                    <div className="font-semibold text-gray-900">{pdfDocument.size}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-1">Pages</div>
                    <div className="font-semibold text-gray-900">{pdfDocument.pages}</div>
                  </div>
                </div>

                {/* Price Display */}
                {!isPaymentVerified && (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        ${productInfo.price.toFixed(2)} {productInfo.currency}
                      </div>
                      <div className="text-gray-600">One-time purchase • Lifetime access</div>
                    </div>
                  </div>
                )}
                
                {/* Verified User Status */}
                {isPaymentVerified && (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-lg font-semibold text-gray-900">Payment Verified</span>
                      </div>
                      <div className="text-gray-600">You have lifetime access to this content</div>
                    </div>
                  </div>
                )}

                {/* Features List */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">What's Included:</h3>
                  <ul className="space-y-2">
                    {[
                      'Comprehensive best practices guide',
                      'Real-world code examples',
                      'Step-by-step tutorials',
                      'Industry standard patterns',
                      'Lifetime access and updates'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <svg 
                          className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M5 13l4 4L19 7" 
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 space-y-3">
                  {/* Main Action Button */}
                  <button
                    onClick={handleAccessContent}
                    disabled={isLoading}
                    className={`w-full text-white font-semibold py-4 px-8 rounded-xl transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl ${
                      isLoading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : isPaymentVerified
                        ? 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-3">
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Processing...</span>
                        </>
                      ) : isPaymentVerified ? (
                        <>
                          <svg 
                            className="w-6 h-6" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                            />
                          </svg>
                          <span>Access Your Content</span>
                        </>
                      ) : (
                        <>
                          <svg 
                            className="w-6 h-6" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" 
                            />
                          </svg>
                          <span>Buy Now - ${productInfo.price.toFixed(2)}</span>
                        </>
                      )}
                    </div>
                  </button>
                  
                  <p className="text-center text-sm text-gray-500 mt-3">
                    {isPaymentVerified 
                      ? 'Your access is verified and secure'
                      : 'Instant download • Secure payment • 30-day money-back guarantee'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {[
            {
              icon: (
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
              title: 'Instant Access',
              description: 'Download immediately after purchase. No waiting, no delays.'
            },
            {
              icon: (
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: 'Quality Guaranteed',
              description: 'Premium content created by industry experts and professionals.'
            },
            {
              icon: (
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              ),
              title: 'Lifetime Updates',
              description: 'Get all future updates and improvements included forever.'
            }
          ].map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PdfDownloadPage;