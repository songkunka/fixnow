"use client";

import React from "react";
import { useRouter } from "next/navigation";
import TopContactBar from "@/components/TopContactBar";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import QuickAccessGrid from "@/components/QuickAccessGrid";
import ServiceCarousel from "@/components/ServiceCarousel";
import AppDownloadSection from "@/components/AppDownloadSection";
import MechanicPortfolioSection from "@/components/MechanicPortfolioSection";
import NewsSection from "@/components/NewsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TrustedBrandsSection from "@/components/TrustedBrandsSection";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";

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
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      {/* 1. Top Contact Bar (Social icons - Email, FB, LINE, TikTok) */}
      <TopContactBar />

      {/* 2. Main Navbar (Logo + Services Dropdown + Nav Links + Phone CTA) */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenPartner={handleOpenPartner}
      />

      <main className="flex-1">
        {/* 3. Hero Banner Carousel + Emergency CTA Button */}
        <HeroBanner onOpenBooking={handleOpenBooking} />

        {/* 3.5 Quick Access Services (Brand CI Slide 3 Squircle Vector Icons) */}
        <QuickAccessGrid onOpenBooking={handleOpenBooking} />

        {/* 4. Services Section ("บริการของเรา ร้านซ่อมรถใกล้ฉัน") */}
        <ServiceCarousel onOpenBooking={handleOpenBooking} />

        {/* 5. App Download Section (Orange gradient + Phone Mockup + QR) */}
        <AppDownloadSection />

        {/* 6. Mechanic Portfolio Grid ("ผลงานช่าง ร้านซ่อมรถใกล้ฉัน") */}
        <MechanicPortfolioSection
          onOpenMechanicProfile={() => router.push("/mechanic/kong-01")}
        />

        {/* 7. News Section ("ข่าวสารที่น่าสนใจ") - Empty placeholder */}
        <NewsSection />

        {/* 8. How It Works (5-Step Flow + Phone Mockup) */}
        <HowItWorksSection onOpenBooking={() => handleOpenBooking()} />

        {/* 9. Trusted Brands - Empty placeholder */}
        <TrustedBrandsSection />
      </main>

      {/* 10. Footer */}
      <Footer
        onOpenBooking={handleOpenBooking}
        onOpenPartner={handleOpenPartner}
      />

      {/* 11. Floating Quick Actions (Wrench → /booking, Phone, LINE) */}
      <FloatingActions onOpenBooking={() => handleOpenBooking()} />
    </div>
  );
}
