"use client";

import React from "react";
import Link from "next/link";
import { Wrench, ClipboardList, User, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardPage() {
  const { profile } = useAuth();
  const displayName = profile?.name || "ผู้ใช้";

  return (
    <div>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">
          สวัสดี, {displayName}! 👋
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          ยินดีต้อนรับสู่ FixNow Dashboard — จัดการคำขอซ่อมและโปรไฟล์ของคุณ
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Link
          href="/booking"
          className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-5 hover:from-orange-600 hover:to-orange-700 transition shadow-lg shadow-orange-500/20 active:scale-[0.98]"
        >
          <Wrench className="w-8 h-8 mb-3 opacity-80" />
          <h3 className="font-bold text-lg">เรียกช่าง</h3>
          <p className="text-sm opacity-80 mt-1">บริการฉุกเฉิน 24 ชม.</p>
        </Link>

        <Link
          href="/dashboard/orders"
          className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-orange-300 hover:shadow-md transition"
        >
          <ClipboardList className="w-8 h-8 mb-3 text-blue-600" />
          <h3 className="font-bold text-lg text-slate-900">ประวัติการจอง</h3>
          <p className="text-sm text-slate-500 mt-1">ดูคำขอทั้งหมด</p>
        </Link>

        <Link
          href="/dashboard/profile"
          className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-orange-300 hover:shadow-md transition"
        >
          <User className="w-8 h-8 mb-3 text-emerald-600" />
          <h3 className="font-bold text-lg text-slate-900">โปรไฟล์</h3>
          <p className="text-sm text-slate-500 mt-1">แก้ไขข้อมูลส่วนตัว</p>
        </Link>
      </div>

      {/* Recent Orders (Empty State) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h2 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-orange-600" />
          คำขอล่าสุด
        </h2>

        {/* Empty State */}
        <div className="text-center py-10">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ClipboardList className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="font-semibold text-slate-700 mb-1">ยังไม่มีคำขอ</h3>
          <p className="text-sm text-slate-500 mb-4">
            เมื่อคุณเรียกช่างหรือจองบริการ รายการจะแสดงที่นี่
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition"
          >
            <Wrench className="w-4 h-4" />
            เรียกช่างเลย
          </Link>
        </div>

        {/* Status Legend */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            รอช่างรับงาน
          </span>
          <span className="flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-blue-500" />
            กำลังดำเนินการ
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            เสร็จสิ้น
          </span>
        </div>
      </div>
    </div>
  );
}
