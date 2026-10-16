"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import ServiceCarousel from "@/components/ServiceCarousel";
import AppDownloadSection from "@/components/AppDownloadSection";
import MechanicPortfolioSection from "@/components/MechanicPortfolioSection";
import NewsSection from "@/components/NewsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TrustedBrandsSection from "@/components/TrustedBrandsSection";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import MobileLocationBar from "@/components/MobileLocationBar";
import MobileFeaturedServices from "@/components/MobileFeaturedServices";
import MobileCategoryGrid from "@/components/MobileCategoryGrid";
import MobileBottomNav from "@/components/MobileBottomNav";

export default function HomePage() {
  const router = useRouter();

  // Navigate to full-page booking instead of opening modal
  const handleOpenBooking = (serviceId?: string) => {
    if (serviceId) {
      router.push(`/booking/service?category=${serviceId}`);
    } else {
      router.push("/booking");
    }
  };

  // Navigate to full-page partner registration instead of modal
  const handleOpenPartner = () => {
    router.push("/partner/register");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 lg:bg-white text-slate-900 pb-16 lg:pb-0">
      {/* 1. Mobile Top Location Bar (24carfix style top bar) */}
      <MobileLocationBar />

      {/* 2. Main Navbar (Logo + Location Badge + Services Dropdown + Nav Links + Phone CTA) */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenPartner={handleOpenPartner}
      />

      <main className="flex-1">
        {/* 3. Hero Banner Carousel */}
        <HeroBanner onOpenBooking={handleOpenBooking} />

        {/* 4. Mobile Featured 5 Services (24carfix app layout - Mobile Only) */}
        <MobileFeaturedServices onOpenBooking={handleOpenBooking} />

        {/* 5. Mobile Category Grid (4 cols - Mobile Only) */}
        <MobileCategoryGrid onOpenBooking={handleOpenBooking} />

        {/* 6. Desktop Services Section ("บริการของเรา ร้านซ่อมรถใกล้ฉัน" - Hidden on mobile) */}
        <div className="hidden lg:block">
          <ServiceCarousel onOpenBooking={handleOpenBooking} />
        </div>

        {/* 7. App Download Section (Orange gradient + Phone Mockup + QR) */}
        <AppDownloadSection />

        {/* 8. Mechanic Portfolio Grid ("ผลงานช่าง ร้านซ่อมรถใกล้ฉัน") */}
        <MechanicPortfolioSection
          onOpenMechanicProfile={() => router.push("/mechanic/kong-01")}
        />

        {/* 9. News Section ("ข่าวสารที่น่าสนใจ") */}
        <NewsSection />

        {/* 10. How It Works (5-Step Flow + Phone Mockup) */}
        <HowItWorksSection onOpenBooking={() => handleOpenBooking()} />

        {/* 11. Trusted Brands */}
        <TrustedBrandsSection />
      </main>

      {/* 12. Footer (24carfix dark matte #1c1c1c style) */}
      <Footer
        onOpenBooking={handleOpenBooking}
        onOpenPartner={handleOpenPartner}
      />

      {/* 13. Mobile Bottom Tab Bar (Home, Orders, Chat AI, Profile) */}
      <MobileBottomNav />

      {/* 14. Floating Quick Actions (Desktop stack & mobile quick call) */}
      <FloatingActions onOpenBooking={() => handleOpenBooking()} />
    </div>
  );
}
