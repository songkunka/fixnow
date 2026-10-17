"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Wrench } from "lucide-react";
import { BRAND_CONFIG, getAssetUrl } from "@/config/branding";

interface HeroBannerProps {
  onOpenBooking: (category?: string) => void;
}

export default function HeroBanner({ onOpenBooking }: HeroBannerProps) {
  const banners = BRAND_CONFIG.assets.heroBanners;
  const isMulti = banners.length > 1;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play timer (เปิดทำงานเฉพาะเมื่อมีมากกว่า 1 แบนเนอร์)
  useEffect(() => {
    if (!isMulti) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length, isMulti]);

  const prevSlide = () => {
    if (!isMulti) return;
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const nextSlide = () => {
    if (!isMulti) return;
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const currentBanner = banners[currentIndex] || banners[0];
  const bannerImgSrc = getAssetUrl(currentBanner.brandImage, currentBanner.refImage);

  return (
    <section className="relative w-full bg-[#08090B] overflow-hidden">
      {/* 
        Responsive 16:9 Banner Container 
        - สัดส่วน 16:9 เท่ากับขนาดภาพ 1024x576 px พอดี
        - บนมือถือ (width 390px) ความสูงจะเป็น ~219px แสดงผลครบทุกขอบ ไม่โดนตัดตัวหนังสือหรือมาสคอต
        - บนจอใหญ่ Max Width 1280px (7xl) พร้อมพื้นหลังดำเนียนกลมกลืนกับรูป
      */}
      <div className="relative w-full max-w-7xl mx-auto aspect-[16/9] overflow-hidden flex items-center justify-center">
        {/* Banner Image */}
        <div className="relative w-full h-full">
          <Image
            src={bannerImgSrc}
            alt={currentBanner.title}
            fill
            sizes="(max-width: 768px) 100vw, 1280px"
            className="object-contain sm:object-cover object-center transition-all duration-700"
            priority={currentIndex === 0}
          />
        </div>

        {/* Carousel Navigation Arrows (แสดงเฉพาะเมื่อมีมากกว่า 1 แบนเนอร์) */}
        {isMulti && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/50 hover:bg-black/80 text-white shadow-xl flex items-center justify-center transition active:scale-95 border border-white/20"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/50 hover:bg-black/80 text-white shadow-xl flex items-center justify-center transition active:scale-95 border border-white/20"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Carousel Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
              {banners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? "w-8 bg-orange-500 shadow-md"
                      : "w-2.5 bg-white/50 hover:bg-white"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Emergency CTA Button (Action Orange) */}
      <div className="flex justify-center -mt-4 sm:-mt-6 relative z-30 pb-6 sm:pb-8">
        <button
          onClick={() => onOpenBooking()}
          className="animate-sheen bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold text-base sm:text-lg md:text-xl px-7 sm:px-10 py-3.5 sm:py-4 rounded-2xl shadow-[0_12px_28px_-6px_rgba(255,90,24,0.45),0_6px_12px_-4px_rgba(255,90,24,0.25)] active:scale-[0.97] focus-visible:ring-4 focus-visible:ring-orange-400/50 transition-all duration-150 flex items-center gap-2.5 sm:gap-3 group"
        >
          <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:rotate-12 group-hover:scale-110 transition-transform duration-200" />
          <span>เรียกช่างฉุกเฉิน!</span>
        </button>
      </div>
    </section>
  );
}
