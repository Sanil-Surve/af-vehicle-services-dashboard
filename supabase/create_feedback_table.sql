-- Migration: Create feedback table for user reviews/ratings
-- Run this on your Supabase SQL editor

CREATE TABLE IF NOT EXISTS feedback (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review text NOT NULL,
  location text,
  is_approved boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Anyone can submit feedback
CREATE POLICY "Anyone can insert feedback" ON feedback FOR INSERT WITH CHECK (true);

-- Only approved feedback is publicly visible
CREATE POLICY "Approved feedback is viewable by everyone" ON feedback FOR SELECT USING (is_approved = true);

-- Admins can manage all feedback
CREATE POLICY "Admins can manage feedback" ON feedback FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
