"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  PhoneCall,
  ChevronDown,
  Wrench,
  Menu,
  X,
  UserPlus,
  LogIn,
  User,
  LogOut,
  LayoutDashboard,
  ClipboardList,
  MapPin,
} from "lucide-react";
import { BRAND_CONFIG, getAssetUrl } from "@/config/branding";
import { useAuth } from "@/contexts/AuthContext";
import { useUserLocation } from "@/contexts/LocationContext";

interface NavbarProps {
  onOpenBooking: (category?: string) => void;
  onOpenPartner: () => void;
}

export default function Navbar({ onOpenBooking, onOpenPartner }: NavbarProps) {
  const router = useRouter();
  const { user, profile, isLoading, signOut } = useAuth();
  const { location } = useUserLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  const logoSrc = getAssetUrl(
    BRAND_CONFIG.assets.logo.brand,
    BRAND_CONFIG.assets.logo.ref
  );

  // Close user dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setUserDropdownOpen(false);
    router.push("/");
    router.refresh();
  };

  const displayName = profile?.name || user?.email?.split("@")[0] || "User";
  const avatarInitial = displayName.charAt(0).toUpperCase();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Brand Logo & Location Indicator */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative h-9 sm:h-10 w-36 sm:w-44 flex items-center">
              <Image
                src={logoSrc}
                alt={BRAND_CONFIG.assets.logo.alt}
                fill
                sizes="(max-width: 768px) 144px, 176px"
                className="object-contain object-left group-hover:scale-[1.02] transition"
                priority
              />
            </div>
          </Link>

          {/* Location Badge (Top left interactive map link) */}
          <Link
            href="/location?returnUrl=/"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-200 text-slate-700 hover:text-orange-600 transition text-xs font-semibold max-w-[200px] shadow-2xs group"
            title={location?.address || "ปักหมุดตำแหน่งของคุณ"}
          >
            <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0 group-hover:bg-orange-500 group-hover:text-white transition">
              <MapPin className="w-3 h-3" />
            </div>
            <span className="truncate">{location?.shortAddress || location?.address || "ปักหมุดตำแหน่ง"}</span>
            <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-700">
          {/* Mega Dropdown for Services */}
          <div className="relative">
            <button
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              onMouseEnter={() => setServicesDropdownOpen(true)}
              className="flex items-center gap-1.5 hover:text-orange-600 transition px-3 py-2 rounded-lg hover:bg-orange-50 border border-slate-200"
            >
              <span>บริการทั้งหมด</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  servicesDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {servicesDropdownOpen && (
              <div
                onMouseLeave={() => setServicesDropdownOpen(false)}
                className="absolute left-0 mt-1 w-[480px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 grid grid-cols-2 gap-2 z-50"
              >
                {BRAND_CONFIG.assets.services.slice(0, 8).map((svc) => (
                  <button
                    key={svc.id}
                    onClick={() => {
                      setServicesDropdownOpen(false);
                      onOpenBooking(svc.id);
                    }}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-orange-50 transition text-left group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-orange-50/70 border border-orange-100 flex items-center justify-center shrink-0 group-hover:bg-orange-100/80 transition p-1.5">
                      <Image
                        src={getAssetUrl(svc.brandImage, svc.refImage)}
                        alt={svc.nameTh}
                        width={28}
                        height={28}
                        className="object-contain w-7 h-7 group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800 text-xs flex items-center gap-1.5">
                        {svc.nameTh}
                        {svc.badge === "HOT" && (
                          <span className="text-[10px] bg-red-100 text-red-600 font-bold px-1.5 py-0.5 rounded-full">
                            HOT
                          </span>
                        )}
                        {svc.badge === "FREE" && (
                          <span className="text-[10px] bg-amber-100 text-amber-700 font-bold px-1.5 py-0.5 rounded-full">
                            ฟรี
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">
                        {svc.desc}
                      </div>
                    </div>
                  </button>
                ))}
                <div className="col-span-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-orange-600 font-medium px-2">
                  <button
                    onClick={() => {
                      setServicesDropdownOpen(false);
                      onOpenBooking();
                    }}
                    className="hover:underline flex items-center gap-1"
                  >
                    ดูบริการทั้งหมด 12 รายการ →
                  </button>
                </div>
              </div>
            )}
          </div>

          <a href="#services" className="hover:text-orange-600 transition px-3 py-2 rounded-lg hover:bg-orange-50">
            อะไหล่รถยนต์
          </a>

          <a href="#mechanics" className="hover:text-orange-600 transition px-3 py-2 rounded-lg hover:bg-orange-50">
            ผลงานช่าง
          </a>

          <a href="#knowledge" className="hover:text-orange-600 transition px-3 py-2 rounded-lg hover:bg-orange-50">
            สาระน่ารู้
          </a>

          <a href="#about" className="hover:text-orange-600 transition px-3 py-2 rounded-lg hover:bg-orange-50">
            เกี่ยวกับเรา
          </a>

          <a href="#news" className="hover:text-orange-600 transition px-3 py-2 rounded-lg hover:bg-orange-50">
            ข่าวสาร
          </a>

          <a href="#contact" className="hover:text-orange-600 transition px-3 py-2 rounded-lg hover:bg-orange-50">
            ติดต่อเรา
          </a>
        </div>

        {/* Right Section: Phone CTA + Auth */}
        <div className="flex items-center gap-2.5">
          <a
            href={`tel:${BRAND_CONFIG.hotline.replace(/-/g, "")}`}
            className="relative group flex items-center gap-2 border-2 border-orange-500 bg-orange-50/60 hover:bg-orange-500 text-orange-600 hover:text-white font-bold text-sm px-4 py-2 rounded-full transition-all duration-200 active:scale-95 shadow-sm hover:shadow-orange-500/20"
            title={`โทรสายด่วนฉุกเฉิน ${BRAND_CONFIG.hotlineDisplay}`}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500 group-hover:bg-white"></span>
            </span>
            <PhoneCall className="w-4 h-4" />
            <span className="hidden sm:inline tracking-tight">{BRAND_CONFIG.hotlineDisplay}</span>
          </a>

          {/* Auth Button / User Avatar */}
          {!isLoading && (
            <>
              {user ? (
                /* Logged In — User Avatar Dropdown */
                <div className="relative hidden lg:block" ref={userDropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-slate-100 transition"
                  >
                    {profile?.avatar_url ? (
                      <Image
                        src={profile.avatar_url}
                        alt={displayName}
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center text-sm font-bold">
                        {avatarInitial}
                      </div>
                    )}
                    <span className="text-sm font-medium text-slate-700 max-w-[100px] truncate">
                      {displayName}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-1.5 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-sm font-semibold text-slate-900 truncate">{displayName}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        แดชบอร์ด
                      </Link>
                      <Link
                        href="/dashboard/orders"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition"
                      >
                        <ClipboardList className="w-4 h-4" />
                        ประวัติการจอง
                      </Link>
                      <Link
                        href="/dashboard/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition"
                      >
                        <User className="w-4 h-4" />
                        โปรไฟล์
                      </Link>
                      <div className="border-t border-slate-100 mt-1 pt-1">
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
                        >
                          <LogOut className="w-4 h-4" />
                          ออกจากระบบ
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Not Logged In — Login Button */
                <Link
                  href="/auth/login"
                  className="hidden lg:flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-orange-600 px-3 py-2 rounded-xl hover:bg-orange-50 transition border border-slate-200"
                >
                  <LogIn className="w-4 h-4" />
                  เข้าสู่ระบบ
                </Link>
              )}
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden pt-4 pb-3 border-t border-slate-200 mx-4 flex flex-col gap-2">
          {/* Auth state in mobile */}
          {user ? (
            <div className="flex items-center gap-3 px-3 py-2 mb-2 bg-orange-50 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                {avatarInitial}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{displayName}</p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
              </div>
            </div>
          ) : (
            <Link
              href="/auth/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center font-semibold text-orange-600 px-3 py-2.5 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center gap-2 mb-1"
            >
              <LogIn className="w-4 h-4" />
              เข้าสู่ระบบ / สมัครสมาชิก
            </Link>
          )}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full text-left font-semibold text-orange-600 px-3 py-2 rounded-lg bg-orange-50 flex items-center justify-between"
          >
            <span>🚨 เรียกช่างฉุกเฉิน 24 ชั่วโมง</span>
            <span>→</span>
          </button>

          {user && (
            <>
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-lg text-sm font-medium flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 text-orange-600" /> แดชบอร์ด
              </Link>
              <Link href="/dashboard/orders" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-lg text-sm font-medium flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-orange-600" /> ประวัติการจอง
              </Link>
            </>
          )}

          <a href="#services" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-lg text-sm font-medium">บริการทั้งหมด</a>
          <a href="#mechanics" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-lg text-sm font-medium">ผลงานช่าง</a>
          <a href="#knowledge" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-lg text-sm font-medium">สาระน่ารู้</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-lg text-sm font-medium">เกี่ยวกับเรา</a>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenPartner(); }}
            className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4 text-orange-600" />
            <span>สมัครเป็นช่าง FixNow (พาร์ทเนอร์)</span>
          </button>

          {user && (
            <button
              onClick={() => { setMobileMenuOpen(false); handleSignOut(); }}
              className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium flex items-center gap-2 border-t border-slate-100 mt-1 pt-3"
            >
              <LogOut className="w-4 h-4" /> ออกจากระบบ
            </button>
          )}

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between px-3 text-xs text-slate-500">
            <span>สายด่วน: {BRAND_CONFIG.hotlineDisplay}</span>
            <span>LINE: {BRAND_CONFIG.lineId}</span>
          </div>
        </div>
      )}
    </nav>
  );
}
