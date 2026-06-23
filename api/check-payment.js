// api/check-payment.js
const { 
  PESAPAL_CONSUMER_KEY, 
  PESAPAL_CONSUMER_SECRET, 
  PESAPAL_ENVIRONMENT 
} = require('./config.js');

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

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { orderTrackingId } = req.query;

    if (!orderTrackingId) {
      return res.status(400).json({ 
        success: false, 
        error: 'orderTrackingId is required' 
      });
    }

    const token = await getAccessToken();

    const response = await fetch(`${BASE_URL}/api/Transactions/GetTransactionStatus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        orderTrackingId: orderTrackingId
      })
    });

    const data = await response.json();
    console.log('📊 Payment Status Check:', JSON.stringify(data, null, 2));

    res.status(200).json({
      success: true,
      status: data.status,
      amount: data.amount,
      currency: data.currency,
      payment_method: data.payment_method,
      payment_date: data.created_date,
      merchantReference: data.merchant_reference,
      payment_status_description: data.payment_status_description,
      confirmation_code: data.confirmation_code
    });

  } catch (error) {
    console.error('❌ Check payment error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};