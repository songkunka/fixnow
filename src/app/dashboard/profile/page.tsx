"use client";

import React, { useState } from "react";
import { User, Mail, PhoneCall, Camera, Loader2, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";

export default function ProfilePage() {
  const { user, profile } = useAuth();
  const supabase = createClient();

  const [name, setName] = useState(profile?.name || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSaving(true);
    setSaved(false);

    await supabase.from("profiles").upsert({
      id: user.id,
      name,
      phone: phone || null,
      email: user.email,
    });

    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900 mb-6">โปรไฟล์</h1>

      <div className="max-w-lg">
        {/* Avatar */}
        <div className="flex items-center gap-5 mb-8">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center text-3xl font-bold">
              {(name || "U").charAt(0).toUpperCase()}
            </div>
            <button className="absolute bottom-0 right-0 w-7 h-7 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm hover:bg-slate-50 transition">
              <Camera className="w-3.5 h-3.5 text-slate-600" />
            </button>
          </div>
          <div>
            <p className="font-semibold text-slate-900">{name || "ผู้ใช้"}</p>
            <p className="text-sm text-slate-500">{user?.email}</p>
            <span className="inline-block mt-1 text-[10px] bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">
              ลูกค้า
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">ชื่อ - นามสกุล</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="ชื่อ นามสกุล" className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-sm transition" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">อีเมล</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="email" value={user?.email || ""} disabled className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-500 cursor-not-allowed" />
              </div>
              <p className="text-xs text-slate-400 mt-1">อีเมลไม่สามารถเปลี่ยนได้</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">เบอร์โทรศัพท์</label>
              <div className="relative">
                <PhoneCall className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="08X-XXX-XXXX" className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-sm transition" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-orange-500/20 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                กำลังบันทึก...
              </>
            ) : saved ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                บันทึกเรียบร้อย!
              </>
            ) : (
              "บันทึกการเปลี่ยนแปลง"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
