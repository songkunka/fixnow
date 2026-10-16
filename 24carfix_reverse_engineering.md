# 🔍 Reverse Engineering Report: 24CARFIX Platform
> **อัปเดตล่าสุด:** 15 ตุลาคม 2026 — เพิ่มข้อมูลจากการ Login จริง (Authenticated Session)
**วันที่วิเคราะห์:** 14 ตุลาคม 2026  
**เป้าหมาย:** https://www.24carfix.com/ และ https://app.24carfix.com/  
**ประเภท:** Web Application (Landing Page + Progressive Web App)

---

## 📋 สรุปภาพรวมระบบ

| ส่วน | รายละเอียด |
|------|------------|
| **ชื่อแบรนด์** | 24CARFIX |
| **Tagline** | "บริการซ่อมรถถึงที่ทั่วไทย" |
| **แนวคิดหลัก** | แพลตฟอร์มจับคู่ลูกค้ากับช่างซ่อมรถมืออาชีพ บริการถึงที่ 24 ชั่วโมง |
| **กลุ่มเป้าหมาย** | ผู้ใช้รถยนต์ในไทยที่มีปัญหาฉุกเฉินระหว่างทาง |
| **เบอร์โทร** | 094-861-9595 / 061-415-2978 |
| **อีเมล** | support@24carfix.com |
| **Coverage** | ทั่วไทย 77 จังหวัด |

---

## 🏗️ สถาปัตยกรรมระบบ (Architecture)

```
24CARFIX Platform
├── www.24carfix.com/          ← Landing Page (PHP + Bootstrap)
│   ├── index.php              ← หน้าแรก
│   ├── service-list.php       ← รายการบริการทั้งหมด
│   ├── service-detail.php     ← รายละเอียดบริการแต่ละชนิด
│   ├── spare-parts.php        ← อะไหล่รถยนต์
│   ├── portfolio.php          ← ผลงานช่าง
│   ├── article.php            ← สาระน่ารู้
│   ├── news.php               ← ข่าวสาร
│   ├── contact.php            ← ติดต่อเรา
│   ├── aboutus.php            ← เกี่ยวกับเรา
│   └── download.php           ← ดาวน์โหลดแอป
│
└── app.24carfix.com/          ← Progressive Web App (Next.js)
    ├── /                      ← หน้าหลัก (Public)
    ├── /auth/login            ← Login (Phone OTP + LINE)
    ├── /auth/register         ← สมัครสมาชิก
    ├── /booking/service/selection ← Booking Wizard (4 ขั้นตอน)
    ├── /volunteer             ← บริการช่างอาสา
    ├── /orders                ← รายการออเดอร์ (Protected)
    ├── /chat                  ← AI Chat (Protected)
    ├── /profile               ← โปรไฟล์ผู้ใช้ (Protected)
    ├── /news                  ← ข่าวสาร (Protected)
    ├── /faq                   ← คำถามที่พบบ่อย
    ├── /terms                 ← ข้อกำหนดและเงื่อนไข
    └── /cookie                ← นโยบายคุกกี้
```

> [!NOTE]
> มี alias domain `new-app.24carfix.com` ที่ canonical point ไปยัง `app.24carfix.com`

---

## 🌐 ส่วนที่ 1: Landing Page (www.24carfix.com)

### 1.1 Tech Stack

| รายการ | เทคโนโลยี |
|--------|-----------|
| **Framework** | PHP (server-side rendering) |
| **CSS Framework** | Bootstrap 5 (`bootstrap.min.css?v=18`) |
| **Font** | Google Fonts — **Inter** + **Noto Sans Thai** |
| **JS Slider** | Swiper.js (`swiper.css?v=18`) |
| **Lightbox** | jQuery Fancybox (`jquery.fancybox.css?v=18`) |
| **Animation** | AOS (Animate On Scroll) |
| **Analytics** | Google Tag Manager (`GTM-KP38JMK`) + GA4 (`G-M5B6PFTJQ1`) |
| **CDN/WAF** | Cloudflare (email protection, WAF) |

### 1.2 โครงสร้าง Header

**Navbar Contact Bar** (แถบบนสุด):
- 📧 Email: `support@24carfix.com`
- 📘 Facebook: `facebook.com/24carfix`
- 🟢 LINE: `@24carfix` (lin.ee/jntvLG0)
- 🎵 TikTok: `@24carfixth`

**Navbar Main** (เมนูหลัก):

| เมนู | URL | หมายเหตุ |
|------|-----|---------|
| บริการทั้งหมด | — | Mega Dropdown |
| อะไหล่รถยนต์ | `/spare-parts.php` | |
| ผลงานช่าง | `/portfolio.php` | |
| สาระน่ารู้ | `/article.php` | |
| เกี่ยวกับเรา | `/aboutus.php` | |
| ข่าวสาร | `/news.php` | |
| ติดต่อเรา | `/contact.php` | |
| 📞 061-415-2978 | `tel:0614152978` | CTA Button สีส้ม |

### 1.3 Service Dropdown Menu

