"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Search,
  PhoneCall,
  UserCheck,
  MapPin,
  AlertCircle,
  FileBadge,
  Sparkles,
  ArrowRight,
  Star,
  CheckCircle2,
} from "lucide-react";
import { BRAND_CONFIG } from "@/config/branding";

interface ZeroMockupMechanicSectionProps {
  onOpenPartner: () => void;
  onOpenBooking: () => void;
  onOpenMechanicProfile?: () => void;
}

export default function ZeroMockupMechanicSection({
  onOpenPartner,
  onOpenBooking,
  onOpenMechanicProfile,
}: ZeroMockupMechanicSectionProps) {
  const [selectedProvince, setSelectedProvince] = useState("กรุงเทพมหานคร");

  const provinces = [
    "กรุงเทพมหานคร",
    "นนทบุรี",
    "ปทุมธานี",
    "สมุทรปราการ",
    "ชลบุรี",
    "ขอนแก่น",
    "เชียงใหม่",
    "นครราชสีมา",
    "สงขลา",
    "ภูเก็ต",
    "ระยอง",
    "พิษณุโลก",
  ];

  return (
    <section id="coverage" className="py-14 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full border border-blue-200 mb-3">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>เครือข่ายช่างมืออาชีพที่ผ่านการตรวจสอบ 100%</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            ระบบจับคู่ช่างซ่อมและอู่ใกล้เคียง (Verified Dispatch)
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            FixNow ปฏิบัติตามมาตรฐานความปลอดภัยสูงสุด ช่างทุกคนบนระบบต้องผ่านการตรวจสอบตัวตน (KYC) และประวัติวิชาชีพก่อนรับงานจริง
          </p>
        </div>

        {/* Realtime Matching Status Box */}
        <div className="glass-card rounded-3xl p-6 md:p-8 max-w-4xl mx-auto shadow-xl">
          {/* Province Selector Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 w-full sm:w-auto">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span>เลือกจังหวัดของคุณเพื่อตรวจสอบช่างสแตนด์บาย:</span>
            </div>

            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
            >
              {provinces.map((prov) => (
                <option key={prov} value={prov}>
                  📍 {prov}
                </option>
              ))}
            </select>
          </div>

          {/* Dynamic Radar Matching Display */}
          <div className="py-6 flex flex-col items-center text-center">
            {/* Pulsing Radar Visual */}
            <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-pulse-ring" />
              <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 z-10">
                <Search className="w-7 h-7 animate-pulse" />
              </div>
            </div>

            <h3 className="text-base md:text-lg font-bold text-slate-900 mb-1">
              ระบบกำลังค้นหาช่างประจำการในพื้นที่ {selectedProvince}
            </h3>
            <p className="text-xs text-slate-500 max-w-lg mb-6 leading-relaxed">
              FixNow เชื่อมโยงระบบกับช่างที่เปิดสวิตช์พร้อมวิ่งงานจริงผ่าน GPS เมื่อคุณกดเรียกช่าง ระบบจะกระจายคำขอไปยังช่างและอู่ที่ใกล้ที่สุดทันที
            </p>

            {/* Verified Mechanic Showcase Card (FixNow Certified Mechanic) */}
            <div className="w-full max-w-xl bg-gradient-to-r from-orange-50/50 via-white to-orange-50/30 border border-[#FF5A18]/30 rounded-2xl p-4 sm:p-5 text-left mb-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#17191C] uppercase tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF5A18]" />
                  <span>ตัวอย่างโปรไฟล์ช่างที่ผ่านการยืนยันตัวตน (FixNow Certified Showcase)</span>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded-full">
                  ● สแตนด์บาย 24 ชม.
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-[#F4F2ED] border-2 border-[#FF5A18] shrink-0 shadow-md">
                  <Image
                    src="/assets/brand/mascots/mascot_pro.png"
                    alt="ช่าง FixNow มืออาชีพ"
                    fill
                    sizes="80px"
                    className="object-contain p-1"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-bold text-[#17191C] text-sm sm:text-base">
                      ช่างต้น (FixNow Mobile Team)
                    </h4>
                    <span className="inline-flex items-center gap-1 text-[10px] bg-orange-100 text-[#FF5A18] font-bold px-2 py-0.5 rounded-md">
                      <CheckCircle2 className="w-3 h-3 text-[#FF5A18]" />
                      <span>KYC ผ่านแล้ว 100%</span>
                    </span>
                  </div>

                  <div className="text-xs text-[#6E747B] mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#FF5A18] shrink-0" />
                    <span>โซนรัชดา - ลาดพร้าว - พระราม 9, กรุงเทพฯ</span>
                  </div>

                  <div className="flex items-center gap-3 mt-2 text-[11px] text-[#6E747B]">
                    <span className="font-bold text-amber-600 flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>4.98 (210 รีวิว)</span>
                    </span>
                    <span>•</span>
                    <span className="font-medium text-[#17191C]">สำเร็จ 450+ เคส</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-bold">ถึงไวใน 20 นาที</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#DDE1E4] flex items-center justify-between">
                <span className="text-[11px] text-[#6E747B]">
                  เชี่ยวชาญ: ซ่อมเครื่องยนต์, รถสตาร์ทไม่ติด, ระบบไฟ, พ่วง/เปลี่ยนแบตเตอรี่
                </span>
                <button
                  type="button"
                  onClick={onOpenMechanicProfile}
                  className="bg-[#FF5A18] hover:bg-[#C83D0A] text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition active:scale-95 flex items-center gap-1 shadow-sm shrink-0"
                >
                  <span>ดูผลงานจริง</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Safety Guarantee Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 max-w-xl text-left flex items-start gap-3 mb-6">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 leading-relaxed">
                <span className="font-bold">นโยบายความโปร่งใส (FixNow Integrity Guarantee):</span>{" "}
                เราไม่แสดงโปรไฟล์ช่างจำลองหรือคะแนนดาวปลอม ช่างที่รับงานทุกคนจะแสดงชื่อ-นามสกุล รูปถ่าย เบอร์โทร และตำแหน่ง GPS จริงบนแผนที่หลังจากการส่งคำขอสำเร็จเท่านั้น
              </div>
            </div>

            {/* Direct Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onOpenBooking}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-lg shadow-blue-600/30 active:scale-95 transition"
              >
                ส่งคำขอเรียกช่างใน {selectedProvince}
              </button>

              <a
                href={`tel:${BRAND_CONFIG.hotline.replace(/-/g, "")}`}
                className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-5 py-3 rounded-xl flex items-center gap-2 active:scale-95 transition"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>โทรติดต่อศูนย์ควบคุม 24 ชม.</span>
              </a>
            </div>
          </div>

          {/* Mechanic Partner Onboarding Invitation Banner */}
          <div className="mt-6 pt-6 border-t border-slate-200 bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 shrink-0">
                <FileBadge className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm md:text-base flex items-center gap-2">
                  <span>คุณเป็นช่างซ่อม เจ้าของอู่ หรือรถสไลด์ใน {selectedProvince}?</span>
                  <span className="text-[10px] bg-amber-500 text-slate-950 font-extrabold px-2 py-0.5 rounded-full">
                    เปิดรับสมัคร
                  </span>
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  เข้าร่วมเป็นเครือข่ายพาร์ทเนอร์ FixNow รับงานฉุกเฉินนอกสถานที่ เพิ่มรายได้ตลอด 24 ชั่วโมง
                </p>
              </div>
            </div>

            <button
              onClick={onOpenPartner}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs md:text-sm px-5 py-2.5 rounded-xl shrink-0 transition active:scale-95 shadow-lg shadow-amber-500/20"
            >
              สมัครเป็นช่าง FixNow (ฟรีค่าแรกเข้า) →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
