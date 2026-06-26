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
  // ============================================
  // PESAPAL CONFIGURATION
  // ============================================
  PESAPAL_CONSUMER_KEY: env.PESAPAL_CONSUMER_KEY || process.env.PESAPAL_CONSUMER_KEY,
  PESAPAL_CONSUMER_SECRET: env.PESAPAL_CONSUMER_SECRET || process.env.PESAPAL_CONSUMER_SECRET,
  PESAPAL_ENVIRONMENT: env.PESAPAL_ENVIRONMENT || process.env.PESAPAL_ENVIRONMENT || 'sandbox',
  PESAPAL_IPN_ID: env.PESAPAL_IPN_ID || process.env.PESAPAL_IPN_ID || 'db365927-0455-4748-ab58-da39eb449b18',
  
  // ============================================
  // APPLICATION URLS
  // ============================================
  REACT_APP_BASE_URL: env.REACT_APP_BASE_URL || process.env.REACT_APP_BASE_URL || 'https://kajiado-bright-horizons.vercel.app',
  
  // ============================================
  // GOOGLE SHEETS INTEGRATION
  // ============================================
  GOOGLE_SHEETS_URL: env.REACT_APP_GOOGLE_SHEETS_URL || process.env.REACT_APP_GOOGLE_SHEETS_URL || '',
  
  // ============================================
  // CONTACT INFORMATION
  // ============================================
  CONTACT_EMAIL: env.REACT_APP_CONTACT_EMAIL || process.env.REACT_APP_CONTACT_EMAIL || 'info@kajiadochildrenhome.org',
  CONTACT_PHONE: env.REACT_APP_CONTACT_PHONE || process.env.REACT_APP_CONTACT_PHONE || '+254700123456',
  ORG_EMAIL: env.REACT_APP_ORG_EMAIL || process.env.REACT_APP_ORG_EMAIL || 'info@kajiadochildrenhome.org',
  
  // ============================================
  // SITE INFORMATION
  // ============================================
  SITE_NAME: env.REACT_APP_SITE_NAME || process.env.REACT_APP_SITE_NAME || 'Kajiado Bright Horizons',
  SITE_DESCRIPTION: env.REACT_APP_SITE_DESCRIPTION || process.env.REACT_APP_SITE_DESCRIPTION || 'Providing hope, care, and education to vulnerable children in Kajiado, Kenya',
  SITE_TAGLINE: env.REACT_APP_SITE_TAGLINE || 'Making a Difference One Child at a Time',
  
  // ============================================
  // SOCIAL MEDIA
  // ============================================
  SOCIAL: {
    FACEBOOK: env.REACT_APP_FACEBOOK_URL || 'https://facebook.com/kajiadochildrenshome',
    TWITTER: env.REACT_APP_TWITTER_URL || 'https://twitter.com/kajiadochildren',
    INSTAGRAM: env.REACT_APP_INSTAGRAM_URL || 'https://instagram.com/kajiadochildrenshome',
    WHATSAPP: env.REACT_APP_WHATSAPP_URL || 'https://wa.me/254720789839'
  },
  
  // ============================================
  // DONATION SETTINGS
  // ============================================
  DONATION: {
    PRESET_AMOUNTS: [500, 1000, 2500, 5000, 10000],
    MIN_AMOUNT: 10,
    MAX_AMOUNT: 1000000,
    CURRENCY: 'KES'
  }
};

console.log('🔑 Loaded credentials:');
console.log('   Consumer Key:', module.exports.PESAPAL_CONSUMER_KEY ? module.exports.PESAPAL_CONSUMER_KEY.substring(0, 15) + '...' : '❌ MISSING');
console.log('   Consumer Secret:', module.exports.PESAPAL_CONSUMER_SECRET ? '✅ Present' : '❌ MISSING');
console.log('   Environment:', module.exports.PESAPAL_ENVIRONMENT);
console.log('   IPN ID:', module.exports.PESAPAL_IPN_ID);
console.log('   Base URL:', module.exports.REACT_APP_BASE_URL);
console.log('   Google Sheets:', module.exports.GOOGLE_SHEETS_URL ? '✅ Configured' : '❌ Not configured');
console.log('   Site Name:', module.exports.SITE_NAME);
console.log('   Contact Email:', module.exports.CONTACT_EMAIL);
console.log('   Donation Presets:', module.exports.DONATION.PRESET_AMOUNTS.join(', '));