| บริการ | ID |
|--------|----|
| ปะยาง/เปลี่ยนยาง | id=88 |
| จั้มแบตเตอรี่/เปลี่ยนแบตเตอรี่ | id=119 |
| ซ่อมรถยนต์ | id=120 |
| กุญแจรถยนต์ | id=89 |
| รถยก/รถสไลด์ | id=86 |
| แอร์รถยนต์ | id=99 |
| สีรถยนต์ | *(ยังไม่เปิดตัว)* |
| กระจกและฟิล์มรถยนต์ | *(parent)* |
| — ฟิล์มยนต์ | id=117 |
| — กระจกยนต์ | *(ยังไม่เปิดตัว)* |
| เคาะรอยบุบ/ลักยิ้ม | *(ยังไม่เปิดตัว)* |

### 1.4 Hero Section (Banner)

- **Swiper Banner**: 4 สไลด์ (auto-play)
  - สไลด์ 1: ช่างอาสาช่วยน้ำท่วม → `/volunteer`
  - สไลด์ 2-4: ใช้งานแอป → `new-app.24carfix.com`
- **CTA หลัก**: ปุ่ม "🔧 เรียกช่างฉุกเฉิน!" → `https://app.24carfix.com`

### 1.5 Service Cards Section

| ลำดับ | บริการ | Service ID |
|-------|--------|-----------|
| 1 | ช่างอาสาซ่อมรถยนต์ (ฟรี) | 120 |
| 2 | ช่างอาสาซ่อมมอเตอร์ไซค์ (ฟรี) | 121 |
| 3 | ช่างแบตเตอรี่รถยนต์นอกสถานที่ | 119 |
| 4 | ช่างซ่อมรถยนต์ | 85 |
| 5 | ปะยาง/เปลี่ยนยาง | 88 |
| 6 | รถสไลด์ | 86 |
| 7 | กุญแจรถยนต์ | 89 |
| 8 | ล้างแอร์รถยนต์นอกสถานที่ | 99 |
| 9 | ติดฟิล์มรถยนต์นอกสถานที่ | 117 |
| 10 | เติมน้ำมันฉุกเฉินนอกสถานที่ | 100 |
| 11 | ซ่อมรถมอเตอร์ไซค์นอกสถานที่ | 101 |
| 12 | ตรวจเช็กประเมินรถยนต์นอกสถานที่ | 111 |

### 1.6 App Download Section

- App Store → `/download.php`
- Google Play → `/download.php`
- QR Code ดาวน์โหลด
- Social: Facebook, LINE, TikTok, YouTube

### 1.7 Portfolio Section (Filter)

- ทั้งหมด
- ซ่อมนอกสถานที่ `?cate=carfix`
- รถยก/รถสไลด์ `?cate=slidecar`
- แบตเตอรี่รถยนต์ `?cate=battery`

### 1.8 Social Media Presence

| แพลตฟอร์ม | Handle |
|-----------|--------|
| Facebook | `/24carfix` |
| Instagram | `@24carfix` |
| YouTube | `@24carfix` |
| TikTok | `@24carfixth` |

### 1.9 Design System (Landing)

| Token | ค่า |
|-------|-----|
| Primary Color | `#ff6b35` (Orange) |
| Text Color | `#1a1a1a` |
| Secondary Text | `#4a5568` |
| Font Primary | Inter |
| Font Thai | Noto Sans Thai |
| Border Radius | 8px–16px |
| Hover Anim | `translateY(-2px)` + box-shadow |
| Transition | `0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)` |

---

## 📱 ส่วนที่ 2: Web App (app.24carfix.com)

### 2.1 Tech Stack (App)

| รายการ | เทคโนโลยี | หลักฐาน |
|--------|-----------|--------|
| **Framework** | Next.js (App Router) | `/_next/static/chunks/`, RSC streaming |
| **Rendering** | Server Components + Client hydration | `self.__next_f.push()` |
| **Build Tool** | Turbopack | `turbopack-d4cba4cb2100375e.js` |
| **Styling** | Tailwind CSS | `min-h-screen`, `rounded-2xl`, etc. |
| **Language** | Thai (th) | `lang="th"` |
| **Font** | Inter + Noto Sans + Noto Sans Thai | preloaded `.woff2` |
| **State** | React Query | `QueryProvider` component |
| **Social Auth** | LINE LIFF SDK | `LiffProvider` component |
| **Toast** | Sonner | `Toaster` (richColors, top-center) |
| **PWA** | Progressive Web App | `/manifest.webmanifest` |
| **Analytics** | GTM-KP38JMK + GA4 G-2KTVDE5F7F | |
| **CDN/WAF** | Cloudflare Beacon | token: `ffdee1daab4d479188c8b8af3616dde4` |

**React Provider Tree:**
```
RootProviders
  └── LiffProvider
        └── QueryProvider
              ├── SwUpdateReloader
              ├── NativeLocationBridge
              └── Toaster (Sonner)
```

### 2.2 Color System (App)

| Token | ค่า |
|-------|-----|
| Primary (light) | `#f67416` (Orange) |
| Primary (dark) | `#1f1f1f` |
| Auth Input Border | `border-auth-input-border` |
| Register Link | `text-auth-register-link` |
| Brand Gray Light | `bg-brand-gray-light` |

