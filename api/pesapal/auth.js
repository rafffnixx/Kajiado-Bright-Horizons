// api/pesapal/auth.js
const { 
  PESAPAL_CONSUMER_KEY, 
  PESAPAL_CONSUMER_SECRET, 
  PESAPAL_ENVIRONMENT 
} = require('../shared/config.js');

const BASE_URL = PESAPAL_ENVIRONMENT === 'production' 
  ? 'https://pay.pesapal.com/v3'
  : 'https://cybqa.pesapal.com/pesapalv3';

async function getAccessToken() {
  if (!PESAPAL_CONSUMER_KEY || !PESAPAL_CONSUMER_SECRET) {
    console.error('❌ Missing Pesapal credentials!');
    throw new Error('Consumer Key is required|Consumer Secret is required');
  }

  console.log('📡 Requesting token from:', `${BASE_URL}/api/Auth/RequestToken`);

  const response = await fetch(`${BASE_URL}/api/Auth/RequestToken`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      consumer_key: PESAPAL_CONSUMER_KEY,
      consumer_secret: PESAPAL_CONSUMER_SECRET
    })
  });
  
  const data = await response.json();
  console.log('📤 Auth Response Status:', response.status);
  
  if (response.status !== 200) {
    console.log('📤 Auth Response Error:', JSON.stringify(data, null, 2));
    throw new Error(data.error?.message || 'Failed to get access token');
  }
  
  if (!data.token) {
    throw new Error(data.error?.message || 'Failed to get access token');
  }
  
  console.log('✅ Access token obtained successfully');
  return data.token;
}

module.exports = { getAccessToken, BASE_URL };