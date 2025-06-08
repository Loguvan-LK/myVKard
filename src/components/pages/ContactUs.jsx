import React from "react";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-white py-16 px-6 sm:px-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-300">
          <h3 className="text-2xl text-center font-semibold text-[#11357E] mb-6">
            CONTACT US
          </h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full border border-gray-300 rounded px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full border border-gray-300 rounded px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
            />
            <textarea
              placeholder="Message"
              rows="4"
              className="w-full border border-gray-300 rounded px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
            ></textarea>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-[#FF6B00] text-white font-semibold shadow-md hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-300"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
