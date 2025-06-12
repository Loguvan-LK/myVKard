import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import nfcImage from "/assets/5.png";
import cards from "/assets/cards-m.png";
import nfccard from "/assets/NFC-card.png";
import { useCartStore } from "../../store/cartStore";
import { FiTrash2, FiPlus, FiMinus, FiMapPin, FiUser, FiPhone } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BASE_URL } from "../../config/config";

export default function NfcBusinessCards() {
  const { cart, removeFromCart, updateQuantity } = useCartStore();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [isCheckoutHovered, setIsCheckoutHovered] = useState(false);
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
    additionalInstructions: ""
  });

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateDeliveryAddress = () => {
    const requiredFields = ['fullName', 'addressLine1', 'city', 'state', 'postalCode', 'country', 'phoneNumber'];
    const missingFields = requiredFields.filter(field => !deliveryAddress[field].trim());
    
    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.join(', ')}`);
      return false;
    }
    return true;
  };

  const handleInitialCheckout = () => {
    if (!token) {
      toast.error("Please login to proceed");
      navigate("/login");
      return;
    }

    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    if (totalQuantity === 0) {
      toast.error("Cart is empty");
      return;
    }

    setShowDeliveryForm(true);
  };

  const handleFinalCheckout = async () => {
    if (!validateDeliveryAddress()) {
      return;
    }

    setIsProcessing(true);
    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

    try {
      const response = await fetch(`${BASE_URL}/api/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          quantity: totalQuantity,
          deliveryAddress: deliveryAddress
        }),
      });

      const data = await response.json();
      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to redirect to Stripe checkout");
    } finally {
      setIsProcessing(false);
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
  };

  const cartItemVariants = {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, type: "spring", stiffness: 80 } },
    exit: { opacity: 0, x: 80, transition: { duration: 0.4 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.7, rotate: -5 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -50, scale: 0.95, transition: { duration: 0.3 } }
  };

  return (
    <motion.section
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-6 sm:px-12"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto">
        {/* Cart Display */}
        <motion.div className="mb-12">
          <motion.h2
            className="text-4xl font-extrabold text-blue-900 mb-8 text-center md:text-left"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.15)" }}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
          >
            🛒 Your NFC Business Card Cart
          </motion.h2>

          {cart.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 py-12"
            >
              <p className="text-xl italic">
                🛒 Your cart is empty. Let's find the perfect NFC card for you!
              </p>
            </motion.div>
          ) : (
            <>
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={cartItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex items-center justify-between border rounded-xl shadow-md p-5 mb-5 bg-white hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-5">
                      <motion.div
                        className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0"
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 120 }}
                      >
                        <img 
                          src={cards} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <div>
                        <p className="text-lg font-semibold text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Unit Price: ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="text-right space-y-3">
                      <p className="font-bold text-blue-700">
                        ${item.price.toFixed(2)}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.2, rotate: -15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800 transition-colors duration-200"
                      >
                        <FiTrash2 size={24} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* ORDER SUMMARY */}
              <motion.div
                className="bg-white border rounded-xl shadow-md p-8 mt-10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
              >
                <h3 className="text-2xl font-bold mb-6 border-b pb-3 text-gray-800">
                  🧾 Order Summary
                </h3>
                <div className="flex justify-between text-gray-700 mb-3">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700 mb-3">
                  <span>Shipping</span>
                  <span className="text-green-700 font-medium">FREE</span>
                </div>
                <div className="flex justify-between text-xl font-semibold mt-5 border-t pt-5 text-gray-900">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {!showDeliveryForm ? (
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => setIsCheckoutHovered(true)}
                    onMouseLeave={() => setIsCheckoutHovered(false)}
                    onClick={handleInitialCheckout}
                    className={`mt-8 w-full bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 transition text-white py-4 rounded-xl font-semibold shadow-lg ${
                      isCheckoutHovered ? "transform scale-105" : ""
                    }`}
                  >
                    🚀 Proceed to Checkout
                  </motion.button>
                ) : null}
              </motion.div>

              {/* DELIVERY ADDRESS FORM */}
              <AnimatePresence>
                {showDeliveryForm && (
                  <motion.div
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="bg-white border rounded-xl shadow-md p-8 mt-8"
                  >
                    <div className="flex items-center mb-6">
                      <FiMapPin className="text-blue-700 mr-3" size={28} />
                      <h3 className="text-2xl font-bold text-gray-800">
                        📍 Delivery Address
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FiUser className="inline mr-2" />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={deliveryAddress.fullName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FiPhone className="inline mr-2" />
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={deliveryAddress.phoneNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address Line 1 *
                        </label>
                        <input
                          type="text"
                          name="addressLine1"
                          value={deliveryAddress.addressLine1}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Street address, P.O. box"
                          required
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address Line 2
                        </label>
                        <input
                          type="text"
                          name="addressLine2"
                          value={deliveryAddress.addressLine2}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Apartment, suite, unit, building (optional)"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={deliveryAddress.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter city"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State/Province *
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={deliveryAddress.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter state/province"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Postal Code *
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={deliveryAddress.postalCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter postal code"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country *
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={deliveryAddress.country}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter country"
                          required
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Additional Instructions
                        </label>
                        <textarea
                          name="additionalInstructions"
                          value={deliveryAddress.additionalInstructions}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Special delivery instructions (optional)"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowDeliveryForm(false)}
                        className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
                      >
                        ← Back to Cart
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleFinalCheckout}
                        disabled={isProcessing}
                        className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          '🚀 Complete Purchase'
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </motion.div>

        <motion.h2
          className="text-4xl text-[#11357E] text-center mb-14 font-extrabold"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.15)" }}
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
          Unlock Connections with NFC Business Cards
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 items-center">
          {/* Left Text */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }}
          >
            <p className="text-lg text-gray-800 leading-relaxed">
              Near-field communication (NFC) business cards empower you to share
              your contact information instantly with a single tap. They combine
              a digital business card with a physical NFC tag.
            </p>
          </motion.div>

          {/* Center Image */}
          <motion.div
            className="flex justify-center lg:col-span-1"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <img
              src={nfcImage}
              alt="NFC Card Mockup"
              className="w-[550px] sm:w-[650px] md:w-[750px] rounded-2xl shadow-2xl transform transition-transform duration-700 hover:scale-105"
            />
          </motion.div>

          {/* Right Text */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }}
          >
            <p className="text-lg text-gray-800 leading-relaxed">
              NFC tags come in various forms, including stickers, pop sockets,
              keychains, and cards. These tags contain microchips that, when
              tapped to a smartphone, automatically display your linked
              information.
            </p>
          </motion.div>
        </div>

        {/* How it works section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mt-20">
          {/* Left Image */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }}
          >
            <img
              src={nfccard}
              alt="How it works"
              className="max-w-md rounded-2xl shadow-xl transform transition-transform duration-700 hover:scale-105"
            />
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }}
          >
            <h3 className="text-3xl text-[#11357E] mb-6 font-semibold">
              Effortless NFC Business Cards with myVkard
            </h3>
            <p className="text-lg text-gray-800 leading-relaxed">
              myVkard offers seamless support for NFC business cards. Simply
              obtain an NFC tag, write your digital business card to it, and
              share your contact information with a single tap.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}