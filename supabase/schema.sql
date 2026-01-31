-- Vehicles Table
create table vehicles (
  id uuid default gen_random_uuid() primary key,
  make text not null,
  model text not null,
  year int not null,
  type text not null check (type in ('car', 'bike', 'scooter')),
  price_per_day numeric not null,
  description text,
  image_url text, -- Cloudinary URL
  features text[],
  is_available boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Profiles Table (Users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone text,
  avatar_url text,
  role text default 'user' check (role in ('user', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Bookings Table
create table bookings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  vehicle_id uuid references vehicles(id) on delete set null not null,
  start_date timestamp with time zone not null,
  end_date timestamp with time zone not null,
  total_price numeric not null,
  status text default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies (Basic)
alter table vehicles enable row level security;
create policy "Vehicles are viewable by everyone" on vehicles for select using (true);
create policy "Vehicles editable by admin" on vehicles for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

alter table bookings enable row level security;
create policy "Users can view own bookings" on bookings for select using (auth.uid() = user_id);
create policy "Users can create bookings" on bookings for insert with check (auth.uid() = user_id);
create policy "Admins can view all bookings" on bookings for select using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

alter table profiles enable row level security;
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
