import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Terms() {
  const lastUpdated = "January 15, 2025";

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using the Kajiado Children's Home website ('the Website'), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website."
    },
    {
      title: "2. Use of Website",
      content: "You agree to use the Website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the Website. Prohibited behavior includes harassing or causing distress or inconvenience to any person, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our website."
    },
    {
      title: "3. Donations and Payments",
      content: "All donations made to Kajiado Children's Home are final and non-refundable. When you make a donation through our website, you confirm that you are the authorized holder of the payment method used. We reserve the right to refuse or cancel any donation at our discretion."
    },
    {
      title: "4. Sponsorship Commitments",
      content: "Child sponsorship is a monthly commitment. Sponsors may cancel their sponsorship at any time by contacting us directly. We will notify sponsored children's families or guardians if sponsorship is discontinued. Sponsorship funds are used to support the child's education, healthcare, nutrition, and general welfare."
    },
    {
      title: "5. Intellectual Property",
      content: "All content on this website, including text, graphics, logos, images, and software, is the property of Kajiado Children's Home or its content suppliers and is protected by Kenyan and international copyright laws. You may not reproduce, distribute, or transmit any content without our prior written permission."
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
      content: "To the fullest extent permitted by law, Kajiado Children's Home shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the website."
    },
    {
      title: "9. Indemnification",
      content: "You agree to indemnify, defend, and hold harmless Kajiado Children's Home, its officers, directors, employees, agents, and volunteers from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses arising from your use of the website or your violation of these Terms."
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
        title="Terms & Conditions - Kajiado Children's Home"
        description="Read the terms and conditions governing the use of Kajiado Children's Home website. Learn about donations, sponsorships, and your rights and responsibilities."
        path="/terms"
      />
      
      <div className="legal-page">
        <section className="page-header">
          <div className="container">
            <h1>Terms & <span>Conditions</span></h1>
            <p>Please read these terms carefully before using our website</p>
          </div>
        </section>

        <div className="container">
          <div className="legal-content">
            <div className="legal-updated">
              <i className="fas fa-calendar-alt"></i>
              <span>Last Updated: {lastUpdated}</span>
            </div>

            <div className="legal-intro">
              <p>Welcome to the Kajiado Children's Home website. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. These terms apply to all visitors, users, donors, sponsors, and others who access or use our website.</p>
            </div>

            {sections.map((section, index) => (
              <div key={index} className="legal-section">
                <h2>{section.title}</h2>
                <p>{section.content}</p>
                {section.contact && (
                  <div className="legal-contact">
                    <p>
                      <strong>Email:</strong> <a href="mailto:legal@kajiadochildrenhome.org">legal@kajiadochildrenhome.org</a>
                    </p>
                    <p>
                      <strong>Phone:</strong> <a href="tel:+254700123456">+254 700 123 456</a>
                    </p>
                    <p>
                      <strong>Address:</strong> Kajiado Children's Home, Kajiado Town, Kajiado County, Kenya
                    </p>
                  </div>
                )}
              </div>
            ))}

            <div className="legal-footer">
              <p>By continuing to use our website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</p>
              <div className="legal-buttons">
                <Link to="/" className="btn-outline">
                  <i className="fas fa-home"></i> Back to Home
                </Link>
                <Link to="/privacy" className="btn-outline">
                  <i className="fas fa-shield-alt"></i> Read Privacy Policy
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
        }
        
        .legal-contact {
          background: rgba(59, 130, 246, 0.05);
          padding: 20px;
          border-radius: 12px;
          margin-top: 16px;
        }
        
        .legal-contact p {
          margin-bottom: 8px;
        }
        
        .legal-contact a {
          color: var(--primary-color);
          text-decoration: none;
        }
        
        .legal-contact a:hover {
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