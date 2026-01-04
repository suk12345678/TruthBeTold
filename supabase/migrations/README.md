# Database Migrations

## Running Migrations

### Option 1: Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `003_add_persona_tracking.sql`
4. Paste and run the SQL

### Option 2: Supabase CLI
```bash
supabase db push
```

## Migration 003: Add Persona Tracking

This migration adds persona tracking to enable analytics on user preferences:

**What it does:**
- Adds `persona` column to `scores` table
- Creates index for fast analytics queries
- Creates `persona_usage_by_zip` view for easy analytics
- Flexible schema to support future personas

**Analytics enabled:**
- Which personas are most popular overall
- Which personas are preferred in different zip codes
- Correlation between verdicts and persona choices
- Geographic persona preferences
- Trends over time

**Example queries:**
See `supabase/scripts/persona_analytics.sql` for ready-to-use analytics queries.

## Future Personas

The schema is designed to be flexible. When adding new personas:
1. Add to `PERSONAS` in `mobile/constants/designTokens.ts`
2. Add messaging variants in `MESSAGE_VARIANTS`
3. No database changes needed - the `persona` column accepts any text value
4. Analytics queries will automatically include new personas

