"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface MobileFeaturedServicesProps {
  onOpenBooking?: (category?: string) => void;
}

export default function MobileFeaturedServices({ onOpenBooking }: MobileFeaturedServicesProps) {
  return (
    <div className="lg:hidden px-4 py-3">
      {/* 5-Cards Grid matching 24carfix Mobile Layout (Sample image 3) */}
      <div className="grid grid-cols-2 gap-3">
        {/* Card 1: เรียกช่างฉุกเฉิน (Tall Card spanning 2 rows) */}
        <Link
          href="/booking/service?category=repair"
          onClick={() => onOpenBooking?.("repair")}
          className="relative bg-white rounded-3xl p-4 border border-slate-100 shadow-sm flex flex-col justify-between overflow-hidden row-span-2 group active:scale-[0.98] transition hover:shadow-md hover:border-orange-200"
        >
          {/* Badge */}
          <div className="mb-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FF5A18] text-white shadow-xs">
              แนะนำ
            </span>
          </div>

          {/* Texts */}
          <div className="mb-3">
            <h3 className="font-extrabold text-slate-900 text-sm leading-snug group-hover:text-orange-600 transition">
              เรียกช่างฉุกเฉิน
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">
              ซ่อมรถยนต์นอกสถานที่
            </p>
          </div>

          {/* 2D Minimal Icon */}
          <div className="relative w-full aspect-square mt-auto flex items-center justify-center p-2">
            <Image
              src="/assets/brand/services/service_repair.png"
              alt="เรียกช่างฉุกเฉิน"
              width={120}
              height={120}
              className="object-contain w-24 h-24 group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>

        {/* Card 2: รถสไลด์/รถยก (Top Right) */}
        <Link
          href="/booking/service?category=towing"
          onClick={() => onOpenBooking?.("towing")}
          className="bg-white rounded-3xl p-3.5 border border-slate-100 shadow-sm flex items-center justify-between overflow-hidden group active:scale-[0.98] transition hover:shadow-md hover:border-orange-200"
        >
          <div className="flex-1 min-w-0 pr-1">
            <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm truncate group-hover:text-orange-600 transition">
              รถสไลด์/รถยก
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5 truncate">
              บริการเคลื่อนย้าย
            </p>
          </div>
          <div className="relative w-12 h-12 shrink-0">
            <Image
              src="/assets/brand/services/service_slide_car.png"
              alt="รถสไลด์/รถยก"
              width={48}
              height={48}
              className="object-contain w-12 h-12 group-hover:scale-105 transition-transform"
            />
          </div>
        </Link>

        {/* Card 3: บริการมอเตอร์ไซค์ (Middle Right) */}
        <Link
          href="/booking/service?category=motorcycle"
          onClick={() => onOpenBooking?.("motorcycle")}
          className="bg-white rounded-3xl p-3.5 border border-slate-100 shadow-sm flex items-center justify-between overflow-hidden group active:scale-[0.98] transition hover:shadow-md hover:border-orange-200"
        >
          <div className="flex-1 min-w-0 pr-1">
            <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm truncate group-hover:text-orange-600 transition">
              บริการมอเตอร์ไซค์
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5 truncate">
              ซ่อมมอเตอร์ไซค์
            </p>
          </div>
          <div className="relative w-12 h-12 shrink-0">
            <Image
              src="/assets/brand/services/service_motorcycle_repair.png"
              alt="บริการมอเตอร์ไซค์"
              width={48}
              height={48}
              className="object-contain w-12 h-12 group-hover:scale-105 transition-transform"
            />
          </div>
        </Link>

        {/* Card 4: สั่งอะไหล่ใกล้ฉัน (Bottom Left) */}
        <Link
          href="/booking/service?category=parts"
          onClick={() => onOpenBooking?.("parts")}
          className="bg-white rounded-3xl p-3.5 border border-slate-100 shadow-sm flex items-center justify-between overflow-hidden group active:scale-[0.98] transition hover:shadow-md hover:border-orange-200"
        >
          <div className="flex-1 min-w-0 pr-1">
            <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm truncate group-hover:text-orange-600 transition">
              สั่งอะไหล่ใกล้ฉัน
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5 truncate">
              รถยนต์และมอเตอร์ไซค์
            </p>
          </div>
          <div className="relative w-12 h-12 shrink-0">
            <Image
              src="/assets/brand/services/service_inspection.png"
              alt="สั่งอะไหล่ใกล้ฉัน"
              width={48}
              height={48}
              className="object-contain w-12 h-12 group-hover:scale-105 transition-transform"
            />
          </div>
        </Link>

        {/* Card 5: ช่างอาสาช่วยน้ำท่วม (Bottom Right with wave footer) */}
        <Link
          href="/booking/service?category=volunteer"
          onClick={() => onOpenBooking?.("volunteer")}
          className="relative bg-white rounded-3xl p-3.5 border border-blue-200/80 shadow-sm flex items-center justify-between overflow-hidden group active:scale-[0.98] transition hover:shadow-md hover:border-blue-400"
        >
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center gap-1 mb-0.5">
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-orange-500 text-white">
                ใหม่
              </span>
            </div>
            <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm truncate group-hover:text-blue-600 transition">
              ช่างอาสาช่วยน้ำท่วม
            </h3>
            <p className="text-[10px] text-blue-600 font-bold mt-0.5 truncate">
              ซ่อมฟรี ไม่มีค่าใช้จ่าย
            </p>
          </div>
          <div className="relative w-12 h-12 shrink-0">
            <Image
              src="/assets/brand/services/service_volunteer_car.png"
              alt="ช่างอาสาช่วยน้ำท่วม"
              width={48}
              height={48}
              className="object-contain w-12 h-12 group-hover:scale-105 transition-transform"
            />
          </div>

          {/* Water wave accent at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400" />
        </Link>
      </div>
    </div>
  );
}
