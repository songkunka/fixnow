"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Info, ArrowRight, ShieldCheck, Check } from "lucide-react";
import { getCategoryById, SubService, SERVICE_CATEGORIES } from "@/data/bookingServices";
import BookingStepper from "@/components/booking/BookingStepper";
import SubServiceInfoModal from "@/components/booking/SubServiceInfoModal";

function BookingServiceContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryId = searchParams.get("category") || "repair";

  const category = getCategoryById(categoryId) || SERVICE_CATEGORIES[0];
  const [selectedService, setSelectedService] = useState<SubService | null>(null);
  const [infoModalService, setInfoModalService] = useState<SubService | null>(null);

  const handleSelectService = (service: SubService) => {
    setSelectedService(service);
    // Proceed to Step 3: Vehicle Selection
    router.push(`/booking/vehicle?category=${category.id}&service=${service.id}`);
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 pb-24 md:pb-12 max-w-4xl mx-auto">
      {/* Step 2 Stepper */}
      <BookingStepper
        currentStep={2}
        title="เลือกบริการย่อย"
        backHref="/booking"
      />

      {/* Selected Category Header Banner */}
      <div className="bg-gradient-to-r from-orange-50 via-white to-orange-50/30 border border-orange-200/80 rounded-2xl p-4 sm:p-5 mb-6 flex items-center gap-4">
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 bg-white rounded-xl p-1 shadow-sm border border-orange-100">
          <Image
            src={category.icon}
            alt={category.name}
            fill
            sizes="64px"
            className="object-contain p-1"
          />
        </div>
        <div>
          <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider">
            หมวดหมู่ที่เลือก
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            {category.name}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">{category.sub}</p>
        </div>
      </div>

      {/* Section Instruction */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm sm:text-base font-bold text-slate-900">
          รายการบริการ ({category.subServices.length} รายการ)
        </h3>
        <span className="text-xs text-slate-500 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          ราคามาตรฐาน ชำระหน้างาน
        </span>
      </div>

      {/* Sub-services List */}
      <div className="space-y-3">
        {category.subServices.map((service) => {
          const isSelected = selectedService?.id === service.id;

          return (
            <div
              key={service.id}
              onClick={() => handleSelectService(service)}
              className={`group relative rounded-2xl border-2 p-4 sm:p-5 transition-all duration-200 cursor-pointer active:scale-[0.99] flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 ${
                isSelected
                  ? "border-orange-500 bg-orange-50/40 shadow-md ring-2 ring-orange-200"
                  : "border-slate-200 bg-white hover:border-orange-400 hover:shadow-md"
              }`}
            >
              {/* Left Info */}
              <div className="flex-1 pr-2">
                <div className="flex items-start gap-2">
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-orange-600 transition-colors">
                    {service.name}
                  </h4>
                  {/* Info Modal Trigger Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setInfoModalService(service);
                    }}
                    aria-label="ดูรายละเอียดบริการ"
                    className="p-1 rounded-full text-slate-400 hover:text-orange-600 hover:bg-orange-50 active:scale-95 transition shrink-0"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>

                {/* Service Note */}
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {service.note}
                </p>
              </div>

              {/* Right: Price & Action */}
              <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
                <div className="text-left sm:text-right">
                  <span className="text-xs text-slate-400 block font-normal">
                    ราคาเริ่มต้น
                  </span>
                  <span className="text-lg sm:text-xl font-extrabold text-orange-600 tracking-tight">
                    {service.priceFormatted}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectService(service);
                  }}
                  className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-sm shadow-orange-500/20"
                >
                  <span>เลือก</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      <SubServiceInfoModal
        service={infoModalService}
        isOpen={!!infoModalService}
        onClose={() => setInfoModalService(null)}
        onSelect={(srv) => handleSelectService(srv)}
      />
    </div>
  );
}

export default function BookingServicePage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-slate-500">
          กำลังโหลดรายการบริการ...
        </div>
      }
    >
      <BookingServiceContent />
    </Suspense>
  );
}
