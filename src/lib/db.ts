import fs from "fs";
import path from "path";
import os from "os";
import { BookingRequest, BookingSubmissionPayload } from "@/types";

// Persistent file storage directory:
// On Vercel / AWS Lambda, process.cwd() is read-only, so we write to os.tmpdir()
const isVercel = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const DATA_DIR = isVercel ? os.tmpdir() : path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "turftime_bookings.json");

// In-memory fallback/cache for serverless warm execution
let inMemoryBookings: BookingRequest[] | null = null;

// Initial sample seed bookings so reviewers see realistic prototype records immediately
const INITIAL_SEED_BOOKINGS: BookingRequest[] = [
  {
    id: "tt-req-seed-001",
    referenceId: "TT-MUM-98421",
    venueId: "tt-v-001",
    venueName: "Urban Kickers Arena",
    sport: "Football (7v7 / 5v5)",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0], // Tomorrow
    timeSlot: "08:00 PM - 09:00 PM",
    customerName: "Vikram Sengupta",
    customerEmail: "vikram.sengupta@mumbaisports.in",
    customerPhone: "+91 98201 44521",
    playerCount: 14,
    equipmentRental: true,
    notes: "Corporate friendly match. Need 2 sets of colored bibs and 2 match balls.",
    hourlyRate: 1800,
    totalAmount: 2360,
    status: "CONFIRMED",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: "tt-req-seed-002",
    referenceId: "TT-MUM-83190",
    venueId: "tt-v-003",
    venueName: "The Smash House Badminton Academy",
    sport: "Badminton (AC)",
    date: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0], // Day after tomorrow
    timeSlot: "07:00 AM - 08:00 AM",
    customerName: "Ananya Deshmukh",
    customerEmail: "ananya.d@fintech.co",
    customerPhone: "+91 98192 12093",
    playerCount: 4,
    equipmentRental: false,
    notes: "Court 2 requested if available.",
    hourlyRate: 850,
    totalAmount: 1003,
    status: "PENDING",
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
];

// Helper to ensure data directory and file exist
function ensureDataFile(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      // Check if original data/bookings.json exists in repo to clone from
      const seedFile = path.join(process.cwd(), "data", "bookings.json");
      if (fs.existsSync(seedFile)) {
        try {
          const content = fs.readFileSync(seedFile, "utf8");
          fs.writeFileSync(DATA_FILE, content, "utf8");
          return;
        } catch {
          // fallback
        }
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_SEED_BOOKINGS, null, 2), "utf8");
    }
  } catch (err) {
    console.error("Storage initialization warning:", err);
  }
}

// Read bookings from persistent storage
export async function getBookings(): Promise<BookingRequest[]> {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    const bookings: BookingRequest[] = JSON.parse(raw);
    // Sort newest first
    return bookings.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (err) {
    console.error("Failed to read bookings from storage:", err);
    return INITIAL_SEED_BOOKINGS;
  }
}

// Generate unique booking reference like "TT-MUM-74192"
function generateReferenceId(): string {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `TT-MUM-${randomNum}`;
}

// Create and persist a new booking request
export async function createBooking(
  payload: BookingSubmissionPayload & {
    venueName: string;
    hourlyRate: number;
    totalAmount: number;
  }
): Promise<BookingRequest> {
  ensureDataFile();

  const newBooking: BookingRequest = {
    id: `tt-req-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    referenceId: generateReferenceId(),
    venueId: payload.venueId,
    venueName: payload.venueName,
    sport: payload.sport,
    date: payload.date,
    timeSlot: payload.timeSlot,
    customerName: payload.customerName.trim(),
    customerEmail: payload.customerEmail.trim().toLowerCase(),
    customerPhone: payload.customerPhone.trim(),
    playerCount: Number(payload.playerCount) || 10,
    equipmentRental: Boolean(payload.equipmentRental),
    notes: payload.notes?.trim() || "",
    hourlyRate: payload.hourlyRate,
    totalAmount: payload.totalAmount,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  };

  const existing = await getBookings();
  const updated = [newBooking, ...existing];

  fs.writeFileSync(DATA_FILE, JSON.stringify(updated, null, 2), "utf8");

  return newBooking;
}

// Update booking status (e.g. CANCELLED or CONFIRMED)
export async function updateBookingStatus(
  id: string,
  status: "PENDING" | "CONFIRMED" | "CANCELLED"
): Promise<BookingRequest | null> {
  ensureDataFile();
  const bookings = await getBookings();
  const index = bookings.findIndex((b) => b.id === id || b.referenceId === id);

  if (index === -1) {
    return null;
  }

  bookings[index].status = status;
  fs.writeFileSync(DATA_FILE, JSON.stringify(bookings, null, 2), "utf8");

  return bookings[index];
}
