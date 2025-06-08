import React from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import { Lightbulb, ToggleRight, Share2, Target } from "lucide-react";

const steps = [
  {
    title: "Buy the Card",
    description: "Order your smart business card in seconds.",
    icon: Lightbulb,
    id: "step1",
    next: "step2",
  },
  {
    title: "Set Up Profile",
    description: "Add your links, socials, and contact info.",
    icon: ToggleRight,
    id: "step2",
    next: "step3",
  },
  {
    title: "Start Sharing",
    description: "Tap to connect instantly.",
    icon: Share2,
    id: "step3",
    next: "step4",
  },
  {
    title: "Get Noticed",
    description: "Stand out and make a lasting impression.",
    icon: Target,
    id: "step4",
    next: null,
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h4 className="text-[#FF8500] text-base font-semibold mb-2">
          How It Works
        </h4>
        <h2 className="text-3xl md:text-4xl font-bold text-[#002A5C]">
          Get Started in 4 Simple Steps
        </h2>
      </div>

      {/* Desktop Version with Arrows */}
      <div className="hidden md:block">
        <ArcherContainer strokeColor="#FF8500" strokeWidth={2}>
          <div className="grid grid-cols-2 gap-y-20 gap-x-50 max-w-5xl mx-auto relative">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  className={`flex ${
                    isLeft ? "justify-start" : "justify-end"
                  } relative`}
                >
                  <ArcherElement
                    id={step.id}
                    relations={
                      step.next
                        ? [
                            {
                              targetId: step.next,
                              targetAnchor: isLeft ? "left" : "right",
                              sourceAnchor: isLeft ? "right" : "left",
                              style: {
                                strokeColor: "#FF8500",
                                strokeWidth: 3,
                                strokeDasharray: "8,4",
                                filter:
                                  "drop-shadow(0 0 2px rgba(255, 133, 0, 0.7))",
                                endMarker: true,
                              },
                            },
                          ]
                        : []
                    }
                  >
                    <div className="bg-[#003B6D] text-white rounded-xl p-6 shadow-xl w-[300px] relative">
                      <div className="absolute -top-5 -left-5 bg-[#FF8500] text-white w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg shadow-md">
                        {index + 1}
                      </div>
                      <div className="flex items-center space-x-2 mb-3">
                        <Icon className="text-[#FF8500] w-6 h-6" />
                        <h3 className="text-lg font-semibold text-[#FF8500]">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-white text-sm mt-1">
                        {step.description}
                      </p>
                    </div>
                  </ArcherElement>
                </div>
              );
            })}
          </div>
        </ArcherContainer>
      </div>

      {/* Mobile Version */}
      <div className="md:hidden flex flex-col items-center relative">
        <div className="absolute h-full w-1 bg-[#FF8500] left-1/2 transform -translate-x-1/2 z-0" />
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={step.id}
              className="bg-[#003B6D] text-white rounded-xl p-6 w-[90%] mt-10 shadow-xl z-10 relative"
            >
              <div className="flex items-center space-x-2 mb-3">
                <div className="bg-[#FF8500] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <Icon className="text-[#FF8500] w-5 h-5" />
                <h3 className="text-[#FF8500] font-bold text-lg">
                  {step.title}
                </h3>
              </div>

              <p className="text-white text-sm">{step.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;
