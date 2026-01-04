-- Add user tracking to support analytics by user
-- This enables:
-- - Track which users prefer which personas
-- - Analyze user behavior patterns
-- - Support user-specific features in the future
-- - Anonymous users get a UUID stored in localStorage

-- Add user_id to rent_inputs table
alter table rent_inputs
add column user_id uuid;

-- Add user_id to scores table  
alter table scores
add column user_id uuid;

-- Add comments for documentation
comment on column rent_inputs.user_id is 'Anonymous user identifier (UUID stored in browser localStorage). Enables user-level analytics without requiring authentication.';
comment on column scores.user_id is 'Anonymous user identifier (UUID stored in browser localStorage). Enables user-level analytics without requiring authentication.';

-- Create indexes for user-based queries
create index idx_rent_inputs_user_id on rent_inputs(user_id);
create index idx_scores_user_id on scores(user_id);

-- Drop and recreate the persona analytics view to include user tracking
drop view if exists persona_usage_by_zip;

create view persona_usage_by_zip as
select
  ri.zip_code,
  s.persona,
  s.verdict,
  count(*) as usage_count,
  count(distinct s.user_id) as unique_users,
  round(avg(s.score), 1) as avg_score
from scores s
join rent_inputs ri on s.rent_input_id = ri.id
where ri.zip_code is not null
group by ri.zip_code, s.persona, s.verdict
order by ri.zip_code, usage_count desc;

-- Create a new view for user persona preferences
create view user_persona_preferences as
select 
  s.user_id,
  s.persona,
  count(*) as usage_count,
  round(avg(s.score), 1) as avg_score,
  max(s.created_at) as last_used
from scores s
where s.user_id is not null
group by s.user_id, s.persona
order by s.user_id, usage_count desc;

-- Grant access to the views
grant select on persona_usage_by_zip to public;
grant select on user_persona_preferences to public;

