// src/pages/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import './styles.css';

export default function About() {
  // PARTNER PROGRAMS - Programs run by partner organizations
  const partnerPrograms = [
    { 
      title: "Valley School of Excellence", 
      desc: "State-of-the-art primary school providing quality education to KBH children and the community",
      icon: "fa-school"
    },
    { 
      title: "Bright Horizons Project", 
      desc: "Helping post-secondary students navigate their next steps to self-sufficiency",
      icon: "fa-graduation-cap"
    },
    { 
      title: "Namanga Hope Center", 
      desc: "Outreach to vulnerable communities, founded by KBH alumnus Richard Nyinge",
      icon: "fa-hand-holding-heart"
    }
  ];

  // SUPPORTING PARTNERS - Organizations that support KBH
  const supportingPartners = [
    { 
      title: "Hope for Kajiado (HFK)", 
      desc: "Sustaining KBH through fundraising, campus improvements, and program development for over a decade",
      icon: "fa-building"
    },
    { 
      title: "Kenya Child Services", 
      desc: "Designated Kajiado Rescue Center for temporary placement of vulnerable children",
      icon: "fa-shield-alt"
    },
    { 
      title: "Community Outreach Program", 
      desc: "Education needs for orphans living with guardians",
      icon: "fa-hands-helping"
    },
    { 
      title: "Emergency Relief", 
      desc: "COVID-19, Drought, and Flood community relief projects",
      icon: "fa-ambulance"
    }
  ];

  const services = [
    { icon: "fa-heart", title: "Love & Christian Care" },
    { icon: "fa-utensils", title: "Food & Clothing" },
    { icon: "fa-book-open", title: "Quality Education" },
    { icon: "fa-star", title: "Hope for Future" },
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
      title="About Us"
      description="Kajiado Bright Horizons (KBH) has been home to multi-generations of vulnerable children since 1997. Learn about our mission to provide loving Christian care, shelter, education, and hope."
      path="/about"
      keywords={['about Kajiado Bright Horizons', 'childrens home history', 'mission', 'vision', 'Christian childrens home', 'Kenya charity']}
    />
      
      <div className="about-page">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="hero-bg-container">
            <div 
              className="hero-bg-image-about"
              style={{ backgroundImage: 'url("/images/hero/hero-bg4.jpg")' }}
            ></div>
            <div className="hero-overlay-dark"></div>
          </div>
          <div className="container">
            <div className="hero-content-about">
              <h1>About <span>Kajiado Bright Horizons</span></h1>
              <p>Home to multi-generations of vulnerable children since 1997</p>

            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="about-story">
          <div className="container">
            <div className="about-flex">
              <div className="about-text">
                <h2>Our <span>Story</span></h2>
                
                <p><strong>Kajiado Children's Home (KCH)</strong> has been home to multi-generations of vulnerable children since <strong>1997</strong>. KCH works closely with <strong>Kenya Child Services</strong> to identify children who are the most desperate in need, with those admitted having no family, access to parental oversight, nor having their basic needs for protection met.</p>
                
                <p>KCH provides physical and spiritual nourishment in a safe environment, supplemented by care from a loving staff, medical care, and educational needs through secondary school. The children come from different African tribes and grow up as sisters and brothers. Currently, there are over <strong>100 children</strong> being cared for at KCH.</p>
                
                <p>KCH is also a designated <strong>Kajiado Rescue Center</strong> for Kenya Child Services, which places vulnerable children on a temporary basis. These children can stay as little as a few days to many months depending on the needs of the child, with KCH absorbing the cost and care of these children.</p>
                
                <p>Alumni of KCH remain active as mentors, volunteers, and some even serve as local board of management or board of trustee members along with respected community leaders.</p>
                
                <div className="story-highlights">
                  <div className="highlight-item">
                    <span className="highlight-number">1997</span>
                    <span className="highlight-label">Year Founded</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-number">100+</span>
                    <span className="highlight-label">Children Cared For</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-number">27+</span>
                    <span className="highlight-label">Years of Service</span>
                  </div>
                </div>
              </div>
              <div className="about-img">
                <img src="/images/about/kajiado-home.jpg" alt="Kajiado Bright Horizons" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* What We Provide Section */}
        <section className="services-provided">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">What We <span>Provide</span></h2>
              <p className="section-subtitle">Comprehensive care for every child's development</p>
            </div>
            <div className="services-grid">
              {services.map((service, index) => (
                <div className="service-card" key={index}>
                  <div className="service-icon">
                    <i className={`fas ${service.icon}`}></i>
                  </div>
                  <h3>{service.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="mission-vision">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Our <span>Mission & Vision</span></h2>
            </div>
            <div className="mission-vision-grid">
              <div className="mission-card">
                <i className="fas fa-bible"></i>
                <h3>Our Mission</h3>
                <p>To provide holistic development to children, aiming at building strong Christians through evangelizing by word and deed, thus fulfill scripture <strong>Luke 2:52</strong>.</p>
                <div className="scripture-ref">
                  <i className="fas fa-quote-left"></i>
                  "And Jesus grew in wisdom and stature, and in favor with God and man."
                  <span>— Luke 2:52</span>
                </div>
              </div>
              <div className="vision-card">
                <i className="fas fa-church"></i>
                <h3>Our Vision</h3>
                <p>To have well molded and equipped Christians and so participate fully in God's call of mission and ministry.</p>
                <div className="vision-points">
                  <div className="vision-point">
                    <i className="fas fa-check-circle"></i>
                    <span>Well Molded Christians</span>
                  </div>
                  <div className="vision-point">
                    <i className="fas fa-check-circle"></i>
                    <span>Equipped for Ministry</span>
                  </div>
                  <div className="vision-point">
                    <i className="fas fa-check-circle"></i>
                    <span>Fulfilling God's Call</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="values-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Our <span>Core Values</span></h2>
              <p className="section-subtitle">The principles that guide everything we do</p>
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

        {/* Partner Programs */}


        {/* Supporting Partners */}
        <section className="supporting-partners-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Our Supporting <span>Partners</span></h2>
              <p className="section-subtitle">Organizations that support our mission</p>
            </div>
            <div className="supporting-partners-grid">
              {supportingPartners.map((partner, index) => (
                <div className="supporting-partner-card" key={index}>
                  <div className="partner-icon">
                    <i className={`fas ${partner.icon}`}></i>
                  </div>
                  <h3>{partner.title}</h3>
                  <p>{partner.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hope Partnership */}
        <section className="hope-partnership">
          <div className="container">
            <div className="hope-content">
              <h2>Hope for Kajiado <span>Partnership</span></h2>
              <p>Hope for Kajiado (HFK) support of KCH has evolved for over a decade, through campus improvements and increased programming. Capital projects have included facility improvements, property and farm enhancements, and a new state-of-the-art primary school to provide quality education.</p>
              <p>Programming improvements are reflected through improved on-campus medical care through added staffing, the Community Outreach Program (education needs for orphans living with a guardian), COVID-19, Drought and Flood community relief projects, and the Bright Horizons Project focused on helping post-secondary students navigate their next steps to self-sufficiency.</p>
            </div>
          </div>
        </section>

        {/* Child Sponsorship Section */}
        <section className="sponsorship-cta">
          <div className="container">
            <div className="sponsorship-cta-content">
              <h2><i className="fas fa-hands-helping"></i> Child Sponsorship Program</h2>
              <p>The Child Sponsorship Program at KCH enables you to have a direct impact on a child. One "sponsorship" partially covers the actual cost for each child, but your child knows you as their <strong>"American Mum or Dad"</strong>. They value the personal relationship developed over their childhood, and look forward to writing to you, and receiving your letters.</p>
              <p>If sponsorship is not right for you, become a <strong>"recurring donor"</strong> to help meet the many needs in these young lives. Are you able to join with us in helping these children achieve their goals?</p>
              <div className="sponsorship-cta-buttons">
                <Link to="/children" className="btn-gold">
                  <i className="fas fa-child"></i> Sponsor a Child
                </Link>
                <Link to="/donate" className="btn-outline">
                  <i className="fas fa-hand-holding-heart"></i> Become a Recurring Donor
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Help Us Transform Lives</h2>
              <p>Your support makes a direct impact on a child's future. Join us in helping these children achieve their dreams.</p>
              <div className="cta-buttons">
                <Link to="/donate" className="btn-gold">
                  <i className="fas fa-hand-holding-heart"></i> Donate Now
                </Link>
                <Link to="/get-involved" className="btn-outline-light">
                  <i className="fas fa-hands-helping"></i> Get Involved
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .about-page {
          background: var(--bg-deep);
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
          border: 2px solid #2563eb;
          padding: 12px 32px;
          border-radius: 50px;
          color: #2563eb;
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

        /* Story Section */
        .about-story {
          padding: 80px 0;
          background: var(--bg-deep);
        }

        .about-flex {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .about-text h2 {
          font-size: 2.5rem;
          margin-bottom: 24px;
          color: var(--text-color);
        }

        .about-text h2 span {
          color: var(--primary-color);
        }

        .about-text p {
          color: var(--text-muted);
          line-height: 1.8;
          margin-bottom: 16px;
          font-size: 1.05rem;
        }

        .about-text strong {
          color: var(--text-color);
        }

        .story-highlights {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 32px;
        }

        .highlight-item {
          text-align: center;
          padding: 20px;
          background: var(--card-bg);
          border-radius: 16px;
          border: 1px solid var(--border-color);
        }

        .highlight-number {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary-color);
        }

        .highlight-label {
          display: block;
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-top: 4px;
        }

        .about-img img {
          width: 100%;
          border-radius: 24px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        /* Services */
        .services-provided {
          padding: 80px 0;
          background: var(--card-bg);
        }

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

        .services-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .service-card {
          text-align: center;
          padding: 30px 20px;
          background: var(--bg-deep);
          border-radius: 16px;
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }

        .service-card:hover {
          transform: translateY(-5px);
          border-color: var(--primary-color);
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.1);
        }

        .service-icon {
          font-size: 2.5rem;
          margin-bottom: 12px;
          color: var(--primary-color);
        }

        .service-card h3 {
          color: var(--text-color);
          font-size: 1rem;
        }

        /* Mission & Vision */
        .mission-vision {
          padding: 80px 0;
          background: var(--bg-deep);
        }

        .mission-vision-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }

        .mission-card,
        .vision-card {
          background: var(--card-bg);
          padding: 40px;
          border-radius: 24px;
          text-align: center;
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }

        .mission-card:hover,
        .vision-card:hover {
          border-color: var(--primary-color);
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.15);
        }

        .mission-card i,
        .vision-card i {
          font-size: 2.5rem;
          color: var(--primary-color);
          margin-bottom: 20px;
        }

        .mission-card h3,
        .vision-card h3 {
          font-size: 1.8rem;
          margin-bottom: 16px;
          color: var(--text-color);
        }

        .mission-card p,
        .vision-card p {
          color: var(--text-muted);
          line-height: 1.8;
          font-size: 1.05rem;
        }

        .mission-card strong {
          color: var(--primary-color);
        }

        .scripture-ref {
          margin-top: 20px;
          padding: 16px;
          background: rgba(59, 130, 246, 0.05);
          border-radius: 12px;
          border-left: 3px solid var(--primary-color);
          font-style: italic;
          color: var(--text-color);
          line-height: 1.6;
        }

        .scripture-ref i {
          color: var(--primary-color);
          margin-right: 8px;
          font-size: 0.8rem;
        }

        .scripture-ref span {
          display: block;
          margin-top: 8px;
          font-weight: 600;
          color: var(--primary-color);
          font-style: normal;
        }

        .vision-points {
          margin-top: 20px;
          text-align: left;
        }

        .vision-point {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid var(--border-color);
          color: var(--text-muted);
        }

        .vision-point:last-child {
          border-bottom: none;
        }

        .vision-point i {
          color: var(--primary-color);
          font-size: 1.1rem;
          min-width: 20px;
        }

        .vision-point span {
          color: var(--text-color);
        }

        /* Core Values */
        .values-section {
          padding: 80px 0;
          background: var(--card-bg);
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .value-card {
          text-align: center;
          padding: 30px;
          background: var(--bg-deep);
          border-radius: 16px;
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }

        .value-card:hover {
          transform: translateY(-5px);
          border-color: var(--primary-color);
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.1);
        }

        .value-letter {
          width: 60px;
          height: 60px;
          margin: 0 auto 16px;
          background: var(--primary-color);
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 700;
        }

        .value-card h3 {
          color: var(--text-color);
          font-size: 1.1rem;
        }

        /* Partner Programs */
        .partner-programs-section {
          padding: 80px 0;
          background: var(--bg-deep);
        }

        .partner-programs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        .partner-program-card {
          background: var(--card-bg);
          padding: 32px;
          border-radius: 24px;
          text-align: center;
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }

        .partner-program-card:hover {
          border-color: var(--primary-color);
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.15);
        }

        .partner-icon {
          font-size: 2.5rem;
          margin-bottom: 16px;
          color: var(--primary-color);
        }

        .partner-program-card h3 {
          font-size: 1.2rem;
          margin-bottom: 12px;
          color: var(--text-color);
        }

        .partner-program-card p {
          color: var(--text-muted);
          line-height: 1.6;
        }

        /* Supporting Partners */
        .supporting-partners-section {
          padding: 80px 0;
          background: var(--card-bg);
        }

        .supporting-partners-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }

        .supporting-partner-card {
          background: var(--bg-deep);
          padding: 32px;
          border-radius: 24px;
          text-align: center;
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }

        .supporting-partner-card:hover {
          border-color: var(--primary-color);
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.15);
        }

        .supporting-partner-card h3 {
          font-size: 1.2rem;
          margin-bottom: 12px;
          color: var(--text-color);
        }

        .supporting-partner-card p {
          color: var(--text-muted);
          line-height: 1.6;
          font-size: 0.9rem;
        }

        /* Hope Partnership */
        .hope-partnership {
          padding: 80px 0;
          background: var(--bg-deep);
        }

        .hope-content {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .hope-content h2 {
          font-size: 2.5rem;
          margin-bottom: 24px;
          color: var(--text-color);
        }

        .hope-content h2 span {
          color: var(--primary-color);
        }

        .hope-content p {
          color: var(--text-muted);
          line-height: 1.8;
          font-size: 1.05rem;
          margin-bottom: 16px;
        }

        /* Sponsorship CTA */
        .sponsorship-cta {
          padding: 80px 0;
          background: var(--card-bg);
        }

        .sponsorship-cta-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .sponsorship-cta-content h2 {
          font-size: 2rem;
          color: var(--primary-color);
          margin-bottom: 24px;
        }

        .sponsorship-cta-content h2 i {
          margin-right: 12px;
        }

        .sponsorship-cta-content p {
          color: var(--text-muted);
          line-height: 1.8;
          margin-bottom: 20px;
          font-size: 1.05rem;
        }

        .sponsorship-cta-content strong {
          color: var(--text-color);
        }

        .sponsorship-cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 32px;
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
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .partner-programs-grid {
            grid-template-columns: 1fr 1fr;
          }
          
          .supporting-partners-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 968px) {
          .about-flex {
            grid-template-columns: 1fr;
          }
          
          .mission-vision-grid {
            grid-template-columns: 1fr;
          }
          
          .values-grid {
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

          .services-grid {
            grid-template-columns: 1fr 1fr;
          }
          
          .partner-programs-grid {
            grid-template-columns: 1fr;
          }
          
          .supporting-partners-grid {
            grid-template-columns: 1fr;
          }
          
          .story-highlights {
            grid-template-columns: 1fr 1fr;
          }

          .section-title {
            font-size: 1.8rem;
          }

          .about-text h2 {
            font-size: 2rem;
          }

          .hope-content h2 {
            font-size: 1.8rem;
          }

          .sponsorship-cta-content h2 {
            font-size: 1.5rem;
          }

          .sponsorship-cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .cta-content h2 {
            font-size: 1.8rem;
          }

          .values-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 480px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
          
          .values-grid {
            grid-template-columns: 1fr;
          }
          
          .story-highlights {
            grid-template-columns: 1fr;
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
        }
      `}</style>
    </>
  );
}