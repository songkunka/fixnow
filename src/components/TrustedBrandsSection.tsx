import React from "react";
import { ShieldCheck, Clock, CheckCircle2, UserCheck } from "lucide-react";

export default function TrustedBrandsSection() {
  const trustPillars = [
    {
      icon: ShieldCheck,
      title: "ครอบคลุม 77 จังหวัด",
      desc: "เครือข่ายช่างซ่อมและรถยกรถสไลด์พร้อมออกช่วยเหลือทั่วประเทศไทย 24 ชั่วโมง",
    },
    {
      icon: Clock,
      title: "เข้าถึงไวใน 15-30 นาที",
      desc: "ระบบจับคู่และจ่ายงานให้อู่และช่างที่อยู่ใกล้พิกัดฉุกเฉินของคุณมากที่สุด",
    },
    {
      icon: CheckCircle2,
      title: "ราคามาตรฐาน โปร่งใส",
      desc: "ประเมินราคาก่อนเริ่มปฏิบัติงานจริง ไม่มีค่าธรรมเนียมแอบแฝง ตรวจสอบได้",
    },
    {
      icon: UserCheck,
      title: "ช่างผ่านการตรวจประวัติ 100%",
      desc: "คัดกรองตัวตน ใบขับขี่ และประเมินมาตรฐานฝีมือช่างก่อนรับเข้าสู่ระบบ",
    },
  ];

  return (
    <section className="py-14 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
            มาตรฐานความมั่นใจจาก <span className="text-orange-600">FixNow</span>
          </h2>
          <p className="text-sm md:text-base text-slate-500 max-w-xl mx-auto">
            มั่นใจได้ในทุกการเดินทาง ด้วยระบบช่วยเหลือรถเสียฉุกเฉินที่ได้มาตรฐานและโปร่งใสที่สุด
          </p>
        </div>

        {/* 4 Trust Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPillars.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50/80 hover:bg-orange-50/40 rounded-2xl p-6 border border-slate-200 hover:border-orange-200 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 mb-4 shadow-sm">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
