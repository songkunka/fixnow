"use client";

import React, { useState } from "react";
import { MapPin, X, Loader2 } from "lucide-react";

interface LocationPermissionModalProps {
  isOpen: boolean;
  onAllow: (remember: boolean) => Promise<void> | void;
  onDeny: () => void;
  onClose?: () => void;
  isLocating?: boolean;
}

export default function LocationPermissionModal({
  isOpen,
  onAllow,
  onDeny,
  onClose,
  isLocating = false,
}: LocationPermissionModalProps) {
  const [loadingType, setLoadingType] = useState<"always" | "once" | null>(null);

  if (!isOpen) return null;

  const handleAllowClick = async (remember: boolean, type: "always" | "once") => {
    setLoadingType(type);
    try {
      await onAllow(remember);
    } finally {
      setLoadingType(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-[#1e1e24] text-white rounded-3xl p-6 shadow-2xl border border-white/10 animate-in fade-in zoom-in-95 duration-200 relative select-none">
        {/* Header with Close X */}
        <div className="flex items-start justify-between mb-4">
          <div className="pr-4">
            <h3 className="font-bold text-base text-white">
              fixnow.co.th ต้องการที่จะ
            </h3>
            <div className="flex items-center gap-2 mt-2 text-slate-300 text-sm font-semibold">
              <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
              <span>ทราบตำแหน่งของคุณ</span>
            </div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              เพื่อค้นหาช่างที่อยู่ใกล้คุณที่สุดและประเมินระยะทางอย่างแม่นยำ
            </p>
          </div>
          <button
            onClick={onClose || onDeny}
            disabled={isLocating || loadingType !== null}
            className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
            aria-label="ปิด"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Buttons matching 24carfix prompt */}
        <div className="space-y-2.5 mt-5">
          {/* Option 1: Allow while visiting site */}
          <button
            onClick={() => handleAllowClick(true, "always")}
            disabled={isLocating || loadingType !== null}
            className="w-full py-3 px-4 rounded-full bg-[#5b326a] hover:bg-[#6c3b7e] active:scale-[0.98] text-white font-semibold text-sm transition text-center shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loadingType === "always" || (isLocating && loadingType === null) ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>กำลังระบุตำแหน่ง...</span>
              </>
            ) : (
              <span>อนุญาตขณะเข้าชมเว็บไซต์</span>
            )}
          </button>

          {/* Option 2: Allow once */}
          <button
            onClick={() => handleAllowClick(false, "once")}
            disabled={isLocating || loadingType !== null}
            className="w-full py-3 px-4 rounded-full bg-[#5b326a]/90 hover:bg-[#6c3b7e] active:scale-[0.98] text-white font-semibold text-sm transition text-center flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loadingType === "once" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>กำลังระบุตำแหน่ง...</span>
              </>
            ) : (
              <span>อนุญาตในครั้งนี้</span>
            )}
          </button>

          {/* Option 3: Deny */}
          <button
            onClick={onDeny}
            disabled={isLocating || loadingType !== null}
            className="w-full py-3 px-4 rounded-full bg-[#5b326a]/50 hover:bg-[#5b326a]/70 active:scale-[0.98] text-slate-300 font-semibold text-sm transition text-center disabled:opacity-60"
          >
            ไม่อนุญาต
          </button>
        </div>
      </div>
    </div>
  );
}
