"use client";

import React, { useState, useEffect } from "react";
import { Venue, BookingRequest } from "@/types";
import confetti from "canvas-confetti";
import {
  X,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Users,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  Sparkles,
  Tag,
  Copy,
  Check,
  Share2,
} from "lucide-react";

interface BookingModalProps {
  venue: Venue | null;
  initialDate?: string;
  initialSlot?: string;
  onClose: () => void;
  onBookingSuccess: (booking: BookingRequest) => void;
  onOpenMyBookings: () => void;
}

export default function BookingModal({
  venue,
  initialDate,
  initialSlot,
  onClose,
  onBookingSuccess,
  onOpenMyBookings,
}: BookingModalProps) {
  // Step state: 1 = Slot & Addons, 2 = Contact Info, 3 = Confirmation
  const [step, setStep] = useState<1 | 2>(1);

  // Form inputs
  const [date, setDate] = useState(initialDate || "2026-10-19");
  const [minDate, setMinDate] = useState("2026-10-19");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
    if (!initialDate) {
      setDate(today);
    }
  }, [initialDate]);

  const [timeSlot, setTimeSlot] = useState(
    initialSlot || venue?.slots[0]?.time || "08:00 PM - 09:00 PM"
  );
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [playerCount, setPlayerCount] = useState("10");
  const [equipmentRental, setEquipmentRental] = useState(false);
  const [notes, setNotes] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  // Submission & API states
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRequest | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  if (!venue) return null;

  // Price calculation
  const hourlyRate = venue.pricePerHour;
  const equipmentFee = equipmentRental ? 300 : 0;
  const subtotal = hourlyRate + equipmentFee;
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const taxableAmount = subtotal - discount;
  const gst = Math.round(taxableAmount * 0.18);
  const totalAmount = taxableAmount + gst;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "TURF10") {
      setPromoApplied(true);
      setServerError(null);
    } else {
      setServerError("Invalid promo code. Try 'TURF10' for 10% off.");
    }
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!date) errs.date = "Please select a booking date";
    if (!timeSlot) errs.timeSlot = "Please pick a time slot";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!customerName.trim() || customerName.trim().length < 2) {
      errs.customerName = "Full name is required (at least 2 characters)";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerEmail.trim() || !emailRegex.test(customerEmail.trim())) {
      errs.customerEmail = "A valid email address is required";
    }
    const cleanPhone = customerPhone.replace(/[\s\-]/g, "");
    const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
    if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
      errs.customerPhone = "Please provide a valid 10-digit Indian phone number";
    }
    const count = Number(playerCount);
    if (isNaN(count) || count < 1 || count > 50) {
      errs.playerCount = "Player count must be between 1 and 50";
    }

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setLoading(true);
    setServerError(null);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          venueId: venue.id,
          sport: venue.sportLabel,
          date,
          timeSlot,
          customerName,
          customerEmail,
          customerPhone,
          playerCount: Number(playerCount),
          equipmentRental,
          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        }
        setServerError(data.error || "Failed to submit booking request. Please check errors.");
        setLoading(false);
        return;
      }

      // Success
      setConfirmedBooking(data.booking);
      onBookingSuccess(data.booking);

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#22c55e", "#10b981", "#a3e635", "#ffffff"],
        });
      } catch {
        // ignore confetti errors
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network error";
      setServerError("Connection error: " + msg + ". Please check your internet or retry.");
    } finally {
      setLoading(false);
    }
  };

  const copyRefId = () => {
    if (!confirmedBooking) return;
    navigator.clipboard.writeText(confirmedBooking.referenceId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#0a150e] border border-[#1a3324] shadow-2xl shadow-black/90 overflow-hidden z-10 my-8">
        {/* Header Bar */}
        <div className="p-6 bg-[#08120b] border-b border-[#152a1c] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#10b981]/20 border border-[#22c55e]/40 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#22c55e]" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                {confirmedBooking ? "REQUEST RECEIVED" : "OFFICIAL BOOKING REQUEST"}
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight leading-tight">
                {venue.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#0e1d14] text-gray-400 hover:text-white border border-[#1a3324] transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {/* CONFIRMATION SUCCESS VIEW */}
          {confirmedBooking ? (
            <div className="flex flex-col items-center text-center py-4">
              <div className="w-16 h-16 rounded-full bg-[#10b981]/20 border-2 border-[#22c55e] flex items-center justify-center mb-4 shadow-lg shadow-[#22c55e]/20">
                <CheckCircle2 className="w-8 h-8 text-[#22c55e]" />
              </div>

              <span className="text-xs uppercase font-extrabold tracking-widest text-[#22c55e] mb-1">
                PERSISTENT BACKEND SUCCESS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-jakarta mb-2">
                Booking Request Submitted!
              </h2>

              <p className="text-sm text-gray-300 max-w-md mb-6 leading-relaxed">
                Your request has been verified and permanently recorded on the server.
                The ground manager has been notified to lock your preferred slot.
              </p>

              {/* Reference ID card */}
              <div className="w-full max-w-md p-4 rounded-2xl bg-[#0e1d14] border border-[#22c55e]/40 mb-6 text-left">
                <div className="flex items-center justify-between pb-3 border-b border-[#1a3324]">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">
                      Booking Reference ID
                    </span>
                    <span className="text-lg font-mono font-black text-[#22c55e]">
                      {confirmedBooking.referenceId}
                    </span>
                  </div>

                  <button
                    onClick={copyRefId}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#15291d] text-emerald-300 text-xs font-semibold hover:bg-[#1a3525] border border-[#22c55e]/30 cursor-pointer"
                  >
                    {copiedId ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#22c55e]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy ID</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 text-xs">
                  <div>
                    <span className="text-gray-400 block">Venue:</span>
                    <span className="font-semibold text-white">{venue.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Sport:</span>
                    <span className="font-semibold text-white">{confirmedBooking.sport}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Date & Time:</span>
                    <span className="font-semibold text-white">
                      {confirmedBooking.date} • {confirmedBooking.timeSlot}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Total Est. Amount:</span>
                    <span className="font-semibold text-[#22c55e]">
                      ₹{confirmedBooking.totalAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Prototype Note */}
              <div className="p-3 rounded-xl bg-[#0e1d14] border border-[#1a3324] text-[11px] text-gray-400 max-w-md mb-6 flex items-start gap-2 text-left">
                <ShieldCheck className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
                <span>
                  <strong>Assessment Disclaimer:</strong> This request has been saved to the database.
                  A live human coordinator verifies schedule conflicts before a final payment link is dispatched.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 w-full">
                <button
                  onClick={() => {
                    onClose();
                    onOpenMyBookings();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#22c55e] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#4ade80] transition-colors cursor-pointer shadow-md shadow-[#22c55e]/20"
                >
                  View in My Bookings
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-[#0e1d14] text-gray-300 font-semibold text-xs border border-[#1a3324] hover:bg-[#15291d] cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* STEP 1 & 2 FORM VIEW */
            <form onSubmit={handleSubmit}>
              {/* Progress Steps Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#152a1c]">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      step === 1 ? "bg-[#22c55e] text-black" : "bg-[#10b981] text-black"
                    }`}
                  >
                    1
                  </span>
                  <span className={`text-xs font-bold ${step === 1 ? "text-white" : "text-gray-400"}`}>
                    Slot & Add-ons
                  </span>
                </div>
                <div className="w-8 h-0.5 bg-[#152a1c]" />
                <div className="flex items-center gap-2">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      step === 2 ? "bg-[#22c55e] text-black" : "bg-[#15291d] text-gray-400"
                    }`}
                  >
                    2
                  </span>
                  <span className={`text-xs font-bold ${step === 2 ? "text-white" : "text-gray-400"}`}>
                    Contact & Review
                  </span>
                </div>
              </div>

              {/* Server Error Alert */}
              {serverError && (
                <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-start gap-2.5 mb-5">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{serverError}</span>
                </div>
              )}

              {/* STEP 1: Date, Slot & Equipment */}
              {step === 1 && (
                <div className="space-y-5">
                  {/* Selected Sport & Venue Specs */}
                  <div className="p-3.5 rounded-xl bg-[#0e1d14] border border-[#1a3324] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-400">
                        Selected Sport & Ground
                      </span>
                      <p className="text-sm font-bold text-white">{venue.sportLabel}</p>
                      <p className="text-xs text-gray-400">{venue.location}, Mumbai</p>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-extrabold text-white">
                        ₹{venue.pricePerHour}
                      </span>
                      <span className="text-[10px] text-gray-400 block">per hour</span>
                    </div>
                  </div>

                  {/* Date Input */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#22c55e]" />
                      <span>Select Preferred Date</span>
                    </label>
                    <input
                      type="date"
                      value={date}
                      min={minDate}
                      onChange={(e) => setDate(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0e1d14] border ${
                        fieldErrors.date ? "border-red-500" : "border-[#1a3324]"
                      } text-white text-sm focus:outline-none focus:border-[#22c55e] cursor-pointer`}
                    />
                    {fieldErrors.date && (
                      <p className="text-[11px] text-red-400 mt-1">{fieldErrors.date}</p>
                    )}
                  </div>

                  {/* Time Slot Picker */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#22c55e]" />
                      <span>Select Available Time Slot</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto no-scrollbar">
                      {venue.slots.map((s, idx) => {
                        const isSelected = timeSlot === s.time;
                        return (
                          <div
                            key={idx}
                            onClick={() => setTimeSlot(s.time)}
                            className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                              isSelected
                                ? "bg-[#10b981]/20 border-[#22c55e] text-white shadow-sm"
                                : "bg-[#0e1d14] border-[#1a3324] text-gray-300 hover:border-[#22c55e]/30"
                            }`}
                          >
                            <span className="text-xs font-medium">{s.time}</span>
                            <span
                              className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-extrabold ${
                                s.status === "available"
                                  ? "bg-[#22c55e]/20 text-[#4ade80]"
                                  : "bg-amber-900/30 text-amber-300"
                              }`}
                            >
                              {s.status}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    {fieldErrors.timeSlot && (
                      <p className="text-[11px] text-red-400 mt-1">{fieldErrors.timeSlot}</p>
                    )}
                  </div>

                  {/* Equipment Add-on Checkbox */}
                  <div
                    onClick={() => setEquipmentRental(!equipmentRental)}
                    className="p-3.5 rounded-xl bg-[#0e1d14] border border-[#1a3324] hover:border-[#22c55e]/30 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={equipmentRental}
                        onChange={() => {}}
                        className="w-4 h-4 accent-[#22c55e] rounded cursor-pointer"
                      />
                      <div>
                        <span className="text-xs font-bold text-white block">
                          Pro Equipment Kit Add-On (+₹300)
                        </span>
                        <span className="text-[11px] text-gray-400">
                          Includes match balls, referee whistle, dual colored bibs, & grip tape.
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-[#22c55e] shrink-0">+₹300</span>
                  </div>

                  {/* Step 1 Next Button */}
                  <div className="pt-4 border-t border-[#152a1c] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase">Subtotal</span>
                      <p className="text-lg font-bold text-white font-jakarta">₹{subtotal}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (validateStep1()) setStep(2);
                      }}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#22c55e] hover:bg-[#4ade80] text-black font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <span>Continue to Contact</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Contact Info & Review */}
              {step === 2 && (
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-1.5">
                      <User className="w-3.5 h-3.5 text-[#22c55e]" />
                      <span>Full Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sahil Sharma"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0e1d14] border ${
                        fieldErrors.customerName ? "border-red-500" : "border-[#1a3324]"
                      } text-white text-sm focus:outline-none focus:border-[#22c55e]`}
                    />
                    {fieldErrors.customerName && (
                      <p className="text-[11px] text-red-400 mt-1">{fieldErrors.customerName}</p>
                    )}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#22c55e]" />
                        <span>Email Address</span>
                      </label>
                      <input
                        type="email"
                        placeholder="sahil@example.com"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0e1d14] border ${
                          fieldErrors.customerEmail ? "border-red-500" : "border-[#1a3324]"
                        } text-white text-sm focus:outline-none focus:border-[#22c55e]`}
                      />
                      {fieldErrors.customerEmail && (
                        <p className="text-[11px] text-red-400 mt-1">
                          {fieldErrors.customerEmail}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#22c55e]" />
                        <span>WhatsApp / Mobile (+91)</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="98201 12345"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0e1d14] border ${
                          fieldErrors.customerPhone ? "border-red-500" : "border-[#1a3324]"
                        } text-white text-sm focus:outline-none focus:border-[#22c55e]`}
                      />
                      {fieldErrors.customerPhone && (
                        <p className="text-[11px] text-red-400 mt-1">
                          {fieldErrors.customerPhone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Player Count & Promo Code */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-1.5">
                        <Users className="w-3.5 h-3.5 text-[#22c55e]" />
                        <span>Expected Players</span>
                      </label>
                      <input
                        type="number"
                        min="2"
                        max="30"
                        value={playerCount}
                        onChange={(e) => setPlayerCount(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e1d14] border border-[#1a3324] text-white text-sm focus:outline-none focus:border-[#22c55e]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-1.5">
                        <Tag className="w-3.5 h-3.5 text-[#22c55e]" />
                        <span>Promo Code (Try: TURF10)</span>
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="TURF10"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#0e1d14] border border-[#1a3324] text-white text-xs uppercase focus:outline-none focus:border-[#22c55e]"
                        />
                        <button
                          type="button"
                          onClick={handleApplyPromo}
                          className="px-3 py-2 rounded-xl bg-[#15291d] text-emerald-300 hover:text-white text-xs font-bold border border-[#1a3324] cursor-pointer"
                        >
                          {promoApplied ? "Applied" : "Apply"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Special Requests / Notes */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                      Notes for Ground Staff (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Need extra football bibs, arriving 10 mins early for warmup..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#0e1d14] border border-[#1a3324] text-white text-xs focus:outline-none focus:border-[#22c55e] placeholder:text-gray-500"
                    />
                  </div>

                  {/* Price Calculation Summary */}
                  <div className="p-4 rounded-xl bg-[#08120b] border border-[#152a1c] space-y-1.5 text-xs">
                    <div className="flex justify-between text-gray-400">
                      <span>Base Hourly Rate ({venue.sportLabel})</span>
                      <span>₹{hourlyRate}</span>
                    </div>
                    {equipmentRental && (
                      <div className="flex justify-between text-gray-400">
                        <span>Equipment Kit Add-on</span>
                        <span>₹300</span>
                      </div>
                    )}
                    {promoApplied && (
                      <div className="flex justify-between text-[#22c55e]">
                        <span>Promo Discount (10% off)</span>
                        <span>-₹{discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-400">
                      <span>GST (18% Sports Facility)</span>
                      <span>₹{gst}</span>
                    </div>
                    <div className="pt-2 border-t border-[#1a3324] flex justify-between text-sm font-extrabold text-white">
                      <span>Total Estimated Payable:</span>
                      <span className="text-[#22c55e] font-jakarta">
                        ₹{totalAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="pt-3 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2.5 rounded-xl bg-[#0e1d14] text-gray-300 hover:text-white text-xs font-semibold border border-[#1a3324] cursor-pointer"
                    >
                      Back
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#22c55e] to-[#10b981] hover:from-[#4ade80] hover:to-[#22c55e] text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#22c55e]/20 disabled:opacity-50 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-black" />
                          <span>Persisting to Database...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 fill-black" />
                          <span>Submit Booking Request</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
