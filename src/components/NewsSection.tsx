"use client";

import React from "react";
import { Newspaper } from "lucide-react";

export default function NewsSection() {
  return (
    <section id="news" className="py-10 md:py-16 bg-gradient-to-br from-orange-400 via-orange-500 to-amber-500 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-6 right-10 opacity-15">
        <svg className="w-32 h-32 text-white" viewBox="0 0 200 200" fill="currentColor">
          <path d="M40,80 Q40,20 100,20 Q160,20 160,80 Q160,140 100,180 Q40,140 40,80Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-2xl md:text-5xl font-extrabold text-white mb-2">
            ข่าวสารและสาระน่ารู้
          </h2>
          <p className="text-xs md:text-sm text-orange-100">
            คำแนะนำฉุกเฉินและเทคนิคการดูแลรถจากช่างผู้เชี่ยวชาญ
          </p>
        </div>

        {/* Emergency Tips Cards - Horizontal Swipeable on Mobile, Grid on Desktop */}
        <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 scrollbar-none snap-x snap-mandatory max-w-5xl mx-auto -mx-4 px-4 md:mx-auto md:px-0">
          {[
            {
              tag: "ความปลอดภัย",
              title: "วิธีปฏิบัติตัวเมื่อรถเสียบนทางด่วน",
              desc: "เปิดไฟฉุกเฉิน ชิดขอบทางด้านซ้าย อย่ารอในรถ และติดต่อแจ้งพิกัดขอความช่วยเหลือทันที",
              date: "คำแนะนำฉุกเฉิน",
            },
            {
              tag: "แบตเตอรี่",
              title: "3 สัญญาณเตือนแบตเตอรี่ใกล้หมด",
              desc: "สตาร์ทรถลากยาวผิดปกติ ไฟหน้ารถหรี่ลง หรือระบบไฟในห้องโดยสารเริ่มกระพริบ",
              date: "เทคนิคดูแลรถ",
            },
            {
              tag: "รถยก / รถสไลด์",
              title: "เลือกรถยกหรือรถสไลด์ให้เหมาะกับรุ่นรถ",
              desc: "รถเกียร์อัตโนมัติและรถขับเคลื่อน 4 ล้อ ควรใช้รถสไลด์แบบยกขึ้นแท่นเพื่อถนอมระบบเกียร์",
              date: "คู่มือผู้ใช้รถ",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="w-[80vw] max-w-[300px] md:w-auto shrink-0 md:shrink snap-center bg-white/95 backdrop-blur-sm rounded-2xl p-5 md:p-6 shadow-lg border border-white/30 flex flex-col justify-between text-left hover:bg-white transition"
            >
              <div>
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-orange-600 bg-orange-100 px-2.5 py-1 rounded-full mb-3">
                  {item.tag}
                </span>
                <h3 className="text-sm md:text-base font-bold text-slate-900 mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {item.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-medium text-slate-500">
                {item.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
