"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BRAND_CONFIG } from "@/config/branding";

interface MobileCategoryGridProps {
  onOpenBooking?: (serviceId?: string) => void;
}

export default function MobileCategoryGrid({ onOpenBooking }: MobileCategoryGridProps) {
  const services = BRAND_CONFIG.assets.services;

  return (
    <div id="services" className="lg:hidden px-4 py-4">
      {/* Section Header matching 24carfix mobile screenshot 3 */}
      <h2 className="text-base font-extrabold text-slate-900 mb-3.5">
        หมวดหมู่บริการ
      </h2>

      {/* 4-Columns Grid */}
      <div className="grid grid-cols-4 gap-y-4 gap-x-2">
        {services.slice(0, 8).map((svc) => (
          <Link
            key={svc.id}
            href={`/booking/service?category=${svc.id}`}
            onClick={() => onOpenBooking?.(svc.id)}
            className="flex flex-col items-center text-center group active:scale-95 transition"
          >
            <div className="relative w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100/80 flex items-center justify-center p-2 group-hover:bg-orange-50 group-hover:border-orange-200 transition mb-1.5 shadow-2xs">
              <Image
                src={svc.brandImage || svc.refImage}
                alt={svc.nameTh}
                width={40}
                height={40}
                className="object-contain w-10 h-10 group-hover:scale-105 transition-transform"
              />
            </div>
            <span className="text-[11px] font-medium text-slate-700 group-hover:text-orange-600 transition line-clamp-2 leading-tight">
              {svc.nameTh}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
