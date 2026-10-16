"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, Car, Bike, Truck } from "lucide-react";

const VEHICLE_TYPES = [
  { id: "sedan", name: "รถเก๋ง (Sedan)", icon: Car },
  { id: "suv", name: "รถอเนกประสงค์ (SUV/PPV)", icon: Car },
  { id: "pickup", name: "รถกระบะ (Pickup)", icon: Truck },
  { id: "van", name: "รถตู้ (Van)", icon: Truck },
  { id: "hatchback", name: "รถแฮทช์แบ็ก", icon: Car },
  { id: "sports", name: "รถสปอร์ต / Supercar", icon: Car },
  { id: "ev", name: "รถ EV / ไฟฟ้า", icon: Car },
  { id: "motorcycle", name: "มอเตอร์ไซค์", icon: Bike },
  { id: "bigbike", name: "Bigbike", icon: Bike },
];

const STEPS = [
  { number: 1, label: "บริการ" },
  { number: 2, label: "บริการย่อย" },
  { number: 3, label: "ประเภทรถ" },
  { number: 4, label: "ประเภทย่อย" },
];

function VehicleContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const service = searchParams.get("service") || "";
  const category = searchParams.get("category") || "";

  return (
    <div className="p-6 md:p-10 pb-20 md:pb-10">
      {/* Back + Title */}
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => router.back()} aria-label="ย้อนกลับ" className="w-11 h-11 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition active:scale-95 shrink-0">
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        <h1 className="text-xl md:text-2xl font-bold text-slate-900">เลือกประเภทรถ</h1>
      </div>

      {/* Progress Stepper */}
      <div className="max-w-xl mx-auto mb-10">
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.number}>
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-sm font-bold ${s.number <= 3 ? "bg-orange-500 text-white" : "bg-slate-200 text-slate-400"}`}>
                  {s.number}
                </div>
                <span className={`text-[10px] md:text-xs font-medium ${s.number <= 3 ? "text-orange-600" : "text-slate-400"}`}>{s.label}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-2 mt-[-16px] ${i < 2 ? "bg-orange-400" : "bg-slate-200"}`} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <p className="text-sm text-slate-500 mb-5">กรุณาเลือกประเภทรถของคุณ</p>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl">
        {VEHICLE_TYPES.map((vt) => (
          <Link
            key={vt.id}
            href={`/booking/detail?service=${service}&category=${category}&vehicle=${vt.id}`}
            className="group rounded-2xl border-2 border-slate-200 bg-white p-5 hover:border-orange-300 hover:shadow-md transition-all active:scale-[0.97] flex flex-col items-center gap-3"
          >
            <vt.icon className="w-10 h-10 text-slate-400 group-hover:text-orange-500 transition" />
            <span className="text-sm font-semibold text-slate-800 text-center group-hover:text-orange-600 transition">{vt.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function BookingVehiclePage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-slate-400">กำลังโหลด...</div>}>
      <VehicleContent />
    </Suspense>
  );
}
