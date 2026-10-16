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

      {/* Emergency CTA Button (matching 24carfix orange CTA) */}
      <div className="flex justify-center -mt-6 relative z-30 pb-8">
        <button
          onClick={() => onOpenBooking()}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold text-lg md:text-xl px-10 py-4 rounded-2xl shadow-2xl shadow-orange-500/40 active:scale-95 transition flex items-center gap-3"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.049.58.025 1.193-.14 1.743" />
          </svg>
          <span>เรียกช่างฉุกเฉิน!</span>
        </button>
      </div>
    </section>
  );
}
