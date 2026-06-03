// src/services/emailService.js
// Email is handled by Google Apps Script

import CONFIG from '../config';

// Initialize (kept for compatibility)
export const initEmailJS = () => {
  console.log("📧 Using Google Apps Script for email notifications");
  console.log("📍 Script URL:", CONFIG.GOOGLE_SCRIPT_URL);
  console.log("📍 Admin email:", CONFIG.ADMIN_EMAIL);
};

// Send email for contact form (via Google Apps Script)
export const sendContactEmail = async (formData) => {
  const data = {
    type: CONFIG.FORM_TYPES.CONTACT,
    fullname: formData.fullname,
    email: formData.email,
    phone: formData.phone || "Not provided",
    serviceInterest: formData.serviceInterest || "General inquiry",
    message: formData.message
  };
  
  try {
    await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    console.log("✅ Contact form sent - Google Script will handle email");
    return { success: true };
  } catch (error) {
    console.error("❌ Error:", error);
    return { success: false, error };
  }
};

// Send email for review submission (via Google Apps Script)
export const sendReviewEmail = async (formData) => {
  const data = {
    type: CONFIG.FORM_TYPES.REVIEW,
    name: formData.name,
    email: formData.email,
    company: formData.company || "Not provided",
    position: formData.position || "Not provided",
    rating: formData.rating,
    service: formData.service || "General",
    review: formData.review
  };
  
  try {
    await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    console.log("✅ Review sent - Google Script will handle email");
    return { success: true };
  } catch (error) {
    console.error("❌ Error:", error);
    return { success: false, error };
  }
};

// Auto-reply is handled by Google Apps Script
export const sendAutoReply = async (email, name, type = 'general') => {
  console.log(`📧 Auto-reply will be sent to ${email} by Google Script`);
  return { success: true };
};