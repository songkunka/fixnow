# 🚗 FixNow — แพลตฟอร์มเรียกช่างซ่อมรถฉุกเฉิน 24 ชั่วโมง (FixNow Platform)

> **FixNow** แพลตฟอร์มบริการช่วยเหลือฉุกเฉินบนท้องถนนและซ่อมรถยนต์ 24 ชั่วโมงอันดับ 1 ในประเทศไทย เชื่อมต่อผู้ใช้ที่ประสบปัญหารถเสียฉุกเฉินกับช่างผู้เชี่ยวชาญใกล้จุดเกิดเหตุอย่างรวดเร็ว โปร่งใส และปลอดภัย

---

## 🌟 ฟีเจอร์หลัก (Key Features)

- **ระบบเรียกช่างฉุกเฉิน (Emergency Booking):** เลือกประเภทบริการ (ช่างเครื่องยนต์, พ่วง/เปลี่ยนแบตเตอรี่, ปะยาง, กุญแจรถ, เติมน้ำมัน, รถยก/สไลด์, รถยนต์ไฟฟ้า EV ฯลฯ) ระบุตำแหน่ง GPS และข้อมูลรถ
- **ระบบสมาชิกและการยืนยันตัวตน (Authentication):** รองรับ Email & Password, Google OAuth และ LINE
- **หน้าโปรไฟล์และแดชบอร์ด (User Dashboard):** จัดการข้อมูลส่วนตัว และดูประวัติการเรียกช่าง
- **ระบบจับคู่ช่างและคำนวณระยะทาง:** ค้นหาช่างที่อยู่ใกล้และพร้อมให้บริการที่สุด
- **ระบบสมัครช่างพันธมิตร (Mechanic Partner Registration):** เปิดรับช่างและอู่ซ่อมรถเข้าร่วมเครือข่าย

---

## 🛠 Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) (App Router, Turbopack, React 19, TypeScript)
- **Styling:** Tailwind CSS, Lucide React Icons
- **Backend & Database:** [Supabase](https://supabase.com/) (PostgreSQL, Supabase Auth, Row Level Security)

---

## 🚀 การติดตั้งและรันโปรเจกต์ (Getting Started)

### 1. Clone Repository
```bash
git clone https://github.com/songkunka/fixnow.git
cd fixnow
```

### 2. ติดตั้ง Dependencies
```bash
npm install
```

### 3. ตั้งค่า Environment Variables
คัดลอกไฟล์ `.env.example` เป็น `.env.local`:
```bash
cp .env.example .env.local
```
จากนั้นกรอกค่า Supabase URL และ Anon Key:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

### 4. ติดตั้ง Database Schema บน Supabase
นำคำสั่ง SQL ในไฟล์ [`supabase/schema.sql`](supabase/schema.sql) ไปรันใน **Supabase SQL Editor** เพื่อสร้างตาราง `profiles`, `bookings`, `mechanics`, `service_categories` และ RLS Policies

### 5. รัน Development Server
```bash
npm run dev
```
เปิดบราวเซอร์ไปที่ [http://localhost:3000](http://localhost:3000)

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```
fixnow/
├── public/                 # Static assets (images, icons, logos)
├── src/
│   ├── app/                # Next.js App Router (pages & API routes)
│   │   ├── auth/           # Login, Register, Forgot Password, OAuth Callback
│   │   ├── booking/        # Multi-step emergency booking flow
│   │   ├── dashboard/      # User dashboard & order history
│   │   ├── mechanic/       # Mechanic profile & details
│   │   ├── partner/        # Partner registration
│   │   ├── layout.tsx      # Root layout with AuthProvider
│   │   └── page.tsx        # Landing page
│   ├── components/         # Reusable UI components (Navbar, Modals, etc.)
│   ├── config/             # Branding & platform configuration
│   ├── contexts/           # AuthContext & state providers
│   └── lib/                # Supabase client & server utilities
├── supabase/
│   └── schema.sql          # Database schema & RLS policies
└── ...
```

---

## 📄 License
Private / Proprietary — All rights reserved.
