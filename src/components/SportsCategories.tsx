"use client";

import React from "react";
import { SPORT_CATEGORIES } from "@/data/venues";
import { SportType } from "@/types";
import {
  Flame,
  Trophy,
  Zap,
  Activity,
  Target,
  Sparkles,
  ArrowUpRight,
  Filter,
} from "lucide-react";

interface SportsCategoriesProps {
  activeSport: SportType;
  onSelectSport: (sport: SportType) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  football: <Flame className="w-5 h-5" />,
  cricket: <Trophy className="w-5 h-5" />,
  badminton: <Zap className="w-5 h-5" />,
  tennis: <Activity className="w-5 h-5" />,
  basketball: <Target className="w-5 h-5" />,
  pickleball: <Sparkles className="w-5 h-5" />,
};

export default function SportsCategories({
  activeSport,
  onSelectSport,
}: SportsCategoriesProps) {
  return (
    <section id="sports" className="py-20 relative bg-[#070e0a]">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#10b981]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#22c55e] mb-2">
              <Filter className="w-3.5 h-3.5" />
              <span>DISCOVERY BY DISCIPLINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-jakarta">
              Explore by Sport
            </h2>
            <p className="mt-2 text-sm text-gray-400 max-w-xl">
              From FIFA-grade AstroTurf pitches to air-conditioned BWF wooden badminton courts. 
              Click a sport to filter grounds across Mumbai.
            </p>
          </div>

          {/* Reset / All sports button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectSport("all")}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer ${
                activeSport === "all"
                  ? "bg-[#22c55e] text-black shadow-lg shadow-[#22c55e]/20"
                  : "bg-[#0f1f15] text-gray-300 border border-[#1a3324] hover:border-[#22c55e]/40"
              }`}
            >
              Show All Sports ({SPORT_CATEGORIES.length})
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {SPORT_CATEGORIES.map((sport) => {
            const isSelected = activeSport === sport.id;

            return (
              <div
                key={sport.id}
                onClick={() => onSelectSport(sport.id as SportType)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5 ${
                  isSelected
                    ? "ring-2 ring-[#22c55e] shadow-xl shadow-[#22c55e]/25"
                    : "border border-[#1a3324] hover:border-[#22c55e]/40 shadow-md"
                }`}
              >
                {/* Visual sport image */}
                <div className="aspect-[4/5] relative w-full overflow-hidden bg-[#0a150e]">
                  <img
                    src={sport.imageUrl}
                    alt={`${sport.name} sports venue in Mumbai`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 filter brightness-[0.6] group-hover:brightness-[0.75]"
                    loading="lazy"
                  />

                  {/* Dark gradient for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060c08] via-[#060c08]/50 to-transparent" />

                  {/* Selected Active Pill */}
                  {isSelected && (
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-[#22c55e] text-black text-[10px] font-extrabold uppercase tracking-wide">
                      Active
                    </div>
                  )}

                  {/* Content inside tile */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-between">
                    {/* Top Icon Badge */}
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-[#22c55e] text-black"
                          : "bg-[#0e1d14]/90 backdrop-blur-md text-emerald-400 group-hover:text-white border border-[#1a3324]"
                      }`}
                    >
                      {ICON_MAP[sport.id]}
                    </div>

                    {/* Bottom Details */}
                    <div>
                      <span className="text-[10px] uppercase font-semibold tracking-wider text-emerald-400">
                        {sport.tag}
                      </span>
                      <h3 className="text-base font-bold text-white group-hover:text-[#22c55e] transition-colors">
                        {sport.name}
                      </h3>
                      <div className="mt-1 flex items-center justify-between text-[11px] text-gray-300">
                        <span>{sport.startingPrice}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#22c55e] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
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
