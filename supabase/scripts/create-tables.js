const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createTables() {
  console.log('🚀 Creating database tables...\n');

  // Read the SQL file
  const sqlFile = path.join(__dirname, '../migrations/001_initial_schema.sql');
  const sql = fs.readFileSync(sqlFile, 'utf8');

  // Split SQL into individual statements
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  // Execute each statement
  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i];
    console.log(`Executing statement ${i + 1}/${statements.length}...`);
    console.log(statement.substring(0, 50) + '...\n');

    try {
      const { data, error } = await supabase.rpc('exec_sql', { sql_query: statement });
      
      if (error) {
        // Try direct execution via REST API
        const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseServiceKey,
            'Authorization': `Bearer ${supabaseServiceKey}`
          },
          body: JSON.stringify({ sql_query: statement })
        });

        if (!response.ok) {
          console.error(`❌ Error executing statement ${i + 1}:`, error);
          console.error('Statement:', statement);
        } else {
          console.log(`✅ Statement ${i + 1} executed successfully`);
        }
      } else {
        console.log(`✅ Statement ${i + 1} executed successfully`);
      }
    } catch (err) {
      console.error(`❌ Error executing statement ${i + 1}:`, err.message);
      console.error('Statement:', statement);
    }
  }

  console.log('\n🎉 Database setup complete!');
  console.log('\nVerifying tables...');

  // Verify tables were created
  const { data: rentInputs, error: rentError } = await supabase
    .from('rent_inputs')
    .select('count');

  const { data: scores, error: scoresError } = await supabase
    .from('scores')
    .select('count');

  if (!rentError) {
    console.log('✅ rent_inputs table exists');
  } else {
    console.log('❌ rent_inputs table not found:', rentError.message);
  }

  if (!scoresError) {
    console.log('✅ scores table exists');
  } else {
    console.log('❌ scores table not found:', scoresError.message);
  }
}

createTables().catch(console.error);

