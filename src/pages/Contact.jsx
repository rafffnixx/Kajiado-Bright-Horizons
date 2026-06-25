// src/pages/Contact.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import CONFIG from '../config';
import { logContact, logVisit } from '../services/googleSheetsService';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [visitorFormData, setVisitorFormData] = useState({
    organizationName: '',
    isRegistered: '',
    registeredName: '',
    department: '',
    regNumber: '',
    teamLeaderName: '',
    teamLeaderId: '',
    teamLeaderContact: '',
    teamLeaderEmail: '',
    teamMembers: [{ name: '', id: '', position: '', contact: '', email: '' }],
    proposedDate: '',
    expectedPeople: '',
    arrivalTime: '',
    activities: ''
  });
  
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeForm, setActiveForm] = useState('contact');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleVisitorChange = (e) => {
    const { name, value } = e.target;
    setVisitorFormData({ ...visitorFormData, [name]: value });
  };

  const handleTeamMemberChange = (index, field, value) => {
    const updatedMembers = [...visitorFormData.teamMembers];
    updatedMembers[index][field] = value;
    setVisitorFormData({ ...visitorFormData, teamMembers: updatedMembers });
  };

  const addTeamMember = () => {
    setVisitorFormData({
      ...visitorFormData,
      teamMembers: [...visitorFormData.teamMembers, { name: '', id: '', position: '', contact: '', email: '' }]
    });
  };

  const removeTeamMember = (index) => {
    const updatedMembers = visitorFormData.teamMembers.filter((_, i) => i !== index);
    setVisitorFormData({ ...visitorFormData, teamMembers: updatedMembers });
  };

  const scrollToForm = (formType) => {
    setActiveForm(formType);
    setTimeout(() => {
      const formId = formType === 'contact' ? 'contact-form' : 'visit-form';
      const element = document.getElementById(formId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  const handleVisitorSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback({ message: '', type: '' });

    const { 
      organizationName, 
      isRegistered,
      teamLeaderName, 
      teamLeaderContact, 
      teamLeaderEmail, 
      proposedDate 
    } = visitorFormData;
    
    if (!isRegistered) {
      setFeedback({ 
        message: '❌ Please specify if the group is registered or not.', 
        type: 'error' 
      });
      setIsSubmitting(false);
      return;
    }
    
    if (!organizationName || !teamLeaderName || !teamLeaderContact || !teamLeaderEmail || !proposedDate) {
      setFeedback({ 
        message: '❌ Please fill in all required fields.', 
        type: 'error' 
      });
      setIsSubmitting(false);
      return;
    }
    
    if (!teamLeaderEmail.includes('@') || !teamLeaderEmail.includes('.')) {
      setFeedback({ 
        message: '❌ Please enter a valid email address for the team leader.', 
        type: 'error' 
      });
      setIsSubmitting(false);
      return;
    }
    
    try {
      await logVisit({
        organization: visitorFormData.organizationName,
        registered: visitorFormData.isRegistered,
        registeredName: visitorFormData.registeredName,
        department: visitorFormData.department,
        regNumber: visitorFormData.regNumber,
        teamLeader: visitorFormData.teamLeaderName,
        teamLeaderId: visitorFormData.teamLeaderId,
        phone: visitorFormData.teamLeaderContact,
        email: visitorFormData.teamLeaderEmail,
        visitDate: visitorFormData.proposedDate,
        people: visitorFormData.expectedPeople,
        activities: visitorFormData.activities,
        teamMembers: JSON.stringify(visitorFormData.teamMembers)
      });
      
      setFeedback({ 
        message: `✅ Thank you! Your visit request has been received. We'll contact you via email within 2-3 business days to confirm your visit.`, 
        type: 'success' 
      });
      
      setVisitorFormData({
        organizationName: '',
        isRegistered: '',
        registeredName: '',
        department: '',
        regNumber: '',
        teamLeaderName: '',
        teamLeaderId: '',
        teamLeaderContact: '',
        teamLeaderEmail: '',
        teamMembers: [{ name: '', id: '', position: '', contact: '', email: '' }],
        proposedDate: '',
        expectedPeople: '',
        arrivalTime: '',
        activities: ''
      });
    } catch (error) {
      console.error('Error submitting visit request:', error);
      setFeedback({ 
        message: '❌ There was an error submitting your request. Please try again or call us directly.', 
        type: 'error' 
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFeedback({ message: '', type: '' }), 6000);
    }
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
        message: '❌ Please enter a valid email address.', 
        type: 'error' 
      });
      setIsSubmitting(false);
      return;
    }
    
    try {
      const result = await logContact({
        fullName: formData.fullname,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message
      });
      
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
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setFeedback({ 
        message: '❌ There was an error sending your message. Please try again or call us directly.', 
        type: 'error' 
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFeedback({ message: '', type: '' }), 6000);
    }
  };

  return (
    <>
      <SEO 
        title="Contact Us"
        description="Get in touch with Kajiado Bright Horizons. Reach out for inquiries, sponsorships, donations, or to learn how you can help vulnerable children."
        path="/contact"
        keywords={['contact Kajiado Bright Horizons', 'childrens home Kenya', 'inquiries', 'support']}
      />
      
      <div className="contact-page">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="hero-bg-container">
            <div 
              className="hero-bg-image-about"
              style={{ backgroundImage: 'url("/images/hero/contact-hero.jpg")' }}
            ></div>
            <div className="hero-overlay-dark"></div>
          </div>
          <div className="container">
            <div className="hero-content-about">
              <h1>Contact <span>Us</span></h1>
              <p>We'd love to hear from you</p>
              <div className="hero-buttons">
                <button 
                  className="btn-gold" 
                  onClick={() => scrollToForm('contact')}
                >
                  <i className="fas fa-paper-plane"></i> Send Message
                </button>
                <button 
                  className="btn-outline"
                  onClick={() => scrollToForm('visitor')}
                >
                  <i className="fas fa-calendar-alt"></i> Schedule a Visit
                </button>
              </div>
            </div>
          </div>
        </section>

        {feedback.message && (
          <div className="container">
            <div className={`form-feedback ${feedback.type}`}>
              {feedback.message}
            </div>
          </div>
        )}

        {/* Form Toggle */}
        <section className="form-toggle-section">
          <div className="container">
            <div className="form-toggle-buttons">
              <button 
                className={`toggle-btn ${activeForm === 'contact' ? 'active' : ''}`}
                onClick={() => scrollToForm('contact')}
              >
                <i className="fas fa-envelope"></i> General Inquiry
              </button>
              <button 
                className={`toggle-btn ${activeForm === 'visitor' ? 'active' : ''}`}
                onClick={() => scrollToForm('visitor')}
              >
                <i className="fas fa-calendar-alt"></i> Schedule a Visit
              </button>
            </div>
          </div>
        </section>

        {/* Contact Main */}
        <section className="contact-main">
          <div className="container">
            <div className="contact-grid">
              {/* Forms */}
              <div className="contact-form-wrapper">
                {activeForm === 'contact' && (
                  <div id="contact-form" className="contact-form">
                    <div className="form-header">
                      <h3><i className="fas fa-paper-plane"></i> Send Us a Message</h3>
                      <p className="form-subtitle">We'll get back to you within 2-3 business days</p>
                    </div>
                    
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
                      
                      <div className="form-row">
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
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <><i className="fas fa-spinner fa-spin"></i> Sending...</>
                        ) : (
                          <><i className="fas fa-paper-plane"></i> Send Message</>
                        )}
                      </button>
                    </form>
                    
                    <div className="form-footer">
                      <p><i className="fas fa-lock"></i> Your information is secure and will not be shared.</p>
                      <p><i className="fas fa-clock"></i> We typically respond within 2-3 business days.</p>
                    </div>
                  </div>
                )}

                {activeForm === 'visitor' && (
                  <div id="visit-form" className="visitor-form">
                    <div className="form-header">
                      <h3><i className="fas fa-clipboard-list"></i> Schedule a Visit</h3>
                      <p className="form-subtitle">Please complete this form to book your visit</p>
                    </div>
                    
                    <form onSubmit={handleVisitorSubmit}>
                      {/* Organization Name */}
                      <div className="form-section">
                        <label className="section-label">Organization / Group Name *</label>
                        <input 
                          type="text" 
                          name="organizationName"
                          className="form-control"
                          placeholder="Enter organization or group name"
                          value={visitorFormData.organizationName}
                          onChange={handleVisitorChange}
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      {/* Registration Status */}
                      <div className="form-section">
                        <label className="section-label">Is the group registered? *</label>
                        <div className="radio-group">
                          <label className="radio-label">
                            <input 
                              type="radio" 
                              name="isRegistered" 
                              value="yes"
                              checked={visitorFormData.isRegistered === 'yes'}
                              onChange={handleVisitorChange}
                              disabled={isSubmitting}
                            />
                            Yes
                          </label>
                          <label className="radio-label">
                            <input 
                              type="radio" 
                              name="isRegistered" 
                              value="no"
                              checked={visitorFormData.isRegistered === 'no'}
                              onChange={handleVisitorChange}
                              disabled={isSubmitting}
                            />
                            No
                          </label>
                        </div>
                        
                        {visitorFormData.isRegistered === 'yes' && (
                          <div className="registered-details">
                            <p className="form-note-text">📋 Please provide registration details:</p>
                            <div className="form-row">
                              <div className="form-group">
                                <label>Registered Name</label>
                                <input 
                                  type="text" 
                                  name="registeredName"
                                  placeholder="Registered organization name"
                                  value={visitorFormData.registeredName}
                                  onChange={handleVisitorChange}
                                  disabled={isSubmitting}
                                />
                              </div>
                              <div className="form-group">
                                <label>Department</label>
                                <input 
                                  type="text" 
                                  name="department"
                                  placeholder="Department"
                                  value={visitorFormData.department}
                                  onChange={handleVisitorChange}
                                  disabled={isSubmitting}
                                />
                              </div>
                              <div className="form-group">
                                <label>Registration Number</label>
                                <input 
                                  type="text" 
                                  name="regNumber"
                                  placeholder="Registration number"
                                  value={visitorFormData.regNumber}
                                  onChange={handleVisitorChange}
                                  disabled={isSubmitting}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Team Leader */}
                      <div className="form-section">
                        <label className="section-label">Team Leader Details *</label>
                        <div className="form-row">
                          <div className="form-group">
                            <label>Full Name *</label>
                            <input 
                              type="text" 
                              name="teamLeaderName"
                              placeholder="Full name"
                              value={visitorFormData.teamLeaderName}
                              onChange={handleVisitorChange}
                              required
                              disabled={isSubmitting}
                            />
                          </div>
                          <div className="form-group">
                            <label>ID Number</label>
                            <input 
                              type="text" 
                              name="teamLeaderId"
                              placeholder="ID/Passport number"
                              value={visitorFormData.teamLeaderId}
                              onChange={handleVisitorChange}
                              disabled={isSubmitting}
                            />
                          </div>
                          <div className="form-group">
                            <label>Phone Number *</label>
                            <input 
                              type="tel" 
                              name="teamLeaderContact"
                              placeholder="Phone number"
                              value={visitorFormData.teamLeaderContact}
                              onChange={handleVisitorChange}
                              required
                              disabled={isSubmitting}
                            />
                          </div>
                          <div className="form-group">
                            <label>Email Address *</label>
                            <input 
                              type="email" 
                              name="teamLeaderEmail"
                              placeholder="Email address"
                              value={visitorFormData.teamLeaderEmail}
                              onChange={handleVisitorChange}
                              required
                              disabled={isSubmitting}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Team Members */}
                      <div className="form-section">
                        <label className="section-label">Other Team Members</label>
                        <p className="form-note-text">Add any other officials accompanying you (copies of IDs will be required)</p>
                        
                        <div className="team-members">
                          {visitorFormData.teamMembers.map((member, index) => (
                            <div key={index} className="team-member-row">
                              <div className="form-group">
                                <label>Name</label>
                                <input 
                                  type="text" 
                                  placeholder="Full name"
                                  value={member.name}
                                  onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                                  disabled={isSubmitting}
                                />
                              </div>
                              <div className="form-group">
                                <label>ID No.</label>
                                <input 
                                  type="text" 
                                  placeholder="ID number"
                                  value={member.id}
                                  onChange={(e) => handleTeamMemberChange(index, 'id', e.target.value)}
                                  disabled={isSubmitting}
                                />
                              </div>
                              <div className="form-group">
                                <label>Position</label>
                                <input 
                                  type="text" 
                                  placeholder="Position/Role"
                                  value={member.position}
                                  onChange={(e) => handleTeamMemberChange(index, 'position', e.target.value)}
                                  disabled={isSubmitting}
                                />
                              </div>
                              <div className="form-group">
                                <label>Contact</label>
                                <input 
                                  type="tel" 
                                  placeholder="Phone number"
                                  value={member.contact}
                                  onChange={(e) => handleTeamMemberChange(index, 'contact', e.target.value)}
                                  disabled={isSubmitting}
                                />
                              </div>
                              <div className="form-group">
                                <label>Email</label>
                                <input 
                                  type="email" 
                                  placeholder="Email address"
                                  value={member.email}
                                  onChange={(e) => handleTeamMemberChange(index, 'email', e.target.value)}
                                  disabled={isSubmitting}
                                />
                              </div>
                              {index > 0 && (
                                <button 
                                  type="button" 
                                  className="remove-member-btn"
                                  onClick={() => removeTeamMember(index)}
                                  disabled={isSubmitting}
                                >
                                  <i className="fas fa-times"></i>
                                </button>
                              )}
                            </div>
                          ))}
                          <button 
                            type="button" 
                            className="add-member-btn"
                            onClick={addTeamMember}
                            disabled={isSubmitting}
                          >
                            <i className="fas fa-plus"></i> Add Team Member
                          </button>
                        </div>
                      </div>

                      {/* Visit Details */}
                      <div className="form-section">
                        <div className="form-row">
                          <div className="form-group">
                            <label>Proposed Date *</label>
                            <input 
                              type="date" 
                              name="proposedDate"
                              className="form-control"
                              value={visitorFormData.proposedDate}
                              onChange={handleVisitorChange}
                              required
                              disabled={isSubmitting}
                            />
                            <p className="form-hint">📌 Preferable: Saturdays (children are out of school)</p>
                          </div>
                          <div className="form-group">
                            <label>Expected People</label>
                            <input 
                              type="number" 
                              name="expectedPeople"
                              className="form-control"
                              placeholder="Enter number"
                              value={visitorFormData.expectedPeople}
                              onChange={handleVisitorChange}
                              disabled={isSubmitting}
                            />
                          </div>
                          <div className="form-group">
                            <label>Arrival Time</label>
                            <input 
                              type="time" 
                              name="arrivalTime"
                              className="form-control"
                              value={visitorFormData.arrivalTime}
                              onChange={handleVisitorChange}
                              disabled={isSubmitting}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Activities */}
                      <div className="form-section">
                        <label className="section-label">Activities Planned</label>
                        <textarea 
                          name="activities"
                          rows="4"
                          className="form-control"
                          placeholder="List the activities you wish to engage in..."
                          value={visitorFormData.activities}
                          onChange={handleVisitorChange}
                          disabled={isSubmitting}
                        ></textarea>
                      </div>

                      {/* Important Notes */}
                      <div className="important-notes">
                        <h4><i className="fas fa-info-circle"></i> Important Information</h4>
                        <ul>
                          <li>📌 Preferable day of visit is <strong>Saturdays</strong> as children are out of school.</li>
                          <li>⏰ All activities should be completed by <strong>5:30pm</strong> for children's evening program.</li>
                          <li>🪪 Please bring copies of IDs for all team members.</li>
                        </ul>
                      </div>
                      
                      <button 
                        type="submit" 
                        className="btn-gold" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <><i className="fas fa-spinner fa-spin"></i> Submitting...</>
                        ) : (
                          <><i className="fas fa-calendar-check"></i> Submit Visit Request</>
                        )}
                      </button>
                    </form>
                  </div>
                )}
              </div>

              {/* Contact Info Sidebar - UPDATED & BALANCED */}
              <div className="contact-info">
                <div className="info-header">
                  <h3><i className="fas fa-phone-alt"></i> Get in Touch</h3>
                  <p>We're here to help</p>
                </div>
                
                <div className="info-items">
                  <div className="info-item">
                    <div className="info-icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className="info-text">
                      <span className="info-label">Address</span>
                      <span className="info-value">Kajiado Bright Horizons</span>
                      <span className="info-value">Kajiado Town, Kajiado County</span>
                      <span className="info-value">Kenya</span>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <i className="fas fa-phone"></i>
                    </div>
                    <div className="info-text">
                      <span className="info-label">Phone</span>
                      <a href="tel:+254720789839" className="info-value">+254 720 789839</a>
                      <a href="tel:+254720542409" className="info-value">+254 720 542409</a>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="info-text">
                      <span className="info-label">Email</span>
                      <a href="mailto:kajiadochildrenshom@gmail.com" className="info-value">kajiadochildrenshom@gmail.com</a>
                    </div>
                  </div>

                  <div className="info-item info-hours">
                    <div className="info-icon">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div className="info-text">
                      <span className="info-label">Visiting Hours</span>
                      <span className="info-value">Mon - Fri: 9:00 AM - 5:00 PM</span>
                      <span className="info-value highlight">Saturday: 10:00 AM - 5:30 PM</span>
                      <span className="info-value">Sunday: Closed</span>
                    </div>
                  </div>
                </div>

                <div className="info-note">
                  <i className="fas fa-info-circle"></i>
                  <p>Visits by appointment only. Please use the <strong>Schedule a Visit</strong> form to book your visit.</p>
                </div>

                <div className="info-social">
                  <h4>Follow Us</h4>
                  <div className="social-links">
                    <a href={CONFIG.SOCIAL?.FACEBOOK || '#'} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href={CONFIG.SOCIAL?.TWITTER || '#'} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href={CONFIG.SOCIAL?.INSTAGRAM || '#'} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href={CONFIG.SOCIAL?.WHATSAPP || '#'} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
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
            <div className="section-header">
              <h2 className="section-title">Find <span>Us</span></h2>
              <p className="section-subtitle">Visit us in Kajiado Town</p>
            </div>
            <div className="map-container">
              <iframe
                title="Kajiado Bright Horizons Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.891262029455!2d36.7824536!3d-1.8527392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182fdb89943c88f1%3A0xa58885f88ab92086!2sKajiado%20Children&#39;s%20Home!5e0!3m2!1sen!2ske!4v1742123456789!5m2!1sen!2ske"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: '24px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p className="map-caption">
              <i className="fas fa-map-pin"></i> 
              <a 
                href="https://www.google.com/maps/place/Kajiado+Children's+Home/@-1.8527338,36.7824536,17z" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <strong>Open in Google Maps</strong> <i className="fas fa-external-link-alt"></i>
              </a>
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="contact-faq">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Frequently Asked <span>Questions</span></h2>
            </div>
            <div className="faqs-grid">
              <div className="faq-item">
                <div className="faq-icon"><i className="fas fa-child"></i></div>
                <div className="faq-content">
                  <h3>How can I sponsor a child?</h3>
                  <p>Visit our <Link to="/children">Children's page</Link> or contact us directly. Sponsorship covers food, education, medical care, and shelter.</p>
                </div>
              </div>
              <div className="faq-item">
                <div className="faq-icon"><i className="fas fa-gift"></i></div>
                <div className="faq-content">
                  <h3>Can I donate items instead of money?</h3>
                  <p>Yes! We welcome donations of food, clothing, school supplies, and toys. Contact us to arrange drop-off or pickup.</p>
                </div>
              </div>
              <div className="faq-item">
                <div className="faq-icon"><i className="fas fa-users"></i></div>
                <div className="faq-content">
                  <h3>Can I volunteer at the home?</h3>
                  <p>Yes, we welcome volunteers. Fill out the <strong>Schedule a Visit</strong> form and specify your interest in volunteering.</p>
                </div>
              </div>
              <div className="faq-item">
                <div className="faq-icon"><i className="fas fa-calendar-alt"></i></div>
                <div className="faq-content">
                  <h3>When is the best day to visit?</h3>
                  <p><strong>Saturdays</strong> are best as children are out of school and have more time to interact with visitors.</p>
                </div>
              </div>
              <div className="faq-item">
                <div className="faq-icon"><i className="fas fa-clock"></i></div>
                <div className="faq-content">
                  <h3>What time should visits end?</h3>
                  <p>All activities should be completed by <strong>5:30pm</strong> to allow children to prepare for their evening program.</p>
                </div>
              </div>
              <div className="faq-item">
                <div className="faq-icon"><i className="fas fa-id-card"></i></div>
                <div className="faq-content">
                  <h3>Do I need to provide identification?</h3>
                  <p>Yes, copies of IDs for team leaders and officials are required for visit approval and security purposes.</p>
                </div>
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
                <Link to="/children" className="btn-outline-light">
                  <i className="fas fa-child"></i> Sponsor a Child
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .contact-page {
          background: #f0f4f8;
          min-height: 100vh;
        }

        /* Hero */
        .about-hero {
          background: linear-gradient(135deg, #1a365d 0%, #2b6cb0 50%, #2563eb 100%) !important;
          padding: 120px 0 80px !important;
          min-height: 400px;
          display: flex;
          align-items: center;
        }

        .hero-content-about {
          text-align: center;
        }

        .hero-content-about h1 {
          color: #ffffff !important;
          font-size: 3.2rem;
          font-weight: 700;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          margin-bottom: 16px;
        }

        .hero-content-about h1 span {
          color: #f6e05e !important;
        }

        .hero-content-about p {
          color: #e2e8f0 !important;
          font-size: 1.3rem;
        }

        .hero-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 32px;
        }

        /* Buttons */
        .btn-gold {
          background: linear-gradient(105deg, #2563eb, #1d4ed8);
          border: none;
          padding: 14px 36px;
          font-weight: 700;
          border-radius: 50px;
          color: #ffffff !important;
          font-family: 'Poppins', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.35);
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .btn-gold:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(37, 99, 235, 0.45);
        }

        .btn-gold:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .btn-outline {
          background: transparent;
          border: 2px solid #ffffff;
          padding: 12px 32px;
          border-radius: 50px;
          color: #ffffff;
          font-weight: 600;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .btn-outline:hover {
          background: #ffffff;
          color: #2563eb !important;
          transform: translateY(-2px);
        }

        .btn-outline-light {
          background: transparent;
          border: 2px solid #ffffff;
          padding: 12px 32px;
          border-radius: 50px;
          color: #ffffff;
          font-weight: 600;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .btn-outline-light:hover {
          background: #ffffff;
          color: #2563eb !important;
          transform: translateY(-2px);
        }

        /* Form Toggle */
        .form-toggle-section {
          padding: 40px 0 20px;
        }

        .form-toggle-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .toggle-btn {
          padding: 14px 36px;
          background: #ffffff;
          border: 2px solid #e2e8f0;
          border-radius: 50px;
          color: #2d3748;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1rem;
        }

        .toggle-btn:hover {
          border-color: #2563eb;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
        }

        .toggle-btn.active {
          background: #2563eb;
          border-color: #2563eb;
          color: #ffffff;
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
        }

        .toggle-btn i {
          color: inherit;
        }

        /* Contact Main */
        .contact-main {
          padding: 40px 0 60px;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 40px;
          align-items: start;
        }

        /* Forms */
        .contact-form-wrapper {
          background: #ffffff;
          border-radius: 24px;
          padding: 40px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
        }

        .form-header {
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e2e8f0;
        }

        .form-header h3 {
          font-size: 1.6rem;
          color: #1a202c;
          margin-bottom: 8px;
        }

        .form-header h3 i {
          color: #2563eb;
        }

        .form-subtitle {
          color: #718096;
          font-size: 0.95rem;
        }

        .contact-form,
        .visitor-form {
          width: 100%;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 6px;
          font-weight: 500;
          color: #2d3748;
          font-size: 0.9rem;
        }

        .form-group input,
        .form-group textarea,
        .form-control {
          width: 100%;
          padding: 12px 16px;
          background: #f7fafc;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          color: #1a202c;
          font-size: 1rem;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-control:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
          outline: none;
          background: #ffffff;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 100px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form-footer {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid #e2e8f0;
        }

        .form-footer p {
          color: #718096;
          font-size: 0.85rem;
          margin: 6px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .form-footer i {
          color: #2563eb;
        }

        /* Visitor Form Specific */
        .form-section {
          margin-bottom: 28px;
          padding-bottom: 24px;
          border-bottom: 1px solid #e2e8f0;
        }

        .form-section:last-of-type {
          border-bottom: none;
        }

        .section-label {
          font-weight: 700;
          color: #1a202c;
          display: block;
          margin-bottom: 12px;
          font-size: 1rem;
        }

        .radio-group {
          display: flex;
          gap: 32px;
          margin-top: 8px;
        }

        .radio-label {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          color: #2d3748;
          font-weight: 500;
        }

        .radio-label input {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #2563eb;
        }

        .registered-details {
          margin-top: 16px;
          padding: 20px;
          background: #f0f4f8;
          border-radius: 12px;
          border-left: 4px solid #2563eb;
        }

        .registered-details .form-row {
          margin-top: 12px;
        }

        .form-note-text {
          font-size: 0.9rem;
          color: #718096;
          margin-bottom: 8px;
        }

        .form-hint {
          font-size: 0.85rem;
          color: #2563eb;
          margin-top: 6px;
        }

        .team-members {
          margin-top: 12px;
        }

        .team-member-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr auto;
          gap: 12px;
          margin-bottom: 16px;
          padding: 16px;
          background: #f7fafc;
          border-radius: 12px;
          align-items: center;
        }

        .team-member-row .form-group {
          margin-bottom: 0;
        }

        .remove-member-btn {
          background: rgba(244, 67, 54, 0.1);
          border: 1px solid rgba(244, 67, 54, 0.3);
          color: #f44336;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .remove-member-btn:hover {
          background: #f44336;
          color: #ffffff;
        }

        .add-member-btn {
          background: transparent;
          border: 2px dashed #2563eb;
          padding: 10px 24px;
          border-radius: 8px;
          color: #2563eb;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .add-member-btn:hover {
          background: rgba(37, 99, 235, 0.05);
          border-style: solid;
        }

        .important-notes {
          background: #f0f4f8;
          padding: 24px;
          border-radius: 16px;
          margin: 24px 0;
          border-left: 4px solid #2563eb;
        }

        .important-notes h4 {
          color: #1a202c;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .important-notes h4 i {
          color: #2563eb;
        }

        .important-notes ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .important-notes ul li {
          padding: 8px 0;
          color: #4a5568;
          border-bottom: 1px solid #e2e8f0;
        }

        .important-notes ul li:last-child {
          border-bottom: none;
        }

        /* Form Feedback */
        .form-feedback {
          padding: 16px 24px;
          border-radius: 12px;
          font-weight: 500;
          margin: 20px auto;
          max-width: 800px;
        }

        .form-feedback.success {
          background: #e8f5e9;
          color: #2e7d32;
          border: 1px solid #4caf50;
        }

        .form-feedback.error {
          background: #ffebee;
          color: #c62828;
          border: 1px solid #f44336;
        }

        /* ============================================
           CONTACT INFO SIDEBAR - BALANCED
           ============================================ */
        .contact-info {
          background: #ffffff;
          padding: 32px 28px;
          border-radius: 24px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
          position: sticky;
          top: 100px;
        }

        .info-header {
          text-align: center;
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e2e8f0;
        }

        .info-header h3 {
          font-size: 1.3rem;
          color: #1a202c;
          margin-bottom: 4px;
        }

        .info-header h3 i {
          color: #2563eb;
          margin-right: 8px;
        }

        .info-header p {
          color: #718096;
          font-size: 0.95rem;
        }

        .info-items {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 20px;
        }

        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 12px 16px;
          background: #f7fafc;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .info-item:hover {
          background: #edf2f7;
          transform: translateX(4px);
        }

        .info-icon {
          width: 40px;
          height: 40px;
          min-width: 40px;
          background: rgba(37, 99, 235, 0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 2px;
        }

        .info-icon i {
          color: #2563eb;
          font-size: 1.1rem;
        }

        .info-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }

        .info-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: #2563eb;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .info-value {
          color: #2d3748;
          font-size: 0.92rem;
          line-height: 1.4;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .info-value a {
          color: #2d3748;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .info-value a:hover {
          color: #2563eb;
        }

        .info-value.highlight {
          color: #2563eb;
          font-weight: 600;
        }

        .info-hours .info-value {
          padding: 1px 0;
        }

        .info-note {
          background: #ebf8ff;
          padding: 14px 16px;
          border-radius: 12px;
          margin: 16px 0 20px;
          display: flex;
          gap: 10px;
          align-items: flex-start;
          border-left: 3px solid #2563eb;
        }

        .info-note i {
          color: #2563eb;
          font-size: 1.1rem;
          margin-top: 2px;
        }

        .info-note p {
          color: #2d3748;
          font-size: 0.85rem;
          margin: 0;
          line-height: 1.5;
        }

        .info-note p strong {
          color: #2563eb;
        }

        .info-social {
          padding-top: 16px;
          border-top: 1px solid #e2e8f0;
          text-align: center;
        }

        .info-social h4 {
          color: #1a202c;
          font-size: 0.9rem;
          margin-bottom: 12px;
          font-weight: 600;
        }

        .social-links {
          display: flex;
          gap: 10px;
          justify-content: center;
        }

        .social-links a {
          width: 40px;
          height: 40px;
          background: #f7fafc;
          border: 1px solid #e2e8f0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4a5568;
          transition: all 0.3s ease;
          text-decoration: none;
          font-size: 0.95rem;
        }

        .social-links a:hover {
          background: #2563eb;
          border-color: #2563eb;
          color: #ffffff;
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }

        /* Map Section */
        .map-section {
          padding: 60px 0 80px;
        }

        .section-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .section-title {
          font-size: 2.4rem;
          color: #1a202c;
          font-weight: 700;
        }

        .section-title span {
          color: #2563eb;
        }

        .section-subtitle {
          color: #718096;
          font-size: 1.1rem;
          margin-top: 8px;
        }

        .map-container {
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .map-container iframe {
          display: block;
          width: 100%;
        }

        .map-caption {
          text-align: center;
          margin-top: 16px;
          color: #4a5568;
        }

        .map-caption a {
          color: #2563eb;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .map-caption a:hover {
          color: #1d4ed8;
          text-decoration: underline;
        }

        /* FAQ Section */
        .contact-faq {
          padding: 60px 0 80px;
          background: #ffffff;
        }

        .faqs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .faq-item {
          display: flex;
          gap: 16px;
          padding: 20px;
          background: #f7fafc;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
        }

        .faq-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
        }

        .faq-icon {
          width: 44px;
          height: 44px;
          background: rgba(37, 99, 235, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .faq-icon i {
          color: #2563eb;
          font-size: 1.2rem;
        }

        .faq-content h3 {
          color: #1a202c;
          font-size: 1rem;
          margin-bottom: 4px;
        }

        .faq-content p {
          color: #4a5568;
          font-size: 0.9rem;
          margin: 0;
          line-height: 1.6;
        }

        .faq-content p a {
          color: #2563eb;
          text-decoration: none;
          font-weight: 500;
        }

        .faq-content p a:hover {
          text-decoration: underline;
        }

        /* CTA Section */
        .cta-section {
          padding: 80px 0;
          background: linear-gradient(135deg, #1a365d, #2563eb) !important;
        }

        .cta-content {
          text-align: center;
        }

        .cta-content h2 {
          color: #ffffff !important;
          font-size: 2.4rem;
          font-weight: 700;
        }

        .cta-content p {
          color: #e2e8f0 !important;
          font-size: 1.2rem;
          margin-top: 8px;
        }

        .cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 24px;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }

          .contact-info {
            position: static;
          }

          .faqs-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .about-hero {
            padding: 100px 0 60px !important;
          }

          .hero-content-about h1 {
            font-size: 2.2rem;
          }

          .hero-content-about p {
            font-size: 1.1rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .team-member-row {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .team-member-row .form-group {
            margin-bottom: 12px;
          }

          .contact-form-wrapper {
            padding: 24px;
          }

          .contact-info {
            padding: 24px 20px;
          }

          .faqs-grid {
            grid-template-columns: 1fr;
          }

          .form-toggle-buttons {
            flex-direction: column;
            align-items: center;
          }

          .toggle-btn {
            width: 100%;
            justify-content: center;
          }

          .radio-group {
            flex-direction: column;
            gap: 12px;
          }

          .section-title {
            font-size: 1.8rem;
          }

          .cta-content h2 {
            font-size: 1.8rem;
          }

          .form-header h3 {
            font-size: 1.3rem;
          }

          .info-item {
            padding: 10px 14px;
          }
        }

        @media (max-width: 480px) {
          .contact-form-wrapper {
            padding: 16px;
          }

          .contact-info {
            padding: 16px;
          }

          .btn-gold,
          .btn-outline,
          .btn-outline-light {
            width: 100%;
            justify-content: center;
          }

          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .map-container iframe {
            height: 250px;
          }

          .info-items {
            gap: 10px;
          }
        }
      `}</style>
    </>
  );
}