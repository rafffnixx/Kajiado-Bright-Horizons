import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Privacy() {
  return (
    <>
      <SEO 
        title="Privacy Policy - M.K GATHU Financial Consulting"
        description="Read our privacy policy to understand how M.K GATHU Financial Consulting collects, uses, and protects your personal and business information."
        path="/privacy"
        noIndex={true}
      />
      
      <div className="privacy-page">
        <section className="page-header">
          <div className="container">
            <h1>Privacy <span>Policy</span></h1>
            <p>How we collect, use, and protect your information</p>
          </div>
        </section>

        <section className="privacy-content">
          <div className="container">
            <div className="privacy-card">
              <div className="privacy-updated">
                <i className="fas fa-clock"></i> Last Updated: May 27, 2026
              </div>

              <div className="privacy-section">
                <h2><i className="fas fa-info-circle"></i> 1. Information We Collect</h2>
                <p>We collect information that you provide directly to us, including:</p>
                <ul>
                  <li><i className="fas fa-check-circle"></i> <strong>Personal Information:</strong> Name, email address, phone number, physical address</li>
                  <li><i className="fas fa-check-circle"></i> <strong>Business Information:</strong> Company details, KRA PIN, registration certificates</li>
                  <li><i className="fas fa-check-circle"></i> <strong>Financial Information:</strong> Bank details, financial records, tax documents</li>
                  <li><i className="fas fa-check-circle"></i> <strong>Communication Data:</strong> Emails, messages, call recordings (with consent)</li>
                  <li><i className="fas fa-check-circle"></i> <strong>Website Usage:</strong> IP address, browser type, pages visited</li>
                </ul>
              </div>

              <div className="privacy-section">
                <h2><i className="fas fa-database"></i> 2. How We Use Your Information</h2>
                <p>We use your information to:</p>
                <ul>
                  <li><i className="fas fa-check-circle"></i> Provide and manage our financial consulting services</li>
                  <li><i className="fas fa-check-circle"></i> Process KRA filings and statutory compliance</li>
                  <li><i className="fas fa-check-circle"></i> Communicate with you about your account or services</li>
                  <li><i className="fas fa-check-circle"></i> Improve our services and customer experience</li>
                  <li><i className="fas fa-check-circle"></i> Comply with legal and regulatory requirements</li>
                  <li><i className="fas fa-check-circle"></i> Process payments and manage billing</li>
                </ul>
              </div>

              <div className="privacy-section">
                <h2><i className="fas fa-share-alt"></i> 3. Information Sharing</h2>
                <p>We do not sell your personal information. We may share information in these limited circumstances:</p>
                <ul>
                  <li><i className="fas fa-check-circle"></i> <strong>With your consent:</strong> When you authorize us to share with third parties</li>
                  <li><i className="fas fa-check-circle"></i> <strong>Service providers:</strong> Vendors who assist with our operations (e.g., IT services, payment processors)</li>
                  <li><i className="fas fa-check-circle"></i> <strong>Legal requirements:</strong> When required by law or to protect rights and safety</li>
                  <li><i className="fas fa-check-circle"></i> <strong>KRA compliance:</strong> As necessary for tax filing and regulatory compliance</li>
                </ul>
              </div>

              <div className="privacy-section">
                <h2><i className="fas fa-shield-alt"></i> 4. Data Security</h2>
                <p>We implement appropriate technical and organizational measures to protect your information, including:</p>
                <ul>
                  <li><i className="fas fa-check-circle"></i> Encryption of sensitive data</li>
                  <li><i className="fas fa-check-circle"></i> Secure servers and access controls</li>
                  <li><i className="fas fa-check-circle"></i> Regular security assessments</li>
                  <li><i className="fas fa-check-circle"></i> Employee confidentiality agreements</li>
                  <li><i className="fas fa-check-circle"></i> Secure document destruction protocols</li>
                </ul>
              </div>

              <div className="privacy-section">
                <h2><i className="fas fa-user-secret"></i> 5. Your Rights</h2>
                <p>You have the right to:</p>
                <ul>
                  <li><i className="fas fa-check-circle"></i> Access the personal information we hold about you</li>
                  <li><i className="fas fa-check-circle"></i> Request correction of inaccurate information</li>
                  <li><i className="fas fa-check-circle"></i> Request deletion of your information (subject to legal obligations)</li>
                  <li><i className="fas fa-check-circle"></i> Object to certain data processing activities</li>
                  <li><i className="fas fa-check-circle"></i> Request data portability where applicable</li>
                  <li><i className="fas fa-check-circle"></i> Withdraw consent at any time</li>
                </ul>
                <p>To exercise these rights, contact us at <a href="mailto:gathukamau23@gmail.com">gathukamau23@gmail.com</a>.</p>
              </div>

              <div className="privacy-section">
                <h2><i className="fas fa-cookie-bite"></i> 6. Cookies and Tracking</h2>
                <p>Our website uses cookies to enhance your experience. We use:</p>
                <ul>
                  <li><i className="fas fa-check-circle"></i> <strong>Essential cookies:</strong> Required for website functionality</li>
                  <li><i className="fas fa-check-circle"></i> <strong>Analytics cookies:</strong> To understand how visitors use our site</li>
                  <li><i className="fas fa-check-circle"></i> <strong>Preference cookies:</strong> To remember your settings</li>
                </ul>
                <p>You can control cookie settings through your browser preferences.</p>
              </div>

              <div className="privacy-section">
                <h2><i className="fas fa-child"></i> 7. Children's Privacy</h2>
                <p>Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from minors. If you believe a minor has provided us with information, please contact us immediately.</p>
              </div>

              <div className="privacy-section">
                <h2><i className="fas fa-globe"></i> 8. International Data Transfers</h2>
                <p>We primarily store and process data within Kenya. If we transfer data internationally, we ensure appropriate safeguards are in place to protect your information.</p>
              </div>

              <div className="privacy-section">
                <h2><i className="fas fa-bell"></i> 9. Updates to This Policy</h2>
                <p>We may update this Privacy Policy periodically. Changes will be posted on this page with an updated revision date. Significant changes will be notified via email or prominent website notice.</p>
              </div>

              <div className="privacy-section">
                <h2><i className="fas fa-phone-alt"></i> 10. Contact Us</h2>
                <p>For privacy-related questions or concerns:</p>
                <ul className="contact-list">
                  <li><i className="fas fa-envelope"></i> Email: <a href="mailto:gathukamau23@gmail.com">gathukamau23@gmail.com</a></li>
                  <li><i className="fas fa-phone"></i> Phone: <a href="tel:+254762610912">+254 762 610 912</a></li>
                  <li><i className="fab fa-whatsapp"></i> WhatsApp: <a href="https://wa.me/254762610912">+254 762 610 912</a></li>
                  <li><i className="fas fa-map-marker-alt"></i> Address: Westlands, Nairobi, Kenya</li>
                </ul>
              </div>

              <div className="privacy-acceptance">
                <p><i className="fas fa-check-circle"></i> By using our services, you consent to the collection and use of your information as described in this Privacy Policy.</p>
              </div>

              <div className="privacy-footer">
                <p>For more information about our data practices, please <Link to="/contact">contact us</Link>.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}