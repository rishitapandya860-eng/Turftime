"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Venue, SportType } from "@/types";
import { MUMBAI_LOCATIONS } from "@/data/venues";
import {
  Calendar,
  Clock,
  Filter,
  MapPin,
  Sparkles,
  IndianRupee,
  ShieldCheck,
  Check,
  ArrowRight,
  Flame,
  X,
  Search,
} from "lucide-react";

interface SlotFinderSectionProps {
  venues: Venue[];
  activeSport: SportType;
  onSelectSport: (sport: SportType) => void;
  onBookVenueSlot: (venue: Venue, date: string, slot: string) => void;
  onViewVenue: (venue: Venue) => void;
}

const COMMON_SLOTS = [
  "06:00 AM - 07:00 AM",
  "07:00 AM - 08:00 AM",
  "05:00 PM - 06:00 PM",
  "06:00 PM - 07:00 PM",
  "07:00 PM - 08:00 PM",
  "08:00 PM - 09:00 PM",
  "09:00 PM - 10:00 PM",
  "10:00 PM - 11:00 PM",
];

const AMENITY_OPTIONS = [
  "Night Floodlights",
  "Free Parking",
  "Air Conditioned",
  "Locker & Shower",
  "Rain Canopy",
];

export default function SlotFinderSection({
  venues,
  activeSport,
  onSelectSport,
  onBookVenueSlot,
  onViewVenue,
}: SlotFinderSectionProps) {
  // Filters
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [maxPrice, setMaxPrice] = useState(2500);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("08:00 PM - 09:00 PM");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("2026-10-19");
  const [todayStr, setTodayStr] = useState("2026-10-19");
  const [tomorrowStr, setTomorrowStr] = useState("2026-10-20");

  useEffect(() => {
    const today = new Date();
    const todayFormatted = today.toISOString().split("T")[0];
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowFormatted = tomorrow.toISOString().split("T")[0];

    setSelectedDate(todayFormatted);
    setTodayStr(todayFormatted);
    setTomorrowStr(tomorrowFormatted);
  }, []);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const resetFilters = () => {
    onSelectSport("all");
    setSelectedLocation("All Locations");
    setMaxPrice(2500);
    setSearchKeyword("");
    setSelectedAmenities([]);
  };

  // Filter computation
  const filteredVenues = useMemo(() => {
    return venues.filter((venue) => {
      // 1. Sport
      if (activeSport !== "all" && venue.sport !== activeSport) {
        return false;
      }
      // 2. Location
      if (
        selectedLocation !== "All Locations" &&
        !venue.location.toLowerCase().includes(selectedLocation.toLowerCase())
      ) {
        return false;
      }
      // 3. Price
      if (venue.pricePerHour > maxPrice) {
        return false;
      }
      // 4. Keyword
      if (searchKeyword.trim()) {
        const q = searchKeyword.toLowerCase();
        const matches =
          venue.name.toLowerCase().includes(q) ||
          venue.location.toLowerCase().includes(q) ||
          venue.sportLabel.toLowerCase().includes(q) ||
          venue.turfSpecs.toLowerCase().includes(q);
        if (!matches) return false;
      }
      // 5. Amenities
      if (selectedAmenities.length > 0) {
        const hasAll = selectedAmenities.every((req) =>
          venue.amenities.some((a) =>
            a.toLowerCase().includes(req.toLowerCase().replace(/s$/, ""))
          )
        );
        if (!hasAll) return false;
      }
      return true;
    });
  }, [venues, activeSport, selectedLocation, maxPrice, searchKeyword, selectedAmenities]);

  return (
    <section id="slot-finder" className="py-20 relative bg-[#070e0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#122217] text-[#22c55e] text-xs font-bold uppercase tracking-wider border border-[#1b3624] mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>INTERACTIVE DISCOVERY ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-jakarta">
            Find Your Perfect Slot
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Filter Mumbai arenas by sport, timing, location, price, and facility specs.
            Select a slot to immediately prepare your booking request.
          </p>
        </div>

        {/* Filter Container */}
        <div className="p-6 rounded-2xl bg-[#0a150e] border border-[#1a3324] shadow-xl mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search Keyword */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-2">
                <Search className="w-3.5 h-3.5 text-[#22c55e]" />
                <span>Search by Keyword</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. AstroTurf, BKC, AC Wood, 7v7..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e1d14] border border-[#1a3324] text-white text-sm focus:outline-none focus:border-[#22c55e] transition-colors placeholder:text-gray-500"
                />
                {searchKeyword && (
                  <button
                    onClick={() => setSearchKeyword("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Location Dropdown */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-2">
                <MapPin className="w-3.5 h-3.5 text-[#22c55e]" />
                <span>Area / Mumbai Hub</span>
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e1d14] border border-[#1a3324] text-white text-sm focus:outline-none focus:border-[#22c55e] transition-colors cursor-pointer"
              >
                {MUMBAI_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc} className="bg-[#0e1d14]">
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Max Hourly Budget */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <IndianRupee className="w-3.5 h-3.5 text-[#22c55e]" />
                  <span>Max Budget / Hour</span>
                </label>
                <span className="text-sm font-extrabold text-white">
                  ₹{maxPrice.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min="700"
                max="2500"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#22c55e] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                <span>₹700</span>
                <span>₹1,600</span>
                <span>₹2,500</span>
              </div>
            </div>
          </div>

          {/* Quick Date Horizon & Time Slots */}
          <div className="mt-6 pt-6 border-t border-[#152a1c] grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Preferred Date */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-2.5">
                <Calendar className="w-3.5 h-3.5 text-[#22c55e]" />
                <span>Preferred Date</span>
              </label>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedDate(todayStr)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    selectedDate === todayStr
                      ? "bg-[#22c55e] text-black"
                      : "bg-[#0e1d14] text-gray-300 border border-[#1a3324] hover:border-[#22c55e]/40"
                  }`}
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDate(tomorrowStr)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    selectedDate === tomorrowStr
                      ? "bg-[#22c55e] text-black"
                      : "bg-[#0e1d14] text-gray-300 border border-[#1a3324] hover:border-[#22c55e]/40"
                  }`}
                >
                  Tomorrow
                </button>
                <input
                  type="date"
                  value={selectedDate}
                  min={todayStr}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-[#0e1d14] border border-[#1a3324] text-white text-xs font-medium focus:outline-none focus:border-[#22c55e] cursor-pointer"
                />
              </div>
            </div>

            {/* Time Slot Chips */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-2.5">
                <Clock className="w-3.5 h-3.5 text-[#22c55e]" />
                <span>Time Slot (Sample Prototype Availability)</span>
              </label>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto no-scrollbar">
                {COMMON_SLOTS.map((slot) => {
                  const isSelected = selectedSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#22c55e] text-black shadow-sm"
                          : "bg-[#0e1d14] text-gray-300 border border-[#1a3324] hover:border-[#22c55e]/30"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Amenity Badges & Reset Row */}
          <div className="mt-5 pt-4 border-t border-[#152a1c] flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-400 font-semibold mr-1">Must-Haves:</span>
              {AMENITY_OPTIONS.map((amenity) => {
                const isChecked = selectedAmenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      isChecked
                        ? "bg-[#10b981]/25 text-[#4ade80] border border-[#22c55e]"
                        : "bg-[#0e1d14] text-gray-400 border border-[#1a3324] hover:text-gray-200"
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 text-[#22c55e]" />}
                    <span>{amenity}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-gray-400 hover:text-white underline underline-offset-4 cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        </div>

        {/* Results Banner */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-base font-extrabold text-white">
              Matching Arenas ({filteredVenues.length})
            </span>
            <span className="text-xs text-gray-400">
              for {selectedDate} • {selectedSlot}
            </span>
          </div>

          <span className="text-[11px] text-emerald-400/80 bg-[#0e1d14] px-2.5 py-1 rounded border border-[#1a3324]">
            Prices include turf maintenance & standard floodlighting
          </span>
        </div>

        {/* Filtered Venues Results List */}
        {filteredVenues.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#0a150e] border border-[#1a3324]">
            <p className="text-gray-300 font-bold text-lg">No sports arenas match your current filters.</p>
            <p className="text-xs text-gray-500 mt-1">
              Try adjusting your max budget, expanding your area, or selecting another sport.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 rounded-xl bg-[#22c55e] text-black font-bold text-xs uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map((venue) => (
              <div
                key={venue.id}
                className="rounded-xl bg-[#0a150e] border border-[#1a3324] hover:border-[#22c55e]/40 p-4 flex flex-col justify-between transition-all hover:shadow-lg"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#22c55e]">
                        {venue.sportLabel}
                      </span>
                      <h4 className="text-base font-bold text-white line-clamp-1">{venue.name}</h4>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        <span>{venue.location}</span>
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-base font-extrabold text-white">
                        ₹{venue.pricePerHour}
                      </span>
                      <span className="text-[10px] text-gray-400 block">/hr</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 mt-2 line-clamp-2">{venue.turfSpecs}</p>

                  <div className="mt-3 flex items-center gap-2 text-[11px] text-emerald-300 bg-[#0e2115] px-2.5 py-1.5 rounded border border-[#1a3b26]">
                    <Clock className="w-3 h-3 text-[#22c55e]" />
                    <span>Slot ready: {selectedSlot}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#152a1c] flex items-center gap-2">
                  <button
                    onClick={() => onViewVenue(venue)}
                    className="flex-1 py-2 rounded-lg bg-[#122217] text-gray-300 hover:text-white text-xs font-semibold border border-[#1a3324] transition-colors cursor-pointer"
                  >
                    View Specs
                  </button>
                  <button
                    onClick={() => onBookVenueSlot(venue, selectedDate, selectedSlot)}
                    className="flex-1 py-2 rounded-lg bg-[#22c55e] hover:bg-[#4ade80] text-black text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-sm"
                  >
                    <span>Request Slot</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
