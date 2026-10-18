"use client";

import React, { useState, useEffect } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Flame,
  Search,
} from "lucide-react";
import { MUMBAI_LOCATIONS } from "@/data/venues";
import { SportType } from "@/types";

interface HeroSectionProps {
  onSearch: (filters: {
    sport: SportType;
    location: string;
    date: string;
    slotTime: string;
  }) => void;
  onExploreClick: () => void;
  onFindTurfClick: () => void;
}

export default function HeroSection({
  onSearch,
  onExploreClick,
  onFindTurfClick,
}: HeroSectionProps) {
  // Form state for floating search panel
  const [selectedSport, setSelectedSport] = useState<SportType>("all");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedDate, setSelectedDate] = useState("2026-10-19");
  const [minDate, setMinDate] = useState("2026-10-19");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
    setMinDate(today);
  }, []);
  const [selectedSlot, setSelectedSlot] = useState("08:00 PM - 09:00 PM");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      sport: selectedSport,
      location: selectedLocation,
      date: selectedDate,
      slotTime: selectedSlot,
    });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Cinematic Image with Gradient Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=2400&q=85"
          alt="Cinematic floodlit football turf stadium in Mumbai at night"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.42] contrast-[1.12]"
        />
        {/* Layered overlays for dramatic depth and readable text */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060c08] via-[#060c08]/60 to-[#060c08]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060c08]/90 via-[#060c08]/40 to-transparent" />
        <div className="absolute inset-0 bg-turf-grid opacity-30 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Uppercase Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#102016]/90 border border-[#22c55e]/30 backdrop-blur-md mb-5 shadow-lg shadow-[#10b981]/10">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
            </span>
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#4ade80]">
              YOUR CITY • YOUR GAME • YOUR TIME
            </span>
          </div>

          {/* Large Bold Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.08] font-jakarta">
            Find your ground. <br />
            <span className="text-gradient-lime">Own your game.</span>
          </h1>

          {/* Short Supporting Description */}
          <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
            Mumbai’s premier sports venue network. Discover FIFA-standard football turfs, 
            floodlit box cricket arenas, and tournament badminton courts. Compare specs, 
            transparent prices, and request your team’s ideal slot in seconds.
          </p>

          {/* Action CTAs */}
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <button
              onClick={onFindTurfClick}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#22c55e] via-[#10b981] to-[#059669] text-black font-extrabold text-sm uppercase tracking-wider hover:brightness-110 shadow-xl shadow-[#22c55e]/25 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Flame className="w-4 h-4 fill-black" />
              <span>Find Your Turf</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#0e1d14]/80 hover:bg-[#15291d] text-gray-200 hover:text-white border border-[#1a3324] hover:border-[#22c55e]/40 font-semibold text-sm backdrop-blur-md transition-all duration-200 cursor-pointer"
            >
              <span>Explore Venues</span>
            </button>

            <div className="flex items-center gap-2 text-xs text-emerald-400/90 ml-1">
              <ShieldCheck className="w-4 h-4 text-[#22c55e]" />
              <span>Instant WhatsApp Coordination</span>
            </div>
          </div>
        </div>

        {/* Hero Search Panel (Floating & Integrated) */}
        <div className="mt-10 max-w-5xl">
          <form
            onSubmit={handleSearchSubmit}
            className="p-4 sm:p-5 rounded-2xl glass-panel shadow-2xl shadow-black/80 border border-[#22c55e]/25 transition-all duration-300"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Location Selector */}
              <div className="flex flex-col gap-1.5 p-2.5 rounded-xl bg-[#08120b]/90 border border-[#1a3324] focus-within:border-[#22c55e]/60 transition-colors">
                <label className="text-[11px] uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#22c55e]" />
                  <span>Location</span>
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="bg-transparent text-sm text-white font-medium focus:outline-none cursor-pointer"
                >
                  {MUMBAI_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc} className="bg-[#08120b] text-white">
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sport Selector */}
              <div className="flex flex-col gap-1.5 p-2.5 rounded-xl bg-[#08120b]/90 border border-[#1a3324] focus-within:border-[#22c55e]/60 transition-colors">
                <label className="text-[11px] uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#22c55e]" />
                  <span>Sport</span>
                </label>
                <select
                  value={selectedSport}
                  onChange={(e) => setSelectedSport(e.target.value as SportType)}
                  className="bg-transparent text-sm text-white font-medium focus:outline-none cursor-pointer"
                >
                  <option value="all" className="bg-[#08120b] text-white">
                    All Sports (Football, Cricket, etc.)
                  </option>
                  <option value="football" className="bg-[#08120b] text-white">
                    Football (5v5 / 7v7)
                  </option>
                  <option value="cricket" className="bg-[#08120b] text-white">
                    Box Cricket (Floodlit Nets)
                  </option>
                  <option value="badminton" className="bg-[#08120b] text-white">
                    Badminton (AC Wooden Courts)
                  </option>
                  <option value="tennis" className="bg-[#08120b] text-white">
                    Lawn Tennis (Hard / Clay)
                  </option>
                  <option value="basketball" className="bg-[#08120b] text-white">
                    Basketball (Rooftop / Indoor)
                  </option>
                  <option value="pickleball" className="bg-[#08120b] text-white">
                    Pickleball & Padel
                  </option>
                </select>
              </div>

              {/* Date Selector */}
              <div className="flex flex-col gap-1.5 p-2.5 rounded-xl bg-[#08120b]/90 border border-[#1a3324] focus-within:border-[#22c55e]/60 transition-colors">
                <label className="text-[11px] uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#22c55e]" />
                  <span>Date</span>
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={minDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-transparent text-sm text-white font-medium focus:outline-none cursor-pointer"
                />
              </div>

              {/* Time Slot Preference */}
              <div className="flex flex-col gap-1.5 p-2.5 rounded-xl bg-[#08120b]/90 border border-[#1a3324] focus-within:border-[#22c55e]/60 transition-colors">
                <label className="text-[11px] uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#22c55e]" />
                  <span>Preferred Slot</span>
                </label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="bg-transparent text-sm text-white font-medium focus:outline-none cursor-pointer"
                >
                  <option value="06:00 AM - 07:00 AM" className="bg-[#08120b] text-white">
                    06:00 AM - 07:00 AM (Early Bird)
                  </option>
                  <option value="07:00 AM - 08:00 AM" className="bg-[#08120b] text-white">
                    07:00 AM - 08:00 AM (Morning Play)
                  </option>
                  <option value="06:00 PM - 07:00 PM" className="bg-[#08120b] text-white">
                    06:00 PM - 07:00 PM (Sunset Match)
                  </option>
                  <option value="08:00 PM - 09:00 PM" className="bg-[#08120b] text-white">
                    08:00 PM - 09:00 PM (Prime Floodlight)
                  </option>
                  <option value="09:00 PM - 10:00 PM" className="bg-[#08120b] text-white">
                    09:00 PM - 10:00 PM (Night Match)
                  </option>
                  <option value="10:00 PM - 11:00 PM" className="bg-[#08120b] text-white">
                    10:00 PM - 11:00 PM (Late Night Special)
                  </option>
                </select>
              </div>
            </div>

            {/* Submit & Filter CTA inside Search Panel */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#1a3324]">
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e]" />
                  <span>100% Monsoon Rain Reschedule Guarantee</span>
                </span>
                <span className="hidden sm:inline text-gray-600">•</span>
                <span className="hidden sm:inline">No Hidden Floodlight Fees</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#22c55e] hover:bg-[#4ade80] text-black font-extrabold text-sm uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md shadow-[#22c55e]/20"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span>Search Available Grounds</span>
              </button>
            </div>
          </form>
        </div>

        {/* Live Trust Stats Bar */}
        <div className="mt-8 pt-6 border-t border-[#1a3324]/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-jakarta">
              48<span className="text-[#22c55e]">+</span>
            </span>
            <span className="text-xs text-gray-400 font-medium">Verified Mumbai Arenas</span>
            <span className="text-[10px] text-emerald-400/70">Sample prototype data</span>
          </div>

          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-jakarta">
              12,500<span className="text-[#22c55e]">+</span>
            </span>
            <span className="text-xs text-gray-400 font-medium">Weekend Matches</span>
            <span className="text-[10px] text-emerald-400/70">Sample prototype data</span>
          </div>

          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-jakarta">
              4.9<span className="text-[#22c55e]">★</span>
            </span>
            <span className="text-xs text-gray-400 font-medium">From 2,400+ Athletes</span>
            <span className="text-[10px] text-emerald-400/70">Sample prototype data</span>
          </div>

          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-jakarta">
              6<span className="text-[#22c55e]"> Sports</span>
            </span>
            <span className="text-xs text-gray-400 font-medium">Turf, Clay & AC Wood</span>
            <span className="text-[10px] text-emerald-400/70">Sample prototype data</span>
          </div>
        </div>
      </div>
    </section>
  );
}
