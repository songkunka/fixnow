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
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center shadow-xl transition active:scale-95 -ml-2"
            aria-label="Previous service"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center shadow-xl transition active:scale-95 -mr-2"
            aria-label="Next service"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scrollable Cards Container */}
          <div
            ref={scrollContainerRef}
            className="flex items-stretch gap-6 overflow-x-auto pb-4 pt-2 hide-scrollbar snap-x snap-mandatory px-8"
          >
            {services.map((svc: ServiceCardItem) => {
              const imgSrc = getAssetUrl(svc.brandImage, svc.refImage);

              return (
                <div
                  key={svc.id}
                  onClick={() => onOpenBooking(svc.id)}
                  className="snap-start shrink-0 w-[260px] sm:w-[280px] md:w-[300px] flex flex-col items-center cursor-pointer group"
                >
                  {/* 3D Image Card - matching 24carfix rounded card style */}
                  <div className="relative w-full aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl overflow-hidden flex items-center justify-center shadow-md group-hover:shadow-xl transition-all duration-300 mb-4">
                    <Image
                      src={imgSrc}
                      alt={svc.nameTh}
                      fill
                      sizes="(max-width: 768px) 260px, 300px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 p-3 rounded-3xl"
                    />
                  </div>

                  {/* Service Name */}
                  <h3 className="text-base md:text-lg font-bold text-slate-800 group-hover:text-orange-600 transition text-center">
                    {svc.nameTh}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
