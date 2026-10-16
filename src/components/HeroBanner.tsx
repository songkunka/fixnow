"use client";

import React from "react";
import {
  PhoneCall,
  Wrench,
  ShieldCheck,
  Clock,
  MapPin,
  Star,
  CheckCircle2,
  BatteryCharging,
  Truck,
  Disc,
  Fuel,
  ArrowRight,
  Shield,
  Sparkles,
} from "lucide-react";
import { BRAND_CONFIG } from "@/config/branding";

interface HeroBannerProps {
  onOpenBooking: (category?: string) => void;
}

export default function HeroBanner({ onOpenBooking }: HeroBannerProps) {
  const quickEmergencies = [
    {
      id: "battery",
      label: "แบตเตอรี่หมด / พ่วงแบต",
      icon: BatteryCharging,
      badge: "HOT",
      color: "hover:border-amber-400 hover:bg-amber-50/50",
      iconBg: "bg-amber-100 text-amber-700",
    },
    {
      id: "tire",
      label: "ยางแตก / ยางรั่ว / ปะยาง",
      icon: Disc,
      badge: "ด่วน",
      color: "hover:border-blue-400 hover:bg-blue-50/50",
      iconBg: "bg-blue-100 text-blue-700",
    },
    {
      id: "towing",
      label: "รถยก / รถสไลด์ 24 ชม.",
      icon: Truck,
      badge: "ทั่วไทย",
      color: "hover:border-red-400 hover:bg-red-50/50",
      iconBg: "bg-red-100 text-red-700",
    },
    {
      id: "emergency-fuel",
      label: "น้ำมันหมด / กุญแจติดในรถ",
      icon: Fuel,
      badge: "24 ชม.",
      color: "hover:border-emerald-400 hover:bg-emerald-50/50",
      iconBg: "bg-emerald-100 text-emerald-700",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/40 via-white to-slate-50/60 pt-6 pb-12 sm:pb-16 border-b border-slate-100">
      {/* Background Decorative Grid and Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Value Proposition & Emergency Action (Col 7) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Live Operational Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs sm:text-sm font-semibold shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
              </span>
              <span>🚨 บริการช่วยเหลือรถเสียฉุกเฉิน 24 ชั่วโมง • ครอบคลุม 77 จังหวัด</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-black text-slate-900 tracking-tight leading-[1.15]">
                รถเสีย สตาร์ทไม่ติด ยางแตก?
                <br />
                <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 bg-clip-text text-transparent">
                  ช่าง FixNow พร้อมช่วยเหลือคุณถึงที่
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                แพลตฟอร์มเรียกช่างซ่อมรถนอกสถานที่และรถยกด่วน 24 ชม. ถึงไวเฉลี่ยใน 30 นาที 
                ราคามาตรฐาน ช่างผ่านการตรวจสอบประวัติ แจ้งราคาก่อนเริ่มงาน ไม่มีบวกเพิ่ม
              </p>
            </div>

            {/* Primary Action Buttons (Dual CTAs) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 pt-1">
              {/* Emergency Dispatch Button */}
              <button
                onClick={() => onOpenBooking()}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-extrabold text-lg shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:from-orange-600 hover:to-orange-700 active:scale-[0.98] transition-all duration-200"
              >
                <Wrench className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
                <span>เรียกช่างฉุกเฉินด่วน!</span>
                <ArrowRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Direct Hotline Call Button */}
              <a
                href={`tel:${BRAND_CONFIG.hotline.replace(/-/g, "")}`}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-white border-2 border-orange-500 text-orange-600 font-bold text-lg hover:bg-orange-50/70 shadow-sm active:scale-[0.98] transition-all duration-200"
              >
                <PhoneCall className="w-5 h-5 text-orange-600 animate-pulse" />
                <span>โทรสายด่วน {BRAND_CONFIG.hotlineDisplay}</span>
              </a>
            </div>

            {/* Quick Emergency Category Pills */}
            <div className="pt-2">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                เลือกปัญหาที่พบบ่อย (ส่งช่างตรงอาการทันที):
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {quickEmergencies.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onOpenBooking(item.id)}
                      className={`flex flex-col items-center sm:items-start p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-left transition-all duration-200 ${item.color} group hover:shadow-md hover:-translate-y-0.5`}
                    >
                      <div className="flex items-center justify-between w-full mb-1.5">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.iconBg}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-orange-500 group-hover:text-white transition">
                          {item.badge}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-orange-600 transition">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Trust Proof Badges */}
            <div className="pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-orange-500" />
                <span>ช่างถึงไวเฉลี่ย <strong>30 นาที</strong></span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>คะแนนความพึงพอใจ <strong>4.9/5</strong> (15,000+ เคส)</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>รับประกันราคามาตรฐาน <strong>แจ้งก่อนซ่อม</strong></span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Dispatch Simulation Card (Col 5) */}
          <div className="lg:col-span-5 relative">
            {/* Visual Dispatch Card */}
            <div className="relative mx-auto max-w-md lg:max-w-none bg-white rounded-3xl p-6 shadow-2xl shadow-slate-200/80 border border-slate-200/90 overflow-hidden">
              
              {/* Card Header: Live Dispatch Radar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <div>
                    <div className="text-xs font-bold text-slate-900">ระบบจับคู่ช่างอัตโนมัติ</div>
                    <div className="text-[11px] text-slate-500">ค้นหาช่างที่ใกล้ตำแหน่งคุณที่สุด</div>
                  </div>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  ออนไลน์ 24 ชม.
                </span>
              </div>

              {/* Map/Route Graphic Mockup */}
              <div className="relative h-44 rounded-2xl bg-gradient-to-br from-slate-100 via-orange-50/30 to-slate-200 border border-slate-200 p-4 overflow-hidden mb-4 flex flex-col justify-between">
                {/* Background Roads Simulation */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 0 40 Q 150 120 400 60" stroke="#475569" strokeWidth="12" fill="none" strokeDasharray="6 6" />
                    <path d="M 50 180 Q 200 40 380 150" stroke="#94a3b8" strokeWidth="8" fill="none" />
                  </svg>
                </div>

                {/* Top Location Pill */}
                <div className="relative z-10 self-start inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur shadow-sm text-xs font-semibold text-slate-800 border border-slate-200">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  <span>ตำแหน่งปัจจุบันของคุณ</span>
                </div>

                {/* Live Distance Estimate Pill */}
                <div className="relative z-10 self-end inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-[#17191C] text-white shadow-lg text-xs font-bold">
                  <div className="w-2 h-2 rounded-full bg-orange-400 animate-ping"></div>
                  <span>ช่างอยู่ห่าง 2.4 กม. • ถึงใน ~18 นาที</span>
                </div>
              </div>

              {/* Assigned Technician Profile Preview */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white font-extrabold flex items-center justify-center text-lg shadow-md shrink-0">
                    กภ
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900 text-sm truncate">ช่างก้องภพ (ช่างประจำพื้นที่)</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    </div>
                    <p className="text-xs text-slate-500">เชี่ยวชาญเครื่องยนต์, แบตเตอรี่, ยาง • ประสบการณ์ 12 ปี</p>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 mt-1">
                      <span className="flex items-center text-amber-600 font-bold">
                        ★ 4.9
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500">ผ่านงาน 420+ เคส</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security & Verification Shield */}
              <div className="flex items-center justify-between text-xs text-slate-500 px-1 mb-4">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Shield className="w-4 h-4 text-orange-600" />
                  <span>ตรวจประวัติอาชญากรรม & ใบอนุญาตช่าง</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ตรวจสอบแล้ว</span>
                </div>
              </div>

              {/* CTA inside Card */}
              <button
                onClick={() => onOpenBooking()}
                className="w-full py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm text-center shadow-lg shadow-orange-500/25 transition active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>กดระบุพิกัดเพื่อประเมินเวลาช่าง</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

