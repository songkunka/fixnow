"use client";

import React from "react";
import Image from "next/image";
import { BRAND_CONFIG, getAssetUrl } from "@/config/branding";

export default function AppDownloadSection() {
  const appMockupSrc = getAssetUrl(
    BRAND_CONFIG.assets.appMockup.brand,
    BRAND_CONFIG.assets.appMockup.ref
  );
  const appStoreSrc = getAssetUrl(
    BRAND_CONFIG.assets.appStore.brand,
    BRAND_CONFIG.assets.appStore.ref
  );
  const googlePlaySrc = getAssetUrl(
    BRAND_CONFIG.assets.googlePlay.brand,
    BRAND_CONFIG.assets.googlePlay.ref
  );
  const qrcodeSrc = getAssetUrl(
    BRAND_CONFIG.assets.qrcode.brand,
    BRAND_CONFIG.assets.qrcode.ref
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-500 to-orange-600 py-16 md:py-20">
      {/* Decorative dots pattern */}
      <div className="absolute top-8 right-8 opacity-20">
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-white" />
          ))}
        </div>
      </div>
      <div className="absolute bottom-12 left-12 opacity-10">
        <svg className="w-48 h-48 text-white" viewBox="0 0 200 200" fill="currentColor">
          <path d="M50,100 C50,50 100,0 150,50 C200,100 150,150 100,150 C50,150 50,150 50,100Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        {/* Left Side - Phone Mockup */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-[300px] h-[500px] md:w-[400px] md:h-[600px]">
            <Image
              src={appMockupSrc}
              alt="FixNow Mobile App"
              fill
              sizes="(max-width: 768px) 300px, 400px"
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Right Side - Download CTA */}
        <div className="flex-1 text-white text-center lg:text-left">
          <div className="relative w-48 h-20 mb-3 mx-auto lg:mx-0">
            <Image
              src="/assets/brand/brand_tagline.png"
              alt="FixNow Always With You"
              fill
              className="object-contain"
            />
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4">
            ดาวน์โหลดแอป FixNow ได้แล้ววันนี้!
          </h2>
          <p className="text-white/90 text-sm md:text-base mb-6 max-w-lg">
            เรียกช่างฉุกเฉินได้ทันที ติดตามสถานะเรียลไทม์ และชำระเงินปลอดภัยทุกการเดินทาง
          </p>

          {/* App Store Badges */}
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
            <a href="#" className="block w-[160px] h-[48px] relative hover:scale-105 transition">
              <Image
                src={appStoreSrc}
                alt="Available on the App Store"
                fill
                sizes="160px"
                className="object-contain bg-black rounded-lg"
              />
            </a>
            <a href="#" className="block w-[160px] h-[48px] relative hover:scale-105 transition">
              <Image
                src={googlePlaySrc}
                alt="Get it on Google Play"
                fill
                sizes="160px"
                className="object-contain bg-black rounded-lg"
              />
            </a>
          </div>

          {/* Download Button */}
          <div className="mb-8">
            <a
              href="#"
              className="inline-block bg-white text-orange-600 font-bold text-base md:text-lg px-10 py-3.5 rounded-full shadow-xl hover:shadow-2xl hover:bg-slate-50 transition active:scale-95"
            >
              DOWNLOAD
            </a>
          </div>

          {/* QR Code */}
          <div className="flex items-center justify-center lg:justify-start gap-6 mb-8">
            <div className="w-36 h-36 md:w-44 md:h-44 bg-white p-3 rounded-2xl shadow-xl">
              <div className="relative w-full h-full">
                <Image
                  src={qrcodeSrc}
                  alt="QR Code สำหรับดาวน์โหลดแอป FixNow"
                  fill
                  sizes="160px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Social Links Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">หรือติดต่ออีกช่องทาง</h3>
            <div className="flex items-center justify-center lg:justify-start gap-4">
              {/* Facebook */}
              <a
                href={BRAND_CONFIG.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition"
              >
                <svg className="w-7 h-7 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* LINE */}
              <a
                href={BRAND_CONFIG.lineUrl}
                target="_blank"
                rel="noreferrer"
                className="w-14 h-14 rounded-full bg-[#06C755] flex items-center justify-center shadow-lg hover:scale-110 transition"
              >
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                </svg>
              </a>

              {/* TikTok */}
              <a
                href={BRAND_CONFIG.tiktokUrl}
                target="_blank"
                rel="noreferrer"
                className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition"
              >
                <svg className="w-7 h-7 text-slate-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href={BRAND_CONFIG.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition"
              >
                <svg className="w-7 h-7 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
