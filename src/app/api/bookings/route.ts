import { NextRequest, NextResponse } from "next/server";
import { getBookings, createBooking, updateBookingStatus } from "@/lib/db";
import { SAMPLE_VENUES } from "@/data/venues";

// Email regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Phone regex - allows Indian 10 digits with optional +91, 0, spaces, or dashes
const PHONE_REGEX = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    let bookings = await getBookings();

    if (email) {
      bookings = bookings.filter(
        (b) => b.customerEmail.toLowerCase() === email.toLowerCase().trim()
      );
    }

    return NextResponse.json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to retrieve bookings";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      venueId,
      sport,
      date,
      timeSlot,
      customerName,
      customerEmail,
      customerPhone,
      playerCount,
      equipmentRental,
      notes,
    } = body;

    const fieldErrors: Record<string, string> = {};

    // 1. Venue verification
    if (!venueId || typeof venueId !== "string") {
      fieldErrors.venueId = "Venue selection is required";
    }

    const matchedVenue = SAMPLE_VENUES.find((v) => v.id === venueId);
    if (!matchedVenue) {
      fieldErrors.venueId = "Invalid sports venue selected";
    }

    // 2. Date validation
    if (!date || typeof date !== "string") {
      fieldErrors.date = "Preferred booking date is required";
    } else {
      const parsedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (isNaN(parsedDate.getTime())) {
        fieldErrors.date = "Invalid date format. Use YYYY-MM-DD.";
      } else if (parsedDate < today) {
        fieldErrors.date = "Booking date cannot be in the past";
      }
    }

    // 3. Time slot validation
    if (!timeSlot || typeof timeSlot !== "string" || timeSlot.trim().length === 0) {
      fieldErrors.timeSlot = "Please select a time slot";
    }

    // 4. Customer Name validation
    if (!customerName || typeof customerName !== "string" || customerName.trim().length < 2) {
      fieldErrors.customerName = "Full name must be at least 2 characters";
    }

    // 5. Customer Email validation
    if (!customerEmail || typeof customerEmail !== "string" || !EMAIL_REGEX.test(customerEmail.trim())) {
      fieldErrors.customerEmail = "Please provide a valid email address";
    }

    // 6. Customer Phone validation
    const cleanPhone = (customerPhone || "").replace(/[\s\-]/g, "");
    if (!customerPhone || typeof customerPhone !== "string" || !PHONE_REGEX.test(cleanPhone)) {
      fieldErrors.customerPhone = "Please provide a valid 10-digit Indian mobile number";
    }

    // 7. Player count validation
    const numPlayers = Number(playerCount);
    if (isNaN(numPlayers) || numPlayers < 1 || numPlayers > 50) {
      fieldErrors.playerCount = "Player count must be between 1 and 50";
    }

    // Return 400 if validation fails
    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed. Please correct the highlighted fields.",
          fieldErrors,
        },
        { status: 400 }
      );
    }

    // Check for duplicate pending requests within 10 minutes to prevent accidental double submissions
    const existing = await getBookings();
    const tenMinutesAgo = Date.now() - 10 * 60 * 1000;
    const isDuplicate = existing.some(
      (b) =>
        b.venueId === venueId &&
        b.date === date &&
        b.timeSlot === timeSlot &&
        b.customerEmail.toLowerCase() === customerEmail.trim().toLowerCase() &&
        new Date(b.createdAt).getTime() > tenMinutesAgo
    );

    if (isDuplicate) {
      return NextResponse.json(
        {
          success: false,
          error:
            "A booking request for this venue and time slot was already submitted recently with this email address. Please check My Bookings.",
        },
        { status: 409 }
      );
    }

    // Calculate total: hourly rate + optional equipment + 18% GST
    const hourlyRate = matchedVenue!.pricePerHour;
    const equipmentFee = equipmentRental ? 300 : 0;
    const subtotal = hourlyRate + equipmentFee;
    const gst = Math.round(subtotal * 0.18);
    const totalAmount = subtotal + gst;

    const newBooking = await createBooking({
      venueId,
      venueName: matchedVenue!.name,
      sport: sport || matchedVenue!.sportLabel,
      date,
      timeSlot,
      customerName,
      customerEmail,
      customerPhone,
      playerCount: numPlayers,
      equipmentRental: Boolean(equipmentRental),
      notes: notes || "",
      hourlyRate,
      totalAmount,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your booking request has been successfully recorded in TurfTime's system.",
        booking: newBooking,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("API error creating booking:", err);
    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process booking request. " + errorMessage,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !["PENDING", "CONFIRMED", "CANCELLED"].includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid booking ID or status value." },
        { status: 400 }
      );
    }

    const updated = await updateBookingStatus(id, status);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Booking request not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Booking ${updated.referenceId} marked as ${status}.`,
      booking: updated,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to update booking";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
