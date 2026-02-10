import { createClient } from '@/lib/supabase/client';

async function fetchVehicles() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('vehicles')
    .select('id, slug');
  
  if (error) {
    console.error('Error:', error);
    return;
  }
  
  console.log(JSON.stringify(data, null, 2));
}

fetchVehicles();
