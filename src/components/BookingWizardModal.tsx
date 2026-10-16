"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  MapPin,
  Car,
  AlertTriangle,
  Upload,
  Phone,
  Clock,
  Wrench,
  BatteryCharging,
  Truck,
  Disc,
  Key,
  ShieldCheck,
} from "lucide-react";
import { BRAND_CONFIG, getAssetUrl, ServiceCardItem } from "@/config/branding";

interface BookingWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
}

export default function BookingWizardModal({
  isOpen,
  onClose,
  initialServiceId,
}: BookingWizardModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedSymptom, setSelectedSymptom] = useState<string>("");
  const [customSymptom, setCustomSymptom] = useState<string>("");
  const [vehicleType, setVehicleType] = useState<string>("Sedan");
  const [carBrand, setCarBrand] = useState<string>("");
  const [licensePlate, setLicensePlate] = useState<string>("");
  const [contactPhone, setContactPhone] = useState<string>("");
  const [locationAddress, setLocationAddress] = useState<string>("");
  const [gpsCoordinates, setGpsCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
  const [createdOrderNumber, setCreatedOrderNumber] = useState<string>("");

  useEffect(() => {
    if (initialServiceId) {
      setSelectedService(initialServiceId);
      setStep(2);
    } else {
      setSelectedService("repair");
      setStep(1);
    }
  }, [initialServiceId, isOpen]);

  // Try fetching user GPS location
  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGpsCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationAddress(
            `พิกัด GPS: ${position.coords.latitude.toFixed(5)}, ${position.coords.longitude.toFixed(5)} (ระบุใกล้จุดเกิดเหตุ)`
          );
          setIsLocating(false);
        },
        (error) => {
          console.error("GPS error:", error);
          setIsLocating(false);
          alert("ไม่สามารถดึงตำแหน่งพิกัดอัตโนมัติได้ กรุณาพิมพ์ระบุสถานที่เกิดเหตุ");
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
  };

  const handleFinishBooking = () => {
    setIsSubmitting(true);
    // Simulate real booking generation
    setTimeout(() => {
      const orderNum = `FN-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(
        1000 + Math.random() * 9000
      )}`;
      setCreatedOrderNumber(orderNum);
      setIsSubmitting(false);
      setOrderSuccess(true);
    }, 1500);
  };

  const resetAndClose = () => {
    setStep(1);
    setOrderSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  const currentServiceObj = BRAND_CONFIG.assets.services.find(
    (s) => s.id === selectedService
  ) || BRAND_CONFIG.assets.services[0];

  const symptomsList = [
    "รถสตาร์ทไม่ติด / เสียงแชะๆ",
    "แบตเตอรี่หมดเกลี้ยง ต้องการพ่วงด่วน",
    "ยางแบน / ยางระเบิด / ตะปูปัก",
    "เครื่องยนต์ดับกลางทาง / ความร้อนขึ้นสูง",
    "ลืมกุญแจไว้ในรถ / ประตูล็อค",
    "น้ำมันหมดกลางทาง",
    "รถจมน้ำ / ประสบภัยน้ำท่วม (ช่างอาสา)",
    "รถเสียต้องการรถสไลด์ไปอู่/ศูนย์บริการ",
    "อาการอื่นๆ (ระบุเพิ่มเติม)",
  ];

  const vehicles = [
    { id: "Sedan", name: "รถเก๋ง 4 ประตู", icon: "🚗" },
    { id: "Pickup", name: "รถกระบะ / Pickup", icon: "🛻" },
    { id: "SUV", name: "รถอเนกประสงค์ / SUV", icon: "🚙" },
    { id: "Van", name: "รถตู้ / Van", icon: "🚐" },
    { id: "EV", name: "รถยนต์ไฟฟ้า (EV)", icon: "⚡" },
    { id: "Motorcycle", name: "รถมอเตอร์ไซค์", icon: "🏍️" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        {/* Wizard Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {step > 1 && !orderSuccess && (
              <button
                onClick={() => setStep((prev) => Math.max(1, prev - 1) as any)}
                className="p-1 rounded-lg hover:bg-slate-800 transition"
              >
                <ChevronLeft className="w-5 h-5 text-slate-300" />
              </button>
            )}
            <div>
              <div className="text-[11px] text-amber-400 font-semibold tracking-wide uppercase">
                {step === 1 && "ขั้นตอนที่ 1 จาก 4 : เลือกหมวดหมู่บริการ"}
                {step === 2 && "ขั้นตอนที่ 2 จาก 4 : ระบุอาการเสีย"}
                {step === 3 && "ขั้นตอนที่ 3 จาก 4 : ข้อมูลยานพาหนะ"}
                {step === 4 && "ขั้นตอนที่ 4 จาก 4 : ปักหมุดพิกัด & ยืนยันคำขอ"}
                {orderSuccess && "ส่งคำขอฉุกเฉินสำเร็จ"}
              </div>
              <h3 className="font-bold text-base md:text-lg">
                {!orderSuccess ? "เรียกช่างฉุกเฉิน FixNow 24 ชม." : "ระบบกำลังกระจายงานไปยังช่างใกล้คุณ"}
              </h3>
            </div>
          </div>

          <button
            onClick={resetAndClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Step Progress Bar */}
        {!orderSuccess && (
          <div className="w-full bg-slate-100 h-1.5 flex">
            <div
              className={`h-full bg-blue-600 transition-all duration-300 ${
                step === 1
                  ? "w-1/4"
                  : step === 2
                  ? "w-2/4"
                  : step === 3
                  ? "w-3/4"
                  : "w-full"
              }`}
            />
          </div>
        )}

        {/* Wizard Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* STEP 1: Choose Service */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-sm text-slate-600 font-medium">
                เลือกประเภทบริการที่คุณต้องการความช่วยเหลือ:
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {BRAND_CONFIG.assets.services.map((svc) => (
                  <button
                    key={svc.id}
                    onClick={() => {
                      setSelectedService(svc.id);
                      setStep(2);
                    }}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all group ${
                      selectedService === svc.id
                        ? "border-blue-600 bg-blue-50/60 shadow-md ring-2 ring-blue-500/20"
                        : "border-slate-200 hover:border-blue-400 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-1">
                        {svc.nameTh}
                      </span>
                      {svc.badge && (
                        <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800">
                          {svc.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mb-2">
                      {svc.desc}
                    </p>
                    <div className="text-[10px] font-semibold text-blue-600 mt-auto">
                      เลือกบริการนี้ →
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Symptom details */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500">บริการที่เลือก:</span>{" "}
                  <span className="font-bold text-blue-900">{currentServiceObj.nameTh}</span>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-blue-600 underline font-semibold"
                >
                  เปลี่ยน
                </button>
              </div>

              <div className="text-sm font-semibold text-slate-800">
                เลือกอาการเสียที่พบ (หรือระบุเพิ่มเติม):
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {symptomsList.map((symptom, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedSymptom(symptom)}
                    className={`p-3 rounded-xl border text-xs text-left font-medium transition ${
                      selectedSymptom === symptom
                        ? "border-blue-600 bg-blue-50 text-blue-900 font-bold"
                        : "border-slate-200 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    • {symptom}
                  </button>
                ))}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  รายละเอียดอาการ หรือจุดสังเกตเพิ่มเติม (ถ้ามี):
                </label>
                <textarea
                  rows={2}
                  value={customSymptom}
                  onChange={(e) => setCustomSymptom(e.target.value)}
                  placeholder="เช่น รถจอดข้างทางฝั่งขาออก ใกล้ปั๊มน้ำมัน เครื่องมีควันขึ้น..."
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Vehicle details */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="text-sm font-semibold text-slate-800">
                ประเภทยานพาหนะของคุณ:
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {vehicles.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVehicleType(v.id)}
                    className={`p-3 rounded-xl border flex items-center gap-2.5 transition text-left ${
                      vehicleType === v.id
                        ? "border-blue-600 bg-blue-50 text-blue-900 font-bold shadow-sm"
                        : "border-slate-200 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <span className="text-xl">{v.icon}</span>
                    <span className="text-xs">{v.name}</span>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    ยี่ห้อ / รุ่นรถ (เช่น Toyota Yaris, Honda Civic)
                  </label>
                  <input
                    type="text"
                    required
                    value={carBrand}
                    onChange={(e) => setCarBrand(e.target.value)}
                    placeholder="เช่น Toyota Fortuner"
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    ทะเบียนรถ (เช่น กข-1234 ขอนแก่น)
                  </label>
                  <input
                    type="text"
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value)}
                    placeholder="เช่น 1กข-9999 กทม."
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Location & Confirmation */}
          {step === 4 && !orderSuccess && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-800 block mb-1">
                  เบอร์โทรศัพท์ที่ติดต่อได้สะดวก (สำหรับช่างโทรหาคุณ):
                </label>
                <input
                  type="tel"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="เช่น 0812345678"
                  className="w-full text-sm font-semibold px-3 py-2.5 rounded-xl border border-blue-400 bg-blue-50/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-800">
                    จุดเกิดเหตุ / สถานที่นัดหมาย:
                  </label>
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    disabled={isLocating}
                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{isLocating ? "กำลังดึงพิกัด..." : "📍 ดึงพิกัด GPS ปัจจุบัน"}</span>
                  </button>
                </div>

                <textarea
                  rows={2}
                  required
                  value={locationAddress}
                  onChange={(e) => setLocationAddress(e.target.value)}
                  placeholder="พิมพ์ระบุจุดเกิดเหตุ เช่น ถ.มิตรภาพ กม. 12 ขาเข้า หน้าปั๊ม ปตท."
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>

              {/* Order Summary Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-2">
                <div className="font-bold text-slate-800 border-b border-slate-200 pb-1.5">
                  สรุปรายละเอียดคำขอเรียกช่างฉุกเฉิน
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">บริการ:</span>
                  <span className="font-semibold text-slate-800">{currentServiceObj.nameTh}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">อาการเสีย:</span>
                  <span className="font-semibold text-slate-800">{selectedSymptom || customSymptom || "ไม่ระบุ"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">ยานพาหนะ:</span>
                  <span className="font-semibold text-slate-800">{vehicleType} {carBrand && `(${carBrand})`}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200 text-blue-700 font-bold">
                  <span>ค่าบริการประมาณการ:</span>
                  <span>{currentServiceObj.priceEstimate || "ประเมินตามจริงหน้างาน"}</span>
                </div>
              </div>
            </div>
          )}

          {/* SUCCESS STATE */}
          {orderSuccess && (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                  หมายเลขเคส: {createdOrderNumber}
                </span>
                <h4 className="text-xl font-bold text-slate-900 mt-2">
                  ส่งคำขอเรียกช่างเรียบร้อยแล้ว!
                </h4>
                <p className="text-xs md:text-sm text-slate-500 max-w-md mx-auto mt-1">
                  ระบบ FixNow กำลังประสานงานและส่งรายละเอียดให้ช่างที่อยู่ในรัศมีใกล้คุณที่สุด ช่างจะติดต่อกลับทางเบอร์โทรศัพท์ภายใน 5 นาที
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-left max-w-md mx-auto space-y-1.5">
                <div className="flex items-center gap-2 text-slate-700 font-semibold">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>เวลาเดินทางโดยประมาณ (ETA): 20 - 35 นาที</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 font-semibold">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>เบอร์ติดต่อฉุกเฉิน FixNow Center: {BRAND_CONFIG.hotlineDisplay}</span>
                </div>
              </div>

              <button
                onClick={resetAndClose}
                className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition shadow-md"
              >
                ปิดหน้าต่างนี้
              </button>
            </div>
          )}
        </div>

        {/* Wizard Footer Navigation */}
        {!orderSuccess && (
          <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => Math.max(1, prev - 1) as any)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition"
              >
                ย้อนกลับ
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => Math.min(4, prev + 1) as any)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition flex items-center gap-1 shadow-md shadow-blue-600/20"
              >
                <span>ถัดไป</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinishBooking}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs md:text-sm px-6 py-2.5 rounded-xl transition shadow-lg shadow-amber-500/30 flex items-center gap-1.5"
              >
                <span>{isSubmitting ? "กำลังส่งคำขอ..." : "🚀 ยืนยันการเรียกช่างฉุกเฉิน"}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
