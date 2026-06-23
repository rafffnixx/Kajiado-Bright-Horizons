// api/config.js
const fs = require('fs');
const path = require('path');

// Load environment variables from .env file
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

// Load once
const env = loadEnv();

module.exports = {
  PESAPAL_CONSUMER_KEY: env.PESAPAL_CONSUMER_KEY || process.env.PESAPAL_CONSUMER_KEY,
  PESAPAL_CONSUMER_SECRET: env.PESAPAL_CONSUMER_SECRET || process.env.PESAPAL_CONSUMER_SECRET,
  PESAPAL_ENVIRONMENT: env.PESAPAL_ENVIRONMENT || process.env.PESAPAL_ENVIRONMENT || 'sandbox',
  REACT_APP_BASE_URL: env.REACT_APP_BASE_URL || process.env.REACT_APP_BASE_URL || 'https://kajiado-bright-horizons.vercel.app'
};

console.log('🔑 Loaded credentials:');
console.log('   Consumer Key:', module.exports.PESAPAL_CONSUMER_KEY ? module.exports.PESAPAL_CONSUMER_KEY.substring(0, 15) + '...' : '❌ MISSING');
console.log('   Consumer Secret:', module.exports.PESAPAL_CONSUMER_SECRET ? '✅ Present' : '❌ MISSING');
console.log('   Environment:', module.exports.PESAPAL_ENVIRONMENT);