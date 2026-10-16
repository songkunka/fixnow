"use client";

import React from "react";
import { Wrench, Truck, Bike, BatteryCharging, Disc, HeartHandshake } from "lucide-react";

interface QuickAccessGridProps {
  onOpenBooking: (category?: string) => void;
}

export default function QuickAccessGrid({ onOpenBooking }: QuickAccessGridProps) {
  const cards = [
    {
      id: "repair",
      title: "เรียกช่างฉุกเฉิน",
      subtitle: "ซ่อมรถยนต์นอกสถานที่ 24 ชม.",
      badge: "แนะนำ",
      badgeColor: "bg-amber-500 text-white",
      icon: Wrench,
      iconBg: "bg-amber-50 text-amber-600 border-amber-200",
      categoryId: "repair",
    },
    {
      id: "towing",
      title: "รถสไลด์ / รถยก",
      subtitle: "บริการเคลื่อนย้ายปลอดภัยทั่วไทย",
      badge: "24 ชม.",
      badgeColor: "bg-blue-600 text-white",
      icon: Truck,
      iconBg: "bg-blue-50 text-blue-600 border-blue-200",
      categoryId: "slide_car",
    },
    {
      id: "battery",
      title: "ช่างแบตเตอรี่",
      subtitle: "พ่วงแบต / เปลี่ยนแบตเตอรี่ถึงที่",
      badge: "ยอดนิยม",
      badgeColor: "bg-emerald-600 text-white",
      icon: BatteryCharging,
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
      categoryId: "battery",
    },
    {
      id: "tire",
      title: "ช่างปะยาง / เปลี่ยนยาง",
      subtitle: "ปะไหม ปะสตรีม สลับยางอะไหล่",
      icon: Disc,
      iconBg: "bg-slate-100 text-slate-700 border-slate-200",
      categoryId: "tire",
    },
    {
      id: "motorcycle",
      title: "บริการมอเตอร์ไซค์",
      subtitle: "ซ่อมมอเตอร์ไซค์และ Bigbike นอกสถานที่",
      icon: Bike,
      iconBg: "bg-purple-50 text-purple-600 border-purple-200",
      categoryId: "motorcycle_repair",
    },
    {
      id: "volunteer",
      title: "ช่างอาสาช่วยน้ำท่วม",
      subtitle: "ซ่อมฟรี ไม่มีค่าแรง เพื่อสังคม",
      badge: "ฟรี 100%",
      badgeColor: "bg-red-500 text-white",
      icon: HeartHandshake,
      iconBg: "bg-red-50 text-red-600 border-red-200",
      categoryId: "volunteer_car",
    },
  ];

  return (
    <section className="py-8 px-4 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span>บริการด่วนฉุกเฉิน</span>
            <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-full">
              Quick Booking
            </span>
          </h2>
          <p className="text-xs md:text-sm text-slate-500">
            เลือกบริการที่ต้องการ ช่างมืออาชีพพร้อมเดินทางถึงจุดเกิดเหตุทันที
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.id}
              onClick={() => onOpenBooking(card.categoryId)}
              className="group relative flex flex-col items-start p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-400 shadow-sm hover:shadow-xl transition-all duration-200 text-left active:scale-[0.98]"
            >
              {card.badge && (
                <span
                  className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${card.badgeColor}`}
                >
                  {card.badge}
                </span>
              )}

              <div
                className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-3 group-hover:scale-110 transition duration-200 ${card.iconBg}`}
              >
                <Icon className="w-6 h-6" />
              </div>

              <div className="font-bold text-slate-800 text-sm md:text-base group-hover:text-blue-600 transition">
                {card.title}
              </div>
              <div className="text-[11px] md:text-xs text-slate-500 line-clamp-1 mt-0.5">
                {card.subtitle}
              </div>

              <div className="mt-3 text-[11px] font-semibold text-blue-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                <span>เรียกบริการนี้</span>
                <span>→</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
