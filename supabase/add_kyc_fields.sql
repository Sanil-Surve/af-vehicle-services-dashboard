-- Migration: Add KYC fields to profiles table
-- Run this on your Supabase SQL editor

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS kyc_document_url text,
  ADD COLUMN IF NOT EXISTS kyc_status text DEFAULT 'not_submitted' CHECK (kyc_status IN ('not_submitted', 'submitted', 'verified', 'rejected'));
