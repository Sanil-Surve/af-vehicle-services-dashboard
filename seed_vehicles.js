// const { createClient } = require('@supabase/supabase-js');

// const supabaseUrl = 'https://bupirztzlqeraywbgahq.supabase.co';
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1cGlyenR6bHFlcmF5d2JnYWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5OTMzMjksImV4cCI6MjA3ODU2OTMyOX0.4AaVstHSbpg2r4kpyH_dXsTZZ5njyCg7IYD_R5A6rVw';
// const supabase = createClient(supabaseUrl, supabaseKey);

import { createClient } from '@/lib/supabase/client';

const vehicles = [
  {
    slug: 'maruti-suzuki-swift',
    make: 'Maruti Suzuki',
    model: 'Swift',
    year: 2022,
    type: 'car',
    price_per_day: 1800,
    description: 'Compact hatchback with excellent mileage, ideal for city rides.',
    image_url: 'https://res.cloudinary.com/ddrzqzfa4/image/upload/v1770739379/vehicle-services/kh6axezkgdltarzyhh1d.jpg',
    features: ['Air Conditioning', 'Automatic', 'Petrol', '5 Seater'],
    is_available: true,
  },
  {
    slug: 'hyundai-creta',
    make: 'Hyundai',
    model: 'Creta',
    year: 2023,
    type: 'car',
    price_per_day: 3000,
    description: 'Comfortable SUV suitable for long drives and family trips.',
    image_url: 'https://res.cloudinary.com/ddrzqzfa4/image/upload/v1770739379/vehicle-services/kh6axezkgdltarzyhh1d.jpg',
    features: ['Sunroof', 'Automatic', 'Diesel', 'Cruise Control'],
    is_available: true,
  },
  {
    slug: 'tata-nexon',
    make: 'Tata',
    model: 'Nexon',
    year: 2022,
    type: 'car',
    price_per_day: 2800,
    description: 'Safe and reliable compact SUV with premium interiors.',
    image_url: 'https://res.cloudinary.com/ddrzqzfa4/image/upload/v1770739379/vehicle-services/kh6axezkgdltarzyhh1d.jpg',
    features: ['5 Star Safety', 'Manual', 'Petrol', 'Touchscreen'],
    is_available: true,
  },
  {
    slug: 'toyota-innova-crysta',
    make: 'Toyota',
    model: 'Innova Crysta',
    year: 2021,
    type: 'car',
    price_per_day: 4200,
    description: 'Spacious MPV perfect for family and group travel.',
    image_url: 'https://res.cloudinary.com/ddrzqzfa4/image/upload/v1770739379/vehicle-services/kh6axezkgdltarzyhh1d.jpg',
    features: ['7 Seater', 'Diesel', 'Automatic', 'Rear AC'],
    is_available: false,
  },
  {
    slug: 'royal-enfield-classic-350',
    make: 'Royal Enfield',
    model: 'Classic 350',
    year: 2022,
    type: 'bike',
    price_per_day: 1200,
    description: 'Retro-style bike with powerful performance.',
    image_url: 'https://res.cloudinary.com/ddrzqzfa4/image/upload/v1770739774/vehicle-services/mygtwsn9u00zfgcv616o.jpg',
    features: ['350cc', 'ABS', 'Petrol'],
    is_available: true,
  },
  {
    slug: 'bajaj-pulsar-ns200',
    make: 'Bajaj',
    model: 'Pulsar NS200',
    year: 2023,
    type: 'bike',
    price_per_day: 1000,
    description: 'Sporty bike suitable for city and highway rides.',
    image_url: 'https://res.cloudinary.com/ddrzqzfa4/image/upload/v1770739774/vehicle-services/mygtwsn9u00zfgcv616o.jpg',
    features: ['200cc', 'ABS', 'Petrol', 'Sport Mode'],
    is_available: true,
  },
  {
    slug: 'yamaha-mt-15',
    make: 'Yamaha',
    model: 'MT-15',
    year: 2022,
    type: 'bike',
    price_per_day: 950,
    description: 'Lightweight naked street bike with aggressive design.',
    image_url: 'https://res.cloudinary.com/ddrzqzfa4/image/upload/v1770739774/vehicle-services/mygtwsn9u00zfgcv616o.jpg',
    features: ['155cc', 'Fuel Injection', 'ABS'],
    is_available: true,
  },
  {
    slug: 'honda-activa-6g',
    make: 'Honda',
    model: 'Activa 6G',
    year: 2023,
    type: 'scooter',
    price_per_day: 500,
    description: 'Reliable scooter for daily commuting.',
    image_url: 'https://res.cloudinary.com/ddrzqzfa4/image/upload/v1770739898/vehicle-services/v3gcsn3kgju4ukyb5piu.jpg',
    features: ['110cc', 'Petrol', 'Silent Start'],
    is_available: true,
  },
  {
    slug: 'tvs-ntorq-125',
    make: 'TVS',
    model: 'Ntorq 125',
    year: 2022,
    type: 'scooter',
    price_per_day: 600,
    description: 'Sporty scooter with smart connectivity features.',
    image_url: 'https://res.cloudinary.com/ddrzqzfa4/image/upload/v1770739898/vehicle-services/v3gcsn3kgju4ukyb5piu.jpg',
    features: ['125cc', 'Bluetooth', 'Digital Console'],
    is_available: true,
  },
  {
    slug: 'ather-450x',
    make: 'Ather',
    model: '450X',
    year: 2023,
    type: 'scooter',
    price_per_day: 800,
    description: 'Premium electric scooter with fast acceleration.',
    image_url: 'https://res.cloudinary.com/ddrzqzfa4/image/upload/v1770739898/vehicle-services/v3gcsn3kgju4ukyb5piu.jpg',
    features: ['Electric', 'Fast Charging', 'Smart Dashboard'],
    is_available: true,
  },
];

async function seedVehicles() {
  console.log('Seeding vehicles...');
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('vehicles')
    .insert(vehicles)
    .select();

  if (error) {
    console.error('Error seeding vehicles:', error);
    return;
  }

  console.log('Seeding complete. New data:');
  console.log(JSON.stringify(data, null, 2));
}

seedVehicles();
