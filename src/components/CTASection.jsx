import React, { useState, useRef, useEffect } from "react";
import { useCartStore } from "../store/cartStore";
import toast from "react-hot-toast";
import { FiCheckCircle, FiShoppingCart, FiStar } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const CTASection = () => {
  const { addToCart, setCartOpen, cart } = useCartStore();
  const [isAdding, setIsAdding] = useState(false);
  const [flyToCart, setFlyToCart] = useState(false);
  const [pulseEffect, setPulseEffect] = useState(false);
  const cardRef = useRef(null);

  // Check if product is already in cart
  const isInCart = cart.some((item) => item.id === "nfc-001");

  const handleAddToCart = () => {
    if (isInCart) {
      setCartOpen(true);
      toast.success("🛒 Opening your cart!");
      return;
    }

    const product = {
      id: "nfc-001",
      name: "NFC Business Card",
      price: 50,
      quantity: 1,
      imageUrl: "/assets/NFC-card.png", // Add image URL
      description: "Premium NFC-enabled business card with lifetime access",
    };

    setIsAdding(true);
    setPulseEffect(true);

    // Add to cart
    addToCart(product);
    setCartOpen(true);
    setFlyToCart(true);
    toast.success("🎉 Product added to cart!");

    // Enhanced confetti effect
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });

    // Reset animation states
    setTimeout(() => {
      setIsAdding(false);
    }, 2000);

    setTimeout(() => {
      setFlyToCart(false);
    }, 1000);

    setTimeout(() => {
      setPulseEffect(false);
    }, 3000);
  };

  return (
    <section className="bg-[#004672] text-white py-20 text-center relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-16 h-16 bg-white/5 rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="/assets/Logo.svg"
            alt="MyVkard Logo"
            className="h-16 w-auto"
          />
        </motion.div>

        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Make Every Connection Count
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-lg mb-1">
            Join thousands of professionals using MyVkard to upgrade how they
            network. Smart. Seamless.
          </p>
          <p className="text-lg mb-8">Paperless.</p>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row gap-8 justify-center items-stretch mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Left Card */}
         <motion.div
  className="w-full md:w-[40%] bg-[#fff5f7] rounded-xl relative shadow-lg flex flex-col justify-start px-6 py-8 min-h-[260px] overflow-hidden"
  whileHover={{
    scale: 1.02,
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  }}
  transition={{ duration: 0.3 }}
>
  <div className="text-left text-[#004672] z-10 flex-grow pr-56"> {/* Increased right padding */}
    <h2 className="text-2xl font-bold leading-tight mb-4">
      Join
      <br />
      <span className="text-[#0d1b2a]">MyVkard</span>
    </h2>
    <p className="text-gray-700 text-lg leading-relaxed">
      Get your personalized digital business card today and start
      making memorable first impressions.
    </p>
  </div>

  <div className="absolute right-[-80px] bottom-[-20px] z-0 hidden md:block">
    <motion.img
      ref={cardRef}
      src="/assets/cards-m.png"
      alt="Card"
      className="w-[350px] rotate-[-5deg] drop-shadow-xl"
      animate={
        pulseEffect
          ? {
              scale: [1, 1.1, 1],
              rotate: [-5, 0, -5],
            }
          : {}
      }
      transition={{ duration: 0.6 }}
    />
  </div>

  <div className="md:hidden mt-4 flex justify-center">
    <motion.img
      src="/assets/cards-m.png"
      alt="Card"
      className="w-[220px] rotate-[-5deg] drop-shadow-xl"
      whileHover={{
        scale: 1.05,
        rotate: 0,
        transition: { duration: 0.3 },
      }}
    />
  </div>
</motion.div>


          {/* Right Card */}
          <motion.div
            className="w-full md:w-1/2 bg-[#1e1e1e] rounded-xl p-6 shadow-lg text-left text-white flex flex-col justify-between"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-sm uppercase text-gray-300">
                  Lifetime Access
                </h3>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <FiStar className="text-orange-400" />
                </motion.div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">XYZ</h2>
              <motion.div
                className="inline-block bg-orange-500 text-xs uppercase font-medium px-2 py-1 rounded mb-4"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(249, 115, 22, 0.4)",
                    "0 0 0 10px rgba(249, 115, 22, 0)",
                  ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                exclusive
              </motion.div>
              <motion.ul
                className="space-y-2 text-sm text-gray-200 bg-[#2a2a2a] p-4 rounded-lg mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {[
                  "Premium card design",
                  "Advanced analytics & tap insights",
                  "Unlimited profile edits",
                  "Priority support",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                  >
                    <FiCheckCircle className="text-orange-400" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* Enhanced Add to Cart Button */}
            <motion.button
              onClick={handleAddToCart}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className={`relative bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white px-5 py-3 rounded flex items-center gap-2 text-sm font-semibold self-start transition-all duration-300 overflow-hidden ${
                isInCart ? "bg-green-600 hover:bg-green-700" : ""
              }`}
            >
              {/* Animated background on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
                style={{ zIndex: -1 }}
              />

              {/* Button content */}
              <AnimatePresence mode="wait">
                {isAdding ? (
                  <motion.div
                    key="adding"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <FiShoppingCart />
                    </motion.div>
                    Adding...
                  </motion.div>
                ) : isInCart ? (
                  <motion.div
                    key="added"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    >
                      <FiCheckCircle />
                    </motion.div>
                    Added to Cart!
                  </motion.div>
                ) : (
                  <motion.div
                    key="add"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2"
                  >
                    <FiShoppingCart />
                    Add to Cart
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Enhanced Flying image animation */}
        <AnimatePresence>
          {flyToCart && (
            <motion.img
              src="/assets/JoinMyVkard.png"
              initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: -5 }}
              animate={{
                x: [0, 150, 300],
                y: [0, -50, -100],
                opacity: [1, 0.8, 0],
                scale: [1, 0.6, 0.3],
                rotate: [-5, 15, 30],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1,
                times: [0, 0.6, 1],
                ease: "easeOut",
              }}
              className="w-[120px] fixed bottom-32 left-[10%] pointer-events-none z-50"
            />
          )}
        </AnimatePresence>

        {/* Success particles */}
        <AnimatePresence>
          {isAdding && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-orange-400 rounded-full"
                  initial={{
                    x: "50%",
                    y: "50%",
                    opacity: 1,
                  }}
                  animate={{
                    x: `${50 + (Math.random() - 0.5) * 200}%`,
                    y: `${50 + (Math.random() - 0.5) * 200}%`,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CTASection;
