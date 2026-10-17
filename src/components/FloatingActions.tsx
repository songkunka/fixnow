"use client";

import React from "react";
import Link from "next/link";
import { Wrench, MessageCircle, Headphones, Phone } from "lucide-react";
import { BRAND_CONFIG } from "@/config/branding";

interface FloatingActionsProps {
  onOpenBooking: () => void;
}

export default function FloatingActions({ onOpenBooking }: FloatingActionsProps) {
  return (
    <>
      {/* Desktop Floating Action Stack (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col items-end gap-3">
        {/* Primary Action: Book Mechanic Online */}
        <Link
          href="/booking"
          className="group flex items-center gap-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-sm py-3.5 px-5 rounded-full shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
          aria-label="เรียกช่างฉุกเฉินออนไลน์"
        >
          <Wrench className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
          <span>เรียกช่างด่วน 24 ชม.</span>
        </Link>

        {/* Secondary Action: LINE Customer Support */}
        <a
          href={BRAND_CONFIG.lineUrl}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2 bg-white/95 backdrop-blur-md border border-slate-200 text-slate-700 hover:text-emerald-600 hover:border-emerald-300 py-2.5 px-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 active:scale-95 text-xs font-semibold"
          aria-label="ติดต่อฝ่ายบริการลูกค้า"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>ฝ่ายบริการลูกค้า (LINE)</span>
        </a>
      </div>
    </>
  );
}
