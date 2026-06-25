// api/pesapal/ipn.js
const { 
  PESAPAL_ENVIRONMENT,
  GOOGLE_SHEETS_URL,
  CONTACT_EMAIL,
  SITE_NAME
} = require('../shared/config.js');
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

// Log to Google Sheets
async function logToGoogleSheets(data) {
  try {
    if (!GOOGLE_SHEETS_URL) {
      console.log('⚠️ Google Sheets URL not configured, skipping log');
      return;
    }

    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        endpoint: 'ipn',
        payload: {
          orderTrackingId: data.orderTrackingId || '',
          merchantReference: data.merchantReference || '',
          status: data.status || '',
          amount: data.amount || '',
          currency: data.currency || '',
          paymentMethod: data.paymentMethod || '',
          confirmationCode: data.confirmationCode || '',
          paymentDate: data.paymentDate || '',
          notificationType: data.notificationType || '',
          donorName: data.donorName || '',
          donorEmail: data.donorEmail || ''
        }
      })
    });
    console.log('✅ IPN logged to Google Sheets');
  } catch (error) {
    console.error('❌ Failed to log IPN to Google Sheets:', error.message);
  }
}

// Send email notification for completed donations
async function sendDonationEmail(data) {
  try {
    if (!data.donorEmail) {
      console.log('⚠️ No donor email provided, skipping email');
      return;
    }

    const subject = `✅ Thank You for Your Donation - ${SITE_NAME}`;
    
    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .header { background: #2563eb; padding: 20px; text-align: center; }
          .header h1 { color: #fff; margin: 0; }
          .content { padding: 20px; }
          .details { background: #f0f4f8; padding: 15px; border-radius: 8px; border-left: 4px solid #2563eb; }
          .footer { background: #1a365d; padding: 15px; text-align: center; color: #fff; font-size: 12px; }
          .blessing { font-style: italic; color: #2563eb; text-align: center; padding: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🙏 Thank You for Your Donation!</h1>
        </div>
        <div class="content">
          <p>Dear <strong>${data.donorName || 'Supporter'}</strong>,</p>
          <p>Thank you for your generous donation to ${SITE_NAME}. Your support helps us provide love, care, education, and hope to vulnerable children in Kajiado, Kenya.</p>
          <div class="details">
            <p><strong>Amount:</strong> ${data.amount} ${data.currency || 'KES'}</p>
            <p><strong>Reference:</strong> ${data.merchantReference || 'N/A'}</p>
            <p><strong>Payment Method:</strong> ${data.paymentMethod || 'Unknown'}</p>
            <p><strong>Date:</strong> ${data.paymentDate || new Date().toISOString()}</p>
          </div>
          <p>Your donation will help provide:</p>
          <ul>
            <li>🍲 Nutritious meals for children</li>
            <li>📚 Quality education and school supplies</li>
            <li>🏥 Medical care and healthcare support</li>
            <li>🏠 Safe shelter and loving care</li>
            <li>💖 Hope and a brighter future</li>
          </ul>
          <div class="blessing">
            <p>"The generous will themselves be blessed, for they share their food with the poor."<br><strong>Proverbs 22:9</strong></p>
          </div>
          <p>With gratitude,<br><strong>${SITE_NAME} Team</strong></p>
        </div>
        <div class="footer">
          <p>${SITE_NAME} | Making a Difference One Child at a Time</p>
          <p>${CONTACT_EMAIL}</p>
        </div>
      </body>
      </html>
    `;

    const textBody = `
Thank You for Your Donation!

Dear ${data.donorName || 'Supporter'},

Thank you for your generous donation to ${SITE_NAME}. Your support helps us provide love, care, education, and hope to vulnerable children in Kajiado, Kenya.

Amount: ${data.amount} ${data.currency || 'KES'}
Reference: ${data.merchantReference || 'N/A'}
Payment Method: ${data.paymentMethod || 'Unknown'}

"The generous will themselves be blessed, for they share their food with the poor." - Proverbs 22:9

With gratitude,
${SITE_NAME} Team
`;

    await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        endpoint: 'email',
        payload: {
          to: data.donorEmail,
          subject: subject,
          htmlBody: htmlBody,
          textBody: textBody
        }
      })
    });
    
    console.log(`✅ Donation confirmation email sent to: ${data.donorEmail}`);
  } catch (error) {
    console.error('❌ Failed to send donation email:', error.message);
  }
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
      payment_status_description,
      donorName,
      donorEmail
    } = params;

    console.log(`📥 Pesapal IPN received:`, {
      orderTrackingId,
      orderMerchantReference,
      status,
      payment_method,
      payment_status_description,
      donorName,
      donorEmail,
      timestamp: new Date().toISOString()
    });

    if (orderTrackingId) {
      const token = await getAccessToken();
      const statusData = await queryTransactionStatus(orderTrackingId, token);
      console.log('📊 Payment Status from Pesapal:', statusData);

      const paymentStatus = statusData.status || status;
      const paymentAmount = statusData.amount || 'N/A';
      const paymentCurrency = statusData.currency || 'KES';
      const paymentMethod = statusData.payment_method || payment_method;

      // Log to Google Sheets
      await logToGoogleSheets({
        orderTrackingId: orderTrackingId,
        merchantReference: orderMerchantReference,
        status: paymentStatus,
        amount: paymentAmount,
        currency: paymentCurrency,
        paymentMethod: paymentMethod,
        confirmationCode: statusData.confirmation_code || '',
        paymentDate: statusData.created_date || new Date().toISOString(),
        notificationType: 'IPNCHANGE',
        donorName: donorName || '',
        donorEmail: donorEmail || ''
      });

      if (paymentStatus === 'COMPLETED') {
        console.log(`✅ Donation COMPLETED!`);
        console.log(`   Order: ${orderMerchantReference || orderTrackingId}`);
        console.log(`   Amount: ${paymentAmount} ${paymentCurrency}`);
        console.log(`   Method: ${paymentMethod}`);
        console.log(`   Payment Date: ${statusData.created_date || new Date().toISOString()}`);
        
        // Send email notification to donor
        if (donorEmail) {
          await sendDonationEmail({
            donorName: donorName || 'Supporter',
            donorEmail: donorEmail,
            amount: paymentAmount,
            currency: paymentCurrency,
            paymentMethod: paymentMethod,
            merchantReference: orderMerchantReference,
            paymentDate: statusData.created_date || new Date().toISOString()
          });
        }
        
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

    res.status(200).send('OK');

  } catch (error) {
    console.error('❌ IPN error:', error);
    res.status(200).send('OK');
  }
};