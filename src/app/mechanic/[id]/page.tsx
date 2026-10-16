import React, { Suspense } from "react";
import MechanicProfilePage from "./MechanicProfilePage";

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-slate-500">กำลังโหลดข้อมูลช่าง...</p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <MechanicProfilePage />
    </Suspense>
  );
}
