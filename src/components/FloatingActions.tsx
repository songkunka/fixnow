"use client";

import React from "react";
import Image from "next/image";
import { PhoneCall, MessageCircle } from "lucide-react";
import { BRAND_CONFIG } from "@/config/branding";

interface FloatingActionsProps {
  onOpenBooking: () => void;
}

export default function FloatingActions({ onOpenBooking }: FloatingActionsProps) {
  return (
    <>
      {/* Desktop Floating Action Stack (Bottom Right) - matching 24carfix style */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col items-end gap-3">
        {/* FixNow Mascot / Emergency Booking */}
        <button
          onClick={onOpenBooking}
          className="group relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF5A18] to-[#C83D0A] hover:scale-105 text-white flex items-center justify-center shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 active:scale-95 border-2 border-white"
          aria-label="เรียกช่างฉุกเฉิน 24 ชม."
        >
          <div className="relative w-12 h-12">
            <Image
              src="/assets/brand/mascots/mascot_friendly.png"
              alt="FixNow Mascot"
              fill
              className="object-contain"
            />
          </div>
          <span className="absolute -top-1 -left-2 bg-[#17191C] text-white text-[9px] font-bold px-2 py-0.5 rounded-full border border-white/20 shadow">
            24 ชม.
          </span>
        </button>

        {/* Emergency Call Button */}
        <a
          href={`tel:${BRAND_CONFIG.hotline.replace(/-/g, "")}`}
          className="w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95"
          aria-label="โทรฉุกเฉิน 24 ชม."
        >
          <PhoneCall className="w-7 h-7" />
        </a>

        {/* LINE Chat Button */}
        <a
          href={BRAND_CONFIG.lineUrl}
          target="_blank"
          rel="noreferrer"
          className="w-14 h-14 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95"
          aria-label="ติดต่อทาง LINE"
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
          </svg>
        </a>
      </div>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 px-4 flex items-center gap-2 shadow-2xl">
        <a
          href={`tel:${BRAND_CONFIG.hotline.replace(/-/g, "")}`}
          className="flex-1 bg-slate-900 text-white text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition"
        >
          <PhoneCall className="w-4 h-4 text-amber-400" />
          <span>โทรด่วน 24 ชม.</span>
        </a>

        <button
          onClick={onOpenBooking}
          className="flex-[1.5] bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-extrabold py-3 rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/30 active:scale-95 transition"
        >
          <span>🔧 เรียกช่างทันที!</span>
        </button>

        <a
          href={BRAND_CONFIG.lineUrl}
          target="_blank"
          rel="noreferrer"
          className="w-11 h-11 bg-[#06C755] text-white rounded-xl flex items-center justify-center shrink-0 active:scale-95 transition"
          aria-label="LINE"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
      </div>
    </>
  );
}
