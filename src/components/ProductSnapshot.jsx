import React, { useState, useEffect } from "react";
import centerImage from "/assets/erasebg-transformed.png";
import icon1 from "/assets/icon1.svg";
import icon2 from "/assets/icon2.svg";
import icon3 from "/assets/icon3.svg";
import icon4 from "/assets/icon4.svg";
import icon5 from "/assets/icon5.svg";
import bgImage from "/assets/BG-01 1.png";

const ICONS = [
  { icon: icon1, text: "NFC-enabled physical card", angle: -90 },
  { icon: icon5, text: "One-tap contact sharing", angle: -150 },
  { icon: icon2, text: "Custom digital profile page", angle: -30 },
  { icon: icon4, text: "Unlimited updates and sharing", angle: 150 },
  { icon: icon3, text: "Free onboarding support", angle: 30 },
];

const ProductSnapshot = () => {
  const [radius, setRadius] = useState(240);

  // Adjust radius based on screen width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 400) {
        setRadius(130); // Smaller radius for 320px screens
      } else if (width < 640) {
        setRadius(170);
      } else {
        setRadius(240);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="bg-white py-10 sm:py-12 relative">
  <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-2xl font-bold text-orange-600 mb-2">Product Snapshot</h2>
    <h2 className="text-3xl sm:text-4xl text-[#004672] font-bold mb-2">NFC Digital Business Card</h2>

    <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-10 max-w-3xl mx-auto">
      A sleek, contactless business card that works with any modern smartphone. Perfect for professionals, freelancers, and business teams.
    </p>

    <div
      className="relative w-full aspect-square mx-auto"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "auto", // Remove fixed 100vh height
        maxHeight: "600px", // Optional: control max height
      }}
    >
      {/* Center Phone */}
      <img
        src={centerImage}
        alt="Phone"
        className="absolute top-1/2 left-1/2 w-[70px] sm:w-[100px] md:w-[130px] lg:w-[150px] transform -translate-x-1/2 -translate-y-1/2 z-10"
      />

      {/* Circular Icons */}
      {ICONS.map((item, index) => {
        const angleRad = (item.angle * Math.PI) / 180;
        const x = Math.cos(angleRad) * radius;
        const y = Math.sin(angleRad) * radius;

        return (
          <div
            key={index}
            className="absolute text-center w-24 sm:w-32"
            style={{
              top: `calc(50% + ${y}px)`,
              left: `calc(50% + ${x}px)`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <img src={item.icon} className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-1" alt={`Icon ${index + 1}`} />
            <p className="text-[clamp(0.6rem,1vw,0.85rem)] font-medium text-[#004672] truncate">
              {item.text}
            </p>
          </div>
        );
      })}
    </div>

    {/* CTA Button */}
    <div className="mt-6 sm:mt-8">
      <a
        href="#"
        className="inline-block bg-[#FF6B00] text-white font-semibold px-5 py-2 sm:px-6 sm:py-3 md:px-8 md:py-3 rounded-md shadow-[3px_3px_0_rgba(0,0,0,1)] hover:bg-orange-600 transition text-sm sm:text-base md:text-lg"
      >
        View Full Details
      </a>
    </div>
  </div>
</section>

  );
};

export default ProductSnapshot;