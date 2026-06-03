import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import CONFIG from '../config';
import { submitContact } from '../services/googleSheetsService';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    subject: '',
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
    
    const result = await submitContact(formData);
    
    if (result.success) {
      setFeedback({ 
        message: `✅ Thank you ${fullname}! Your message has been sent successfully. We'll reply within 2-3 business days.`, 
        type: 'success' 
      });
      
      setFormData({
        fullname: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
    } else {
      setFeedback({ 
        message: `❌ There was an error sending your message. Please call us directly or email ${CONFIG.ORG_EMAIL}`, 
        type: 'error' 
      });
    }
    
    setIsSubmitting(false);
    setTimeout(() => setFeedback({ message: '', type: '' }), 6000);
  };

  return (
    <>
      <SEO 
        title="Contact Us - Kajiado Children's Home"
        description="Get in touch with Kajiado Children's Home. Reach out for inquiries, sponsorships, donations, or to learn how you can help vulnerable children in Kajiado, Kenya."
        path="/contact"
      />
      
      <div className="contact-page">
        {/* Hero Section with Background Image */}
        <section className="about-hero">
          <div className="hero-bg-container">
            <div 
              className="hero-bg-image-about"
              style={{ backgroundImage: 'url("/images/hero/get-involved-hero.jpg")' }}
            ></div>
            <div className="hero-overlay-dark"></div>
          </div>
          <div className="container">
            <div className="hero-content-about">
              <h1>Contact <span>Us</span></h1>
              <p>We'd love to hear from you</p>
            </div>
          </div>
        </section>

        <section className="contact-main">
          <div className="container">
            <div className="contact-grid">
              {/* Contact Form Column */}
              <div className="contact-form">
                <h3><i className="fas fa-paper-plane"></i> Send Us a Message</h3>
                
                {feedback.message && (
                  <div className={`form-feedback ${feedback.type}`}>
                    {feedback.message}
                  </div>
                )}
                
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
                    <label htmlFor="subject">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      placeholder="What is this regarding?" 
                      value={formData.subject} 
                      onChange={handleChange} 
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea 
                      rows="5" 
                      id="message" 
                      placeholder="Tell us how we can help..." 
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
                </form>
                
                <div className="form-note">
                  <p><i className="fas fa-lock"></i> Your information is secure and will not be shared.</p>
                  <p><i className="fas fa-clock"></i> We typically respond within 2-3 business days.</p>
                </div>
              </div>

              {/* Contact Information Column */}
              <div className="contact-info">
                <h3><i className="fas fa-phone-alt"></i> Get in Touch</h3>
                
                <div className="contact-detail">
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <strong>Address</strong><br />
                    Kajiado Children's Home<br />
                    Kajiado Town, Kajiado County<br />
                    Kenya
                  </div>
                </div>
                
                <div className="contact-detail">
                  <i className="fas fa-phone"></i>
                  <div>
                    <strong>Phone</strong><br />
                    <a href="tel:+254700123456">+254 700 123 456</a><br />
                    <a href="tel:+254722123456">+254 722 123 456</a>
                  </div>
                </div>
                
                <div className="contact-detail">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <strong>Email</strong><br />
                    <a href="mailto:info@kajiadochildrenhome.org">info@kajiadochildrenhome.org</a><br />
                    <a href="mailto:sponsorship@kajiadochildrenhome.org">sponsorship@kajiadochildrenhome.org</a>
                  </div>
                </div>
                
                <div className="contact-detail">
                  <i className="fas fa-clock"></i>
                  <div>
                    <strong>Visiting Hours</strong><br />
                    Monday - Friday: 9:00 AM - 5:00 PM<br />
                    Saturday: 10:00 AM - 2:00 PM<br />
                    Sunday: Closed (By appointment)
                  </div>
                </div>

                <div className="office-hours-note">
                  <i className="fas fa-info-circle"></i>
                  <p>Visits by appointment only. Please call ahead to schedule.</p>
                </div>

                {/* Social Media Links */}
                <div className="social-contact">
                  <h4>Follow Us</h4>
                  <div className="social-links">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://wa.me/254700123456" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                      <i className="fab fa-whatsapp"></i>
                    </a>
                  </div>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255282.35870276116!2d36.70730895!3d-2.5156245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f2e4e0d5d5d5d%3A0x5d5d5d5d5d5d5d5d!2sKajiado!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: '24px' }}
                allowFullScreen=""
                loading="lazy"
                title="Kajiado Children's Home Location"
              ></iframe>
            </div>
            <p className="map-caption">Kajiado Town, Kajiado County, Kenya</p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="contact-faq">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Frequently <span>Asked Questions</span></h2>
            </div>
            <div className="faqs-grid">
              <div className="faq-item">
                <h3><i className="fas fa-question-circle"></i> How can I sponsor a child?</h3>
                <p>You can sponsor a child by visiting our <Link to="/children">Children's page</Link> or contacting us directly. Sponsorship is KES 2,500 per month.</p>
              </div>
              <div className="faq-item">
                <h3><i className="fas fa-gift"></i> Can I donate items instead of money?</h3>
                <p>Yes! We welcome donations of food, clothing, school supplies, and toys. Please contact us to arrange drop-off.</p>
              </div>
              <div className="faq-item">
                <h3><i className="fas fa-users"></i> Can I volunteer at the home?</h3>
                <p>Yes, we welcome volunteers. Please fill out our <Link to="/volunteer">volunteer form</Link> or contact us for more information.</p>
              </div>
              <div className="faq-item">
                <h3><i className="fas fa-building"></i> Can I visit the home?</h3>
                <p>Visits are welcome by appointment only. Please call ahead to schedule a visit and meet our children.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Make a Difference?</h2>
              <p>Your support transforms young lives</p>
              <div className="cta-buttons">
                <Link to="/donate" className="btn-gold">
                  <i className="fas fa-hand-holding-heart"></i> Donate Now
                </Link>
                <Link to="/children" className="btn-outline">
                  <i className="fas fa-child"></i> Sponsor a Child
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}