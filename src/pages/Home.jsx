// src/pages/Home.jsx
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import OptimizedImage from '../components/OptimizedImage';

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
      stats: '50+ students enrolled',
      link: 'https://kvse.sc.ke/'
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
        title="Home"
        description="Kajiado Bright Horizons provides shelter, education, healthcare, and love to orphaned and vulnerable children in Kajiado, Kenya. Support us through donations, sponsorship, or volunteering."
        path="/"
        keywords={['Kajiado Bright Horizons', 'childrens home', 'orphanage Kenya', 'child sponsorship', 'donate to charity', 'Kajiado', 'vulnerable children', 'Christian care']}
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

        {/* Mission & Vision Section */}
        <section className="mission-vision-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Our <span>Mission & Vision</span></h2>
              <p className="section-subtitle">Guided by faith, driven by love</p>
            </div>
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
        </section>

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
                  {program.link ? (
                    <a 
                      href={program.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="program-link"
                    >
                      Visit School Website <i className="fas fa-external-link-alt"></i>
                    </a>
                  ) : (
                    <Link to="/get-involved" className="program-link">
                      Support This Program <i className="fas fa-arrow-right"></i>
                    </Link>
                  )}
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
        /* ============================================
           HOME PAGE STYLES
           ============================================ */
        .home-page {
          background: var(--bg-deep);
          min-height: 100vh;
        }

        /* ============================================
           HERO SLIDER
           ============================================ */
        .hero-slider {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 600px;
          overflow: hidden;
        }

        .hero-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 1.5s ease-in-out;
          z-index: 1;
        }

        .hero-slide.active {
          opacity: 1;
          z-index: 2;
        }

        .hero-bg-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.55);
          z-index: 1;
        }

        .hero-content-wrapper {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding: 0 20px;
        }

        .hero-text {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
          color: #ffffff;
          animation: fadeInUp 1.2s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 16px;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
          letter-spacing: -0.5px;
        }

        .hero-title span {
          color: #f6e05e;
        }

        .hero-subtitle {
          font-size: 1.5rem;
          font-weight: 500;
          margin-bottom: 12px;
          opacity: 0.95;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .hero-description {
          font-size: 1.1rem;
          opacity: 0.85;
          max-width: 600px;
          margin: 0 auto 24px;
          line-height: 1.6;
        }

        .hero-dots {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 12px;
          z-index: 10;
        }

        .hero-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.6);
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .hero-dot.active {
          background: #ffffff;
          border-color: #ffffff;
          transform: scale(1.2);
        }

        .hero-dot:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        /* ============================================
           MISSION & VISION SECTION
           ============================================ */
        .mission-vision-section {
          padding: 80px 0;
          background: var(--bg-deep);
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

        /* ============================================
           STATS COUNTER SECTION
           ============================================ */
        .stats-counter-section {
          padding: 80px 0;
          background: var(--card-bg);
          transition: all 0.6s ease-out;
          transform: translateY(30px);
          opacity: 0;
        }

        .stats-counter-section.visible {
          transform: translateY(0);
          opacity: 1;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .stat-card {
          text-align: center;
          padding: 30px;
          border-radius: 16px;
          background: var(--bg-deep);
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          border-color: var(--primary-color);
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.1);
        }

        .stat-card i {
          font-size: 2.5rem;
          color: var(--primary-color);
          margin-bottom: 12px;
        }

        .stat-card h3 {
          font-size: 2.5rem;
          color: var(--text-color);
          font-weight: 700;
        }

        .stat-card p {
          color: var(--text-muted);
          font-size: 0.95rem;
          margin-top: 4px;
        }

        /* ============================================
           ABOUT PREVIEW SECTION
           ============================================ */
        .about-preview {
          padding: 80px 0;
          background: var(--bg-deep);
          transition: all 0.6s ease-out;
          transform: translateY(30px);
          opacity: 0;
        }

        .about-preview.visible {
          transform: translateY(0);
          opacity: 1;
        }

        .about-flex {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .about-text h2 {
          font-size: 2.5rem;
          margin-bottom: 20px;
          color: var(--text-color);
        }

        .about-text h2 span {
          color: var(--primary-color);
        }

        .about-text p {
          color: var(--text-muted);
          line-height: 1.8;
          margin-bottom: 16px;
        }

        .about-text strong {
          color: var(--text-color);
        }

        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 32px;
          border: 2px solid var(--primary-color);
          border-radius: 50px;
          color: var(--primary-color);
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .btn-outline:hover {
          background: var(--primary-color);
          color: #ffffff;
          gap: 14px;
        }

        .about-image-slider {
          position: relative;
          width: 100%;
          height: 400px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .about-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 1s ease-in-out;
        }

        .about-slide.active {
          opacity: 1;
        }

        .about-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .about-slide-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 16px;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
          color: #ffffff;
          font-weight: 500;
          text-align: center;
        }

        .about-image-dots {
          position: absolute;
          bottom: 60px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 5;
        }

        .about-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.6);
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .about-dot.active {
          background: #ffffff;
          border-color: #ffffff;
        }

        .about-dot:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        /* ============================================
           PROGRAMS SECTION
           ============================================ */
        .programs-section {
          padding: 90px 0;
          background: var(--card-bg);
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
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-top: 40px;
        }

        .program-card {
          background: var(--bg-deep);
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
          cursor: pointer;
        }

        .program-link:hover {
          gap: 12px;
        }

        /* ============================================
           TESTIMONIAL SECTION
           ============================================ */
        .testimonial-section {
          padding: 80px 0;
          background: var(--bg-deep);
        }

        .testimonial-card {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
          padding: 40px;
          background: var(--card-bg);
          border-radius: 24px;
          border: 1px solid var(--border-color);
        }

        .testimonial-card i {
          font-size: 2.5rem;
          color: var(--primary-color);
          opacity: 0.3;
          margin-bottom: 16px;
        }

        .testimonial-card p {
          color: var(--text-color);
          font-size: 1.2rem;
          line-height: 1.8;
          font-style: italic;
          margin-bottom: 16px;
        }

        .testimonial-card h4 {
          color: var(--primary-color);
          font-weight: 600;
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
          line-height: 1.6;
        }

        .cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
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

        /* ============================================
           RESPONSIVE DESIGN
           ============================================ */
        @media (max-width: 1024px) {
          .programs-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 968px) {
          .mission-vision-grid {
            grid-template-columns: 1fr;
          }
          
          .about-flex {
            grid-template-columns: 1fr;
          }
          
          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.2rem;
          }

          .hero-subtitle {
            font-size: 1.1rem;
          }

          .hero-description {
            font-size: 0.95rem;
          }

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
          
          .about-text h2 {
            font-size: 2rem;
          }
          
          .about-image-slider {
            height: 300px;
          }
          
          .section-title {
            font-size: 1.8rem;
          }
          
          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }
          
          .stat-card h3 {
            font-size: 2rem;
          }
          
          .testimonial-card p {
            font-size: 1rem;
          }
          
          .cta-content h2 {
            font-size: 1.8rem;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .btn-gold,
          .btn-outline {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 1.8rem;
          }
          
          .hero-slider {
            height: 80vh;
            min-height: 500px;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .about-image-slider {
            height: 250px;
          }
          
          .program-logo-container {
            width: 100px;
            height: 100px;
            padding: 16px;
          }
        }
      `}</style>
    </>
  );
}