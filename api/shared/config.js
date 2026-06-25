// api/shared/config.js
const fs = require('fs');
const path = require('path');

function loadEnv() {
  const envPath = path.join(process.cwd(), '.env');
  console.log('📁 Looking for .env at:', envPath);
  
  if (!fs.existsSync(envPath)) {
    console.error('❌ .env NOT found at:', envPath);
    return {};
  }
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  const env = {};
  const lines = envContent.split('\n');
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const firstEquals = trimmedLine.indexOf('=');
      if (firstEquals > 0) {
        const key = trimmedLine.substring(0, firstEquals).trim();
        const value = trimmedLine.substring(firstEquals + 1).trim();
        env[key] = value;
      }
    }
  }
  
  console.log('📄 Loaded env vars:', Object.keys(env).join(', '));
  return env;
}

const env = loadEnv();

module.exports = {
  // Pesapal Configuration
  PESAPAL_CONSUMER_KEY: env.PESAPAL_CONSUMER_KEY || process.env.PESAPAL_CONSUMER_KEY,
  PESAPAL_CONSUMER_SECRET: env.PESAPAL_CONSUMER_SECRET || process.env.PESAPAL_CONSUMER_SECRET,
  PESAPAL_ENVIRONMENT: env.PESAPAL_ENVIRONMENT || process.env.PESAPAL_ENVIRONMENT || 'sandbox',
  PESAPAL_IPN_ID: env.PESAPAL_IPN_ID || process.env.PESAPAL_IPN_ID || 'db365927-0455-4748-ab58-da39eb449b18',
  
  // Application URLs
  REACT_APP_BASE_URL: env.REACT_APP_BASE_URL || process.env.REACT_APP_BASE_URL || 'https://kajiado-bright-horizons.vercel.app',
  
  // Google Sheets Integration
  GOOGLE_SHEETS_URL: env.REACT_APP_GOOGLE_SHEETS_URL || process.env.REACT_APP_GOOGLE_SHEETS_URL || '',
  
  // Contact Information
  CONTACT_EMAIL: env.REACT_APP_CONTACT_EMAIL || process.env.REACT_APP_CONTACT_EMAIL || 'info@kajiadochildrenhome.org',
  CONTACT_PHONE: env.REACT_APP_CONTACT_PHONE || process.env.REACT_APP_CONTACT_PHONE || '+254700123456',
  ORG_EMAIL: env.REACT_APP_ORG_EMAIL || process.env.REACT_APP_ORG_EMAIL || 'info@kajiadochildrenhome.org',
  
  // Site Information
  SITE_NAME: env.REACT_APP_SITE_NAME || process.env.REACT_APP_SITE_NAME || 'Kajiado Bright Horizons',
  SITE_DESCRIPTION: env.REACT_APP_SITE_DESCRIPTION || process.env.REACT_APP_SITE_DESCRIPTION || 'Providing hope, care, and education to vulnerable children in Kajiado, Kenya',
};

console.log('🔑 Loaded credentials:');
console.log('   Consumer Key:', module.exports.PESAPAL_CONSUMER_KEY ? module.exports.PESAPAL_CONSUMER_KEY.substring(0, 15) + '...' : '❌ MISSING');
console.log('   Consumer Secret:', module.exports.PESAPAL_CONSUMER_SECRET ? '✅ Present' : '❌ MISSING');
console.log('   Environment:', module.exports.PESAPAL_ENVIRONMENT);
console.log('   IPN ID:', module.exports.PESAPAL_IPN_ID);
console.log('   Base URL:', module.exports.REACT_APP_BASE_URL);
console.log('   Google Sheets:', module.exports.GOOGLE_SHEETS_URL ? '✅ Configured' : '❌ Not configured');
console.log('   Site Name:', module.exports.SITE_NAME);