"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, PhoneCall, Mail, Lock, Eye, EyeOff, AlertCircle, Loader2, CheckCircle2 } from "lucide-react";
import { BRAND_CONFIG, getAssetUrl } from "@/config/branding";
import { useAuth } from "@/contexts/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { signUpWithEmail } = useAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const logoSrc = getAssetUrl(BRAND_CONFIG.assets.logo.brand, BRAND_CONFIG.assets.logo.ref);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง");
      return;
    }
    if (password.length < 6) {
      setError("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
      return;
    }

    setIsLoading(true);
    try {
      const result = await signUpWithEmail(email, password, name, phone || undefined);
      if (result.error) {
        setError(translateError(result.error));
      } else {
        setIsSuccess(true);
      }
    } catch {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-2">สมัครสมาชิกสำเร็จ!</h1>
          <p className="text-sm text-slate-500 mb-6">
            เราได้ส่งอีเมลยืนยันไปที่ <strong className="text-slate-800">{email}</strong><br />
            กรุณาตรวจสอบกล่องจดหมายและคลิกลิงก์ยืนยัน
          </p>
          <Link
            href="/auth/login"
            className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:from-orange-600 hover:to-orange-700 transition"
          >
            ไปหน้าเข้าสู่ระบบ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-block relative h-12 w-48 mx-auto">
            <Image src={logoSrc} alt="FixNow" fill sizes="192px" className="object-contain" />
          </Link>
        </div>

        {/* Register Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
          <h1 className="text-2xl font-extrabold text-slate-900 mb-1 text-center">สมัครสมาชิก</h1>
          <p className="text-sm text-slate-500 text-center mb-6">สร้างบัญชีเพื่อเริ่มใช้งาน FixNow</p>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">ชื่อ - นามสกุล</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="ชื่อ นามสกุล" required className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-sm transition" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">เบอร์โทรศัพท์ <span className="text-slate-400 font-normal">(ไม่บังคับ)</span></label>
              <div className="relative">
                <PhoneCall className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="08X-XXX-XXXX" className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-sm transition tabular-nums" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">อีเมล</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-sm transition" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">รหัสผ่าน</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="อย่างน้อย 6 ตัวอักษร" required minLength={6} className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-sm transition" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">ยืนยันรหัสผ่าน</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="พิมพ์รหัสผ่านอีกครั้ง" required className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-sm transition" />
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 accent-orange-500" />
              <span className="text-xs text-slate-500 leading-relaxed">
                ข้าพเจ้ายอมรับ <span className="text-orange-600 cursor-pointer">ข้อกำหนดการใช้บริการ</span> และ <span className="text-orange-600 cursor-pointer">นโยบายความเป็นส่วนตัว</span> ของ FixNow
              </span>
            </label>

            <button
              type="submit"
              disabled={!agreed || isLoading}
              className={`w-full font-bold py-3.5 rounded-xl transition shadow-lg text-sm flex items-center justify-center gap-2 ${
                agreed && !isLoading
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-orange-500/20 active:scale-[0.98]"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLoading ? "กำลังสร้างบัญชี..." : "สมัครสมาชิก"}
            </button>
          </form>
        </div>

        <div className="text-center mt-6 text-sm text-slate-500">
          มีบัญชีอยู่แล้ว?{" "}
          <Link href="/auth/login" className="text-orange-600 hover:underline font-semibold">เข้าสู่ระบบ</Link>
        </div>
        <div className="text-center mt-3">
          <Link href="/" className="text-xs text-slate-400 hover:text-slate-600 transition">← กลับหน้าหลัก FixNow</Link>
        </div>
      </div>
    </div>
  );
}

function translateError(error: string): string {
  if (error.includes("already registered")) return "อีเมลนี้ถูกใช้งานแล้ว กรุณาเข้าสู่ระบบ";
  if (error.includes("valid email")) return "รูปแบบอีเมลไม่ถูกต้อง";
  if (error.includes("at least 6")) return "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
  return error;
}
