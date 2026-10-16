/**
 * FixNow Platform - Centralized Brand & Asset Registry
 * ควบคุมภาพ โลโก้ ข้อมูลติดต่อ และ Asset ทั้งหมดของเว็บไว้ในจุดเดียว
 * รองรับการสลับภาพแบรนด์ FixNow ในภายหลังได้ทันทีโดยไม่ต้องแก้โค้ด Component
 */

export type AssetSourceMode = 'reference_24carfix' | 'fixnow_custom' | 'auto_detect';

// ค่าเริ่มต้นใช้ 'reference_24carfix' เพื่อแสดงภาพ UI ต้นแบบ 34 รายการที่ดึงมา
// เมื่อผู้ใช้พร้อมเปลี่ยนภาพ FixNow ให้เปลี่ยนเป็น 'fixnow_custom'
export const ACTIVE_ASSET_MODE: AssetSourceMode = 'fixnow_custom';

export interface ServiceCardItem {
  id: string;
  nameTh: string;
  nameEn: string;
  desc: string;
  refImage: string;
  brandImage?: string;
  badge?: 'HOT' | 'FREE' | 'RECOMMENDED';
  category: 'repair' | 'battery' | 'tire' | 'towing' | 'volunteer' | 'other';
  priceEstimate?: string;
}

export interface HeroBannerItem {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  refImage: string;
  brandImage?: string;
  badge?: string;
}

