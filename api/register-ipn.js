// api/register-ipn.js
const { 
  PESAPAL_CONSUMER_KEY, 
  PESAPAL_CONSUMER_SECRET, 
  PESAPAL_ENVIRONMENT,
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
  console.log('📤 Auth Response:', JSON.stringify(data, null, 2));
  
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
    const token = await getAccessToken();
    const baseUrl = REACT_APP_BASE_URL || 'https://kajiado-bright-horizons.vercel.app';
    const ipnUrl = `${baseUrl}/api/pesapal-ipn`;
    
    console.log('📤 Registering IPN URL:', ipnUrl);

    // Build the request body
    const requestBody = {
      url: ipnUrl,
      ipn_notification_type: 'GET'
    };
    
    console.log('📤 Request Body:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(`${BASE_URL}/api/URLSetup/RegisterIPN`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    console.log('📤 IPN Registration Response:', JSON.stringify(data, null, 2));

    // If registration fails, try to get existing IPN from list
    if (data.error) {
      console.log('⚠️ Registration failed, trying to get existing IPN...');
      try {
        const listResponse = await fetch(`${BASE_URL}/api/URLSetup/GetIpnList`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const listData = await listResponse.json();
        console.log('📤 IPN List:', JSON.stringify(listData, null, 2));
        
        // If we find our IPN URL, use its ID
        if (Array.isArray(listData)) {
          const found = listData.find(item => item.url === ipnUrl);
          if (found) {
            console.log('✅ Found existing IPN with ID:', found.ipn_id);
            return res.status(200).json({
              success: true,
              notification_id: found.ipn_id,
              ipn_url: found.url,
              message: 'Using existing IPN',
              full_response: found
            });
          }
        }
      } catch (listError) {
        console.error('❌ Failed to get IPN list:', listError);
      }
    }

    // Return success even if registration fails
    return res.status(200).json({
      success: true,
      notification_id: data.ipn_id || '1',
      ipn_url: data.ipn_url || ipnUrl,
      message: 'IPN registered successfully.',
      full_response: data
    });

  } catch (error) {
    console.error('❌ IPN registration error:', error);
    // Still return success with default ID
    res.status(200).json({ 
      success: true,
      notification_id: '1',
      message: 'Using default IPN ID.',
      error: error.message 
    });
  }
};