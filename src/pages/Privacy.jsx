import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Privacy() {
  const lastUpdated = "January 15, 2025";

  const sections = [
    {
      title: "1. Information We Collect",
      content: "We collect information that you voluntarily provide to us when you:",
      list: [
        "Make a donation (name, email, phone, payment information)",
        "Sponsor a child (name, contact details, billing information)",
        "Sign up for our newsletter (email address)",
        "Volunteer with us (name, contact details, skills, availability)",
        "Contact us (name, email, message content)",
        "Register for events (name, contact details)"
      ]
    },
    {
      title: "2. How We Use Your Information",
      content: "We use the information we collect for the following purposes:",
      list: [
        "Process donations and sponsorships",
        "Communicate with you about our programs and impact",
        "Send you newsletters and updates (with your consent)",
        "Respond to your inquiries and requests",
        "Process event registrations",
        "Improve our website and services",
        "Comply with legal obligations"
      ]
    },
    {
      title: "3. Information Sharing and Disclosure",
      content: "We respect your privacy and do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:",
      list: [
        "With your explicit consent",
        "With service providers who assist us in operating our website and processing donations",
        "When required by law or to protect our legal rights",
        "With partner organizations directly involved in child sponsorship (limited to necessary information)"
      ]
    },
    {
      title: "4. Data Security",
      content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:",
      list: [
        "SSL encryption for all data transmission",
        "Secure payment processing through trusted payment gateways",
        "Regular security assessments and updates",
        "Restricted access to personal information on a need-to-know basis"
      ]
    },
    {
      title: "5. Cookies and Tracking Technologies",
      content: "We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small data files stored on your device. We use cookies to:",
      list: [
        "Remember your preferences and settings",
        "Analyze website traffic and usage patterns",
        "Improve website functionality and performance"
      ],
      note: "You can control cookies through your browser settings. However, disabling cookies may affect certain features of our website."
    },
    {
      title: "6. Children's Privacy",
      content: "Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately."
    },
    {
      title: "7. Your Rights",
      content: "Depending on your location, you may have the following rights regarding your personal information:",
      list: [
        "Access the personal information we hold about you",
        "Request correction of inaccurate or incomplete information",
        "Request deletion of your personal information",
        "Opt-out of marketing communications",
        "Withdraw consent at any time (where we rely on consent)",
        "Lodge a complaint with a data protection authority"
      ]
    },
    {
      title: "8. Data Retention",
      content: "We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including for legal, accounting, or reporting requirements. Donation records are typically retained for 7 years to comply with tax and accounting regulations."
    },
    {
      title: "9. Third-Party Links",
      content: "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to read the privacy policies of any linked websites you visit."
    },
    {
      title: "10. Changes to This Privacy Policy",
      content: "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information."
    }
  ];

  return (
    <>
      <SEO 
        title="Privacy Policy - Kajiado Children's Home"
        description="Read Kajiado Children's Home privacy policy to understand how we collect, use, and protect your personal information when you donate, sponsor a child, or interact with our website."
        path="/privacy"
      />
      
      <div className="legal-page">
        <section className="page-header">
          <div className="container">
            <h1>Privacy <span>Policy</span></h1>
            <p>How we collect, use, and protect your information</p>
          </div>
        </section>

        <div className="container">
          <div className="legal-content">
            <div className="legal-updated">
              <i className="fas fa-calendar-alt"></i>
              <span>Last Updated: {lastUpdated}</span>
            </div>

            <div className="legal-intro">
              <p>At Kajiado Children's Home ("we," "us," or "our"), your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or interact with us. Please read this Privacy Policy carefully. By using our website, you consent to the practices described in this policy.</p>
            </div>

            {sections.map((section, index) => (
              <div key={index} className="legal-section">
                <h2>{section.title}</h2>
                <p>{section.content}</p>
                {section.list && (
                  <ul className="legal-list">
                    {section.list.map((item, i) => (
                      <li key={i}>
                        <i className="fas fa-check-circle"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.note && (
                  <div className="legal-note">
                    <i className="fas fa-info-circle"></i>
                    <p>{section.note}</p>
                  </div>
                )}
              </div>
            ))}

            <div className="legal-contact-section">
              <h2>Contact Us</h2>
              <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
              <div className="legal-contact-details">
                <p><i className="fas fa-envelope"></i> <strong>Email:</strong> <a href="mailto:privacy@kajiadochildrenhome.org">privacy@kajiadochildrenhome.org</a></p>
                <p><i className="fas fa-phone"></i> <strong>Phone:</strong> <a href="tel:+254700123456">+254 700 123 456</a></p>
                <p><i className="fas fa-map-marker-alt"></i> <strong>Address:</strong> Kajiado Children's Home, Kajiado Town, Kajiado County, Kenya</p>
              </div>
            </div>

            <div className="legal-footer">
              <p>By continuing to use our website, you acknowledge that you have read and understood this Privacy Policy.</p>
              <div className="legal-buttons">
                <Link to="/" className="btn-outline">
                  <i className="fas fa-home"></i> Back to Home
                </Link>
                <Link to="/terms" className="btn-outline">
                  <i className="fas fa-file-contract"></i> Read Terms & Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .legal-page {
          min-height: 100vh;
        }
        
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
          margin-bottom: 12px;
        }
        
        .legal-list {
          list-style: none;
          margin-top: 12px;
        }
        
        .legal-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 10px;
          color: var(--text-muted);
          line-height: 1.6;
        }
        
        .legal-list li i {
          color: var(--primary-color);
          font-size: 0.9rem;
          margin-top: 3px;
        }
        
        .legal-note {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: rgba(59, 130, 246, 0.08);
          padding: 15px;
          border-radius: 12px;
          margin-top: 12px;
        }
        
        .legal-note i {
          color: var(--primary-color);
          font-size: 1.1rem;
          margin-top: 2px;
        }
        
        .legal-note p {
          margin: 0;
          font-size: 0.9rem;
        }
        
        .legal-contact-section {
          margin: 40px 0;
          padding: 30px;
          background: var(--card-bg);
          border-radius: 20px;
          border: 1px solid var(--border-color);
        }
        
        .legal-contact-section h2 {
          font-size: 1.3rem;
          color: var(--primary-color);
          margin-bottom: 16px;
        }
        
        .legal-contact-section > p {
          color: var(--text-muted);
          margin-bottom: 20px;
        }
        
        .legal-contact-details p {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
          color: var(--text-muted);
        }
        
        .legal-contact-details i {
          width: 24px;
          color: var(--primary-color);
        }
        
        .legal-contact-details a {
          color: var(--primary-color);
          text-decoration: none;
        }
        
        .legal-contact-details a:hover {
          text-decoration: underline;
        }
        
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
        
        @media (max-width: 768px) {
          .legal-content {
            padding: 40px 20px;
          }
          
          .legal-section h2 {
            font-size: 1.1rem;
          }
          
          .legal-list li {
            font-size: 0.9rem;
          }
          
          .legal-contact-section {
            padding: 20px;
          }
          
          .legal-contact-details p {
            font-size: 0.85rem;
          }
          
          .legal-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .legal-buttons .btn-outline {
            width: 100%;
            max-width: 250px;
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}