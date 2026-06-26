// src/pages/GetInvolved.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import CONFIG from '../config';

export default function GetInvolved() {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    interest: '' 
  });
  const [showVolunteerForm, setShowVolunteerForm] = useState(false);
  const [showGiftForm, setShowGiftForm] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeForm, setActiveForm] = useState(null); // 'volunteer' or 'gift'
  
  const waysRef = useRef(null);
  const statsRef = useRef(null);
  const wishlistRef = useRef(null);
  const formsRef = useRef(null);
  const volunteerFormRef = useRef(null);
  const giftFormRef = useRef(null);

  // Volunteer form state - SIMPLIFIED (Age as checkbox)
  const [volunteerData, setVolunteerData] = useState({
    fullName: '',
    email: '',
    phone: '',
    ageOver18: false,
    occupation: '',
    skills: '',
    availability: '',
    interests: [],
    message: '',
    heardFrom: ''
  });

  // Gift in kind form state - SIMPLIFIED (removed estimatedValue)
  const [giftData, setGiftData] = useState({
    fullName: '',
    email: '',
    phone: '',
    itemType: '',
    itemDescription: '',
    quantity: '',
    pickupAvailable: 'no',
    pickupAddress: '',
    message: ''
  });

  const volunteerInterests = [
    'Teaching/Tutoring',
    'Sports & Recreation',
    'Medical/Healthcare',
    'Administration',
    'Fundraising',
    'Construction/Maintenance',
    'Cooking/Kitchen',
    'Arts & Crafts',
    'Music/Drama',
    'Counseling',
    'Photography/Videography',
    'Social Media'
  ];

  const itemTypes = [
    'School Supplies',
    'Books/Textbooks',
    'Clothing',
    'Food Items',
    'Furniture',
    'Sports Equipment',
    'Medical Supplies',
    'Electronics/Computers',
    'Building Materials',
    'Toiletries/Hygiene',
    'Toys/Games',
    'Other'
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );

    if (waysRef.current) observer.observe(waysRef.current);
    if (statsRef.current) observer.observe(statsRef.current);
    if (wishlistRef.current) observer.observe(wishlistRef.current);

    return () => observer.disconnect();
  }, []);

  const waysToHelp = [
    { 
      icon: "fa-hand-holding-heart", 
      title: "Cash Donations", 
      desc: "Any amount helps provide food, clothing, and medical care for our children.", 
      link: "/donate", 
      action: "Donate Now",
      color: "#2563eb"
    },
    { 
      icon: "fa-gift", 
      title: "Gift In Kind", 
      desc: "Donate items like food, clothing, books, and supplies to support our children.", 
      action: "Donate Items", 
      isButton: true,
      scrollTo: 'gift-form',
      color: "#f59e0b"
    },
    { 
      icon: "fa-hands-helping", 
      title: "Volunteer", 
      desc: "Share your skills in teaching, mentoring, or administration to make a difference.", 
      action: "Apply to Volunteer", 
      isButton: true,
      scrollTo: 'volunteer-form',
      color: "#10b981"
    }
  ];

  const stats = [
    { number: "150+", label: "Children Supported", icon: "fa-child" },
    { number: "50+", label: "Active Volunteers", icon: "fa-hands-helping" },
    { number: "20+", label: "Partner Orgs", icon: "fa-handshake" },
    { number: "29+", label: "Years of Service", icon: "fa-calendar-alt" }
  ];

  const wishlist = [
    { item: "School Uniforms", detail: "50 needed - KES 2,500 each" },
    { item: "Textbooks & Stationery", detail: "For 150 children" },
    { item: "Blankets & Bedding", detail: "Winter supplies needed" },
    { item: "Food Supplies", detail: "Maize, beans, cooking oil" },
    { item: "Sports Equipment", detail: "Balls, nets, uniforms" },
    { item: "Computers", detail: "For the learning center" }
  ];

  const scrollToForm = (formId) => {
    const element = document.getElementById(formId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveForm(formId === 'volunteer-form' ? 'volunteer' : 'gift');
    }
  };

  const handleVolunteerChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (name === 'ageOver18') {
        setVolunteerData(prev => ({ ...prev, ageOver18: checked }));
      } else {
        if (checked) {
          setVolunteerData(prev => ({
            ...prev,
            interests: [...prev.interests, value]
          }));
        } else {
          setVolunteerData(prev => ({
            ...prev,
            interests: prev.interests.filter(item => item !== value)
          }));
        }
      }
    } else {
      setVolunteerData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleGiftChange = (e) => {
    const { name, value } = e.target;
    setGiftData(prev => ({ ...prev, [name]: value }));
  };

  const handleVolunteerSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // ✅ Use CONFIG.GOOGLE_SHEETS.URL (not CONFIG.GOOGLE_SHEETS_URL)
      const response = await fetch(CONFIG.GOOGLE_SHEETS.URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          endpoint: 'volunteer',
          payload: {
            fullName: volunteerData.fullName,
            email: volunteerData.email,
            phone: volunteerData.phone,
            age: volunteerData.ageOver18 ? 'Over 18' : 'Under 18',
            occupation: volunteerData.occupation,
            skills: volunteerData.skills,
            availability: volunteerData.availability,
            interests: volunteerData.interests.join(', '),
            message: volunteerData.message,
            heardFrom: volunteerData.heardFrom
          }
        })
      });

      setSubmitStatus({
        type: 'success',
        message: '🎉 Thank you for your interest in volunteering! We will contact you within 2-3 business days.'
      });
      
      setVolunteerData({
        fullName: '',
        email: '',
        phone: '',
        ageOver18: false,
        occupation: '',
        skills: '',
        availability: '',
        interests: [],
        message: '',
        heardFrom: ''
      });
      
      setTimeout(() => setSubmitStatus(null), 8000);
    } catch (error) {
      console.error('Volunteer submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: '❌ There was an error submitting your application. Please try again or contact us directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGiftSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // ✅ Use CONFIG.GOOGLE_SHEETS.URL (not CONFIG.GOOGLE_SHEETS_URL)
      const response = await fetch(CONFIG.GOOGLE_SHEETS.URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          endpoint: 'giftinkind',
          payload: {
            fullName: giftData.fullName,
            email: giftData.email,
            phone: giftData.phone,
            itemType: giftData.itemType,
            itemDescription: giftData.itemDescription,
            quantity: giftData.quantity,
            pickupAvailable: giftData.pickupAvailable,
            pickupAddress: giftData.pickupAddress,
            message: giftData.message
          }
        })
      });

      setSubmitStatus({
        type: 'success',
        message: '🎉 Thank you for your generous gift! We will contact you within 2-3 business days to arrange collection.'
      });
      
      setGiftData({
        fullName: '',
        email: '',
        phone: '',
        itemType: '',
        itemDescription: '',
        quantity: '',
        pickupAvailable: 'no',
        pickupAddress: '',
        message: ''
      });
      
      setTimeout(() => setSubmitStatus(null), 8000);
    } catch (error) {
      console.error('Gift in kind submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: '❌ There was an error submitting your donation. Please try again or contact us directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO 
        title="Get Involved - Support Kajiado Bright Horizons"
        description="Make a difference in children's lives through donations, volunteering, or gift in kind donations. Your support provides education, healthcare, and hope to vulnerable children in Kajiado, Kenya."
        path="/get-involved"
      />
      
      <div className="get-involved-page">
        {/* Hero Section */}
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
              <h1>Get <span>Involved</span></h1>
              <p>Your contribution directly impacts a child's future</p>
              <div className="hero-buttons">
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

        {submitStatus && (
          <div className="container">
            <div className={`form-feedback ${submitStatus.type}`}>
              {submitStatus.message}
            </div>
          </div>
        )}

        {/* Ways to Help */}
        <div 
          ref={waysRef}
          id="ways"
          className={`ways-section ${isVisible.ways ? 'visible' : ''}`}
        >
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Ways You Can <span>Help</span></h2>
              <p className="section-subtitle">Choose the way that works best for you</p>
            </div>
            <div className="ways-grid">
              {waysToHelp.map((way, index) => (
                <div key={index} className="way-card">
                  <div className="way-icon" style={{ color: way.color }}>
                    <i className={`fas ${way.icon}`}></i>
                  </div>
                  <h3>{way.title}</h3>
                  <p>{way.desc}</p>
                  {way.isButton ? (
                    <button 
                      onClick={() => scrollToForm(way.scrollTo)} 
                      className="way-link"
                      style={{ color: way.color }}
                    >
                      {way.action} <i className="fas fa-arrow-right"></i>
                    </button>
                  ) : (
                    <Link to={way.link} className="way-link" style={{ color: way.color }}>
                      {way.action} <i className="fas fa-arrow-right"></i>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Forms Section */}
        <div ref={formsRef} className="forms-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Get <span>Involved</span> Today</h2>
              <p className="section-subtitle">Choose how you'd like to help and fill out the form below</p>
            </div>

            {/* Form Toggle Buttons */}
            <div className="form-toggle-buttons">
              <button 
                className={`toggle-btn ${activeForm === 'volunteer' || !activeForm ? 'active' : ''}`}
                onClick={() => {
                  setActiveForm('volunteer');
                  setTimeout(() => {
                    document.getElementById('volunteer-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                }}
              >
                <i className="fas fa-hands-helping"></i> Volunteer
              </button>
              <button 
                className={`toggle-btn ${activeForm === 'gift' ? 'active' : ''}`}
                onClick={() => {
                  setActiveForm('gift');
                  setTimeout(() => {
                    document.getElementById('gift-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                }}
              >
                <i className="fas fa-gift"></i> Gift In Kind
              </button>
            </div>

            {/* Volunteer Form */}
            <div id="volunteer-form" ref={volunteerFormRef} className={`form-container ${activeForm === 'volunteer' || !activeForm ? 'active' : ''}`}>
              <div className="form-card">
                <h3><i className="fas fa-hands-helping"></i> Volunteer Application</h3>
                <p className="form-subtitle">Fill out the form below and we'll get back to you soon</p>

                <form onSubmit={handleVolunteerSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={volunteerData.fullName}
                        onChange={handleVolunteerChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        value={volunteerData.email}
                        onChange={handleVolunteerChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+254 712 345 678"
                        value={volunteerData.phone}
                        onChange={handleVolunteerChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Occupation</label>
                      <input
                        type="text"
                        name="occupation"
                        placeholder="What do you do?"
                        value={volunteerData.occupation}
                        onChange={handleVolunteerChange}
                      />
                    </div>
                  </div>

                  {/* Age Checkbox */}
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="ageOver18"
                        checked={volunteerData.ageOver18}
                        onChange={handleVolunteerChange}
                      />
                      <span>I am over 18 years old</span>
                    </label>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Availability</label>
                      <select
                        name="availability"
                        value={volunteerData.availability}
                        onChange={handleVolunteerChange}
                      >
                        <option value="">Select availability</option>
                        <option value="weekdays">Weekdays Only</option>
                        <option value="weekends">Weekends Only</option>
                        <option value="both">Both Weekdays & Weekends</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>How did you hear about us?</label>
                      <select
                        name="heardFrom"
                        value={volunteerData.heardFrom}
                        onChange={handleVolunteerChange}
                      >
                        <option value="">Select an option</option>
                        <option value="social_media">Social Media</option>
                        <option value="friend">Friend/Word of Mouth</option>
                        <option value="church">Church</option>
                        <option value="school">School/College</option>
                        <option value="website">Website</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Skills & Experience</label>
                    <textarea
                      name="skills"
                      placeholder="Tell us about your skills and experience that could help..."
                      rows="3"
                      value={volunteerData.skills}
                      onChange={handleVolunteerChange}
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label>Areas of Interest *</label>
                    <div className="checkbox-grid">
                      {volunteerInterests.map((interest, index) => (
                        <label key={index} className="checkbox-label">
                          <input
                            type="checkbox"
                            name="interests"
                            value={interest}
                            checked={volunteerData.interests.includes(interest)}
                            onChange={handleVolunteerChange}
                          />
                          {interest}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Additional Message</label>
                    <textarea
                      name="message"
                      placeholder="Any additional information you'd like to share..."
                      rows="2"
                      value={volunteerData.message}
                      onChange={handleVolunteerChange}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-gold" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <><i className="fas fa-spinner fa-spin"></i> Submitting...</>
                    ) : (
                      <><i className="fas fa-paper-plane"></i> Submit Application</>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Gift In Kind Form */}
            <div id="gift-form" ref={giftFormRef} className={`form-container ${activeForm === 'gift' ? 'active' : ''}`}>
              <div className="form-card">
                <h3><i className="fas fa-gift"></i> Gift In Kind Donation</h3>
                <p className="form-subtitle">Fill out the form below and we'll arrange collection or drop-off</p>

                <form onSubmit={handleGiftSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={giftData.fullName}
                        onChange={handleGiftChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        value={giftData.email}
                        onChange={handleGiftChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+254 712 345 678"
                        value={giftData.phone}
                        onChange={handleGiftChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Item Type *</label>
                      <select
                        name="itemType"
                        value={giftData.itemType}
                        onChange={handleGiftChange}
                        required
                      >
                        <option value="">Select item type</option>
                        {itemTypes.map((type, index) => (
                          <option key={index} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Item Description *</label>
                    <textarea
                      name="itemDescription"
                      placeholder="Please describe the items you wish to donate (e.g., quantity, condition, etc.)"
                      rows="3"
                      value={giftData.itemDescription}
                      onChange={handleGiftChange}
                      required
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label>Quantity</label>
                    <input
                      type="text"
                      name="quantity"
                      placeholder="e.g., 50 notebooks, 10 blankets"
                      value={giftData.quantity}
                      onChange={handleGiftChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Can we arrange pickup?</label>
                    <select
                      name="pickupAvailable"
                      value={giftData.pickupAvailable}
                      onChange={handleGiftChange}
                    >
                      <option value="no">No, I'll deliver</option>
                      <option value="yes">Yes, please arrange pickup</option>
                    </select>
                  </div>

                  {giftData.pickupAvailable === 'yes' && (
                    <div className="form-group">
                      <label>Pickup Address</label>
                      <textarea
                        name="pickupAddress"
                        placeholder="Enter the address where we can collect the items"
                        rows="2"
                        value={giftData.pickupAddress}
                        onChange={handleGiftChange}
                      ></textarea>
                    </div>
                  )}

                  <div className="form-group">
                    <label>Additional Message</label>
                    <textarea
                      name="message"
                      placeholder="Any additional information you'd like to share..."
                      rows="2"
                      value={giftData.message}
                      onChange={handleGiftChange}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-gold" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <><i className="fas fa-spinner fa-spin"></i> Submitting...</>
                    ) : (
                      <><i className="fas fa-gift"></i> Submit Donation</>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Wishlist Section */}
        <div 
          ref={wishlistRef}
          id="wishlist"
          className={`wishlist-section ${isVisible.wishlist ? 'visible' : ''}`}
        >
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Current <span>Needs</span></h2>
              <p className="section-subtitle">Your in-kind donations make a direct impact on children's lives</p>
            </div>
            <div className="wishlist-grid">
              {wishlist.map((item, index) => (
                <div key={index} className="wishlist-item">
                  <div className="wishlist-icon">
                    <i className="fas fa-box"></i>
                  </div>
                  <div className="wishlist-content">
                    <h4>{item.item}</h4>
                    <p>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div 
          ref={statsRef}
          id="stats"
          className={`stats-section ${isVisible.stats ? 'visible' : ''}`}
        >
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Our <span>Impact</span></h2>
              <p className="section-subtitle">Together, we're making a difference</p>
            </div>
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <i className={`fas ${stat.icon}`}></i>
                  <h3>{stat.number}</h3>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bank Details */}
        <div className="bank-details-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Bank <span>Transfer</span></h2>
              <p className="section-subtitle">Direct bank transfers are also accepted</p>
            </div>
            <div className="bank-card">
              <i className="fas fa-university"></i>
              <div className="bank-details">
                <div className="bank-row">
                  <span className="bank-label">Bank:</span>
                  <span className="bank-value">Kenya Commercial Bank</span>
                </div>
                <div className="bank-row">
                  <span className="bank-label">Account Name:</span>
                  <span className="bank-value">Kajiado Bright Horizons</span>
                </div>
                <div className="bank-row">
                  <span className="bank-label">Account Number:</span>
                  <span className="bank-value highlight">1234567890</span>
                </div>
                <div className="bank-row">
                  <span className="bank-label">Branch:</span>
                  <span className="bank-value">Kajiado Town</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Make a Difference?</h2>
              <p>Join us in transforming young lives today</p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn-gold">
                  <i className="fas fa-envelope"></i> Contact Us
                </Link>
                <Link to="/donate" className="btn-outline-light">
                  <i className="fas fa-heart"></i> Make a Donation
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .get-involved-page {
          background: #f0f4f8;
          min-height: 100vh;
        }

        /* Hero Section */
        .about-hero {
          background: linear-gradient(135deg, #1a365d 0%, #2b6cb0 50%, #2563eb 100%) !important;
          padding: 120px 0 80px !important;
          min-height: 400px;
          display: flex;
          align-items: center;
          position: relative;
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
          max-width: 600px;
          margin: 0 auto 24px;
        }

        .hero-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* Section Headers */
        .section-header {
          text-align: center;
          margin-bottom: 48px;
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

        /* Ways Section */
        .ways-section {
          padding: 80px 0 60px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .ways-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .ways-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .way-card {
          background: #ffffff;
          padding: 40px 30px;
          border-radius: 20px;
          text-align: center;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .way-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #2563eb, #10b981, #f59e0b);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .way-card:hover::before {
          opacity: 1;
        }

        .way-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
        }

        .way-icon {
          font-size: 3.5rem;
          margin-bottom: 16px;
          display: block;
        }

        .way-card h3 {
          color: #1a202c;
          margin-bottom: 10px;
          font-size: 1.3rem;
        }

        .way-card p {
          color: #4a5568;
          line-height: 1.6;
          margin-bottom: 20px;
          min-height: 60px;
        }

        .way-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
        }

        .way-link:hover {
          gap: 14px;
        }

        /* Forms Section */
        .forms-section {
          padding: 40px 0 60px;
          background: #ffffff;
        }

        .form-toggle-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          margin-bottom: 40px;
        }

        .toggle-btn {
          padding: 14px 40px;
          background: #f7fafc;
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

        .form-container {
          display: none;
        }

        .form-container.active {
          display: block;
          animation: fadeInUp 0.5s ease;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .form-card {
          background: #f7fafc;
          padding: 50px;
          border-radius: 24px;
          border: 1px solid #e2e8f0;
          max-width: 800px;
          margin: 0 auto;
        }

        .form-card h3 {
          font-size: 1.8rem;
          margin-bottom: 8px;
          text-align: center;
          color: #1a202c;
        }

        .form-card h3 i {
          color: #2563eb;
        }

        .form-subtitle {
          text-align: center;
          color: #718096;
          margin-bottom: 30px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
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
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 12px 16px;
          background: #ffffff;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          color: #1a202c;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
          outline: none;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 80px;
        }

        .checkbox-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 8px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #2d3748;
          font-size: 0.9rem;
          cursor: pointer;
        }

        .checkbox-label input[type="checkbox"] {
          width: auto;
          margin: 0;
          cursor: pointer;
          accent-color: #2563eb;
        }

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

        /* Wishlist Section */
        .wishlist-section {
          padding: 80px 0;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .wishlist-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .wishlist-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .wishlist-item {
          background: #ffffff;
          padding: 24px;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: all 0.3s ease;
        }

        .wishlist-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
        }

        .wishlist-icon {
          font-size: 2rem;
          color: #2563eb;
        }

        .wishlist-content h4 {
          color: #1a202c;
          margin-bottom: 4px;
          font-size: 1rem;
        }

        .wishlist-content p {
          color: #718096;
          font-size: 0.9rem;
          margin: 0;
        }

        /* Stats Section */
        .stats-section {
          padding: 80px 0;
          background: #ffffff;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .stats-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .stat-card {
          background: #f7fafc;
          padding: 30px;
          border-radius: 16px;
          text-align: center;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
        }

        .stat-card i {
          font-size: 2.5rem;
          color: #2563eb;
          margin-bottom: 12px;
        }

        .stat-card h3 {
          font-size: 2.2rem;
          color: #1a202c;
          font-weight: 700;
        }

        .stat-card p {
          color: #718096;
          font-size: 0.95rem;
        }

        /* Bank Details */
        .bank-details-section {
          padding: 60px 0 80px;
        }

        .bank-card {
          background: #ffffff;
          padding: 40px;
          border-radius: 24px;
          border: 1px solid #e2e8f0;
          max-width: 500px;
          margin: 0 auto;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
        }

        .bank-card i {
          font-size: 3rem;
          color: #2563eb;
          margin-bottom: 16px;
        }

        .bank-details {
          text-align: left;
        }

        .bank-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #e2e8f0;
        }

        .bank-row:last-child {
          border-bottom: none;
        }

        .bank-label {
          color: #718096;
          font-weight: 500;
        }

        .bank-value {
          color: #1a202c;
          font-weight: 500;
        }

        .bank-value.highlight {
          color: #2563eb;
          font-weight: 700;
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
          .ways-grid {
            grid-template-columns: 1fr 1fr;
          }
          
          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }
          
          .wishlist-grid {
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

          .ways-grid {
            grid-template-columns: 1fr;
          }
          
          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }
          
          .wishlist-grid {
            grid-template-columns: 1fr;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .checkbox-grid {
            grid-template-columns: 1fr;
          }
          
          .form-card {
            padding: 24px;
          }
          
          .form-card h3 {
            font-size: 1.3rem;
          }
          
          .section-title {
            font-size: 1.8rem;
          }
          
          .form-toggle-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .toggle-btn {
            width: 100%;
            justify-content: center;
          }

          .bank-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }

          .cta-content h2 {
            font-size: 1.8rem;
          }
        }

        @media (max-width: 480px) {
          .form-card {
            padding: 16px;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .hero-content-about h1 {
            font-size: 1.8rem;
          }

          .way-card {
            padding: 24px 20px;
          }

          .way-card p {
            min-height: auto;
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
        }
      `}</style>
    </>
  );
}