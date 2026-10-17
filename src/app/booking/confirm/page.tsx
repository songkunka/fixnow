"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  CheckCircle2,
  PhoneCall,
  Clock,
  MapPin,
  ArrowLeft,
  Navigation,
  ShieldCheck,
  Star,
  Car,
  AlertTriangle,
  X,
  Phone,
  Home,
  FileText,
  RotateCcw,
} from "lucide-react";
import { BRAND_CONFIG } from "@/config/branding";

interface BookingRecord {
  orderId: string;
  createdAt: string;
  category: string;
  service: string;
  priceFormatted: string;
  vehicleType: string;
  subtype: string;
  brand: string;
  licensePlate: string;
  phone: string;
  address: string;
  lat: number;
  lng: number;
  symptoms?: string;
  paymentMethod: string;
  status: string;
}

function ConfirmContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderIdParam = searchParams.get("orderId") || "";

  // Booking Data
  const [booking, setBooking] = useState<BookingRecord | null>(null);
  const [orderNumber, setOrderNumber] = useState<string>(() => orderIdParam || `FN-${Date.now().toString(36).toUpperCase()}`);

  // Flow Phases: "searching" -> "matched"
  const [phase, setPhase] = useState<"searching" | "matched">("searching");

  // Countdown timer: 15 minutes (900 seconds)
  const [secondsRemaining, setSecondsRemaining] = useState(900);

  // Cancellation modal
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  // Map Refs
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const techMarkerRef = useRef<any>(null);

  // Load saved booking from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("fixnow_latest_booking");
        if (raw) {
          const parsed = JSON.parse(raw);
          setBooking(parsed);
          if (parsed.orderId) setOrderNumber(parsed.orderId);
        }
      } catch (err) {
        console.error("Failed to load booking record:", err);
      }
    }
  }, []);

  // Searching Radar Timer -> Switch to Matched after 3.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("matched");
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  // ETA Countdown
  useEffect(() => {
    if (phase !== "matched" || isCancelled) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, isCancelled]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Coordinates
  const userLat = booking?.lat || 13.7563;
  const userLng = booking?.lng || 100.5018;

  // Initialize Interactive Map when matched
  useEffect(() => {
    if (phase !== "matched" || isCancelled || !mapContainerRef.current) return;

    let isMounted = true;

    // Load Leaflet CSS
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    const initMap = async () => {
      const getL = () =>
        new Promise<any>((resolve) => {
          if ((window as any).L) return resolve((window as any).L);
          const existing = document.getElementById("leaflet-js");
          if (existing) {
            existing.addEventListener("load", () => resolve((window as any).L));
            return;
          }
          const s = document.createElement("script");
          s.id = "leaflet-js";
          s.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
          s.async = true;
          s.onload = () => resolve((window as any).L);
          document.head.appendChild(s);
        });

      const L = await getL();
      if (!isMounted || !mapContainerRef.current || !L) return;

      // Clean old instance
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Initial technician location (approx 1.8km away)
      const techStartLat = userLat + 0.012;
      const techStartLng = userLng + 0.014;

      const map = L.map(mapContainerRef.current, {
        center: [(userLat + techStartLat) / 2, (userLng + techStartLng) / 2],
        zoom: 14,
        zoomControl: false,
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      // OpenStreetMap Tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(map);

      // User Pin (Custom pulsing orange marker)
      const userIcon = L.divIcon({
        className: "custom-user-pin",
        html: `
          <div class="relative flex items-center justify-center">
            <span class="absolute w-8 h-8 rounded-full bg-orange-500/30 animate-ping"></span>
            <span class="w-5 h-5 rounded-full bg-orange-600 border-2 border-white shadow-md flex items-center justify-center text-white text-[10px] font-bold">📍</span>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      L.marker([userLat, userLng], { icon: userIcon })
        .addTo(map)
        .bindPopup("<b>ตำแหน่งของคุณ</b><br/>จุดนัดพบช่าง", { autoClose: false })
        .openPopup();

      // Technician Pin (Custom truck marker)
      const techIcon = L.divIcon({
        className: "custom-tech-pin",
        html: `
          <div class="relative flex items-center justify-center bg-slate-900 border-2 border-orange-500 rounded-full w-10 h-10 shadow-lg text-white">
            <span class="text-lg">🚗</span>
            <span class="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></span>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      const techMarker = L.marker([techStartLat, techStartLng], { icon: techIcon })
        .addTo(map)
        .bindPopup("<b>ช่างก้อง (KONG-01)</b><br/>กำลังเดินทางมาหาคุณ");

      techMarkerRef.current = techMarker;

      // Polyline route connecting them
      const routeLine = L.polyline(
        [
          [techStartLat, techStartLng],
          [userLat + 0.006, userLng + 0.007],
          [userLat, userLng],
        ],
        {
          color: "#FF5A18",
          weight: 4,
          opacity: 0.8,
          dashArray: "8, 8",
        }
      ).addTo(map);

      // Fit bounds
      map.fitBounds(routeLine.getBounds(), { padding: [40, 40] });
    };

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [phase, isCancelled, userLat, userLng]);

  const handleConfirmCancel = () => {
    setIsCancelled(true);
    setShowCancelModal(false);
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 pb-28 md:pb-12 max-w-3xl mx-auto">
      {/* CANCELLATION STATE */}
      {isCancelled ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-lg my-8">
          <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-600">
            <X className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            ยกเลิกคำขอเรียบร้อยแล้ว
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            คำขอหมายเลข <strong className="font-mono text-slate-800">{orderNumber}</strong> ได้ถูกยกเลิกแล้ว
            ไม่มีค่าใช้จ่ายใดๆ ทั้งสิ้น
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/booking"
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition text-sm flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              เรียกช่างใหม่อีกครั้ง
            </Link>
            <Link
              href="/"
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition text-sm flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              กลับหน้าหลัก
            </Link>
          </div>
        </div>
      ) : phase === "searching" ? (
        /* PHASE 1: SEARCHING RADAR ANIMATION (3-4 Seconds) */
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center shadow-lg my-8 flex flex-col items-center justify-center min-h-[460px]">
          {/* Radar Circles */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center mb-8">
            <div className="absolute inset-0 rounded-full bg-orange-500/10 animate-ping duration-1000" />
            <div className="absolute inset-4 rounded-full bg-orange-500/20 animate-pulse duration-700" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-orange-500 to-orange-600 text-white flex items-center justify-center shadow-xl shadow-orange-500/30">
              <Navigation className="w-8 h-8 animate-spin duration-3000" />
            </div>
          </div>

          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest px-3 py-1 rounded-full bg-orange-50 border border-orange-200 mb-2">
            กำลังประมวลผลคำขอ
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
            กำลังค้นหาช่างที่อยู่ใกล้คุณที่สุด...
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
            ระบบ FixNow กำลังจับคู่ช่างผู้เชี่ยวชาญในรัศมีใกล้เคียง พร้อมตรวจสอบอุปกรณ์และเครื่องมือให้ตรงกับประเภทรถของคุณ
          </p>

          <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-600">
            <span>หมายเลขคำขอ:</span>
            <strong className="font-mono text-slate-900">{orderNumber}</strong>
          </div>
        </div>
      ) : (
        /* PHASE 2: TECHNICIAN MATCHED & LIVE TRACKING (Grab-like) */
        <div className="space-y-6">
          {/* Header Status Card */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-3xl p-6 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                ช่างรับงานแล้ว
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                ช่างก้องกำลังเดินทางมาหาคุณ
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 mt-1">
                กรุณารอรับสายโทรศัพท์ ช่างจะโทรยืนยันตำแหน่งก่อนถึงจุดเกิดเหตุ
              </p>
            </div>

            {/* ETA Countdown Badge */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center shrink-0 min-w-[130px]">
              <span className="text-[11px] font-medium text-emerald-100 block">
                เวลาที่คาดว่าจะถึง (ETA)
              </span>
              <span className="text-3xl font-black font-mono tracking-tight block text-white mt-0.5 tabular-nums">
                {formatTimer(secondsRemaining)}
              </span>
              <span className="text-[10px] text-emerald-200">
                (ประมาณ 15 นาที)
              </span>
            </div>
          </div>

          {/* Interactive Map Section */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>แผนที่ติดตามตำแหน่งช่างสด (Live Tracking)</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                สัญญาณ GPS เชื่อมต่อแล้ว
              </span>
            </div>

            {/* Leaflet Map Container */}
            <div
              ref={mapContainerRef}
              className="w-full h-64 sm:h-80 bg-slate-100 relative z-0"
            />

            <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <span className="truncate pr-2">
                📍 <strong>จุดนัดหมาย:</strong> {booking?.address || "ตำแหน่งปักหมุดปัจจุบัน"}
              </span>
              <span className="shrink-0 font-semibold text-orange-600">
                ระยะทาง ~1.8 กม.
              </span>
            </div>
          </div>

          {/* Technician Profile Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-5">
              {/* Technician Avatar */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-2xl shadow-md border-2 border-orange-500 shrink-0">
                <span>ก้อง</span>
                <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white">
                  ✓
                </span>
              </div>

              {/* Technician Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 truncate">
                    ช่างก้อง (สุทธิพงษ์)
                  </h3>
                  <span className="px-2 py-0.5 rounded-md bg-orange-100 text-orange-700 text-[10px] font-bold shrink-0">
                    KONG-01
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  ช่างซ่อมฉุกเฉินและช่วยเหลือยานยนต์ชำนาญการ (FixNow Pro)
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs">
                  <span className="flex items-center gap-1 font-bold text-amber-600">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    4.9 (148 รีวิว)
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-600 flex items-center gap-1">
                    <Car className="w-3.5 h-3.5 text-slate-400" />
                    กระบะตรวจการณ์ (1กข 8829 ขอนแก่น)
                  </span>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href="tel:0812345678"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 active:scale-[0.98] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-orange-500/20 transition flex items-center justify-center gap-2 text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>โทรตรงหาช่างก้อง (081-234-5678)</span>
              </a>

              <a
                href={`tel:${BRAND_CONFIG.hotline.replace(/-/g, "")}`}
                className="w-full bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-bold py-3.5 px-4 rounded-xl transition flex items-center justify-center gap-2 text-sm"
              >
                <PhoneCall className="w-4 h-4" />
                <span>โทรศูนย์ฉุกเฉิน 24 ชม.</span>
              </a>
            </div>
          </div>

          {/* Booking Summary Details */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
              <span>รายละเอียดคำขอรับบริการ</span>
              <span className="font-mono text-xs text-slate-500">
                {orderNumber}
              </span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div>
                <span className="text-slate-400 block text-[11px]">บริการ:</span>
                <span className="font-bold text-slate-800">
                  {booking?.service || "เรียกช่างฉุกเฉินนอกสถานที่"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">ยานพาหนะ:</span>
                <span className="font-bold text-slate-800">
                  {booking?.vehicleType || "รถยนต์"} ({booking?.brand || "ไม่ระบุยี่ห้อ"})
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">เบอร์ติดต่อของคุณ:</span>
                <span className="font-bold text-slate-800 font-mono tabular-nums">
                  {booking?.phone || "-"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">วิธีชำระเงิน:</span>
                <span className="font-bold text-emerald-600">
                  ชำระเงินหน้างาน (<span className="tabular-nums">{booking?.priceFormatted || "฿850"}</span>)
                </span>
              </div>
            </div>

            {/* Cancel Button */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowCancelModal(true)}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 active:scale-95 transition"
              >
                ยกเลิกคำขอรับบริการ
              </button>

              <Link
                href="/dashboard/orders"
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5" />
                ดูในประวัติคำสั่งซื้อ
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* CANCEL CONFIRMATION MODAL */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl text-center animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              ต้องการยกเลิกคำขอจริงหรือไม่?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
              ช่างก้องกำลังเดินทางมาหาคุณ หากมีข้อสงสัยหรือต้องการเปลี่ยนจุดนัดหมาย สามารถกดโทรคุยกับช่างได้โดยตรง
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition"
              >
                ไม่ยกเลิก
              </button>
              <button
                onClick={handleConfirmCancel}
                className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-sm transition"
              >
                ยืนยันยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookingConfirmPage() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center text-slate-400">
          กำลังโหลดข้อมูลสถานะ...
        </div>
      }
    >
      <ConfirmContent />
    </Suspense>
  );
}
