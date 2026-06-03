import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import CONFIG from '../config';

export default function DonorsPartners() {
  const partners = [
    {
      name: "Hope for Kajiado",
      role: "Fundraising & Support Partner",
      description: "Helps sustain Kajiado Children's Home through fundraising, child sponsorship, and operational support.",
      impact: "Sustaining KCH operations",
      icon: "🌟"
    },
    {
      name: "Kajiado Valley School",
      role: "Education Partner",
      description: "Our young children learn here. Open to outside students who pay fees, creating a sustainable model that helps support our home's operations.",
      impact: "50+ children educated daily",
      icon: "📚"
    },
    {
      name: "Bright Horizons Project",
      role: "Mentorship & Career Partner",
      description: "Provides mentorship, career readiness training, digital skills, and guidance for older students transitioning to adulthood.",
      impact: "15+ students in higher education",
      icon: "🎓"
    },
    {
      name: "Namanga Hope Centre",
      role: "Community Outreach Partner",
      description: "Provides nutritious meals for children and the elderly, clothing distribution, mentorship and life skills training to vulnerable communities.",
      impact: "100+ people served monthly",
      icon: "🍲"
    }
  ];

  const donors = [
    { name: "John M. & Family", contribution: "KES 500,000", type: "Individual" },
    { name: "Kajiado County Government", contribution: "Infrastructure Support", type: "Government" },
    { name: "Rotary Club of Kajiado", contribution: "Water Project", type: "Organization" },
    { name: "Sarah Wanjiku Foundation", contribution: "Monthly Food Program", type: "Foundation" },
    { name: "TechForGood Kenya", contribution: "Computers & IT Lab", type: "Corporate" },
    { name: "Equity Bank Foundation", contribution: "Education Scholarship", type: "Corporate" },
    { name: "Anonymous Donor", contribution: "KES 1,000,000", type: "Individual" },
    { name: "National Government - Kenya", contribution: "Infrastructure Grant", type: "Government" }
  ];

  return (
    <>
      <SEO 
        title="Our Partners & Donors - Kajiado Children's Home"
        description="Meet the generous partners and donors who make our work possible. Join us in transforming young lives in Kajiado, Kenya through partnership and support."
        path="/donors-partners"
      />
      
      <div className="donors-partners-page">
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
              <h1>Our <span>Partners & Donors</span></h1>
              <p>Together, we transform young lives through generosity and partnership</p>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="partners-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Our <span>Partners</span></h2>
              <p className="section-subtitle">Working together to create lasting impact</p>
            </div>
            <div className="partners-grid">
              {partners.map((partner, index) => (
                <div key={index} className="partner-card">
                  <div className="partner-icon">{partner.icon}</div>
                  <h3>{partner.name}</h3>
                  <p className="partner-role">{partner.role}</p>
                  <p className="partner-description">{partner.description}</p>
                  <div className="partner-impact">
                    <i className="fas fa-bullseye"></i> Impact: {partner.impact}
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
              <h2 className="section-title">Our <span>Supporters & Donors</span></h2>
              <p className="section-subtitle">Thank you to everyone who makes our work possible</p>
            </div>
            <div className="donors-grid">
              {donors.map((donor, index) => (
                <div key={index} className="donor-card">
                  <div className="donor-info">
                    <h4>{donor.name}</h4>
                    <p className="donor-type">{donor.type}</p>
                  </div>
                  <div className="donor-contribution">
                    {donor.contribution}
                  </div>
                </div>
              ))}
            </div>
            <div className="donors-footer">
              <p>Want to be featured? Contact us to discuss partnership opportunities.</p>
              <Link to="/contact" className="btn-outline">
                Contact Us Today <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </section>

        {/* Become a Partner CTA */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Become a Partner</h2>
              <p>Join us in making a difference in the lives of vulnerable children in Kajiado. Your partnership, whether big or small, creates lasting impact.</p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn-gold">
                  <i className="fas fa-handshake"></i> Contact Us to Partner
                </Link>
                <Link to="/donate" className="btn-outline">
                  <i className="fas fa-heart"></i> Make a Donation
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}