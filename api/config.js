// api/config.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
export function loadEnv() {
  // Try to find .env in the project root
  const projectRoot = path.resolve(__dirname, '..');
  const envPath = path.join(projectRoot, '.env');
  
  console.log('📁 Project root:', projectRoot);
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

export const PESAPAL_CONSUMER_KEY = env.PESAPAL_CONSUMER_KEY || process.env.PESAPAL_CONSUMER_KEY;
export const PESAPAL_CONSUMER_SECRET = env.PESAPAL_CONSUMER_SECRET || process.env.PESAPAL_CONSUMER_SECRET;
export const PESAPAL_ENVIRONMENT = env.PESAPAL_ENVIRONMENT || process.env.PESAPAL_ENVIRONMENT || 'sandbox';
export const REACT_APP_BASE_URL = env.REACT_APP_BASE_URL || process.env.REACT_APP_BASE_URL || 'http://localhost:3000';

console.log('🔑 Loaded credentials:');
console.log('   Consumer Key:', PESAPAL_CONSUMER_KEY ? PESAPAL_CONSUMER_KEY.substring(0, 15) + '...' : '❌ MISSING');
console.log('   Consumer Secret:', PESAPAL_CONSUMER_SECRET ? '✅ Present' : '❌ MISSING');
console.log('   Environment:', PESAPAL_ENVIRONMENT);
console.log('   Base URL:', REACT_APP_BASE_URL);