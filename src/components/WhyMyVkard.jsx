import React from "react";

const WhyMyVkard = () => {
  const features = [
    {
      icon: "/assets/star-orange.svg",
      title: "A Better Way to Share Your Info",
      text: "With just one tap, share your info, switch between 3 business profiles, and make lasting impressions—no apps, no hassle.",
    },
    {
      icon: "/assets/star-white.svg",
      title: "One Card, Three Brands",
      text: "Manage up to 3 business or personal profiles on a single NFC card—perfect for freelancers, consultants, and entrepreneurs.",
    },
    {
      icon: "/assets/star-orange.svg",
      title: "No Apps. No Logins. Just Tap",
      text: "No need to install apps—just tap or scan to instantly share your contact info, services, or portfolios.",
    },
    {
      icon: "/assets/star-white.svg",
      title: "Update Anytime",
      text: "Change your links, brand info, or contact details anytime. You’re always in control.",
    },
    {
      icon: "/assets/star-orange.svg",
      title: "Look Professional, Stay Minimal",
      text: "Stand out with a premium card design and clutter-free networking. One card says it all.",
    },
  ];

  return (
    <section
      className="relative py-20 text-white overflow-visible"
      style={{
        backgroundImage: `url("/assets/background-texture.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#004773] opacity-90"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-start gap-12">
        {/* Left Side - Heading and Card Image */}
        <div className="flex-1 flex flex-col items-center lg:items-start lg:pt-12">
          {/* Heading */}
          <div className="w-full mb-6 text-center">
            <div className="inline-block text-left">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
                Why myVkard?
              </h2>
              <h3 className="text-3xl sm:text-4xl font-bold leading-tight">
                A Better Way to
                <br />
                Share Your Info
              </h3>
            </div>
          </div>

          {/* Card Image */}
          <div className="relative mt-2 lg:mt-6">
            <img
              src="/assets/card-mockup-2.png"
              alt="Mockup Card"
              className="w-full max-w-[80vw] sm:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] relative z-10 lg:-mb-40"
              onError={() => console.error("Failed to load card image")}
            />
          </div>
        </div>

        {/* Right Side - Features */}
        <div className="flex-1 space-y-6">
          {features.map((feature, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <hr className="border-t border-orange-500 opacity-100" />
              )}
              <Feature
                icon={feature.icon}
                title={feature.title}
                text={feature.text}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

// Feature Component
const Feature = ({ icon, title, text }) => (
  <div className="flex items-start gap-3">
    <img src={icon} alt="icon" className="w-7 mt-1 shrink-0" />
    <div className="flex flex-col sm:flex-row sm:items-start sm:gap-4 w-full">
      <h4 className="text-white font-semibold text-sm sm:text-base sm:min-w-[200px] sm:max-w-[220px] leading-snug">
        {title}
      </h4>
      <p className="text-white opacity-90 text-sm sm:text-base leading-snug max-w-xl">
        {text}
      </p>
    </div>
  </div>
);

export default WhyMyVkard;
