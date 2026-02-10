INSERT INTO vehicles (id, slug, make, model, year, type, price_per_day, description, image_url, features, is_available) 
VALUES ('07a1e0ab-f20a-48c5-8928-392079b2cab6', 'maruti-suzuki-swift', 'Maruti Suzuki', 'Swift', 2022, 'car', 1800, 'Compact hatchback with excellent mileage, ideal for city rides.', 'https://res.cloudinary.com/ddrzqzfa4/image/upload/v1770739379/vehicle-services/kh6axezkgdltarzyhh1d.jpg', ARRAY['Air Conditioning','Automatic','Petrol','5 Seater'], true)
ON CONFLICT (slug) DO UPDATE SET 
  id = EXCLUDED.id,
  image_url = EXCLUDED.image_url;
INSERT INTO vehicles (id, slug, make, model, year, type, price_per_day, description, image_url, features, is_available) 
VALUES ('19a83492-3298-4593-a2ce-f6301515d52a', 'hyundai-creta', 'Hyundai', 'Creta', 2023, 'car', 3000, 'Comfortable SUV suitable for long drives and family trips.', 'https://res.cloudinary.com/ddrzqzfa4/image/upload/v1770739379/vehicle-services/kh6axezkgdltarzyhh1d.jpg', ARRAY['Sunroof','Automatic','Diesel','Cruise Control'], true)
ON CONFLICT (slug) DO UPDATE SET 
  id = EXCLUDED.id,
  image_url = EXCLUDED.image_url;
INSERT INTO vehicles (id, slug, make, model, year, type, price_per_day, description, image_url, features, is_available) 
VALUES ('65b2a517-61c1-4bb1-9700-fe398a560a58', 'tata-nexon', 'Tata', 'Nexon', 2022, 'car', 2800, 'Safe and reliable compact SUV with premium interiors.', 'https://res.cloudinary.com/ddrzqzfa4/image/upload/v1770739379/vehicle-services/kh6axezkgdltarzyhh1d.jpg', ARRAY['5 Star Safety','Manual','Petrol','Touchscreen'], true)
ON CONFLICT (slug) DO UPDATE SET 
  id = EXCLUDED.id,
  image_url = EXCLUDED.image_url;
INSERT INTO vehicles (id, slug, make, model, year, type, price_per_day, description, image_url, features, is_available) 
VALUES ('fd248bbf-4cda-4f63-bab9-9d3825db5698', 'toyota-innova-crysta', 'Toyota', 'Innova Crysta', 2021, 'car', 4200, 'Spacious MPV perfect for family and group travel.', 'https://res.cloudinary.com/ddrzqzfa4/image/upload/v1770739379/vehicle-services/kh6axezkgdltarzyhh1d.jpg', ARRAY['7 Seater','Diesel','Automatic','Rear AC'], false)
ON CONFLICT (slug) DO UPDATE SET 
  id = EXCLUDED.id,
  image_url = EXCLUDED.image_url;
INSERT INTO vehicles (id, slug, make, model, year, type, price_per_day, description, image_url, features, is_available) 
VALUES ('6105f7cd-8da6-4fb3-bdf8-43478afe0382', 'royal-enfield-classic-350', 'Royal Enfield', 'Classic 350', 2022, 'bike', 1200, 'Retro-style bike with powerful performance.', 'https://res.cloudinary.com/ddrzqzfa4/image/upload/v1770739774/vehicle-services/mygtwsn9u00zfgcv616o.jpg', ARRAY['350cc','ABS','Petrol'], true)
ON CONFLICT (slug) DO UPDATE SET 
  id = EXCLUDED.id,
  image_url = EXCLUDED.image_url;
INSERT INTO vehicles (id, slug, make, model, year, type, price_per_day, description, image_url, features, is_available) 
VALUES ('2abaf0fb-1410-45a5-8221-c58701dbab1c', 'bajaj-pulsar-ns200', 'Bajaj', 'Pulsar NS200', 2023, 'bike', 1000, 'Sporty bike suitable for city and highway rides.', 'https://res.cloudinary.com/ddrzqzfa4/image/upload/v1770739774/vehicle-services/mygtwsn9u00zfgcv616o.jpg', ARRAY['200cc','ABS','Petrol','Sport Mode'], true)
ON CONFLICT (slug) DO UPDATE SET 
  id = EXCLUDED.id,
  image_url = EXCLUDED.image_url;
INSERT INTO vehicles (id, slug, make, model, year, type, price_per_day, description, image_url, features, is_available) 
VALUES ('95ec7958-d7b3-49ae-b053-3e590e04a78b', 'yamaha-mt-15', 'Yamaha', 'MT-15', 2022, 'bike', 950, 'Lightweight naked street bike with aggressive design.', 'https://res.cloudinary.com/ddrzqzfa4/image/upload/v1770739774/vehicle-services/mygtwsn9u00zfgcv616o.jpg', ARRAY['155cc','Fuel Injection','ABS'], true)
ON CONFLICT (slug) DO UPDATE SET 
  id = EXCLUDED.id,
  image_url = EXCLUDED.image_url;
INSERT INTO vehicles (id, slug, make, model, year, type, price_per_day, description, image_url, features, is_available) 
VALUES ('3397fa81-9b02-46cc-990d-94421dd2276e', 'honda-activa-6g', 'Honda', 'Activa 6G', 2023, 'scooter', 500, 'Reliable scooter for daily commuting.', 'https://res.cloudinary.com/ddrzqzfa4/image/upload/v1770739898/vehicle-services/v3gcsn3kgju4ukyb5piu.jpg', ARRAY['110cc','Petrol','Silent Start'], true)
ON CONFLICT (slug) DO UPDATE SET 
  id = EXCLUDED.id,
  image_url = EXCLUDED.image_url;
INSERT INTO vehicles (id, slug, make, model, year, type, price_per_day, description, image_url, features, is_available) 
VALUES ('cce2f1b7-567f-495c-92a8-b06bae539147', 'tvs-ntorq-125', 'TVS', 'Ntorq 125', 2022, 'scooter', 600, 'Sporty scooter with smart connectivity features.', 'https://res.cloudinary.com/ddrzqzfa4/image/upload/v1770739898/vehicle-services/v3gcsn3kgju4ukyb5piu.jpg', ARRAY['125cc','Bluetooth','Digital Console'], true)
ON CONFLICT (slug) DO UPDATE SET 
  id = EXCLUDED.id,
  image_url = EXCLUDED.image_url;
INSERT INTO vehicles (id, slug, make, model, year, type, price_per_day, description, image_url, features, is_available) 
VALUES ('ff903293-8071-40e2-8da0-359bd8e85e82', 'ather-450x', 'Ather', '450X', 2023, 'scooter', 800, 'Premium electric scooter with fast acceleration.', 'https://res.cloudinary.com/ddrzqzfa4/image/upload/v1770739898/vehicle-services/v3gcsn3kgju4ukyb5piu.jpg', ARRAY['Electric','Fast Charging','Smart Dashboard'], true)
ON CONFLICT (slug) DO UPDATE SET 
  id = EXCLUDED.id,
  image_url = EXCLUDED.image_url;