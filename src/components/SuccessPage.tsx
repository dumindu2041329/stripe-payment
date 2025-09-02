import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { usePayment } from '../contexts/PaymentContext';

const SuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyPayment, isLoading, error, paymentSession } = usePayment();
  const [verificationComplete, setVerificationComplete] = useState(false);
  
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const handlePaymentVerification = async () => {
      if (!sessionId) {
        setVerificationComplete(true);
        return;
      }

      try {
        const success = await verifyPayment(sessionId);
        if (success) {
          // Redirect to protected download page after successful verification
          setTimeout(() => {
            navigate('/download');
          }, 3000); // Give user time to see success message
        }
      } catch (err) {
        console.error('Payment verification failed:', err);
      } finally {
        setVerificationComplete(true);
      }
    };

    handlePaymentVerification();
  }, [sessionId, verifyPayment, navigate]);

  const handleProceedToDownload = () => {
    navigate('/download');
  };

  if (isLoading || !verificationComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (error || !paymentSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Verification Failed</h1>
            <p className="text-gray-600 mb-6">{error || 'Unable to verify your payment. Please contact support.'}</p>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isPaymentSuccessful = paymentSession.payment_status === 'paid';

  if (!isPaymentSuccessful) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 19c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Pending</h1>
            <p className="text-gray-600 mb-6">Your payment is still being processed. Please check back later or contact support.</p>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Payment Successful! 🎉
          </h1>
          <p className="text-xl text-gray-600">
            Thank you for your purchase. Redirecting to your download page...
          </p>
          <div className="mt-4">
            <div className="text-sm text-gray-500">
              Redirecting in 3 seconds or 
              <button 
                onClick={handleProceedToDownload}
                className="text-blue-600 hover:text-blue-700 underline ml-1"
              >
                click here to proceed now
              </button>
            </div>
          </div>
        </div>

        {/* Purchase Details */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-8">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Purchase Details</h2>
            <p className="opacity-90">Confirmation for your recent purchase</p>
          </div>
          
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Product Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Product:</span>
                    <span className="font-medium">{paymentSession.metadata.product_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">${(paymentSession.amount_total / 100).toFixed(2)} {paymentSession.currency.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">Digital Download</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Customer Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{paymentSession.customer_email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Paid
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Access:</span>
                    <span className="font-medium">Lifetime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Redirect to Download Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Preparing Your Download...
          </h2>
          
          <div className="text-center">
            <div className="animate-pulse bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full mb-6"></div>
            
            <button
              onClick={handleProceedToDownload}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Go to Download Page</span>
              </div>
            </button>
            
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Your purchase has been verified and secured. You'll have lifetime access to your content.
              </p>
            </div>
          </div>
        </div>

        {/* Return Home */}
        <div className="text-center mt-8">
          <button
            onClick={() => window.location.href = '/'}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;