"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ClipboardList, MessageCircle, User, Wrench } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  const isHomeActive = pathname === "/";
  const isOrdersActive = pathname.startsWith("/dashboard/orders");
  const isBookingActive = pathname.startsWith("/booking");
  const isChatActive = pathname === "/dashboard";
  const isProfileActive = pathname.startsWith("/dashboard/profile") || pathname.startsWith("/auth");

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] pb-[calc(0.4rem+env(safe-area-inset-bottom,0px))]">
      <div className="grid grid-cols-5 items-center px-1 py-1">
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 rounded-xl transition-all active:scale-95 ${
            isHomeActive ? "text-[#FF5A18]" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <Home className={`w-5 h-5 transition-transform duration-200 ${isHomeActive ? "stroke-[2.5] scale-105" : "stroke-2"}`} />
          <span className={`text-[10px] mt-1 leading-none ${isHomeActive ? "font-bold text-[#FF5A18]" : "font-medium"}`}>
            หน้าหลัก
          </span>
          {isHomeActive && (
            <span className="w-1 h-1 rounded-full bg-[#FF5A18] mt-0.5 animate-in fade-in zoom-in duration-200" />
          )}
        </Link>

        {/* 2. Orders */}
        <Link
          href="/dashboard/orders"
          className={`relative flex flex-col items-center justify-center min-h-[44px] py-1 rounded-xl transition-all active:scale-95 ${
            isOrdersActive ? "text-[#FF5A18]" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <div className="relative">
            <ClipboardList className={`w-5 h-5 transition-transform duration-200 ${isOrdersActive ? "stroke-[2.5] scale-105" : "stroke-2"}`} />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white animate-pulse" />
          </div>
          <span className={`text-[10px] mt-1 leading-none ${isOrdersActive ? "font-bold text-[#FF5A18]" : "font-medium"}`}>
            รายการ
          </span>
          {isOrdersActive && (
            <span className="w-1 h-1 rounded-full bg-[#FF5A18] mt-0.5 animate-in fade-in zoom-in duration-200" />
          )}
        </Link>

        {/* 3. RAISED CENTER BUTTON: เรียกช่าง (Grab/Lineman style) */}
        <div className="flex justify-center items-center">
          <Link
            href="/booking"
            className="group relative -top-4 flex flex-col items-center justify-center active:scale-95 transition-transform duration-150"
            aria-label="เรียกช่างด่วน 24 ชม."
          >
            <div className={`relative w-13 h-13 rounded-full bg-gradient-to-tr from-orange-500 via-[#FF5A18] to-amber-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/35 border-[3.5px] border-white transition-all duration-200 ${
              isBookingActive ? "ring-2 ring-orange-400 scale-105" : "group-hover:scale-105"
            }`}>
              <Wrench className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
              {/* Live status dot */}
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white animate-pulse" />
            </div>
            <span className="text-[10px] font-extrabold text-orange-600 mt-0.5 tracking-tight">
              เรียกช่าง
            </span>
          </Link>
        </div>

        {/* 4. AI Chat */}
        <Link
          href="/dashboard"
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 rounded-xl transition-all active:scale-95 ${
            isChatActive ? "text-[#FF5A18]" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <MessageCircle className={`w-5 h-5 transition-transform duration-200 ${isChatActive ? "stroke-[2.5] scale-105" : "stroke-2"}`} />
          <span className={`text-[10px] mt-1 leading-none ${isChatActive ? "font-bold text-[#FF5A18]" : "font-medium"}`}>
            แชท AI
          </span>
          {isChatActive && (
            <span className="w-1 h-1 rounded-full bg-[#FF5A18] mt-0.5 animate-in fade-in zoom-in duration-200" />
          )}
        </Link>

        {/* 5. Profile */}
        <Link
          href={user ? "/dashboard/profile" : "/auth/login"}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 rounded-xl transition-all active:scale-95 ${
            isProfileActive ? "text-[#FF5A18]" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <User className={`w-5 h-5 transition-transform duration-200 ${isProfileActive ? "stroke-[2.5] scale-105" : "stroke-2"}`} />
          <span className={`text-[10px] mt-1 leading-none ${isProfileActive ? "font-bold text-[#FF5A18]" : "font-medium"}`}>
            โปรไฟล์
          </span>
          {isProfileActive && (
            <span className="w-1 h-1 rounded-full bg-[#FF5A18] mt-0.5 animate-in fade-in zoom-in duration-200" />
          )}
        </Link>
      </div>
    </div>
  );
}
