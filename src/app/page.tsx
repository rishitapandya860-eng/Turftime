"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SportsCategories from "@/components/SportsCategories";
import FeaturedVenues from "@/components/FeaturedVenues";
import SlotFinderSection from "@/components/SlotFinderSection";
import HowItWorks from "@/components/HowItWorks";
import WhyTurfTime from "@/components/WhyTurfTime";
import PromotionalBanner from "@/components/PromotionalBanner";
import CommunityTestimonials from "@/components/CommunityTestimonials";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import VenueDetailsModal from "@/components/VenueDetailsModal";
import BookingModal from "@/components/BookingModal";
import MyBookingsDrawer from "@/components/MyBookingsDrawer";

import { SAMPLE_VENUES } from "@/data/venues";
import { Venue, SportType, BookingRequest } from "@/types";

export default function Home() {
  // Global filter states
  const [activeSport, setActiveSport] = useState<SportType>("all");
  const [venues, setVenues] = useState<Venue[]>(SAMPLE_VENUES);

  // Modals & Drawers state
  const [selectedVenueForDetails, setSelectedVenueForDetails] = useState<Venue | null>(null);
  const [selectedVenueForBooking, setSelectedVenueForBooking] = useState<Venue | null>(null);
  const [bookingInitialDate, setBookingInitialDate] = useState<string | undefined>();
  const [bookingInitialSlot, setBookingInitialSlot] = useState<string | undefined>();
  const [myBookingsOpen, setMyBookingsOpen] = useState(false);
  const [bookingCount, setBookingCount] = useState(2); // Initial seed count

  // Fetch count of bookings on mount
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch("/api/bookings");
        const data = await res.json();
        if (data.bookings) {
          setBookingCount(data.bookings.length);
        }
      } catch {
        // ignore
      }
    };
    fetchCount();
  }, []);

  // Filter venues when activeSport changes
  const displayedFeaturedVenues = React.useMemo(() => {
    if (activeSport === "all") return SAMPLE_VENUES;
    return SAMPLE_VENUES.filter((v) => v.sport === activeSport);
  }, [activeSport]);

  // Handlers
  const handleHeroSearch = (filters: {
    sport: SportType;
    location: string;
    date: string;
    slotTime: string;
  }) => {
    setActiveSport(filters.sport);
    setBookingInitialDate(filters.date);
    setBookingInitialSlot(filters.slotTime);

    // Smooth scroll down to slot finder section
    const el = document.getElementById("slot-finder");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenBooking = (venue: Venue, date?: string, slot?: string) => {
    setSelectedVenueForBooking(venue);
    setBookingInitialDate(date);
    setBookingInitialSlot(slot);
  };

  const handleBookingSuccess = (booking: BookingRequest) => {
    setBookingCount((prev) => prev + 1);
  };

  const handleBookFirstAvailable = () => {
    // Select the first featured venue or default
    const target = displayedFeaturedVenues[0] || SAMPLE_VENUES[0];
    handleOpenBooking(target);
  };

  return (
    <main className="min-h-screen bg-[#060c08] text-white selection:bg-[#22c55e]/30 selection:text-[#a3e635]">
      {/* 1. Navigation */}
      <Navbar
        onOpenMyBookings={() => setMyBookingsOpen(true)}
        onBookNow={handleBookFirstAvailable}
        bookingCount={bookingCount}
      />

      {/* 2. Hero Section & Integrated Quick Search */}
      <HeroSection
        onSearch={handleHeroSearch}
        onExploreClick={() => {
          const el = document.getElementById("venues");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        onFindTurfClick={() => {
          const el = document.getElementById("slot-finder");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* 3. Explore by Sport Categories */}
      <SportsCategories
        activeSport={activeSport}
        onSelectSport={(sport) => {
          setActiveSport(sport);
          const el = document.getElementById("venues");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* 4. Featured Venues Showcase */}
      <FeaturedVenues
        venues={displayedFeaturedVenues}
        onSelectVenue={(v) => setSelectedVenueForDetails(v)}
        onBookSlot={(v) => handleOpenBooking(v)}
      />

      {/* 5. Slot Finder & Interactive Filter Engine */}
      <SlotFinderSection
        venues={SAMPLE_VENUES}
        activeSport={activeSport}
        onSelectSport={setActiveSport}
        onBookVenueSlot={(venue, date, slot) => handleOpenBooking(venue, date, slot)}
        onViewVenue={(venue) => setSelectedVenueForDetails(venue)}
      />

      {/* 6. How It Works */}
      <HowItWorks />

      {/* 7. Why TurfTime */}
      <WhyTurfTime />

      {/* 8. Standout Promotional Callout */}
      <PromotionalBanner onBookNow={handleBookFirstAvailable} />

      {/* 9. Community & Testimonials */}
      <CommunityTestimonials />

      {/* 10. Interactive FAQ Accordion */}
      <FAQSection />

      {/* 11. Comprehensive Footer */}
      <Footer />

      {/* Modals & Slide-overs */}
      {selectedVenueForDetails && (
        <VenueDetailsModal
          venue={selectedVenueForDetails}
          onClose={() => setSelectedVenueForDetails(null)}
          onBookNow={(venue) => {
            setSelectedVenueForDetails(null);
            handleOpenBooking(venue);
          }}
        />
      )}

      {selectedVenueForBooking && (
        <BookingModal
          venue={selectedVenueForBooking}
          initialDate={bookingInitialDate}
          initialSlot={bookingInitialSlot}
          onClose={() => setSelectedVenueForBooking(null)}
          onBookingSuccess={handleBookingSuccess}
          onOpenMyBookings={() => {
            setSelectedVenueForBooking(null);
            setMyBookingsOpen(true);
          }}
        />
      )}

      <MyBookingsDrawer
        isOpen={myBookingsOpen}
        onClose={() => setMyBookingsOpen(false)}
        onNewBookingClick={() => {
          setMyBookingsOpen(false);
          handleBookFirstAvailable();
        }}
      />
    </main>
  );
}
