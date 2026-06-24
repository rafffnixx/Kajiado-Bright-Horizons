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
      logo: "/images/partners/kajiado-valley-school.jpg"
    },
    { 
      icon: "🎓", 
      title: "Bright Horizons Project", 
      desc: "Helping post-secondary students navigate their next steps to self-sufficiency",
      logo: "/images/partners/bright-horizons.jpg"
    },
    { 
      icon: "🍲", 
      title: "Namanga Hope Center", 
      desc: "Outreach to vulnerable communities, founded by KBH alumnus Richard Nyinge",
      logo: "/images/partners/namanga-hope-center.jpg"
    }
  ];

  // SUPPORTING PARTNERS - Organizations that support KBH
  const supportingPartners = [
    { 
      icon: "🌟", 
      title: "Hope for Kajiado (HFK)", 
      desc: "Sustaining KBH through fundraising, campus improvements, and program development for over a decade",
      logo: "/images/partners/hope-for-kajiado.jpg"
    },
    { 
      icon: "🤝", 
      title: "Kenya Child Services", 
      desc: "Designated Kajiado Rescue Center for temporary placement of vulnerable children",
      logo: "/images/partners/kenya-child-services.png"
    },
    { 
      icon: "🌾", 
      title: "Community Outreach Program", 
      desc: "Education needs for orphans living with guardians",
      logo: "/images/partners/community-outreach.png"
    },
    { 
      icon: "🆘", 
      title: "Emergency Relief", 
      desc: "COVID-19, Drought, and Flood community relief projects",
      logo: "/images/partners/emergency-relief.png"
    }
  ];

  const services = [
    { icon: "❤️", title: "Love & Christian Care" },
    { icon: "🍲", title: "Nutritious Food" },
    { icon: "📚", title: "Quality Education" },
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
                <p>Kajiado Bright Horizons (KBH) has been home to multi-generations of vulnerable children since <strong>1997</strong>. KBH works closely with Kenya Child Services to identify children who are the most desperate in need, with those admitted having no family, access to parental oversight, nor having their basic needs for protection met.</p>
                <p>KBH provides physical and spiritual nourishment in a safe environment, supplemented by care from a loving staff, medical care, and educational needs through secondary school. The children come from different African tribes and grow up as sisters and brothers. Currently, there are over <strong>100 children</strong> being cared for at KBH.</p>
                <p>KBH is also a designated <strong>Kajiado Rescue Center</strong> for Kenya Child Services, which places vulnerable children on a temporary basis. These children can stay as little as a few days to many months depending on their needs, with KBH absorbing the cost and care of these children.</p>
                <p>Alumni of KBH remain active as mentors, volunteers, and some even serve as local board of management or board of trustee members alongside respected community leaders.</p>
              </div>
              <div className="about-img">
                <img src="/images/about/kajiado-home.jpg" alt="Kajiado Bright Horizons" loading="lazy" />
              </div>
            </div>
          </div>
        </section>


        {/* Mission & Vision Section - UPDATED */}
        <section className="mission-vision">
          <div className="container">
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
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Programs Section with Logos */}
        <section className="partner-programs-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Partner <span>Programs</span></h2>
              <p className="section-subtitle">Collaborative initiatives transforming lives through partnership</p>
            </div>
            <div className="partner-programs-grid">
              {partnerPrograms.map((program, index) => (
                <div className="partner-program-card" key={index}>
                  <div className="partner-logo-container">
                    <img 
                      src={program.logo} 
                      alt={`${program.title} Logo`} 
                      className="partner-logo"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `
                          <div class="partner-logo-fallback">${program.icon}</div>
                        `;
                      }}
                    />
                  </div>
                  <h3>{program.title}</h3>
                  <p>{program.desc}</p>
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

        {/* Child Sponsorship Section */}
        <section className="sponsorship-cta">
          <div className="container">
            <div className="sponsorship-cta-content">
              <h2>Child Sponsorship Program</h2>
              <p>The Child Sponsorship Program at KBH enables you to have a direct impact on a child. A sponsorship partially covers the actual cost for each child, and your sponsored child knows you as their special supporter. They value the personal relationship developed throughout their childhood and look forward to writing to you and receiving your letters.</p>
              <p>If sponsorship isn't right for you, consider becoming a <strong>recurring donor</strong> to help meet the many needs of these young lives. Will you join us in helping these children achieve their goals?</p>
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
                <Link to="/contact" className="btn-outline">
                  <i className="fas fa-envelope"></i> Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .hope-partnership {
          padding: 80px 0;
          background: var(--bg-deep);
          transition: background 0.3s ease;
        }
        
        .hope-content h2 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 24px;
          color: var(--text-color);
        }
        
        .hope-content h2 span {
          color: var(--primary-color);
        }
        
        .hope-content > p {
          text-align: center;
          color: var(--text-muted);
          max-width: 800px;
          margin: 0 auto 48px;
          line-height: 1.8;
        }
        
        .hope-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
        }
        
        .hope-item {
          background: var(--card-bg);
          padding: 32px;
          border-radius: 20px;
          text-align: center;
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }
        
        .hope-item:hover {
          border-color: var(--primary-color);
          transform: translateY(-5px);
        }
        
        .hope-item i {
          font-size: 2.5rem;
          color: var(--primary-color);
          margin-bottom: 16px;
        }
        
        .hope-item h4 {
          font-size: 1.2rem;
          margin-bottom: 12px;
          color: var(--text-color);
        }
        
        .hope-item p {
          color: var(--text-muted);
          line-height: 1.6;
        }
        
        /* Mission & Vision Section */
        .mission-vision {
          padding: 80px 0;
          background: var(--bg-deep);
          border-bottom: 1px solid var(--border-color);
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
        
        /* Partner Programs Section */
        .partner-programs-section {
          padding: 90px 0;
          background: var(--bg-deep);
          transition: background 0.3s ease;
        }
        
        .partner-programs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
          margin-top: 40px;
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
        
        .partner-program-card h3 {
          font-size: 1.2rem;
          margin-bottom: 12px;
          color: var(--text-color);
        }
        
        .partner-program-card p {
          color: var(--text-muted);
          line-height: 1.6;
          font-size: 0.9rem;
        }
        
        /* Supporting Partners Section */
        .supporting-partners-section {
          padding: 90px 0;
          background: var(--bg-deep);
          transition: background 0.3s ease;
        }
        
        .supporting-partners-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
          margin-top: 40px;
        }
        
        .supporting-partner-card {
          background: var(--card-bg);
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
        
        /* Partner Logo Styles */
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
        
        .partner-program-card:hover .partner-logo-container,
        .supporting-partner-card:hover .partner-logo-container {
          border-color: var(--primary-color);
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.15);
        }
        
        .partner-logo {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.3s ease;
        }
        
        .partner-program-card:hover .partner-logo,
        .supporting-partner-card:hover .partner-logo {
          transform: scale(1.05);
        }
        
        .partner-logo-fallback {
          font-size: 2.5rem;
        }
        
        .sponsorship-cta {
          padding: 80px 0;
          background: var(--bg-deep);
          transition: background 0.3s ease;
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
        
        .sponsorship-cta-content p {
          color: var(--text-muted);
          line-height: 1.8;
          margin-bottom: 20px;
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
        
        @media (max-width: 968px) {
          .hope-grid,
          .partner-programs-grid,
          .supporting-partners-grid {
            grid-template-columns: 1fr;
          }
          
          .mission-vision-grid {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 768px) {
          .hope-partnership,
          .partner-programs-section,
          .supporting-partners-section {
            padding: 60px 0;
          }
          
          .hope-content h2 {
            font-size: 1.8rem;
          }
          
          .sponsorship-cta {
            padding: 60px 0;
          }
          
          .sponsorship-cta-content h2 {
            font-size: 1.5rem;
          }
          
          .sponsorship-cta-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .mission-card,
          .vision-card {
            padding: 30px 20px;
          }
          
          .mission-card h3,
          .vision-card h3 {
            font-size: 1.5rem;
          }
          
          .partner-logo-container {
            width: 100px;
            height: 100px;
            padding: 16px;
          }
        }
      `}</style>
    </>
  );
}