const fs = require('fs');
const { randomUUID } = require('crypto');
const path = require('path');

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

// Generate IDs
const vehiclesWithIds = vehicles.map(v => ({
  ...v,
  id: randomUUID(),
  created_at: new Date().toISOString()
}));

// 1. Generate SQL
const sqlStatements = vehiclesWithIds.map(v => {
  const features = JSON.stringify(v.features).replace(/'/g, "''");
  return `INSERT INTO vehicles (id, slug, make, model, year, type, price_per_day, description, image_url, features, is_available) 
VALUES ('${v.id}', '${v.slug}', '${v.make}', '${v.model}', ${v.year}, '${v.type}', ${v.price_per_day}, '${v.description.replace(/'/g, "''")}', '${v.image_url}', ARRAY['${v.features.join("','")}'], ${v.is_available})
ON CONFLICT (slug) DO UPDATE SET 
  id = EXCLUDED.id,
  image_url = EXCLUDED.image_url;`;
}).join('\n');

fs.writeFileSync('supabase/seed.sql', sqlStatements);
console.log('Created supabase/seed.sql');

// 2. Update fleet.ts
const fleetContent = `import { Vehicle } from '@/types/vehicle';

export const vehicles: Vehicle[] = ${JSON.stringify(vehiclesWithIds, null, 2)};
`;

// Fix the JSON stringify output to look more like TS (optional, but good for readability)
// Actually, JSON is valid TS if typed properly.
// But we need to remove quotes from keys? No, quoted keys are valid JS/TS.
// The types might be an issue if dates are strings? Vehicle type expects string for created_at, so it's fine.

fs.writeFileSync('src/data/fleet.ts', fleetContent);
console.log('Updated src/data/fleet.ts');
