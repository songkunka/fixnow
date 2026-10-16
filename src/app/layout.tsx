import type { Metadata, Viewport } from "next";
import { Anuphan, Manrope } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

const anuphan = Anuphan({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-anuphan",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FixNow | แพลตฟอร์มช่วยเหลือรถเสียฉุกเฉินและซ่อมรถนอกสถานที่ 24 ชั่วโมง",
  description:
    "บริการช่วยเหลือรถเสียฉุกเฉิน พ่วงแบตเตอรี่ ปะยาง รถสไลด์ ช่างกุญแจ รถจมน้ำ ช่างอาสา ตลอด 24 ชั่วโมง ทั่วประเทศไทย ถึงไวใน 30 นาที",
  keywords: [
    "ซ่อมรถนอกสถานที่",
    "ช่วยเหลือรถเสียฉุกเฉิน",
    "พ่วงแบตรถยนต์",
    "เปลี่ยนแบตรถยนต์",
    "ปะยางนอกสถานที่",
    "รถสไลด์",
    "รถยก 24 ชม.",
    "ช่างซ่อมรถใกล้ฉัน",
    "FixNow",
  ],
  authors: [{ name: "FixNow Thailand" }],
  openGraph: {
    title: "FixNow | บริการช่วยเหลือรถเสียฉุกเฉิน 24 ชั่วโมง ทั่วไทย",
    description: "เรียกช่างซ่อมรถ พ่วงแบต ปะยาง รถสไลด์ ถึงที่ตลอด 24 ชม.",
    url: "https://fixnow.co.th",
    siteName: "FixNow",
    locale: "th_TH",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#070F2B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={`${anuphan.variable} ${manrope.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased bg-white text-[#17191C]">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
