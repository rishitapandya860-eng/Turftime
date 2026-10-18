"use client";

import React from "react";
import { Search, CalendarCheck, Send, CheckCircle2, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Discover & Compare",
      description:
        "Filter by sport, FIFA or BWF surface certifications, floodlight specs, and neighborhood hubs across Mumbai. Inspect real dimensions, amenities, and transparent hourly rates.",
      icon: <Search className="w-6 h-6 text-black" />,
      badge: "Step 1",
    },
    {
      number: "02",
      title: "Choose Preferred Slot",
      description:
        "Select your team's ideal match window — early bird morning shootarounds, sunset 7v7 matches, or late-night floodlit tournament sessions with real-time slot selection.",
      icon: <CalendarCheck className="w-6 h-6 text-black" />,
      badge: "Step 2",
    },
    {
      number: "03",
      title: "Submit & Lock Ground",
      description:
        "Enter your contact details and player count. Our direct route handler records your request, generates a unique TT reference ID, and coordinates with venue ground staff.",
      icon: <Send className="w-6 h-6 text-black" />,
      badge: "Step 3",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 relative bg-[#060c08] border-t border-[#132418]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#122217] text-[#22c55e] text-xs font-bold uppercase tracking-wider border border-[#1b3624] mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>SEAMLESS WORKFLOW</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-jakarta">
            How TurfTime Works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400">
            From discovering the ideal grass pitch to stepping onto the ground with your squad.
            A streamlined 3-step process built for Mumbai sports enthusiasts.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl bg-[#0a150e] border border-[#1a3324] hover:border-[#22c55e]/50 p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-[#10b981]/10 flex flex-col justify-between group"
            >
              {/* Step indicator watermark */}
              <div className="absolute top-4 right-6 text-5xl font-black text-[#13271b] select-none font-jakarta group-hover:text-[#183624] transition-colors">
                {step.number}
              </div>

              <div>
                {/* Icon box */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#22c55e] to-[#10b981] flex items-center justify-center shadow-lg shadow-[#22c55e]/20 mb-6 group-hover:scale-105 transition-transform">
                  {step.icon}
                </div>

                <span className="text-xs font-extrabold uppercase tracking-widest text-[#22c55e] mb-1 block">
                  {step.badge}
                </span>

                <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                  {step.title}
                </h3>

                <p className="text-sm text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#152a1c] flex items-center gap-2 text-xs font-semibold text-emerald-400 group-hover:text-white transition-colors">
                <span>Fast & Transparent</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
