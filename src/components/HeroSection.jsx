import React from "react";
import cardImage from "/assets/2.png";
import arrowSVG from "/assets/Vector.svg";
import background from "/assets/Union.png";

export default function HeroSection() {
  return (
    <section
      className="w-full py-10 relative overflow-hidden bg-no-repeat bg-center bg-contain"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row justify-between items-center gap-10 relative">
        {/* Left Content */}
        <div className="text-left z-10 lg:w-1/3 order-1 w-full">
          <h4 className="text-[#FF6B00] text-2xl font-semibold mb-2">
            NFC Solution
          </h4>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#11357E] leading-tight mb-6">
            Tap. Connect. <br /> Share Instantly.
          </h1>
          <p className="text-base sm:text-lg text-[#333333] mb-8 max-w-sm">
            Your smart digital business card is here. One tap lets you share
            your contact details, links, and profile—no apps, no paper, no
            hassle.
          </p>
          <button className="bg-[#FF6B00] text-white font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-md text-base sm:text-lg relative shadow-[4px_4px_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
            Buy Your Card Now
          </button>
        </div>

        {/* Card Image */}
        <div className="relative flex flex-col items-center justify-center z-10 lg:w-1/3 order-2">
          <img
            src={cardImage}
            alt="NFC Card"
            className="w-[280px] sm:w-[400px] md:w-[480px] lg:w-[520px] relative z-10 transition-transform duration-700 hover:scale-105"
          />
        </div>

        {/* Right Content */}
        <div className="text-left z-10 flex flex-col justify-center lg:w-1/3 order-4 lg:order-3 w-full">
          <div className="flex items-baseline mb-2 lg:mb-2">
            <h2 className="text-[#FF6B00] text-4xl sm:text-5xl font-bold">
              50
            </h2>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#11357E]">
              K+
            </h2>
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold text-[#11357E] mb-4">
            Smart Connections
          </h3>
          <p className="text-base sm:text-lg text-[#333333] mb-6 sm:mb-8 max-w-sm">
            From freelancers to founders, MyVKard helps professionals simplify
            networking, stand out, and stay connected—anytime, anywhere.
          </p>

          {/* Arrow + Dots for large screens */}
          <div className="hidden lg:flex items-center space-x-4 mt-2 sm:mt-0">
            <img
              src={arrowSVG}
              alt="Curved Arrow"
              className="w-24 h-24 transform rotate-12"
            />
            <div className="flex items-center space-x-[-20px]">
              <span className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white z-10"></span>
              <span className="w-8 h-8 bg-[#FF6B00] rounded-full border-2 border-white z-20"></span>
              <span className="w-8 h-8 bg-[#11357E] rounded-full border-2 border-white z-30"></span>
            </div>
          </div>
        </div>

        {/* Arrow + Dots for small screens */}
        <div className="flex items-center order-3 lg:hidden w-full justify-center mt-4">
          <img
            src={arrowSVG}
            alt="Curved Arrow"
            className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 transform rotate-12"
          />
          <div className="flex items-center space-x-[-20px] mt-2 sm:mt-0 ml-4">
            <span className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white z-10"></span>
            <span className="w-8 h-8 bg-[#FF6B00] rounded-full border-2 border-white z-20"></span>
            <span className="w-8 h-8 bg-[#11357E] rounded-full border-2 border-white z-30"></span>
          </div>
        </div>
      </div>
    </section>
  );
}
