"use client";

import React from "react";
import { Building2 } from "lucide-react";

export default function TrustedBrandsSection() {
  return (
    <section className="py-12 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-orange-600 mb-2">
            ลูกค้าที่ไว้วางใจ
          </h2>
          <p className="text-sm text-slate-500">
            แบรนด์และองค์กรที่ใช้บริการ FixNow
          </p>
        </div>

        {/* Empty State - No brand logos yet */}
        <div className="max-w-2xl mx-auto">
          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 md:p-12 text-center">
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-7 h-7 text-slate-400" />
            </div>
            <h3 className="text-base font-bold text-slate-600 mb-2">
              เร็วๆ นี้! โลโก้พันธมิตรของ FixNow
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              FixNow กำลังสร้างเครือข่ายพันธมิตรกับแบรนด์และองค์กรชั้นนำ พื้นที่นี้จะแสดงโลโก้ลูกค้าที่ไว้วางใจใช้บริการของเรา
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
