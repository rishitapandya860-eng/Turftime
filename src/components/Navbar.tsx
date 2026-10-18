"use client";

import React, { useState, useEffect } from "react";
import {
  Trophy,
  Calendar,
  Menu,
  X,
  Compass,
  Sparkles,
  PhoneCall,
  HelpCircle,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

interface NavbarProps {
  onOpenMyBookings: () => void;
  onBookNow: () => void;
  bookingCount?: number;
}

export default function Navbar({
  onOpenMyBookings,
  onBookNow,
  bookingCount = 0,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#060c08]/90 backdrop-blur-md border-b border-[#1a3324]/80 py-3.5 shadow-2xl shadow-black/40"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#22c55e]/50 rounded-lg p-1"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10b981] via-[#059669] to-[#047857] flex items-center justify-center shadow-lg shadow-[#10b981]/25 group-hover:scale-105 transition-transform duration-300 border border-[#34d399]/40">
                <Trophy className="w-5 h-5 text-black stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-white font-jakarta">
                    Turf<span className="text-[#22c55e]">Time</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-[#10b981]/20 text-[#34d399] border border-[#10b981]/30">
                    MUMBAI
                  </span>
                </div>
                <span className="text-[10px] text-emerald-300/80 tracking-wide font-medium">
                  Find ground • Own game
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a
                href="#sports"
                className="text-gray-300 hover:text-[#22c55e] transition-colors duration-200"
              >
                Sports
              </a>
              <a
                href="#venues"
                className="text-gray-300 hover:text-[#22c55e] transition-colors duration-200"
              >
                Featured Venues
              </a>
              <a
                href="#slot-finder"
                className="text-gray-300 hover:text-[#22c55e] transition-colors duration-200 flex items-center gap-1.5"
              >
                <span>Slot Finder</span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
                </span>
              </a>
              <a
                href="#how-it-works"
                className="text-gray-300 hover:text-[#22c55e] transition-colors duration-200"
              >
                How It Works
              </a>
              <a
                href="#why-us"
                className="text-gray-300 hover:text-[#22c55e] transition-colors duration-200"
              >
                Why Us
              </a>
              <a
                href="#faqs"
                className="text-gray-300 hover:text-[#22c55e] transition-colors duration-200"
              >
                FAQs
              </a>
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              {/* My Bookings Button */}
              <button
                onClick={onOpenMyBookings}
                className="relative inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#0e1d14] text-emerald-300 border border-[#1a3324] hover:border-[#22c55e]/40 hover:bg-[#15291d] transition-all duration-200 cursor-pointer shadow-sm"
                title="View your saved booking requests"
              >
                <Calendar className="w-3.5 h-3.5 text-[#22c55e]" />
                <span>My Bookings</span>
                {bookingCount > 0 && (
                  <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-[#22c55e] text-black">
                    {bookingCount}
                  </span>
                )}
              </button>

              {/* Primary Book CTA */}
              <button
                onClick={onBookNow}
                className="relative inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg bg-gradient-to-r from-[#22c55e] to-[#10b981] hover:from-[#4ade80] hover:to-[#22c55e] text-black shadow-lg shadow-[#22c55e]/25 hover:shadow-[#22c55e]/40 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 fill-black" />
                <span>Book a Venue</span>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={onOpenMyBookings}
                className="p-2 rounded-lg bg-[#0e1d14] border border-[#1a3324] text-emerald-300 relative"
                aria-label="My Bookings"
              >
                <Calendar className="w-4 h-4 text-[#22c55e]" />
                {bookingCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 text-[9px] font-bold rounded-full bg-[#22c55e] text-black flex items-center justify-center">
                    {bookingCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-[#0e1d14] border border-[#1a3324] text-gray-300 hover:text-white"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-200" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-200" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-[#0a140e] border-l border-[#1a3324] p-6 flex flex-col justify-between shadow-2xl z-10">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#1a3324]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#10b981] flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-black" />
                  </div>
                  <span className="font-extrabold text-lg text-white">
                    Turf<span className="text-[#22c55e]">Time</span>
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg bg-[#15291d] text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <nav className="mt-6 flex flex-col gap-4 text-base font-medium">
                <a
                  href="#sports"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-gray-300 hover:text-[#22c55e] py-2 border-b border-[#132418]"
                >
                  <div className="flex items-center gap-3">
                    <Compass className="w-4 h-4 text-emerald-400" />
                    <span>Explore Sports</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </a>
                <a
                  href="#venues"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-gray-300 hover:text-[#22c55e] py-2 border-b border-[#132418]"
                >
                  <div className="flex items-center gap-3">
                    <Trophy className="w-4 h-4 text-emerald-400" />
                    <span>Featured Venues</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </a>
                <a
                  href="#slot-finder"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-gray-300 hover:text-[#22c55e] py-2 border-b border-[#132418]"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    <span>Find Perfect Slot</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </a>
                <a
                  href="#how-it-works"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-gray-300 hover:text-[#22c55e] py-2 border-b border-[#132418]"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>How It Works</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </a>
                <a
                  href="#why-us"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-gray-300 hover:text-[#22c55e] py-2 border-b border-[#132418]"
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Why TurfTime</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </a>
                <a
                  href="#faqs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-gray-300 hover:text-[#22c55e] py-2 border-b border-[#132418]"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-emerald-400" />
                    <span>FAQs & Support</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </a>
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#1a3324] flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMyBookings();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#15291d] text-emerald-300 border border-[#22c55e]/30 font-semibold text-sm"
              >
                <Calendar className="w-4 h-4 text-[#22c55e]" />
                <span>My Bookings ({bookingCount})</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookNow();
                }}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[#22c55e] to-[#10b981] text-black font-bold text-sm uppercase tracking-wider shadow-lg shadow-[#22c55e]/20"
              >
                Book a Venue
              </button>

              <p className="text-[11px] text-center text-gray-500 mt-2">
                ZooTechX Technical Assessment Prototype • Mumbai
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
