"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Upload,
  Wrench,
  Building2,
  MapPin,
  Check,
  CheckCircle2,
  ChevronLeft,
} from "lucide-react";
import { BRAND_CONFIG, getAssetUrl } from "@/config/branding";

const SKILL_OPTIONS = [
  { id: "repair", label: "ซ่อมรถยนต์ทั่วไป" },
  { id: "battery", label: "พ่วง / เปลี่ยนแบตเตอรี่" },
  { id: "tire", label: "ปะยาง / เปลี่ยนยาง" },
  { id: "key", label: "ช่างกุญแจรถยนต์" },
  { id: "ac", label: "ล้างแอร์รถยนต์" },
  { id: "slide", label: "บริการรถสไลด์ / รถยก" },
  { id: "motorcycle", label: "ซ่อมมอเตอร์ไซค์" },
  { id: "ev", label: "ซ่อมรถ EV / ไฟฟ้า" },
  { id: "film", label: "ติดฟิล์มกรองแสง" },
  { id: "inspection", label: "ตรวจเช็กสภาพรถ / OBD2" },
];

export default function PartnerRegisterPage() {
  const [fullName, setFullName] = useState("");
  const [garageName, setGarageName] = useState("");
  const [phone, setPhone] = useState("");
  const [idCardNumber, setIdCardNumber] = useState("");
  const [province, setProvince] = useState("กรุงเทพมหานคร");
  const [serviceRadius, setServiceRadius] = useState("25");
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["repair", "battery"]);
  const [bankAccount, setBankAccount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const logoSrc = getAssetUrl(BRAND_CONFIG.assets.logo.brand, BRAND_CONFIG.assets.logo.ref);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-2">สมัครสำเร็จ!</h1>
          <p className="text-sm text-slate-500 mb-6">
            ทีมงาน FixNow จะตรวจสอบเอกสาร KYC ของคุณ
            และติดต่อกลับภายใน 1-3 วันทำการ ผ่านเบอร์โทรที่ระบุ
          </p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg"
          >
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <ChevronLeft className="w-5 h-5 text-slate-500 group-hover:text-orange-600" />
            <div className="relative h-8 w-28">
              <Image src={logoSrc} alt="FixNow" fill sizes="112px" className="object-contain object-left" />
            </div>
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Header with FixNow Uniform Showcase */}
        <div className="bg-[#17191C] text-white rounded-3xl p-6 sm:p-8 mb-8 border border-white/10 shadow-xl overflow-hidden relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-[#FF5A18] text-white font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  Partner Network
                </span>
                <span className="text-xs text-slate-400">KYC Verified</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">
                สมัครเป็นช่าง <span className="text-[#FF5A18]">FixNow</span>
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed mb-4 max-w-lg">
                เข้าร่วมเครือข่ายช่างผู้เชี่ยวชาญ FixNow รับงานซ่อมฉุกเฉินในพื้นที่ของคุณ พร้อมรับชุดยูนิฟอร์มและอุปกรณ์มาตรฐานแบรนด์ FixNow!
              </p>
              <div className="flex items-center gap-4 text-xs text-orange-200">
                <span>✓ รายได้มั่นคงตามงานจริง</span>
                <span>✓ ประกันคุ้มครองงานซ่อม</span>
              </div>
            </div>

            {/* Uniform Showcase Badges */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-24 h-28 sm:w-28 sm:h-32 rounded-2xl bg-white/10 p-2 flex flex-col items-center justify-center border border-white/20">
                <div className="relative w-full h-20">
                  <Image src="/assets/brand/uniform_polo.png" alt="เสื้อโปโลช่าง FixNow" fill className="object-contain" />
                </div>
                <span className="text-[10px] text-slate-300 font-bold mt-1">เสื้อฟอร์มช่าง</span>
              </div>
              <div className="w-24 h-28 sm:w-28 sm:h-32 rounded-2xl bg-white/10 p-2 flex flex-col items-center justify-center border border-white/20">
                <div className="relative w-full h-20">
                  <Image src="/assets/brand/uniform_cap.png" alt="หมวกช่าง FixNow" fill className="object-contain" />
                </div>
                <span className="text-[10px] text-slate-300 font-bold mt-1">หมวกประจำการ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-orange-600" />
              ข้อมูลส่วนตัว
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">ชื่อ - นามสกุล (เต็ม)</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="ชื่อจริง นามสกุล" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">เบอร์โทรศัพท์</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="08X-XXX-XXXX" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">เลขบัตรประชาชน 13 หลัก</label>
                <input type="text" value={idCardNumber} onChange={(e) => setIdCardNumber(e.target.value)} placeholder="X-XXXX-XXXXX-XX-X" maxLength={17} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">ชื่ออู่ / ร้าน (ถ้ามี)</label>
                <input type="text" value={garageName} onChange={(e) => setGarageName(e.target.value)} placeholder="ชื่อร้าน / อู่" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-sm" />
              </div>
            </div>
          </div>

          {/* Area */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-600" />
              พื้นที่ให้บริการ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">จังหวัด</label>
                <select value={province} onChange={(e) => setProvince(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 outline-none text-sm bg-white">
                  <option>กรุงเทพมหานคร</option>
                  <option>นนทบุรี</option>
                  <option>ปทุมธานี</option>
                  <option>สมุทรปราการ</option>
                  <option>ชลบุรี</option>
                  <option>เชียงใหม่</option>
                  <option>ขอนแก่น</option>
                  <option>นครราชสีมา</option>
                  <option>สงขลา</option>
                  <option>ภูเก็ต</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">รัศมีให้บริการ (กม.)</label>
                <select value={serviceRadius} onChange={(e) => setServiceRadius(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 outline-none text-sm bg-white">
                  <option value="10">10 กิโลเมตร</option>
                  <option value="25">25 กิโลเมตร</option>
                  <option value="50">50 กิโลเมตร</option>
                  <option value="100">100 กิโลเมตร</option>
                </select>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-orange-600" />
              ความเชี่ยวชาญ (เลือกได้หลายข้อ)
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {SKILL_OPTIONS.map((skill) => {
                const selected = selectedSkills.includes(skill.id);
                return (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => toggleSkill(skill.id)}
                    className={`p-3 rounded-xl border-2 text-sm text-left font-medium transition ${
                      selected
                        ? "border-orange-500 bg-orange-50 text-orange-800"
                        : "border-slate-200 text-slate-600 hover:border-orange-300"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {selected && <Check className="w-4 h-4 text-orange-600" />}
                      {skill.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* KYC Upload */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-orange-600" />
              อัปโหลดเอกสาร KYC
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center cursor-pointer hover:border-orange-400 transition">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-600">ภาพถ่ายบัตรประชาชน</p>
                <p className="text-[10px] text-slate-400 mt-1">PNG, JPG ไม่เกิน 5MB</p>
              </div>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center cursor-pointer hover:border-orange-400 transition">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-600">ภาพถ่ายหน้าตรงกับบัตร</p>
                <p className="text-[10px] text-slate-400 mt-1">Selfie กับบัตรประชาชน</p>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl transition shadow-xl shadow-orange-500/20 active:scale-[0.98] disabled:opacity-50 text-base"
          >
            {isSubmitting ? "กำลังส่งข้อมูล..." : "📋 ส่งใบสมัครเป็นช่าง FixNow"}
          </button>
        </form>
      </main>
    </div>
  );
}
