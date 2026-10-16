"use client";

import React from "react";
import Image from "next/image";
import { MapPin, CheckCircle2, Star } from "lucide-react";

interface MechanicPortfolioSectionProps {
  onOpenMechanicProfile: () => void;
}

export default function MechanicPortfolioSection({
  onOpenMechanicProfile,
}: MechanicPortfolioSectionProps) {
  const mechanics = [
    {
      id: "kong-01",
      name: "ช่างต้น (FixNow Lead)",
      location: "รัชดา - ลาดพร้าว, กทม.",
      avatar: "/assets/brand/mascots/mascot_pro.png",
      rating: "4.98",
      cases: "450+ เคส",
      tag: "เชี่ยวชาญเครื่องยนต์",
    },
    {
      id: "kong-02",
      name: "หน่วยเคลื่อนที่เร็ว",
      location: "บางนา - ศรีนครินทร์",
      avatar: "/assets/brand/mascots/mascot_ready.png",
      rating: "5.0",
      cases: "320+ เคส",
      tag: "แบตเตอรี่ & ปะยาง",
    },
    {
      id: "kong-03",
      name: "ช่างบริการฉุกเฉิน 24 ชม.",
      location: "สาทร - พระราม 3",
      avatar: "/assets/brand/mascots/mascot_friendly.png",
      rating: "4.95",
      cases: "280+ เคส",
      tag: "ระบบไฟ & ไดนาโม",
    },
    {
      id: "kong-04",
      name: "ทีมรถสไลด์ FixNow",
      location: "ทั่วกรุงเทพฯ & ปริมณฑล",
      avatar: "/assets/brand/banners/banner_van.png",
      rating: "4.99",
      cases: "500+ เคส",
      tag: "รถยก / รถสไลด์",
    },
    {
      id: "kong-05",
      name: "ช่างอาสา FixNow",
      location: "ครอบคลุม 77 จังหวัด",
      avatar: "/assets/brand/uniform_polo.png",
      rating: "5.0",
      cases: "180+ เคส",
      tag: "กู้ภัย & ช่วยน้ำท่วม",
    },
  ];

  return (
    <section id="mechanics" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-block text-xs font-bold text-[#FF5A18] bg-orange-100 px-3 py-1 rounded-full mb-2">
            VERIFIED PARTNERS
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#17191C] mb-2">
            เครือข่ายช่าง <span className="text-[#FF5A18]">FixNow ผ่านการยืนยันตัวตน</span>
          </h2>
          <p className="text-sm md:text-base text-[#6E747B]">
            ช่างมืออาชีพที่ผ่านการตรวจสอบประวัติอาชญากรรม (KYC) และทดสอบฝีมือก่อนรับงานจริง
          </p>
        </div>

        {/* Mechanic Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {mechanics.map((mech) => (
            <div
              key={mech.id}
              onClick={onOpenMechanicProfile}
              className="group cursor-pointer flex flex-col bg-[#F4F2ED]/60 rounded-2xl border border-[#DDE1E4] hover:border-[#FF5A18] p-3.5 shadow-sm hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300"
            >
              {/* Card Image */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-white mb-3 shadow-inner flex items-center justify-center p-2">
                <Image
                  src={mech.avatar}
                  alt={mech.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 20vw"
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 right-2 text-[10px] bg-white/90 backdrop-blur-sm text-[#FF5A18] font-bold px-2 py-0.5 rounded-full border border-orange-200">
                  {mech.tag}
                </span>
              </div>

              {/* Mechanic Details */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-1.5 mb-1">
                  <h3 className="font-bold text-sm text-[#17191C] group-hover:text-[#FF5A18] transition line-clamp-1">
                    {mech.name}
                  </h3>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5A18] shrink-0" />
                </div>

                <div className="flex items-center gap-1 text-[11px] text-[#6E747B] mb-2">
                  <MapPin className="w-3 h-3 text-[#FF5A18] shrink-0" />
                  <span className="line-clamp-1">{mech.location}</span>
                </div>

                <div className="mt-auto pt-2 border-t border-[#DDE1E4] flex items-center justify-between text-[11px]">
                  <span className="font-bold text-amber-600 flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{mech.rating}</span>
                  </span>
                  <span className="text-[#6E747B]">{mech.cases}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
