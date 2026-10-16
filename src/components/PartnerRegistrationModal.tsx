"use client";

import React, { useState } from "react";
import { X, Check, ShieldCheck, Upload, AlertCircle, Wrench, Building2, MapPin } from "lucide-react";

interface PartnerRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PartnerRegistrationModal({
  isOpen,
  onClose,
}: PartnerRegistrationModalProps) {
  const [fullName, setFullName] = useState("");
  const [garageName, setGarageName] = useState("");
  const [phone, setPhone] = useState("");
  const [idCardNumber, setIdCardNumber] = useState("");
  const [province, setProvince] = useState("กรุงเทพมหานคร");
  const [serviceRadius, setServiceRadius] = useState("25");
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["repair", "battery"]);
  const [bankAccount, setBankAccount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-amber-400 font-semibold tracking-wide uppercase">
                FixNow Partner Network
              </div>
              <h3 className="font-bold text-base md:text-lg">
                สมัครเป็นช่าง / อู่พันธมิตร FixNow
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 leading-relaxed">
                <span className="font-bold">นโยบายตรวจสอบตัวตน (KYC):</span> ทุกข้อมูลจะถูกเก็บเป็นความลับเพื่อใช้สำหรับตรวจสอบประวัติวิชาชีพและเปิดระบบรับงานจริงเท่านั้น
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    ชื่อ - นามสกุลจริง *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="นายสมชาย การช่าง"
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    ชื่ออู่ หรือหน่วยบริการเคลื่อนที่
                  </label>
                  <input
                    type="text"
                    value={garageName}
                    onChange={(e) => setGarageName(e.target.value)}
                    placeholder="สมชายเซอร์วิส / ช่างอิสระ"
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    เบอร์โทรศัพท์ที่ใช้รับงาน *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0812345678"
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    เลขบัตรประจำตัวประชาชน (13 หลัก) *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={13}
                    value={idCardNumber}
                    onChange={(e) => setIdCardNumber(e.target.value)}
                    placeholder="1234567890123"
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    จังหวัดที่ประจำการ *
                  </label>
                  <input
                    type="text"
                    required
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    placeholder="เช่น กรุงเทพมหานคร, ขอนแก่น"
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    รัศมีที่พร้อมวิ่งงาน (กม.)
                  </label>
                  <select
                    value={serviceRadius}
                    onChange={(e) => setServiceRadius(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="15">ภายใน 15 กิโลเมตร</option>
                    <option value="25">ภายใน 25 กิโลเมตร</option>
                    <option value="50">ภายใน 50 กิโลเมตร</option>
                    <option value="100">ทั่วทั้งจังหวัด</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  บริการที่คุณมีความพร้อมและเชี่ยวชาญ (เลือกได้หลายข้อ)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: "repair", label: "ซ่อมเครื่องยนต์/ฉุกเฉิน" },
                    { id: "battery", label: "พ่วง/เปลี่ยนแบตเตอรี่" },
                    { id: "tire", label: "ปะยาง/เปลี่ยนยาง" },
                    { id: "slide", label: "รถยก / รถสไลด์" },
                    { id: "key", label: "ช่างกุญแจรถ" },
                    { id: "ac", label: "แอร์รถยนต์" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleSkill(s.id)}
                      className={`p-2 rounded-lg text-xs font-medium border text-left flex items-center justify-between transition ${
                        selectedSkills.includes(s.id)
                          ? "border-blue-600 bg-blue-50 text-blue-900 font-bold"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span>{s.label}</span>
                      {selectedSkills.includes(s.id) && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  บัญชีธนาคารสำหรับรับโอนค่าบริการ
                </label>
                <input
                  type="text"
                  required
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  placeholder="เช่น กสิกรไทย 123-4-56789-0 สมชาย"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3 rounded-xl transition shadow-lg shadow-blue-600/30 active:scale-98"
              >
                {isSubmitting ? "กำลังส่งเอกสารสมัคร..." : "ส่งใบสมัครเป็นช่าง FixNow (ไม่มีค่าแรกเข้า)"}
              </button>
            </form>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">
                ได้รับข้อมูลการสมัครเรียบร้อยแล้ว!
              </h4>
              <p className="text-xs md:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                เจ้าหน้าที่ฝ่ายตรวจสอบมาตรฐานช่าง FixNow จะตรวจสอบเอกสารและติดต่อกลับทางเบอร์โทรศัพท์ {phone} ภายใน 24 ชั่วโมง เพื่อทำการยืนยันตัวตนและเปิดระบบรับงาน
              </p>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                }}
                className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs md:text-sm px-6 py-2.5 rounded-xl transition"
              >
                เสร็จสิ้น
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
