import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Home() {
  const [stats, setStats] = useState({
    children: 0,
    volunteers: 0,
    partners: 0,
    years: 0
  });

  const [currentHero, setCurrentHero] = useState(0);
  const [currentAboutImage, setCurrentAboutImage] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const statsRef = useRef(null);
  const programsRef = useRef(null);
  const aboutRef = useRef(null);

  const heroMessages = [
    {
      title: "Kajiado Bright Horizons",
      subtitle: "Providing hope for the vulnerable, one child at a time",
      description: "Transforming lives through love, education, and faith since 1997",
      bgImage: "/images/hero/hero-bg.jpg"
    },
    {
      title: "Every Child Deserves a Chance",
      subtitle: "Help us provide shelter, food, and education",
      description: "Your support changes lives forever",
      bgImage: "/images/hero/hero-bg2.jpg"
    },
    {
      title: "Building Bright Futures",
      subtitle: "Together we can break the cycle of poverty",
      description: "Join us in making a difference today",
      bgImage: "/images/hero/hero-bg3.jpg"
    },
    {
      title: "Hope Starts Here",
      subtitle: "One child, one dream, one future at a time",
      description: "Be part of their journey to success",
      bgImage: "/images/hero/hero-bg4.jpg"
    }
  ];

  const aboutImages = [
    { src: "/images/about/kajiado-home.jpg", alt: "Kajiado Bright Horizons", caption: "Our Home" },
    { src: "/images/children/happy-children.jpg", alt: "Happy Children", caption: "Happy Children" },
    { src: "/images/about/founder.jpg", alt: "Founder", caption: "Our Founder" },
    { src: "/images/staff/staff1.jpg", alt: "Staff", caption: "Dedicated Staff" }
  ];

  // Core Programs with LOGOS only (no icons)
  const corePrograms = [
    { 
      id: 'education', 
      title: 'Kajiado Valley School of Excellence', 
      desc: 'Provides quality early childhood and primary education, nurturing young learners and supporting the mission of Kajiado Bright Horizons',
      logo: '/images/partners/kajiado-valley-school.jpg',
      stats: '50+ students enrolled'
    },
    { 
      id: 'healthcare', 
      title: 'Bright Horizon Program', 
      desc: 'Helping post-secondary students navigate their next steps to self-sufficiency.',
      logo: '/images/partners/bright-horizons.jpg',
      stats: '20+ alumni supported'
    },
    { 
      id: "shelter", 
      title: "Namanga Hope Center", 
      desc: "Providing love, care, and hope to orphans, vulnerable children, the needy, and the elderly through education, mentorship, food support, and faith-based guidance.",
      logo: '/images/partners/namanga-hope-center.jpg',
      stats: '100+ lives impacted'
    },

  ];

  // Intersection Observer for scroll animations
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

    if (statsRef.current) observer.observe(statsRef.current);
    if (programsRef.current) observer.observe(programsRef.current);
    if (aboutRef.current) observer.observe(aboutRef.current);

    return () => observer.disconnect();
  }, []);

  // Animated counter effect
  useEffect(() => {
    const counters = [
      { key: 'children', target: 450, duration: 2000 },
      { key: 'volunteers', target: 90, duration: 2000 },
      { key: 'partners', target: 20, duration: 2000 },
      { key: 'years', target: 27, duration: 1500 }
    ];

    counters.forEach(counter => {
      const steps = 60;
      const increment = counter.target / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= counter.target) {
          setStats(prev => ({ ...prev, [counter.key]: counter.target }));
          clearInterval(interval);
        } else {
          setStats(prev => ({ ...prev, [counter.key]: Math.floor(current) }));
        }
      }, counter.duration / steps);
    });
  }, []);

  // Rotate hero message every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroMessages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroMessages.length]);

  // Rotate about images every 8 seconds (slower)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAboutImage((prev) => (prev + 1) % aboutImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [aboutImages.length]);

  return (
    <>
      <SEO 
        title="Kajiado Bright Horizons - Providing Hope & Care to Vulnerable Children"
        description="Kajiado Bright Horizons provides shelter, education, healthcare, and love to orphaned and vulnerable children in Kajiado, Kenya. Support us through donations, sponsorship, or volunteering."
        path="/"
      />
      
      <div className="home-page">
        {/* Hero Section with Smooth Crossfade */}
        <div className="hero-slider">
          {heroMessages.map((message, index) => (
            <div
              key={index}
              className={`hero-slide ${currentHero === index ? 'active' : ''}`}
            >
              <div 
                className="hero-bg-image"
                style={{ backgroundImage: `url(${message.bgImage})` }}
              >
                <div className="hero-overlay"></div>
              </div>
              <div className="hero-content-wrapper">
                <div className="container">
                  <div className="hero-text">
                    <h1 className="hero-title">{message.title}</h1>
                    <p className="hero-subtitle">{message.subtitle}</p>
                    <p className="hero-description">{message.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Hero Dots Indicator */}
          <div className="hero-dots">
            {heroMessages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentHero(index)}
                className={`hero-dot ${currentHero === index ? 'active' : ''}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mission & Vision Section - UPDATED */}
        <div className="mission-vision-section">
          <div className="container">
            <div className="mission-vision-grid">
              <div className="mission-card">
                <div className="mv-icon">
                  <i className="fas fa-bible"></i>
                </div>
                <h3>Our Mission</h3>
                <p>
                  To provide holistic development to children, aiming at building strong Christians through evangelizing by word and deed, thus fulfill scripture <strong>Luke 2:52</strong>.
                </p>
                <div className="scripture-ref">
                  <i className="fas fa-quote-left"></i>
                  "And Jesus grew in wisdom and stature, and in favor with God and man."
                  <span>— Luke 2:52</span>
                </div>
              </div>
              <div className="vision-card">
                <div className="mv-icon">
                  <i className="fas fa-church"></i>
                </div>
                <h3>Our Vision</h3>
                <p>
                  To have well molded and equipped Christians and so participate fully in God's call of mission and ministry.
                </p>
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
        </div>

        {/* Stats Counter Section */}
        <div 
          ref={statsRef}
          id="stats"
          className={`stats-counter-section ${isVisible.stats ? 'visible' : ''}`}
        >
          <div className="container">
            <div className="stats-grid">
              <div className="stat-card">
                <i className="fas fa-child"></i>
                <h3>{stats.children}+</h3>
                <p>Children Cared For</p>
              </div>
              <div className="stat-card">
                <i className="fas fa-hands-helping"></i>
                <h3>{stats.volunteers}+</h3>
                <p>Active Volunteers</p>
              </div>
              <div className="stat-card">
                <i className="fas fa-handshake"></i>
                <h3>{stats.partners}+</h3>
                <p>Partner Organizations</p>
              </div>
              <div className="stat-card">
                <i className="fas fa-calendar-alt"></i>
                <h3>{stats.years}+</h3>
                <p>Years of Service</p>
              </div>
            </div>
          </div>
        </div>

        {/* About Section with Rotating Image Slider */}
        <div 
          ref={aboutRef}
          id="about"
          className={`about-preview ${isVisible.about ? 'visible' : ''}`}
        >
          <div className="container">
            <div className="about-flex">
              <div className="about-text">
                <h2>About <span>Kajiado Bright Horizons</span></h2>
                <p>Kajiado Bright Horizons (KBH) has been home to multi-generations of vulnerable children since <strong>1997</strong>. KBH works closely with Kenya Child Services to identify children who are the most desperate in need, with those admitted having no family, access to parental oversight, nor have their basic needs for protection met.</p>
                <p>KBH provides physical and spiritual nourishment in a safe environment, supplemented by care by a loving staff, medical care and educational needs through secondary school. The children come from different African tribes and grow up as sisters and brothers. Currently, there are over <strong>100 children</strong> being cared for at KBH.</p>
                <p>KBH is also a designated <strong>Kajiado Rescue Center</strong> for Kenya Child Services, who places vulnerable children on a temporary basis. Alumni of KBH remain active as mentors, volunteers, and some even serve as local board members.</p>
                <Link to="/about" className="btn-outline">
                  Read Our Story <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
              <div className="about-image-slider">
                {aboutImages.map((image, index) => (
                  <div
                    key={index}
                    className={`about-slide ${currentAboutImage === index ? 'active' : ''}`}
                  >
                    <img 
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      onError={(e) => e.target.src = 'https://placehold.co/500x400/e2e8f0/3b82f6?text=' + image.alt}
                    />
                    <div className="about-slide-caption">{image.caption}</div>
                  </div>
                ))}
                
                {/* About Image Dots */}
                <div className="about-image-dots">
                  {aboutImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentAboutImage(index)}
                      className={`about-dot ${currentAboutImage === index ? 'active' : ''}`}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Programs Section with LOGOS */}
        <div 
          ref={programsRef}
          id="programs"
          className={`programs-section ${isVisible.programs ? 'visible' : ''}`}
        >
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Our <span>Core Programs</span></h2>
              <p className="section-subtitle">Comprehensive care and support for every child's development</p>
            </div>
            <div className="programs-grid">
              {corePrograms.map((program) => (
                <div key={program.id} className="program-card">
                  <div className="program-logo-container">
                    <img 
                      src={program.logo} 
                      alt={`${program.title} Logo`} 
                      className="program-logo"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `
                          <div class="program-logo-fallback">${program.title.charAt(0)}</div>
                        `;
                      }}
                    />
                  </div>
                  <h3>{program.title}</h3>
                  <p className="program-description">{program.desc}</p>
                  <div className="program-stats">
                    <i className="fas fa-users"></i> {program.stats}
                  </div>
                  <Link to="/get-involved" className="program-link">
                    Support This Program <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="testimonial-section">
          <div className="container">
            <div className="testimonial-card">
              <i className="fas fa-quote-left"></i>
              <p>"Kajiado Bright Horizons gave me a second chance at life. Today, I'm a social worker helping children just like me. Richard Nyinge, founder of Namanga Hope Center, was admitted to KBH in 1997 as a six-year-old orphan and went on to earn a Master's degree in Divinity."</p>
              <h4>— KBH Alumni Success Story</h4>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Help Us Transform Lives</h2>
              <p>Your donation, sponsorship, or volunteer time makes a direct impact on a child's future. Join us in helping these children achieve their goals.</p>
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
        </div>
      </div>

      <style>{`
        /* Mission & Vision Section */
        .mission-vision-section {
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
        
        .mv-icon {
          width: 70px;
          height: 70px;
          margin: 0 auto 20px;
          background: rgba(59, 130, 246, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: var(--primary-color);
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
        
        /* Core Programs with Logo Styles */
        .programs-section {
          padding: 90px 0;
          background: var(--bg-deep);
          transition: all 0.6s ease-out;
          transform: translateY(30px);
          opacity: 0;
        }
        
        .programs-section.visible {
          transform: translateY(0);
          opacity: 1;
        }
        
        .programs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
          margin-top: 40px;
        }
        
        .program-card {
          background: var(--card-bg);
          padding: 32px;
          border-radius: 24px;
          text-align: center;
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }
        
        .program-card:hover {
          border-color: var(--primary-color);
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.15);
        }
        
        .program-logo-container {
          width: 140px;
          height: 140px;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          overflow: hidden;
          padding: 24px;
          border: 2px solid var(--border-color);
          transition: all 0.3s ease;
        }
        
        .program-card:hover .program-logo-container {
          border-color: var(--primary-color);
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.15);
        }
        
        .program-logo {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.3s ease;
        }
        
        .program-card:hover .program-logo {
          transform: scale(1.05);
        }
        
        .program-logo-fallback {
          font-size: 3.5rem;
          font-weight: 800;
          color: var(--primary-color);
          background: rgba(59, 130, 246, 0.1);
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .program-card h3 {
          font-size: 1.2rem;
          margin-bottom: 12px;
          color: var(--text-color);
        }
        
        .program-description {
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 16px;
          font-size: 0.95rem;
        }
        
        .program-stats {
          background: rgba(59, 130, 246, 0.1);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          color: var(--primary-color);
          font-weight: 500;
          display: inline-block;
          margin-bottom: 16px;
        }
        
        .program-link {
          color: var(--primary-color);
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: gap 0.3s ease;
        }
        
        .program-link:hover {
          gap: 12px;
        }
        
        @media (max-width: 968px) {
          .mission-vision-grid {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 768px) {
          .programs-grid {
            grid-template-columns: 1fr;
          }
          
          .programs-section {
            padding: 60px 0;
          }
          
          .program-logo-container {
            width: 120px;
            height: 120px;
            padding: 20px;
          }
          
          .mission-card,
          .vision-card {
            padding: 30px 20px;
          }
          
          .mission-card h3,
          .vision-card h3 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </>
  );
}