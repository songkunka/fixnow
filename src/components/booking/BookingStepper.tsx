"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

interface Step {
  number: number;
  label: string;
}

const STEPS: Step[] = [
  { number: 1, label: "บริการ" },
  { number: 2, label: "บริการย่อย" },
  { number: 3, label: "ประเภทยานพาหนะ" },
  { number: 4, label: "ข้อมูล & สรุป" },
];

interface BookingStepperProps {
  currentStep: number;
  title?: string;
  onBack?: () => void;
  backHref?: string;
}

export default function BookingStepper({
  currentStep,
  title,
  onBack,
  backHref,
}: BookingStepperProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  return (
    <div className="w-full mb-8">
      {/* Header bar with Back button and Title */}
      <div className="flex items-center gap-3 mb-6">
        {currentStep > 1 && (
          <button
            onClick={handleBack}
            aria-label="ย้อนกลับ"
            className="w-11 h-11 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 flex items-center justify-center transition shrink-0 text-slate-700"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        {title && (
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 truncate">
            {title}
          </h1>
        )}
      </div>

      {/* Stepper Progress Indicator */}
      <div className="max-w-xl mx-auto px-2">
        <div className="flex items-center justify-between relative">
          {STEPS.map((step, idx) => {
            const isCompleted = step.number < currentStep;
            const isActive = step.number === currentStep;

            return (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center gap-1.5 z-10">
                  <div
                    className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      isActive
                        ? "bg-orange-500 text-white shadow-md shadow-orange-500/25 ring-4 ring-orange-100 scale-105"
                        : isCompleted
                        ? "bg-orange-500 text-white"
                        : "bg-slate-100 text-slate-400 border border-slate-200"
                    }`}
                  >
                    {isCompleted ? "✓" : step.number}
                  </div>
                  <span
                    className={`text-[11px] md:text-xs font-medium tracking-tight text-center ${
                      isActive
                        ? "text-orange-600 font-bold"
                        : isCompleted
                        ? "text-slate-800"
                        : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Connecting line between steps */}
                {idx < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 -mt-5 transition-colors ${
                      step.number < currentStep ? "bg-orange-500" : "bg-slate-200"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