### 2.3 หน้า Login (`/auth/login`)

```
Layout: max-w-[430px] centered mobile card
├── Decorative SVG (top-left, rotate-165deg)
├── Logo: 24CARFIX SVG (120x40)
└── Form Container (rounded-t-3xl)
    ├── Phone Input (+66 prefix, maxLength=10)
    ├── Submit: "ดำเนินการต่อ"
    ├── Divider: "หรือเข้าสู่ระบบด้วย"
    ├── LINE Login Button (48x48 circle)
    └── Register Link: "สมัครเลย" → /auth/register
```

**Auth Flow:**
1. กรอกเบอร์โทร 10 หลัก (ไม่รวม +66)
2. กด "ดำเนินการต่อ" → ส่ง OTP (inferred)
3. หรือ Login ด้วย LINE LIFF

### 2.4 หน้าหลัก App (`/`)

**Bottom Navigation:**
| Icon | Label | URL |
|------|-------|-----|
| 🏠 | หน้าหลัก | `/` |
| 📋 | รายการ | `/orders` |
| 🤖 | แชท | `/chat` |
| 👤 | โปรไฟล์ | `/profile` |

**Quick Access Cards:**

| Card | URL |
|------|-----|
| 🚨 เรียกช่างฉุกเฉิน | `/booking/service/selection?serviceCategory=6,7` |
| 🚛 รถสไลด์/รถยก | `/booking/service/selection?serviceCategory=7` |
| 🏍️ มอเตอร์ไซค์ | `/booking/service/selection?vehicle=2&serviceCategory=8` |
| 🔧 สั่งอะไหล่ใกล้ฉัน | `/booking/service/selection?serviceCategory=6,8&serviceIds=59,80&isEmergency=false` |
| 🤝 ช่างอาสา (ฟรี) | `/volunteer` |

**Service Grid (Category Icons):**

| หมวดหมู่ | Service ID |
|---------|-----------|
| ช่างอาสาซ่อมรถยนต์ | `/volunteer` |
| ช่างซ่อมรถยนต์ | 42 |
| ช่างแบตเตอรี่ | 40 |
| ช่างปะยาง | 37 |
| ช่างกุญแจ | 39 |
| ช่างรถ EV | 51 |
| ไดนาโม/ระบบไฟ | 86 |

### 2.5 Booking Flow (`/booking/service/selection`)

```
Step 1: เลือกหมวดหมู่บริการ
   ↓
Step 2: เลือกบริการย่อย
   ↓
Step 3: เลือกประเภทยานพาหนะ (รถยนต์/มอเตอร์ไซค์/EV)
   ↓
Step 4: ระบุรายละเอียดรถ (ยี่ห้อ/รุ่น)
```

**URL Query Parameters:**

| Parameter | ความหมาย | ตัวอย่าง |
|-----------|---------|---------|
| `serviceCategory` | รหัสหมวดหมู่ | `6,7` |
| `serviceId` | รหัสบริการ | `42` |
| `serviceIds` | หลายบริการ | `59,80` |
| `vehicle` | ประเภทรถ (1=car, 2=moto) | `2` |
| `isEmergency` | งานฉุกเฉิน | `true/false` |

**บริการที่มีใน Booking:**

| บริการ | Tag |
|--------|-----|
| ช่างซ่อมรถยนต์ | 🔥 Popular |
| ช่างแบตเตอรี่ | 🔥 Popular |
| ช่างปะยาง | — |
| ช่างกุญแจ | — |
| เติมน้ำมันฉุกเฉิน | — |
| ช่างรถ EV | — |
| ไดนาโม/ระบบไฟ | — |
| หม้อน้ำ | — |
| รถสไลด์ & รถยก | — |

### 2.6 Volunteer (`/volunteer`)

- Redirect → `/booking/service/selection?serviceIds=90,89&serviceCategory=8,6&isEmergency=false`
- ช่างอาสาซ่อมรถยนต์ (ID: 90) — ฟรี
- ช่างอาสาซ่อมมอเตอร์ไซค์ (ID: 89) — ฟรี
- กรณีน้ำท่วม/ภัยพิบัติ

### 2.7 Protected Features

| Feature | Route | หมายเหตุ |
|---------|-------|---------|
| รายการออเดอร์ | `/orders` | ต้อง Login |
| AI Chat | `/chat` | ต้อง Login |
| โปรไฟล์ | `/profile` | ต้อง Login |
| ข่าวสาร | `/news` | ต้อง Login |

**Auth Redirect Pattern:**
```
/news → /auth/login?redirect=%2Fnews
```

---

## 🔌 ส่วนที่ 3: Integration & API Analysis

### 3.1 Service ID Reference

