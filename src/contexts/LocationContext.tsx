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
  setPinnedLocation: (loc: { lat: number; lng: number; address: string; shortAddress?: string }) => void;
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

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<UserLocation | null>(null);

  useEffect(() => {
    // Read from localStorage on mount
    try {
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
        setPinnedLocation,
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
      setPinnedLocation: () => {},
      clearLocation: () => {},
    };
  }
  return context;
}
