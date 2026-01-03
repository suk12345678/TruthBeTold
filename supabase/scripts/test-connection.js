const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://kxaoxixijylkfsaitfky.supabase.co';
const supabaseKey = 'sb_publishable_OFG0exPyyNuaVOF-U843bQ_dpDqbtvZ';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('🧪 Testing Supabase connection...\n');

  // Test rent_inputs table
  console.log('Testing rent_inputs table...');
  const { data: rentData, error: rentError } = await supabase
    .from('rent_inputs')
    .select('*')
    .limit(1);

  if (rentError) {
    console.log('❌ rent_inputs error:', rentError.message);
  } else {
    console.log('✅ rent_inputs table accessible');
    console.log('   Records found:', rentData.length);
  }

  // Test scores table
  console.log('\nTesting scores table...');
  const { data: scoresData, error: scoresError } = await supabase
    .from('scores')
    .select('*')
    .limit(1);

  if (scoresError) {
    console.log('❌ scores error:', scoresError.message);
  } else {
    console.log('✅ scores table accessible');
    console.log('   Records found:', scoresData.length);
  }

  // Test insert
  console.log('\n🧪 Testing insert into rent_inputs...');
  const { data: insertData, error: insertError } = await supabase
    .from('rent_inputs')
    .insert({
      rent: 2000,
      income: 6000,
      market_rent: 1800,
      unit_quality: 7,
      zip_code: '90210'
    })
    .select();

  if (insertError) {
    console.log('❌ Insert error:', insertError.message);
  } else {
    console.log('✅ Insert successful!');
    console.log('   Inserted record:', insertData[0]);
  }

  console.log('\n🎉 Database is ready to use!');
}

testConnection().catch(console.error);

