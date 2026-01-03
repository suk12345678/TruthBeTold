const fs = require('fs');
const path = require('path');

// Read the function code
const functionPath = path.join(__dirname, '../functions/score/index.ts');
const functionCode = fs.readFileSync(functionPath, 'utf8');

console.log('📦 TruthBeTold Scoring Function');
console.log('================================\n');
console.log('To deploy this function to Supabase Cloud:\n');
console.log('1. Go to: https://supabase.com/dashboard/project/kxaoxixijylkfsaitfky/functions');
console.log('2. Click "Create a new function"');
console.log('3. Name it: "score"');
console.log('4. Copy and paste the following code:\n');
console.log('---START CODE---');
console.log(functionCode);
console.log('---END CODE---\n');
console.log('5. Click "Deploy function"\n');
console.log('✅ Once deployed, you can invoke it from your mobile app using:');
console.log('   supabase.functions.invoke("score", { body: { rent, income, market_rent, unit_quality } })\n');