| ID | บริการ |
|----|--------|
| 37 | ช่างปะยาง |
| 39 | ช่างกุญแจ |
| 40 | ช่างแบตเตอรี่ |
| 42 | ช่างซ่อมรถยนต์ |
| 51 | ช่างรถ EV |
| 59 | อะไหล่ (1) |
| 80 | อะไหล่ (2) |
| 85 | ช่างซ่อมรถยนต์ (landing) |
| 86 | รถสไลด์ / ไดนาโม |
| 88 | ปะยาง/เปลี่ยนยาง (landing) |
| 89 | กุญแจ / ช่างอาสามอเตอร์ไซค์ |
| 90 | ช่างอาสาซ่อมรถยนต์ |
| 99 | แอร์รถยนต์ |
| 100 | เติมน้ำมันฉุกเฉิน |
| 101 | ซ่อมมอเตอร์ไซค์ |
| 111 | ตรวจเช็กประเมินรถ |
| 117 | ติดฟิล์มรถยนต์ |
| 119 | แบตเตอรี่ (ใหม่) |
| 120 | ซ่อมรถยนต์ (ใหม่) |
| 121 | ช่างอาสามอเตอร์ไซค์ |

### 3.2 Service Categories

| Category ID | ประเภท |
|-------------|-------|
| 6 | รถยนต์ / อะไหล่ |
| 7 | รถสไลด์ / รถยก |
| 8 | มอเตอร์ไซค์ |

### 3.3 Third-party Integrations

| บริการ | วัตถุประสงค์ |
|--------|------------|
| LINE LIFF SDK | Social Login |
| GTM (GTM-KP38JMK) | Tag Management |
| GA4 (G-M5B6PFTJQ1) | Landing Analytics |
| GA4 (G-2KTVDE5F7F) | App Analytics |
| Cloudflare | WAF + CDN + Email Obfuscation |

### 3.4 GA4 Custom Events (Landing)

```javascript
ctaTag('phone_call', '0614152978', { source_page: 'home' })
ctaTag('email_click', 'support@24carfix.com', { source_page: 'home' })
ctaTag('facebook_click', '24carfix', { source_page: 'home' })
ctaTag('line_click', '@24carfix', { source_page: 'home' })
ctaTag('tiktok_click', '24carfix', { source_page: 'home' })
ctaTag('click_service', 'hero_call_service', { source_page: 'home' })
ctaTag('app_store_click', 'app_store', { source_page: 'home' })
ctaTag('google_play_click', 'google_play', { source_page: 'home' })
ctaTag('download_click', 'download', { source_page: 'home' })
ctaTag('youtube_click', '24carfix', { source_page: 'home' })
```

---

## 🗺️ ส่วนที่ 4: Site Map สมบูรณ์

### Landing (www.24carfix.com)

```
/index.php                        ← หน้าแรก
/service-list.php                 ← บริการทั้งหมด
/service-detail.php?id=X          ← รายละเอียดบริการ
/spare-parts.php                  ← อะไหล่รถยนต์
/portfolio.php                    ← ผลงานช่าง
/portfolio.php?cate=carfix        ← ผลงาน: ซ่อมนอกสถานที่
/portfolio.php?cate=slidecar      ← ผลงาน: รถสไลด์
/portfolio.php?cate=battery       ← ผลงาน: แบตเตอรี่
/article.php                      ← สาระน่ารู้
/news.php                         ← ข่าวสาร
/contact.php                      ← ติดต่อเรา
/aboutus.php                      ← เกี่ยวกับเรา
/download.php                     ← ดาวน์โหลดแอป
```

### Web App (app.24carfix.com)

```
Public:
/                                  ← หน้าหลัก + Service Grid
/auth/login                        ← Login
/auth/register                     ← Register
/booking/service/selection         ← Booking Wizard
/volunteer                         ← ช่างอาสา
/faq                               ← FAQ
/terms                             ← ข้อกำหนด
/cookie                            ← Cookie Policy

Protected (Login Required):
/orders                            ← รายการออเดอร์
/chat                              ← AI Chat
/profile                           ← โปรไฟล์
/news                              ← ข่าวสาร
```

---

## 🎨 ส่วนที่ 5: Design & UX Analysis

### 5.1 Design Patterns

- **Mobile-first PWA**: max-w-[430px] card layout
- **Desktop**: card floating บน gray background
- **Rounded UI**: `rounded-3xl` (cards), `rounded-2xl` (inputs/buttons)
- **Glassmorphism**: mobile menu ใช้ `backdrop-filter: blur(20px)`
- **Orange Primary**: สีส้ม `#f67416/#ff6b35` ใช้ทั้ง 2 ระบบ

### 5.2 UX Patterns

1. **Emergency CTA First** — ปุ่มฉุกเฉินเด่นที่สุดในทุกหน้า
2. **Quick Shortcuts** — URL query params ลัดไปยังบริการทันที
3. **Cookie Banner** — แสดงทันทีทุก session
4. **Multi-step Wizard** — 4 ขั้นตอน booking ชัดเจน
5. **Social Login** — LINE LIFF เป็น primary social login
6. **Auth Guard** — redirect พร้อม `?redirect=` param

### 5.3 PWA Features

- Web App Manifest (`/manifest.webmanifest`)
- Service Worker (SwUpdateReloader)
- Apple Touch Icon
- Theme color adaptive (light/dark)
- `viewport-fit=cover` (notch support)
- `user-scalable=no` (native-like UX)

---

