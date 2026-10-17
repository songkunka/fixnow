export interface SubService {
  id: string;
  name: string;
  price: number;
  priceFormatted: string;
  note: string;
  included?: string[];
  excluded?: string[];
  warning?: string;
  category: string;
  icon?: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  sub: string;
  icon: string;
  subServices: SubService[];
}

export interface VehicleSubtype {
  id: string;
  name: string;
  desc?: string;
}

export interface VehicleCategory {
  id: string;
  name: string;
  iconName: string; // for rendering lucide icon or svg
  subtypes: VehicleSubtype[];
  brands: string[];
}

export const VEHICLE_CATEGORIES: VehicleCategory[] = [
  {
    id: "car",
    name: "รถยนต์ส่วนบุคคล",
    iconName: "Car",
    subtypes: [
      { id: "sedan", name: "รถเก๋ง 4 ประตู (Sedan)", desc: "เช่น Vios, City, Civic, Camry" },
      { id: "hatchback", name: "รถเก๋ง 5 ประตู (Hatchback)", desc: "เช่น Yaris, Swift, Mazda 2" },
      { id: "suv", name: "รถอเนกประสงค์ (SUV / PPV)", desc: "เช่น Fortuner, CR-V, Pajero Sport, Everest" },
      { id: "pickup", name: "รถกระบะ (Pickup)", desc: "เช่น Hilux Revo, D-Max, Ranger" },
      { id: "van", name: "รถตู้ (Van / MPV)", desc: "เช่น Commuter, Alphard, Carnival" },
      { id: "ev", name: "รถยนต์ไฟฟ้า 100% (EV)", desc: "เช่น BYD Dolphin, Atto 3, Tesla Model 3/Y, Neta V" },
      { id: "european", name: "รถยนต์ยุโรป / หรูหรา", desc: "เช่น Mercedes-Benz, BMW, Audi, Volvo, Porsche" },
    ],
    brands: [
      "Toyota",
      "Honda",
      "Isuzu",
      "Mitsubishi",
      "Ford",
      "Mazda",
      "Nissan",
      "BYD",
      "MG",
      "Tesla",
      "Mercedes-Benz",
      "BMW",
      "Neta",
      "GWM (Ora/Haval)",
      "Hyundai",
      "Suzuki",
      "อื่นๆ",
    ],
  },
  {
    id: "motorcycle",
    name: "รถจักรยานยนต์ / มอเตอร์ไซค์",
    iconName: "Bike",
    subtypes: [
      { id: "scooter_small", name: "มอเตอร์ไซค์ทั่วไป (110-150cc)", desc: "เช่น Wave, Scoopy, Click, Fazzio" },
      { id: "scooter_big", name: "บิ๊กสกู๊ตเตอร์ (150-350cc)", desc: "เช่น PCX, ADV, NMAX, XMAX, Forza" },
      { id: "classic_manual", name: "รถเกียร์ธรรมดา / คลาสสิก", desc: "เช่น CT125, Monkey, Super Cub, SR400" },
      { id: "bigbike", name: "บิ๊กไบค์ (>350cc ขึ้นไป)", desc: "เช่น CBR650, Ninja, MT-07, Monster" },
      { id: "ev_bike", name: "มอเตอร์ไซค์ไฟฟ้า (EV Bike)", desc: "เช่น EM, Deco, Strom, NIU" },
    ],
    brands: [
      "Honda",
      "Yamaha",
      "Vespa",
      "Kawasaki",
      "GPX",
      "Suzuki",
      "Royal Enfield",
      "Ducati",
      "BMW Motorrad",
      "KTM",
      "Triumph",
      "อื่นๆ",
    ],
  },
  {
    id: "truck",
    name: "รถบรรทุก",
    iconName: "Truck",
    subtypes: [
      { id: "truck_4w", name: "รถบรรทุก 4 ล้อใหญ่", desc: "รถกระบะตอนเดียวตู้ทึบ / คอกเสริม" },
      { id: "truck_6w", name: "รถบรรทุก 6 ล้อ", desc: "หกล้อตู้ / หกล้อดั๊มพ์" },
      { id: "truck_10w", name: "รถบรรทุก 10 ล้อ / หัวลาก", desc: "สิบล้อพ่วง / หัวลากคอนเทนเนอร์" },
    ],
    brands: ["Isuzu", "Hino", "Fuso", "UD Trucks", "Scania", "Volvo", "อื่นๆ"],
  },
  {
    id: "other",
    name: "ยานพาหนะอื่นๆ",
    iconName: "Wrench",
    subtypes: [
      { id: "forklift", name: "รถโฟล์กลิฟต์ / รถยกคลังสินค้า" },
      { id: "agricultural", name: "รถไถ / เครื่องจักรเกษตร" },
      { id: "tricycle", name: "รถสามล้อ / สามล้อเครื่อง" },
      { id: "custom_vehicle", name: "ยานพาหนะดัดแปลงอื่นๆ" },
    ],
    brands: ["Kubota", "Yanmar", "Toyota Forklift", "อื่นๆ"],
  },
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "repair",
    name: "ช่างซ่อมรถยนต์",
    sub: "ซ่อมฉุกเฉินนอกสถานที่ เครื่องยนต์ สตาร์ทไม่ติด",
    icon: "/assets/brand/services/service_repair.png",
    subServices: [
      {
        id: "repair-inspect-first",
        name: "เรียกช่างให้ไปดูก่อน ด่วน",
        price: 850,
        priceFormatted: "฿850",
        note: "ค่าเดินทาง เรียกไปดูอาการเสนอราคาเพิ่มเติมหากมีการซ่อม",
        category: "repair",
        included: [
          "ค่าเดินทางของช่างไปยังจุดเกิดเหตุทั่วไทย",
          "ตรวจเช็ควิเคราะห์อาการเสียเบื้องต้นด้วยสายตาและเครื่องมือ",
          "ประเมินราคาซ่อมและค่าอะไหล่ให้ทราบก่อนลงมือทำ",
        ],
        excluded: ["ค่าแรงซ่อมกรณีต้องรื้อเปลี่ยนชิ้นส่วน", "ค่าอะไหล่ใหม่ที่ต้องใช้ในการซ่อม"],
        warning: "หากตรวจแล้วต้องซ่อมใหญ่ ช่างจะแจ้งใบเสนอราคาให้พิจารณาก่อนทุกครั้ง",
      },
      {
        id: "repair-onsite-general",
        name: "ซ่อมนอกสถานที่",
        price: 850,
        priceFormatted: "฿850",
        note: "ซ่อมพื้นฐาน ไม่รวมค่าอะไหล่และค่าบริการซ่อม",
        category: "repair",
        included: [
          "ค่าเดินทางของช่างด่วน 24 ชม.",
          "เครื่องมือซ่อมพื้นฐานนอกสถานที่ครบชุด",
          "ตรวจเช็คจุดบกพร่องและแก้ไขหน้างาน",
        ],
        excluded: ["ค่าอะไหล่ใหม่", "งานซ่อมที่ต้องใช้ฮอยส์ยกรถหรือเครื่องมือแท่นขนาดใหญ่"],
      },
      {
        id: "repair-flood-inspect",
        name: "เรียกช่างตรวจเช็คอาการ รถน้ำท่วม (นอกสถานที่)",
        price: 850,
        priceFormatted: "฿850",
        note: "ช่างประเมินหน้างานหรือขอใบเสนอราคากรณีน้ำท่วม",
        category: "repair",
        included: [
          "เดินทางตรวจสอบระดับน้ำที่เข้าท่วมตัวรถและห้องเครื่อง",
          "ตรวจเช็คกรองอากาศ ก้านวัดน้ำมันเครื่อง กล่อง ECU",
          "แนะนำข้อควรระวัง ห้ามสตาร์ทรถเพื่อป้องกันก้านสูบคด",
        ],
        excluded: ["ค่าถ่ายของเหลวทั้งหมด", "ค่าล้างภายในหรือรื้อพรมตากแห้ง"],
        warning: "ห้ามบิดกุญแจสตาร์ทรถเด็ดขาดหากรถเพิ่งผ่านการแช่น้ำมา",
      },
      {
        id: "repair-dashboard-warning",
        name: "รถมีไฟเตือนขึ้นหน้าปัด",
        price: 750,
        priceFormatted: "฿750",
        note: "รูปไฟโชว์เรียกช่างไปตรวจสอบหน้างานด้วยเครื่องสแกน",
        category: "repair",
        included: [
          "นำเครื่องสแกน OBD-II ไปอ่านโค้ดความผิดปกติของกล่องสมองกล (ECU)",
          "แจ้งรหัส Code Error พร้อมอธิบายความหมายและแนวทางแก้ไข",
          "เคลียร์โค้ดข้อผิดพลาด (กรณีที่อาการหายแล้ว)",
        ],
        excluded: ["ค่าอะไหล่เซ็นเซอร์ตัวใหม่หากชำรุด"],
      },
      {
        id: "repair-crank-no-start",
        name: "รถสตาร์ทไม่ติด",
        price: 750,
        priceFormatted: "฿750",
        note: "เรียกไปดูอาการหน้างานและประเมินระบบสตาร์ทเบื้องต้น",
        category: "repair",
        included: [
          "ตรวจสอบแบตเตอรี่ ขั้วแบต ไดสตาร์ท และปั๊มเชื้อเพลิง",
          "พ่วงสตาร์ททดสอบอาการหน้างาน",
        ],
        excluded: ["ค่าเปลี่ยนไดสตาร์ทใหม่", "ค่ารีเลย์หรือปั๊มติ๊กใหม่"],
      },
      {
        id: "repair-stall-on-road",
        name: "ดับกลางทาง",
        price: 750,
        priceFormatted: "฿750",
        note: "เครื่องยนต์ดับกะทันหัน เรียกช่างตรวจสอบหน้างานด่วน",
        category: "repair",
        included: [
          "ออกปฏิบัติการฉุกเฉินริมทางหลวงหรือจุดเกิดเหตุด่วน",
          "ตรวจเช็คระบบไฟจุดระเบิด ระบบน้ำมัน และความร้อนเครื่องยนต์",
        ],
        excluded: ["ค่ารถยก/สไลด์กรณีไม่สามารถแก้ไขหน้างานได้"],
      },
    ],
  },
  {
    id: "battery",
    name: "ช่างแบตเตอรี่ รถยนต์",
    sub: "จั๊มสตาร์ท เปลี่ยนแบตนอกสถานที่ ตรวจสภาพไดชาร์จ",
    icon: "/assets/brand/services/service_battery.png",
    subServices: [
      {
        id: "battery-inspect-first",
        name: "เรียกช่างให้ไปดูก่อน จ่ายเงินหน้างาน",
        price: 500,
        priceFormatted: "฿500",
        note: "เรียกไปดูอาการหน้างานและประเมินสภาพแบตเตอรี่",
        category: "battery",
        included: [
          "วัดค่า CCA และแรงดัน Volt ของแบตเตอรี่ด้วยเครื่องมือดิจิทัล",
          "ตรวจเช็คการทำงานของไดชาร์จ (Alternator Charging State)",
        ],
        excluded: ["ค่ายูนิตแบตเตอรี่ลูกใหม่"],
      },
      {
        id: "battery-jump-start",
        name: "จั๊มแบต (นอกสถานที่)",
        price: 500,
        priceFormatted: "฿500",
        note: "บริการพ่วงสตาร์ทแบตเตอรี่ฉุกเฉิน 24 ชม.",
        category: "battery",
        included: [
          "บริการพ่วงสตาร์ทด้วยสายพ่วงมาตรฐานหรือ Booster Pack กำลังสูง",
          "ติดเครื่องยนต์จนระบบทำงานปกติ",
          "วัดไฟไดชาร์จเพื่อยืนยันว่าขับขี่ต่อไปได้อย่างปลอดภัย",
        ],
        excluded: ["กรณีไดชาร์จเสียไม่ชาร์จไฟกลับ"],
      },
      {
        id: "battery-replace-with-parts",
        name: "เปลี่ยนแบต (ให้ช่างเอาแบตไปพร้อมติดตั้ง)",
        price: 450,
        priceFormatted: "฿450",
        note: "ช่างเสนอราคาแบตเตอรี่ให้ก่อน ราคาเริ่มต้นตามรุ่นแบตเตอรี่",
        category: "battery",
        included: [
          "ค่าบริการเดินทางและค่าแรงติดตั้งแบตเตอรี่ลูกใหม่ถึงที่",
          "สำรองระบบไฟก่อนถอด (ป้องกันกล่อง ECU และเครื่องเสียงรีเซ็ต)",
          "รับประกันแบตเตอรี่ลูกใหม่ 12-24 เดือนตามเงื่อนไขโรงงาน",
        ],
        excluded: ["ราคาค่าตัวลูกแบตเตอรี่ (คิดตามยี่ห้อ/ขนาดแอมป์ที่ลูกค้าเลือก)"],
        warning: "ลูกค้ารับส่วนลดเทิร์นแบตเตอรี่ลูกเก่ากับช่างหน้างานได้ทันที",
      },
      {
        id: "battery-replace-labor-only",
        name: "เปลี่ยนแบต (ลูกค้ามีแบต ให้ช่างไปใส่)",
        price: 450,
        priceFormatted: "฿450",
        note: "ลูกค้ามีแบตเตอรี่อยู่แล้ว จ่ายเฉพาะค่าแรงบริการติดตั้ง",
        category: "battery",
        included: [
          "เดินทางไปถอดแบตเตอรี่ลูกเดิมและติดตั้งลูกใหม่ของลูกค้า",
          "ทำความสะอาดขั้วแบตเตอรี่และตรวจเช็คความแน่นหนา",
          "ทดสอบสตาร์ทเครื่องยนต์",
        ],
        excluded: ["การรับประกันตัวก้อนแบตเตอรี่ที่ลูกค้านำมาเอง"],
      },
    ],
  },
  {
    id: "tire",
    name: "ช่างปะยาง รถยนต์",
    sub: "ปะยางตัวหนอน สตรีมร้อน สตรีมเย็น เปลี่ยนยางอะไหล่",
    icon: "/assets/brand/services/service_tire.png",
    subServices: [
      {
        id: "tire-inspect-first",
        name: "เรียกช่างให้ไปดูก่อน จ่ายเงินหน้างาน",
        price: 850,
        priceFormatted: "฿850",
        note: "ช่างตรวจสอบสภาพยางและล้อ ณ จุดเกิดเหตุ",
        category: "tire",
        included: ["เดินทางไปจุดเกิดเหตุ", "ตรวจหาจุดรั่วซึม แผลตะปู หรือยางแตกแก้ม"],
      },
      {
        id: "tire-plug-worm",
        name: "ปะยางตัวหนอน / แทงไหม (นอกสถานที่)",
        price: 850,
        priceFormatted: "฿850",
        note: "บริการปะยางสำหรับซ่อมรอยรั่วขนาดเล็กบริเวณหน้ายาง",
        category: "tire",
        included: [
          "เดินทางด่วนถึงจุดเกิดเหตุ",
          "ถอนตะปู/สิ่งแปลกปลอมออกและแทงไหมไหมยางคุณภาพสูง",
          "เติมลมยางตามสเปกรถพร้อมทดสอบการรั่วซึมด้วยฟองสบู่",
        ],
        excluded: ["แผลที่แก้มยางหรือรอยฉีกขาดขนาดใหญ่ที่ไม่สามารถแทงไหมได้"],
      },
      {
        id: "tire-cold-patch",
        name: "ปะยางสตรีมเย็น (นอกสถานที่)",
        price: 1050,
        priceFormatted: "฿1,050",
        note: "บริการซ่อมรอยรั่วบริเวณหน้ายางด้วยวิธีปะสตรีมเย็น",
        category: "tire",
        included: [
          "ถอดล้อและแกะยางออกจากกระทะล้อ",
          "ขัดผิวด้านในและติดแผ่นปะสตรีมเย็นยึดแน่น",
          "ประกอบยางและเติมลมมาตรฐาน",
        ],
      },
      {
        id: "tire-hot-patch",
        name: "ปะยางสตรีมร้อน (นอกสถานที่)",
        price: 1400,
        priceFormatted: "฿1,400",
        note: "ตรวจสอบรอยรั่วและปะสตรีมร้อนมาตรฐานความปลอดภัยสูง",
        category: "tire",
        included: [
          "ถอดล้อและนำเข้าเครื่องสตรีมความร้อนละลายแผ่นยางผสานกับเนื้อยางเดิม",
          "ความทนทานสูง เหมาะสำหรับรอยแผลที่ต้องการความแข็งแรงพิเศษ",
        ],
      },
      {
        id: "tire-swap-spare",
        name: "เปลี่ยนยางอะไหล่ (นอกสถานที่)",
        price: 750,
        priceFormatted: "฿750",
        note: "บริการถอดยางชำรุดและเปลี่ยนใส่ยางอะไหล่ของลูกค้า",
        category: "tire",
        included: [
          "นำแม่แรงยกรถและถอดล้อที่ยางแตก/รั่วออก",
          "นำยางอะไหล่ท้ายรถของลูกค้ามาติดตั้งแทนที่",
          "ขันน็อตล้อด้วยแรงบิดมาตรฐาน พร้อมตรวจเช็กลมยางอะไหล่",
        ],
        warning: "กรุณาแจ้งให้ทราบหากรถไม่มีแม่แรงหรืออุปกรณ์ขันล้อติดรถ",
      },
      {
        id: "tire-inflate",
        name: "เติมลมยาง (นอกสถานที่)",
        price: 450,
        priceFormatted: "฿450",
        note: "บริการตรวจสอบและเติมแรงดันลมยางทั้ง 4 ล้อ",
        category: "tire",
        included: ["นำปั๊มลมเคลื่อนที่ไปเติมลมยางทั้ง 4 ล้อและล้ออะไหล่ตามเกณฑ์โรงงาน"],
      },
      {
        id: "tire-sourcing-used",
        name: "จัดหายางเปอร์เซนต์ (ส่งถึงที่)",
        price: 550,
        priceFormatted: "฿550",
        note: "ช่างจัดหายางมือสองสภาพดีส่งให้ (ไม่รวมค่ายาง)",
        category: "tire",
        included: ["วิ่งจัดหายางมือสองขนาดและเบอร์ตรงรุ่นส่งถึงจุดเกิดเหตุ"],
        excluded: ["ราคาค่ายางเปอร์เซนต์ตามที่ตกลง"],
      },
    ],
  },
  {
    id: "key",
    name: "ช่างกุญแจ รถยนต์",
    sub: "เปิดล็อครถฉุกเฉิน ลืมกุญแจ ทำกุญแจใหม่ รีโมท Immobilizer",
    icon: "/assets/brand/services/service_key.png",
    subServices: [
      {
        id: "key-inspect-first",
        name: "เรียกช่างให้ไปดูก่อน",
        price: 850,
        priceFormatted: "฿850",
        note: "ตรวจสอบระบบล็อคและประเมินหน้างาน",
        category: "key",
        included: ["ตรวจสอบประเภทกุญแจและระบบล็อคเพื่อวางแผนเปิดรถอย่างปลอดภัย"],
      },
      {
        id: "key-unlock-car",
        name: "สะเดาะล็อครถ / เปิดรถฉุกเฉิน (นอกสถานที่)",
        price: 1050,
        priceFormatted: "฿1,050",
        note: "เปิดประตูกรณีลืมกุญแจในรถ ไม่ทำให้รถเสียหาย",
        category: "key",
        included: [
          "ใช้เครื่องมือเปิดเบ้ากุญแจเฉพาะทาง (Pick Tool) หรือถุงลมแรงดันนุ่ม",
          "รถไม่เป็นรอย สีไม่ถลอก ยางขอบประตูไม่ฉีกขาด 100%",
        ],
        warning: "ผู้ว่าจ้างต้องแสดงหลักฐานความเป็นเจ้าของรถหรือบัตรประชาชนก่อนเปิดเสมอ",
      },
      {
        id: "key-duplicate-new",
        name: "ทำกุญแจรถยนต์ใหม่ (นอกสถานที่)",
        price: 1900,
        priceFormatted: "฿1,900",
        note: "กัดดอกกุญแจใหม่ทดแทนดอกเดิมที่สูญหาย",
        category: "key",
        included: ["กัดดอกกุญแจด้วยเครื่อง CNC พกพาตรงรุ่น สามารถไขบิดได้ราบรื่น"],
        excluded: ["ชิปฝังระบบ Immobilizer หรือ Smart Key"],
      },
      {
        id: "key-immo-program",
        name: "โปรแกรมกุญแจ Immobilizer (นอกสถานที่)",
        price: 3000,
        priceFormatted: "฿3,000",
        note: "กัดดอกพร้อมลงรหัสชิปสตาร์ทเครื่องยนต์",
        category: "key",
        included: [
          "กัดดอกกุญแจพร้อมยูนิต Transponder Chip",
          "เชื่อมต่อกล่อง ECU เพื่อลงทะเบียนรหัสกุญแจดอกใหม่เข้าสู่ระบบ",
        ],
      },
      {
        id: "key-smartkey-pushstart",
        name: "โปรแกรม Smart Key (นอกสถานที่)",
        price: 4200,
        priceFormatted: "฿4,200",
        note: "ทำกุญแจรีโมทระบบ Push Start ด่วนถึงที่",
        category: "key",
        included: [
          "รีโมท Smart Key ตรงรุ่นรถ",
          "โปรแกรมจับคู่กับระบบสตาร์ทปุ่ม Push Start และระบบเซ็นทรัลล็อค",
        ],
      },
      {
        id: "key-battery-replace",
        name: "เปลี่ยนถ่านรีโมท (นอกสถานที่)",
        price: 450,
        priceFormatted: "฿450",
        note: "เปลี่ยนถ่านแท้คุณภาพสูงถึงที่",
        category: "key",
        included: ["แกะเปลี่ยนถ่านก้อนแท้ Maxell/Panasonic พร้อมทดสอบสัญญาณรีโมท"],
      },
      {
        id: "key-extract-broken",
        name: "ดึงกุญแจหักออกจากรูกุญแจ",
        price: 1200,
        priceFormatted: "฿1,200",
        note: "ใช้เครื่องมือพิเศษดึงเศษกุญแจหัก ไม่ทำให้เบ้ากุญแจเสีย",
        category: "key",
        included: ["คีมและเข็มดึงพิเศษสำหรับดึงชิ้นส่วนกุญแจหักที่ติดคาในเบ้า"],
      },
    ],
  },
  {
    id: "fuel",
    name: "เติมน้ำมันฉุกเฉิน",
    sub: "จัดส่งน้ำมันด่วน เบนซิน ดีเซล รถน้ำมันหมดกลางทาง",
    icon: "/assets/brand/services/service_fuel.png",
    subServices: [
      {
        id: "fuel-inspect-first",
        name: "เรียกช่างให้ไปดูก่อน",
        price: 850,
        priceFormatted: "฿850",
        note: "ตรวจสอบสาเหตุน้ำมันไม่ลงหรือปั๊มติ๊กมีปัญหา",
        category: "fuel",
        included: ["ตรวจเช็คเกจวัดน้ำมัน แรงดันในรางหัวฉีด และฟิวส์ปั๊มติ๊ก"],
      },
      {
        id: "fuel-emergency-delivery",
        name: "เติมน้ำมันฉุกเฉิน 5-10 ลิตร",
        price: 650,
        priceFormatted: "฿650",
        note: "ค่าบริการจัดส่งด่วน (ค่าน้ำมันชำระให้ช่างตามมิเตอร์จริง)",
        category: "fuel",
        included: [
          "บริการนำถังน้ำมันนิรภัยมาตรฐานจัดส่งถึงตัวรถด่วน 24 ชม.",
          "เติมน้ำมันเข้าสู่ถังรถยนต์อย่างปลอดภัย",
          "ช่วยสตาร์ทและไล่ลมในระบบเชื้อเพลิงจนเครื่องยนต์ติดราบรื่น",
        ],
        excluded: ["ค่าน้ำมันเชื้อเพลิง (ชำระตามใบเสร็จจริงจากสถานีบริการน้ำมัน)"],
      },
    ],
  },
  {
    id: "ev",
    name: "ช่างรถ EV / ไฮบริด",
    sub: "ตรวจเช็กระบบไฟฟ้า แบต 12V รถยนต์ไฟฟ้า สแกนโค้ด",
    icon: "/assets/brand/services/service_ev.png",
    subServices: [
      {
        id: "ev-inspect-first",
        name: "เรียกช่างให้ไปดูก่อน",
        price: 850,
        priceFormatted: "฿850",
        note: "ตรวจเช็กระบบไฟฟ้ารถยนต์ EV เบื้องต้น",
        category: "ev",
        included: ["ตรวจสอบแบตเตอรี่เสริม 12V และระบบคอนแทกเตอร์เบื้องต้น"],
      },
      {
        id: "ev-full-scan",
        name: "ตรวจเช็กอาการรถ EV (นอกสถานที่)",
        price: 1600,
        priceFormatted: "฿1,600",
        note: "ช่างผู้ชำนาญการตรวจสอบระบบขับเคลื่อนไฟฟ้า",
        category: "ev",
        included: [
          "ใช้เครื่องมือตรวจเช็คระบบไฟฟ้าแรงสูง (High Voltage) โดยช่างที่ผ่านการรับรอง",
          "ตรวจเช็คสถานะ BMS และระบบระบายความร้อนแบตเตอรี่",
        ],
      },
      {
        id: "ev-charge-issue",
        name: "ตรวจอาการชาร์จไม่เข้าเบื้องต้น",
        price: 1600,
        priceFormatted: "฿1,600",
        note: "ตรวจเช็กพอร์ตชาร์จและระบบควบคุมแบตเตอรี่",
        category: "ev",
        included: ["ตรวจพอร์ต AC / DC Lock Pin และระบบสื่อสารระหว่างรถกับตู้ชาร์จ"],
      },
      {
        id: "ev-warning-clear",
        name: "ตรวจไฟเตือนระบบ EV / อ่านโค้ด",
        price: 1600,
        priceFormatted: "฿1,600",
        note: "สแกนระบบคอมพิวเตอร์และรีเซ็ตระบบเบื้องต้น",
        category: "ev",
        included: ["สแกนโค้ดระบบขับเคลื่อนไฟฟ้าและระบบ Inverter พร้อมให้คำแนะนำ"],
      },
    ],
  },
  {
    id: "alternator",
    name: "ไดนาโม ระบบไฟ",
    sub: "ไดชาร์จเสีย ไดสตาร์ทเสีย ไฟไม่ชาร์จ เช็คฟิวส์",
    icon: "/assets/brand/services/service_repair.png",
    subServices: [
      {
        id: "alt-inspect-first",
        name: "เรียกช่างให้ไปดูก่อน จ่ายเงินหน้างาน",
        price: 400,
        priceFormatted: "฿400",
        note: "ตรวจเช็กระบบไดชาร์จและไดสตาร์ทหน้างาน",
        category: "alternator",
        included: ["วัดกำลังไฟชาร์จจากไดนาโม และกระแสไฟขณะบิดสตาร์ท"],
      },
      {
        id: "alt-replace-repair",
        name: "ไดชาร์จเสีย (นอกสถานที่)",
        price: 1200,
        priceFormatted: "฿1,200",
        note: "บริการถอดเช็กและซ่อมเปลี่ยนไดชาร์จ",
        category: "alternator",
        included: ["ค่าแรงถอดเปลี่ยนไดชาร์จตัวใหม่นอกสถานที่ และทดสอบระบบไฟชาร์จ"],
        excluded: ["ราคาค่าอะไหล่ลูกไดชาร์จ"],
      },
      {
        id: "alt-starter-repair",
        name: "ไดสตาร์ทเสีย (นอกสถานที่)",
        price: 1200,
        priceFormatted: "฿1,200",
        note: "บริการถอดเช็กและแก้ไขไดสตาร์ท",
        category: "alternator",
        included: ["เคาะกระตุ้นไดสตาร์ท หรือถอดเปลี่ยนออโตเมติกสตาร์ทหน้างาน"],
        excluded: ["ราคาอะไหล่ไดสตาร์ท"],
      },
      {
        id: "alt-fuse-tracing",
        name: "ไล่เช็คระบบไฟและฟิวส์",
        price: 1200,
        priceFormatted: "฿1,200",
        note: "ตรวจสอบไฟรั่ว ไฟไม่ชาร์จ ฟิวส์ขาด",
        category: "alternator",
        included: ["ใช้มิเตอร์ไล่สายไฟหาจุดช็อตหรือจุดกินกระแสไฟขณะดับเครื่อง"],
      },
    ],
  },
  {
    id: "radiator",
    name: "หม้อน้ำ ความร้อน",
    sub: "ความร้อนขึ้น น้ำแห้ง หม้อน้ำรั่ว ท่อยางแตก พัดลมไม่หมุน",
    icon: "/assets/brand/services/service_ac.png",
    subServices: [
      {
        id: "rad-inspect-first",
        name: "เรียกช่างให้ไปดูก่อน",
        price: 850,
        priceFormatted: "฿850",
        note: "ตรวจเช็กอาการเครื่องยนต์ความร้อนขึ้น",
        category: "radiator",
        included: [
          "เดินทางตรวจสอบระดับน้ำในหม้อน้ำและหม้อพัก",
          "ตรวจการทำงานของพัดลมหม้อน้ำ วาล์วน้ำ และปั๊มน้ำ",
        ],
        warning: "ห้ามเปิดฝาหม้อน้ำขณะเครื่องยนต์ยังร้อนจัดเด็ดขาด",
      },
      {
        id: "rad-coolant-flush",
        name: "เติมน้ำยาหล่อเย็น (นอกสถานที่)",
        price: 1200,
        priceFormatted: "฿1,200",
        note: "ไล่ลมหม้อน้ำและเติมน้ำยาหล่อเย็นมาตรฐาน",
        category: "radiator",
        included: ["บริการไล่อากาศในระบบระบายความร้อนและเติมน้ำยาหล่อเย็น"],
      },
      {
        id: "rad-leak-test",
        name: "ตรวจรั่วระบบน้ำ (นอกสถานที่)",
        price: 1200,
        priceFormatted: "฿1,200",
        note: "ทดสอบแรงดันตรวจหาจุดรั่วซึมของหม้อน้ำ",
        category: "radiator",
        included: ["ใช้ชุดปั๊มลมแรงดันอัดตรวจหาจุดรั่วที่รังผึ้ง ท่อยาง หรือตาน้ำ"],
      },
      {
        id: "rad-hose-replace",
        name: "เปลี่ยนฝาหม้อน้ำ / ท่อยางหม้อน้ำ",
        price: 1200,
        priceFormatted: "฿1,200",
        note: "เปลี่ยนอะไหล่ท่อยางหรือฝาหม้อน้ำที่ชำรุด",
        category: "radiator",
        included: ["ถอดเปลี่ยนท่อยางหม้อน้ำบน/ล่าง พร้อมรัดแคมป์แน่นหนา"],
        excluded: ["ราคาอะไหล่ท่อยางตรงรุ่น"],
      },
    ],
  },
  {
    id: "slide_car",
    name: "รถสไลด์",
    sub: "รถสไลด์ออน ถาดเตี้ย ย้ายรถอุบัติเหตุ รถเสีย รถโหลดเตี้ย",
    icon: "/assets/brand/services/service_slide_car.png",
    subServices: [
      {
        id: "slide-consult",
        name: "เรียกรถสไลด์ ย้ายรถฉุกเฉิน / น้ำท่วม (โทรนัดหมาย)",
        price: 450,
        priceFormatted: "฿450",
        note: "ปรึกษาและจองคิวรถสไลด์ล่วงหน้า",
        category: "slide_car",
        included: ["ค่ามัดจำจองคิวและประเมินระยะทางก่อนออกเดินทาง"],
      },
      {
        id: "slide-standard-pickup",
        name: "รถกระบะสไลด์ออน (ภายใน 15 กม.)",
        price: 1800,
        priceFormatted: "฿1,800",
        note: "บริการสไลด์ออนถาดเตี้ย รถไม่ช้ำ ปลอดภัย 100%",
        category: "slide_car",
        included: [
          "บริการบรรทุกรถขึ้นถาดสไลด์ทั้งคัน ปลอดภัยต่อระบบเกียร์และช่วงล่าง",
          "ครอบคลุมระยะทาง 15 กิโลเมตรแรก (กม. ถัดไปคิดตามอัตรามาตรฐาน)",
          "ประกันอุบัติเหตุคุ้มครองระหว่างการเคลื่อนย้าย",
        ],
      },
      {
        id: "slide-heavy-6wheel",
        name: "รถหกล้อสไลด์ (ภายใน 15 กม.)",
        price: 1900,
        priceFormatted: "฿1,900",
        note: "บรรทุกรถขนาดใหญ่ รถตู้ หรือ SUV ขนาดใหญ่",
        category: "slide_car",
        included: [
          "รถสไลด์ขนาดใหญ่รองรับน้ำหนักรถยนต์หนักหรือรถตู้ทรงสูง",
          "ครอบคลุม 15 กิโลเมตรแรก",
        ],
      },
      {
        id: "slide-express-urgent",
        name: "เรียกรถสไลด์ ด่วนพิเศษ",
        price: 3500,
        priceFormatted: "฿3,500",
        note: "จัดคิวรถสไลด์ออกเดินทางทันที 24 ชม. รับประกันเวลา",
        category: "slide_car",
        included: ["จัดส่งรถสไลด์ที่ใกล้ที่สุดออกเดินทางทันทีโดยไม่ต้องรอคิว"],
      },
    ],
  },
  {
    id: "towing",
    name: "รถยก",
    sub: "รถยกช้อนล้อ รถลากจูง กู้รถตกคู ติดหล่ม ในลานจอดรถแคบ",
    icon: "/assets/brand/services/service_slide_car.png",
    subServices: [
      {
        id: "tow-consult",
        name: "เรียกรถยก โทรคุยนัดหมาย",
        price: 350,
        priceFormatted: "฿350",
        note: "ปรึกษาสภาพหน้างานและนัดหมาย",
        category: "towing",
        included: ["ประเมินความสูงเพดานอาคารจอดรถและเส้นทาง"],
      },
      {
        id: "tow-small-parking",
        name: "รถยกเล็ก (ภายใน 15 กม.)",
        price: 1600,
        priceFormatted: "฿1,600",
        note: "ยกรถในพื้นที่จำกัดหรืออาคารจอดรถเพดานเตี้ย",
        category: "towing",
        included: [
          "รถยกขนาดกะทัดรัดสามารถเข้าอาคารจอดรถเพดานต่ำได้",
          "อุปกรณ์ช้อนล้อและล้อเสริมสำหรับรถขับเคลื่อน 4 ล้อ",
          "ระยะทาง 15 กม. แรก",
        ],
      },
      {
        id: "tow-heavy-truck",
        name: "รถยก 6ล้อ / 10ล้อ (ภายใน 15 กม.)",
        price: 4200,
        priceFormatted: "฿4,200",
        note: "ยกรถบรรทุกหรือยานพาหนะขนาดใหญ่",
        category: "towing",
        included: ["อุปกรณ์กว้านลากจูงกำลังสูงสำหรับรถบรรทุกหนัก"],
      },
      {
        id: "tow-rescue-winch",
        name: "กู้รถติดหล่ม / ตกคู / ดึงรถ",
        price: 1900,
        priceFormatted: "฿1,900",
        note: "บริการวินช์ลากจูงกู้ภัยฉุกเฉิน",
        category: "towing",
        included: [
          "วินช์สลิงเหล็กและรอกทดดึงรถขึ้นจากทางลาดชันหรือร่องน้ำ",
          "ผู้ควบคุมงานเชี่ยวชาญการกู้ภัยยานยนต์",
        ],
      },
    ],
  },
  {
    id: "motorcycle",
    name: "ซ่อมรถมอเตอร์ไซค์นอกสถานที่",
    sub: "ปะยาง จั๊มแบต เปลี่ยนหัวเทียน สายพาน โซ่สเตอร์",
    icon: "/assets/brand/services/service_motorcycle_repair.png",
    subServices: [
      {
        id: "mc-patch-tire",
        name: "ปะยางมอเตอร์ไซค์ (นอกสถานที่)",
        price: 250,
        priceFormatted: "฿250",
        note: "แทงไหมปะยางด่วนถึงที่ พร้อมเติมลม",
        category: "motorcycle",
        included: [
          "เดินทางถึงจุดเกิดเหตุ",
          "แทงไหมยาง Tubeless หรือเปลี่ยนยางในกรณีมียางใน",
          "เติมลมยางมาตรฐาน",
        ],
      },
      {
        id: "mc-battery-jump",
        name: "จั๊มสตาร์ท / เปลี่ยนแบตมอเตอร์ไซค์",
        price: 300,
        priceFormatted: "฿300",
        note: "พ่วงสตาร์ทหรือเปลี่ยนแบตเตอรี่ใหม่",
        category: "motorcycle",
        included: ["พ่วงสตาร์ทมอเตอร์ไซค์ หรือค่าแรงเปลี่ยนใส่แบตเตอรี่ลูกใหม่"],
        excluded: ["ราคาลูกแบตเตอรี่ใหม่กรณีต้องการเปลี่ยน"],
      },
      {
        id: "mc-quick-fix-parts",
        name: "เปลี่ยนหัวเทียน / สายพาน / โซ่สเตอร์",
        price: 350,
        priceFormatted: "฿350",
        note: "ตรวจเช็กและเปลี่ยนอะไหล่ด่วนถึงจุดเกิดเหตุ",
        category: "motorcycle",
        included: ["ค่าบริการเปลี่ยนอะไหล่ฉุกเฉินนอกสถานที่"],
        excluded: ["ราคาอะไหล่ชิ้นใหม่"],
      },
    ],
  },
];

// Helper functions
export function getCategoryById(id: string): ServiceCategory | undefined {
  return SERVICE_CATEGORIES.find((cat) => cat.id === id);
}

export function getSubServiceById(categoryId: string, subServiceId: string): SubService | undefined {
  const cat = getCategoryById(categoryId);
  if (!cat) return undefined;
  return cat.subServices.find((s) => s.id === subServiceId);
}
