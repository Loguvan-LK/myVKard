// src/pages/NfcBusinessCards.jsx
import React from "react";
import nfcImage from "/assets/card-mockup.png"; // Make sure you have the image
import nfccard from "/assets/NFC-card.png"; // Make sure you have the image

export default function NfcBusinessCards() {
  return (
    <section className="min-h-screen bg-white py-10 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl text-[#11357E] text-center mb-12">
          What is an NFC business card?
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-1">
            <p className="text-lg text-gray-700">
              Near-field communication (NFC) business cards enable you to share
              your contact information with a single tap. NFC business cards
              have two components: a digital business card and an NFC tag.
            </p>
          </div>

          {/* Center Image */}
          <div className="flex justify-center lg:col-span-1">
            <img
              src={nfcImage}
              alt="NFC Card Mockup"
              className="w-[500px] sm:w-[600px] md:w-[700px] rounded shadow transform transition-transform duration-700 hover:scale-105 opacity-0 animate-fade-in"
            />
          </div>

          {/* Right Text */}
          <div className="lg:col-span-1">
            <p className="text-lg text-gray-700">
              NFC tags come in several forms, like stickers, pop sockets,
              keychains, and physical cards. They contain tiny microchips, and
              when tapped to another smartphone, the information paired with
              your tag (like the link to your business card) automatically
              appears.
            </p>
          </div>
        </div>

        {/* How it works section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-16">
          {/* Left Image */}
          <div className="flex justify-center">
            <img
              src={nfccard}
              alt="How it works"
              className="max-w-xs rounded shadow rounded shadow transform transition-transform duration-700 hover:scale-105 opacity-0 animate-fade-in"
            />
          </div>

          {/* Right Content */}
          <div>
            <h3 className="text-2xl text-[#11357E] mb-4">
              How do myVkard's NFC business cards work?
            </h3>
            <p className="text-lg text-gray-700">
              myVkard provides free support for NFC business cards—all you need
              is an NFC tag. Once you have an NFC tag, you can write your
              digital business card to it, allowing you to share your card with
              anyone with a single tap.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
