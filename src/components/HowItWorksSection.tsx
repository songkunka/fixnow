"use client";

import React from "react";
import Image from "next/image";
import { BRAND_CONFIG, getAssetUrl } from "@/config/branding";

interface HowItWorksSectionProps {
  onOpenBooking: () => void;
}

export default function HowItWorksSection({ onOpenBooking }: HowItWorksSectionProps) {
  const appMockupSrc = getAssetUrl(
    BRAND_CONFIG.assets.appMockup.brand,
    BRAND_CONFIG.assets.appMockup.ref
  );

  const steps = [
    { number: 1, text: "เข้าแอปเลือกบริการ", active: true },
    { number: 2, text: "ค้นหาช่าง", active: false },
    { number: 3, text: "ช่างเดินทางมาซ่อม", active: false },
    { number: 4, text: "ชำระเงิน", active: false },
    { number: 5, text: "รีวิว", active: false },
  ];

  return (
    <section id="about" className="py-10 md:py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Side - Steps Flow */}
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2">
              เรียกช่างฉุกเฉิน{" "}
              <span className="text-orange-600">FixNow</span>
            </h2>

            <div className="mt-6 md:mt-8 space-y-0 relative">
              {/* Vertical Line */}
              <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-slate-300" />

              {steps.map((step, idx) => (
                <div key={step.number} className="relative flex items-center gap-3 sm:gap-4 py-2.5 sm:py-3">
                  {/* Step Number Circle */}
                  <div
                    className={`relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-base sm:text-lg shrink-0 shadow-md ${
                      step.active
                        ? "bg-orange-500 text-white"
                        : "bg-white text-slate-400 border border-slate-300"
                    }`}
                  >
                    {step.number}
                  </div>

                  {/* Step Text */}
                  <div
                    className={`flex-1 py-3 px-4 sm:py-4 sm:px-6 rounded-xl sm:rounded-2xl text-sm sm:text-base md:text-lg font-semibold ${
                      step.active
                        ? "bg-orange-500 text-white shadow-lg"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {step.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Phone Mockup */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-[220px] h-[440px] md:w-[320px] md:h-[640px]">
              <Image
                src={appMockupSrc}
                alt="FixNow App Flow"
                fill
                sizes="(max-width: 768px) 220px, 320px"
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
