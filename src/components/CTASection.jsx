import React from "react";

const CTASection = () => {
  return (
    <section className="bg-[#004672] text-white py-20 text-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/assets/Logo.svg"
            alt="MyVkard Logo"
            className="h-16 w-auto"
          />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Make Every Connection Count
        </h2>
        <p className="text-lg mb-1">
          Join thousands of professionals using MyVkard to upgrade how they
          network. Smart. Seamless.
        </p>
        <p className="text-lg mb-8">Paperless.</p>

        {/* Two Containers Side by Side */}
        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch mb-12">
          {/* Left Container - Updated layout */}
<div className="w-full md:w-[40%] bg-[#fff5f7] rounded-xl relative shadow-lg flex flex-col justify-start px-6 py-8 min-h-[260px]">
  {/* Text Content */}
  <div className="text-left text-[#004672] z-10 flex-grow pr-32">
    <h2 className="text-2xl font-bold leading-tight mb-4">
      Join<br />
      <span className="text-[#0d1b2a]">MyVkard</span>
    </h2>
    <p className="text-gray-700 text-lg leading-relaxed font-bold">
      Get your personalized
      digital business card
      today and start making
      memorable first
      impressions.
    </p>
  </div>

  {/* Card Image - Bigger, rotated to the left */}
  <div className="absolute right-[-60px] bottom-[-10px] z-0 hidden md:block">
    <img
      src="/assets/JoinMyVkard.png"
      alt="Digital Business Card"
      className="w-[250px] md:w-[270px] rotate-[-5deg] drop-shadow-xl"
    />
  </div>

  {/* Image for smaller screens, placed below text */}
  <div className="md:hidden mt-4 flex justify-center">
    <img
      src="/assets/JoinMyVkard.png"
      alt="Digital Business Card"
      className="w-[220px] rotate-[-5deg] drop-shadow-xl"
    />
  </div>
</div>




          {/* Right Container - Minimal changes */}
          <div className="w-full md:w-1/2 bg-[#1e1e1e] rounded-xl p-6 shadow-lg text-left text-white flex flex-col justify-between">
            <div>
              <h3 className="text-sm uppercase text-gray-300 mb-2">
                Lifetime Access
              </h3>
              <h2 className="text-2xl font-bold text-white mb-3">XYZ</h2>

              <div className="inline-block bg-orange-500 text-xs uppercase font-medium px-2 py-1 rounded mb-4">
                exclusive
              </div>

              <ul className="space-y-2 text-sm text-gray-200 bg-[#2a2a2a] p-4 rounded-lg mb-6">
                <li>Premium card design</li>
                <li>Advanced analytics & tap insights</li>
                <li>Unlimited profile edits</li>
                <li>Priority support</li>
              </ul>
            </div>

            <button className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white px-5 py-3 rounded flex items-center gap-2 text-sm font-semibold self-start">
              <svg
                className="w-4 h-4 text-orange-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.353a.75.75 0 011.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;