"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  User,
  LogOut,
  ChevronLeft,
  Wrench,
} from "lucide-react";
import { BRAND_CONFIG, getAssetUrl } from "@/config/branding";
import { useAuth } from "@/contexts/AuthContext";

const NAV_ITEMS = [
  { href: "/dashboard", icon: LayoutDashboard, label: "แดชบอร์ด" },
  { href: "/dashboard/orders", icon: ClipboardList, label: "ประวัติการจอง" },
  { href: "/dashboard/profile", icon: User, label: "โปรไฟล์" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, signOut, isLoading } = useAuth();

  const logoSrc = getAssetUrl(BRAND_CONFIG.assets.logo.brand, BRAND_CONFIG.assets.logo.ref);
  const displayName = profile?.name || user?.email?.split("@")[0] || "User";
  const avatarInitial = displayName.charAt(0).toUpperCase();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col shrink-0">
        {/* Logo */}
        <div className="p-4 border-b border-slate-100">
          <Link href="/" className="relative h-8 w-32 block">
            <Image src={logoSrc} alt="FixNow" fill sizes="128px" className="object-contain object-left" />
          </Link>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center text-lg font-bold shrink-0">
              {avatarInitial}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{displayName}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-orange-50 text-orange-700 font-semibold"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-orange-600" : "text-slate-400"}`} />
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/booking"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-orange-50 hover:text-orange-700 transition"
          >
            <Wrench className="w-5 h-5 text-slate-400" />
            เรียกช่าง
          </Link>
        </nav>

        {/* Sign Out */}
        <div className="p-3 border-t border-slate-100">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition"
          >
            <LogOut className="w-5 h-5" />
            ออกจากระบบ
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ChevronLeft className="w-5 h-5 text-slate-500" />
            <div className="relative h-7 w-24">
              <Image src={logoSrc} alt="FixNow" fill sizes="96px" className="object-contain object-left" />
            </div>
          </Link>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center text-sm font-bold">
            {avatarInitial}
          </div>
        </header>

        {/* Mobile Bottom Nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-1.5 flex items-center justify-around z-40">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-[10px] font-medium ${
                  isActive ? "text-orange-600" : "text-slate-500"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-orange-600" : "text-slate-400"}`} />
                {item.label}
              </Link>
            );
          })}
          <button
            onClick={handleSignOut}
            className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-[10px] font-medium text-slate-500"
          >
            <LogOut className="w-5 h-5 text-slate-400" />
            ออก
          </button>
        </nav>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 pb-20 md:pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}
