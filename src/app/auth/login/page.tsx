"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PhoneCall, Eye, EyeOff, Mail, Lock, AlertCircle, Loader2 } from "lucide-react";
import { BRAND_CONFIG, getAssetUrl } from "@/config/branding";
import { useAuth } from "@/contexts/AuthContext";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";
  const { signInWithEmail, signInWithPhone, signInWithGoogle } = useAuth();

  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const logoSrc = getAssetUrl(BRAND_CONFIG.assets.logo.brand, BRAND_CONFIG.assets.logo.ref);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      let result;
      if (loginMethod === "email") {
        result = await signInWithEmail(phoneOrEmail, password);
      } else {
        // Format Thai phone: 08X → +668X
        const formattedPhone = phoneOrEmail.startsWith("0")
          ? "+66" + phoneOrEmail.slice(1).replace(/-/g, "")
          : phoneOrEmail.replace(/-/g, "");
        result = await signInWithPhone(formattedPhone, password);
      }

      if (result.error) {
        setError(translateError(result.error));
      } else {
        router.push(redirectTo);
        router.refresh();
      }
    } catch {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block relative h-12 w-48 mx-auto">
            <Image src={logoSrc} alt="FixNow" fill sizes="192px" className="object-contain" />
          </Link>
          <p className="text-sm text-slate-500 mt-3">{BRAND_CONFIG.tagline}</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
          <h1 className="text-2xl font-extrabold text-slate-900 mb-1 text-center">เข้าสู่ระบบ</h1>
          <p className="text-sm text-slate-500 text-center mb-6">
            ล็อกอินเพื่อเรียกช่างและติดตามคำขอของคุณ
          </p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Method Toggle */}
          <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => { setLoginMethod("phone"); setError(null); }}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition ${
                loginMethod === "phone" ? "bg-white text-orange-600 shadow" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              เบอร์โทรศัพท์
            </button>
            <button
              onClick={() => { setLoginMethod("email"); setError(null); }}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition ${
                loginMethod === "email" ? "bg-white text-orange-600 shadow" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              อีเมล
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Phone or Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                {loginMethod === "phone" ? "เบอร์โทรศัพท์" : "อีเมล"}
              </label>
              <div className="relative">
                {loginMethod === "phone" ? (
                  <PhoneCall className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                ) : (
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                )}
                <input
                  type={loginMethod === "phone" ? "tel" : "email"}
                  value={phoneOrEmail}
                  onChange={(e) => setPhoneOrEmail(e.target.value)}
                  placeholder={loginMethod === "phone" ? "08X-XXX-XXXX" : "your@email.com"}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-sm transition tabular-nums"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-semibold text-slate-700">รหัสผ่าน</label>
                <Link href="/auth/forgot-password" className="text-xs text-orange-600 hover:underline">
                  ลืมรหัสผ่าน?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-sm transition"
                  required
                  minLength={6}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-orange-500/20 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400">หรือ</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button
              onClick={() => alert("LINE Login ต้องตั้งค่า LINE Developers Channel ก่อน\nดูคู่มือใน Phase 2 Plan (M7)")}
              className="w-full flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white font-semibold py-3 rounded-xl transition text-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
              </svg>
              เข้าสู่ระบบด้วย LINE
            </button>
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-3 rounded-xl transition text-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              เข้าสู่ระบบด้วย Google
            </button>
          </div>
        </div>

        {/* Register Link */}
        <div className="text-center mt-6 text-sm text-slate-500">
          ยังไม่มีบัญชี?{" "}
          <Link href="/auth/register" className="text-orange-600 hover:underline font-semibold">
            สมัครสมาชิกฟรี
          </Link>
        </div>

        <div className="text-center mt-3">
          <Link href="/" className="text-xs text-slate-400 hover:text-slate-600 transition">← กลับหน้าหลัก FixNow</Link>
        </div>
      </div>
    </div>
  );
}

function translateError(error: string): string {
  if (error.includes("Invalid login credentials")) return "อีเมลหรือรหัสผ่านไม่ถูกต้อง";
  if (error.includes("Email not confirmed")) return "กรุณายืนยันอีเมลก่อนเข้าสู่ระบบ (ตรวจสอบกล่องจดหมาย)";
  if (error.includes("Too many requests")) return "คุณลองล็อกอินบ่อยเกินไป กรุณารอสักครู่";
  if (error.includes("User not found")) return "ไม่พบบัญชีนี้ในระบบ กรุณาสมัครสมาชิกก่อน";
  return error;
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" /></div>}>
      <LoginContent />
    </Suspense>
  );
}

