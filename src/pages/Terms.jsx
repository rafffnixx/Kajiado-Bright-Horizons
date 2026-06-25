// src/pages/Terms.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Terms() {
  const lastUpdated = "January 15, 2025";

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using the Kajiado Bright Horizons website ('the Website'), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website."
    },
    {
      title: "2. Use of Website",
      content: "You agree to use the Website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the Website. Prohibited behavior includes harassing or causing distress or inconvenience to any person, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our website."
    },
    {
      title: "3. Donations and Payments",
      content: "All donations made to Kajiado Bright Horizons are final and non-refundable. When you make a donation through our website, you confirm that you are the authorized holder of the payment method used. We reserve the right to refuse or cancel any donation at our discretion."
    },
    {
      title: "4. Sponsorship Commitments",
      content: "Child sponsorship is a monthly commitment. Sponsors may cancel their sponsorship at any time by contacting us directly. We will notify sponsored children's families or guardians if sponsorship is discontinued. Sponsorship funds are used to support the child's education, healthcare, nutrition, and general welfare."
    },
    {
      title: "5. Intellectual Property",
      content: "All content on this website, including text, graphics, logos, images, and software, is the property of Kajiado Bright Horizons or its content suppliers and is protected by Kenyan and international copyright laws. You may not reproduce, distribute, or transmit any content without our prior written permission."
    },
    {
      title: "6. Third-Party Links",
      content: "Our website may contain links to third-party websites. These links are provided for your convenience only. We have no control over the content of these websites and accept no responsibility for them or for any loss or damage that may arise from your use of them."
    },
    {
      title: "7. Privacy and Data Protection",
      content: "Your use of our website is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices regarding the collection and use of your personal information."
    },
    {
      title: "8. Limitation of Liability",
      content: "To the fullest extent permitted by law, Kajiado Bright Horizons shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the website."
    },
    {
      title: "9. Indemnification",
      content: "You agree to indemnify, defend, and hold harmless Kajiado Bright Horizons, its officers, directors, employees, agents, and volunteers from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses arising from your use of the website or your violation of these Terms."
    },
    {
      title: "10. Changes to Terms",
      content: "We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after any changes indicates your acceptance of the modified terms."
    },
    {
      title: "11. Governing Law",
      content: "These Terms shall be governed by and construed in accordance with the laws of the Republic of Kenya. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Kenya."
    },
    {
      title: "12. Contact Information",
      content: "If you have any questions about these Terms and Conditions, please contact us at:",
      contact: true
    }
  ];

  return (
    <>
      <SEO 
        title="Terms & Conditions - Kajiado Bright Horizons"
        description="Read the terms and conditions governing the use of Kajiado Bright Horizons website. Learn about donations, sponsorships, and your rights and responsibilities."
        path="/terms"
      />
      
      <div className="terms-page">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="hero-bg-container">
            <div 
              className="hero-bg-image-about"
              style={{ backgroundImage: 'url("/images/hero/hero-bg.jpg")' }}
            ></div>
            <div className="hero-overlay-dark"></div>
          </div>
          <div className="container">
            <div className="hero-content-about">
              <h1>Terms & <span>Conditions</span></h1>
              <p>Please read these terms carefully before using our website</p>
              <div className="hero-buttons" style={{ justifyContent: 'center', marginTop: '32px' }}>
                <Link to="/" className="btn-gold">
                  <i className="fas fa-home"></i> Back to Home
                </Link>
                <Link to="/privacy" className="btn-outline">
                  <i className="fas fa-shield-alt"></i> Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="container">
          <div className="legal-content">
            <div className="legal-updated">
              <i className="fas fa-calendar-alt"></i>
              <span>Last Updated: {lastUpdated}</span>
            </div>

            <div className="legal-intro">
              <p>Welcome to the Kajiado Bright Horizons website. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. These terms apply to all visitors, users, donors, sponsors, and others who access or use our website.</p>
            </div>

            {sections.map((section, index) => (
              <div key={index} className="legal-section">
                <h2>{section.title}</h2>
                <p>{section.content}</p>
                {section.contact && (
                  <div className="legal-contact">
                    <p>
                      <i className="fas fa-envelope"></i>
                      <strong>Email:</strong> <a href="mailto:legal@kajiadochildrenhome.org">legal@kajiadochildrenhome.org</a>
                    </p>
                    <p>
                      <i className="fas fa-phone"></i>
                      <strong>Phone:</strong> <a href="tel:+254700123456">+254 700 123 456</a>
                    </p>
                    <p>
                      <i className="fas fa-map-marker-alt"></i>
                      <strong>Address:</strong> Kajiado Bright Horizons, Kajiado Town, Kajiado County, Kenya
                    </p>
                  </div>
                )}
              </div>
            ))}

            <div className="legal-footer">
              <p>By continuing to use our website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</p>
              <div className="legal-buttons">
                <Link to="/" className="btn-gold">
                  <i className="fas fa-home"></i> Back to Home
                </Link>
                <Link to="/privacy" className="btn-outline">
                  <i className="fas fa-shield-alt"></i> Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Have Questions About Our Terms?</h2>
              <p>We're here to help and answer any questions you may have</p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn-gold">
                  <i className="fas fa-envelope"></i> Contact Us
                </Link>
                <Link to="/" className="btn-outline-light">
                  <i className="fas fa-arrow-left"></i> Back to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        /* ============================================
           TERMS PAGE STYLES
           ============================================ */
        .terms-page {
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
           LEGAL CONTENT
           ============================================ */
        .legal-content {
          max-width: 900px;
          margin: 0 auto;
          padding: 60px 0;
        }

        .legal-updated {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(59, 130, 246, 0.1);
          padding: 10px 20px;
          border-radius: 30px;
          margin-bottom: 30px;
          color: var(--primary-color);
          font-size: 0.85rem;
        }

        .legal-intro {
          background: var(--card-bg);
          padding: 24px;
          border-radius: 16px;
          border-left: 4px solid var(--primary-color);
          margin-bottom: 40px;
        }

        .legal-intro p {
          color: var(--text-muted);
          line-height: 1.6;
          margin: 0;
        }

        .legal-section {
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border-color);
        }

        .legal-section:last-child {
          border-bottom: none;
        }

        .legal-section h2 {
          font-size: 1.3rem;
          color: var(--primary-color);
          margin-bottom: 12px;
        }

        .legal-section p {
          color: var(--text-muted);
          line-height: 1.7;
        }

        .legal-contact {
          background: rgba(59, 130, 246, 0.05);
          padding: 20px;
          border-radius: 12px;
          margin-top: 16px;
        }

        .legal-contact p {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
          color: var(--text-muted);
        }

        .legal-contact p:last-child {
          margin-bottom: 0;
        }

        .legal-contact i {
          width: 20px;
          color: var(--primary-color);
        }

        .legal-contact a {
          color: var(--primary-color);
          text-decoration: none;
        }

        .legal-contact a:hover {
          text-decoration: underline;
        }

        /* ============================================
           FOOTER
           ============================================ */
        .legal-footer {
          margin-top: 40px;
          padding-top: 30px;
          border-top: 2px solid var(--border-color);
          text-align: center;
        }

        .legal-footer p {
          color: var(--text-muted);
          margin-bottom: 24px;
        }

        .legal-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .legal-buttons .btn-gold {
          padding: 12px 28px;
          font-size: 0.95rem;
        }

        .legal-buttons .btn-outline {
          border-color: var(--primary-color);
          color: var(--primary-color);
          padding: 12px 28px;
          font-size: 0.95rem;
        }

        .legal-buttons .btn-outline:hover {
          background: var(--primary-color);
          color: #ffffff !important;
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

          .legal-content {
            padding: 40px 20px;
          }

          .legal-section h2 {
            font-size: 1.1rem;
          }

          .legal-contact p {
            font-size: 0.9rem;
          }

          .legal-buttons {
            flex-direction: column;
            align-items: center;
          }

          .legal-buttons .btn-gold,
          .legal-buttons .btn-outline {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }

          .cta-content h2 {
            font-size: 1.8rem;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }

          .btn-gold,
          .btn-outline,
          .btn-outline-light {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .hero-content-about h1 {
            font-size: 1.8rem;
          }

          .legal-content {
            padding: 24px 16px;
          }

          .legal-section {
            margin-bottom: 20px;
            padding-bottom: 16px;
          }

          .legal-section h2 {
            font-size: 1rem;
          }

          .legal-contact {
            padding: 16px;
          }

          .legal-contact p {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </>
  );
}