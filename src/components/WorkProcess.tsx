import React from "react";
import { ClipboardCheck, Route, Award } from "lucide-react";

export default function WorkProcess() {
  const steps = [
    {
      num: "01",
      title: "Audit & Smart Container Deployment",
      desc: "Our team assesses your neighborhood or industrial waste generation patterns, installs IoT ultrasonic sensors, and distributes color-coded sorting containers.",
      icon: ClipboardCheck,
    },
    {
      num: "02",
      title: "Dynamic Scheduling & Collection",
      desc: "Nature Waste Connect triggers algorithmic route dispatches when bins reach capacity, sending arrival SMS alerts to residents and tracking vehicle GPS in real-time.",
      icon: Route,
    },
    {
      num: "03",
      title: "Circular Processing & ESG Impact",
      desc: "Materials are weighed and sorted at our MRF facility, polymers are baled and pelletized, and corporate clients receive certified landfill diversion ESG reports.",
      icon: Award,
    },
  ];

  return (
    <section className="w-full bg-[#F7F8FA] pb-16 lg:pb-24 px-6 sm:px-12 lg:px-16 select-none relative z-10 overflow-hidden">
      <div className="max-w-[1320px] mx-auto relative">
        {/* Giant Watermark Behind Step Cards */}
        <div className="absolute -top-6 sm:-top-10 lg:-top-14 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none overflow-hidden z-0">
          <span className="text-6xl sm:text-8xl lg:text-[150px] font-extrabold text-gray-300/40 tracking-tight whitespace-nowrap leading-none block">
            Work Process
          </span>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10 pt-12 sm:pt-16">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-[#006F51] border border-gray-200 transition-colors group cursor-pointer relative overflow-hidden rounded-sm min-h-[260px]"
              >
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-[#1A1D20] leading-snug mb-5 group-hover:text-[#006F51] transition-colors">
                    {step.title}
                  </h4>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 text-nature-primary transition-transform duration-300 group-hover:scale-110">
                      <IconComponent className="w-full h-full stroke-[2]" />
                    </div>
                    <span className="text-4xl sm:text-5xl font-extrabold text-gray-200 group-hover:text-nature-primary transition-colors duration-300 tracking-tight">
                      {step.num}
                    </span>
                  </div>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.desc}
                </p>

                {/* Animated Bottom Green Accent Bar */}
                <div className="absolute bottom-0 left-0 h-[3px] bg-nature-primary w-0 group-hover:w-full transition-all duration-400 ease-out" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