## 📊 ส่วนที่ 6: Feature Matrix

### Customer Features

| # | ฟีเจอร์ | สถานะ |
|---|--------|-------|
| 1 | เรียกช่างฉุกเฉิน 24 ชม. | ✅ |
| 2 | Booking แบบ multi-step | ✅ |
| 3 | บริการรถยนต์ (ยาง/แบต/กุญแจ/แอร์/รถสไลด์) | ✅ |
| 4 | บริการรถ EV | ✅ |
| 5 | บริการมอเตอร์ไซค์ | ✅ |
| 6 | บริการช่างอาสา (ฟรี) | ✅ |
| 7 | Login เบอร์โทร + OTP | ✅ |
| 8 | Login LINE | ✅ |
| 9 | ประวัติออเดอร์ | ✅ |
| 10 | AI Chat | ✅ |
| 11 | โปรไฟล์ผู้ใช้ | ✅ |
| 12 | ข่าวสาร | ✅ |
| 13 | FAQ | ✅ |
| 14 | สั่งอะไหล่ใกล้ฉัน | ✅ |
| 15 | PWA (ติดตั้งเป็นแอป) | ✅ |

### Marketing Features

| # | ฟีเจอร์ |
|---|--------|
| 1 | Portfolio ช่างพร้อม filter |
| 2 | บทความ/สาระน่ารู้ |
| 3 | ข่าวสาร |
| 4 | GA4 Event Tracking ครบ |
| 5 | Schema.org SEO Markup |
| 6 | OG Tags + Twitter Cards |
| 7 | Canonical URL Management |

---

## 🔒 ส่วนที่ 7: Security & Privacy

| รายการ | สถานะ |
|--------|-------|
| Cloudflare WAF | ✅ |
| Email Obfuscation | ✅ |
| HTTPS | ✅ |
| Cookie Consent | ✅ |
| Cookie Policy | ✅ (`/cookie`) |
| Terms & Conditions | ✅ (`/terms`) |
| robots.txt | ⚠️ Redirect to login (ไม่เปิดเผย) |
| sitemap.xml | ⚠️ Redirect to login (ไม่เปิดเผย) |

---

## ⚠️ ส่วนที่ 8: Unknowns & Gaps

> ข้อมูลที่ไม่สามารถยืนยันได้โดยไม่ผ่าน authentication

| รายการ | หมายเหตุ |
|--------|---------|
| Backend API endpoints | ต้อง login + network inspection |
| Database schema | ไม่ทราบ |
| Payment gateway | ไม่ทราบ (อาจมีใน booking flow หลัง login) |
| Real-time mechanic tracking | ไม่ทราบ |
| Rating/Review system | ไม่ทราบ |
| OTP SMS provider | น่าจะเป็น Thai SMS Gateway หรือ Twilio |
| Admin dashboard | ไม่ทราบ (อาจ subdomain แยก) |
| Mechanic-facing app | ไม่ทราบ (อาจมี app แยกสำหรับช่าง) |
| Pricing/Quote system | ไม่ทราบ |

---

*Confidence Level 1 (Pre-login): HIGH — static HTML/JS analysis, DOM inspection, URL/route observation*

---

# 🔓 ส่วนที่ 10: Authenticated Session Analysis (หลัง Login)

> **หมายเหตุ:** ข้อมูลในส่วนนี้ได้จากการ login จริงด้วยเบอร์ 095-851-3027, OTP ยืนยัน, บัญชีชื่อ **songkunka**

## 10.1 OTP Verification Screen (`/auth/verify-otp`)

```
URL: /auth/verify-otp?phone=0958513027&flow=auth&token=5166c3...

องค์ประกอบ:
├── Icon: Shield Check (เขียวอ่อน)
├── หัวข้อ: "ยืนยันรหัส OTP"
├── ข้อความ: "กรุณากรอกรหัสที่ได้รับจาก"
├── เบอร์โทรศัพท์: 0958513027 (refCode: 984C)
├── OTP Input: 6 ช่อง แยกบล็อก (สีส้มเมื่อ active)
├── Countdown: "ขอรหัสอีกครั้ง (11s)"
└── ปุ่ม: "ยืนยัน" (สีส้ม, disabled ก่อนกรอกครบ)
```

**URL Parameters ที่สำคัญ:**
| Param | ค่า |
|-------|-----|
| `phone` | เบอร์ที่กรอก |
| `flow` | `auth` |
| `token` | JWT token จาก server |

---

## 10.2 หน้าหลัก (Home) หลัง Login

### Layout Structure (Desktop)
```
┌─ Top Bar ──────────────────────────────────────┐
│ 24CARFIX Logo              [S] User Avatar     │
├─ Left Sidebar ──────────────────────────────────┤
│  🏠 หน้าหลัก                                    │
│  📋 รายการ                                       │
│  💬 แชท AI                                      │
│  👤 โปรไฟล์                                     │
├─ Main Content ──────────────────────────────────┤
│  ← Hero: หา ช่าง "ซ่อมรถยนต์" (animation)       │
│  ← Quick Access Cards (2×3 grid)               │
│  ← Promotional Banner (Swiper 4 slides)        │
│  ← หมวดหมู่บริการ (horizontal scroll)          │
│  ← Footer                                      │
└─────────────────────────────────────────────────┘
```

