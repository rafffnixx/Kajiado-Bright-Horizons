// api/pesapal/ipn.js
const { PESAPAL_ENVIRONMENT } = require('../shared/config.js');
const { getAccessToken, BASE_URL } = require('./auth.js');

async function queryTransactionStatus(orderTrackingId, token) {
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
  return await response.json();
}

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const params = req.method === 'GET' ? req.query : req.body;
    
    const {
      orderTrackingId,
      orderMerchantReference,
      status,
      payment_method,
      payment_status_description
    } = params;

    console.log(`📥 Pesapal IPN received:`, {
      orderTrackingId,
      orderMerchantReference,
      status,
      payment_method,
      payment_status_description,
      timestamp: new Date().toISOString()
    });

    if (orderTrackingId) {
      const token = await getAccessToken();
      const statusData = await queryTransactionStatus(orderTrackingId, token);
      console.log('📊 Payment Status from Pesapal:', statusData);

      const paymentStatus = statusData.status || status;

      if (paymentStatus === 'COMPLETED') {
        console.log(`✅ Donation COMPLETED!`);
        console.log(`   Order: ${orderMerchantReference || orderTrackingId}`);
        console.log(`   Amount: ${statusData.amount || 'N/A'} ${statusData.currency || 'KES'}`);
        console.log(`   Method: ${statusData.payment_method || payment_method}`);
        console.log(`   Payment Date: ${statusData.payment_date || new Date().toISOString()}`);
      } else if (paymentStatus === 'FAILED') {
        console.log(`❌ Donation FAILED for: ${orderMerchantReference || orderTrackingId}`);
        console.log(`   Reason: ${statusData.payment_status_description || 'Unknown'}`);
      } else if (paymentStatus === 'PENDING') {
        console.log(`⏳ Donation PENDING for: ${orderMerchantReference || orderTrackingId}`);
      } else if (paymentStatus === 'CANCELLED') {
        console.log(`🚫 Donation CANCELLED for: ${orderMerchantReference || orderTrackingId}`);
      }
    }

    res.status(200).send('OK');

  } catch (error) {
    console.error('❌ IPN error:', error);
    res.status(200).send('OK');
  }
};