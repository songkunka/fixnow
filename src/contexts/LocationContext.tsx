"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserLocation {
  lat: number;
  lng: number;
  address: string;
  shortAddress: string;
  isRealGps?: boolean;
  isManualPin?: boolean;
  updatedAt: string;
}

interface LocationContextType {
  location: UserLocation | null;
  isPinned: boolean;
  isRequestingLocation: boolean;
  setPinnedLocation: (loc: { lat: number; lng: number; address: string; shortAddress?: string; isRealGps?: boolean }) => void;
  requestCurrentLocation: (remember?: boolean) => Promise<UserLocation | null>;
  clearLocation: () => void;
}

const STORAGE_KEY = "fixnow_user_location";
const EVENT_KEY = "fixnow:location_changed";

const LocationContext = createContext<LocationContextType | undefined>(undefined);

// Helper function to extract a clean, concise short address (e.g., "ถ.ดินสอ, พระนคร")
export function formatShortAddress(fullAddress: string): string {
  if (!fullAddress) return "เลือกตำแหน่งของคุณ";
  
  // Clean up common Thai prefixes and commas
  const parts = fullAddress
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);

  if (parts.length <= 2) {
    return fullAddress.length > 28 ? fullAddress.slice(0, 26) + "..." : fullAddress;
  }

  // Take the first 2 parts (e.g. road and subdistrict or district)
  return `${parts[0]}, ${parts[1]}`;
}

// Shared Thai Reverse Geocoding helper
export async function fetchReverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1&accept-language=th`,
      { headers: { "User-Agent": "FixNowPlatform/1.0" } }
    );
    if (res.ok) {
      const data = await res.json();
      if (data && data.display_name) {
        return data.display_name;
      }
    }
  } catch (err) {
    console.warn("Reverse geocode failed:", err);
  }
  return `พิกัด ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
}

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [isRequestingLocation, setIsRequestingLocation] = useState(false);

  useEffect(() => {
    // Read from localStorage on mount
    try {
      localStorage.removeItem("fixnow_geo_prompt_shown");
      localStorage.removeItem("fixnow_home_geo_dismissed");

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Clear old dummy Bangkok coordinates if not from real GPS or manual user pin
        const isDummyBangkok =
          Math.abs(parsed.lat - 13.7563) < 0.001 &&
          Math.abs(parsed.lng - 100.5018) < 0.001 &&
          !parsed.isRealGps &&
          !parsed.isManualPin;

        if (isDummyBangkok) {
          localStorage.removeItem(STORAGE_KEY);
          setLocation(null);
        } else {
          setLocation(parsed);
        }
      }
    } catch {
      // ignore JSON errors
    }

    // Listen for custom event
    const handleLocationChange = (e: Event) => {
      const customEvent = e as CustomEvent<UserLocation | null>;
      if (customEvent.detail !== undefined) {
        setLocation(customEvent.detail);
      }
    };

    window.addEventListener(EVENT_KEY, handleLocationChange);
    return () => {
      window.removeEventListener(EVENT_KEY, handleLocationChange);
    };
  }, []);

  const setPinnedLocation = (loc: { lat: number; lng: number; address: string; shortAddress?: string; isRealGps?: boolean }) => {
    const short = loc.shortAddress || formatShortAddress(loc.address);
    const newLoc: UserLocation = {
      lat: loc.lat,
      lng: loc.lng,
      address: loc.address,
      shortAddress: short,
      isRealGps: loc.isRealGps ?? false,
      isManualPin: true,
      updatedAt: new Date().toISOString(),
    };

    setLocation(newLoc);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newLoc));
      window.dispatchEvent(new CustomEvent(EVENT_KEY, { detail: newLoc }));
    } catch {
      // ignore storage errors
    }
  };

  const requestCurrentLocation = async (remember = true): Promise<UserLocation | null> => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      console.warn("Geolocation is not supported by this browser.");
      return null;
    }

    setIsRequestingLocation(true);

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          console.log("Real GPS Coordinates received:", lat, lng);

          const fullAddress = await fetchReverseGeocode(lat, lng);
          const short = formatShortAddress(fullAddress);

          const newLoc: UserLocation = {
            lat,
            lng,
            address: fullAddress,
            shortAddress: short,
            isRealGps: true,
            isManualPin: false,
            updatedAt: new Date().toISOString(),
          };

          setLocation(newLoc);
          setIsRequestingLocation(false);

          if (remember) {
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(newLoc));
              window.dispatchEvent(new CustomEvent(EVENT_KEY, { detail: newLoc }));
            } catch {
              // ignore storage errors
            }
          }

          resolve(newLoc);
        },
        (error) => {
          console.warn("Browser Geolocation permission denied or failed:", error.code, error.message);
          setIsRequestingLocation(false);
          resolve(null);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    });
  };

  const clearLocation = () => {
    setLocation(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent(EVENT_KEY, { detail: null }));
    } catch {
      // ignore
    }
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        isPinned: !!location,
        isRequestingLocation,
        setPinnedLocation,
        requestCurrentLocation,
        clearLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useUserLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    // Fallback if used outside provider
    return {
      location: null,
      isPinned: false,
      isRequestingLocation: false,
      setPinnedLocation: () => {},
      requestCurrentLocation: async () => null,
      clearLocation: () => {},
    };
  }
  return context;
}
