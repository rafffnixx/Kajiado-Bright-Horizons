// src/pages/Children.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Children() {
  const [selectedChild, setSelectedChild] = useState(null);

  // Temporarily empty - children will be uploaded soon
  const children = [];

  return (
    <>
      <SEO 
        title="Sponsor a Child - Kajiado Bright Horizons"
        description="Meet the children at Kajiado Bright Horizons. Your sponsorship provides education, food, healthcare, and love to vulnerable children in Kajiado, Kenya."
        path="/children"
      />
      
      <div className="children-page">
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
              <h1>Our <span>Children</span></h1>
              <p>Meet the beautiful children who call Kajiado Bright Horizons their home</p>
              <div className="hero-buttons" style={{ justifyContent: 'center', marginTop: '32px' }}>
                <Link to="/contact" className="btn-gold">
                  <i className="fas fa-envelope"></i> Contact Us
                </Link>
                <Link to="/get-involved" className="btn-outline">
                  <i className="fas fa-hands-helping"></i> Get Involved
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="coming-soon-section">
          <div className="container">
            <div className="coming-soon-card">
              <div className="coming-soon-icon">
                <i className="fas fa-child"></i>
              </div>
              <h2>Children Profiles <span>Coming Soon</span></h2>
              <p>We are currently preparing profiles for each of our children. Soon you'll be able to meet every child, learn their dreams, and choose to sponsor them directly.</p>
              <div className="coming-soon-features">
                <div className="feature-item">
                  <i className="fas fa-user-circle"></i>
                  <span>Individual Child Profiles</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-heart"></i>
                  <span>Direct Sponsorship Options</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-pen"></i>
                  <span>Send Letters to Your Sponsored Child</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-image"></i>
                  <span>Photos & Updates</span>
                </div>
              </div>
              <div className="coming-soon-cta">
                <p><strong>Want to sponsor a child?</strong> Contact us today and we'll arrange a sponsorship for you.</p>
                <Link to="/contact" className="btn-gold">
                  <i className="fas fa-envelope"></i> Contact Us to Sponsor
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How Sponsorship Works */}
        <section className="sponsorship-info">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">How <span>Sponsorship Works</span></h2>
              <p className="section-subtitle">Be part of a child's journey from childhood to success</p>
            </div>
            
            <div className="sponsorship-intro">
              <p>When you sponsor a child at Kajiado Bright Horizons, you become part of their life journey. You're not just providing financial support—you're becoming their <strong>"American Mum or Dad"</strong> or their <strong>special guardian</strong>.</p>
              <p>Whether you're local or international (especially from America), your sponsorship creates a lifelong bond that transforms a child's future.</p>
            </div>

            <div className="sponsorship-grid">
              <div className="sponsorship-card">
                <div className="sponsorship-icon">👨‍👧</div>
                <h3>Parent-Child Relationship</h3>
                <p>Sponsors become like a parent or guardian to the child. You build a personal relationship through letters, photos, and visits.</p>
              </div>
              <div className="sponsorship-card">
                <div className="sponsorship-icon">💰</div>
                <h3>Monthly Support</h3>
                <p><strong>KES 2,500 per month</strong> covers education, meals, clothing, and healthcare. Sponsor one or several children.</p>
              </div>
              <div className="sponsorship-card">
                <div className="sponsorship-icon">✉️</div>
                <h3>Regular Communication</h3>
                <p>Children send letters at the beginning and end of each term. You can reply, encourage them, and build a meaningful connection.</p>
              </div>
              <div className="sponsorship-card">
                <div className="sponsorship-icon">🤝</div>
                <h3>Direct Interaction</h3>
                <p>When you visit Kajiado, you can meet your sponsored child face-to-face, spend time together, and experience their daily life.</p>
              </div>
              <div className="sponsorship-card">
                <div className="sponsorship-icon">🎓</div>
                <h3>Long-Term Journey</h3>
                <p>Be part of their entire journey—from childhood through primary school, secondary school, and into their career path.</p>
              </div>
              <div className="sponsorship-card">
                <div className="sponsorship-icon">🌍</div>
                <h3>Local & International</h3>
                <p>Sponsors come from Kenya, the US, and around the world. Some have been with us since 2011, supporting children to success.</p>
              </div>
            </div>

            <div className="sponsorship-journey">
              <h3><i className="fas fa-road"></i> The Journey of a Sponsored Child</h3>
              <div className="journey-timeline">
                <div className="journey-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>You Choose a Child</h4>
                    <p>Select a child you feel connected to. You become their special sponsor.</p>
                  </div>
                </div>
                <div className="journey-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Monthly Support Begins</h4>
                    <p>Your KES 2,500/month provides education, meals, and care.</p>
                  </div>
                </div>
                <div className="journey-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Build a Relationship</h4>
                    <p>Exchange letters, receive photos, and watch them grow.</p>
                  </div>
                </div>
                <div className="journey-step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4>Visit & Connect</h4>
                    <p>Come to Kajiado, meet your child, and experience their life.</p>
                  </div>
                </div>
                <div className="journey-step">
                  <div className="step-number">5</div>
                  <div className="step-content">
                    <h4>See Them Succeed</h4>
                    <p>Celebrate their graduation, career, and life achievements.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="sponsorship-testimonial">
              <div className="testimonial-quote">
                <i className="fas fa-quote-left"></i>
                <p>"I've been sponsoring Grace since she was 7 years old. Today, she's in university studying to become a doctor. It's the most rewarding experience of my life to see her grow and succeed."</p>
                <cite>— Sarah, Sponsor from New York (Since 2017)</cite>
              </div>
            </div>

            <div className="sponsorship-cta-bottom">
              <h3>Ready to Begin This Journey?</h3>
              <p>Contact us to choose a child and start your sponsorship journey today.</p>
              <Link to="/contact" className="btn-gold">
                <i className="fas fa-envelope"></i> Start Sponsoring a Child
              </Link>
            </div>
          </div>
        </section>

        {/* Success Stories Link - UPDATED: Link to Alumni page instead of duplicating */}
        <section className="success-stories-link">
          <div className="container">
            <div className="success-link-card">
              <div className="success-link-icon">
                <i className="fas fa-star-of-life"></i>
              </div>
              <div className="success-link-content">
                <h3>See Our Success Stories</h3>
                <p>Read inspiring journeys of our alumni who have grown up at Kajiado Bright Horizons and are now thriving in their careers and communities.</p>
                <Link to="/events" className="btn-gold">
                  <i className="fas fa-arrow-right"></i> View Alumni Success Stories
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Change a Child's Life?</h2>
              <p>Your sponsorship provides hope, education, and a brighter future</p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn-gold">
                  <i className="fas fa-envelope"></i> Contact Us to Sponsor
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
           CHILDREN PAGE STYLES
           ============================================ */
        .children-page {
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
           COMING SOON SECTION
           ============================================ */
        .coming-soon-section {
          padding: 80px 0 60px;
        }

        .coming-soon-card {
          max-width: 800px;
          margin: 0 auto;
          background: var(--card-bg);
          padding: 60px 50px;
          border-radius: 24px;
          text-align: center;
          border: 2px dashed var(--border-color);
          transition: all 0.3s ease;
        }

        .coming-soon-card:hover {
          border-color: var(--primary-color);
          box-shadow: 0 10px 40px rgba(59, 130, 246, 0.08);
        }

        .coming-soon-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 24px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .coming-soon-icon i {
          font-size: 2.5rem;
          color: var(--primary-color);
        }

        .coming-soon-card h2 {
          font-size: 2rem;
          margin-bottom: 16px;
          color: var(--text-color);
        }

        .coming-soon-card h2 span {
          color: var(--primary-color);
        }

        .coming-soon-card > p {
          color: var(--text-muted);
          font-size: 1.1rem;
          line-height: 1.8;
          max-width: 600px;
          margin: 0 auto 32px;
        }

        .coming-soon-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 32px;
          text-align: left;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: rgba(59, 130, 246, 0.04);
          border-radius: 12px;
          color: var(--text-muted);
        }

        .feature-item i {
          color: var(--primary-color);
          font-size: 1.1rem;
          width: 24px;
        }

        .feature-item span {
          font-size: 0.95rem;
        }

        .coming-soon-cta {
          padding-top: 24px;
          border-top: 1px solid var(--border-color);
        }

        .coming-soon-cta p {
          color: var(--text-muted);
          margin-bottom: 16px;
          font-size: 1.05rem;
        }

        .coming-soon-cta p strong {
          color: var(--text-color);
        }

        .coming-soon-cta .btn-gold {
          width: 100%;
          justify-content: center;
        }

        /* ============================================
           SPONSORSHIP INFO
           ============================================ */
        .sponsorship-info {
          padding: 80px 0;
          background: var(--card-bg);
        }

        .sponsorship-intro {
          max-width: 750px;
          margin: 0 auto 48px;
          text-align: center;
          padding: 24px;
          background: rgba(59, 130, 246, 0.05);
          border-radius: 16px;
          border-left: 4px solid var(--primary-color);
        }

        .sponsorship-intro p {
          color: var(--text-muted);
          line-height: 1.8;
          margin-bottom: 12px;
          font-size: 1.05rem;
        }

        .sponsorship-intro p:last-child {
          margin-bottom: 0;
        }

        .sponsorship-intro strong {
          color: var(--primary-color);
        }

        .sponsorship-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 24px;
        }

        .sponsorship-card {
          background: var(--bg-deep);
          padding: 30px 24px;
          border-radius: 20px;
          text-align: center;
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }

        .sponsorship-card:hover {
          transform: translateY(-5px);
          border-color: var(--primary-color);
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.1);
        }

        .sponsorship-icon {
          font-size: 2.5rem;
          margin-bottom: 12px;
        }

        .sponsorship-card h3 {
          color: var(--text-color);
          font-size: 1.1rem;
          margin-bottom: 8px;
        }

        .sponsorship-card p {
          color: var(--text-muted);
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .sponsorship-card strong {
          color: var(--primary-color);
        }

        /* Journey Timeline */
        .sponsorship-journey {
          margin-top: 48px;
          padding: 40px;
          background: var(--bg-deep);
          border-radius: 20px;
          border: 1px solid var(--border-color);
        }

        .sponsorship-journey h3 {
          text-align: center;
          font-size: 1.6rem;
          color: var(--text-color);
          margin-bottom: 32px;
        }

        .sponsorship-journey h3 i {
          color: var(--primary-color);
          margin-right: 12px;
        }

        .journey-timeline {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .journey-step {
          display: flex;
          gap: 16px;
          padding: 16px;
          background: var(--card-bg);
          border-radius: 12px;
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }

        .journey-step:hover {
          border-color: var(--primary-color);
          transform: translateX(4px);
        }

        .step-number {
          width: 36px;
          height: 36px;
          min-width: 36px;
          background: var(--primary-color);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
        }

        .step-content h4 {
          color: var(--text-color);
          font-size: 1rem;
          margin-bottom: 4px;
        }

        .step-content p {
          color: var(--text-muted);
          font-size: 0.85rem;
          line-height: 1.5;
          margin: 0;
        }

        /* Testimonial */
        .sponsorship-testimonial {
          margin-top: 40px;
        }

        .testimonial-quote {
          background: rgba(59, 130, 246, 0.05);
          padding: 30px 40px;
          border-radius: 16px;
          position: relative;
          border-left: 4px solid var(--primary-color);
        }

        .testimonial-quote i {
          font-size: 2rem;
          color: var(--primary-color);
          opacity: 0.3;
          margin-bottom: 12px;
        }

        .testimonial-quote p {
          color: var(--text-muted);
          font-size: 1.05rem;
          line-height: 1.8;
          font-style: italic;
          margin-bottom: 12px;
        }

        .testimonial-quote cite {
          color: var(--text-color);
          font-weight: 600;
          font-style: normal;
          display: block;
        }

        /* Sponsorship CTA Bottom */
        .sponsorship-cta-bottom {
          text-align: center;
          margin-top: 48px;
          padding: 40px;
          background: linear-gradient(135deg, var(--primary-color), #1d4ed8);
          border-radius: 20px;
          color: white;
        }

        .sponsorship-cta-bottom h3 {
          font-size: 1.6rem;
          color: white;
          margin-bottom: 12px;
        }

        .sponsorship-cta-bottom p {
          color: rgba(255,255,255,0.9);
          font-size: 1.05rem;
          margin-bottom: 20px;
        }

        .sponsorship-cta-bottom .btn-gold {
          background: white;
          color: var(--primary-color) !important;
          box-shadow: none;
        }

        .sponsorship-cta-bottom .btn-gold:hover {
          background: rgba(255,255,255,0.9);
          transform: translateY(-3px);
        }

        /* ============================================
           SUCCESS STORIES LINK - NEW
           ============================================ */
        .success-stories-link {
          padding: 80px 0;
          background: var(--bg-deep);
        }

        .success-link-card {
          max-width: 700px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 32px;
          background: var(--card-bg);
          padding: 40px 50px;
          border-radius: 24px;
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }

        .success-link-card:hover {
          border-color: var(--primary-color);
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.08);
          transform: translateY(-4px);
        }

        .success-link-icon {
          width: 80px;
          height: 80px;
          min-width: 80px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .success-link-icon i {
          font-size: 2.5rem;
          color: var(--primary-color);
        }

        .success-link-content h3 {
          font-size: 1.4rem;
          color: var(--text-color);
          margin-bottom: 8px;
        }

        .success-link-content p {
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .success-link-content .btn-gold {
          padding: 10px 28px;
          font-size: 0.9rem;
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
          .sponsorship-grid {
            grid-template-columns: 1fr 1fr;
          }

          .journey-timeline {
            grid-template-columns: 1fr;
          }

          .success-link-card {
            flex-direction: column;
            text-align: center;
            padding: 32px 24px;
          }
        }

        @media (max-width: 968px) {
          .coming-soon-features {
            grid-template-columns: 1fr;
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

          .coming-soon-card {
            padding: 40px 24px;
          }

          .coming-soon-card h2 {
            font-size: 1.6rem;
          }

          .coming-soon-card > p {
            font-size: 1rem;
          }

          .sponsorship-grid {
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }

          .sponsorship-journey {
            padding: 24px;
          }

          .sponsorship-journey h3 {
            font-size: 1.3rem;
          }

          .testimonial-quote {
            padding: 20px;
          }

          .testimonial-quote p {
            font-size: 0.95rem;
          }

          .sponsorship-cta-bottom {
            padding: 30px 20px;
          }

          .sponsorship-cta-bottom h3 {
            font-size: 1.3rem;
          }

          .section-title {
            font-size: 1.8rem;
          }

          .success-link-card {
            padding: 24px 20px;
          }

          .success-link-icon {
            width: 60px;
            height: 60px;
            min-width: 60px;
          }

          .success-link-icon i {
            font-size: 2rem;
          }

          .success-link-content h3 {
            font-size: 1.2rem;
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
          .coming-soon-card {
            padding: 30px 16px;
          }

          .coming-soon-icon {
            width: 60px;
            height: 60px;
          }

          .coming-soon-icon i {
            font-size: 2rem;
          }

          .coming-soon-card h2 {
            font-size: 1.3rem;
          }

          .sponsorship-grid {
            grid-template-columns: 1fr;
          }

          .feature-item {
            font-size: 0.85rem;
            padding: 10px 12px;
          }

          .journey-step {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .sponsorship-cta-bottom {
            padding: 24px 16px;
          }

          .sponsorship-cta-bottom h3 {
            font-size: 1.1rem;
          }

          .success-link-card {
            padding: 20px 16px;
          }

          .success-link-icon {
            width: 50px;
            height: 50px;
            min-width: 50px;
          }

          .success-link-icon i {
            font-size: 1.5rem;
          }

          .success-link-content h3 {
            font-size: 1rem;
          }

          .success-link-content p {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </>
  );
}