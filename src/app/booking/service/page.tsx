"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

// Service sub-categories matching 24carfix booking flow
const ALL_SERVICES: Record<string, { id: string; name: string; icon: string; badge?: string }[]> = {
  repair: [
    { id: "car-repair", name: "ช่างซ่อมเครื่องยนต์", icon: "/assets/brand/icons/engine.svg", badge: "ยอดนิยม" },
    { id: "battery", name: "ช่างแบตเตอรี่ รถยนต์", icon: "/assets/brand/icons/battery.svg", badge: "ยอดนิยม" },
    { id: "tire", name: "ช่างปะยาง รถยนต์", icon: "/assets/brand/icons/tire.svg" },
    { id: "key", name: "ช่างกุญแจ รถยนต์", icon: "/assets/brand/icons/engine.svg" },
    { id: "fuel", name: "เติมน้ำมันฉุกเฉิน", icon: "/assets/brand/icons/location.svg" },
    { id: "ev", name: "ช่างรถ EV / ไฟฟ้า", icon: "/assets/brand/icons/battery.svg" },
    { id: "alternator", name: "ไดนาโม ระบบไฟ", icon: "/assets/brand/icons/engine.svg" },
    { id: "radiator", name: "หม้อน้ำ ระบบหล่อเย็น", icon: "/assets/brand/icons/engine.svg" },
  ],
  towing: [
    { id: "slide-car", name: "รถสไลด์ฉุกเฉิน", icon: "/assets/brand/icons/tow-truck.svg", badge: "24 ชม." },
    { id: "crane", name: "รถยกมาตรฐาน", icon: "/assets/brand/icons/tow-truck.svg" },
  ],
  motorcycle: [
    { id: "mc-repair", name: "ซ่อมมอเตอร์ไซค์", icon: "/assets/brand/icons/engine.svg" },
    { id: "mc-tire", name: "ปะยางมอเตอร์ไซค์", icon: "/assets/brand/icons/tire.svg" },
  ],
  volunteer: [
    { id: "vol-car", name: "ช่างอาสาซ่อมรถยนต์", icon: "/assets/brand/icons/safety.svg", badge: "ฟรี" },
    { id: "vol-mc", name: "ช่างอาสาซ่อมมอเตอร์ไซค์", icon: "/assets/brand/icons/safety.svg", badge: "ฟรี" },
  ],
  parts: [
    { id: "parts-car", name: "สั่งอะไหล่รถยนต์", icon: "/assets/brand/icons/booking.svg" },
    { id: "parts-mc", name: "สั่งอะไหล่มอเตอร์ไซค์", icon: "/assets/brand/icons/booking.svg" },
  ],
};

const STEPS = [
  { number: 1, label: "บริการ" },
  { number: 2, label: "บริการย่อย" },
  { number: 3, label: "ประเภทรถ" },
  { number: 4, label: "ประเภทย่อย" },
];

function BookingServiceContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get("category") || "repair";

  const services = ALL_SERVICES[category] || ALL_SERVICES["repair"];

  return (
    <div className="p-6 md:p-10 pb-20 md:pb-10">
      {/* Back + Title */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition"
        >
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        <h1 className="text-xl md:text-2xl font-bold text-slate-900">
          เลือกหมวดหมู่บริการ
        </h1>
      </div>

      {/* Progress Stepper — matching 24carfix 4-step */}
      <div className="max-w-xl mx-auto mb-10">
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.number}>
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                    s.number === 1
                      ? "bg-orange-500 text-white"
                      : "bg-slate-200 text-slate-400"
                  }`}
                >
                  {s.number}
                </div>
                <span
                  className={`text-[10px] md:text-xs font-medium ${
                    s.number === 1 ? "text-orange-600" : "text-slate-400"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-0.5 bg-slate-200 mx-2 mt-[-16px]" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Instruction */}
      <p className="text-sm text-slate-500 mb-5">กรุณาเลือกหมวดหมู่บริการ</p>

      {/* Service Grid — matching 24carfix layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-3xl">
        {services.map((svc) => (
          <Link
            key={svc.id}
            href={`/booking/vehicle?service=${svc.id}&category=${category}`}
            className="group relative rounded-2xl border-2 border-slate-200 bg-white p-4 hover:border-orange-300 hover:shadow-md transition-all active:scale-[0.97]"
          >
            {/* Badge */}
            {svc.badge && (
              <span className="absolute top-2.5 right-2.5 text-[9px] font-bold bg-orange-500 text-white px-2 py-0.5 rounded-full">
                {svc.badge}
              </span>
            )}

            {/* Icon */}
            <div className="relative w-14 h-14 mb-3">
              <Image
                src={svc.icon}
                alt={svc.name}
                fill
                sizes="56px"
                className="object-contain"
              />
            </div>

            {/* Name */}
            <h3 className="font-bold text-sm text-slate-900 group-hover:text-orange-600 transition">
              {svc.name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function BookingServicePage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-slate-400">กำลังโหลด...</div>}>
      <BookingServiceContent />
    </Suspense>
  );
}