### Quick Access Cards (2×3 Grid)
| Card | Subtitle | Badge | URL |
|------|----------|-------|-----|
| เรียกช่างฉุกเฉิน | ซ่อมรถยนต์นอกสถานที่ | **แนะนำ** (สีส้ม) | `/booking/service/selection?serviceCategory=6,7` |
| รถสไลด์/รถยก | บริการเคลื่อนย้าย | — | `/booking/service/selection?serviceCategory=7` |
| บริการมอเตอร์ไซค์ | ซ่อมมอเตอร์ไซค์ | — | `/booking/service/selection?vehicle=2&serviceCategory=8` |
| สั่งอะไหล่ใกล้ฉัน | รถยนต์และมอเตอร์ไซค์ | — | `/booking/service/selection?serviceCategory=6,8&serviceIds=59,80&isEmergency=false` |
| ช่างอาสาช่วยน้ำท่วม | ซ่อมฟรี ไม่มีค่าใช้จ่าย | **ใหม่** (สีแดง) | `/volunteer` |

### Promotional Banners (Swiper)
- แบนเนอร์ 1: "ช่างอาสาช่วยน้ำท่วม ฟรี! รวมช่างอาสาใกล้คุณ" → ปุ่ม "เรียกช่างอาสา"
- แบนเนอร์ 2-4: โปรโมชั่นอื่นๆ

### หมวดหมู่บริการ (Category Grid - Horizontal Scroll)
| ลำดับ | ชื่อ | Icon |
|-------|------|------|
| 1 | ช่างอาสาซ่อมรถยนต์ | มีรูปช่าง |
| 2 | ช่างซ่อมรถยนต์ | รถยนต์ |
| 3 | ช่างแบตเตอรี่ รถยนต์ | แบตเตอรี่ |
| 4 | ช่างปะยาง รถยนต์ | ยาง |
| 5 | ช่างกุญแจ รถยนต์ | กุญแจ |
| 6 | ช่างรถ EV | รถไฟฟ้า |
| 7 | ไดนาโม ระบบไฟ | ไดนาโม |
| 8+ | ล้างแอร์, ติดฟิล์ม, etc. | (scroll ต่อ) |

### Footer (Desktop - 4 คอลัมน์)
```
คอลัมน์ 1: แบรนด์
  แพลตฟอร์มรวมช่างซ่อมรถมืออาชีพทั่วไทย
  บริการถึงที่ 24 ชั่วโมง
  📧 support@24carfix.com
  📞 061-415-2978

คอลัมน์ 2: บริการ
  - ซ่อมรถ
  - เปลี่ยนยาง
  - แบตเตอรี่
  - รถสไลด์

คอลัมน์ 3: บริษัท
  - เกี่ยวกับเรา
  - ข่าวสาร

คอลัมน์ 4: ช่วยเหลือ
  - คำถามที่พบบ่อย
  - ติดต่อเรา
  - นโยบายความเป็นส่วนตัว
  - เงื่อนไขการใช้งาน
  - นโยบายคุกกี้

Social Links: LINE | Facebook | Instagram | YouTube | TikTok | Email | Website
Copyright: © 2026 24CARFIX. All rights reserved.
```

---

## 10.3 Booking Wizard (4 ขั้นตอน) — ละเอียดสมบูรณ์

### Step 1: เลือกหมวดหมู่บริการ
**URL:** `/booking/service/selection`  
**Header:** "← เลือกหมวดหมู่บริการ"  
**Progress:** ① บริการ → ② บริการย่อย → ③ ประเภทรถ → ④ ประเภทย่อย

| หมวดหมู่ | Badge | Icon |
|---------|-------|------|
| ช่างซ่อมรถยนต์ | 🔥 ยอดนิยม | 🔧 |
| ช่างแบตเตอรี่ รถยนต์ | 🔥 ยอดนิยม | 🔋 |
| ช่างปะยาง รถยนต์ | — | 🛞 |
| ช่างกุญแจ รถยนต์ | — | 🔑 |
| เติมน้ำมันฉุกเฉิน | — | ⛽ |
| ช่างรถ EV | — | ⚡ |
| ไดนาโม ระบบไฟ | — | ⚙️ |
| หม้อน้ำ | — | 🌡️ |
| รถสไลด์ | — | 🚛 |
| รถยก | — | 🏗️ |

### Step 2: บริการย่อย (ตัวอย่าง: ช่างซ่อมรถยนต์)
| บริการย่อย |
|----------|
| เรียกช่างให้ไปดูก่อน ด่วน |
| ซ่อมรถนอกสถานที่ |
| ตรวจเช็กสภาพรถน้ำท่วม |
| ไฟโชว์บนหน้าปัด |
| รถสตาร์ทไม่ติด |
| เครื่องยนต์ดับกลางทาง |
| เครื่องเดินไม่เรียบ/สั่น |
| เครื่องร้อน |
| น้ำมันรั่ว/น้ำรั่ว |
| อื่นๆ |

