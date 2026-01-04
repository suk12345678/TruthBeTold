-- Add persona column to scores table to track which persona users choose
-- This enables analytics like:
-- - Which personas are most popular overall
-- - Which personas are preferred in different zip codes
-- - Correlation between verdicts and persona choices
-- - User behavior patterns and preferences

alter table scores
add column persona text default 'empath';

-- Add comment for documentation
-- Note: This is flexible to support future personas beyond the current 4
comment on column scores.persona is 'The persona selected by the user (e.g., analyst, empath, tough_coach, investigator). Flexible schema to support future personas.';

-- Create index for analytics queries
create index idx_scores_persona on scores(persona);

-- Create a view for persona analytics by zip code
create or replace view persona_usage_by_zip as
select 
  ri.zip_code,
  s.persona,
  s.verdict,
  count(*) as usage_count,
  round(avg(s.score), 1) as avg_score
from scores s
join rent_inputs ri on s.rent_input_id = ri.id
where ri.zip_code is not null
group by ri.zip_code, s.persona, s.verdict
order by ri.zip_code, usage_count desc;

-- Grant access to the view
grant select on persona_usage_by_zip to public;

