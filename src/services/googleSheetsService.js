// src/services/googleSheetsService.js
const GOOGLE_SHEETS_URL = process.env.REACT_APP_GOOGLE_SHEETS_URL;

/**
 * Submit contact form to Google Sheets
 */
export const submitContact = async (data) => {
  try {
    if (!GOOGLE_SHEETS_URL) {
      console.warn('Google Sheets URL not configured');
      return { success: false, error: 'Google Sheets not configured' };
    }

    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        endpoint: 'contact',
        payload: {
          fullName: data.fullname || '',
          email: data.email || '',
          phone: data.phone || '',
          subject: data.subject || '',
          message: data.message || ''
        }
      })
    });
    
    console.log('✅ Contact message submitted to Google Sheets');
    return { success: true, message: 'Contact message submitted' };
  } catch (error) {
    console.error('Error submitting contact:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Log donation to Google Sheets
 */
export const logDonation = async (data) => {
  try {
    if (!GOOGLE_SHEETS_URL) {
      console.warn('Google Sheets URL not configured');
      return { success: false, error: 'Google Sheets not configured' };
    }

    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        endpoint: 'donation',
        payload: {
          fullName: data.fullName || 'Anonymous',
          email: data.email || '',
          phone: data.phone || '',
          amount: data.amount || '0',
          paymentMethod: data.paymentMethod || 'Unknown',
          reference: data.reference || '',
          status: data.status || 'Pending',
          donationType: data.donationType || 'one-time'
        }
      })
    });
    
    console.log('✅ Donation logged to Google Sheets');
    return { success: true, message: 'Donation logged' };
  } catch (error) {
    console.error('Error logging donation:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Log contact message to Google Sheets
 */
export const logContact = async (data) => {
  try {
    if (!GOOGLE_SHEETS_URL) {
      console.warn('Google Sheets URL not configured');
      return { success: false, error: 'Google Sheets not configured' };
    }

    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        endpoint: 'contact',
        payload: {
          fullName: data.fullName || '',
          email: data.email || '',
          phone: data.phone || '',
          subject: data.subject || '',
          message: data.message || ''
        }
      })
    });
    
    console.log('✅ Contact message logged to Google Sheets');
    return { success: true, message: 'Contact message logged' };
  } catch (error) {
    console.error('Error logging contact:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Log visit request to Google Sheets - UPDATED WITH EMAIL
 */
export const logVisit = async (data) => {
  try {
    if (!GOOGLE_SHEETS_URL) {
      console.warn('Google Sheets URL not configured');
      return { success: false, error: 'Google Sheets not configured' };
    }

    // Log the data being sent for debugging
    console.log('📤 Sending visit data:', data);

    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        endpoint: 'visit',
        payload: {
          organization: data.organization || '',
          registered: data.registered || '',
          registeredName: data.registeredName || '',
          department: data.department || '',
          regNumber: data.regNumber || '',
          teamLeader: data.teamLeader || '',
          teamLeaderId: data.teamLeaderId || '',
          phone: data.phone || '',
          email: data.email || '', // ✅ EMAIL FIELD ADDED
          visitDate: data.visitDate || '',
          people: data.people || '',
          activities: data.activities || '',
          teamMembers: data.teamMembers || ''
        }
      })
    });
    
    console.log('✅ Visit request logged to Google Sheets with email:', data.email);
    return { success: true, message: 'Visit request logged' };
  } catch (error) {
    console.error('Error logging visit:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Log newsletter signup to Google Sheets
 */
export const logNewsletter = async (data) => {
  try {
    if (!GOOGLE_SHEETS_URL) {
      console.warn('Google Sheets URL not configured');
      return { success: false, error: 'Google Sheets not configured' };
    }

    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        endpoint: 'newsletter',
        payload: {
          email: data.email || '',
          name: data.name || ''
        }
      })
    });
    
    console.log('✅ Newsletter signup logged to Google Sheets');
    return { success: true, message: 'Newsletter signup logged' };
  } catch (error) {
    console.error('Error logging newsletter:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Log IPN callback to Google Sheets
 */
export const logIPNCallback = async (data) => {
  try {
    if (!GOOGLE_SHEETS_URL) {
      console.warn('Google Sheets URL not configured');
      return { success: false, error: 'Google Sheets not configured' };
    }

    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
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
          notificationType: data.notificationType || ''
        }
      })
    });
    
    console.log('✅ IPN callback logged to Google Sheets');
    return { success: true, message: 'IPN callback logged' };
  } catch (error) {
    console.error('Error logging IPN callback:', error);
    return { success: false, error: error.message };
  }
};

export default {
  submitContact,
  logDonation,
  logContact,
  logVisit,
  logNewsletter,
  logIPNCallback
};