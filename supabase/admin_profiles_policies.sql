-- Migration: Fix infinite recursion in profiles RLS policies
-- Run this on your Supabase SQL editor

-- Step 1: Drop the recursive policies (if they exist)
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;

-- Step 2: Create a SECURITY DEFINER function to check admin role
-- This function bypasses RLS so it won't cause recursion
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Step 3: Create policies using the function instead of a subquery
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (
  is_admin()
);

CREATE POLICY "Admins can update all profiles" ON profiles FOR UPDATE USING (
  is_admin()
);
