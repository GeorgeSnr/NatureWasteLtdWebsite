import React from "react";
import Link from "next/link";
import { Cpu, Recycle, Truck, ShieldCheck } from "lucide-react";

export default function FeatureCards() {
  const cards = [
    {
      num: "01",
      title: "Smart Bin Telematics",
      desc: "Solar-powered ultrasonic fill-level sensors, dynamic route sequencing, and automated overflow alarms across city street bins.",
      icon: Cpu,
      link: "/features#smart-collection",
    },
    {
      num: "02",
      title: "Circular Resource Recovery",
      desc: "Material Recovery Facility tracking, scrap polymer grading, high-density baling, and verified carbon offset certification.",
      icon: Recycle,
      link: "/features#material-recovery",
    },
    {
      num: "03",
      title: "Fleet Operations & GPS",
      desc: "Real-time compactor truck dispatch, weighbridge telematics, driver route optimization, and hydraulic PTO diagnostic logs.",
      icon: Truck,
      link: "/features#fleet-telematics",
    },
    {
      num: "04",
      title: "ESG & Compliance",
      desc: "Digital hazardous waste chain-of-custody, NEMA/EPA regulatory manifests, zero-landfill audits, and corporate ESG metrics.",
      icon: ShieldCheck,
      link: "/features#hazardous-waste",
    },
  ];

  return (
    <section className="w-full bg-white py-16 lg:py-24 px-6 sm:px-12 lg:px-16 select-none relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {cards.map((card) => {
          const IconComponent = card.icon;
          return (
            <Link
              key={card.num}
              href={card.link}
              className="relative bg-[#F7F8FA] p-8 lg:p-10 flex flex-col justify-between group overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-2xl chamfer-card min-h-[310px]"
            >
              {/* Slide-in primary green background overlay on hover */}
              <div className="absolute inset-0 bg-nature-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />

              {/* Card Icon */}
              <div className="relative z-10 mb-8 text-nature-primary group-hover:text-white transition-colors duration-300">
                <IconComponent className="w-12 h-12 stroke-[1.8]" />
              </div>

              {/* Card Titles & Body */}
              <div className="relative z-10 space-y-3">
                <h3 className="text-xl lg:text-[22px] font-bold text-[#141517] group-hover:text-white transition-colors duration-300 leading-snug">
                  {card.title}
                </h3>
                <p className="text-gray-500 group-hover:text-white/90 transition-colors duration-300 text-sm leading-relaxed font-normal">
                  {card.desc}
                </p>
              </div>

              {/* Giant Watermark Number at Bottom-Right */}
              <div className="absolute right-0 bottom-0 pointer-events-none select-none z-0 translate-x-2 translate-y-3">
                <span className="text-[110px] font-black text-[#E8ECF1]/90 group-hover:text-white/15 transition-colors duration-300 leading-none block tracking-tighter">
                  {card.num}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
