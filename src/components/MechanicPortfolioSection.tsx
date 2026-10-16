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

        {/* Featured Mechanic Showcase */}
        <div className="max-w-4xl mx-auto bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* Avatar & Badge */}
            <div
              onClick={onOpenMechanicProfile}
              className="relative w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden shrink-0 shadow-md cursor-pointer group"
            >
              <Image
                src={mechanic.avatar}
                alt={mechanic.name}
                fill
                sizes="(max-width: 768px) 144px, 176px"
                className="object-cover object-top group-hover:scale-105 transition duration-300"
              />
              <div className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                Verified ช่างมืออาชีพ
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                <span className="text-xl md:text-2xl font-extrabold text-slate-900">
                  {mechanic.fullName}
                </span>
                <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  ⭐ 4.9/5 (140+ รีวิว)
                </span>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs text-slate-500 mb-3">
                <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                <span>{mechanic.location}</span>
              </div>

              <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-4">
                {mechanic.description}
              </p>

              {/* Work gallery preview */}
              <div className="flex items-center justify-center md:justify-start gap-2 mb-5">
                {[mechanic.work1, mechanic.work2, mechanic.work3].map((img, idx) => (
                  <div
                    key={idx}
                    onClick={onOpenMechanicProfile}
                    className="relative w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden border border-slate-200 cursor-pointer hover:border-orange-500 transition"
                  >
                    <Image
                      src={img}
                      alt={`ผลงานช่างก้อง ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={onOpenMechanicProfile}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs md:text-sm px-6 py-2.5 rounded-xl transition shadow-md active:scale-95"
              >
                ดูโปรไฟล์และผลงานทั้งหมด →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
