import React, { useState } from 'react';
import CONFIG from '../config';
import { submitContact } from '../services/googleSheetsService';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    serviceInterest: '',
    message: ''
  });
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback({ message: '', type: '' });

    const { fullname, email, message } = formData;
    
    // Validation
    if (!fullname || !email || !message) {
      setFeedback({ 
        message: '❌ Please provide your name, email address, and message.', 
        type: 'error' 
      });
      setIsSubmitting(false);
      return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      setFeedback({ 
        message: '❌ Please enter a valid email address (e.g., name@example.com).', 
        type: 'error' 
      });
      setIsSubmitting(false);
      return;
    }
    
    // Submit using the centralized service
    const result = await submitContact(formData);
    
    if (result.success) {
      console.log('✅ Contact form submitted successfully!');
      console.log('📧 Email notification sent to admin');
      console.log('📊 Data saved to Google Sheet');
      
      setFeedback({ 
        message: `✅ Thank you ${fullname}! Your message has been sent successfully. We'll reply within 24 hours.`, 
        type: 'success' 
      });
      
      // Reset form
      setFormData({
        fullname: '',
        email: '',
        phone: '',
        serviceInterest: '',
        message: ''
      });
      
    } else {
      console.error('❌ Submission error:', result.error);
      setFeedback({ 
        message: `❌ There was an error sending your message. Please call us directly at ${CONFIG.COMPANY_PHONE} or email ${CONFIG.COMPANY_EMAIL}`, 
        type: 'error' 
      });
    }
    
    setIsSubmitting(false);
    
    // Clear feedback after 6 seconds
    setTimeout(() => setFeedback({ message: '', type: '' }), 6000);
  };

  return (
    <div className="contact-page">
      <section className="page-header">
        <div className="container">
          <h1>Let's <span>Talk Finances</span></h1>
          <p>Reach out for a free consultation or quote. We respond within 24 hours.</p>
        </div>
      </section>

      <section className="contact-main">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Information Column */}
            <div className="contact-info">
              <h3><i className="fas fa-phone-alt"></i> Contact Details</h3>
              
              <div className="contact-detail">
                <i className="fas fa-envelope"></i>
                <div>
                  <strong>Email</strong><br />
                  <a href={`mailto:${CONFIG.COMPANY_EMAIL}`}>{CONFIG.COMPANY_EMAIL}</a>
                </div>
              </div>
              
              <div className="contact-detail">
                <i className="fas fa-phone"></i>
                <div>
                  <strong>Phone</strong><br />
                  <a href={`tel:${CONFIG.COMPANY_PHONE.replace(/\s/g, '')}`}>{CONFIG.COMPANY_PHONE}</a>
                </div>
              </div>
              
              <div className="contact-detail">
                <i className="fab fa-whatsapp"></i>
                <div>
                  <strong>WhatsApp</strong><br />
                  <a href={`https://wa.me/${CONFIG.COMPANY_PHONE.replace(/\s/g, '')}`}>{CONFIG.COMPANY_PHONE}</a>
                </div>
              </div>
              
              <div className="contact-detail">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <strong>Location</strong><br />
                  {CONFIG.COMPANY_ADDRESS}<br />
                  <em>By appointment only</em>
                </div>
              </div>
              
              <div className="contact-detail">
                <i className="fas fa-clock"></i>
                <div>
                  <strong>Business Hours</strong><br />
                  Monday - Friday: 8:00AM – 5:00PM<br />
                  Saturday: 9:00AM – 1:00PM<br />
                  Sunday: Closed
                </div>
              </div>

              {/* Social Media Links */}
              <div className="social-contact">
                <h4>Follow Us</h4>
                <div className="social-links">
                  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form Column */}
            <div className="contact-form">
              <h3>Send Us a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="fullname">Full Name *</label>
                  <input 
                    type="text" 
                    id="fullname" 
                    placeholder="Enter your full name" 
                    value={formData.fullname} 
                    onChange={handleChange} 
                    required 
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="your@email.com" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    placeholder="+254 XXX XXX XXX" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="serviceInterest">Service Interested In</label>
                  <select 
                    id="serviceInterest" 
                    value={formData.serviceInterest} 
                    onChange={handleChange} 
                    disabled={isSubmitting}
                  >
                    <option value="">Select a service</option>
                    <option>Business Start-Up Support</option>
                    <option>Tax & KRA Compliance</option>
                    <option>Payroll Services</option>
                    <option>Payments & Debt Tracking</option>
                    <option>Financial Reports</option>
                    <option>Business Advisory</option>
                    <option>KRA Compliance Plus</option>
                    <option>Other / General Inquiry</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea 
                    rows="5" 
                    id="message" 
                    placeholder="Tell us how we can help you..." 
                    value={formData.message} 
                    onChange={handleChange} 
                    required 
                    disabled={isSubmitting}
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="btn-gold" 
                  style={{ width: '100%', justifyContent: 'center' }} 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <><i className="fas fa-spinner fa-spin"></i> Sending...</>
                  ) : (
                    <><i className="fas fa-paper-plane"></i> Send Message</>
                  )}
                </button>
                
                {feedback.message && (
                  <div className={`form-feedback ${feedback.type}`}>
                    {feedback.message}
                  </div>
                )}
              </form>
              
              <div className="form-note">
                <p><i className="fas fa-lock"></i> Your information is secure and will not be shared with third parties.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.846281750498!2d36.804750!3d-1.264644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1791a3266197%3A0x1b8b9b9b9b9b9b9b!2sWestlands%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1699999999999!5m2!1sen!2ske" 
              width="100%" 
              height="300" 
              style={{ border: 0, borderRadius: '24px' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="M.K GATHU Location Map"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}