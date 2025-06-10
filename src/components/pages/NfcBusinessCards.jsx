import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react"; // Import useState
import nfcImage from "/assets/card-mockup.png";
import nfccard from "/assets/NFC-card.png";
import { useCartStore } from "../../store/cartStore";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BASE_URL } from "../../config/config";

export default function NfcBusinessCards() {
  const { cart, removeFromCart, updateQuantity } = useCartStore();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [isCheckoutHovered, setIsCheckoutHovered] = useState(false); // State for checkout button hover

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
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

    try {
      const response = await fetch(`${BASE_URL}/api/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: totalQuantity }),
      });

      const data = await response.json();
      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to redirect to Stripe checkout");
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
                        className="w-24 h-24 bg-blue-100 rounded-xl flex items-center justify-center text-blue-400 text-5xl"
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 120 }}
                      >
                        📦
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
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setIsCheckoutHovered(true)}
                  onMouseLeave={() => setIsCheckoutHovered(false)}
                  onClick={handleCheckout}
                  className={`mt-8 w-full bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 transition text-white py-4 rounded-xl font-semibold shadow-lg ${
                    isCheckoutHovered ? "transform scale-105" : ""
                  }`}
                >
                  🚀 Proceed to Checkout
                </motion.button>
              </motion.div>
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
