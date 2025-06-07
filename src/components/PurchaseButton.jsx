// Frontend: components/PurchaseButton.jsx
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const PurchaseButton = ({ productName, priceId, price, quantity = 1 }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();

  const handlePurchase = async () => {
    if (!user) {
      toast.error('Please log in to make a purchase');
      return;
    }

    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      
      // Create checkout session
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          priceId,
          quantity,
          userId: user._id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (error) {
        console.error('Stripe redirect error:', error);
        toast.error('Payment redirect failed');
      }

    } catch (error) {
      console.error('Purchase error:', error);
      toast.error(error.message || 'Purchase failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePurchase}
      disabled={loading || !user}
      className={`w-full py-3 px-6 rounded-lg font-semibold transition duration-200 ${
        loading || !user
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700 text-white'
      }`}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          Processing...
        </div>
      ) : (
        `Purchase ${productName} - $${price}`
      )}
    </button>
  );
};

export default PurchaseButton;