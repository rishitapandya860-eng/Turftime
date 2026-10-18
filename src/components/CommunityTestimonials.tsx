"use client";

import React from "react";
import { Star, MessageSquareQuote, ShieldAlert } from "lucide-react";

export default function CommunityTestimonials() {
  const testimonials = [
    {
      name: "Amitav Roy",
      role: "Captain, Bandra United FC (Amateur League)",
      sport: "Football 7v7",
      venue: "Urban Kickers Arena, Andheri",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      content:
        "We used to waste hours calling turf managers on Friday afternoons only to be told slots were taken. With TurfTime, our squad locks our Wednesday and Sunday 9 PM slots in 60 seconds. The floodlight quality at Urban Kickers is unreal.",
      rating: 5,
    },
    {
      name: "Priya Nair",
      role: "Organiser, Powai Tech Badminton Cup",
      sport: "Badminton",
      venue: "The Smash House, Powai",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      content:
        "The AC wooden courts at The Smash House were pristine for our 32-player corporate tournament. Having genuine BWF cushion wood saved everyone's knees, and the online slot request flow was completely transparent.",
      rating: 5,
    },
    {
      name: "Rohan Deshmukh",
      role: "Vice Captain, BKC Strikers Box Cricket",
      sport: "Box Cricket",
      venue: "PowerPlay Arena, BKC",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      content:
        "The high-tension nets and bowling machine at PowerPlay BKC make it the best turf for our weekly finance team derbies. Zero surprise fees, and the rain rescheduling guarantee gave us peace of mind during July monsoons.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 relative bg-[#070e0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#122217] text-[#22c55e] text-xs font-bold uppercase tracking-wider border border-[#1b3624] mb-3">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>ATHLETE EXPERIENCES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-jakarta">
            Trusted by Mumbai&apos;s Sports Community
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Hear from corporate captains, weekend warriors, and amateur league founders who organize their games through TurfTime.
          </p>

          {/* Prototype Disclosure Banner */}
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#0e1d14] border border-[#1a3324] text-[11px] text-emerald-400/80">
            <ShieldAlert className="w-3.5 h-3.5 text-[#22c55e]" />
            <span>Illustrative community feedback — representative prototype data</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0a150e] border border-[#1a3324] hover:border-[#22c55e]/40 flex flex-col justify-between transition-all duration-300 hover:shadow-xl"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-gray-300 leading-relaxed italic">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#152a1c] flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#22c55e]/40"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">{item.name}</span>
                  <span className="text-[11px] text-gray-400">{item.role}</span>
                  <span className="text-[10px] text-emerald-400">{item.venue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