export const BRAND_CONFIG = {
  name: 'FixNow',
  nameTh: 'ฟิกซ์นาว',
  legalName: 'บริษัท ฟิกซ์นาว แพลตฟอร์ม (ประเทศไทย) จำกัด',
  tagline: 'บริการช่วยเหลือรถเสียฉุกเฉินและซ่อมรถนอกสถานที่ 24 ชั่วโมง ทั่วไทย',
  subTagline: 'เชื่อมต่อคุณกับช่างซ่อมมืออาชีพและอู่ใกล้เคียง ถึงที่รวดเร็ว โปร่งใส ตรวจสอบได้',
  
  // ช่องทางติดต่อฉุกเฉิน
  hotline: '000-000-0000',
  hotlineDisplay: '000-000-0000',
  secondaryPhone: '000-000-0000',
  supportEmail: 'support@fixnow.co.th',
  lineId: '@fixnow',
  lineUrl: 'https://line.me/R/ti/p/@fixnow',
  facebookUrl: 'https://facebook.com/fixnowthailand',
  tiktokUrl: 'https://tiktok.com/@fixnowth',
  youtubeUrl: 'https://youtube.com/@fixnowth',
  coverage: 'ครอบคลุม 77 จังหวัด ทั่วประเทศไทย 24 ชั่วโมง',

  // รูปภาพและ Asset ต่างๆ
  assets: {
    logo: {
      ref: '/assets/brand/logo.svg',
      brand: '/assets/brand/logo.svg',
      alt: 'FixNow แพลตฟอร์มช่วยเหลือรถเสียฉุกเฉิน 24 ชั่วโมง',
    },
    logoFooter: {
      ref: '/assets/brand/logo-footer.svg',
      brand: '/assets/brand/logo-footer.svg',
      alt: 'FixNow Roadside Assistance Network',
    },
    appMockup: {
      ref: '/assets/24carfix/app_mockup.png',
      brand: '/assets/24carfix/app_mockup.png',
    },
    appStore: {
      ref: '/assets/24carfix/app_store.png',
      brand: '/assets/24carfix/app_store.png',
    },
    googlePlay: {
      ref: '/assets/24carfix/google_play.png',
      brand: '/assets/24carfix/google_play.png',
    },
    qrcode: {
      ref: '/assets/24carfix/qrcode.png',
      brand: '/assets/24carfix/qrcode.png',
    },
    
    // ไอคอน Floating & Action
    icons: {
      phone: '/assets/24carfix/icon_phone.svg',
      line: '/assets/24carfix/icon_line.svg',
      wrench: '/assets/24carfix/icon_screwdriver.png',
    },

    // แบนเนอร์หลัก Hero Banner (รองรับ 1 รูป หรือหลายสไลด์อัตโนมัติ)
    heroBanners: [
      {
        id: 'fixnow_hero_main',
        title: 'FixNow แพลตฟอร์มช่วยเหลือฉุกเฉินและซ่อมรถนอกสถานที่ 24 ชั่วโมง',
        subtitle: 'บริการช่วยเหลือฉุกเฉินและซ่อมรถยนต์นอกสถานที่ ตลอด 24 ชั่วโมง',
        ctaText: 'เรียกช่างฉุกเฉิน!',
        ctaLink: '/booking',
        badge: 'บริการ 24 ชม.',
        refImage: '/assets/brand/hero-banner-1.png',
        brandImage: '/assets/brand/hero-banner-1.png',
      },
      // หมายเหตุ: สามารถเพิ่มแบนเนอร์ถัดไปที่นี่ได้ตลอดเวลา ระบบจะเปิดโหมด Carousel อัตโนมัติเมื่อมีมากกว่า 1 รายการ
    ] as HeroBannerItem[],

    // การ์ดบริการ 12 หมวดหมู่หลัก (ภาพ 3D)
    services: [
      {
        id: 'volunteer_car',
        nameTh: 'ช่างอาสาซ่อมรถยนต์',
        nameEn: 'Volunteer Car Repair',
        desc: 'รถจมน้ำ สตาร์ทไม่ติด ตรวจเช็กระบบไฟ ถ่ายน้ำมันเครื่อง ฟรีไม่มีค่าแรง',
        refImage: '/assets/24carfix/service_volunteer_car.jpg',
        brandImage: '/assets/brand/services/service_volunteer_car.png',
        badge: 'FREE',
        category: 'volunteer',
        priceEstimate: 'ฟรีค่าแรง (เฉพาะอะไหล่ตามจริง)',
      },
      {
        id: 'volunteer_motorcycle',
        nameTh: 'ช่างอาสาซ่อมมอเตอร์ไซค์',
        nameEn: 'Volunteer Motorcycle Repair',
        desc: 'ซ่อมมอเตอร์ไซค์จมน้ำ ไล่น้ำมัน ล้างคาร์บูเรเตอร์/หัวฉีด ฟรีไม่มีค่าแรง',
        refImage: '/assets/24carfix/service_volunteer_motorcycle.jpg',
        brandImage: '/assets/brand/services/service_motorcycle_repair.png',
        badge: 'FREE',
        category: 'volunteer',
        priceEstimate: 'ฟรีค่าแรง',
      },
      {
        id: 'battery',
        nameTh: 'ช่างแบตเตอรี่รถยนต์นอกสถานที่',
        nameEn: 'Mobile Battery Service',
        desc: 'พ่วงแบตเตอรี่ฉุกเฉิน หรือเปลี่ยนแบตใหม่ส่งตรงถึงที่ พร้อมรับประกันทุกลูก',
        refImage: '/assets/24carfix/service_battery.png',
        brandImage: '/assets/brand/services/service_battery.png',
        badge: 'HOT',
        category: 'battery',
        priceEstimate: 'เริ่มต้น 400.- (พ่วงแบต)',
      },
      {
        id: 'repair',
        nameTh: 'ช่างซ่อมรถยนต์ฉุกเฉิน',
        nameEn: 'Emergency Car Repair',
        desc: 'ตรวจเช็กอาการหน้างาน เครื่องดับ สตาร์ทไม่ติด ความร้อนขึ้น ท่อยางแตก',
        refImage: '/assets/24carfix/service_repair.jpg',
        brandImage: '/assets/brand/services/service_repair.png',
        badge: 'HOT',
        category: 'repair',
        priceEstimate: 'ตรวจเช็กเริ่มต้น 500.-',
      },
      {
        id: 'tire',
        nameTh: 'ปะยาง / เปลี่ยนยางนอกสถานที่',
        nameEn: 'Mobile Tire Repair',
        desc: 'ปะยางสตรีม ปะไหม เปลี่ยนยางอะไหล่ เติมลมไนโตรเจนฉุกเฉินถึงที่',
        refImage: '/assets/24carfix/service_tire.jpg',
        brandImage: '/assets/brand/services/service_tire.png',
        category: 'tire',
        priceEstimate: 'ปะไหมเริ่มต้น 350.-',
      },
      {
        id: 'slide_car',
        nameTh: 'รถสไลด์ / รถยก 24 ชม.',
        nameEn: 'Slide Car & Towing Service',
        desc: 'เคลื่อนย้ายรถฉุกเฉิน รถโหลดเตี้ย รถอุบัติเหตุ เข้าอู่หรือศูนย์บริการทั่วไทย',
        refImage: '/assets/24carfix/service_slide_car.jpg',
        brandImage: '/assets/brand/services/service_slide_car.png',
        category: 'towing',
        priceEstimate: 'เริ่มต้น 1,500.- (ในเมือง)',
      },
      {
        id: 'key',
        nameTh: 'ช่างกุญแจรถยนต์นอกสถานที่',
        nameEn: 'Car Locksmith Service',
        desc: 'เปิดประตูกระจกกรณีลืมกุญแจในรถ ทำกุญแจรีโมตสำรอง ชิป Immoblizer',
        refImage: '/assets/24carfix/service_key.jpg',
        brandImage: '/assets/brand/services/service_key.png',
        category: 'other',
        priceEstimate: 'เปิดรถเริ่มต้น 800.-',
      },
      {
        id: 'ac',
        nameTh: 'ล้างแอร์รถยนต์นอกสถานที่',
        nameEn: 'Mobile AC Cleaning',
        desc: 'ล้างแอร์แบบส่องกล้อง เติมน้ำยาแอร์ แอร์ไม่เย็น มีกลิ่นอับ บริการถึงบ้าน',
        refImage: '/assets/24carfix/service_ac.jpg',
        brandImage: '/assets/brand/services/service_ac.png',
        category: 'other',
        priceEstimate: 'เริ่มต้น 990.-',
      },
      {
        id: 'film',
        nameTh: 'ติดฟิล์มรถยนต์นอกสถานที่',
        nameEn: 'Mobile Window Tinting',
        desc: 'ติดตั้งฟิล์มกรองแสงเซรามิก กันความร้อนสูง ช่างผู้ชำนาญการมาตรฐานศูนย์',
        refImage: '/assets/24carfix/service_film.jpg',
        brandImage: '/assets/brand/services/service_film.png',
        category: 'other',
        priceEstimate: 'ประเมินราคาตามขนาดรถ',
      },
      {
        id: 'fuel',
        nameTh: 'เติมน้ำมันฉุกเฉินนอกสถานที่',
        nameEn: 'Emergency Fuel Delivery',
        desc: 'น้ำมันหมดกลางทาง จัดส่งน้ำมันฉุกเฉิน 5-10 ลิตร ให้คุณเดินทางต่อได้ทันที',
        refImage: '/assets/24carfix/service_fuel.jpg',
        brandImage: '/assets/brand/services/service_fuel.png',
        category: 'other',
        priceEstimate: 'ค่าบริการส่ง 300.- + ค่าน้ำมัน',
      },
      {
        id: 'motorcycle_repair',
        nameTh: 'ซ่อมรถมอเตอร์ไซค์นอกสถานที่',
        nameEn: 'Motorcycle Mobile Repair',
        desc: 'ปะยาง เปลี่ยนสายพาน โซ่ สเตอ หัวเทียน มอเตอร์ไซค์ทั่วไปและ Bigbike',
        refImage: '/assets/24carfix/service_motorcycle_repair.jpg',
        brandImage: '/assets/brand/services/service_motorcycle_repair.png',
        category: 'repair',
        priceEstimate: 'เริ่มต้น 300.-',
      },
      {
        id: 'inspection',
        nameTh: 'ตรวจเช็กประเมินรถยนต์นอกสถานที่',
        nameEn: 'Mobile Car Inspection',
        desc: 'ตรวจเช็กประเมินสภาพรถมือสอง วิเคราะห์ระบบไฟด้วยเครื่องอ่าน OBD2 มาตรฐาน',
        refImage: '/assets/24carfix/service_inspection.jpg',
        brandImage: '/assets/brand/services/service_inspection.png',
        category: 'other',
        priceEstimate: 'เริ่มต้น 1,200.-',
      },
      {
        id: 'ev',
        nameTh: 'ช่างรถยนต์ไฟฟ้า EV',
        nameEn: 'Mobile EV & Hybrid Service',
        desc: 'ตรวจเช็กระบบไฟ EV แบตเตอรี่ High Voltage ชาร์จฉุกเฉินนอกสถานที่',
        refImage: '/assets/24carfix/service_inspection.jpg',
        brandImage: '/assets/brand/services/service_ev.png',
        badge: 'HOT',
        category: 'other',
        priceEstimate: 'เริ่มต้น 800.-',
      },

    ] as ServiceCardItem[],

    // ไอคอนหมวดหมู่บริการสำหรับ Dropdown
    dropdownIcons: {
      slide: '/assets/brand/services/service_slide_car.png',
      repair: '/assets/brand/services/service_repair.png',
      battery: '/assets/brand/services/service_battery.png',
      tire: '/assets/brand/services/service_tire.png',
      key: '/assets/brand/services/service_key.png',
      film: '/assets/brand/services/service_film.png',
      glass: '/assets/brand/services/service_film.png',
      ac: '/assets/brand/services/service_ac.png',
      paint: '/assets/brand/services/service_repair.png',
    },
  },
};

/**
 * Helper ดึง URL รูปภาพตาม Asset Mode
 */
export function getAssetUrl(brandUrl?: string, refUrl?: string): string {
  if (ACTIVE_ASSET_MODE === 'fixnow_custom' && brandUrl) {
    return brandUrl;
  }
  if (ACTIVE_ASSET_MODE === 'reference_24carfix') {
    return refUrl || brandUrl || '/assets/24carfix/logo_main.png';
  }
  return brandUrl || refUrl || '/assets/24carfix/logo_main.png';
}
