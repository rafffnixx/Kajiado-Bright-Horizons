// api/pesapal-ipn.js
const { 
  PESAPAL_CONSUMER_KEY, 
  PESAPAL_CONSUMER_SECRET, 
  PESAPAL_ENVIRONMENT,
  PESAPAL_IPN_ID,
  REACT_APP_BASE_URL 
} = require('./config.js');

const BASE_URL = PESAPAL_ENVIRONMENT === 'production' 
  ? 'https://pay.pesapal.com/v3'
  : 'https://cybqa.pesapal.com/pesapalv3';

async function getAccessToken() {
  if (!PESAPAL_CONSUMER_KEY || !PESAPAL_CONSUMER_SECRET) {
    console.error('❌ Missing Pesapal credentials!');
    throw new Error('Consumer Key is required|Consumer Secret is required');
  }

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
    // Get parameters from Pesapal (can be GET or POST)
    const params = req.method === 'GET' ? req.query : req.body;
    
    const {
      orderTrackingId,
      orderMerchantReference,
      status,
      payment_method,
      payment_status_description
    } = params;

    console.log(`📥 Pesapal IPN received (${PESAPAL_ENVIRONMENT}):`, {
      orderTrackingId,
      orderMerchantReference,
      status,
      payment_method,
      payment_status_description,
      timestamp: new Date().toISOString()
    });

    // Always query Pesapal for the real status
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
        
        // TODO: Send confirmation email to donor
        // TODO: Update database
        // TODO: Update donation statistics
        
      } else if (paymentStatus === 'FAILED') {
        console.log(`❌ Donation FAILED for: ${orderMerchantReference || orderTrackingId}`);
        console.log(`   Reason: ${statusData.payment_status_description || 'Unknown'}`);
        
      } else if (paymentStatus === 'PENDING') {
        console.log(`⏳ Donation PENDING for: ${orderMerchantReference || orderTrackingId}`);
        
      } else if (paymentStatus === 'CANCELLED') {
        console.log(`🚫 Donation CANCELLED for: ${orderMerchantReference || orderTrackingId}`);
      }
    } else {
      console.log('⚠️ No orderTrackingId provided in IPN');
    }

    // Always respond with OK to Pesapal
    res.status(200).send('OK');

  } catch (error) {
    console.error('❌ IPN error:', error);
    // Still return OK so Pesapal doesn't retry
    res.status(200).send('OK');
  }
};