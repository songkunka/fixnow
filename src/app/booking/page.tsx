"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BRAND_CONFIG, getAssetUrl } from "@/config/branding";

const SERVICE_CATEGORIES = [
  {
    id: "repair",
    name: "เรียกช่างฉุกเฉิน",
    sub: "ซ่อมเครื่องยนต์ / ระบบไฟ",
    icon: "/assets/brand/icons/engine.svg",
    badge: "HOT",
    featured: true,
  },
  {
    id: "battery",
    name: "ช่างแบตเตอรี่",
    sub: "พ่วงแบต / เปลี่ยนแบตถึงที่",
    icon: "/assets/brand/icons/battery.svg",
    badge: "HOT",
  },
  {
    id: "tire",
    name: "ช่างปะยาง / เปลี่ยนยาง",
    sub: "ปะไหม ปะสตรีม สลับยาง",
    icon: "/assets/brand/icons/tire.svg",
  },
  {
    id: "towing",
    name: "รถสไลด์ / รถยก 24 ชม.",
    sub: "บริการเคลื่อนย้ายปลอดภัย",
    icon: "/assets/brand/icons/tow-truck.svg",
  },
  {
    id: "location",
    name: "ค้นหาช่างใกล้ฉัน",
    sub: "ระบุพิกัดช่างรอบตัวคุณ",
    icon: "/assets/brand/icons/location.svg",
  },
  {
    id: "volunteer",
    name: "ช่างอาสาช่วยน้ำท่วม",
    sub: "ซ่อมฟรี ไม่มีค่าแรง เพื่อสังคม",
    icon: "/assets/brand/icons/safety.svg",
    badge: "ฟรี",
    highlighted: true,
  },
];

export default function BookingPage() {
  return (
    <div className="p-6 md:p-10 pb-20 md:pb-10">
      {/* Header text with FixNow Brand CI */}
      <div className="text-center mb-10">
        <div className="inline-block text-xs font-bold text-[#FF5A18] bg-orange-100 px-3 py-1 rounded-full mb-2">
          EMERGENCY DISPATCH 24/7
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#17191C]">
          เรียกช่างฉุกเฉิน <span className="text-[#FF5A18]">FixNow</span>
        </h1>
        <p className="text-sm text-[#6E747B] mt-1">
          เลือกหมวดหมู่บริการที่ต้องการ ช่างมืออาชีพพร้อมเดินทางถึงที่ภายใน 30 นาที
        </p>
      </div>

      {/* Service Category Grid */}
      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SERVICE_CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={`/booking/service?category=${cat.id}`}
            className={`group relative rounded-2xl border-2 p-5 transition-all hover:shadow-lg active:scale-[0.98] ${
              cat.featured
                ? "border-orange-300 bg-orange-50/50 hover:border-orange-400 col-span-1 sm:col-span-2 lg:col-span-1 row-span-2"
                : cat.highlighted
                ? "border-blue-200 bg-blue-50/30 hover:border-blue-400"
                : "border-slate-200 bg-white hover:border-orange-300"
            }`}
          >
            {/* Badge */}
            {cat.badge && (
              <span
                className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  cat.badge === "ใหม่"
                    ? "bg-blue-500 text-white"
                    : "bg-orange-500 text-white"
                }`}
              >
                {cat.badge}
              </span>
            )}

            {/* Icon */}
            <div className="relative w-16 h-16 md:w-20 md:h-20 mb-3">
              <Image
                src={cat.icon}
                alt={cat.name}
                fill
                sizes="80px"
                className="object-contain"
              />
            </div>

            {/* Text */}
            <h3 className="font-bold text-slate-900 text-sm md:text-base group-hover:text-orange-600 transition">
              {cat.name}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">{cat.sub}</p>

            {/* Bottom wave for highlighted */}
            {cat.highlighted && (
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-b-2xl" />
            )}
          </Link>
        ))}
      </div>

      {/* Promotional Banner */}
      <div className="max-w-3xl mx-auto mt-10 rounded-2xl overflow-hidden bg-slate-900 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl md:text-2xl font-extrabold text-white leading-tight">
            เรียกช่างใกล้คุณ
            <br />
            <span className="text-orange-500">ผ่านแอปง่ายๆ</span>
            <br />
            ไม่ต้องเสียเวลาหาช่างเอง
          </h3>
        </div>
        <div className="relative w-48 h-32 shrink-0">
          <Image
            src={getAssetUrl(
              BRAND_CONFIG.assets.appMockup.brand,
              BRAND_CONFIG.assets.appMockup.ref
            )}
            alt="FixNow App"
            fill
            sizes="192px"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
