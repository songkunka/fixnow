"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ClipboardList, MessageCircle, User } from "lucide-react";
import { BRAND_CONFIG, getAssetUrl } from "@/config/branding";

const SIDEBAR_LINKS = [
  { href: "/booking", label: "หน้าหลัก", icon: Home },
  { href: "/dashboard/orders", label: "รายการ", icon: ClipboardList },
  { href: "#", label: "แชท AI", icon: MessageCircle, badge: "เร็วๆ นี้" },
  { href: "/dashboard/profile", label: "โปรไฟล์", icon: User },
];

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const logoSrc = getAssetUrl(BRAND_CONFIG.assets.logo.brand, BRAND_CONFIG.assets.logo.ref);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="relative h-9 w-36">
            <Image src={logoSrc} alt="FixNow" fill sizes="144px" className="object-contain object-left" />
          </Link>

          {/* User Avatar Placeholder */}
          <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm shadow">
            U
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - desktop only */}
        <aside className="hidden md:flex flex-col w-56 bg-white border-r border-slate-200 pt-6 shrink-0">
          <nav className="space-y-1 px-3">
            {SIDEBAR_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/booking" && pathname.startsWith(link.href) && link.href !== "#");
              const isBookingActive = link.href === "/booking" && pathname.startsWith("/booking");
              const active = isActive || isBookingActive;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                    active
                      ? "bg-orange-50 text-orange-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <link.icon className={`w-5 h-5 ${active ? "text-orange-600" : "text-slate-400"}`} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="ml-auto text-[10px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-2xl">
        <div className="flex items-center justify-around py-2">
          {SIDEBAR_LINKS.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href) && link.href !== "#";
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`flex flex-col items-center gap-0.5 text-[10px] font-medium py-1 px-3 ${
                  isActive ? "text-orange-600" : "text-slate-400"
                }`}
              >
                <link.icon className="w-5 h-5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
