"use client";

import React from "react";
import { Mail, PhoneCall, ShieldCheck, Clock } from "lucide-react";
import { BRAND_CONFIG } from "@/config/branding";

export default function TopContactBar() {
  return (
    <header className="hidden md:block bg-[#17191C] text-slate-300 border-b border-slate-800 text-xs py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Side: Live Emergency Status & Service Guarantee */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700/60">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-400">แพลตฟอร์มช่วยเหลือรถเสียฉุกเฉิน 24 ชม.</span>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-orange-500" />
              ช่างถึงไวเฉลี่ยใน 30 นาที
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
              ครอบคลุม 77 จังหวัด ทั่วไทย
            </span>
          </div>
        </div>

        {/* Right Side: Quick Contact & Direct Channels */}
        <div className="flex items-center gap-4 text-xs">
          {/* Email */}
          <a
            href={`mailto:${BRAND_CONFIG.supportEmail}`}
            className="flex items-center gap-1.5 text-slate-300 hover:text-orange-400 transition"
            title="อีเมลติดต่อฝ่ายบริการ"
          >
            <Mail className="w-3.5 h-3.5 text-orange-400" />
            <span className="hidden xl:inline">{BRAND_CONFIG.supportEmail}</span>
            <span className="xl:hidden">อีเมล</span>
          </a>

          <span className="text-slate-700">|</span>

          {/* LINE Official */}
          <a
            href={BRAND_CONFIG.lineUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-slate-300 hover:text-green-400 transition"
            title="LINE Official 24 ชม."
          >
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span>LINE: <strong className="text-white font-medium">{BRAND_CONFIG.lineId}</strong></span>
          </a>

          <span className="text-slate-700">|</span>

          {/* Facebook */}
          <a
            href={BRAND_CONFIG.facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="text-slate-300 hover:text-blue-400 transition"
            title="Facebook Fanpage"
          >
            <span>Facebook</span>
          </a>

          <span className="text-slate-700">|</span>

          {/* Customer Support Quick Link */}
          <a
            href={`tel:${BRAND_CONFIG.hotline.replace(/-/g, "")}`}
            className="flex items-center gap-1.5 text-slate-300 hover:text-orange-400 transition"
            title="ติดต่อฝ่ายบริการลูกค้า"
          >
            <PhoneCall className="w-3.5 h-3.5 text-slate-400" />
            <span>ฝ่ายบริการลูกค้า: {BRAND_CONFIG.hotlineDisplay}</span>
          </a>
        </div>
      </div>
    </header>
  );
}

