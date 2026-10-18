-- ==============================================================================
-- TURFTIME (ZooTechX Topic 3) - PostgreSQL / Supabase Database Schema
-- ==============================================================================

-- 1. Create Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id VARCHAR(64) PRIMARY KEY,
  reference_id VARCHAR(32) UNIQUE NOT NULL,
  venue_id VARCHAR(64) NOT NULL,
  venue_name VARCHAR(255) NOT NULL,
  sport VARCHAR(100) NOT NULL,
  booking_date DATE NOT NULL,
  time_slot VARCHAR(64) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(32) NOT NULL,
  player_count INTEGER NOT NULL DEFAULT 10,
  equipment_rental BOOLEAN NOT NULL DEFAULT FALSE,
  notes TEXT,
  hourly_rate INTEGER NOT NULL,
  total_amount INTEGER NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'CONFIRMED', 'CANCELLED')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Indexes for fast query lookups and search
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(customer_email);
CREATE INDEX IF NOT EXISTS idx_bookings_venue_date ON bookings(venue_id, booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);

-- 3. Row Level Security (RLS) Policy for Supabase
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow public inserts for booking requests
CREATE POLICY "Allow public booking creation" 
ON bookings FOR INSERT 
WITH CHECK (true);

-- Allow reading bookings
CREATE POLICY "Allow reading bookings" 
ON bookings FOR SELECT 
USING (true);

-- Allow status updates
CREATE POLICY "Allow status updates" 
ON bookings FOR UPDATE 
USING (true);
