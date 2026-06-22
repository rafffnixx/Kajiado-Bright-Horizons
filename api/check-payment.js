// api/check-payment.js
// Check payment status by orderTrackingId

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
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { orderTrackingId } = req.query;

    if (!orderTrackingId) {
      return res.status(400).json({ error: 'orderTrackingId is required' });
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

    res.status(200).json({
      success: true,
      status: data.status,
      amount: data.amount,
      currency: data.currency,
      payment_method: data.payment_method,
      payment_date: data.payment_date,
      orderTrackingId: orderTrackingId
    });

  } catch (error) {
    console.error('❌ Check payment error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}