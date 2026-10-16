"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ShieldCheck,
  MapPin,
  Clock,
  PhoneCall,
  Wrench,
  CheckCircle2,
  ChevronLeft,
  Star,
  Award,
  MessageCircle,
} from "lucide-react";
import { BRAND_CONFIG, getAssetUrl } from "@/config/branding";

// Sample mechanic data (later this comes from API/DB)
const MECHANICS_DB: Record<string, {
  id: string;
  name: string;
  nickname: string;
  avatar: string;
  area: string;
  rating: number;
  reviewCount: number;
  completedJobs: number;
  experienceYears: number;
  serviceRadius: string;
  availability: string;
  verificationStatus: string;
  skills: string[];
  bio: string;
  pastCases: { id: string; title: string; image: string; desc: string; date: string }[];
}> = {
  "kong-01": {
    id: "kong-01",
    name: "ช่างก้อง (ก้องเกียรติ การช่าง)",
    nickname: "ช่างก้อง",
    avatar: "/assets/24carfix/mechanic_kong_avatar.jpg",
    area: "โซนรัชดา - ห้วยขวาง - พระราม 9 - ลาดพร้าว (กรุงเทพมหานคร)",
    rating: 4.95,
    reviewCount: 142,
    completedJobs: 348,
    experienceYears: 12,
    serviceRadius: "รัศมี 25 กิโลเมตร",
    availability: "พร้อมออกปฏิบัติงานตลอด 24 ชั่วโมง",
    verificationStatus: "KYC Verified (ตรวจบัตรประชาชน & ประวัติอาชญากรรมแล้ว)",
    skills: [
      "ซ่อมเครื่องยนต์นอกสถานที่",
      "รถสตาร์ทไม่ติด / ไดสตาร์ท",
      "ระบบไฟรถยนต์ & ฟิวส์",
      "พ่วง / เปลี่ยนแบตเตอรี่ฉุกเฉิน",
      "เครื่องยนต์ดับกลางทาง / ความร้อนขึ้น",
      "ตรวจเช็กอาการด้วย OBD2 Scanner",
    ],
    bio: "ช่างซ่อมรถยนต์มืออาชีพ ประสบการณ์กว่า 12 ปี ประจำการโซนรัชดา-ลาดพร้าว เชี่ยวชาญการวิเคราะห์อาการเครื่องยนต์ดับ สตาร์ทไม่ติด และระบบไฟรถยนต์ทุกยี่ห้อ (ญี่ปุ่นและยุโรป) มีเครื่องมือสแกนเนอร์และอุปกรณ์ซ่อมหน้างานครบชุด พร้อมเดินทางถึงจุดเกิดเหตุภายใน 20-30 นาที",
    pastCases: [
      {
        id: "case-1",
        title: "เคสซ่อมระบบไฟและสตาร์ทไม่ติด - ถ.รัชดาภิเษก",
        image: "/assets/24carfix/mechanic_kong_work_1.jpg",
        desc: "ลูกค้าสตาร์ทไม่ติดช่วง 22.00 น. ตรวจสอบพบไดชาร์จและขั้วแบตเตอรี่มีปัญหา ทำการซ่อมและเปลี่ยนขั้วหน้างาน รถสตาร์ทติดปกติใน 35 นาที",
        date: "เคสจริงบันทึกในระบบ",
      },
      {
        id: "case-2",
        title: "เคสเครื่องยนต์ดับกลางทาง - แยกพระราม 9",
        image: "/assets/24carfix/mechanic_kong_work_2.jpg",
        desc: "รถยนต์เครื่องสั่นแล้วดับ ตรวจพบปั๊มติ๊กเชื้อเพลิงขัดข้อง ช่างก้องเข้าช่วยเหลือพร้อมอะไหล่สำรองและเครื่องมือวัดแรงดันน้ำมัน",
        date: "เคสจริงบันทึกในระบบ",
      },
      {
        id: "case-3",
        title: "เคสเปลี่ยนแบตเตอรี่ฉุกเฉิน - ซอยลาดพร้าว 48",
        image: "/assets/24carfix/mechanic_kong_work_3.jpg",
        desc: "รถจอดข้ามคืนแบตเตอรี่เสื่อมหมดสภาพ ช่างก้องนำแบตเตอรี่ลูกใหม่ตรงรุ่นพร้อมใบรับประกันไปเปลี่ยนให้ถึงที่บ้าน",
        date: "เคสจริงบันทึกในระบบ",
      },
    ],
  },
};

