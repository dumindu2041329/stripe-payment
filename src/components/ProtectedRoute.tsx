import React, { type ReactElement } from 'react';
import { usePayment } from '../contexts/PaymentContext';

interface ProtectedRouteProps {
  children: ReactElement;
  fallback?: ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallback 
}) => {
  const { isPaymentVerified, isLoading } = usePayment();

  // Show loading state while verifying payment
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  // If payment is verified, render the protected content
  if (isPaymentVerified) {
    return children;
  }

  // If payment is not verified, show fallback or default unauthorized message
  if (fallback) {
    return fallback;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Access Restricted
          </h1>
          
          <p className="text-gray-600 mb-6">
            You need to purchase this content to access it. Please complete your payment to continue.
          </p>
          
          <div className="space-y-3">
            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Purchase Now
            </button>
            
            <p className="text-sm text-gray-500">
              Already purchased? Your access will be automatically restored.
            </p>
          </div>
          
          {/* Security Notice */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">
              🔒 This content is protected and only available to verified purchasers. 
              Your payment verification is secure and managed through encrypted sessions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoute;