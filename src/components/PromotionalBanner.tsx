"use client";

import React from "react";
import { Sparkles, ArrowRight, Trophy, Flame } from "lucide-react";

interface PromotionalBannerProps {
  onBookNow: () => void;
}

export default function PromotionalBanner({ onBookNow }: PromotionalBannerProps) {
  return (
    <section className="py-16 relative bg-[#060c08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-[#22c55e]/30 shadow-2xl shadow-[#10b981]/15">
          {/* Background Dramatic Stadium Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=2000&q=80"
              alt="Night football tournament under floodlights"
              className="w-full h-full object-cover object-center filter brightness-[0.32] contrast-[1.2]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#060c08] via-[#060c08]/85 to-transparent" />
            <div className="absolute inset-0 bg-turf-grid opacity-20 pointer-events-none" />
          </div>

          {/* Banner Content */}
          <div className="relative z-10 p-8 sm:p-12 md:p-16 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#122217]/90 border border-[#22c55e]/40 text-[#4ade80] text-xs font-bold uppercase tracking-wider mb-6">
              <Flame className="w-3.5 h-3.5 text-[#22c55e]" />
              <span>NIGHT LEAGUE UNDER THE FLOODLIGHTS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1] font-jakarta">
              Get your squad together. <br />
              <span className="text-gradient-lime">Own the pitch tonight.</span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl">
              Don’t let another weekend slip away on couch screens. Lock in a prime 8 PM or 
              10 PM slot at Mumbai’s top-rated arenas with professional lighting and turf bibs ready on arrival.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onBookNow}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#22c55e] to-[#10b981] hover:from-[#4ade80] hover:to-[#22c55e] text-black font-extrabold text-sm uppercase tracking-wider transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer shadow-xl shadow-[#22c55e]/30"
              >
                <Sparkles className="w-4 h-4 fill-black" />
                <span>Reserve Weekend Slot</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-xs text-emerald-400/90 font-medium flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-[#22c55e]" />
                <span>Use code <strong>TURF10</strong> for 10% off</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
