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

        {/* Empty State - No articles yet */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/15 backdrop-blur-sm rounded-3xl p-10 md:p-14 text-center border border-white/20">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-5">
              <Newspaper className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
              เร็วๆ นี้! บทความและข่าวสารจาก FixNow
            </h3>
            <p className="text-sm md:text-base text-white/80 max-w-lg mx-auto leading-relaxed">
              FixNow กำลังเตรียมเนื้อหาสาระดีๆ เกี่ยวกับการดูแลรักษารถยนต์ เทคนิคซ่อมเบื้องต้น โปรโมชั่นพิเศษ และข่าวอัปเดตบริการใหม่ๆ ของเราให้คุณ
            </p>
            <div className="mt-6 flex items-center justify-center gap-3 text-xs text-white/60">
              <span className="w-2 h-2 rounded-full bg-white/40 animate-pulse" />
              <span>กำลังจัดเตรียมเนื้อหา...</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
