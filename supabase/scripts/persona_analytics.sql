-- Persona Analytics Queries
-- Run these in Supabase SQL Editor to understand user behavior

-- 1. Overall persona popularity
select 
  persona,
  count(*) as total_uses,
  round(count(*) * 100.0 / sum(count(*)) over (), 1) as percentage
from scores
where persona is not null
group by persona
order by total_uses desc;

-- 2. Persona preferences by zip code
select 
  ri.zip_code,
  s.persona,
  count(*) as usage_count,
  round(count(*) * 100.0 / sum(count(*)) over (partition by ri.zip_code), 1) as pct_in_zip
from scores s
join rent_inputs ri on s.rent_input_id = ri.id
where ri.zip_code is not null and s.persona is not null
group by ri.zip_code, s.persona
order by ri.zip_code, usage_count desc;

-- 3. Top 10 zip codes by persona
-- Shows which zip codes prefer which persona most
select 
  persona,
  ri.zip_code,
  count(*) as usage_count
from scores s
join rent_inputs ri on s.rent_input_id = ri.id
where ri.zip_code is not null and s.persona is not null
group by persona, ri.zip_code
order by persona, usage_count desc;

-- 4. Persona choice by verdict
-- Do people choose different personas based on their rent situation?
select 
  s.verdict,
  s.persona,
  count(*) as usage_count,
  round(avg(s.score), 1) as avg_score
from scores s
where s.persona is not null
group by s.verdict, s.persona
order by s.verdict, usage_count desc;

-- 5. Geographic persona heatmap
-- Which personas dominate in which areas?
select 
  ri.zip_code,
  max(case when s.persona = 'analyst' then usage_count else 0 end) as analyst_count,
  max(case when s.persona = 'empath' then usage_count else 0 end) as empath_count,
  max(case when s.persona = 'tough_coach' then usage_count else 0 end) as tough_coach_count,
  max(case when s.persona = 'investigator' then usage_count else 0 end) as investigator_count,
  sum(usage_count) as total_checks
from (
  select 
    ri.zip_code,
    s.persona,
    count(*) as usage_count
  from scores s
  join rent_inputs ri on s.rent_input_id = ri.id
  where ri.zip_code is not null and s.persona is not null
  group by ri.zip_code, s.persona
) as persona_counts
join rent_inputs ri on ri.zip_code = persona_counts.zip_code
group by ri.zip_code
order by total_checks desc
limit 50;

-- 6. Persona trends over time
select 
  date_trunc('day', s.created_at) as date,
  s.persona,
  count(*) as daily_uses
from scores s
where s.persona is not null
  and s.created_at > now() - interval '30 days'
group by date_trunc('day', s.created_at), s.persona
order by date, persona;

-- 7. Most popular persona by verdict type
-- Which persona do people choose when they get bad news?
select 
  verdict,
  persona,
  count(*) as usage_count,
  rank() over (partition by verdict order by count(*) desc) as popularity_rank
from scores
where persona is not null
group by verdict, persona
order by verdict, popularity_rank;

