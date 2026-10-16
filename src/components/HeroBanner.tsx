"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BRAND_CONFIG, getAssetUrl } from "@/config/branding";

interface HeroBannerProps {
  onOpenBooking: (category?: string) => void;
}

export default function HeroBanner({ onOpenBooking }: HeroBannerProps) {
  const banners = BRAND_CONFIG.assets.heroBanners;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const currentBanner = banners[currentIndex];
  const bannerImgSrc = getAssetUrl(currentBanner.brandImage, currentBanner.refImage);

  return (
    <section className="relative w-full bg-slate-100 overflow-hidden">
      {/* Banner Carousel Container */}
      <div className="relative w-full h-[380px] sm:h-[460px] md:h-[540px] lg:h-[580px] xl:h-[620px]">
        {/* Banner Image */}
        <div className="absolute inset-0">
          <Image
            src={bannerImgSrc}
            alt={currentBanner.title}
            fill
            sizes="100vw"
            className="object-cover object-center transition-all duration-700"
            priority={currentIndex === 0}
          />
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white text-slate-900 shadow-xl flex items-center justify-center transition active:scale-95"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white text-slate-900 shadow-xl flex items-center justify-center transition active:scale-95"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-3 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? "w-10 bg-orange-500 shadow-md"
                  : "w-3 bg-white/60 hover:bg-white"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Emergency CTA Button with FixNow Mascot */}
      <div className="flex justify-center items-center gap-4 -mt-8 relative z-30 pb-6 px-4">
        <button
          onClick={() => onOpenBooking()}
          className="bg-gradient-to-r from-[#FF5A18] to-[#C83D0A] hover:from-[#C83D0A] hover:to-[#FF5A18] text-white font-extrabold text-lg md:text-xl px-8 sm:px-12 py-4 rounded-2xl shadow-2xl shadow-orange-500/40 active:scale-95 transition flex items-center gap-3 border border-orange-400/30"
        >
          <div className="relative w-8 h-8 shrink-0">
            <Image
              src="/assets/brand/mascots/mascot_ready.png"
              alt="ช่าง FixNow พร้อมซ่อม"
              fill
              className="object-contain"
            />
          </div>
          <span>เรียกช่างฉุกเฉิน 24 ชม.!</span>
        </button>
      </div>
    </section>
  );
}
