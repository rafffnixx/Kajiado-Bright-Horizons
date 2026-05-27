import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <>
      <SEO 
        title="About Us - Premier Financial Consulting in Kenya"
        description="M.K GATHU Financial Consulting: Expert financial advisors in Nairobi. We help Kenyan businesses with registration, KRA compliance, payroll, and growth strategies. Trusted by 500+ businesses."
        path="/about"
      />
      
      <div className="about-page">
        <section className="page-header">
          <div className="container">
            <h1>About <span>M.K GATHU</span></h1>
            <p>Kenya's trusted financial partner with a gold standard of service.</p>
          </div>
        </section>

        <section className="about-main">
          <div className="container">
            <div className="about-flex">
              <div className="about-text">
                <h2>Who We Are</h2>
                <p>We are a premier financial consulting firm based in Nairobi, Kenya, dedicated to empowering businesses with clarity, control, and growth. With deep expertise in local regulations and global best practices, we offer end-to-end financial management from business registration and KRA compliance to daily finance operations and profitability advisory.</p>
                
                <h2>Our Mission</h2>
                <p>To provide gold-standard financial consulting that transforms Kenyan businesses from registration to profitability through expert guidance, compliance assurance, and strategic advisory.</p>
                
                <h2>Our Vision</h2>
                <p>To be Kenya's most trusted financial partner, recognized for driving business success through innovative financial solutions and unwavering commitment to client prosperity.</p>
                
                <div className="about-stats">
                  <div className="stat-item">
                    <span className="stat-number">500+</span>
                    <span className="stat-label">Businesses Served</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">98%</span>
                    <span className="stat-label">KRA Compliance</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">10+</span>
                    <span className="stat-label">Years Experience</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">100%</span>
                    <span className="stat-label">Client Satisfaction</span>
                  </div>
                </div>
                
                <div className="about-contact">
                  <p><i className="fas fa-map-marker-alt"></i> <strong>Location:</strong> Westlands, Nairobi, Kenya | Serving clients countrywide</p>
                  <p><i className="fas fa-envelope"></i> <strong>Email:</strong> <a href="mailto:gathukamau23@gmail.com">gathukamau23@gmail.com</a></p>
                  <p><i className="fas fa-phone"></i> <strong>Phone:</strong> <a href="tel:+254762610912">+254 762 610 912</a></p>
                  <p><i className="fab fa-whatsapp"></i> <strong>WhatsApp:</strong> <a href="https://wa.me/254762610912">+254 762 610 912</a></p>
                </div>
                
                <div className="about-cta">
                  <Link to="/contact" className="btn-gold">
                    <i className="fas fa-calendar-check"></i> Book a Free Consultation
                  </Link>
                </div>
              </div>
              
              <div className="about-img">
                <img 
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80" 
                  alt="Professional financial consultant team in Kenya" 
                  loading="lazy" 
                />
                <img 
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80" 
                  alt="Financial consulting and tax compliance services in Kenya" 
                  loading="lazy" 
                  style={{marginTop: '24px'}} 
                />
              </div>
            </div>
          </div>
        </section>

        <section className="values-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Our <span>Core Values</span></h2>
              <p className="section-subtitle">The principles that guide our service delivery</p>
            </div>
            <div className="values-grid">
              <div className="value-card">
                <i className="fas fa-gem"></i>
                <h3>Integrity</h3>
                <p>We operate with complete transparency and ethical standards in all client dealings.</p>
              </div>
              <div className="value-card">
                <i className="fas fa-chart-line"></i>
                <h3>Excellence</h3>
                <p>We deliver gold-standard financial services that exceed client expectations.</p>
              </div>
              <div className="value-card">
                <i className="fas fa-handshake"></i>
                <h3>Partnership</h3>
                <p>We work alongside our clients as dedicated partners in their growth journey.</p>
              </div>
              <div className="value-card">
                <i className="fas fa-lightbulb"></i>
                <h3>Innovation</h3>
                <p>We leverage modern financial tools and strategies for optimal results.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="team-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Why <span>Choose Us</span></h2>
              <p className="section-subtitle">What makes us different from other financial consulting firms</p>
            </div>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon"><i className="fas fa-certificate"></i></div>
                <h3>Certified Experts</h3>
                <p>Fully certified financial professionals with extensive experience in Kenyan tax laws and regulations.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><i className="fas fa-clock"></i></div>
                <h3>Timely Delivery</h3>
                <p>We guarantee on-time filing and reporting, helping you avoid KRA penalties and late fees.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><i className="fas fa-shield-alt"></i></div>
                <h3>100% Confidential</h3>
                <p>Your financial data is safe with us. We maintain strict confidentiality and data protection standards.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><i className="fas fa-headset"></i></div>
                <h3>24/7 Support</h3>
                <p>Round-the-clock support for urgent financial matters and KRA inquiries.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><i className="fas fa-chart-line"></i></div>
                <h3>Proven Results</h3>
                <p>98% KRA compliance rate and 40% average profit increase for our clients.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><i className="fas fa-hand-holding-usd"></i></div>
                <h3>Affordable Pricing</h3>
                <p>Competitive rates tailored for Kenyan SMEs and startups.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}