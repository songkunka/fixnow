"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ClipboardList, MessageCircle, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  const navItems = [
    { href: "/", label: "หน้าหลัก", icon: Home, exact: true },
    { href: "/dashboard/orders", label: "รายการ", icon: ClipboardList, badge: "1" },
    { href: "/dashboard", label: "แชท AI", icon: MessageCircle },
    { href: user ? "/dashboard/profile" : "/auth/login", label: "โปรไฟล์", icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))]">
      <div className="flex items-center justify-around py-1.5 px-2">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`relative flex flex-col items-center justify-center min-h-[44px] min-w-[60px] gap-1 py-1 px-2 rounded-xl transition-all active:scale-95 ${
                isActive ? "text-[#FF5A18]" : "text-slate-400 hover:text-slate-700"
              }`}
            >
              {/* Icon Container with Badge */}
              <div className="relative">
                <item.icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? "stroke-[2.5] scale-105" : "stroke-2"}`} />
                {item.badge && (
                  <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white animate-pulse" />
                )}
              </div>

              {/* Label */}
              <span className={`text-[10px] leading-none transition-colors duration-200 ${isActive ? "font-bold text-[#FF5A18]" : "font-medium"}`}>
                {item.label}
              </span>

              {/* Active Indicator Dot */}
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#FF5A18] mt-0.5 animate-in fade-in zoom-in duration-200" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
