"use client";

import React, { useState } from "react";
import { MapPin, Navigation, CheckCircle2, AlertCircle, RefreshCw, X, ExternalLink } from "lucide-react";

interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
}

interface LiveLocationPickerProps {
  onLocationChange: (loc: LocationData | null) => void;
  initialLocation?: LocationData | null;
  label?: string;
  helperText?: string;
  required?: boolean;
  compact?: boolean;
}

export default function LiveLocationPicker({
  onLocationChange,
  initialLocation,
  label = "Service Drop-off / Gate Location",
  helperText = "Attach your real-time GPS pin so our dispatch compactor trucks navigate directly to your gate.",
  required = false,
  compact = false,
}: LiveLocationPickerProps) {
  const [location, setLocation] = useState<LocationData | null>(initialLocation || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estimate neighborhood based on coordinates in Greater Kampala / Entebbe corridor
  const estimateCorridor = (lat: number, lng: number): string => {
    // Basic bounding approximation for Uganda Entebbe-Kampala corridor
    if (lat < 0.1) return "Entebbe Municipality / Lake Victoria Shore";
    if (lat >= 0.1 && lat < 0.23) return "Kitende / Kajjansi Entebbe Road Sector";
    if (lat >= 0.23 && lat < 0.28) return "Lubowa / Seguku / Bunamwaya Area";
    if (lat >= 0.28 && lat < 0.33) return "Kampala Central / Nakasero / Kololo Sector";
    if (lat >= 0.33 && lng > 32.65) return "Namanve / Mukono Industrial Corridor";
    if (lat >= 0.33 && lng <= 32.65) return "Kira / Ntinda / Naguru Sector";
    return "Greater Kampala Metropolitan Area";
  };

  const detectLocation = () => {
    setLoading(true);
    setError(null);

    if (typeof window === "undefined" || !navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = parseFloat(position.coords.latitude.toFixed(6));
        const lng = parseFloat(position.coords.longitude.toFixed(6));
        const address = estimateCorridor(lat, lng);

        const newLoc: LocationData = {
          latitude: lat,
          longitude: lng,
          address: `${address} (±${Math.round(position.coords.accuracy)}m accuracy)`,
        };

        setLocation(newLoc);
        onLocationChange(newLoc);
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError("Location permission was denied. Please enable location permissions in your browser.");
            break;
          case err.POSITION_UNAVAILABLE:
            setError("GPS location information is currently unavailable.");
            break;
          case err.TIMEOUT:
            setError("Location request timed out. Please try again.");
            break;
          default:
            setError("Failed to obtain live location.");
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 0,
      }
    );
  };

  const handleClear = () => {
    setLocation(null);
    onLocationChange(null);
    setError(null);
  };

  return (
    <div className={`space-y-2 ${compact ? "text-xs" : ""}`}>
      <div className="flex items-center justify-between">
        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#006F51]" />
            <span>{label}</span>
            {required && <span className="text-red-500">*</span>}
          </span>
        </label>
        {location && (
          <button
            type="button"
            onClick={handleClear}
            className="text-[10px] text-gray-400 hover:text-red-500 font-semibold flex items-center gap-0.5 cursor-pointer"
          >
            <X className="w-3 h-3" />
            <span>Remove Pin</span>
          </button>
        )}
      </div>

      {!location ? (
        <div className="space-y-2">
          <button
            type="button"
            onClick={detectLocation}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#E9F4F0] hover:bg-emerald-100/80 border border-[#006F51]/30 rounded-lg text-xs font-bold text-[#006F51] transition-all cursor-pointer shadow-2xs group"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-[#006F51]" />
                <span>Acquiring High-Accuracy GPS Satellite Fix...</span>
              </>
            ) : (
              <>
                <Navigation className="w-4 h-4 text-[#006F51] group-hover:scale-110 transition-transform" />
                <span>📍 Capture Live GPS Pin for Truck Dispatch</span>
              </>
            )}
          </button>
          {helperText && <p className="text-[11px] text-gray-500 leading-snug">{helperText}</p>}
        </div>
      ) : (
        <div className="p-3 bg-emerald-50/90 border border-emerald-300 rounded-xl space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#006F51] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-emerald-900">
                  Live GPS Attached Successfully
                </div>
                <div className="text-[11px] font-mono text-[#006F51] font-semibold">
                  {location.latitude}&deg; N, {location.longitude}&deg; E
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={detectLocation}
                disabled={loading}
                className="p-1 text-emerald-700 hover:text-[#006F51] rounded hover:bg-emerald-100 transition-colors"
                title="Refresh GPS Fix"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              </button>
              <a
                href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#006F51] hover:underline bg-white px-2 py-0.5 rounded border border-emerald-200"
                title="Verify location on Google Maps"
              >
                <span>Map</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {location.address && (
            <div className="text-[11px] text-gray-600 bg-white/70 px-2.5 py-1 rounded border border-emerald-100 flex items-center justify-between">
              <span>Sector: <strong>{location.address}</strong></span>
              <span className="text-[10px] text-emerald-700 font-bold uppercase">Ready for Routing</span>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