### Step 3: ประเภทยานพาหนะ
| ประเภท |
|--------|
| 🚗 รถยนต์ |
| 🚚 รถกระบะ/รถบรรทุก |
| 🏗️ เครื่องจักรกล |
| 🔹 อื่นๆ |

### Step 4: ประเภทย่อย (ตัวอย่าง: รถยนต์)
| ประเภทย่อย |
|-----------|
| 🚗 รถเก๋ง (Sedan) |
| 🛻 รถกระบะ (Pickup) |
| 🚐 รถตู้ (Van) |
| 🏎️ รถยุโรป (European Car) |
| 🚘 รถแฮทช์แบ็ก (Hatchback) |
| 🚙 รถอเนกประสงค์ (SUV) |
| 🏎️ รถสปอร์ต (Sports Car) |

---

## 10.4 หน้ารายการ (Orders — `/orders`)

```
หัวข้อ: ประวัติออเดอร์
ปุ่มขวา: 🔍 ค้นหา

Tabs:
┌─────────────┬──────────────┬────────────────┬─────────────────┐
│   ทั้งหมด    │ กำลังดำเนินการ │  สำเร็จ/สิ้นสุด │ ยกเลิก/ปฎิเสธ   │
└─────────────┴──────────────┴────────────────┴─────────────────┘

Empty State: "ไม่มีรายการ"
```

**หมายเหตุ:** บัญชีใหม่ยังไม่มีประวัติออเดอร์ โครงสร้าง order card ไม่สามารถ inspect ได้

---

## 10.5 AI Chat (`/chat`) — "นินา"

```
ชื่อ AI: นินา (Nina)
Avatar: รูปตัวการ์ตูนหญิง
ข้อความเปิด: "สวัสดีค่ะ มีอะไรให้นินาช่วยไหมคะ"
Timestamp: 00:06

Quick Prompts (8 หัวข้อ — แสดงเป็น Chips แนวนอน):
1. ติดตามออเดอร์ล่าสุด
2. แบตหมด สตาร์ทไม่ติด
3. ยางแบน ต้องการเปลี่ยนยาง
4. รถเสีย ต้องการรถสไลด์
5. ลืมกุญแจไว้ในรถ
6. น้ำมันหมดกลางทาง
7. เช็กราคาค่าบริการ
8. ช่างมาถึงใช้เวลานานไหม

Input Bar (Bottom):
├── 📍 Location (แชร์ตำแหน่ง)
├── 📷 Camera
├── 📝 Text Field: "พิมพ์ข้อความ..."
└── 🖼️ Gallery (attach image)

Disclaimer:
"ข้อความนี้ตอบโดย AI อาจมีความผิดพลาดหรือคลาดเคลื่อนได้"
```

---

## 10.6 โปรไฟล์ (`/profile`) — ครบถ้วน

### ข้อมูลผู้ใช้
```
[ S ] songkunka
      แก้ไขโปรไฟล์ >
```

### เชื่อมต่อบัญชี
| บัญชี | สถานะ | Action |
|-------|-------|--------|
| 🟢 LINE | ยังไม่เชื่อมต่อ | เชื่อมต่อ > |
| 🍎 Apple | ยังไม่เชื่อมต่อ | เชื่อมต่อ > |

**API Endpoint พบ:** `/api/auth/line` (LINE OAuth)

### ทั่วไป
| รายการ | ประเภท | ค่าเริ่มต้น |
|--------|--------|----------|
| 🔔 แจ้งเตือน | Toggle Switch | ✅ เปิด (สีส้ม) |

### ศูนย์ช่วยเหลือ
| รายการ | ลิงก์ |
|--------|-------|
| 📄 ข้อกำหนดและเงื่อนไข | `/terms` |
| 🛡️ นโยบายความเป็นส่วนตัว | *(Privacy Policy)* |
| 🍪 นโยบายคุกกี้ | `/cookie` |
| ❓ FAQ | `/faq` |
| 📞 ติดต่อเรา | *(Contact)* |

### ปุ่ม Logout
- ปุ่ม "ออกจากระบบ" (สีแดง)

### Sidebar Navigation (Desktop)
| Icon | ชื่อ | URL | Active State |
|------|------|-----|-------------|
| 🏠 | หน้าหลัก | `/` | ปกติ |
| 📋 | รายการ | `/orders` | ปกติ |
| 💬 | แชท AI | `/chat` | ปกติ |
| 👤 | โปรไฟล์ | `/profile` | 🟠 สีส้ม (active) |

---

## 10.7 FAQ (`/faq`) — 8 หัวข้อ

| # | คำถาม |
|---|-------|
| 1 | วิธีเรียกช่างซ่อมรถ |
| 2 | AI Chat ช่วยอะไรได้บ้าง? |
| 3 | ระบบจับคู่ช่างทำงานอย่างไร? |
| 4 | ค่ามัดจำคืออะไร? |
| 5 | เรียกช่างฉุกเฉินได้ตลอด 24 ชั่วโมงหรือไม่? |
| 6 | วิธีแก้ไขโปรไฟล์และเชื่อมต่อ LINE |
| 7 | แอปใช้ตำแหน่งของฉันอย่างไร? |
| 8 | วิธีติดต่อฝ่ายสนับสนุน |

