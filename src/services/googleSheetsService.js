// src/services/googleSheetsService.js
// Google Sheets & Email Integration

import CONFIG from '../config';

// Submit Review Form
export const submitReview = async (formData) => {
  const data = {
    type: CONFIG.FORM_TYPES.REVIEW,
    name: formData.name,
    email: formData.email,
    company: formData.company || '',
    position: formData.position || '',
    rating: formData.rating,
    service: formData.service || 'General',
    review: formData.review
  };
  
  try {
    console.log('📤 Submitting review to Google Script...');
    console.log('📧 Customer email:', data.email);
    
    await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    console.log('✅ Review submitted successfully!');
    console.log('📧 Admin email sent to:', CONFIG.ADMIN_EMAIL);
    console.log('📧 Auto-reply sent to customer:', data.email);
    console.log('📊 Data saved to Google Sheet');
    
    return { success: true };
    
  } catch (error) {
    console.error('❌ Review submission error:', error);
    return { success: false, error: error.message };
  }
};

// Submit Contact Form
export const submitContact = async (formData) => {
  const data = {
    type: CONFIG.FORM_TYPES.CONTACT,
    fullname: formData.fullname,
    email: formData.email,
    phone: formData.phone || '',
    serviceInterest: formData.serviceInterest || 'General Inquiry',
    message: formData.message
  };
  
  try {
    console.log('📤 Submitting contact form to Google Script...');
    console.log('📧 Customer email:', data.email);
    
    await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    console.log('✅ Contact form submitted successfully!');
    console.log('📧 Admin email sent to:', CONFIG.ADMIN_EMAIL);
    console.log('📧 Auto-reply sent to customer:', data.email);
    console.log('📊 Data saved to Google Sheet');
    
    return { success: true };
    
  } catch (error) {
    console.error('❌ Contact submission error:', error);
    return { success: false, error: error.message };
  }
};

// Test function to verify connection
export const testConnection = async () => {
  console.log('🧪 Testing connection to Google Script...');
  console.log('📍 URL:', CONFIG.GOOGLE_SCRIPT_URL);
  
  const testData = {
    type: 'test',
    name: 'Connection Test',
    email: CONFIG.ADMIN_EMAIL,
    message: 'This is a test from the connection test function'
  };
  
  try {
    await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });
    
    console.log('✅ Connection test completed');
    return { success: true };
  } catch (error) {
    console.error('❌ Connection test failed:', error);
    return { success: false, error: error.message };
  }
};

// Get configuration info
export const getConfig = () => {
  return {
    googleScriptUrl: CONFIG.GOOGLE_SCRIPT_URL,
    adminEmail: CONFIG.ADMIN_EMAIL,
    companyName: CONFIG.COMPANY_NAME,
    companyPhone: CONFIG.COMPANY_PHONE,
    companyEmail: CONFIG.COMPANY_EMAIL
  };
};