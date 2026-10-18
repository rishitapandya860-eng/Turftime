"use client";

import React, { useState } from "react";
import { Venue } from "@/types";
import {
  X,
  MapPin,
  Star,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Info,
  Calendar,
} from "lucide-react";

interface VenueDetailsModalProps {
  venue: Venue | null;
  onClose: () => void;
  onBookNow: (venue: Venue) => void;
}

export default function VenueDetailsModal({
  venue,
  onClose,
  onBookNow,
}: VenueDetailsModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!venue) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#0a150e] border border-[#1a3324] shadow-2xl shadow-black/80 overflow-hidden z-10 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 hover:bg-black text-gray-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery Image Hero */}
        <div className="relative aspect-[16/9] w-full bg-black">
          <img
            src={venue.gallery[activeImageIndex] || venue.imageUrl}
            alt={venue.name}
            className="w-full h-full object-cover filter brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a150e] via-transparent to-black/30" />

          {/* Badges on Hero */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#060c08]/85 text-emerald-300 border border-[#22c55e]/40 backdrop-blur-md">
              {venue.sportLabel}
            </span>
            {venue.badges.map((b, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/60 text-gray-200 border border-white/10 backdrop-blur-md"
              >
                {b}
              </span>
            ))}
          </div>

          {/* Image Thumbnails */}
          {venue.gallery.length > 1 && (
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              {venue.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-12 h-8 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? "border-[#22c55e] scale-105"
                      : "border-white/30 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#152a1c]">
            <div>
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#22c55e]" />
                <span>{venue.location}, {venue.city}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-jakarta">
                {venue.name}
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">{venue.address}</p>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0e1d14] border border-[#1a3324] shrink-0">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white leading-none">
                  {venue.rating} / 5.0
                </span>
                <span className="text-[10px] text-gray-400">
                  {venue.reviewCount} verified reviews (Sample)
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="py-5 border-b border-[#152a1c]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              About This Arena
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed">{venue.description}</p>
          </div>

          {/* Turf Specifications */}
          <div className="py-5 border-b border-[#152a1c] grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-[#0e1d14] border border-[#1a3324]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block mb-1">
                Surface & Turf Specifications
              </span>
              <p className="text-xs font-semibold text-white">{venue.turfSpecs}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0e1d14] border border-[#1a3324]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block mb-1">
                Playing Dimensions & Capacity
              </span>
              <p className="text-xs font-semibold text-white">{venue.dimensions}</p>
            </div>
          </div>

          {/* Amenities Grid */}
          <div className="py-5 border-b border-[#152a1c]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
              Included Facilities & Amenities
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {venue.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded-lg bg-[#0e1d14] border border-[#1a3324] text-xs text-gray-300 font-medium"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e] shrink-0" />
                  <span className="truncate">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ground Rules */}
          <div className="py-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2.5">
              Ground Rules & Requirements
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-gray-400">
              {venue.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#22c55e] font-bold">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-5 sm:p-6 bg-[#08110b] border-t border-[#1a3324] flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">
              Hourly Price
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-white font-jakarta">
                ₹{venue.pricePerHour.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-gray-400">/hr</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#0e1d14] hover:bg-[#15291d] text-gray-300 text-xs font-semibold border border-[#1a3324] transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookNow(venue);
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#22c55e] to-[#10b981] hover:from-[#4ade80] hover:to-[#22c55e] text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#22c55e]/25 cursor-pointer"
            >
              <Calendar className="w-4 h-4 fill-black" />
              <span>Book This Ground</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
