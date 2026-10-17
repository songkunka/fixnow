"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Car, Bike, Truck, Wrench, Check, ArrowRight, ShieldCheck } from "lucide-react";
import BookingStepper from "@/components/booking/BookingStepper";
import { VEHICLE_CATEGORIES, getCategoryById, getSubServiceById } from "@/data/bookingServices";

const ICONS_MAP: Record<string, React.ElementType> = {
  Car,
  Bike,
  Truck,
  Wrench,
};

function VehicleContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryId = searchParams.get("category") || "repair";
  const serviceId = searchParams.get("service") || "";

  const selectedCategory = getCategoryById(categoryId);
  const selectedSubService = serviceId ? getSubServiceById(categoryId, serviceId) : null;

  // Auto-detect motorcycle category
  const initialCategory = categoryId === "motorcycle" ? "motorcycle" : "car";
  const [selectedMainCat, setSelectedMainCat] = useState<string>(initialCategory);
  const [selectedSubtype, setSelectedSubtype] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");

  const currentCategoryObj =
    VEHICLE_CATEGORIES.find((c) => c.id === selectedMainCat) || VEHICLE_CATEGORIES[0];

  const handleProceed = () => {
    const params = new URLSearchParams({
      category: categoryId,
      service: serviceId,
      vehicleType: selectedMainCat,
      subtype: selectedSubtype || currentCategoryObj.subtypes[0].id,
      brand: selectedBrand || currentCategoryObj.brands[0],
    });
    router.push(`/booking/detail?${params.toString()}`);
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 pb-28 md:pb-12 max-w-4xl mx-auto">
      {/* Step 3 Stepper */}
      <BookingStepper
        currentStep={3}
        title="เลือกประเภทยานพาหนะ"
        backHref={`/booking/service?category=${categoryId}`}
      />

      {/* Summary of Selected Service */}
      {selectedSubService && (
        <div className="bg-orange-50/80 border border-orange-200 rounded-2xl p-4 mb-6 flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider block">
              บริการที่เลือก
            </span>
            <span className="text-sm sm:text-base font-bold text-slate-900">
              {selectedSubService.name}
            </span>
          </div>
          <div className="text-right shrink-0">
            <span className="text-xs text-slate-500 block">ราคาเริ่มต้น</span>
            <span className="text-base sm:text-lg font-extrabold text-orange-600">
              {selectedSubService.priceFormatted}
            </span>
          </div>
        </div>
      )}

      {/* 1. Main Category Tabs */}
      <div className="mb-6">
        <label className="text-sm font-bold text-slate-900 block mb-3">
          1. ประเภทยานพาหนะหลัก
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {VEHICLE_CATEGORIES.map((cat) => {
            const Icon = ICONS_MAP[cat.iconName] || Car;
            const isSelected = selectedMainCat === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedMainCat(cat.id);
                  setSelectedSubtype("");
                }}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 text-center transition-all duration-200 active:scale-95 ${
                  isSelected
                    ? "border-orange-500 bg-orange-50/50 shadow-md ring-2 ring-orange-200"
                    : "border-slate-200 bg-white hover:border-orange-300"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition ${
                    isSelected
                      ? "bg-orange-500 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span
                  className={`text-xs sm:text-sm font-bold ${
                    isSelected ? "text-orange-600" : "text-slate-800"
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Sub-type Selection */}
      <div className="mb-6">
        <label className="text-sm font-bold text-slate-900 block mb-3">
          2. รูปแบบ / ประเภทย่อย
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentCategoryObj.subtypes.map((st) => {
            const isSelected =
              selectedSubtype === st.id ||
              (!selectedSubtype && st.id === currentCategoryObj.subtypes[0].id);

            return (
              <div
                key={st.id}
                onClick={() => setSelectedSubtype(st.id)}
                className={`p-3.5 sm:p-4 rounded-xl border-2 cursor-pointer transition flex items-center justify-between gap-3 active:scale-[0.99] ${
                  isSelected
                    ? "border-orange-500 bg-orange-50/40 shadow-sm"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div>
                  <h5 className="font-bold text-sm text-slate-900">{st.name}</h5>
                  {st.desc && (
                    <p className="text-xs text-slate-500 mt-0.5">{st.desc}</p>
                  )}
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    isSelected
                      ? "bg-orange-500 text-white"
                      : "border border-slate-300"
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Brand Selection */}
      <div className="mb-8">
        <label className="text-sm font-bold text-slate-900 block mb-3">
          3. ยี่ห้อรถ
        </label>
        <div className="flex flex-wrap gap-2">
          {currentCategoryObj.brands.map((brand) => {
            const isSelected =
              selectedBrand === brand ||
              (!selectedBrand && brand === currentCategoryObj.brands[0]);

            return (
              <button
                key={brand}
                type="button"
                onClick={() => setSelectedBrand(brand)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition active:scale-95 ${
                  isSelected
                    ? "bg-orange-500 text-white font-bold shadow-sm shadow-orange-500/20"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-orange-300"
                }`}
              >
                {brand}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sticky Bottom Next Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-slate-200 z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <span className="text-xs text-slate-500 block">เตรียมข้อมูล</span>
            <span className="text-sm font-bold text-slate-900">
              ขั้นตอนที่ 3 จาก 4
            </span>
          </div>
          <button
            onClick={handleProceed}
            className="w-full sm:w-auto sm:min-w-[240px] bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-orange-500/20 hover:from-orange-600 hover:to-orange-700 active:scale-[0.98] transition flex items-center justify-center gap-2 text-sm sm:text-base ml-auto"
          >
            <span>ถัดไป: ข้อมูล & สรุป</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BookingVehiclePage() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center text-slate-400">
          กำลังโหลดประเภทยานพาหนะ...
        </div>
      }
    >
      <VehicleContent />
    </Suspense>
  );
}
