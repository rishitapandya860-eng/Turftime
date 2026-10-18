export type SportType =
  | "all"
  | "football"
  | "cricket"
  | "badminton"
  | "tennis"
  | "basketball"
  | "pickleball";

export interface TimeSlot {
  time: string;
  status: "available" | "limited" | "booked";
  isPeak?: boolean;
}

export interface Venue {
  id: string;
  name: string;
  tagline: string;
  sport: "football" | "cricket" | "badminton" | "tennis" | "basketball" | "pickleball";
  sportLabel: string;
  location: string;
  city: string;
  address: string;
  distance?: string;
  pricePerHour: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  gallery: string[];
  badges: string[];
  amenities: string[];
  turfSpecs: string;
  dimensions: string;
  featured?: boolean;
  slots: TimeSlot[];
  rules: string[];
  description: string;
}

export interface BookingRequest {
  id: string;
  referenceId: string;
  venueId: string;
  venueName: string;
  sport: string;
  date: string;
  timeSlot: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  playerCount: number;
  equipmentRental: boolean;
  notes?: string;
  hourlyRate: number;
  totalAmount: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  createdAt: string;
}

export interface BookingSubmissionPayload {
  venueId: string;
  sport: string;
  date: string;
  timeSlot: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  playerCount: number;
  equipmentRental?: boolean;
  notes?: string;
}

export interface FilterState {
  sport: SportType;
  location: string;
  maxPrice: number;
  selectedDate: string;
  selectedSlot: string;
  amenities: string[];
  searchQuery: string;
}
