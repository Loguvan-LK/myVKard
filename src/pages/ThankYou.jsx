import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { CheckCircle } from 'lucide-react';

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(true);
  const [purchaseDetails, setPurchaseDetails] = useState(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    const purchaseId = searchParams.get('purchase_id');

    if (sessionId && purchaseId) {
      const verifyPayment = async () => {
        try {
          const res = await fetch(`http://localhost:5000/api/success?session_id=${sessionId}&purchase_id=${purchaseId}`);
          const data = await res.json();
          if (data.success) {
            clearCart();
            setPurchaseDetails({ quantity: data.cards.length });
          }
        } catch (error) {
          console.error('Error verifying payment:', error);
        } finally {
          setIsProcessing(false);
        }
      };
      verifyPayment();
    } else {
      navigate('/');
    }
  }, [searchParams, clearCart, navigate]);

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Processing your purchase...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Thank You for Your Purchase!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Your payment has been processed successfully. 
          {purchaseDetails && (
            <span className="block mt-2 font-medium">
              Quantity: {purchaseDetails.quantity} NFC Card{purchaseDetails.quantity > 1 ? 's' : ''}
            </span>
          )}
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
          <ul className="text-sm text-blue-800 text-left space-y-1">
            <li>• Your NFC cards are being prepared</li>
            <li>• Check your email for shipping details</li>
            <li>• Visit your dashboard to manage your cards</li>
            <li>• Each card comes with 3 customizable profiles</li>
          </ul>
        </div>

        <div className="space-y-3">
          {user && (
            <button
              onClick={handleGoToDashboard}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Go to Dashboard
            </button>
          )}
          
          <button
            onClick={handleGoHome}
            className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
          >
            Back to Home
          </button>
        </div>

        <div className="mt-6 pt-6 border-t">
          <p className="text-sm text-gray-500">
            Need help? Contact us at{' '}
            <a href="mailto:support@myvkard.io" className="text-blue-600 hover:underline">
              support@myvkard.io
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;