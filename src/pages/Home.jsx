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
      title: "Kajiado Children's Home",
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
    { src: "/images/about/kajiado-home.jpg", alt: "Kajiado Children's Home", caption: "Our Home" },
    { src: "/images/children/happy-children.jpg", alt: "Happy Children", caption: "Happy Children" },
    { src: "/images/about/founder.jpg", alt: "Founder", caption: "Our Founder" },
    { src: "/images/staff/staff1.jpg", alt: "Staff", caption: "Dedicated Staff" }
  ];

  const programs = [
    { id: 'education', icon: 'fas fa-book', title: 'Education Program', desc: 'Quality education for every child, from primary through vocational training.' },
    { id: 'healthcare', icon: 'fas fa-heartbeat', title: 'Healthcare Program', desc: 'Regular medical checkups, nutrition, and healthcare for all children.' },
    { id: 'shelter', icon: 'fas fa-home', title: 'Shelter & Care', desc: 'Safe, loving home environment with proper care and support.' },
    { id: 'mentorship', icon: 'fas fa-users', title: 'Mentorship', desc: 'Guidance and mentorship to help children build better futures.' }
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
      { key: 'children', target: 150, duration: 2000 },
      { key: 'volunteers', target: 50, duration: 2000 },
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
        title="Kajiado Children's Home - Providing Hope & Care to Vulnerable Children"
        description="Kajiado Children's Home provides shelter, education, healthcare, and love to orphaned and vulnerable children in Kajiado, Kenya. Support us through donations, sponsorship, or volunteering."
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

        {/* Mission Statement */}
        <div className="mission-statement">
          <div className="container">
            <div className="mission-content">
              <h2>Our Mission</h2>
              <p>
                To ensure every child receives <span className="highlight">love</span>, 
                a <span className="highlight">full stomach</span>, 
                <span className="highlight"> quality education</span>, 
                <span className="highlight"> spiritual nourishment</span>, 
                and <span className="highlight">hope for a better future</span>.
              </p>
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
                <h2>About <span>Kajiado Children's Home</span></h2>
                <p>Kajiado Children's Home (KCH) provides a safe and loving environment for abused, abandoned, and orphaned children who have no place to go. Since <strong>1997</strong>, KCH has supported hundreds of children by offering shelter, care, and opportunities for a better future.</p>
                <p>We work closely with Kenya Child Services to support children lacking parental care and basic needs, whether for short-term or long-term care.</p>
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

        {/* Programs Section */}
        <div 
          ref={programsRef}
          id="programs"
          className={`programs-section ${isVisible.programs ? 'visible' : ''}`}
        >
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Our <span>Programs</span></h2>
              <p className="section-subtitle">Comprehensive care and support for every child's development</p>
            </div>
            <div className="programs-grid">
              {programs.map((program) => (
                <div key={program.id} className="program-card">
                  <div className="program-icon"><i className={program.icon}></i></div>
                  <h3>{program.title}</h3>
                  <p>{program.desc}</p>
                  <Link to="/get-involved" className="program-link">
                    Support This Program <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div className="partners-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Our <span>Partners</span></h2>
              <p className="section-subtitle">Helping children from their villages through education, mentorship, and community outreach</p>
            </div>
            <div className="partners-grid">
              <div className="partner-card">
                <div className="partner-icon">🌟</div>
                <h3>Hope for Kajiado</h3>
                <p>Sustaining KCH through fundraising and support</p>
              </div>
              <div className="partner-card">
                <div className="partner-icon">📚</div>
                <h3>Valley School of Excellence</h3>
                <p>Quality education for KCH and community</p>
              </div>
              <div className="partner-card">
                <div className="partner-icon">🎓</div>
                <h3>Bright Horizons Project</h3>
                <p>Mentorship and career training</p>
              </div>
              <div className="partner-card">
                <div className="partner-icon">🍲</div>
                <h3>Namanga Hope Center</h3>
                <p>Outreach to vulnerable communities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="testimonial-section">
          <div className="container">
            <div className="testimonial-card">
              <i className="fas fa-quote-left"></i>
              <p>"Kajiado Children's Home gave me a second chance at life. Today, I'm a social worker helping children just like me."</p>
              <h4>— Former KCH Student, Now Staff Member</h4>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Help Us Transform Lives</h2>
              <p>Your donation, sponsorship, or volunteer time makes a direct impact on a child's future.</p>
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
    </>
  );
}