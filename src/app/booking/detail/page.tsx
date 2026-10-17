"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import {
  MapPin,
  Phone,
  Car,
  FileText,
  ShieldCheck,
  Check,
  Navigation,
  Banknote,
  QrCode,
  ArrowRight,
  AlertCircle,
  Loader2,
} from "lucide-react";
import BookingStepper from "@/components/booking/BookingStepper";
import {
  getCategoryById,
  getSubServiceById,
  VEHICLE_CATEGORIES,
} from "@/data/bookingServices";
import { useUserLocation } from "@/contexts/LocationContext";

function DetailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryId = searchParams.get("category") || "repair";
  const serviceId = searchParams.get("service") || "";
  const vehicleType = searchParams.get("vehicleType") || "car";
  const subtypeId = searchParams.get("subtype") || "";
  const brandParam = searchParams.get("brand") || "";

  const category = getCategoryById(categoryId);
  const subService = serviceId ? getSubServiceById(categoryId, serviceId) : null;
  const vehicleCategory = VEHICLE_CATEGORIES.find((v) => v.id === vehicleType);
  const subtypeObj = vehicleCategory?.subtypes.find((s) => s.id === subtypeId);

  // User location from context
  const { location, requestCurrentLocation, isRequestingLocation } = useUserLocation();

  // Form State
  const [phone, setPhone] = useState("");
  const [carBrand, setCarBrand] = useState(brandParam || "");
  const [licensePlate, setLicensePlate] = useState("");
  const [address, setAddress] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  // Sync address from LocationContext if available
  useEffect(() => {
    if (location?.address && !address) {
      setAddress(location.address);
    }
  }, [location?.address, address]);

  const handleFetchGps = async () => {
    try {
      const loc = await requestCurrentLocation();
      if (loc && loc.address) {
        setAddress(loc.address);
      }
    } catch {
      // fallback
    }
  };

  const validatePhone = (val: string) => {
    const clean = val.replace(/\D/g, "");
    if (clean.length > 0 && (clean.length < 9 || clean.length > 10)) {
      setPhoneError("กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (9-10 หลัก)");
    } else {
      setPhoneError("");
    }
  };

  const isFormValid =
    phone.replace(/\D/g, "").length >= 9 &&
    address.trim().length > 3 &&
    !isSubmitting;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);

    const orderId = `FN-${Date.now().toString(36).toUpperCase()}`;
    const orderData = {
      orderId,
      createdAt: new Date().toISOString(),
      category: category?.name || "ช่างซ่อมฉุกเฉิน",
      categoryId,
      service: subService?.name || "เรียกช่างด่วน",
      serviceId,
      price: subService?.price || 850,
      priceFormatted: subService?.priceFormatted || "฿850",
      vehicleType: vehicleCategory?.name || "รถยนต์",
      subtype: subtypeObj?.name || "ทั่วไป",
      brand: carBrand || brandParam || "ไม่ระบุ",
      licensePlate: licensePlate || "ไม่ระบุ",
      phone,
      address,
      lat: location?.lat || 13.7563,
      lng: location?.lng || 100.5018,
      symptoms,
      paymentMethod: "onsite", // Pay Onsite with technician
      status: "searching", // live status starts searching
    };

    // Store in localStorage for prototype demonstration & persistence
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("fixnow_latest_booking", JSON.stringify(orderData));
        const historyStr = localStorage.getItem("fixnow_booking_history") || "[]";
        const history = JSON.parse(historyStr);
        history.unshift(orderData);
        localStorage.setItem("fixnow_booking_history", JSON.stringify(history.slice(0, 10)));
      } catch (err) {
        console.error("Storage error:", err);
      }
    }

    // Redirect to Live Status & ETA page
    router.push(`/booking/confirm?orderId=${orderId}`);
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 pb-28 md:pb-12 max-w-4xl mx-auto">
      {/* Step 4 Stepper */}
      <BookingStepper
        currentStep={4}
        title="ยืนยันข้อมูลก่อนเรียกช่าง"
        backHref={`/booking/vehicle?category=${categoryId}&service=${serviceId}`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Details (7 cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
          {/* 1. Location & Pin */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500" />
                สถานที่เกิดเหตุ / ตำแหน่งปักหมุด <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={handleFetchGps}
                disabled={isRequestingLocation}
                className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1 active:scale-95 disabled:opacity-50"
              >
                {isRequestingLocation ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Navigation className="w-3.5 h-3.5" />
                )}
                <span>ดึงพิกัดปัจจุบัน</span>
              </button>
            </div>

            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="ระบุสถานที่ หรือจุดสังเกต เช่น ริมถนนมิตรภาพ หน้าปั๊ม ปตท."
              rows={3}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-sm leading-relaxed transition resize-none"
            />
            {location?.isRealGps && (
              <p className="text-[11px] text-emerald-600 font-medium mt-1.5 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                ระบุตำแหน่งด้วยพิกัด GPS จริงเรียบร้อยแล้ว
              </p>
            )}
          </div>

          {/* 2. Contact Phone */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <label className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
              <Phone className="w-4 h-4 text-orange-500" />
              เบอร์โทรศัพท์สำหรับช่างติดต่อกลับ <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                validatePhone(e.target.value);
              }}
              placeholder="08X-XXX-XXXX"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-base font-medium tracking-wide transition"
            />
            {phoneError && (
              <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {phoneError}
              </p>
            )}
            <p className="text-xs text-slate-400 mt-1.5">
              ช่างก้องจะโทรติดต่อเพื่อยืนยันพิกัดก่อนออกเดินทาง
            </p>
          </div>

          {/* 3. Vehicle & Symptoms Information */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Car className="w-4 h-4 text-orange-500" />
              ข้อมูลยานพาหนะ & อาการเสีย
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  ยี่ห้อ / รุ่น
                </label>
                <input
                  type="text"
                  value={carBrand}
                  onChange={(e) => setCarBrand(e.target.value)}
                  placeholder="เช่น Toyota Yaris Ativ"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 text-sm outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  ทะเบียนรถ (ถ้ามี)
                </label>
                <input
                  type="text"
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value)}
                  placeholder="เช่น 3กข 1234 กทม."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 text-sm outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                อาการเบื้องต้นเพิ่มเติม (ถ้ามี)
              </label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="เช่น รถจอดขวางหน้าบ้าน, สตาร์ทมีเสียงแชะๆ, ยางล้อหน้าขวาแบนสนิท"
                rows={2}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 text-sm outline-none transition resize-none"
              />
            </div>
          </div>

          {/* 4. Payment Method - Prototype Decision: Single Onsite Option */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center justify-between">
              <span>วิธีชำระเงิน</span>
              <span className="text-[11px] font-normal px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                จ่ายเมื่อซ่อมเสร็จ
              </span>
            </h3>

            <div className="rounded-2xl border-2 border-orange-500 bg-orange-50/50 p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-orange-500/30">
                <Banknote className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">
                    ชำระเงินหน้างานกับช่าง
                  </h4>
                  <span className="text-xs font-bold text-orange-600">
                    แนะนำ
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  ชำระด้วยเงินสด หรือสแกน QR PromptPay กับช่างโดยตรงหลังตรวจเช็คหรือซ่อมเสร็จสิ้นหน้างาน
                </p>
                <div className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  ไม่ต้องชำระล่วงหน้า ตรวจสอบราคาก่อนเริ่มงานทุกครั้ง
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Right Column: Order Summary & Confirmation Button (5 cols) */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm sticky top-24 space-y-5">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              สรุปรายการคำขอ
            </h3>

            {/* Service & Price */}
            <div className="space-y-3 text-sm">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-xs text-orange-600 font-semibold block">
                    {category?.name || "หมวดหมู่บริการ"}
                  </span>
                  <span className="font-bold text-slate-900">
                    {subService?.name || "บริการด่วน"}
                  </span>
                </div>
                <span className="text-base font-extrabold text-orange-600 shrink-0">
                  {subService?.priceFormatted || "฿850"}
                </span>
              </div>

              {/* Vehicle specs */}
              <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span>ประเภทยานพาหนะ:</span>
                  <span className="font-semibold text-slate-800">
                    {vehicleCategory?.name || "รถยนต์"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>รูปแบบ:</span>
                  <span className="font-semibold text-slate-800">
                    {subtypeObj?.name || "ทั่วไป"}
                  </span>
                </div>
                {carBrand && (
                  <div className="flex justify-between">
                    <span>ยี่ห้อ:</span>
                    <span className="font-semibold text-slate-800">
                      {carBrand}
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-100 pt-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-bold text-slate-900">
                    ยอดประเมินเบื้องต้น
                  </span>
                  <span className="text-2xl font-extrabold text-orange-600">
                    {subService?.priceFormatted || "฿850"}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  *ยังไม่รวมค่าอะไหล่ใหม่ (ช่างจะแจ้งราคาก่อนซ่อม)
                </p>
              </div>
            </div>

            {/* Submit Action Button */}
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-base transition flex items-center justify-center gap-2 shadow-lg ${
                isFormValid
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-orange-500/25 active:scale-[0.98]"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>กำลังส่งคำขอเรียกช่าง...</span>
                </>
              ) : (
                <>
                  <span>ยืนยันเรียกช่างด่วน</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-slate-400 leading-tight">
              การกดยืนยันเป็นการแจ้งความประสงค์ขอรับบริการ ช่างจะโทรยืนยันก่อนเดินทาง
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center text-slate-400">
          กำลังโหลดรายละเอียด...
        </div>
      }
    >
      <DetailContent />
    </Suspense>
  );
}
