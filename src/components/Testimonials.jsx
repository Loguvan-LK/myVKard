import React from "react";
import cardImage from "/assets/card-mockup.png";

const testimonials = [
  {
    name: "Thomas A",
    title: "Finance Executive",
    text: "Networking has never been easier. I just tap and people get all my info instantly.",
  },
  {
    name: "Jack L",
    title: "Sales Manager",
    text: "No more printing or outdated cards. myVkard makes a great first impression every time.",
  },
  {
    name: "Sarah M",
    title: "Freelancer",
    text: "The ability to update my links anytime is a game-changer.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row gap-12 items-start">
        {/* Left Side Title + Card */}
        <div className="md:w-1/3 relative flex flex-col items-start">
          <p className="text-orange-500 text-lg font-semibold mb-2">
            Customer Reviews
          </p>
          <h2 className="text-4xl text-[#00467F] leading-tight font-extrabold mb-6">
            Real Stories <br />{" "}
            <span className="text-[#00467F]">from Real Users</span>
          </h2>

          {/* Card Image: half shown */}
          {/* Card Image: half shown and bigger */}
          <div className="overflow-hidden w-full max-h-[370px] rounded-2xl">
            <img
              src={cardImage}
              alt="Card Mockup"
              className="w-full object-cover transform translate-x-1/6 scale-125 rotate-12 transition-transform duration-700 hover:scale-110 hover:rotate-6"
            />
          </div>
        </div>

        {/* Right Side Testimonials (Vertical) */}
        <div className="md:w-2/3 flex flex-col items-center gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-left flex flex-col justify-between hover:shadow-xl transition"
            >
              <p className="text-gray-700 italic mb-4">“{item.text}”</p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-12 h-12 bg-[#00467F] text-white rounded-full flex items-center justify-center font-bold text-lg border-4 border-white shadow-md">
                  {item.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
