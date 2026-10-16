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
  iconSvg?: string;
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
  tagline: 'YOUR CAR HELP, RIGHT NOW',
  subTagline: 'บริการช่วยเหลือรถเสียฉุกเฉินและซ่อมรถนอกสถานที่ 24 ชั่วโมง ทั่วไทย ถึงที่รวดเร็ว โปร่งใส ตรวจสอบได้',
  
  // ช่องทางติดต่อฉุกเฉิน
  hotline: '061-415-2978',
  hotlineDisplay: '061-415-2978',
  secondaryPhone: '094-861-9595',
  supportEmail: 'support@fixnow.co.th',
  lineId: '@fixnow',
  lineUrl: 'https://line.me/R/ti/p/@fixnow',
  facebookUrl: 'https://facebook.com/fixnowthailand',
  tiktokUrl: 'https://tiktok.com/@fixnowth',
  youtubeUrl: 'https://youtube.com/@fixnowth',
  coverage: 'ครอบคลุม 77 จังหวัด ทั่วประเทศไทย 24 ชั่วโมง',

  // รูปภาพและ Asset ต่างๆ ตามคู่มือ Brand CI
  assets: {
    logo: {
      ref: '/assets/24carfix/logo_main.png',
      brand: '/assets/brand/logo.svg',
      alt: 'FixNow แพลตฟอร์มช่วยเหลือรถเสียฉุกเฉิน 24 ชั่วโมง',
    },
    logoFooter: {
      ref: '/assets/24carfix/logo_footer.png',
      brand: '/assets/brand/logo-footer.svg',
      alt: 'FixNow Roadside Assistance Network',
    },
    symbol: '/assets/brand/symbol.svg',
    appIcon: '/assets/brand/app-icon.svg',
    appMockup: {
      ref: '/assets/24carfix/app_mockup.png',
      brand: '/assets/brand/app-mockup.png',
    },
    brandTagline: '/assets/brand/brand_tagline.png',
    uniformPolo: '/assets/brand/uniform_polo.png',
    uniformCap: '/assets/brand/uniform_cap.png',
    mascots: {
      ready: '/assets/brand/mascots/mascot_ready.png',
      friendly: '/assets/brand/mascots/mascot_friendly.png',
      pro: '/assets/brand/mascots/mascot_pro.png',
    },
    serviceIcons: {
      battery: '/assets/brand/icons/battery.svg',
      tire: '/assets/brand/icons/tire.svg',
      towTruck: '/assets/brand/icons/tow-truck.svg',
      engine: '/assets/brand/icons/engine.svg',
      location: '/assets/brand/icons/location.svg',
      booking: '/assets/brand/icons/booking.svg',
      safety: '/assets/brand/icons/safety.svg',
    },
    appStore: {
      ref: '/assets/24carfix/app_store.png',
      brand: '/assets/brand/app-store.png',
    },
    googlePlay: {
      ref: '/assets/24carfix/google_play.png',
      brand: '/assets/brand/google-play.png',
    },
    qrcode: {
      ref: '/assets/24carfix/qrcode.png',
      brand: '/assets/brand/qrcode.png',
    },
    
    // ไอคอน Floating & Action
    icons: {
      phone: '/assets/24carfix/icon_phone.svg',
      line: '/assets/24carfix/icon_line.svg',
      wrench: '/assets/brand/icons/engine.svg',
    },

    // แบนเนอร์หลัก Hero Swiper
    heroBanners: [
      {
        id: 'promo_hero',
        title: 'รถมีปัญหา? ช่างพร้อมไปหา',
        subtitle: 'FixNow บริการช่วยเหลือฉุกเฉินและซ่อมรถ 24 ชั่วโมง ถึงไวใน 30 นาที ทุกเส้นทางทั่วไทย',
        ctaText: '🔧 เรียกช่างด่วน 24 ชม.',
        ctaLink: '/booking?category=repair',
        badge: 'บริการฉุกเฉิน 24 ชั่วโมง',
        refImage: '/assets/24carfix/banner_app_1.jpg',
        brandImage: '/assets/brand/banners/banner_promo.png',
      },
      {
        id: 'van_network',
        title: 'FixNow ให้ช่างไปหาคุณ',
        subtitle: 'หน่วยบริการเคลื่อนที่ฉุกเฉินและเครือข่ายรถยก รถสไลด์ ครอบคลุม 77 จังหวัด ทั่วประเทศ',
        ctaText: '🚛 เรียกรถสไลด์ / ค้นหาช่าง',
        ctaLink: '/booking?category=towing',
        badge: 'ครอบคลุม 77 จังหวัด',
        refImage: '/assets/24carfix/banner_app_2.jpg',
        brandImage: '/assets/brand/banners/banner_van.png',
      },
      {
        id: 'mobile_app_flow',
        title: 'เรียกช่างง่าย ติดตามสถานะเรียลไทม์',
        subtitle: 'ช่างมืออาชีพผ่านการยืนยันตัวตน KYC ตรวจสอบค่าบริการชัดเจนก่อนเริ่มงาน ปลอดภัย 100%',
        ctaText: '📱 จองบริการออนไลน์',
        ctaLink: '/booking',
        badge: 'รับประกันงานซ่อม',
        refImage: '/assets/24carfix/banner_app_3.jpg',
        brandImage: '/assets/brand/app-mockup.png',
      },
    ] as HeroBannerItem[],

    // การ์ดบริการ 12 หมวดหมู่หลัก (ภาพ 3D)
    services: [
      {
        id: 'volunteer_car',
        nameTh: 'ช่างอาสาซ่อมรถยนต์',
        nameEn: 'Volunteer Car Repair',
        desc: 'รถจมน้ำ สตาร์ทไม่ติด ตรวจเช็กระบบไฟ ถ่ายน้ำมันเครื่อง ฟรีไม่มีค่าแรง',
        refImage: '/assets/24carfix/service_volunteer_car.jpg',
        brandImage: '/assets/brand/services/service_volunteer_car.jpg',
        iconSvg: '/assets/brand/icons/safety.svg',
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
        brandImage: '/assets/brand/services/service_volunteer_motorcycle.jpg',
        iconSvg: '/assets/brand/icons/safety.svg',
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
        iconSvg: '/assets/brand/icons/battery.svg',
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
        brandImage: '/assets/brand/services/service_repair.jpg',
        iconSvg: '/assets/brand/icons/engine.svg',
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
        brandImage: '/assets/brand/services/service_tire.jpg',
        iconSvg: '/assets/brand/icons/tire.svg',
        category: 'tire',
        priceEstimate: 'ปะไหมเริ่มต้น 350.-',
      },
      {
        id: 'slide_car',
        nameTh: 'รถสไลด์ / รถยก 24 ชม.',
        nameEn: 'Slide Car & Towing Service',
        desc: 'เคลื่อนย้ายรถฉุกเฉิน รถโหลดเตี้ย รถอุบัติเหตุ เข้าอู่หรือศูนย์บริการทั่วไทย',
        refImage: '/assets/24carfix/service_slide_car.jpg',
        brandImage: '/assets/brand/services/service_slide_car.jpg',
        iconSvg: '/assets/brand/icons/tow-truck.svg',
        category: 'towing',
        priceEstimate: 'เริ่มต้น 1,500.- (ในเมือง)',
      },
      {
        id: 'key',
        nameTh: 'ช่างกุญแจรถยนต์นอกสถานที่',
        nameEn: 'Car Locksmith Service',
        desc: 'เปิดประตูกระจกกรณีลืมกุญแจในรถ ทำกุญแจรีโมตสำรอง ชิป Immoblizer',
        refImage: '/assets/24carfix/service_key.jpg',
        brandImage: '/assets/brand/services/service_key.jpg',
        category: 'other',
        priceEstimate: 'เปิดรถเริ่มต้น 800.-',
      },
      {
        id: 'ac',
        nameTh: 'ล้างแอร์รถยนต์นอกสถานที่',
        nameEn: 'Mobile AC Cleaning',
        desc: 'ล้างแอร์แบบส่องกล้อง เติมน้ำยาแอร์ แอร์ไม่เย็น มีกลิ่นอับ บริการถึงบ้าน',
        refImage: '/assets/24carfix/service_ac.jpg',
        brandImage: '/assets/brand/services/service_ac.jpg',
        category: 'other',
        priceEstimate: 'เริ่มต้น 990.-',
      },
      {
        id: 'film',
        nameTh: 'ติดฟิล์มรถยนต์นอกสถานที่',
        nameEn: 'Mobile Window Tinting',
        desc: 'ติดตั้งฟิล์มกรองแสงเซรามิก กันความร้อนสูง ช่างผู้ชำนาญการมาตรฐานศูนย์',
        refImage: '/assets/24carfix/service_film.jpg',
        brandImage: '/assets/brand/services/service_film.jpg',
        category: 'other',
        priceEstimate: 'ประเมินราคาตามขนาดรถ',
      },
      {
        id: 'fuel',
        nameTh: 'เติมน้ำมันฉุกเฉินนอกสถานที่',
        nameEn: 'Emergency Fuel Delivery',
        desc: 'น้ำมันหมดกลางทาง จัดส่งน้ำมันฉุกเฉิน 5-10 ลิตร ให้คุณเดินทางต่อได้ทันที',
        refImage: '/assets/24carfix/service_fuel.jpg',
        brandImage: '/assets/brand/services/service_fuel.jpg',
        category: 'other',
        priceEstimate: 'ค่าบริการส่ง 300.- + ค่าน้ำมัน',
      },
      {
        id: 'motorcycle_repair',
        nameTh: 'ซ่อมรถมอเตอร์ไซค์นอกสถานที่',
        nameEn: 'Motorcycle Mobile Repair',
        desc: 'ปะยาง เปลี่ยนสายพาน โซ่ สเตอ หัวเทียน มอเตอร์ไซค์ทั่วไปและ Bigbike',
        refImage: '/assets/24carfix/service_motorcycle_repair.jpg',
        brandImage: '/assets/brand/services/service_motorcycle_repair.jpg',
        category: 'repair',
        priceEstimate: 'เริ่มต้น 300.-',
      },
      {
        id: 'inspection',
        nameTh: 'ตรวจเช็กประเมินรถยนต์นอกสถานที่',
        nameEn: 'Mobile Car Inspection',
        desc: 'ตรวจเช็กประเมินสภาพรถมือสอง วิเคราะห์ระบบไฟด้วยเครื่องอ่าน OBD2 มาตรฐาน',
        refImage: '/assets/24carfix/service_inspection.jpg',
        brandImage: '/assets/brand/services/service_inspection.jpg',
        category: 'other',
        priceEstimate: 'เริ่มต้น 1,200.-',
      },
    ] as ServiceCardItem[],

    // ไอคอนหมวดหมู่บริการสำหรับ Dropdown
    dropdownIcons: {
      slide: '/assets/24carfix/icon_group_slide.png',
      repair: '/assets/24carfix/icon_group_repair.png',
      battery: '/assets/24carfix/icon_group_battery.png',
      tire: '/assets/24carfix/icon_group_tire.png',
      key: '/assets/24carfix/icon_group_key.png',
      film: '/assets/24carfix/icon_group_film.png',
      glass: '/assets/24carfix/icon_group_glass.png',
      ac: '/assets/24carfix/icon_group_ac.png',
      paint: '/assets/24carfix/icon_group_paint.png',
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
