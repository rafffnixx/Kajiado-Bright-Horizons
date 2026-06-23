// api/pesapal-payment.js
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

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse body
    let rawBody = '';
    await new Promise((resolve) => {
      req.on('data', (chunk) => { rawBody += chunk.toString(); });
      req.on('end', () => { resolve(); });
    });

    let parsedBody;
    try {
      parsedBody = JSON.parse(rawBody);
    } catch (parseError) {
      console.error('❌ Failed to parse JSON');
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid JSON in request body'
      });
    }

    const { 
      amount, 
      phoneNumber, 
      email, 
      fullName, 
      donationType = 'one-time'
    } = parsedBody;

    if (!amount || amount < 10) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid amount. Minimum donation is KES 10.' 
      });
    }

    const reference = `KCH${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const baseUrl = REACT_APP_BASE_URL || 'https://kajiado-bright-horizons.vercel.app';
    const cleanPhone = phoneNumber?.replace(/^\+?254|^0/, '') || '700000000';

    // Get access token
    const token = await getAccessToken();

    // Prepare order data with correct IPN ID
    const orderData = {
      id: reference,
      currency: 'KES',
      amount: amount.toString(),
      description: `Donation to Kajiado Children's Home`,
      callback_url: `${baseUrl}/donation-success?reference=${reference}`,
      notification_id: PESAPAL_IPN_ID, // Use the IPN ID from config
      branch: 'Kajiado',
      billing_address: {
        email_address: email || 'donor@kajiadochildrenshome.org',
        phone_number: `254${cleanPhone}`,
        country_code: 'KE',
        first_name: fullName?.split(' ')[0] || 'Kajiado',
        last_name: fullName?.split(' ').slice(1).join(' ') || 'Donor',
        line1: 'Kajiado Town',
        city: 'Kajiado',
        state: 'Kajiado County',
        postal_code: '01100'
      },
      metadata: {
        donation_type: donationType,
        source: 'kajiado_childrens_home_website',
        amount: amount
      }
    };

    console.log(`📤 Submitting order to Pesapal (${PESAPAL_ENVIRONMENT})`);
    console.log('📤 Order Data:', JSON.stringify(orderData, null, 2));

    // Submit Order to Pesapal API 3.0
    const response = await fetch(`${BASE_URL}/api/Transactions/SubmitOrderRequest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    });

    const responseData = await response.json();
    console.log('📤 Pesapal Response:', JSON.stringify(responseData, null, 2));

    // Check for errors
    if (responseData.error) {
      console.error('❌ Pesapal error:', responseData.error);
      return res.status(400).json({
        success: false,
        error: responseData.error.message || 'Payment initiation failed',
        code: responseData.error.code
      });
    }

    // Success - get redirect URL
    if (responseData.order_tracking_id) {
      const redirectUrl = responseData.redirect_url || 
                         `${BASE_URL}/payment-page/${responseData.order_tracking_id}`;

      return res.status(200).json({
        success: true,
        paymentUrl: redirectUrl,
        orderTrackingId: responseData.order_tracking_id,
        merchantReference: reference,
        status: responseData.status || 'PENDING'
      });
    } else {
      return res.status(400).json({
        success: false,
        error: 'No order tracking ID received from Pesapal'
      });
    }

  } catch (error) {
    console.error('❌ Pesapal payment error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to process payment. Please try again.' 
    });
  }
};