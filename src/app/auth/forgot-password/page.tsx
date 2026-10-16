"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, AlertCircle, Loader2, CheckCircle2, ArrowLeft } from "lucide-react";
import { BRAND_CONFIG, getAssetUrl } from "@/config/branding";
import { useAuth } from "@/contexts/AuthContext";

export default function ForgotPasswordPage() {
  const { sendPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const logoSrc = getAssetUrl(BRAND_CONFIG.assets.logo.brand, BRAND_CONFIG.assets.logo.ref);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const result = await sendPasswordReset(email);
      if (result.error) {
        setError(result.error);
      } else {
        setIsSent(true);
      }
    } catch {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block relative h-12 w-48 mx-auto">
            <Image src={logoSrc} alt="FixNow" fill sizes="192px" className="object-contain" />
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
          {isSent ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
              <h1 className="text-xl font-extrabold text-slate-900 mb-2">ส่งลิงก์รีเซ็ตแล้ว!</h1>
              <p className="text-sm text-slate-500 mb-6">
                เราได้ส่งลิงก์รีเซ็ตรหัสผ่านไปที่<br />
                <strong className="text-slate-800">{email}</strong><br />
                กรุณาตรวจสอบกล่องจดหมาย (อาจอยู่ใน Spam)
              </p>
              <Link href="/auth/login" className="text-orange-600 hover:underline font-semibold text-sm">
                ← กลับหน้าเข้าสู่ระบบ
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-extrabold text-slate-900 mb-1 text-center">ลืมรหัสผ่าน</h1>
              <p className="text-sm text-slate-500 text-center mb-6">
                กรอกอีเมลที่ใช้สมัครสมาชิก เราจะส่งลิงก์รีเซ็ตรหัสผ่านให้
              </p>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">อีเมล</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-sm transition"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3.5 rounded-xl transition shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isLoading ? "กำลังส่ง..." : "ส่งลิงก์รีเซ็ตรหัสผ่าน"}
                </button>
              </form>
            </>
          )}
        </div>

        <div className="text-center mt-6">
          <Link href="/auth/login" className="text-sm text-slate-500 hover:text-orange-600 flex items-center justify-center gap-1">
            <ArrowLeft className="w-4 h-4" /> กลับหน้าเข้าสู่ระบบ
          </Link>
        </div>
      </div>
    </div>
  );
}
