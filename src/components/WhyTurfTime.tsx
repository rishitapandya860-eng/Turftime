"use client";

import React from "react";
import {
  ShieldCheck,
  Zap,
  Clock,
  Sparkles,
  CloudRain,
  Split,
  Trophy,
  CheckCircle2,
} from "lucide-react";

export default function WhyTurfTime() {
  const perks = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#22c55e]" />,
      title: "Verified Surface Standards",
      description:
        "Every listed pitch meets strict pile height, shock attenuation, and non-glare floodlighting standards. No worn-out turf patches or dead bounce zones.",
    },
    {
      icon: <CloudRain className="w-6 h-6 text-[#22c55e]" />,
      title: "100% Monsoon Weather Protection",
      description:
        "Mumbai rain should never ruin your budget. If torrential downpours disrupt your uncovered outdoor match, get automatic free rescheduling.",
    },
    {
      icon: <Clock className="w-6 h-6 text-[#22c55e]" />,
      title: "Zero Hidden Floodlight Surcharges",
      description:
        "Transparent pricing from start to finish. Night match floodlights, clean change rooms, and baseline match balls are always baked into the hourly price.",
    },
    {
      icon: <Zap className="w-6 h-6 text-[#22c55e]" />,
      title: "Fast API-Powered Persistence",
      description:
        "Built on modern Next.js route handlers and persistent server storage. Your booking request is locked immediately with direct verification.",
    },
    {
      icon: <Split className="w-6 h-6 text-[#22c55e]" />,
      title: "Team Split-Share Links",
      description:
        "Generate a direct WhatsApp link to share booking reference IDs, maps location, and rules with all teammates in a single click.",
    },
    {
      icon: <Trophy className="w-6 h-6 text-[#22c55e]" />,
      title: "Tournament & Corporate Concierge",
      description:
        "Planning an inter-company 7v7 football cup or weekend box cricket tournament? TurfTime provides bulk slots with umpire coordination.",
    },
  ];

  return (
    <section id="why-us" className="py-20 relative bg-[#070e0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#122217] text-[#22c55e] text-xs font-bold uppercase tracking-wider border border-[#1b3624] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE TURFTIME ADVANTAGE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-jakarta">
              Engineered for Mumbai Athletes
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-xl">
              We eliminate the frustrating phone calls, double-booked pitches, and surprise
              lighting surcharges with a modern sports-tech platform.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0a150e] border border-[#1a3324] max-w-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
              <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
              <span>99.4% Slot Fulfillment Rate</span>
            </div>
            <p className="text-[11px] text-gray-400">
              Across 48+ partner venues in Mumbai during peak Friday & Saturday night prime hours.
            </p>
            <span className="text-[10px] text-emerald-400/70 block mt-1">
              *Illustrative prototype metric
            </span>
          </div>
        </div>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {perks.map((perk, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0a150e] border border-[#1a3324] hover:border-[#22c55e]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#10b981]/5 flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-[#0f2317] border border-[#1d3d28] flex items-center justify-center mb-5">
                  {perk.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{perk.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{perk.description}</p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#13271b] flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                <span>Verified feature</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
