"use client";

import React from "react";
import Link from "next/link";
import { MapPin, ChevronDown } from "lucide-react";
import { useUserLocation } from "@/contexts/LocationContext";
import { useAuth } from "@/contexts/AuthContext";

export default function MobileLocationBar() {
  const { location } = useUserLocation();
  const { user } = useAuth();

  const displayLocation = location?.shortAddress || location?.address || "เลือกตำแหน่งของคุณ";
  const avatarInitial = user?.email ? user.email.charAt(0).toUpperCase() : "U";

  return (
    <div className="lg:hidden bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-xs">
      {/* Location Selector (Matching 24carfix mobile top bar) */}
      <Link
        href="/location?returnUrl=/"
        className="flex items-center gap-2.5 flex-1 min-w-0 pr-3 active:opacity-75 transition"
      >
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-500 to-orange-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20">
          <MapPin className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] text-slate-400 font-medium leading-none mb-1">
            ตำแหน่งของคุณ
          </div>
          <div className="flex items-center gap-1 text-slate-800 font-bold text-xs sm:text-sm truncate leading-tight">
            <span className="truncate">{displayLocation}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </div>
        </div>
      </Link>

      {/* User Avatar link to profile */}
      <Link
        href={user ? "/dashboard/profile" : "/auth/login"}
        className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xs shadow-md shrink-0 active:scale-95 transition"
        aria-label="โปรไฟล์ผู้ใช้งาน"
      >
        {avatarInitial}
      </Link>
    </div>
  );
}
