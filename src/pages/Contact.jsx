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
  
  // Visitor Data Capture Form state
  const [visitorFormData, setVisitorFormData] = useState({
    organizationName: '',
    isRegistered: '',
    registeredName: '',
    department: '',
    regNumber: '',
    teamLeaderName: '',
    teamLeaderId: '',
    teamLeaderContact: '',
    teamMembers: [{ name: '', id: '', position: '', contact: '' }],
    proposedDate: '',
    expectedPeople: '',
    arrivalTime: '',
    activities: ''
  });
  
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeForm, setActiveForm] = useState('contact'); // 'contact' or 'visitor'

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
      teamMembers: [...visitorFormData.teamMembers, { name: '', id: '', position: '', contact: '' }]
    });
  };

  const removeTeamMember = (index) => {
    const updatedMembers = visitorFormData.teamMembers.filter((_, i) => i !== index);
    setVisitorFormData({ ...visitorFormData, teamMembers: updatedMembers });
  };

  const handleVisitorSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback({ message: '', type: '' });

    const { organizationName, teamLeaderName, teamLeaderContact, proposedDate } = visitorFormData;
    
    if (!organizationName || !teamLeaderName || !teamLeaderContact || !proposedDate) {
      setFeedback({ 
        message: '❌ Please fill in all required fields: Organization Name, Team Leader Name, Contact, and Proposed Date.', 
        type: 'error' 
      });
      setIsSubmitting(false);
      return;
    }
    
    // Prepare data for submission
    const visitorData = {
      ...visitorFormData,
      submittedAt: new Date().toISOString(),
      teamMembers: JSON.stringify(visitorFormData.teamMembers)
    };
    
    // Here you would submit to Google Sheets or email
    console.log('Visitor Form Data:', visitorData);
    
    // For now, show success message
    setFeedback({ 
      message: `✅ Thank you! Your visit request has been received. We'll contact you within 2-3 business days to confirm your visit.`, 
      type: 'success' 
    });
    
    // Reset form
    setVisitorFormData({
      organizationName: '',
      isRegistered: '',
      registeredName: '',
      department: '',
      regNumber: '',
      teamLeaderName: '',
      teamLeaderId: '',
      teamLeaderContact: '',
      teamMembers: [{ name: '', id: '', position: '', contact: '' }],
      proposedDate: '',
      expectedPeople: '',
      arrivalTime: '',
      activities: ''
    });
    
    setIsSubmitting(false);
    setTimeout(() => setFeedback({ message: '', type: '' }), 6000);
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
        message: `❌ There was an error sending your message. Please call us directly or email kajiadochildrenshom@gmail.com`, 
        type: 'error' 
      });
    }
    
    setIsSubmitting(false);
    setTimeout(() => setFeedback({ message: '', type: '' }), 6000);
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
              <p>Making a Difference One Child at a Time</p>
            </div>
          </div>
        </section>

        {/* Form Toggle Buttons */}
        <section className="form-toggle-section">
          <div className="container">
            <div className="form-toggle-buttons">
              <button 
                className={`form-toggle-btn ${activeForm === 'contact' ? 'active' : ''}`}
                onClick={() => setActiveForm('contact')}
              >
                <i className="fas fa-envelope"></i> General Inquiry
              </button>
              <button 
                className={`form-toggle-btn ${activeForm === 'visitor' ? 'active' : ''}`}
                onClick={() => setActiveForm('visitor')}
              >
                <i className="fas fa-calendar-alt"></i> Schedule a Visit
              </button>
            </div>
          </div>
        </section>

        <section className="contact-main">
          <div className="container">
            <div className="contact-grid">
              {/* Contact Form Column */}
              {activeForm === 'contact' && (
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
              )}

              {/* Visitor Data Capture Form */}
              {activeForm === 'visitor' && (
                <div className="visitor-form">
                  <div className="visitor-header">
                    <h3><i className="fas fa-clipboard-list"></i> DATA CAPTURE FORM FOR VISITORS</h3>
                    <p className="visitor-subtitle">Please complete this form to schedule your visit</p>
                  </div>
                  
                  {feedback.message && (
                    <div className={`form-feedback ${feedback.type}`}>
                      {feedback.message}
                    </div>
                  )}
                  
                  <form onSubmit={handleVisitorSubmit}>
                    {/* Section A: Organization Name */}
                    <div className="form-section">
                      <label className="section-label">A. Name of the Individual / Group / Organization / Institution *</label>
                      <input 
                        type="text" 
                        name="organizationName"
                        className="form-control"
                        placeholder="Enter organization name"
                        value={visitorFormData.organizationName}
                        onChange={handleVisitorChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Section B: Registration Status */}
                    <div className="form-section">
                      <label className="section-label">B. Is the group in (A) above registered?</label>
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
                          <p className="form-note-text">If registered please provide details:</p>
                          <div className="form-row">
                            <div className="form-group">
                              <label>Registered Name:</label>
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
                              <label>Department:</label>
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
                              <label>Reg No.:</label>
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

                    {/* Section C: Team Leader */}
                    <div className="form-section">
                      <label className="section-label">C. Who is the team Leader? *</label>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Name *</label>
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
                          <label>ID No.</label>
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
                          <label>Contact *</label>
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
                      </div>
                      
                      <p className="form-note-text mt-2">Other officials if any (copies of IDs will be required):</p>
                      
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
                            {index > 0 && (
                              <button 
                                type="button" 
                                className="remove-member-btn"
                                onClick={() => removeTeamMember(index)}
                                disabled={isSubmitting}
                              >
                                <i className="fas fa-trash"></i>
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
                          <i className="fas fa-plus"></i> Add Official
                        </button>
                      </div>
                    </div>

                    {/* Section D: Proposed Date */}
                    <div className="form-section">
                      <label className="section-label">D. Proposed date of visit *</label>
                      <input 
                        type="date" 
                        name="proposedDate"
                        className="form-control"
                        value={visitorFormData.proposedDate}
                        onChange={handleVisitorChange}
                        required
                        disabled={isSubmitting}
                      />
                      <p className="form-hint mt-1">📌 Preferable day of visit is on Saturdays as children are out of school.</p>
                    </div>

                    {/* Section E: Number of People */}
                    <div className="form-section">
                      <label className="section-label">E. Number of people expected</label>
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

                    {/* Section F: Arrival Time */}
                    <div className="form-section">
                      <label className="section-label">F. Arrival Time</label>
                      <input 
                        type="time" 
                        name="arrivalTime"
                        className="form-control"
                        value={visitorFormData.arrivalTime}
                        onChange={handleVisitorChange}
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Section G: Activities */}
                    <div className="form-section">
                      <label className="section-label">G. Activities the team wishes to engage in</label>
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
                      <h4><i className="fas fa-info-circle"></i> Please NOTE the following:</h4>
                      <ol>
                        <li>Preferable day of visit is on <strong>Saturdays</strong> as children are out of school.</li>
                        <li>We would really appreciate if all the activities listed above can be completed by <strong>5:30pm</strong> so that children can be allowed to prepare for the evening program.</li>
                      </ol>
                      <p className="blessing-note">
                        We really appreciate your interest in becoming a blessing to these little angels, and we look forward to 
                        having a wonderful time together!
                      </p>
                      <p className="verse">
                        <em>"Religion that God our Father accepts as pure and faultless is to look after the orphans and widows in their distress…"</em><br />
                        <strong>James 1:27</strong>
                      </p>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="btn-gold" 
                      style={{ width: '100%', justifyContent: 'center' }} 
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

              {/* Contact Information Column */}
              <div className="contact-info">
                <h3><i className="fas fa-phone-alt"></i> Get in Touch</h3>
                
                <div className="contact-detail">
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <strong>Address</strong><br />
                    Kajiado Bright Horizons<br />
                    Kajiado Town, Kajiado County<br />
                    Kenya
                  </div>
                </div>
                
                <div className="contact-detail">
                  <i className="fas fa-phone"></i>
                  <div>
                    <strong>Phone</strong><br />
                    <a href="tel:+254720789839">+254 720 789839</a><br />
                    <a href="tel:+254720542409">+254 720 542409</a>
                  </div>
                </div>
                
                <div className="contact-detail">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <strong>Email</strong><br />
                    <a href="mailto:kajiadochildrenshom@gmail.com">kajiadochildrenshom@gmail.com</a>
                  </div>
                </div>
                
                <div className="contact-detail">
                  <i className="fas fa-clock"></i>
                  <div>
                    <strong>Visiting Hours</strong><br />
                    Monday - Friday: 9:00 AM - 5:00 PM<br />
                    <strong className="highlight-saturday">Saturday: 10:00 AM - 5:30 PM (Recommended)</strong><br />
                    Sunday: Closed (By appointment)
                  </div>
                </div>

                <div className="office-hours-note">
                  <i className="fas fa-info-circle"></i>
                  <p>Visits by appointment only. Please complete the <strong>Schedule a Visit</strong> form to book your visit, preferably on a Saturday.</p>
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
                    <a href="https://wa.me/254720789839" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                      <i className="fab fa-whatsapp"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        {/* Map Section */}
        <section className="map-section">
          <div className="container">
            <div className="map-container">
              <iframe
                title="Kajiado Bright Horizons Exact Location"
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
              <i className="fas fa-map-pin"></i> <strong>Kajiado Bright Horizons</strong><br />
              Coordinates: -1.8527392, 36.7850285<br />
              <a 
                href="https://www.google.com/maps/place/Kajiado+Children's+Home/@-1.8527338,36.7824536,17z" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{color: 'var(--primary-color)', textDecoration: 'underline'}}
              >
                <i className="fas fa-external-link-alt"></i> Open in Google Maps for Navigation
              </a>
            </p>
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
                <p>You can sponsor a child by visiting our <Link to="/children">Children's page</Link> or contacting us directly. Sponsorship helps cover food, education, medical care, and shelter.</p>
              </div>
              <div className="faq-item">
                <h3><i className="fas fa-gift"></i> Can I donate items instead of money?</h3>
                <p>Yes! We welcome donations of food, clothing, school supplies, and toys. Please contact us to arrange drop-off.</p>
              </div>
              <div className="faq-item">
                <h3><i className="fas fa-users"></i> Can I volunteer at the home?</h3>
                <p>Yes, we welcome volunteers. Please fill out the <strong>Schedule a Visit</strong> form and specify your interest in volunteering.</p>
              </div>
              <div className="faq-item">
                <h3><i className="fas fa-building"></i> When is the best day to visit?</h3>
                <p><strong>Saturdays</strong> are the best days to visit as the children are out of school and have more time to interact with visitors.</p>
              </div>
              <div className="faq-item">
                <h3><i className="fas fa-clock"></i> What time should visits end?</h3>
                <p>We kindly request that all activities be completed by <strong>5:30pm</strong> to allow children to prepare for their evening program.</p>
              </div>
              <div className="faq-item">
                <h3><i className="fas fa-id-card"></i> Do I need to provide identification?</h3>
                <p>Yes, for security purposes, copies of IDs for team leaders and officials will be required for visit approval.</p>
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

      <style>{`
        .form-toggle-section {
          padding: 40px 0 20px;
          background: var(--bg-deep);
        }
        
        .form-toggle-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .form-toggle-btn {
          padding: 14px 32px;
          background: var(--card-bg);
          border: 2px solid var(--border-color);
          border-radius: 48px;
          color: var(--text-color);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .form-toggle-btn i {
          color: var(--primary-color);
        }
        
        .form-toggle-btn:hover {
          border-color: var(--primary-color);
          transform: translateY(-2px);
        }
        
        .form-toggle-btn.active {
          background: var(--primary-color);
          border-color: var(--primary-color);
          color: #fff;
        }
        
        .form-toggle-btn.active i {
          color: #fff;
        }
        
        /* Visitor Form Styles */
        .visitor-form {
          background: var(--card-bg);
          padding: 40px;
          border-radius: 24px;
          border: 1px solid var(--border-color);
        }
        
        .visitor-header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid var(--primary-color);
        }
        
        .visitor-header h3 {
          font-size: 1.5rem;
          color: var(--primary-color);
          margin-bottom: 8px;
        }
        
        .visitor-subtitle {
          color: var(--text-muted);
          font-size: 0.9rem;
        }
        
        .form-section {
          margin-bottom: 28px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-color);
        }
        
        .section-label {
          font-weight: 700;
          color: var(--text-color);
          display: block;
          margin-bottom: 12px;
          font-size: 1rem;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 6px;
          font-weight: 500;
          color: var(--text-muted);
          font-size: 0.85rem;
        }
        
        .form-group input,
        .form-group textarea,
        .form-control {
          width: 100%;
          padding: 12px 16px;
          background: var(--input-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          color: var(--text-color);
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }
        
        .form-group input:focus,
        .form-group textarea:focus,
        .form-control:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .radio-group {
          display: flex;
          gap: 24px;
          margin-top: 8px;
        }
        
        .radio-label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          color: var(--text-color);
        }
        
        .radio-label input {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: var(--primary-color);
        }
        
        .registered-details {
          margin-top: 16px;
          padding: 16px;
          background: rgba(59, 130, 246, 0.05);
          border-radius: 12px;
        }
        
        .form-note-text {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 12px;
        }
        
        .form-hint {
          font-size: 0.8rem;
          color: var(--primary-color);
          margin-top: 8px;
        }
        
        .mt-2 {
          margin-top: 12px;
        }
        
        .mt-1 {
          margin-top: 8px;
        }
        
        .team-members {
          margin-top: 16px;
        }
        
        .team-member-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr auto;
          gap: 12px;
          margin-bottom: 12px;
          align-items: center;
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
        }
        
        .remove-member-btn:hover {
          background: #f44336;
          color: #fff;
        }
        
        .add-member-btn {
          background: transparent;
          border: 1px dashed var(--primary-color);
          padding: 10px 20px;
          border-radius: 8px;
          color: var(--primary-color);
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
        }
        
        .add-member-btn:hover {
          background: rgba(59, 130, 246, 0.1);
        }
        
        .important-notes {
          background: rgba(59, 130, 246, 0.05);
          padding: 24px;
          border-radius: 16px;
          margin: 24px 0;
          border-left: 4px solid var(--primary-color);
        }
        
        .important-notes h4 {
          color: var(--primary-color);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .important-notes ol {
          margin-left: 20px;
          color: var(--text-muted);
          line-height: 1.8;
        }
        
        .important-notes li {
          margin-bottom: 8px;
        }
        
        .blessing-note {
          margin-top: 20px;
          font-style: italic;
          color: var(--text-color);
          line-height: 1.6;
        }
        
        .verse {
          margin-top: 16px;
          text-align: center;
          font-size: 0.9rem;
          color: var(--primary-color);
        }
        
        .highlight-saturday {
          color: var(--primary-color);
        }
        
        @media (max-width: 968px) {
          .team-member-row {
            grid-template-columns: 1fr;
            gap: 12px;
            position: relative;
            padding: 16px;
            background: rgba(59, 130, 246, 0.03);
            border-radius: 12px;
            margin-bottom: 20px;
          }
          
          .remove-member-btn {
            width: 100%;
          }
          
          .visitor-form {
            padding: 24px;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}