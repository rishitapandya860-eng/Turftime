"use client";

import React, { useState, useEffect } from "react";
import { Venue } from "@/types";
import {
  MapPin,
  Star,
  Heart,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Eye,
  Info,
} from "lucide-react";

interface FeaturedVenuesProps {
  venues: Venue[];
  onSelectVenue: (venue: Venue) => void;
  onBookSlot: (venue: Venue) => void;
}

export default function FeaturedVenues({
  venues,
  onSelectVenue,
  onBookSlot,
}: FeaturedVenuesProps) {
  // Favorites persistence in localStorage
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("turftime_favs");
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleFavorite = (venueId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const updated = prev.includes(venueId)
        ? prev.filter((id) => id !== venueId)
        : [...prev, venueId];
      try {
        localStorage.setItem("turftime_favs", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  return (
    <section id="venues" className="py-20 relative bg-[#060c08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#22c55e] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>HANDPICKED ARENAS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-jakarta">
              Featured Venues in Mumbai
            </h2>
            <p className="mt-2 text-sm text-gray-400 max-w-xl">
              Curated sports grounds tested for surface bounce, night lighting quality, 
              and player safety. Verified turf specifications and transparent hourly rates.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400 bg-[#0e1d14] px-3 py-1.5 rounded-lg border border-[#1a3324]">
            <Info className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ratings & availability represent prototype sample data</span>
          </div>
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {venues.map((venue) => {
            const isFav = favorites.includes(venue.id);

            return (
              <div
                key={venue.id}
                className="group flex flex-col rounded-2xl bg-[#0a150e] border border-[#1a3324] hover:border-[#22c55e]/50 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#10b981]/10 transform hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                  <img
                    src={venue.imageUrl}
                    alt={`${venue.name} in ${venue.location}, Mumbai`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-[0.88]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a150e] via-transparent to-black/40" />

                  {/* Sport Badge Top Left */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide bg-[#060c08]/85 text-emerald-300 border border-[#22c55e]/40 backdrop-blur-md">
                      {venue.sportLabel}
                    </span>
                  </div>

                  {/* Favorite Heart Button Top Right */}
                  <button
                    onClick={(e) => toggleFavorite(venue.id, e)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-[#060c08]/80 hover:bg-[#060c08] border border-white/10 hover:border-emerald-400/40 text-gray-300 hover:text-red-400 backdrop-blur-md transition-all duration-200 cursor-pointer"
                    aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isFav ? "fill-red-500 text-red-500" : "text-white"
                      }`}
                    />
                  </button>

                  {/* Rating Badge Bottom Left of Image */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/75 backdrop-blur-md text-xs font-semibold text-white border border-white/10">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{venue.rating}</span>
                    <span className="text-[10px] text-gray-400">({venue.reviewCount})</span>
                  </div>

                  {/* Distance Indicator */}
                  {venue.distance && (
                    <div className="absolute bottom-3 right-3 text-[11px] font-medium text-gray-300 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md">
                      {venue.distance}
                    </div>
                  )}
                </div>

                {/* Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Location Landmark */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium mb-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#22c55e] shrink-0" />
                      <span className="truncate">{venue.location}, {venue.city}</span>
                    </div>

                    {/* Venue Title */}
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-[#22c55e] transition-colors line-clamp-1">
                      {venue.name}
                    </h3>

                    {/* Tagline / Subtitle */}
                    <p className="mt-1 text-xs text-emerald-400/90 font-medium line-clamp-1">
                      {venue.tagline}
                    </p>

                    {/* Amenities Badges */}
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {venue.amenities.slice(0, 3).map((amenity, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] text-gray-300 bg-[#122217] px-2 py-0.5 rounded border border-[#1b3624]"
                        >
                          {amenity}
                        </span>
                      ))}
                      {venue.amenities.length > 3 && (
                        <span className="text-[10px] text-gray-400 self-center">
                          +{venue.amenities.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Sample Slot Chips */}
                    <div className="mt-4 pt-3 border-t border-[#152a1c]">
                      <div className="flex items-center justify-between text-[11px] text-gray-400 mb-2">
                        <span className="flex items-center gap-1 font-semibold text-emerald-400">
                          <Clock className="w-3 h-3 text-[#22c55e]" />
                          <span>Today&apos;s Sample Slots</span>
                        </span>
                        <span className="text-[10px] text-gray-500">Illustrative</span>
                      </div>
                      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                        {venue.slots.slice(0, 3).map((slot, sIdx) => (
                          <span
                            key={sIdx}
                            className={`text-[10px] font-medium px-2 py-1 rounded whitespace-nowrap border ${
                              slot.status === "available"
                                ? "bg-[#0e2115] text-emerald-300 border-[#22c55e]/30"
                                : "bg-amber-950/30 text-amber-300 border-amber-600/30"
                            }`}
                          >
                            {slot.time.split(" - ")[0]}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Price & Action Row */}
                  <div className="mt-5 pt-4 border-t border-[#1a3324] flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">
                        Hourly Rate
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-extrabold text-white font-jakarta">
                          ₹{venue.pricePerHour.toLocaleString("en-IN")}
                        </span>
                        <span className="text-xs text-gray-400">/hr</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* View Details Button */}
                      <button
                        onClick={() => onSelectVenue(venue)}
                        className="p-2.5 rounded-xl bg-[#122217] hover:bg-[#193222] text-gray-300 hover:text-white border border-[#1a3324] hover:border-[#22c55e]/40 transition-colors cursor-pointer"
                        title="View ground rules, turf specs & gallery"
                        aria-label={`View details of ${venue.name}`}
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Book Slot Button */}
                      <button
                        onClick={() => onBookSlot(venue)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#22c55e] hover:bg-[#4ade80] text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md shadow-[#22c55e]/20"
                      >
                        <span>Book Slot</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
