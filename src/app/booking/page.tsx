"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Headphones } from "lucide-react";


import { SERVICE_CATEGORIES } from "@/data/bookingServices";
import BookingStepper from "@/components/booking/BookingStepper";
import { BRAND_CONFIG } from "@/config/branding";


export default function BookingPage() {
  return (
    <div className="p-4 sm:p-6 md:p-10 pb-24 md:pb-12 max-w-5xl mx-auto">
      {/* Step 1 Stepper */}
      <BookingStepper currentStep={1} title="เลือกประเภทบริการ" />

      {/* Header text */}
      <div className="text-center mb-8">
        <p className="text-orange-600 font-bold text-xs sm:text-sm tracking-wide uppercase mb-1">
          บริการช่วยเหลือฉุกเฉินและซ่อมนอกสถานที่
        </p>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
          คุณต้องการเรียกช่างด้านใด?
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-lg mx-auto">
          เลือกหมวดหมู่เพื่อดูรายการบริการย่อย ราคาเริ่มต้น และเงื่อนไขการให้บริการที่โปร่งใส
        </p>
      </div>

      {/* Service Category Grid - No Badges, 100% Clean */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
        {SERVICE_CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={`/booking/service?category=${cat.id}`}
            className="group relative flex flex-col items-center text-center rounded-2xl border-2 border-slate-200 bg-white p-4 sm:p-5 transition-all duration-200 hover:border-orange-500 hover:shadow-lg active:scale-[0.98]"
          >
            {/* 3D Icon */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-3 transition-transform duration-200 group-hover:scale-105">
              <Image
                src={cat.icon}
                alt={cat.name}
                fill
                sizes="80px"
                className="object-contain"
                priority
              />
            </div>

            {/* Text */}
            <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-orange-600 transition-colors line-clamp-1">
              {cat.name}
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
              {cat.sub}
            </p>
          </Link>
        ))}
      </div>

      {/* Emergency Assurance Banner */}
      <div className="mt-10 rounded-2xl bg-slate-900 p-5 sm:p-7 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            ช่างพร้อมให้บริการตลอด 24 ชั่วโมง
          </h4>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            ครอบคลุมทุกพื้นที่ทั่วไทย ราคาโปร่งใส ประเมินก่อนซ่อม ชำระเงินหน้างานเมื่อเสร็จสิ้น
          </p>
        </div>
        <a
          href={`tel:${BRAND_CONFIG.hotline.replace(/-/g, "")}`}
          className="shrink-0 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 hover:text-white border border-slate-700 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5"
          title="ติดต่อสอบถามการใช้งานแพลตฟอร์ม"
        >
          <Headphones className="w-3.5 h-3.5 text-slate-400" />
          <span>ฝ่ายบริการลูกค้า</span>
        </a>
      </div>
    </div>
  );
}
