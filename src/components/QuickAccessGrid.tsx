"use client";

import React from "react";
import Image from "next/image";

interface QuickAccessGridProps {
  onOpenBooking: (category?: string) => void;
}

export default function QuickAccessGrid({ onOpenBooking }: QuickAccessGridProps) {
  const cards = [
    {
      id: "repair",
      title: "ช่างซ่อมเครื่องยนต์",
      subtitle: "สตาร์ทไม่ติด เครื่องดับ ระบบไฟ",
      badge: "HOT",
      badgeColor: "bg-[#FF5A18] text-white",
      iconSvg: "/assets/brand/icons/engine.svg",
      categoryId: "repair",
    },
    {
      id: "battery",
      title: "ช่างแบตเตอรี่",
      subtitle: "พ่วงแบตเตอรี่ เปลี่ยนแบตถึงที่",
      badge: "HOT",
      badgeColor: "bg-[#FF5A18] text-white",
      iconSvg: "/assets/brand/icons/battery.svg",
      categoryId: "battery",
    },
    {
      id: "tire",
      title: "ช่างปะยาง / เปลี่ยนยาง",
      subtitle: "ปะไหม สตรีม สลับยางอะไหล่",
      iconSvg: "/assets/brand/icons/tire.svg",
      categoryId: "tire",
    },
    {
      id: "towing",
      title: "รถสไลด์ / รถยก 24 ชม.",
      subtitle: "เคลื่อนย้ายรถฉุกเฉิน ทั่วไทย",
      badge: "24 ชม.",
      badgeColor: "bg-[#17191C] text-white",
      iconSvg: "/assets/brand/icons/tow-truck.svg",
      categoryId: "slide_car",
    },
    {
      id: "location",
      title: "ค้นหาช่างใกล้ฉัน",
      subtitle: "จับคู่ช่างที่ใกล้ที่สุดผ่าน GPS",
      badge: "GPS",
      badgeColor: "bg-emerald-600 text-white",
      iconSvg: "/assets/brand/icons/location.svg",
      categoryId: "repair",
    },
    {
      id: "volunteer",
      title: "ช่างอาสาช่วยน้ำท่วม",
      subtitle: "ซ่อมฟรี ไม่มีค่าแรง เพื่อพี่น้องคนไทย",
      badge: "ฟรี",
      badgeColor: "bg-red-500 text-white",
      iconSvg: "/assets/brand/icons/safety.svg",
      categoryId: "volunteer_car",
    },
  ];

  return (
    <section className="py-8 px-4 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-[#17191C] flex items-center gap-2">
            <span>บริการด่วนฉุกเฉิน</span>
            <span className="text-xs bg-orange-100 text-[#FF5A18] font-bold px-2.5 py-0.5 rounded-full">
              Quick Services
            </span>
          </h2>
          <p className="text-xs md:text-sm text-[#6E747B] mt-0.5">
            เลือกบริการที่ต้องการ ช่าง FixNow พร้อมเดินทางถึงจุดเกิดเหตุภายใน 30 นาที
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {cards.map((card) => {
          return (
            <button
              key={card.id}
              onClick={() => onOpenBooking(card.categoryId)}
              className="group relative flex flex-col items-center text-center p-4 rounded-2xl bg-white border border-[#DDE1E4] hover:border-[#FF5A18] shadow-sm hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 active:scale-[0.98]"
            >
              {card.badge && (
                <span
                  className={`absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${card.badgeColor}`}
                >
                  {card.badge}
                </span>
              )}

              {/* Brand CI Squircle with Orange Outline Ring */}
              <div className="relative w-16 h-16 rounded-2xl bg-[#F4F2ED] border-2 border-[#FF5A18]/20 group-hover:border-[#FF5A18] p-3 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                <div className="relative w-10 h-10">
                  <Image
                    src={card.iconSvg}
                    alt={card.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="font-bold text-[#17191C] text-sm group-hover:text-[#FF5A18] transition line-clamp-1">
                {card.title}
              </div>
              <div className="text-[11px] text-[#6E747B] line-clamp-1 mt-0.5">
                {card.subtitle}
              </div>

              <div className="mt-2 text-[11px] font-bold text-[#FF5A18] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span>เรียกช่าง</span>
                <span>→</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
