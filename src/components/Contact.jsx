import React from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <div className="bg-white py-16 px-4 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Block */}
        <div className="flex flex-col gap-6 w-full md:w-1/2">
          {/* Blue Card */}
          <div className="bg-[#00467F] text-white rounded-2xl p-6 md:p-8 shadow-lg">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              NETWORKING <br /> MADE TOUCH <br /> SIMPLE
            </h1>
            <p className="text-sm md:text-base mb-6">
              Instantly share your contact, socials, and more—just one tap with
              your NFC business card.
            </p>
            <Link to="/contact">
              <button className="bg-orange-500 text-white px-6 py-2 rounded-lg shadow hover:bg-orange-600 active:scale-95 transition w-fit">
                Contact Us
              </button>
            </Link>
          </div>

          {/* Bottom Left Section */}
          {/* We need to calculate heights. The right column's blue box is h-500px (md).
              The gap is 6 (24px).
              So, the blue card + bottom section + gap should equal 500px.
              If blue card is approximately 200px (example), then 500 - 200 - 24 = 276px for the combined bottom section.
              We'll adjust the height of the bottom containers to fit.
              Let's aim for the total height of the left column to be similar to the right.
          */}
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center sm:justify-start">
            {/* Image Block */}
            <div className="rounded-2xl w-72 h-[130px] sm:h-[180px] bg-white shadow-lg flex items-center justify-center overflow-hidden">
              {" "}
              {/* Adjusted height */}
              <div className="w-full h-full flex items-center justify-center p-3">
                <img
                  alt="Mobile Preview"
                  className="h-full w-full object-cover rounded-[20px]"
                  src="/assets/mobile.png"
                />
              </div>
            </div>

            {/* Orange Text Block */}
            <div className="bg-orange-500 text-white rounded-2xl w-72 h-[130px] sm:h-[180px] flex items-center justify-center text-center shadow-lg p-5">
              {" "}
              {/* Adjusted height */}
              <div>
                <h2 className="text-lg font-bold mb-3 leading-snug">
                  CONNECT SMARTER FASTER
                </h2>
                <p className="text-sm">
                  Share your brand in seconds with sleek, modern NFC cards.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image Block */}
        <div className="w-full md:w-1/2 flex justify-center items-center relative py-12 md:py-0">
          {/* Bigger container and relative positioning */}
          <div className="bg-[#00467F] rounded-2xl p-6 w-[400px] h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center relative shadow-lg">
            {/* Image floats above the top */}
            <img
              src="/assets/NFC-card.png"
              alt="NFC Tap"
              className="absolute -top-1/4 sm:-top-1/3 md:-top-32 w-[350px] sm:w-[400px] md:w-[470px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
