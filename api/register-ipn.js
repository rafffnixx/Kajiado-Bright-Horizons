// api/register-ipn.js
// Run this once to register your IPN URL and get notification_id

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
  return data.token;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = await getAccessToken();
    const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';

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

    res.status(200).json({
      success: true,
      notification_id: data.ipn_id,
      message: 'IPN registered successfully. Save this notification_id in your .env file.',
      full_response: data
    });

  } catch (error) {
    console.error('❌ IPN registration error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}