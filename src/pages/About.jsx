import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import './styles.css';

export default function About() {
  const partners = [
    { icon: "🌟", title: "Hope for Kajiado", desc: "Sustaining KCH through fundraising and support" },
    { icon: "📚", title: "Valley School of Excellence", desc: "Quality education for KCH and community" },
    { icon: "🎓", title: "Bright Horizons Project", desc: "Mentorship and career training" },
    { icon: "🍲", title: "Namanga Hope Center", desc: "Outreach to vulnerable communities" }
  ];

  const services = [
    { icon: "❤️", title: "Love & Support" },
    { icon: "📚", title: "Quality Education" },
    { icon: "🙏", title: "Spiritual Guidance" },
    { icon: "⭐", title: "Hope for Future" }
  ];

  const staff = [
    { name: "Ruth Mbugua", role: "Manager", image: "/images/staff/staff1.jpg" },
    { name: "Simon Wainaina", role: "Director", image: "/images/staff/staff2.jpg" },
    { name: "Mary Wanjiku", role: "Teacher", image: "/images/staff/staff3.jpg" },
    { name: "James Kariuki", role: "Pastor", image: "/images/staff/staff4.jpg" }
  ];

  const values = [
    { letter: "L", title: "Love & Compassion" },
    { letter: "E", title: "Excellence" },
    { letter: "C", title: "Community" },
    { letter: "I", title: "Integrity" }
  ];

  return (
    <>
      <SEO 
        title="About Us - Kajiado Children's Home"
        description="Learn about Kajiado Children's Home's mission, vision, and the dedicated team transforming young lives in Kajiado, Kenya since 1997."
        path="/about"
      />
      
      <div className="about-page">
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
              <h1>About <span>Kajiado Children's Home</span></h1>
              <p>Transforming young lives in Kajiado since 1997</p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="about-story">
          <div className="container">
            <div className="about-flex">
              <div className="about-text">
                <h2>Our <span>Story</span></h2>
                <p>Kajiado Children's Home (KCH) provides a safe and loving environment for abused, abandoned, and orphaned children who have no place to go. Since <strong>1997</strong>, KCH has supported hundreds of children by offering shelter, care, and opportunities for a better future.</p>
                <p>What started as a small initiative has grown into a thriving community that currently cares for over 150 children, providing them with love, education, healthcare, and hope for a brighter future.</p>
                <p>We work closely with Kenya Child Services to support children lacking parental care and basic needs, whether for short-term or long-term care. Our approach focuses on holistic development, ensuring every child receives not just basic needs but also emotional support, quality education, and skills for life.</p>
              </div>
              <div className="about-img">
                <img src="/images/about/founder.jpg" alt="Kajiado Children's Home" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="mission-vision">
          <div className="container">
            <div className="mission-vision-grid">
              <div className="mission-card">
                <i className="fas fa-quote-left"></i>
                <h3>Our Mission</h3>
                <p>To ensure every child receives love, emotional support, nutritious food, medical care, quality education, and spiritual guidance breaking free from poverty to build a brighter future.</p>
              </div>
              <div className="vision-card">
                <i className="fas fa-quote-left"></i>
                <h3>Our Commitment</h3>
                <p>100% of donations go directly to supporting children and programs. Operational costs are covered by a dedicated group of donors and volunteer board of directors.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="partners-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Our <span>Partners</span></h2>
              <p className="section-subtitle">Helping children from their villages through education, mentorship, and community outreach</p>
            </div>
            <div className="partners-grid">
              {partners.map((partner, index) => (
                <div className="partner-card" key={index}>
                  <div className="partner-icon">{partner.icon}</div>
                  <h3>{partner.title}</h3>
                  <p>{partner.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Provide Section */}
        <section className="services-provided">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">What We <span>Provide</span></h2>
            </div>
            <div className="services-grid">
              {services.map((service, index) => (
                <div className="service-card" key={index}>
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Staff Section */}
        <section className="staff-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Our <span>Dedicated Team</span></h2>
              <p className="section-subtitle">Meet the caring individuals who make our home a loving environment</p>
            </div>
            <div className="staff-grid">
              {staff.map((member, index) => (
                <div className="staff-card" key={index}>
                  <img src={member.image} alt={member.name} loading="lazy" />
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="values-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Our <span>Core Values</span></h2>
            </div>
            <div className="values-grid">
              {values.map((value, index) => (
                <div className="value-card" key={index}>
                  <div className="value-letter">{value.letter}</div>
                  <h3>{value.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="impact-section">
          <div className="container">
            <div className="impact-content">
              <h2>Proven Impact</h2>
              <p>Children who grow up at KCH go on to succeed in life and many return to mentor the next generation.</p>
              <p className="impact-quote">Transforming lives, one child at a time.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Help Us Transform Lives</h2>
              <p>Your support makes a direct impact on a child's future.</p>
              <div className="cta-buttons">
                <Link to="/donate" className="btn-gold">
                  <i className="fas fa-hand-holding-heart"></i> Donate Now
                </Link>
                <Link to="/contact" className="btn-outline">
                  <i className="fas fa-envelope"></i> Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}