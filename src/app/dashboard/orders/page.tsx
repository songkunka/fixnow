"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ClipboardList, Clock, CheckCircle2, AlertTriangle, XCircle, Wrench, MapPin, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";

interface Booking {
  id: string;
  service_type: string;
  vehicle_type: string;
  status: "pending" | "accepted" | "in_progress" | "completed" | "cancelled";
  address: string;
  phone: string;
  symptoms: string | null;
  created_at: string;
}

const STATUS_MAP: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: "รอช่างรับงาน", color: "bg-amber-100 text-amber-700", icon: Clock },
  accepted: { label: "ช่างรับงานแล้ว", color: "bg-blue-100 text-blue-700", icon: AlertTriangle },
  in_progress: { label: "กำลังดำเนินการ", color: "bg-indigo-100 text-indigo-700", icon: Wrench },
  completed: { label: "เสร็จสิ้น", color: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
  cancelled: { label: "ยกเลิก", color: "bg-red-100 text-red-700", icon: XCircle },
};

export default function OrdersPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      let localBookings: Booking[] = [];
      if (typeof window !== "undefined") {
        try {
          const raw = localStorage.getItem("fixnow_booking_history");
          if (raw) {
            const parsed = JSON.parse(raw);
            localBookings = parsed.map((item: any, idx: number) => ({
              id: item.orderId || `order-${idx + 1}`,
              service_type: item.service || item.category || "เรียกช่างฉุกเฉิน",
              vehicle_type: `${item.vehicleType || "รถยนต์"} (${item.brand || "ทั่วไป"})`,
              status: item.status === "searching" ? "accepted" : (item.status || "accepted"),
              address: item.address || "ตำแหน่งปักหมุด",
              phone: item.phone || "-",
              symptoms: item.symptoms || null,
              created_at: item.createdAt || new Date().toISOString(),
            }));
          }
        } catch (e) {
          console.error("Failed to load local booking history:", e);
        }
      }

      if (user) {
        try {
          const supabase = createClient();
          const { data } = await supabase
            .from("bookings")
            .select("*")
            .eq("customer_id", user.id)
            .order("created_at", { ascending: false });

          if (data && data.length > 0) {
            setBookings(data as Booking[]);
            setIsLoading(false);
            return;
          }
        } catch (err) {
          console.error("Supabase error:", err);
        }
      }

      setBookings(localBookings);
      setIsLoading(false);
    };

    fetchBookings();
  }, [user]);

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
        <ClipboardList className="w-6 h-6 text-orange-600" />
        ประวัติการจอง
      </h1>

      {isLoading ? (
        <div className="text-center py-16">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500">กำลังโหลดข้อมูล...</p>
        </div>
      ) : bookings.length === 0 ? (
        /* Functional Standard Empty State */
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-md mx-auto">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <ClipboardList className="w-6 h-6 text-slate-400" />
          </div>
          <h3 className="font-bold text-slate-800 text-base mb-1">ยังไม่มีรายการเรียกช่าง</h3>
          <p className="text-xs text-slate-500 mb-5">
            เมื่อคุณส่งคำขอเรียกช่างฉุกเฉิน รายการจะถูกบันทึกและแสดงที่นี่
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 active:scale-95 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md shadow-orange-500/20 transition"
          >
            <Wrench className="w-4 h-4" />
            เรียกช่างฉุกเฉิน
          </Link>
        </div>
      ) : (
        /* Bookings List */
        <div className="space-y-3">
          {bookings.map((booking) => {
            const status = STATUS_MAP[booking.status] || STATUS_MAP.pending;
            const StatusIcon = status.icon;
            return (
              <div key={booking.id} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">{booking.service_type}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{booking.vehicle_type}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${status.color}`}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    {status.label}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{booking.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span className="tabular-nums">{new Date(booking.created_at).toLocaleString("th-TH")}</span>
                  </div>
                  {booking.symptoms && (
                    <p className="text-slate-500 mt-1">อาการ: {booking.symptoms}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
