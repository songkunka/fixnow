"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  ShieldCheck,
  MapPin,
  Clock,
  PhoneCall,
  Wrench,
  Award,
  CheckCircle2,
  Calendar,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { BRAND_CONFIG } from "@/config/branding";

interface MechanicProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookMechanic: (mechanicName: string) => void;
}

export default function MechanicProfileModal({
  isOpen,
  onClose,
  onBookMechanic,
}: MechanicProfileModalProps) {
  const [activeTab, setActiveTab] = useState<"about" | "cases">("about");
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  if (!isOpen) return null;

  const mechanic = {
    id: "mech-kong-01",
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
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        {/* Modal Top Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full">
              Verified Partner
            </span>
            <span className="text-xs text-slate-300">
              ตัวอย่างโปรไฟล์ช่างในเครือข่าย FixNow
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Header Profile Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-slate-200">
            {/* Avatar Photo Frame */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-blue-500 shadow-lg shrink-0">
              <Image
                src={mechanic.avatar}
                alt={mechanic.name}
                fill
                sizes="128px"
                className="object-cover object-top"
              />
              <span className="absolute bottom-1 right-1 bg-emerald-500 text-white p-1 rounded-full shadow" title="ออนไลน์พร้อมรับงาน">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <h3 className="text-xl font-bold text-slate-900">{mechanic.name}</h3>
                <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>KYC Verified</span>
                </span>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-slate-500 mb-3">
                <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>{mechanic.area}</span>
              </div>

              {/* Stats Counters */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-center text-xs">
                <div>
                  <div className="text-[11px] text-slate-400">คะแนนประเมิน</div>
                  <div className="font-bold text-slate-900 text-sm text-amber-600">
                    ★ {mechanic.rating}
                  </div>
                </div>
                <div className="border-x border-slate-200">
                  <div className="text-[11px] text-slate-400">ปิดเคสสำเร็จ</div>
                  <div className="font-bold text-slate-900 text-sm">
                    {mechanic.completedJobs} เคส
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">ประสบการณ์</div>
                  <div className="font-bold text-slate-900 text-sm">
                    {mechanic.experienceYears} ปี
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 text-sm font-semibold">
            <button
              onClick={() => setActiveTab("about")}
              className={`pb-3 px-4 transition border-b-2 ${
                activeTab === "about"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              ข้อมูลและความเชี่ยวชาญ
            </button>
            <button
              onClick={() => setActiveTab("cases")}
              className={`pb-3 px-4 transition border-b-2 flex items-center gap-1.5 ${
                activeTab === "cases"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <span>ผลงานและภาพเคสจริง</span>
              <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded-full">
                3
              </span>
            </button>
          </div>

          {/* TAB 1: About & Skills */}
          {activeTab === "about" && (
            <div className="space-y-4 text-xs md:text-sm">
              <div>
                <h4 className="font-bold text-slate-800 mb-1">ประวัติช่าง</h4>
                <p className="text-slate-600 leading-relaxed text-xs">
                  {mechanic.bio}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 mb-2">
                  ความเชี่ยวชาญและบริการที่รับงาน
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {mechanic.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold">เวลาให้บริการ:</span>
                  <span>{mechanic.availability}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold">รัศมีบริการ:</span>
                  <span>{mechanic.serviceRadius} จากจุดประจำการรัชดา</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{mechanic.verificationStatus}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Case Gallery */}
          {activeTab === "cases" && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500">
                ภาพถ่ายหน้างานจริงที่ช่างก้องบันทึกขณะปฏิบัติงานฉุกเฉินนอกสถานที่:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {mechanic.pastCases.map((c) => (
                  <div
                    key={c.id}
                    className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm flex flex-col"
                  >
                    <div className="relative h-36 w-full bg-slate-100">
                      <Image
                        src={c.image}
                        alt={c.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 200px"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="font-bold text-slate-900 text-xs mb-1 line-clamp-1">
                          {c.title}
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                          {c.desc}
                        </p>
                      </div>
                      <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between">
                        <span>✓ {c.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            <span>ต้องการช่างก้องดูแลเคสของคุณในเขต กทม.?</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${BRAND_CONFIG.hotline.replace(/-/g, "")}`}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
              <span>โทรสอบถาม</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onBookMechanic(mechanic.name);
              }}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs md:text-sm px-5 py-2.5 rounded-xl transition shadow-lg shadow-orange-500/20 active:scale-95 flex items-center gap-1"
            >
              <Wrench className="w-4 h-4" />
              <span>ส่งคำขอเรียกช่างก้อง</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
