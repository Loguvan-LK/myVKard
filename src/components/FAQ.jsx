import React from "react";

const FAQ = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Heading */}
        <div className="text-left md:text-center">
          <h2 className="text-4xl text-orange-500 leading-tight">
            FAQ
            <br />
            <h3 className="text-[#00467F]">Have Any</h3>
             <h3 className="text-[#00467F]">Questions?</h3>
          </h2>
        </div>

        {/* Right Accordion */}
        <div className="space-y-4">
          {[
            {
              question: "Do I need an app to use myVkard?",
              answer: "No. You don’t need an app, and neither does the person receiving your info.",
            },
            {
              question: "Will it work on all smartphones?",
              answer: "Yes, myVkard works with any smartphone with NFC support or QR code scanning capability.",
            },
            {
              question: "Can I update my profile later?",
              answer: "Yes, you can update your profile anytime via the dashboard.",
            },
          ].map((faq, index) => (
            <details
              key={index}
              className="group bg-[#00467F] text-white rounded-xl p-5 transition-all duration-300"
            >
              <summary className="cursor-pointer font-semibold text-lg group-open:text-orange-400">
                {faq.question}
              </summary>
              <p className="mt-2 text-sm text-white/90">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
