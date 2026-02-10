-- Allow admins to update any booking
create policy "Admins can update all bookings" on bookings for update using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
