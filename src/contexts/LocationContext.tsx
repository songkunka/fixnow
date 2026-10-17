"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserLocation {
  lat: number;
  lng: number;
  address: string;
  shortAddress: string;
  updatedAt: string;
}

interface LocationContextType {
  location: UserLocation | null;
  isPinned: boolean;
  isRequestingLocation: boolean;
  setPinnedLocation: (loc: { lat: number; lng: number; address: string; shortAddress?: string }) => void;
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
      // Clear legacy blocking flag if present
      localStorage.removeItem("fixnow_geo_prompt_shown");

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setLocation(parsed);
      }
    } catch {
      // ignore JSON errors
    }

    // Listen for custom event
    const handleLocationChange = (e: Event) => {
      const customEvent = e as CustomEvent<UserLocation>;
      if (customEvent.detail) {
        setLocation(customEvent.detail);
      }
    };

    window.addEventListener(EVENT_KEY, handleLocationChange);
    return () => {
      window.removeEventListener(EVENT_KEY, handleLocationChange);
    };
  }, []);

  const setPinnedLocation = (loc: { lat: number; lng: number; address: string; shortAddress?: string }) => {
    const short = loc.shortAddress || formatShortAddress(loc.address);
    const newLoc: UserLocation = {
      lat: loc.lat,
      lng: loc.lng,
      address: loc.address,
      shortAddress: short,
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
      return null;
    }

    setIsRequestingLocation(true);

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const fullAddress = await fetchReverseGeocode(lat, lng);
          const short = formatShortAddress(fullAddress);

          const newLoc: UserLocation = {
            lat,
            lng,
            address: fullAddress,
            shortAddress: short,
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
          console.warn("Geolocation request failed or was denied:", error);
          setIsRequestingLocation(false);
          resolve(null);
        },
        { enableHighAccuracy: true, timeout: 8000 }
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
