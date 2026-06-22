import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import './styles.css';

export default function Programs() {
  const programs = [
    {
      id: "valley-school",
      title: "Valley School of Excellence",
      icon: "",
      badge: "Education Program",
      image: "/images/programs/valley-school.jpg",
      description: "State-of-the-art primary school providing quality education to KBH children and the community.",
      details: [
        "Private primary school located on KBH campus",
        "Competency-based curriculum for knowledge, skills and attitudes",
        "Learner-centered system from ECD to Grade 6",
        "State-of-the-art facilities with latest technology",
        "Spacious classrooms, library, computer lab",
        "Music, art programming and recreational areas",
        "Open to all children in Kajiado area",
        "Junior high expansion (Grades 7-9) planned for 2025"
      ],
      impact: "60+ students enrolled",
      supportText: "Support KVSE with your financial donation to help cover school books, supplies and programming to enhance their education."
    },
    {
      id: "bright-horizons",
      title: "Bright Horizons Project",
      icon: "",
      badge: "Mentorship Program",
      image: "/images/programs/bright-horizons.jpg",
      description: "Helping post-secondary students navigate their next steps to self-sufficiency.",
      details: [
        "Mentorship program led by American and Kenyan volunteers",
        "Assists secondary and post-secondary students with next steps",
        "Annual structured workshops for skill development",
        "Career Readiness and Tech Training workshops",
        "Training in computing and digital marketing",
        "ADT-compliant CV creation and job search skills",
        "Career options research and networking",
        "Support for Maasai students facing unique challenges"
      ],
      impact: "15+ students in higher education",
      supportText: "Make a significant impact on helping these young adults achieve their goals of self-sufficiency."
    },
    {
      id: "namanga-hope-center",
      title: "Namanga Hope Center",
      icon: "",
      badge: "Community Outreach",
      image: "/images/programs/namanga-hope-center.jpg",
      description: "Providing love and hope to orphans, vulnerable children, the needy and the elderly.",
      details: [
        "Founded by Richard Nyinge, KBH alumnus (admitted 1997 at age 6)",
        "Provides love and hope to orphans and vulnerable children",
        "Assists with educational and health needs",
        "Provides clothing, food and school fees for 85+ vulnerable children",
        "Food staples for 20+ families in abject poverty",
        "Child mentorship programs with life teachings",
        "Bible study to enrich faith",
        "Richard and friends mentor KBH students"
      ],
      impact: "100+ people served monthly",
      supportText: "Join us in supporting Namanga Hope Center as they expand their services to the vulnerable in their community."
    }
  ];

  const otherPrograms = [
    {
      title: "Community Outreach Program",
      description: "Education needs for orphans living with guardians, ensuring they receive support even when not residing at KBH.",
      icon: "🌾"
    },
    {
      title: "Emergency Relief Program",
      description: "COVID-19, Drought and Flood community relief projects supporting vulnerable families in times of crisis.",
      icon: "🆘"
    },
    {
      title: "Child Sponsorship Program",
      description: "Direct impact on a child's life through monthly sponsorship, covering education, meals, and care.",
      icon: "👧",
      link: "/children"
    },
    {
      title: "Medical Care Program",
      description: "On-campus medical care through added staffing, ensuring children's health needs are met.",
      icon: "🏥"
    }
  ];

  return (
    <>
      <SEO 
        title="Our Programs - kajiado Bright Horizons"
        description="Discover kajiado Bright Horizons programs including Valley School of Excellence, Bright Horizons Project, and Namanga Hope Center. Support education, mentorship, and community outreach."
        path="/programs"
      />
      
      <div className="programs-page">
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
              <h1>Our <span>Programs</span></h1>
              <p>Transforming lives through education, mentorship, and community outreach</p>
            </div>
          </div>
        </section>

        {/* Main Programs */}
        {programs.map((program, index) => (
          <section key={program.id} className={`program-detail ${index % 2 === 1 ? 'program-detail-alt' : ''}`}>
            <div className="container">
              <div className="program-detail-grid">
                <div className="program-detail-image">
                  <img 
                    src={program.image} 
                    alt={program.title}
                    onError={(e) => {
                      e.target.src = `https://placehold.co/600x400/2563EB/white?text=${encodeURIComponent(program.title)}`;
                    }}
                  />
                  <div className="program-badge">{program.badge}</div>
                </div>
                <div className="program-detail-content">
                  <div className="program-icon-large">{program.icon}</div>
                  <h2>{program.title}</h2>
                  <p className="program-description">{program.description}</p>
                  
                  <div className="program-details-list">
                    <h3>What We Do:</h3>
                    <ul>
                      {program.details.map((detail, i) => (
                        <li key={i}>
                          <i className="fas fa-check-circle"></i>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="program-impact">
                    <i className="fas fa-chart-line"></i>
                    <span><strong>Impact:</strong> {program.impact}</span>
                  </div>
                  
                  <div className="program-support">
                    <p>{program.supportText}</p>
                    <div className="program-buttons">
                      <Link to="/donate" className="btn-gold">
                        <i className="fas fa-hand-holding-heart"></i> Support This Program
                      </Link>
                      <Link to="/contact" className="btn-outline">
                        <i className="fas fa-envelope"></i> Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Other Programs Section */}
        <section className="other-programs">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Additional <span>Programs</span></h2>
              <p className="section-subtitle">More ways we support children and families</p>
            </div>
            <div className="other-programs-grid">
              {otherPrograms.map((program, index) => (
                <div key={index} className="other-program-card">
                  <div className="other-program-icon">{program.icon}</div>
                  <h3>{program.title}</h3>
                  <p>{program.description}</p>
                  {program.link && (
                    <Link to={program.link} className="program-link">
                      Learn More <i className="fas fa-arrow-right"></i>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Alumni Success Story */}
        <section className="alumni-story">
          <div className="container">
            <div className="alumni-content">
              <i className="fas fa-quote-left"></i>
              <h2>From KBH to Community Leader</h2>
              <p>"Namanga Hope Center was founded by <strong>Richard Nyinge</strong>, an alumnus of KBH who was admitted in 1997 as a six-year-old orphan. He received nurturing at KBH throughout his childhood. His sponsor remained active in his life, assisting in his educational goals to attain a Master's degree in Divinity. Richard is now senior pastor of his church in Namanga, Kenya."</p>
              <p className="alumni-message">Richard visits KBH often. He and his friends provide mentorship to KBH secondary and post-secondary students as they navigate their pathways to further education or entrepreneurship.</p>
              <div className="alumni-quote">
                <p>"The safety of these children is closely monitored to ensure they are cared for until they return to KBH."</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Support Our Programs</h2>
              <p>Your donation directly impacts education, mentorship, and community outreach</p>
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
        .programs-page {
          min-height: 100vh;
        }
        
        .program-detail {
          padding: 80px 0;
          background: var(--bg-deep);
        }
        
        .program-detail-alt {
          background: #080808;
        }
        
        .program-detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          align-items: center;
        }
        
        .program-detail-image {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
        }
        
        .program-detail-image img {
          width: 100%;
          height: 400px;
          object-fit: cover;
        }
        
        .program-badge {
          position: absolute;
          top: 20px;
          left: 20px;
          background: var(--primary-color);
          color: #0a0a0a;
          padding: 6px 16px;
          border-radius: 30px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        
        .program-icon-large {
          font-size: 3.5rem;
          margin-bottom: 16px;
        }
        
        .program-detail-content h2 {
          font-size: 2rem;
          margin-bottom: 16px;
          color: #fff;
        }
        
        .program-description {
          font-size: 1.1rem;
          color: var(--text-muted);
          margin-bottom: 24px;
          line-height: 1.6;
        }
        
        .program-details-list {
          margin: 24px 0;
        }
        
        .program-details-list h3 {
          font-size: 1.1rem;
          margin-bottom: 12px;
          color: var(--primary-color);
        }
        
        .program-details-list ul {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        
        .program-details-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-muted);
          font-size: 0.9rem;
        }
        
        .program-details-list li i {
          color: var(--primary-color);
          font-size: 0.8rem;
        }
        
        .program-impact {
          background: rgba(59, 130, 246, 0.1);
          padding: 12px 16px;
          border-radius: 12px;
          margin: 20px 0;
          display: inline-block;
        }
        
        .program-impact i {
          color: var(--primary-color);
          margin-right: 8px;
        }
        
        .program-impact strong {
          color: #fff;
        }
        
        .program-support {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid var(--border-color);
        }
        
        .program-support p {
          color: var(--text-muted);
          margin-bottom: 20px;
          line-height: 1.6;
        }
        
        .program-buttons {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        
        .other-programs {
          padding: 90px 0;
          background: #080808;
        }
        
        .other-programs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
          margin-top: 40px;
        }
        
        .other-program-card {
          background: var(--card-bg);
          padding: 32px;
          border-radius: 20px;
          text-align: center;
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }
        
        .other-program-card:hover {
          border-color: var(--primary-color);
          transform: translateY(-5px);
        }
        
        .other-program-icon {
          font-size: 2.5rem;
          margin-bottom: 16px;
        }
        
        .other-program-card h3 {
          font-size: 1.2rem;
          margin-bottom: 12px;
        }
        
        .other-program-card p {
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 16px;
        }
        
        .other-program-card .program-link {
          color: var(--primary-color);
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: gap 0.3s ease;
        }
        
        .alumni-story {
          padding: 80px 0;
          background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
          color: white;
        }
        
        .alumni-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }
        
        .alumni-content i {
          font-size: 3rem;
          opacity: 0.5;
          margin-bottom: 20px;
        }
        
        .alumni-content h2 {
          font-size: 2rem;
          margin-bottom: 24px;
        }
        
        .alumni-content p {
          font-size: 1.1rem;
          line-height: 1.8;
          margin-bottom: 20px;
          opacity: 0.95;
        }
        
        .alumni-message {
          font-style: italic;
          border-left: 3px solid rgba(255,255,255,0.5);
          padding-left: 20px;
          margin-top: 20px;
        }
        
        .alumni-quote {
          background: rgba(255,255,255,0.1);
          padding: 20px;
          border-radius: 16px;
          margin-top: 30px;
        }
        
        @media (max-width: 968px) {
          .program-detail-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          
          .program-detail-image img {
            height: 300px;
          }
          
          .program-details-list ul {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 768px) {
          .program-detail {
            padding: 60px 0;
          }
          
          .program-detail-content h2 {
            font-size: 1.5rem;
          }
          
          .program-buttons {
            flex-direction: column;
          }
          
          .alumni-content h2 {
            font-size: 1.5rem;
          }
          
          .alumni-content p {
            font-size: 1rem;
          }
          
          .other-programs {
            padding: 60px 0;
          }
        }
      `}</style>
    </>
  );
}