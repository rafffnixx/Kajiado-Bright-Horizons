// api/register-ipn.js
const PESAPAL_CONSUMER_KEY = process.env.PESAPAL_CONSUMER_KEY;
const PESAPAL_CONSUMER_SECRET = process.env.PESAPAL_CONSUMER_SECRET;
const PESAPAL_ENVIRONMENT = process.env.PESAPAL_ENVIRONMENT || 'sandbox';

const BASE_URL = PESAPAL_ENVIRONMENT === 'production' 
  ? 'https://pay.pesapal.com/v3'
  : 'https://cybqa.pesapal.com/pesapalv3';

async function getAccessToken() {
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
  
  if (!data.token) {
    throw new Error(data.error?.message || 'Failed to get access token');
  }
  return data.token;
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = await getAccessToken();
    const baseUrl = process.env.REACT_APP_BASE_URL || 'https://kajiado-bright-horizons.vercel.app';

    console.log(`📤 Registering IPN URL: ${baseUrl}/api/pesapal-ipn`);

    // Register IPN URL
    const response = await fetch(`${BASE_URL}/api/URLSetup/RegisterIPN`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        ipn_url: `${baseUrl}/api/pesapal-ipn`,
        ipn_notification_type: 'GET'
      })
    });

    const data = await response.json();

    if (data.ipn_id || data.ipn_url) {
      console.log('✅ IPN registered successfully!');
      
      return res.status(200).json({
        success: true,
        notification_id: data.ipn_id || '1',
        ipn_url: data.ipn_url || `${baseUrl}/api/pesapal-ipn`,
        message: 'IPN registered successfully. Save the notification_id in your .env.local file.',
        full_response: data
      });
    } else {
      throw new Error(data.error?.message || 'Failed to register IPN');
    }

  } catch (error) {
    console.error('❌ IPN registration error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'IPN registration failed' 
    });
  }
}