> **สำคัญ:** FAQ กล่าวถึง **"ค่ามัดจำ"** → มีระบบ deposit ก่อนจอง

---

## 10.8 Volunteer (`/volunteer`)

- Redirect → `/booking/service/selection?serviceIds=90,89&serviceCategory=8,6&isEmergency=false`
- แสดง Booking Wizard ตั้งแต่ Step 1 โดย pre-select บริการช่างอาสา
- บริการฟรี 100% สำหรับรถที่ประสบภัยน้ำท่วม

---

## 10.9 Feature Matrix (อัปเดต — Post-Login)

| # | ฟีเจอร์ | สถานะ | หมายเหตุ |
|---|--------|-------|--------|
| 1 | Phone OTP Login | ✅ Confirmed | 6-digit OTP, refCode |
| 2 | LINE Social Login | ✅ Available | `/api/auth/line` |
| 3 | Apple Login | ✅ Available | *(ยังไม่ test)* |
| 4 | 4-Step Booking Wizard | ✅ Confirmed | บริการ→ย่อย→ประเภทรถ→ย่อย |
| 5 | Service Categories (10) | ✅ Confirmed | ซ่อม/แบต/ยาง/กุญแจ/น้ำมัน/EV/ไดนาโม/หม้อน้ำ/สไลด์/ยก |
| 6 | Sub-services | ✅ Confirmed | ช่างซ่อมมี 10 ย่อย |
| 7 | Vehicle Types (4) | ✅ Confirmed | รถยนต์/กระบะ/เครื่องจักร/อื่นๆ |
| 8 | Sub-vehicle Types (7) | ✅ Confirmed | เก๋ง/กระบะ/ตู้/ยุโรป/แฮทช์/SUV/สปอร์ต |
| 9 | AI Chat (นินา) | ✅ Confirmed | 8 Quick Prompts, Location Share |
| 10 | Order History | ✅ Confirmed | 4 tabs: ทั้งหมด/กำลังดำเนิน/สำเร็จ/ยกเลิก |
| 11 | Profile Edit | ✅ Confirmed | แก้ไขโปรไฟล์ |
| 12 | Notification Toggle | ✅ Confirmed | สวิตช์ เปิด/ปิด |
| 13 | Account Linking (LINE/Apple) | ✅ Confirmed | OAuth flow |
| 14 | FAQ (8 คำถาม) | ✅ Confirmed | รวมเรื่อง ค่ามัดจำ |
| 15 | Terms/Privacy/Cookie | ✅ Confirmed | Legal pages |
| 16 | Emergency Volunteer (ฟรี) | ✅ Confirmed | น้ำท่วม |
| 17 | PWA installable | ✅ Confirmed | manifest.webmanifest |
| 18 | Deposit System | ⚠️ Inferred | FAQ กล่าวถึง "ค่ามัดจำ" |
| 19 | Mechanic Matching System | ⚠️ Inferred | FAQ: "ระบบจับคู่ช่าง" |
| 20 | Location Sharing (in Chat) | ✅ Available | ปุ่ม 📍 ใน chat |

---

## 10.10 API Endpoints ที่พบ

| Endpoint | ประเภท | หมายเหตุ |
|----------|--------|--------|
| `/api/auth/line` | OAuth | LINE Login |
| `/auth/verify-otp` | POST (inferred) | OTP Verification |
| `/booking/service/selection` | GET | Query params: serviceCategory, serviceIds, vehicle, isEmergency |

---

## 10.11 Screenshots ที่บันทึกไว้

````carousel
![OTP Screen](C:/Users/WINDOWS/.gemini/antigravity-ide/brain/2546d1bc-e589-419a-b53d-148b4a742911/otp_screen_1791997512439.png)
<!-- slide -->
![Home Page (Logged In)](C:/Users/WINDOWS/.gemini/antigravity-ide/brain/2546d1bc-e589-419a-b53d-148b4a742911/home_page_logged_in_1791997523611.png)
<!-- slide -->
![Service Selection](C:/Users/WINDOWS/.gemini/antigravity-ide/brain/2546d1bc-e589-419a-b53d-148b4a742911/service_selection_page_1791997536561.png)
<!-- slide -->
![AI Chat (นินา)](C:/Users/WINDOWS/.gemini/antigravity-ide/brain/2546d1bc-e589-419a-b53d-148b4a742911/chat_page_1791997595679.png)
<!-- slide -->
![Profile Page](C:/Users/WINDOWS/.gemini/antigravity-ide/brain/2546d1bc-e589-419a-b53d-148b4a742911/profile_page_1791997606194.png)
<!-- slide -->
![Orders History](C:/Users/WINDOWS/.gemini/antigravity-ide/brain/2546d1bc-e589-419a-b53d-148b4a742911/orders_page_1791997586270.png)
````

---

*Confidence Level 2 (Post-login): VERY HIGH — ข้อมูลจาก live browser session, DOM inspection, และ screenshot ที่บันทึกจริง*
