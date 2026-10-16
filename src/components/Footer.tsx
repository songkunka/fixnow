"use client";

import React from "react";
import Image from "next/image";
import { PhoneCall, Mail, MapPin } from "lucide-react";
import { BRAND_CONFIG, getAssetUrl } from "@/config/branding";

interface FooterProps {
  onOpenBooking: (category?: string) => void;
  onOpenPartner: () => void;
}

export default function Footer({ onOpenBooking, onOpenPartner }: FooterProps) {
  const logoFooterSrc = getAssetUrl(
    BRAND_CONFIG.assets.logoFooter.brand,
    BRAND_CONFIG.assets.logoFooter.ref
  );

  return (
    <footer id="contact" className="bg-[#17191C] text-slate-300 pt-16 pb-24 sm:pb-12 border-t border-[#2D3339]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-[#2D3339]">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="relative h-11 w-44">
              <Image
                src={logoFooterSrc}
                alt={BRAND_CONFIG.assets.logoFooter.alt}
                fill
                sizes="176px"
                className="object-contain object-left"
              />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {BRAND_CONFIG.tagline}
            </p>

            <div className="space-y-2 text-xs">
              <a
                href={`tel:${BRAND_CONFIG.hotline.replace(/-/g, "")}`}
                className="flex items-center gap-2 text-orange-400 hover:underline"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>สายด่วนฉุกเฉิน: {BRAND_CONFIG.hotlineDisplay}</span>
              </a>
              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="w-3.5 h-3.5" />
                <span>{BRAND_CONFIG.supportEmail}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>{BRAND_CONFIG.coverage}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Emergency Services */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 border-l-2 border-orange-500 pl-2">
              บริการช่วยเหลือฉุกเฉิน
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onOpenBooking("repair")}
                  className="hover:text-orange-400 transition"
                >
                  • ช่างซ่อมรถยนต์นอกสถานที่ 24 ชม.
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenBooking("battery")}
                  className="hover:text-orange-400 transition"
                >
                  • พ่วงแบตเตอรี่ / เปลี่ยนแบตเตอรี่ถึงที่
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenBooking("tire")}
                  className="hover:text-orange-400 transition"
                >
                  • ช่างปะยาง / เปลี่ยนยางฉุกเฉิน
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenBooking("slide_car")}
                  className="hover:text-orange-400 transition"
                >
                  • รถสไลด์ & รถยก ทั่วไทย
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenBooking("key")}
                  className="hover:text-orange-400 transition"
                >
                  • ช่างเปิดกุญแจรถยนต์
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenBooking("volunteer_car")}
                  className="text-orange-400 hover:underline font-semibold"
                >
                  • 🤝 ช่างอาสาช่วยน้ำท่วม (ฟรี)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Partner & Company */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 border-l-2 border-orange-500 pl-2">
              สำหรับช่างและอู่
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={onOpenPartner}
                  className="text-orange-400 hover:underline font-semibold"
                >
                  • สมัครเป็นช่าง FixNow (พาร์ทเนอร์)
                </button>
              </li>
              <li><span>• ขั้นตอนการตรวจสอบเอกสาร (KYC)</span></li>
              <li><span>• สิทธิประโยชน์ช่างเครือข่าย</span></li>
              <li><span>• มาตรฐานอุปกรณ์และระเบียบปฏิบัติ</span></li>
              <li><span>• ศูนย์ประสานงานส่วนกลาง</span></li>
            </ul>
          </div>

          {/* Column 4: Social & Download */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 border-l-2 border-orange-500 pl-2">
              ติดตามเรา
            </h4>
            <div className="flex items-center gap-3 mb-6">
              <a href={BRAND_CONFIG.facebookUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-700 hover:bg-blue-600 flex items-center justify-center transition">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href={BRAND_CONFIG.lineUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#06C755] hover:bg-[#05b34c] flex items-center justify-center transition">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                </svg>
              </a>
              <a href={BRAND_CONFIG.tiktokUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
              <a href={BRAND_CONFIG.youtubeUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-700 hover:bg-red-600 flex items-center justify-center transition">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
                  <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#1a1a2e"/>
                </svg>
              </a>
            </div>

            <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-[11px] text-slate-400">
              🛡️ ช่างทุกคนผ่านการตรวจสอบตัวตน ทะเบียนพาณิชย์ และประวัติวิชาชีพก่อนเปิดระบบรับงาน
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 {BRAND_CONFIG.legalName}. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>นโยบายความเป็นส่วนตัว</span>
            <span>•</span>
            <span>ข้อกำหนดการใช้บริการ</span>
            <span>•</span>
            <span className="text-slate-400">FixNow Platform 24/7</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
