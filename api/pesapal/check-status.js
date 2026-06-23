// api/pesapal/check-status.js
const { getAccessToken, BASE_URL } = require('./auth.js');

module.exports = async function handler(req, res) {
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