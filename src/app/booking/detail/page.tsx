"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  MapPin,
  Phone,
  MessageSquare,
  Upload,
  Navigation,
} from "lucide-react";

const STEPS = [
  { number: 1, label: "บริการ" },
  { number: 2, label: "บริการย่อย" },
  { number: 3, label: "ประเภทรถ" },
  { number: 4, label: "รายละเอียด" },
];

function DetailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const service = searchParams.get("service") || "";
  const category = searchParams.get("category") || "";
  const vehicle = searchParams.get("vehicle") || "";

  const [carBrand, setCarBrand] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setAddress(`พิกัด GPS: ${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`);
          setIsLocating(false);
        },
        () => {
          setIsLocating(false);
          alert("ไม่สามารถดึงตำแหน่ง GPS ได้ กรุณาพิมพ์ที่อยู่");
        }
      );
    }
  };

  const canSubmit = phone.length >= 9 && address.length > 0;

  return (
    <div className="p-6 md:p-10 pb-20 md:pb-10">
      {/* Back + Title */}
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => router.back()} aria-label="ย้อนกลับ" className="w-11 h-11 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition active:scale-95 shrink-0">
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        <h1 className="text-xl md:text-2xl font-bold text-slate-900">กรอกรายละเอียด</h1>
      </div>

      {/* Progress Stepper */}
      <div className="max-w-xl mx-auto mb-10">
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.number}>
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-sm font-bold bg-orange-500 text-white">
                  {s.number}
                </div>
                <span className="text-[10px] md:text-xs font-medium text-orange-600">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && <div className="flex-1 h-0.5 bg-orange-400 mx-2 mt-[-16px]" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="max-w-lg space-y-5">
        {/* Car Brand */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">ยี่ห้อ / รุ่นรถ</label>
          <input
            type="text"
            value={carBrand}
            onChange={(e) => setCarBrand(e.target.value)}
            placeholder="เช่น Toyota Camry 2020"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-sm transition"
          />
        </div>

        {/* License Plate */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">ทะเบียนรถ</label>
          <input
            type="text"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
            placeholder="เช่น กก 1234 กรุงเทพ"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-sm transition"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            เบอร์โทรศัพท์ <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="08X-XXX-XXXX"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-sm transition"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            สถานที่ / ตำแหน่ง GPS <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="พิมพ์ที่อยู่หรือจุดสังเกต เช่น หน้า 7-Eleven ซอยลาดพร้าว 48"
              rows={2}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-sm transition resize-none"
            />
          </div>
          <button
            onClick={handleGetLocation}
            disabled={isLocating}
            className="mt-2 flex items-center gap-1.5 text-xs text-orange-600 hover:text-orange-700 font-semibold disabled:opacity-50"
          >
            <Navigation className="w-3.5 h-3.5" />
            {isLocating ? "กำลังดึงตำแหน่ง..." : "📍 ดึงตำแหน่ง GPS อัตโนมัติ"}
          </button>
        </div>

        {/* Symptoms */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">อาการเบื้องต้น / หมายเหตุ</label>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="อธิบายอาการรถของคุณ เช่น สตาร์ทไม่ติด เครื่องดับกลางทาง แบตหมด"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-sm transition resize-none"
          />
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">แนบรูปภาพ (ถ้ามี)</label>
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center cursor-pointer hover:border-orange-400 transition">
            <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-xs text-slate-500">คลิกเพื่ออัพโหลดรูป หรือลากไฟล์มาวาง</p>
          </div>
        </div>

        {/* Submit */}
        <Link
          href={`/booking/confirm?service=${service}&category=${category}&vehicle=${vehicle}&phone=${phone}`}
          className={`block w-full text-center font-bold text-base py-4 rounded-xl transition shadow-lg ${
            canSubmit
              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-orange-500/30 active:scale-[0.98]"
              : "bg-slate-200 text-slate-400 cursor-not-allowed pointer-events-none"
          }`}
        >
          🔧 ยืนยันเรียกช่าง
        </Link>
      </div>
    </div>
  );
}

export default function BookingDetailPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-slate-400">กำลังโหลด...</div>}>
      <DetailContent />
    </Suspense>
  );
}
