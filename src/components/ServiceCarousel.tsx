"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BRAND_CONFIG, getAssetUrl, ServiceCardItem } from "@/config/branding";

interface ServiceCarouselProps {
  onOpenBooking: (serviceId?: string) => void;
}

export default function ServiceCarousel({ onOpenBooking }: ServiceCarouselProps) {
  const services = BRAND_CONFIG.assets.services;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header - matching 24carfix orange title style */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-orange-600 mb-2">
            บริการของเรา ร้านซ่อมรถใกล้ฉัน
          </h2>
          <p className="text-sm md:text-base text-slate-500">
            เลือกบริการงานซ่อมที่คุณตามหา
          </p>
        </div>

        {/* Carousel with Navigation */}
        <div className="relative">
          {/* Left Arrow (Desktop Only) */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/95 hover:bg-white text-slate-700 items-center justify-center shadow-xl transition active:scale-95 -ml-3"
            aria-label="Previous service"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow (Desktop Only) */}
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/95 hover:bg-white text-slate-700 items-center justify-center shadow-xl transition active:scale-95 -mr-3"
            aria-label="Next service"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scrollable Cards Container */}
          <div
            ref={scrollContainerRef}
            className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto pb-4 pt-2 hide-scrollbar snap-x snap-mandatory px-4 sm:px-8 touch-pan-x"
          >
            {services.map((svc: ServiceCardItem) => {
              const imgSrc = getAssetUrl(svc.brandImage, svc.refImage);

              return (
                <div
                  key={svc.id}
                  onClick={() => onOpenBooking(svc.id)}
                  className="snap-start shrink-0 w-[220px] sm:w-[260px] md:w-[280px] flex flex-col items-center cursor-pointer group"
                >
                  {/* 3D Image Card - matching 24carfix rounded card style */}
                  <div className="relative w-full aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl overflow-hidden flex items-center justify-center shadow-md group-hover:shadow-xl transition-all duration-300 mb-3 border border-slate-100">
                    <Image
                      src={imgSrc}
                      alt={svc.nameTh}
                      fill
                      sizes="(max-width: 768px) 220px, 280px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 p-2 sm:p-3 rounded-3xl"
                    />
                    {svc.badge && (
                      <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500 text-white shadow-sm">
                        {svc.badge}
                      </span>
                    )}
                  </div>

                  {/* Service Name */}
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-slate-800 group-hover:text-orange-600 transition text-center line-clamp-1">
                    {svc.nameTh}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 text-center line-clamp-1">
                    {svc.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Mobile Swipe Cue */}
          <div className="md:hidden flex items-center justify-center gap-1.5 mt-3 text-xs text-slate-600 font-medium">
            <span>👈 ปัดซ้าย-ขวา เพื่อดูบริการทั้งหมด 👉</span>
          </div>
        </div>
      </div>
    </section>
  );
}
