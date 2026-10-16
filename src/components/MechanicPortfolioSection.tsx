"use client";

import React from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";

interface MechanicPortfolioSectionProps {
  onOpenMechanicProfile: () => void;
}

export default function MechanicPortfolioSection({
  onOpenMechanicProfile,
}: MechanicPortfolioSectionProps) {
  // Only 1 mechanic as per user request
  const mechanic = {
    name: "ช่างก้อง",
    fullName: "ช่างก้อง ซ่อมนอกสถานที่ กรุงเทพ",
    description:
      "ช่างก้อง ซ่อมนอกสถานที่ กรุงเทพ ให้บริการซ่อมรถฉุกเฉินถึงที่ ไม่ต้องยกรถไป...",
    location: "ย่านรัชดาภิเษก โซนรัชดา กรุงเทพฯ",
    avatar: "/assets/24carfix/mechanic_kong_avatar.jpg",
    work1: "/assets/24carfix/mechanic_kong_work_1.jpg",
    work2: "/assets/24carfix/mechanic_kong_work_2.jpg",
    work3: "/assets/24carfix/mechanic_kong_work_3.jpg",
  };

  return (
    <section id="mechanics" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header - matching 24carfix style */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-orange-600 mb-2">
            ผลงานช่าง ร้านซ่อมรถใกล้ฉัน
          </h2>
          <p className="text-sm md:text-base text-slate-500">
            ช่างที่ผ่านการตรวจสอบและยืนยันตัวตน พร้อมให้บริการนอกสถานที่
          </p>
        </div>

        {/* Mechanic Cards Grid - matching 24carfix card style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {/* Card for ช่างก้อง */}
          <div
            onClick={onOpenMechanicProfile}
            className="group cursor-pointer"
          >
            {/* Card Image */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-md group-hover:shadow-xl transition-all duration-300 mb-3">
              <Image
                src={mechanic.avatar}
                alt={mechanic.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
                className="object-cover object-top"
              />
              {/* Orange Name Badge Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-orange-600/90 to-transparent pt-8 pb-3 px-3">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-white/80" />
                  <span className="text-[11px] text-white/90">{mechanic.location}</span>
                </div>
              </div>
              {/* Name Overlay */}
              <div className="absolute top-3 left-3 right-3">
                <span className="inline-block bg-white/95 backdrop-blur-sm text-orange-600 font-extrabold text-xl px-4 py-1.5 rounded-lg shadow-md">
                  {mechanic.name}
                </span>
              </div>
              {/* Read More Button */}
              <div className="absolute bottom-12 left-3">
                <span className="inline-block bg-orange-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
                  อ่านเพิ่มเติมคลิก
                </span>
              </div>
              {/* FixNow Badge */}
              <div className="absolute top-3 right-3">
                <div className="bg-white rounded-lg p-1 shadow-md">
                  <img
                    src="/assets/24carfix/logo_main.png"
                    alt="FixNow"
                    className="w-12 h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Card Content */}
            <h3 className="font-bold text-slate-800 text-sm md:text-base group-hover:text-orange-600 transition mb-1">
              {mechanic.fullName}
            </h3>
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {mechanic.description}
            </p>
          </div>

          {/* Empty Placeholder Cards - to show more mechanics can be added */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="group">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center mb-3">
                <div className="text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    เปิดรับสมัครช่างเพิ่มเติม
                  </span>
                </div>
              </div>
              <h3 className="font-bold text-slate-400 text-sm mb-1">รอเปิดรับช่างเพิ่มเติม</h3>
              <p className="text-xs text-slate-400">FixNow กำลังขยายเครือข่ายทั่วไทย...</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
