"use client";

import React from "react";
import { Newspaper } from "lucide-react";

export default function NewsSection() {
  return (
    <section id="news" className="py-16 bg-gradient-to-br from-orange-400 via-orange-500 to-amber-500 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-6 right-10 opacity-15">
        <svg className="w-32 h-32 text-white" viewBox="0 0 200 200" fill="currentColor">
          <path d="M40,80 Q40,20 100,20 Q160,20 160,80 Q160,140 100,180 Q40,140 40,80Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-3">
            ข่าวสารที่น่าสนใจ
          </h2>
        </div>

        {/* Emergency Tips Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30 flex flex-col justify-between text-left hover:bg-white transition"
            >
              <div>
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-orange-600 bg-orange-100 px-2.5 py-1 rounded-full mb-3">
                  {item.tag}
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
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
