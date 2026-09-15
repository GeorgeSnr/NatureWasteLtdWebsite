import React from "react";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="relative w-full bg-[#F4F5F7] py-16 sm:py-20 lg:py-24 overflow-hidden border-t border-gray-200/50 select-none">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-12 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
          <div>
            <div className="flex items-center gap-1.5 text-nature-primary font-bold text-xs sm:text-sm tracking-widest uppercase">
              <span className="text-base leading-none text-nature-secondary">»</span>
              <span>TESTIMONIALS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#141517] tracking-tight leading-[1.15] mt-3">
              Trusted by municipal &amp; <br className="hidden sm:inline" /> industrial leaders across Africa
            </h2>
          </div>

          <div className="shrink-0">
            <Link
              href="/industries"
              className="relative overflow-hidden bg-nature-primary text-white font-extrabold text-sm sm:text-base px-7 py-3.5 sm:px-8 sm:py-4 cursor-pointer shadow-md group inline-flex"
            >
              <span className="absolute inset-0 bg-[#141517] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
              <span className="relative z-10 text-white flex items-center gap-3">
                <span>View Case Studies</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials Cards Grid / Carousel */}
      <div className="relative w-full mt-10 sm:mt-14 overflow-hidden">
        <div className="w-full overflow-x-auto py-4 px-6 sm:px-12 lg:px-16 scrollbar-none">
          <div className="flex items-stretch gap-6 sm:gap-8 w-max">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="w-[300px] sm:w-[360px] lg:w-[410px] shrink-0 bg-white p-7 sm:p-9 shadow-xs hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between chamfer-card-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-cover bg-center shrink-0 border-2 border-nature-secondary"
                        style={{ backgroundImage: `url('${t.avatar}')` }}
                      />
                      <div>
                        <h3 className="text-lg sm:text-xl font-black text-[#141517] leading-tight">
                          {t.name}
                        </h3>
                        <p className="text-xs font-semibold text-gray-500 mt-0.5">
                          {t.role}
                        </p>
                        <p className="text-[11px] font-bold text-nature-primary">
                          {t.organization}
                        </p>
                      </div>
                    </div>

                    {/* Watermark Badge */}
                    <div className="flex flex-col items-end opacity-40 select-none shrink-0">
                      <span className="text-sm font-black italic tracking-tighter text-[#141517] leading-none">
                        NATURE
                      </span>
                      <span className="text-[8px] font-extrabold tracking-[0.2em] text-nature-primary uppercase mt-0.5 leading-none">
                        WASTE
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-6 mb-8 font-normal">
                    &ldquo;{t.content}&rdquo;
                  </p>
                </div>

                {/* Bottom Stars & Quote Icon */}
                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-nature-primary">
                    {[...Array(5)].map((_, sIdx) => (
                      <Star
                        key={sIdx}
                        className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-nature-primary stroke-nature-primary"
                      />
                    ))}
                  </div>

                  <svg
                    className="w-8 h-8 opacity-40 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
