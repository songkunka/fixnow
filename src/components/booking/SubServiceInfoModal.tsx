"use client";

import React, { useEffect } from "react";
import { X, CheckCircle2, ShieldCheck, FileText, ChevronRight } from "lucide-react";
import { SubService, getServiceTerms } from "@/data/bookingServices";

interface SubServiceInfoModalProps {
  service: SubService | null;
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (service: SubService) => void;
}

export default function SubServiceInfoModal({
  service,
  isOpen,
  onClose,
  onSelect,
}: SubServiceInfoModalProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !service) return null;

  // Retrieve exact terms for this service category
  const terms = getServiceTerms(service.category, service.id);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Click outside backdrop to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card - Styled matching 24carfix exactly */}
      <div className="relative w-full sm:max-w-xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[88vh] flex flex-col z-10 animate-in slide-in-from-bottom duration-300">
        {/* Sticky Header with Title and Close Button */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              เงื่อนไขการให้บริการ
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="ปิดหน้าต่าง"
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 flex items-center justify-center text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto py-5 pr-1 space-y-6 flex-1 text-slate-800">
          {/* Service Name & Price Bar */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50/40 border border-orange-200/80 rounded-2xl p-4 flex items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider block">
                บริการที่เลือก
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {service.name}
              </h3>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs text-slate-500 block">ราคาเริ่มต้น</span>
              <span className="text-xl sm:text-2xl font-black text-orange-600">
                {service.priceFormatted}
              </span>
            </div>
          </div>

          {/* Subtitle matching 24carfix */}
          <div>
            <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
              {terms.subtitle}
            </h4>
            {service.note && (
              <p className="text-xs text-slate-500 mt-1">
                {service.note}
              </p>
            )}
          </div>

          {/* Pricing Table (If available, e.g. for slide_car / towing) */}
          {terms.pricingTable && terms.pricingTable.length > 0 && (
            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 text-xs font-bold text-slate-700">
                ตารางประมาณการอัตราค่าบริการตามระยะทาง
              </div>
              <div className="divide-y divide-slate-100 text-xs">
                {terms.pricingTable.map((tier, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2.5 flex items-center justify-between hover:bg-slate-50/60 transition"
                  >
                    <span className="text-slate-700 font-medium">
                      {tier.distance} {tier.note && <span className="text-slate-400 text-[11px]">({tier.note})</span>}
                    </span>
                    <span className="font-bold text-orange-600">
                      {tier.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Numbered Terms List (Matching 24carfix 100%) */}
          <div className="space-y-4 text-xs sm:text-sm">
            {terms.items.map((item) => (
              <div key={item.number} className="space-y-1">
                <div className="font-bold text-slate-900 flex items-start gap-1.5">
                  <span className="text-slate-500">{item.number}.</span>
                  <span>{item.title}</span>
                </div>
                <p className="text-slate-600 pl-4 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Included / Excluded Quick Checklist if defined */}
          {service.included && service.included.length > 0 && (
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2">
              <h5 className="text-xs font-bold text-slate-700">
                สรุปขอบเขตงานที่รวมในค่าบริการนี้:
              </h5>
              <div className="space-y-1.5">
                {service.included.map((inc, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer acceptance note (exact wording from 24carfix) */}
          <div className="pt-2">
            <p className="text-xs text-slate-500 italic leading-relaxed border-t border-slate-100 pt-3">
              {terms.footerNote}
            </p>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="pt-4 border-t border-slate-100 flex gap-3 shrink-0">
          {onSelect ? (
            <button
              onClick={() => {
                onSelect(service);
                onClose();
              }}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-orange-500/20 hover:from-orange-600 hover:to-orange-700 active:scale-[0.98] transition text-center text-sm"
            >
              เลือกบริการนี้ ({service.priceFormatted})
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex-1 bg-slate-900 text-white font-bold py-3.5 px-6 rounded-2xl hover:bg-slate-800 active:scale-[0.98] transition text-center text-sm"
            >
              เข้าใจและยอมรับเงื่อนไข
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
