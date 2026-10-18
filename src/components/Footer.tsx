"use client";

import React, { useState } from "react";
import {
  Trophy,
  MapPin,
  Mail,
  Phone,
  Send,
  Sparkles,
  ShieldCheck,
  Check,
} from "lucide-react";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.includes("@")) {
      setSubscribed(true);
      setNewsletterEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#040805] border-t border-[#1a3324] text-gray-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#14261a]">
          {/* Brand info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#10b981] to-[#047857] flex items-center justify-center shadow-lg shadow-[#10b981]/20">
                <Trophy className="w-5 h-5 text-black stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-white font-jakarta">
                  Turf<span className="text-[#22c55e]">Time</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
                  MUMBAI SPORTS NETWORK
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm mb-4">
              Your game. Your ground. Your time. TurfTime connects athletes, corporate leagues,
              and weekend warriors with top-tier verified sports venues across Mumbai.
            </p>

            <div className="flex flex-col gap-2 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#22c55e]" />
                <span>BKC, Andheri, Powai, Juhu, Bandra & Thane</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#22c55e]" />
                <span>support@turftime-mumbai.in (Demo)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#22c55e]" />
                <span>+91 98200 TURF1 (Illustrative Hotline)</span>
              </div>
            </div>
          </div>

          {/* Sports Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Sports Categories
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs">
              <li>
                <a href="#sports" className="hover:text-[#22c55e] transition-colors">
                  Football (5v5 & 7v7)
                </a>
              </li>
              <li>
                <a href="#sports" className="hover:text-[#22c55e] transition-colors">
                  Box Cricket Arenas
                </a>
              </li>
              <li>
                <a href="#sports" className="hover:text-[#22c55e] transition-colors">
                  Badminton (AC Wooden)
                </a>
              </li>
              <li>
                <a href="#sports" className="hover:text-[#22c55e] transition-colors">
                  Lawn Tennis & Clay
                </a>
              </li>
              <li>
                <a href="#sports" className="hover:text-[#22c55e] transition-colors">
                  Rooftop Basketball
                </a>
              </li>
              <li>
                <a href="#sports" className="hover:text-[#22c55e] transition-colors">
                  Padel & Pickleball
                </a>
              </li>
            </ul>
          </div>

          {/* Mumbai Neighborhoods */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Top Mumbai Hubs
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs">
              <li>
                <a href="#venues" className="hover:text-[#22c55e] transition-colors">
                  Andheri West Sports Turfs
                </a>
              </li>
              <li>
                <a href="#venues" className="hover:text-[#22c55e] transition-colors">
                  Bandra Kurla Complex (BKC)
                </a>
              </li>
              <li>
                <a href="#venues" className="hover:text-[#22c55e] transition-colors">
                  Powai Hiranandani Complexes
                </a>
              </li>
              <li>
                <a href="#venues" className="hover:text-[#22c55e] transition-colors">
                  Juhu Beachside Tennis Clubs
                </a>
              </li>
              <li>
                <a href="#venues" className="hover:text-[#22c55e] transition-colors">
                  Lower Parel Rooftop Arenas
                </a>
              </li>
              <li>
                <a href="#venues" className="hover:text-[#22c55e] transition-colors">
                  Thane West All-Weather Hubs
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Alerts */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Weekend Slot Alerts
            </h4>
            <p className="text-xs text-gray-400 mb-3">
              Subscribe to get notified about prime Friday/Saturday night cancellations and corporate discounts.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg bg-[#0a150e] border border-[#1a3324] text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-[#22c55e]"
              />
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-[#122217] hover:bg-[#1a3324] text-emerald-300 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 border border-[#1a3324]"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#22c55e]" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Get Slot Alerts</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Prototype & Interview Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex flex-wrap items-center gap-2">
            <span>© 2026 TurfTime Technologies Mumbai. All rights reserved.</span>
            <span>•</span>
            <span className="text-emerald-400">
              ZooTechX Technical Assessment Prototype (Topic 3: Sports Venue Booking)
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-gray-400">
              Built with Next.js App Router, TypeScript & Tailwind CSS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
