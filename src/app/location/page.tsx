"use client";

import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, Search, Crosshair, MapPin, X, Loader2, Navigation } from "lucide-react";
import { useUserLocation, formatShortAddress } from "@/contexts/LocationContext";

// Default coordinates: Democracy Monument, Bangkok (same as 24carfix default)
const DEFAULT_LAT = 13.7563;
const DEFAULT_LNG = 100.5018;

interface SearchResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

function LocationPickerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/";

  const { location, setPinnedLocation } = useUserLocation();

  // Map state
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number }>(() => {
    if (location && location.lat && location.lng) {
      return { lat: location.lat, lng: location.lng };
    }
    return { lat: DEFAULT_LAT, lng: DEFAULT_LNG };
  });

  // UI state
  const [address, setAddress] = useState<string>(location?.address || "อนุสาวรีย์ประชาธิปไตย, ถนนราชดำเนินกลาง, เขตพระนคร, กรุงเทพมหานคร");
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [isPinBouncing, setIsPinBouncing] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [isLocatingUser, setIsLocatingUser] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Reverse geocoding helper (Thai)
  const fetchAddress = useCallback(async (lat: number, lng: number) => {
    setIsLoadingAddress(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1&accept-language=th`,
        { headers: { "User-Agent": "FixNowPlatform/1.0" } }
      );
      if (res.ok) {
        const data = await res.json();
        if (data && data.display_name) {
          // Format Thai address cleanly: road, subdistrict, district, province
          const addr = data.address || {};
          const road = addr.road || addr.street || addr.pedestrian || addr.suburb || "";
          const subdistrict = addr.neighbourhood || addr.subdistrict || addr.quarter || "";
          const district = addr.city_district || addr.district || addr.county || "";
          const province = addr.state || addr.province || addr.city || "กรุงเทพมหานคร";

          const cleanParts = [road, subdistrict, district, province].filter(Boolean);
          const formatted = cleanParts.length > 0 ? cleanParts.join(" ") : data.display_name;
          setAddress(formatted);
          return;
        }
      }
      setAddress("ไม่พบสถานที่จากการค้นหา");
    } catch {
      setAddress("ตำแหน่งพิกัด: " + lat.toFixed(4) + ", " + lng.toFixed(4));
    } finally {
      setIsLoadingAddress(false);
    }
  }, []);

  // Initialize Leaflet Map
  useEffect(() => {
    let isMounted = true;

    // Load Leaflet CSS dynamically if not present
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    // Load Leaflet JS from CDN
    const loadLeaflet = async () => {
      if (typeof window === "undefined" || !mapContainerRef.current) return;

      const getL = () =>
        new Promise<any>((resolve) => {
          if ((window as any).L) {
            resolve((window as any).L);
            return;
          }
          const existingScript = document.getElementById("leaflet-js");
          if (existingScript) {
            existingScript.addEventListener("load", () => resolve((window as any).L));
            return;
          }
          const script = document.createElement("script");
          script.id = "leaflet-js";
          script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
          script.async = true;
          script.onload = () => resolve((window as any).L);
          document.head.appendChild(script);
        });

      const L = await getL();

      if (!isMounted || !mapContainerRef.current || !L) return;

      // Clean up previous map instance if any
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const initialLat = coords.lat;
      const initialLng = coords.lng;

      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: 16,
        zoomControl: false,
        attributionControl: false,
      });

      // OpenStreetMap standard tiles (Free, No API key required, reliable worldwide)
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Listen for map movement
      map.on("movestart", () => {
        setIsPinBouncing(true);
      });

      map.on("moveend", () => {
        setIsPinBouncing(false);
        const center = map.getCenter();
        setCoords({ lat: center.lat, lng: center.lng });
        fetchAddress(center.lat, center.lng);
      });

      mapInstanceRef.current = map;

      // Check if location permission prompt is needed
      const hasAskedPermission = localStorage.getItem("fixnow_geo_prompt_shown");
      if (!hasAskedPermission && !location) {
        setShowPermissionModal(true);
      }
    };

    loadLeaflet();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [fetchAddress]);

  // Request native GPS location
  const handleRequestGPS = () => {
    setShowPermissionModal(false);
    localStorage.setItem("fixnow_geo_prompt_shown", "true");
    setIsLocatingUser(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setCoords({ lat, lng });

          if (mapInstanceRef.current) {
            mapInstanceRef.current.flyTo([lat, lng], 17, { duration: 1.2 });
          }
          fetchAddress(lat, lng);
          setIsLocatingUser(false);
        },
        () => {
          setIsLocatingUser(false);
        },
        { enableHighAccuracy: true, timeout: 6000 }
      );
    } else {
      setIsLocatingUser(false);
    }
  };

  // Search places with debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    if (!val.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    searchTimeoutRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            val
          )}&countrycodes=th&limit=5&accept-language=th`,
          { headers: { "User-Agent": "FixNowPlatform/1.0" } }
        );
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data || []);
          setShowSearchResults(true);
        }
      } catch {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 400);
  };

  // Select place from search result
  const handleSelectPlace = (item: SearchResult) => {
    const lat = parseFloat(item.lat);
    const lng = parseFloat(item.lon);
    setCoords({ lat, lng });
    setSearchQuery("");
    setShowSearchResults(false);

    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([lat, lng], 17, { duration: 1.2 });
    }
    fetchAddress(lat, lng);
  };

  // Confirm pin & return
  const handleConfirmPin = () => {
    setPinnedLocation({
      lat: coords.lat,
      lng: coords.lng,
      address,
      shortAddress: formatShortAddress(address),
    });
    router.push(returnUrl);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden flex flex-col bg-slate-100 select-none">
      {/* Top Search Bar (Matching 24carfix location page header) */}
      <div className="absolute top-0 left-0 right-0 z-30 p-3 pt-[calc(0.75rem+env(safe-area-inset-top,0px))] flex items-center gap-2 bg-gradient-to-b from-white/95 via-white/80 to-transparent">
        {/* Back Button */}
        <button
          onClick={() => router.push(returnUrl)}
          className="w-11 h-11 rounded-full bg-white shadow-md border border-slate-200/80 flex items-center justify-center text-slate-700 active:scale-95 transition shrink-0"
          aria-label="ย้อนกลับ"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Search Input Box */}
        <div className="flex-1 relative">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => {
                if (searchResults.length > 0) setShowSearchResults(true);
              }}
              placeholder="ค้นหาสถานที่"
              className="w-full h-11 pl-11 pr-9 rounded-2xl bg-white shadow-md border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setShowSearchResults(false);
                }}
                className="absolute right-3 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {showSearchResults && (
            <div className="absolute top-13 left-0 right-0 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 max-h-64 overflow-y-auto">
              {isSearching ? (
                <div className="p-4 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                  <span>กำลังค้นหาสถานที่...</span>
                </div>
              ) : searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <button
                    key={item.place_id}
                    onClick={() => handleSelectPlace(item)}
                    className="w-full text-left p-3.5 hover:bg-orange-50/70 border-b border-slate-50 last:border-none flex items-start gap-2.5 transition"
                  >
                    <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-800 font-medium line-clamp-2">
                      {item.display_name}
                    </span>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-slate-400">
                  ไม่พบสถานที่จากการค้นหา
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Map Viewport */}
      <div className="relative flex-1 w-full h-full">
        {/* Leaflet Map Div */}
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Center Animated Pin Marker (Exact center of viewport) */}
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full z-20 pointer-events-none transition-transform duration-200 ${
            isPinBouncing ? "-translate-y-[130%] scale-105" : "-translate-y-full scale-100"
          }`}
        >
          {/* Main Pin */}
          <div className="relative flex flex-col items-center">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#FF5A18] to-orange-500 shadow-xl border-2 border-white flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-white shadow-inner" />
            </div>
            {/* Triangle Tip */}
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#FF5A18] -mt-0.5" />
            {/* Ground Shadow */}
            <div
              className={`w-4 h-1.5 rounded-full bg-black/25 blur-[1.5px] transition-all duration-200 ${
                isPinBouncing ? "scale-75 opacity-40 mt-3" : "scale-100 opacity-80 mt-1"
              }`}
            />
          </div>
        </div>

        {/* GPS Re-center Floating Button */}
        <button
          onClick={handleRequestGPS}
          disabled={isLocatingUser}
          className="absolute right-4 bottom-48 z-20 w-12 h-12 rounded-full bg-white shadow-xl border border-slate-200/90 flex items-center justify-center text-slate-700 hover:text-orange-600 active:scale-95 transition"
          aria-label="ตำแหน่งปัจจุบันของคุณ"
        >
          {isLocatingUser ? (
            <Loader2 className="w-6 h-6 animate-spin text-orange-600" />
          ) : (
            <Crosshair className="w-6 h-6 text-slate-700" />
          )}
        </button>
      </div>

      {/* Bottom Sheet Card (Matching 24carfix location page bottom sheet) */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-white rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] border-t border-slate-100 p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))]">
        <div className="w-12 h-1.5 rounded-full bg-slate-200 mx-auto mb-4" />

        {/* Title & Subtitle */}
        <div className="mb-3">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            ปักหมุดสถานที่
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            ช่างจะเดินทางไปยังสถานที่ ตามที่ได้ปักหมุด
          </p>
        </div>

        {/* Address text display */}
        <div className="min-h-[44px] flex items-center gap-2 mb-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
          {isLoadingAddress ? (
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Loader2 className="w-4 h-4 animate-spin text-orange-500 shrink-0" />
              <span>กำลังโหลดสถานที่...</span>
            </div>
          ) : (
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
              <p className="text-xs font-semibold text-slate-800 line-clamp-2">
                {address}
              </p>
            </div>
          )}
        </div>

        {/* Primary Action Button */}
        <button
          onClick={handleConfirmPin}
          disabled={isLoadingAddress}
          className="w-full h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 active:scale-[0.98] text-white font-bold text-base shadow-lg shadow-orange-500/25 transition disabled:opacity-60 flex items-center justify-center gap-2"
        >
          <span>ปักหมุด</span>
        </button>
      </div>

      {/* Permission Modal Dialog (Matching 24carfix sample image 1) */}
      {showPermissionModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#1e1e24] text-white rounded-3xl p-6 shadow-2xl border border-white/10 animate-in fade-in zoom-in-95 duration-200">
            {/* Header with Close X */}
            <div className="flex items-start justify-between mb-4">
              <div className="pr-4">
                <h3 className="font-bold text-base text-white">
                  fixnow.co.th ต้องการที่จะ
                </h3>
                <div className="flex items-center gap-2 mt-2 text-slate-300 text-sm">
                  <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>ทราบตำแหน่งของคุณ</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowPermissionModal(false);
                  localStorage.setItem("fixnow_geo_prompt_shown", "true");
                }}
                className="text-slate-400 hover:text-white p-1"
                aria-label="ปิด"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 3 Buttons matching 24carfix prompt */}
            <div className="space-y-2.5 mt-6">
              <button
                onClick={handleRequestGPS}
                className="w-full py-3 px-4 rounded-full bg-[#5b326a] hover:bg-[#6c3b7e] active:scale-98 text-white font-semibold text-sm transition text-center shadow-md"
              >
                อนุญาตขณะเข้าชมเว็บไซต์
              </button>
              <button
                onClick={handleRequestGPS}
                className="w-full py-3 px-4 rounded-full bg-[#5b326a]/90 hover:bg-[#6c3b7e] active:scale-98 text-white font-semibold text-sm transition text-center"
              >
                อนุญาตในครั้งนี้
              </button>
              <button
                onClick={() => {
                  setShowPermissionModal(false);
                  localStorage.setItem("fixnow_geo_prompt_shown", "true");
                }}
                className="w-full py-3 px-4 rounded-full bg-[#5b326a]/50 hover:bg-[#5b326a]/70 active:scale-98 text-slate-300 font-semibold text-sm transition text-center"
              >
                ไม่อนุญาต
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LocationPickerPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      }
    >
      <LocationPickerContent />
    </Suspense>
  );
}