export default function MechanicProfilePage() {
  const params = useParams();
  const mechanicId = params.id as string;
  const [activeTab, setActiveTab] = useState<"about" | "cases">("about");

  const mechanic = MECHANICS_DB[mechanicId];

  if (!mechanic) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">ไม่พบข้อมูลช่าง</h1>
          <p className="text-slate-500 mb-4">ช่างรหัส &quot;{mechanicId}&quot; ไม่อยู่ในระบบ</p>
          <Link href="/" className="text-orange-600 hover:underline font-semibold">
            ← กลับหน้าหลัก
          </Link>
        </div>
      </div>
    );
  }

  const logoSrc = getAssetUrl(BRAND_CONFIG.assets.logo.brand, BRAND_CONFIG.assets.logo.ref);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <ChevronLeft className="w-5 h-5 text-slate-500 group-hover:text-orange-600 transition" />
            <div className="relative h-8 w-28">
              <Image src={logoSrc} alt="FixNow" fill sizes="112px" className="object-contain object-left" />
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-[11px] bg-orange-100 text-orange-700 font-bold px-2.5 py-1 rounded-full">
              ผลงานช่าง
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-orange-600 transition">หน้าหลัก</Link>
          <span>›</span>
          <Link href="/#mechanics" className="hover:text-orange-600 transition">ผลงานช่าง</Link>
          <span>›</span>
          <span className="text-slate-800 font-semibold">{mechanic.nickname}</span>
        </div>

        {/* Page Title - matching 24carfix portfolio-detail style */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
          {mechanic.nickname} ซ่อมนอกสถานที่ กรุงเทพ
        </h1>
        <h2 className="text-lg md:text-xl font-bold text-slate-700 mb-2">
          บริการซ่อมรถครบวงจรจาก{mechanic.nickname} – รับบริการนอกสถานที่ กรุงเทพ
        </h2>
        <h3 className="text-base font-semibold text-slate-600 mb-4">
          ทำไมต้องเลือกบริการจาก{mechanic.nickname} ซ่อมนอกสถานที่ กรุงเทพ?
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-8">
          {mechanic.bio}
        </p>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden mb-8">
          <div className="flex flex-col md:flex-row">
            {/* Avatar */}
            <div className="relative w-full md:w-72 h-64 md:h-auto bg-slate-100 shrink-0">
              <Image
                src={mechanic.avatar}
                alt={mechanic.name}
                fill
                sizes="(max-width: 768px) 100vw, 288px"
                className="object-cover object-top"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-emerald-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  ออนไลน์
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 p-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <h2 className="text-xl font-bold text-slate-900">{mechanic.name}</h2>
                <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  KYC Verified
                </span>
                <span className="text-[11px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                  Verified Partner
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                <span>{mechanic.area}</span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4">
                <div className="text-center">
                  <div className="text-xs text-slate-400 mb-1">คะแนนประเมิน</div>
                  <div className="font-bold text-lg text-amber-600 flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    {mechanic.rating}
                  </div>
                  <div className="text-[10px] text-slate-400">{mechanic.reviewCount} รีวิว</div>
                </div>
                <div className="text-center border-x border-slate-200">
                  <div className="text-xs text-slate-400 mb-1">ปิดเคสสำเร็จ</div>
                  <div className="font-bold text-lg text-slate-900">{mechanic.completedJobs}</div>
                  <div className="text-[10px] text-slate-400">เคส</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-slate-400 mb-1">ประสบการณ์</div>
                  <div className="font-bold text-lg text-slate-900">{mechanic.experienceYears}</div>
                  <div className="text-[10px] text-slate-400">ปี</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/booking?mechanic=kong-01"
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-sm px-5 py-3 rounded-xl transition shadow-lg shadow-orange-500/20 active:scale-95 flex items-center justify-center gap-2"
                >
                  <Wrench className="w-4 h-4" />
                  <span>ส่งคำขอเรียก{mechanic.nickname}</span>
                </Link>
                <a
                  href={`tel:${BRAND_CONFIG.hotline.replace(/-/g, "")}`}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold px-5 py-3 rounded-xl transition flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-orange-600" />
                  <span>โทรสอบถาม</span>
                </a>
                <a
                  href={BRAND_CONFIG.lineUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#06C755] hover:bg-[#05b34c] text-white text-sm font-semibold px-5 py-3 rounded-xl transition flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>LINE</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 text-sm font-semibold mb-6">
          <button
            onClick={() => setActiveTab("about")}
            className={`pb-3 px-5 transition border-b-2 ${
              activeTab === "about"
                ? "border-orange-600 text-orange-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            ข้อมูลและความเชี่ยวชาญ
          </button>
          <button
            onClick={() => setActiveTab("cases")}
            className={`pb-3 px-5 transition border-b-2 flex items-center gap-1.5 ${
              activeTab === "cases"
                ? "border-orange-600 text-orange-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <span>ผลงานและภาพเคสจริง</span>
            <span className="text-[10px] bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded-full">
              {mechanic.pastCases.length}
            </span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "about" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h4 className="font-bold text-slate-800 mb-3 text-base">ความเชี่ยวชาญและบริการที่รับงาน</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mechanic.skills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <Clock className="w-5 h-5 text-orange-600" />
                <span><strong>เวลาให้บริการ:</strong> {mechanic.availability}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <MapPin className="w-5 h-5 text-orange-600" />
                <span><strong>รัศมีบริการ:</strong> {mechanic.serviceRadius} จากจุดประจำการรัชดา</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-emerald-700 font-semibold">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>{mechanic.verificationStatus}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "cases" && (
          <div className="space-y-6">
            <p className="text-sm text-slate-500">
              ภาพถ่ายหน้างานจริงที่{mechanic.nickname}บันทึกขณะปฏิบัติงานฉุกเฉินนอกสถานที่:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {mechanic.pastCases.map((c) => (
                <div key={c.id} className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition">
                  <div className="relative h-48 w-full bg-slate-100">
                    <Image src={c.image} alt={c.title} fill sizes="(max-width: 768px) 100vw, 300px" className="object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="font-bold text-slate-900 text-sm mb-2">{c.title}</div>
                    <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
                    <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
                      ✓ {c.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white">
            <h3 className="text-lg font-bold">ต้องการ{mechanic.nickname}ดูแลเคสของคุณ?</h3>
            <p className="text-sm text-white/80">ส่งคำขอเรียกช่างตอนนี้ หรือโทรสอบถามรายละเอียดเพิ่มเติม</p>
          </div>
          <Link
            href="/booking?mechanic=kong-01"
            className="bg-white text-orange-600 font-bold px-8 py-3 rounded-xl hover:bg-slate-50 transition active:scale-95 shadow-lg whitespace-nowrap"
          >
            🔧 เรียก{mechanic.nickname}ทันที
          </Link>
        </div>
      </main>
    </div>
  );
}
