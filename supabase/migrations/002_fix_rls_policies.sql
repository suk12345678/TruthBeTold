-- Drop existing policies
drop policy if exists "public insert" on rent_inputs;
drop policy if exists "public insert" on scores;

-- Create new policies that allow anonymous users
create policy "allow anon insert" on rent_inputs
  for insert to anon with check (true);

create policy "allow anon select" on rent_inputs
  for select to anon using (true);

create policy "allow anon insert" on scores
  for insert to anon with check (true);

create policy "allow anon select" on scores
  for select to anon using (true);

-- Also allow authenticated users
create policy "allow authenticated insert" on rent_inputs
  for insert to authenticated with check (true);

create policy "allow authenticated select" on rent_inputs
  for select to authenticated using (true);

create policy "allow authenticated insert" on scores
  for insert to authenticated with check (true);

create policy "allow authenticated select" on scores
  for select to authenticated using (true);

