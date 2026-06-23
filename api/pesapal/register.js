// api/pesapal/register.js
const { REACT_APP_BASE_URL } = require('../shared/config.js');
const { getAccessToken, BASE_URL } = require('./auth.js');

module.exports = async function handler(req, res) {
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
    const ipnUrl = `${baseUrl}/api/pesapal/ipn`;
    
    console.log('📤 Registering IPN URL:', ipnUrl);

    const requestBody = {
      url: ipnUrl,
      ipn_notification_type: 'GET'
    };

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

    if (data.ipn_id) {
      return res.status(200).json({
        success: true,
        notification_id: data.ipn_id,
        ipn_url: data.url || ipnUrl,
        message: 'IPN registered successfully.',
        full_response: data
      });
    }

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

    return res.status(200).json({
      success: true,
      notification_id: data.ipn_id || '3d55d047-c5ed-4643-80b5-da3a2bcc1058',
      ipn_url: data.ipn_url || ipnUrl,
      message: 'Using default IPN ID.',
      full_response: data
    });

  } catch (error) {
    console.error('❌ IPN registration error:', error);
    res.status(200).json({ 
      success: true,
      notification_id: '3d55d047-c5ed-4643-80b5-da3a2bcc1058',
      message: 'Using default IPN ID.',
      error: error.message 
    });
  }
};