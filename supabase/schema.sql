-- ============================================================
-- FixNow Database Schema for Supabase
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard)
-- Project → SQL Editor → New query → Paste & Run
-- ============================================================

-- 1. PROFILES TABLE
-- Linked to auth.users via id (auto-created on signup)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  phone TEXT,
  email TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'mechanic', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies: Users can read all profiles, but only update their own
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 2. SERVICE CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.service_categories (
  id TEXT PRIMARY KEY,
  name_th TEXT NOT NULL,
  name_en TEXT,
  description TEXT,
  icon_url TEXT,
  badge TEXT CHECK (badge IN ('HOT', 'FREE', 'NEW', NULL)),
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service categories are viewable by everyone"
  ON public.service_categories FOR SELECT
  USING (true);

-- Seed default service categories
INSERT INTO public.service_categories (id, name_th, name_en, description, badge, sort_order) VALUES
  ('repair', 'ช่างซ่อมรถยนต์', 'Car Repair', 'ซ่อมเครื่องยนต์ ระบบไฟ ระบบเบรก', 'HOT', 1),
  ('battery', 'ช่างแบตเตอรี่ รถยนต์', 'Battery Service', 'พ่วงแบต เปลี่ยนแบตเตอรี่ถึงที่', 'HOT', 2),
  ('tire', 'ช่างปะยาง รถยนต์', 'Tire Service', 'ปะยาง เปลี่ยนยาง ถ่วงล้อ', NULL, 3),
  ('key', 'ช่างกุญแจ รถยนต์', 'Car Locksmith', 'เปิดกุญแจ ทำกุญแจสำรอง', NULL, 4),
  ('fuel', 'เติมน้ำมันฉุกเฉิน', 'Emergency Fuel', 'บริการเติมน้ำมันฉุกเฉิน', NULL, 5),
  ('ev', 'ช่างรถ EV', 'EV Service', 'ซ่อมรถยนต์ไฟฟ้า ชาร์จ EV', NULL, 6),
  ('dynamo', 'ไดนาโม ระบบไฟ', 'Electrical System', 'ซ่อมไดนาโม ระบบชาร์จ', NULL, 7),
  ('radiator', 'หม้อน้ำ', 'Radiator', 'ซ่อมหม้อน้ำ ระบบหล่อเย็น', NULL, 8),
  ('slide', 'รถสไลด์ / รถยก', 'Tow Truck', 'บริการรถสไลด์ เคลื่อนย้ายรถ', NULL, 9),
  ('motorcycle', 'บริการมอเตอร์ไซค์', 'Motorcycle', 'ซ่อมมอเตอร์ไซค์ทุกชนิด', NULL, 10),
  ('parts', 'สั่งอะไหล่ใกล้ฉัน', 'Auto Parts', 'อะไหล่รถยนต์และมอเตอร์ไซค์', NULL, 11),
  ('flood', 'ช่างอาสาช่วยน้ำท่วม', 'Flood Rescue', 'รถจมน้ำ สตาร์ทไม่ติด', 'NEW', 12)
ON CONFLICT (id) DO NOTHING;

-- 3. MECHANICS TABLE (Extended profile for mechanic partners)
CREATE TABLE IF NOT EXISTS public.mechanics (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  garage_name TEXT,
  id_card_number TEXT,
  province TEXT,
  service_radius_km INT DEFAULT 25,
  skills TEXT[] DEFAULT '{}',
  rating NUMERIC(3,2) DEFAULT 0,
  total_reviews INT DEFAULT 0,
  total_cases INT DEFAULT 0,
  experience_years INT DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  is_online BOOLEAN DEFAULT false,
  location_lat DOUBLE PRECISION,
  location_lng DOUBLE PRECISION,
  bank_account TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.mechanics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Mechanics are viewable by everyone"
  ON public.mechanics FOR SELECT
  USING (true);

CREATE POLICY "Mechanics can update their own profile"
  ON public.mechanics FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Mechanics can insert their own profile"
  ON public.mechanics FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 4. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  mechanic_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  service_category_id TEXT REFERENCES public.service_categories(id),
  service_type TEXT NOT NULL,
  vehicle_type TEXT,
  car_brand TEXT,
  license_plate TEXT,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  location_lat DOUBLE PRECISION,
  location_lng DOUBLE PRECISION,
  symptoms TEXT,
  photo_urls TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'in_progress', 'completed', 'cancelled')),
  estimated_price NUMERIC(10,2),
  final_price NUMERIC(10,2),
  mechanic_notes TEXT,
  cancelled_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Customers can see their own bookings
CREATE POLICY "Customers can view their own bookings"
  ON public.bookings FOR SELECT
  USING (auth.uid() = customer_id);

-- Mechanics can see bookings assigned to them
CREATE POLICY "Mechanics can view their assigned bookings"
  ON public.bookings FOR SELECT
  USING (auth.uid() = mechanic_id);

-- Customers can create bookings
CREATE POLICY "Customers can create bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (auth.uid() = customer_id);

-- Customers can update their pending bookings (cancel)
CREATE POLICY "Customers can update their own bookings"
  ON public.bookings FOR UPDATE
  USING (auth.uid() = customer_id);

-- Mechanics can update bookings assigned to them
CREATE POLICY "Mechanics can update assigned bookings"
  ON public.bookings FOR UPDATE
  USING (auth.uid() = mechanic_id);

-- 5. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  mechanic_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews are viewable by everyone"
  ON public.reviews FOR SELECT
  USING (true);

CREATE POLICY "Customers can create reviews for their bookings"
  ON public.reviews FOR INSERT
  WITH CHECK (auth.uid() = customer_id);

-- 6. AUTO-CREATE PROFILE ON SIGNUP (Trigger)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, avatar_url, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.email,
    NEW.raw_user_meta_data->>'avatar_url',
    'customer'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if any, then create
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- DONE! Your FixNow database is ready.
-- ============================================================
