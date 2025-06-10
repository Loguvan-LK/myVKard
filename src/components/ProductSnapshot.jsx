import React, { useState, useEffect, useRef } from "react";
import centerImage from "/assets/erasebg-transformed.png";
import icon1 from "/assets/icon1.svg";
import icon2 from "/assets/icon2.svg";
import icon3 from "/assets/icon3.svg";
import icon4 from "/assets/icon4.svg";
import icon5 from "/assets/icon5.svg";
import bgImage from "/assets/BG-01 1.png";

const ICONS = [
  { icon: icon1, text: "NFC-enabled physical card", angle: 0 },
  { icon: icon5, text: "One-tap contact sharing", angle: 72 },
  { icon: icon2, text: "Custom digital profile page", angle: 144 },
  { icon: icon4, text: "Unlimited updates and sharing", angle: 216 },
  { icon: icon3, text: "Free onboarding support", angle: 288 },
];

const ProductSnapshot = () => {
  const [radius, setRadius] = useState(200); // Initial radius set higher
  const [rotationAngle, setRotationAngle] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let baseRadius;
      let iconHalfWidth;

      if (width < 640) {
        baseRadius = 100; // Increased from 80 for small screens
        iconHalfWidth = 24; // w-12 = 48px / 2
      } else if (width < 768) {
        baseRadius = 120; // Increased from 100 for medium-small screens
        iconHalfWidth = 32; // w-16 = 64px / 2
      } else if (width < 1024) {
        baseRadius = 160; // Increased from 140 for medium screens
        iconHalfWidth = 40; // w-20 = 80px / 2
      } else {
        baseRadius = 200; // Increased from 180 for large screens
        iconHalfWidth = 48; // w-24 = 96px / 2
      }

      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const maxRadius = containerWidth / 2 - iconHalfWidth;
        setRadius(Math.min(baseRadius, maxRadius));
      } else {
        setRadius(baseRadius);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let animationFrameId;
    let lastTime = 0;
    const rotationSpeed = 0.5; // Degrees per frame

    const animate = (time) => {
      if (lastTime !== 0) {
        const deltaTime = time - lastTime;
        setRotationAngle(
          (prev) => (prev + rotationSpeed * (deltaTime / 16)) % 360
        );
      }
      lastTime = time;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section className="bg-white py-10 sm:py-12 relative">
      <div className="w-full max-w-[90%] mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl font-bold text-orange-600 mb-2">
          Product Snapshot
        </h2>
        <h2 className="text-3xl sm:text-4xl text-[#004672] font-bold mb-2">
          NFC Digital Business Card
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto">
          A sleek, contactless business card that works with any modern
          smartphone. Perfect for professionals, freelancers, and business
          teams.
        </p>

        <div
          ref={containerRef}
          className="relative mx-auto aspect-square max-w-[600px] sm:max-w-[640px] md:max-w-[720px] lg:max-w-[800px] xl:max-w-[850px]"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "auto",
          }}
        >
          <img
            src={centerImage}
            alt="Phone"
            className="absolute top-1/2 left-1/2 w-[40px] sm:w-[60px] md:w-[80px] lg:w-[100px] xl:w-[120px] transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ animation: "pulse 2s infinite" }}
          />

          {ICONS.map((item, index) => {
            const angleRad = ((item.angle + rotationAngle) * Math.PI) / 180;
            // Add extra space (e.g., 32px) to the radius for spacing
            const iconSpacing = 32; // Adjust this value as needed
            const x = Math.cos(angleRad) * (radius + iconSpacing);
            const y = Math.sin(angleRad) * (radius + iconSpacing);

            return (
              <div
                key={index}
                className="absolute text-center w-12 sm:w-16 md:w-20 lg:w-24"
                style={{
                  top: `calc(50% + ${y}px)`,
                  left: `calc(50% + ${x}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <img
                  src={item.icon}
                  className="w-full h-auto mx-auto mb-1"
                  alt={`Icon ${index + 1}`}
                />
                <p className="text-[clamp(0.6rem,1vw,0.85rem)] font-medium text-[#004672] text-center break-words whitespace-normal leading-snug">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

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
