import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import CONFIG from '../config';

export default function GetInvolved() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', interest: '' });
  const [showVolunteerForm, setShowVolunteerForm] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const waysRef = useRef(null);
  const statsRef = useRef(null);
  const wishlistRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setSubmitStatus({ type: 'success', message: 'Thank you for your interest! We will contact you soon.' });
      setFormData({ name: '', email: '', phone: '', interest: '' });
      setShowVolunteerForm(false);
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1000);
  };

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
    { icon: "💰", title: "One-Time Donation", desc: "Any amount helps provide food, clothing, and medical care.", link: "/donate", action: "Donate Now" },
    { icon: "👤", title: "Monthly Sponsorship", desc: "KES 2,500/month covers education, meals, and care.", link: "/donate", action: "Sponsor a Child" },
    { icon: "✋", title: "Volunteer", desc: "Share your skills in teaching, mentoring, or administration.", action: "Apply to Volunteer", isButton: true }
  ];

  const stats = [
    { number: "150+", label: "Children Supported", icon: "fas fa-child" },
    { number: "50+", label: "Active Volunteers", icon: "fas fa-hands-helping" },
    { number: "20+", label: "Partner Orgs", icon: "fas fa-handshake" },
    { number: "27+", label: "Years of Service", icon: "fas fa-calendar-alt" }
  ];

  const wishlist = [
    { item: "School Uniforms", detail: "50 needed - KES 2,500 each" },
    { item: "Textbooks & Stationery", detail: "For 150 children" },
    { item: "Blankets & Bedding", detail: "Winter supplies needed" },
    { item: "Food Supplies", detail: "Maize, beans, cooking oil" },
    { item: "Sports Equipment", detail: "Balls, nets, uniforms" },
    { item: "Computers", detail: "For the learning center" }
  ];

  return (
    <>
      <SEO 
        title="Get Involved - Support Kajiado Children's Home"
        description="Make a difference in children's lives through donations, sponsorship, or volunteering. Your support provides education, healthcare, and hope to vulnerable children in Kajiado, Kenya."
        path="/get-involved"
      />
      
      <div className="get-involved-page">
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
              <h1>Get <span>Involved</span></h1>
              <p>Your contribution directly impacts a child's future</p>
              <div className="hero-buttons" style={{ justifyContent: 'center', marginTop: '32px' }}>
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
            <div className={`form-feedback ${submitStatus.type}`} style={{ marginBottom: '0' }}>
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
            </div>
            <div className="ways-grid">
              {waysToHelp.map((way, index) => (
                <div key={index} className="way-card">
                  <div className="way-icon">{way.icon}</div>
                  <h3>{way.title}</h3>
                  <p>{way.desc}</p>
                  {way.isButton ? (
                    <button onClick={() => setShowVolunteerForm(true)} className="way-link">
                      {way.action} <i className="fas fa-arrow-right"></i>
                    </button>
                  ) : (
                    <Link to={way.link} className="way-link">
                      {way.action} <i className="fas fa-arrow-right"></i>
                    </Link>
                  )}
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
            </div>
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <i className={stat.icon}></i>
                  <h3>{stat.number}</h3>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wishlist */}
        <div 
          ref={wishlistRef}
          id="wishlist"
          className={`wishlist-section ${isVisible.wishlist ? 'visible' : ''}`}
        >
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Current <span>Needs</span></h2>
              <p className="section-subtitle">Your in-kind donations make a direct impact</p>
            </div>
            <div className="wishlist-grid">
              {wishlist.map((item, index) => (
                <div key={index} className="wishlist-item">
                  <h4>{item.item}</h4>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bank Details */}
        <div className="bank-details-section">
          <div className="container">
            <div className="bank-card">
              <i className="fas fa-university"></i>
              <h3>Bank Transfer Details</h3>
              <p><strong>Bank:</strong> Equity Bank</p>
              <p><strong>Account Name:</strong> Kajiado Children's Home</p>
              <p><strong>Account Number:</strong> 1234567890</p>
              <p><strong>Branch:</strong> Kajiado Town</p>
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
                <Link to="/donate" className="btn-outline">
                  <i className="fas fa-heart"></i> Make a Donation
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Volunteer Form Modal */}
      {showVolunteerForm && (
        <div className="modal-overlay" onClick={() => setShowVolunteerForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowVolunteerForm(false)}>×</button>
            <h3>Volunteer Registration</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Full Name *"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email *"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="form-group">
                <select
                  required
                  value={formData.interest}
                  onChange={(e) => setFormData({...formData, interest: e.target.value})}
                >
                  <option value="">Area of Interest *</option>
                  <option>Teaching/Tutoring</option>
                  <option>Sports & Recreation</option>
                  <option>Medical/Healthcare</option>
                  <option>Administration</option>
                  <option>Fundraising</option>
                  <option>Construction/Maintenance</option>
                </select>
              </div>
              <button type="submit" className="btn-gold" disabled={isSubmitting}>
                {isSubmitting ? <><i className="fas fa-spinner fa-spin"></i> Submitting...</> : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}