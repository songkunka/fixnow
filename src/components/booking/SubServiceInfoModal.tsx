"use client";

import React, { useEffect } from "react";
import { X, CheckCircle2, XCircle, AlertCircle, ShieldCheck } from "lucide-react";
import { SubService } from "@/data/bookingServices";

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

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto z-10 animate-in slide-in-from-bottom duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="ปิดหน้าต่าง"
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 flex items-center justify-center text-slate-500 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pr-10 mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            รายละเอียดบริการและราคา
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {service.name}
          </h2>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-orange-500">
              {service.priceFormatted}
            </span>
            <span className="text-xs text-slate-500 font-normal">
              (ราคาเริ่มต้น / ค่าบริการเบื้องต้น)
            </span>
          </div>
        </div>

        {/* Note Box */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-6">
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            <strong className="text-slate-900">หมายเหตุ: </strong>
            {service.note}
          </p>
        </div>

        {/* Included List */}
        {service.included && service.included.length > 0 && (
          <div className="mb-5">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
              บริการที่ครอบคลุม
            </h4>
            <div className="space-y-2">
              {service.included.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Excluded List */}
        {service.excluded && service.excluded.length > 0 && (
          <div className="mb-5">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
              ค่าใช้จ่ายที่ยังไม่รวม
            </h4>
            <div className="space-y-2">
              {service.excluded.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Warning / Important note */}
        {service.warning && (
          <div className="mb-6 p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-relaxed font-medium">
              {service.warning}
            </p>
          </div>
        )}

        {/* Bottom CTA Actions */}
        <div className="flex gap-3 pt-2">
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
              เข้าใจแล้ว
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
