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
      name: "Samaritan feet",
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
      logo: "/images/partners/bright-horizons.png",
      type: "Education & Mentorship Partner",
      description: "Helping post-secondary students navigate their next steps to self-sufficiency through education and mentorship.",
      impact: "Post-secondary support",
      icon: "⭐"
    },
        {
      id: 7,
      name: "Feed The Needy Innitiative",
      logo: "/images/partners/feed-the-needy.jpg",
      type: "Education & Mentorship Partner",
      description: "Helping post-secondary students navigate their next steps to self-sufficiency through education and mentorship.",
      impact: "Post-secondary support",
      icon: "⭐"
    },
            {
      id: 8,
      name: "Bus Radio",
      logo: "/images/partners/feed-the-needy.jpg",
      type: "Education & Mentorship Partner",
      description: "Helping post-secondary students navigate their next steps to self-sufficiency through education and mentorship.",
      impact: "Post-secondary support",
      icon: "⭐"
    }


  ];

  const donors = [
    {
      name: "Anonymous Foundation",
      type: "Major Donor",
      contribution: "KES 1,000,000+"
    },
    {
      name: "Kajiado County Government",
      type: "Government Support",
      contribution: "Ongoing Support"
    },
    {
      name: "Rotary Club of Kajiado",
      type: "Community Partner",
      contribution: "KES 500,000+"
    },
    {
      name: "Nairobi Women's Group",
      type: "Community Partner",
      contribution: "KES 250,000+"
    },
    {
      name: "M-Pesa Foundation",
      type: "Corporate Partner",
      contribution: "KES 750,000+"
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
              <h2 className="section-title">Friends of  <span>Kajiado Bright Horizon</span></h2>
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
              <p>Want to become a partner or donor? <Link to="/contact" className="donor-link">Contact us</Link> to make a difference.</p>
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
                <Link to="/donate" className="btn-outline">
                  <i className="fas fa-hand-holding-heart"></i> Make a Donation
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style>{`
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
          padding: 32px;
          border-radius: 24px;
          text-align: center;
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
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
          padding: 16px;
        }
        
        .partner-logo {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        
        .partner-icon-placeholder {
          font-size: 3rem;
          color: var(--primary-color);
        }
        
        .partner-card h3 {
          font-size: 1.2rem;
          margin-bottom: 8px;
          color: var(--text-color);
        }
        
        .partner-role {
          color: var(--primary-color);
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .partner-description {
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 20px;
          font-size: 0.95rem;
        }
        
        .partner-impact {
          background: rgba(59, 130, 246, 0.1);
          padding: 12px;
          border-radius: 12px;
          font-size: 0.85rem;
          color: var(--primary-color);
          font-weight: 500;
        }
        
        .donors-section {
          padding: 90px 0;
          background: var(--bg-deep);
        }
        
        .donors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 16px;
          margin-top: 40px;
        }
        
        .donor-card {
          background: var(--card-bg);
          padding: 20px;
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
          background: rgba(59, 130, 246, 0.05);
        }
        
        .donor-info h4 {
          font-size: 1rem;
          margin-bottom: 4px;
          color: var(--text-color);
        }
        
        .donor-type {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .donor-contribution {
          background: rgba(59, 130, 246, 0.15);
          padding: 6px 12px;
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
          border-top: 1px solid var(--border-color);
        }
        
        .donors-footer p {
          color: var(--text-muted);
        }
        
        .donor-link {
          color: var(--primary-color);
          font-weight: 600;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .donor-link:hover {
          text-decoration: underline;
        }
        
        @media (max-width: 768px) {
          .partners-grid {
            grid-template-columns: 1fr;
          }
          
          .donors-grid {
            grid-template-columns: 1fr;
          }
          
          .partner-logo-container {
            width: 100px;
            height: 100px;
          }
        }
      `}</style>
    </>
  );
}