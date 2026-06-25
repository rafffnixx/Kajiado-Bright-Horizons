// src/pages/DonorsPartners.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function DonorsPartners() {
  const partners = [
    {
      id: 1,
      name: "Hope for Kajiado",
      logo: "/images/partners/hope-for-kajiado.jpg",
      type: "Fundraising & Support Partner",
      description: "Helps sustain Kajiado Bright Horizons through fundraising, child sponsorship, and operational support.",
      impact: "Sustaining KBH operations",
      icon: "🌟"
    },
    {
      id: 2,
      name: "Cooks Memorial Presbyterian Church",
      logo: "/images/partners/christ-memorial-church.jpg",
      type: "Fundraising Partner (UK)",
      description: "Supports Kajiado Bright Horizons through fundraising initiatives, mobilizing resources and community support from the United Kingdom.",
      impact: "50+ children educated daily",
      icon: "📚"
    },
    {
      id: 3,
      name: "Kajiado Valley School of Excellence",
      logo: "/images/partners/kajiado-valley-school.jpg",
      type: "Pre-School & Primary School Partner",
      description: "Provides quality early childhood and primary education, nurturing young learners and supporting the mission of Kajiado Bright Horizons.",
      impact: "50+ students in junior school",
      icon: "🎓"
    },
    {
      id: 4,
      name: "Samaritan Feet",
      logo: "/images/partners/samaritan.jpg",
      type: "Government Partner",
      description: "Designated Kajiado Rescue Center for temporary placement of vulnerable children in need of protection and care.",
      impact: "Rescue & protection services",
      icon: "🛡️"
    },
    {
      id: 5,
      name: "Namanga Hope Center",
      logo: "/images/partners/namanga-hope-center.jpg",
      type: "Community Outreach Partner",
      description: "Outreach program to vulnerable communities, founded by KBH alumnus Richard Nyinge, providing support to those in need.",
      impact: "Community support programs",
      icon: "🤝"
    },
    {
      id: 6,
      name: "Bright Horizons Project",
      logo: "/images/partners/bright-horizons.jpg",
      type: "Education & Mentorship Partner",
      description: "Helping post-secondary students navigate their next steps to self-sufficiency through education and mentorship.",
      impact: "Post-secondary support",
      icon: "⭐"
    },
    {
      id: 7,
      name: "Feed The Needy Initiative",
      logo: "/images/partners/feed-the-needy.jpg",
      type: "Community Support Partner",
      description: "Providing food and essential supplies to vulnerable communities, supporting the mission of Kajiado Bright Horizons.",
      impact: "Food security programs",
      icon: "🍲"
    },
    {
      id: 8,
      name: "Bus Radio",
      logo: "/images/partners/bus-radio.jpg",
      type: "Media Partner",
      description: "Raising awareness and mobilizing community support through radio broadcasting and media outreach.",
      impact: "Community awareness",
      icon: "📻"
    }
  ];

  const donors = [
    {
      name: "Mountain Island Charter School",
      type: "Major Donor",
      contribution: "Ongoing Support"
    },
    {
      name: "Kajiado County Government",
      type: "Government Support",
      contribution: "Ongoing Support"
    },
    {
      name: "Graceway Church",
      type: "Community Partner",
      contribution: "Ongoing Support"
    },
    {
      name: "Mrs. Kisch S Kindergarten",
      type: "Community Partner",
      contribution: "Ongoing Support"
    },
    {
      name: "Gaye List",
      type: "Full Sponsorship",
      contribution: "Sponsor since 2011"
    },
    {
      name: "Nairobi University",
      type: "Academic Partner",
      contribution: "Regular visits & support"
    }
  ];

  return (
    <>
      <SEO 
        title="Friends of Kajiado Bright Horizon"
        description="Meet our valued partners and donors who help us make a difference in the lives of vulnerable children in Kajiado, Kenya."
        path="/donors-partners"
      />
      
      <div className="donors-partners-page">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="hero-bg-container">
            <div 
              className="hero-bg-image-about"
              style={{ backgroundImage: 'url("/images/hero/partners-hero.jpg")' }}
            ></div>
            <div className="hero-overlay-dark"></div>
          </div>
          <div className="container">
            <div className="hero-content-about">
              <h1>Our <span>Supportive Friends</span></h1>
              <p>Working together to create lasting impact</p>

            </div>
          </div>
        </section>

        {/* Partners Grid */}
        <section className="partners-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Friends of <span>Kajiado Bright Horizon</span></h2>
              <p className="section-subtitle">Collaborating to transform lives and build brighter futures</p>
            </div>
            <div className="partners-grid">
              {partners.map((partner) => (
                <div className="partner-card" key={partner.id}>
                  <div className="partner-logo-container">
                    <img 
                      src={partner.logo} 
                      alt={`${partner.name} Logo`} 
                      className="partner-logo"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `
                          <div class="partner-icon-placeholder">${partner.icon}</div>
                        `;
                      }}
                    />
                  </div>
                  <h3>{partner.name}</h3>
                  <div className="partner-role">{partner.type}</div>
                  <p className="partner-description">{partner.description}</p>
                  <div className="partner-impact">
                    <i className="fas fa-heart"></i> Impact: {partner.impact}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Donors Section */}
        <section className="donors-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Our <span>Donors</span></h2>
              <p className="section-subtitle">Thank you to our generous supporters</p>
            </div>
            <div className="donors-grid">
              {donors.map((donor, index) => (
                <div className="donor-card" key={index}>
                  <div className="donor-info">
                    <h4>{donor.name}</h4>
                    <span className="donor-type">{donor.type}</span>
                  </div>
                  <div className="donor-contribution">{donor.contribution}</div>
                </div>
              ))}
            </div>
            <div className="donors-footer">
              <div className="donors-footer-content">
                <i className="fas fa-heart" style={{ color: 'var(--primary-color)', fontSize: '1.5rem', marginBottom: '12px' }}></i>
                <p>Want to become a partner or donor? <Link to="/contact" className="donor-link">Contact us</Link> to make a difference.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Join Our Partners</h2>
              <p>Partner with us to create lasting impact in the lives of vulnerable children</p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn-gold">
                  <i className="fas fa-handshake"></i> Become a Partner
                </Link>
                <Link to="/donate" className="btn-outline-light">
                  <i className="fas fa-hand-holding-heart"></i> Make a Donation
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        /* ============================================
           DONORS & PARTNERS PAGE STYLES
           ============================================ */
        .donors-partners-page {
          background: var(--bg-deep);
          min-height: 100vh;
        }

        /* ============================================
           HERO SECTION
           ============================================ */
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

        /* ============================================
           SECTION HEADERS
           ============================================ */
        .section-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .section-title {
          font-size: 2.4rem;
          color: var(--text-color);
          font-weight: 700;
        }

        .section-title span {
          color: var(--primary-color);
        }

        .section-subtitle {
          color: var(--text-muted);
          font-size: 1.1rem;
          margin-top: 8px;
        }

        /* ============================================
           PARTNERS SECTION
           ============================================ */
        .partners-section {
          padding: 90px 0;
          background: var(--bg-deep);
        }

        .partners-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
          margin-top: 40px;
        }

        .partner-card {
          background: var(--card-bg);
          padding: 32px 28px;
          border-radius: 24px;
          text-align: center;
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .partner-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--primary-color), #10b981);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .partner-card:hover::before {
          opacity: 1;
        }

        .partner-card:hover {
          border-color: var(--primary-color);
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.15);
        }

        .partner-logo-container {
          width: 120px;
          height: 120px;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          overflow: hidden;
          padding: 20px;
          border: 2px solid var(--border-color);
          transition: all 0.3s ease;
        }

        .partner-card:hover .partner-logo-container {
          border-color: var(--primary-color);
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.15);
        }

        .partner-logo {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        .partner-card:hover .partner-logo {
          transform: scale(1.05);
        }

        .partner-icon-placeholder {
          font-size: 3rem;
          color: var(--primary-color);
        }

        .partner-card h3 {
          font-size: 1.2rem;
          margin-bottom: 8px;
          color: var(--text-color);
          font-weight: 600;
        }

        .partner-role {
          color: var(--primary-color);
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background: rgba(59, 130, 246, 0.08);
          display: inline-block;
          padding: 4px 16px;
          border-radius: 20px;
        }

        .partner-description {
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 20px;
          font-size: 0.95rem;
          min-height: 60px;
        }

        .partner-impact {
          background: rgba(59, 130, 246, 0.08);
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 0.85rem;
          color: var(--primary-color);
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .partner-impact i {
          color: var(--primary-color);
        }

        /* ============================================
           DONORS SECTION
           ============================================ */
        .donors-section {
          padding: 90px 0;
          background: var(--card-bg);
        }

        .donors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 16px;
          margin-top: 40px;
        }

        .donor-card {
          background: var(--bg-deep);
          padding: 20px 24px;
          border-radius: 16px;
          border: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
        }

        .donor-card:hover {
          border-color: var(--primary-color);
          transform: translateX(5px);
          box-shadow: 0 5px 20px rgba(59, 130, 246, 0.08);
        }

        .donor-info h4 {
          font-size: 1rem;
          margin-bottom: 4px;
          color: var(--text-color);
          font-weight: 600;
        }

        .donor-type {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .donor-contribution {
          background: rgba(59, 130, 246, 0.12);
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--primary-color);
          white-space: nowrap;
        }

        .donors-footer {
          text-align: center;
          margin-top: 48px;
          padding-top: 32px;
          border-top: 2px solid var(--border-color);
        }

        .donors-footer-content {
          max-width: 500px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .donors-footer p {
          color: var(--text-muted);
          font-size: 1.05rem;
        }

        .donor-link {
          color: var(--primary-color);
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .donor-link:hover {
          color: #1d4ed8;
          text-decoration: underline;
        }

        /* ============================================
           CTA SECTION
           ============================================ */
        .cta-section {
          padding: 80px 0;
          background: linear-gradient(135deg, #1a365d, #2563eb) !important;
        }

        .cta-content {
          text-align: center;
          max-width: 700px;
          margin: 0 auto;
        }

        .cta-content h2 {
          color: #ffffff !important;
          font-size: 2.4rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .cta-content p {
          color: #e2e8f0 !important;
          font-size: 1.2rem;
          margin-bottom: 32px;
        }

        .cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* ============================================
           RESPONSIVE DESIGN
           ============================================ */
        @media (max-width: 1024px) {
          .partners-grid {
            grid-template-columns: repeat(2, 1fr);
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

          .partners-grid {
            grid-template-columns: 1fr;
          }

          .donors-grid {
            grid-template-columns: 1fr;
          }

          .section-title {
            font-size: 1.8rem;
          }

          .partner-card {
            padding: 24px 20px;
          }

          .partner-logo-container {
            width: 100px;
            height: 100px;
            padding: 16px;
          }

          .partner-description {
            min-height: auto;
          }

          .donor-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .donor-contribution {
            align-self: flex-start;
          }

          .cta-content h2 {
            font-size: 1.8rem;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
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

        @media (max-width: 480px) {
          .partners-section,
          .donors-section {
            padding: 60px 0;
          }

          .partner-card {
            padding: 20px 16px;
          }

          .partner-logo-container {
            width: 80px;
            height: 80px;
            padding: 12px;
          }

          .partner-role {
            font-size: 0.7rem;
          }

          .partner-description {
            font-size: 0.9rem;
          }

          .donors-grid {
            gap: 12px;
          }

          .donor-card {
            padding: 16px;
          }

          .donor-info h4 {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </>
  );
}