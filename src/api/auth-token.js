// api/auth-token.js
const PESAPAL_CONSUMER_KEY = process.env.PESAPAL_CONSUMER_KEY;
const PESAPAL_CONSUMER_SECRET = process.env.PESAPAL_CONSUMER_SECRET;
const PESAPAL_ENVIRONMENT = process.env.PESAPAL_ENVIRONMENT || 'sandbox';

const BASE_URL = PESAPAL_ENVIRONMENT === 'production' 
  ? 'https://pay.pesapal.com/v3'
  : 'https://cybqa.pesapal.com/pesapalv3';

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
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

    if (data.token) {
      return res.status(200).json({
        success: true,
        token: data.token,
        expiry: data.expiry_date
      });
    } else {
      return res.status(400).json({
        success: false,
        error: data.error?.message || 'Failed to get token'
      });
    }
  } catch (error) {
    console.error('❌ Auth error:', error);
    res.status(500).json({ success: false, error: 'Authentication failed' });
  }
}