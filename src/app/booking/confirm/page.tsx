"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, PhoneCall, Clock, MapPin, ArrowLeft } from "lucide-react";
import { BRAND_CONFIG } from "@/config/branding";

function ConfirmContent() {
  const searchParams = useSearchParams();
  const [orderNumber] = useState(() => `FN-${Date.now().toString(36).toUpperCase()}`);

  return (
    <div className="p-6 md:p-10 pb-20 md:pb-10 flex items-center justify-center min-h-[70vh]">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>

        <h1 className="text-2xl font-extrabold text-slate-900 mb-2">
          ส่งคำขอเรียบร้อยแล้ว!
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          FixNow กำลังค้นหาช่างใกล้คุณ คุณจะได้รับการยืนยันภายใน 5-15 นาที
        </p>

        {/* Order Number */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 mb-6">
          <div className="text-xs text-orange-600 font-semibold mb-1">หมายเลขคำขอ</div>
          <div className="text-xl font-mono font-bold text-slate-900">{orderNumber}</div>
        </div>

        {/* Info Cards */}
        <div className="space-y-3 mb-8 text-left">
          <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-4 text-sm text-slate-700">
            <Clock className="w-5 h-5 text-orange-600 shrink-0" />
            <span>ช่างจะติดต่อกลับภายใน <strong>5-15 นาที</strong></span>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-4 text-sm text-slate-700">
            <MapPin className="w-5 h-5 text-orange-600 shrink-0" />
            <span>ช่างจะเดินทางไปยังตำแหน่งที่คุณแจ้งไว้</span>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-4 text-sm text-slate-700">
            <PhoneCall className="w-5 h-5 text-orange-600 shrink-0" />
            <span>หากต้องการความช่วยเหลือเพิ่มเติม โทร <strong>{BRAND_CONFIG.hotlineDisplay}</strong></span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <a
            href={`tel:${BRAND_CONFIG.hotline.replace(/-/g, "")}`}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-500/20 hover:from-orange-600 hover:to-orange-700 transition active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-5 h-5" />
            โทรสายด่วน {BRAND_CONFIG.hotlineDisplay}
          </a>
          <Link
            href="/"
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BookingConfirmPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-slate-400">กำลังโหลด...</div>}>
      <ConfirmContent />
    </Suspense>
  );
}
