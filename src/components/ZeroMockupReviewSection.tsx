"use client";

import React, { useState } from "react";
import { Star, ShieldCheck, FileCheck, CheckCircle2, MessageSquareHeart, AlertCircle } from "lucide-react";

export default function ZeroMockupReviewSection() {
  const [orderIdInput, setOrderIdInput] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderIdInput.trim()) {
      setFeedbackSubmitted(true);
      setTimeout(() => {
        setFeedbackSubmitted(false);
        setShowReviewForm(false);
        setOrderIdInput("");
      }, 3000);
    }
  };

  return (
    <section className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200 mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>นโยบายรีวิวจริง 100% (Verified Customer Reviews)</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            มาตรฐานงานบริการและความโปร่งใสของ FixNow
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            เราให้ความสำคัญกับความจริงใจสูงสุด ไม่มีการปั่นรีวิวหรือสร้างดาวเท็จ รีวิวทุกชิ้นต้องมาจากลูกค้าที่มีบันทึกหมายเลขออเดอร์จริงเท่านั้น
          </p>
        </div>

        {/* 3 Pillars of FixNow Service Guarantee */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              รับประกันงานซ่อมนอกสถานที่
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              ทุกเคสที่ซ่อมผ่าน FixNow มีการคุ้มครองและรับประกันตามเงื่อนไขบริการ อะไหล่แท้พร้อมใบเสร็จบันทึกในระบบ
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              แจ้งราคาก่อนเริ่มซ่อม ไม่มีบวกเพิ่ม
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              ช่างจะตรวจสอบหน้างานและยืนยันราคากับลูกค้าก่อนลงมือทำเสมอ หมดกังวลเรื่องค่าบริการแอบแฝง
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              หลักฐานภาพถ่ายและประวัติเคสในระบบ
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              บันทึกภาพก่อนและหลังซ่อม พร้อมตำแหน่งพิกัด GPS เพื่อความโปร่งใสและตรวจสอบย้อนหลังได้ทุกเวลา
            </p>
          </div>
        </div>

        {/* Honest Empty State for Reviews */}
        <div className="glass-card rounded-3xl p-8 max-w-3xl mx-auto text-center border-dashed border-2 border-slate-300">
          <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <MessageSquareHeart className="w-7 h-7" />
          </div>

          <h3 className="text-lg font-bold text-slate-800 mb-2">
            ยังไม่มีรีวิวสาธารณะสำหรับช่วงเปิดระบบ
          </h3>
          <p className="text-xs md:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed mb-6">
            FixNow ยึดถือกฎความโปร่งใส (Zero Mockup Policy) อย่างเคร่งครัด รีวิวและคะแนนความพึงพอใจจะปรากฏเมื่อลูกค้าเสร็จสิ้นการซ่อมและประเมินผ่านระบบจริงเท่านั้น
          </p>

          {!showReviewForm ? (
            <button
              onClick={() => setShowReviewForm(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs md:text-sm px-6 py-2.5 rounded-xl transition active:scale-95 shadow-md"
            >
              ✍️ คุณเคยใช้บริการ FixNow? คลิกที่นี่เพื่อส่งรีวิวเคสของคุณ
            </button>
          ) : (
            <form onSubmit={handleReviewSubmit} className="max-w-md mx-auto text-left space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">ยืนยันรหัสเคสเพื่อส่งรีวิว</span>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="text-slate-400 hover:text-slate-600 text-xs"
                >
                  ยกเลิก
                </button>
              </div>

              <div>
                <label className="text-[11px] text-slate-500 block mb-1">หมายเลขออเดอร์ (เช่น FN-20261015-001)</label>
                <input
                  type="text"
                  required
                  placeholder="กรอก Order ID ของคุณ"
                  value={orderIdInput}
                  onChange={(e) => setOrderIdInput(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>

              <div className="flex items-center gap-1">
                <span className="text-[11px] text-slate-500 mr-2">ให้คะแนน:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-amber-400 fill-amber-400 cursor-pointer" />
                ))}
              </div>

              <div>
                <label className="text-[11px] text-slate-500 block mb-1">ความคิดเห็นเพิ่มเติม</label>
                <textarea
                  rows={2}
                  placeholder="บอกเล่าความประทับใจหรือข้อเสนอแนะในการบริการ..."
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>

              {feedbackSubmitted && (
                <div className="p-2 rounded bg-emerald-100 text-emerald-800 text-xs text-center font-medium">
                  ✓ บันทึกรีวิวสำเร็จ ขอบคุณที่ช่วยพัฒนาระบบ FixNow!
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2 rounded-lg transition"
              >
                ส่งรีวิวเข้าสู่ระบบตรวจสอบ
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
