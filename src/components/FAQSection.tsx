"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How does the TurfTime booking request process work?",
    answer:
      "When you submit a slot request on TurfTime, our backend API instantly persists your request with a unique booking reference ID (e.g., TT-MUM-48201). The venue manager verifies ground availability, and you receive an immediate direct confirmation via WhatsApp and SMS with directions, locker access codes, and payment details.",
  },
  {
    question: "What is TurfTime's monsoon weather refund policy?",
    answer:
      "If heavy Mumbai rains or waterlogging make outdoor open turfs unplayable, you are 100% entitled to a free reschedule within 30 days or a complete refund credit. For indoor air-conditioned venues like The Smash House or covered turfs like StrikeZone Thane, games continue uninterrupted.",
  },
  {
    question: "Are football boots with metal studs allowed on synthetic turfs?",
    answer:
      "No. For player safety and turf preservation, all synthetic AstroTurf venues in Mumbai strictly require rubber turf shoes (TF), flat sneakers, or non-marking studs. Metal studs and hard molded SG cleats are not allowed.",
  },
  {
    question: "Do venues provide equipment like balls, bibs, and rackets?",
    answer:
      "Yes! Every listed arena provides complimentary basic match balls and team bibs. Specialized equipment such as automated bowling machine tokens, carbon fiber padel racquets, or Yonex badminton rackets can be selected as a convenient ₹300 add-on during checkout.",
  },
  {
    question: "Can I book recurring weekly slots for corporate teams or leagues?",
    answer:
      "Absolutely. TurfTime offers dedicated corporate league and weekly recurring slots with discounted retainer pricing. Select any venue and add a note in the booking form requesting a 'Weekly Corporate Slot', and our concierge will coordinate dedicated ground locks.",
  },
  {
    question: "Is this a real live platform or a prototype assessment?",
    answer:
      "This application is a technical assessment prototype developed for the ZooTechX Web & Software Development Internship (Topic 3: TurfTime). The booking requests are genuinely persisted to the server API and local/database storage, while venue availability and customer reviews are illustrative sample data.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-20 relative bg-[#060c08] border-t border-[#132418]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#122217] text-[#22c55e] text-xs font-bold uppercase tracking-wider border border-[#1b3624] mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-jakarta">
            Everything You Need to Know
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Got questions about Mumbai turf rules, weather cancellations, or equipment?
            Here are our most common answers.
          </p>
        </div>

        {/* Accordions */}
        <div className="flex flex-col gap-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-xl bg-[#0a150e] border border-[#1a3324] hover:border-[#22c55e]/30 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-base text-white hover:text-[#22c55e] transition-colors">
                    {faq.question}
                  </span>
                  <div
                    className={`p-1.5 rounded-lg bg-[#122217] text-emerald-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 bg-[#22c55e] text-black" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-gray-300 leading-relaxed border-t border-[#14261a]/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
