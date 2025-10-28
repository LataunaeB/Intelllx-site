/**
 * Configuration Checker
 * Runs on server-side to verify environment variables
 */

// Load environment variables
require('dotenv').config({ path: '.env.local' });

console.log('\n🔍 Checking Configuration...\n');

const requiredVars = {
  'Google Calendar': ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'],
  'Supabase': ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'],
  'Resend': ['RESEND_API_KEY'],
  'Zoom': ['ZOOM_ACCOUNT_ID', 'ZOOM_CLIENT_ID', 'ZOOM_CLIENT_SECRET'],
  'Scheduler': ['NEXT_PUBLIC_MEETINGS_URL'],
};

let allGood = true;

Object.entries(requiredVars).forEach(([service, vars]) => {
  console.log(`${service}:`);
  vars.forEach(varName => {
    const value = process.env[varName];
    const hasValue = value && value !== `your-${varName.toLowerCase().replace(/_/g, '-')}-here`;
    
    if (hasValue && value.length > 10) {
      console.log(`  ✅ ${varName} - Set (${value.substring(0, 20)}...)`);
    } else {
      console.log(`  ❌ ${varName} - MISSING`);
      allGood = false;
    }
  });
  console.log('');
});

if (allGood) {
  console.log('✅ All required environment variables are set!\n');
} else {
  console.log('❌ Some environment variables are missing.\n');
  console.log('See ENV_VARIABLES_NEEDED.md for instructions.\n');
}

process.exit(allGood ? 0 : 1);

