-- Migration: Add additional booking fields
-- Run this on your Supabase SQL editor

ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS location text,
  ADD COLUMN IF NOT EXISTS contact_no text,
  ADD COLUMN IF NOT EXISTS purpose text,
  ADD COLUMN IF NOT EXISTS main_place_of_visit text,
  ADD COLUMN IF NOT EXISTS expected_kms numeric;
