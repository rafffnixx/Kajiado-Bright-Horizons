import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Terms() {
  return (
    <>
      <SEO 
        title="Terms & Conditions - M.K GATHU Financial Consulting"
        description="Read the terms and conditions for using M.K GATHU Financial Consulting services. Learn about our service agreements, fees, confidentiality, and client responsibilities."
        path="/terms"
        noIndex={true}
      />
      
      <div className="terms-page">
        <section className="page-header">
          <div className="container">
            <h1>Terms & <span>Conditions</span></h1>
            <p>Please read these terms carefully before using our services</p>
          </div>
        </section>

        <section className="terms-content">
          <div className="container">
            <div className="terms-card">
              <div className="terms-updated">
                <i className="fas fa-clock"></i> Last Updated: May 27, 2026
              </div>

              <div className="terms-section">
                <h2><i className="fas fa-handshake"></i> 1. Agreement to Terms</h2>
                <p>By accessing or using the services of M.K GATHU Financial Consulting ("we," "our," "us"), you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services.</p>
              </div>

              <div className="terms-section">
                <h2><i className="fas fa-building"></i> 2. About Our Services</h2>
                <p>M.K GATHU Financial Consulting provides professional financial consulting services including but not limited to:</p>
                <ul>
                  <li><i className="fas fa-check-circle"></i> Business registration and start-up support</li>
                  <li><i className="fas fa-check-circle"></i> Tax and KRA compliance services</li>
                  <li><i className="fas fa-check-circle"></i> Payroll management and processing</li>
                  <li><i className="fas fa-check-circle"></i> Debt tracking and management</li>
                  <li><i className="fas fa-check-circle"></i> Financial reporting and analysis</li>
                  <li><i className="fas fa-check-circle"></i> Business advisory and strategy</li>
                </ul>
              </div>

              <div className="terms-section">
                <h2><i className="fas fa-file-signature"></i> 3. Service Agreement</h2>
                <p>All services provided by M.K GATHU Financial Consulting are subject to a separate Service Agreement signed between the client and our firm. These Terms and Conditions supplement but do not replace specific service contracts.</p>
                <p>Key provisions of our service agreements include:</p>
                <ul>
                  <li><i className="fas fa-check-circle"></i> Scope of services to be provided</li>
                  <li><i className="fas fa-check-circle"></i> Fee structure and payment terms</li>
                  <li><i className="fas fa-check-circle"></i> Timeline and deliverables</li>
                  <li><i className="fas fa-check-circle"></i> Confidentiality obligations</li>
                  <li><i className="fas fa-check-circle"></i> Termination conditions</li>
                </ul>
              </div>

              <div className="terms-section">
                <h2><i className="fas fa-money-bill-wave"></i> 4. Fees and Payments</h2>
                <p>Our fees are structured as follows:</p>
                <ul>
                  <li><i className="fas fa-check-circle"></i> <strong>One-time setup fees</strong> - Charged for initial registration and setup services</li>
                  <li><i className="fas fa-check-circle"></i> <strong>Monthly retainer fees</strong> - For ongoing management and compliance services</li>
                  <li><i className="fas fa-check-circle"></i> <strong>Project-based fees</strong> - For specific advisory or consulting projects</li>
                  <li><i className="fas fa-check-circle"></i> <strong>Hourly rates</strong> - For ad-hoc consulting and support</li>
                </ul>
                <p>All fees are quoted in Kenyan Shillings (KES) unless otherwise specified. Payment is due within 14 days of invoice date unless alternative arrangements are made in writing.</p>
              </div>

              <div className="terms-section">
                <h2><i className="fas fa-lock"></i> 5. Confidentiality and Data Protection</h2>
                <p>We take your privacy and data security seriously. Our commitments include:</p>
                <ul>
                  <li><i className="fas fa-check-circle"></i> All client information is treated as strictly confidential</li>
                  <li><i className="fas fa-check-circle"></i> Financial data is stored on secure, encrypted systems</li>
                  <li><i className="fas fa-check-circle"></i> We do not share client information with third parties without consent</li>
                  <li><i className="fas fa-check-circle"></i> Employee access is restricted on a need-to-know basis</li>
                  <li><i className="fas fa-check-circle"></i> Data is retained only as long as necessary for service delivery</li>
                </ul>
                <p>For more details, please review our <Link to="/privacy">Privacy Policy</Link>.</p>
              </div>

              <div className="terms-section">
                <h2><i className="fas fa-gavel"></i> 6. Client Responsibilities</h2>
                <p>As our client, you agree to:</p>
                <ul>
                  <li><i className="fas fa-check-circle"></i> Provide accurate and complete information for service delivery</li>
                  <li><i className="fas fa-check-circle"></i> Respond promptly to requests for documents or information</li>
                  <li><i className="fas fa-check-circle"></i> Make timely payments as agreed in your service contract</li>
                  <li><i className="fas fa-check-circle"></i> Notify us of any changes to your business or contact information</li>
                  <li><i className="fas fa-check-circle"></i> Comply with all applicable laws and regulations</li>
                </ul>
              </div>

              <div className="terms-section">
                <h2><i className="fas fa-exclamation-triangle"></i> 7. Limitation of Liability</h2>
                <p>To the maximum extent permitted by law, M.K GATHU Financial Consulting shall not be liable for:</p>
                <ul>
                  <li><i className="fas fa-check-circle"></i> Indirect, incidental, or consequential damages</li>
                  <li><i className="fas fa-check-circle"></i> Loss of profits, revenue, or business opportunities</li>
                  <li><i className="fas fa-check-circle"></i> Damages resulting from client delays or incomplete information</li>
                  <li><i className="fas fa-check-circle"></i> Third-party actions or system failures beyond our control</li>
                </ul>
                <p>Our total liability is limited to the fees paid by you for the specific service giving rise to the claim.</p>
              </div>

              <div className="terms-section">
                <h2><i className="fas fa-calendar-alt"></i> 8. Termination of Services</h2>
                <p>Either party may terminate the service agreement with written notice as specified in your contract. Upon termination:</p>
                <ul>
                  <li><i className="fas fa-check-circle"></i> All outstanding fees become immediately due</li>
                  <li><i className="fas fa-check-circle"></i> We will return all client documents and data</li>
                  <li><i className="fas fa-check-circle"></i> Confidentiality obligations continue indefinitely</li>
                  <li><i className="fas fa-check-circle"></i> We may assist with transition to a new provider</li>
                </ul>
              </div>

              <div className="terms-section">
                <h2><i className="fas fa-phone-alt"></i> 9. Communication and Notices</h2>
                <p>Official communications regarding these terms or your service agreement will be sent to your registered email address. It is your responsibility to keep your contact information current. We may also communicate via phone or WhatsApp for routine matters.</p>
              </div>

              <div className="terms-section">
                <h2><i className="fas fa-balance-scale"></i> 10. Governing Law</h2>
                <p>These Terms and Conditions are governed by the laws of the Republic of Kenya. Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the courts of Nairobi, Kenya.</p>
              </div>

              <div className="terms-section">
                <h2><i className="fas fa-edit"></i> 11. Modifications to Terms</h2>
                <p>We reserve the right to modify these terms at any time. Changes become effective immediately upon posting to our website. Your continued use of our services after changes constitutes acceptance of the modified terms. Material changes will be notified via email.</p>
              </div>

              <div className="terms-section">
                <h2><i className="fas fa-question-circle"></i> 12. Contact Us</h2>
                <p>If you have any questions about these Terms and Conditions, please contact us:</p>
                <ul className="contact-list">
                  <li><i className="fas fa-envelope"></i> Email: <a href="mailto:gathukamau23@gmail.com">gathukamau23@gmail.com</a></li>
                  <li><i className="fas fa-phone"></i> Phone: <a href="tel:+254762610912">+254 762 610 912</a></li>
                  <li><i className="fab fa-whatsapp"></i> WhatsApp: <a href="https://wa.me/254762610912">+254 762 610 912</a></li>
                  <li><i className="fas fa-map-marker-alt"></i> Address: Westlands, Nairobi, Kenya</li>
                </ul>
              </div>

              <div className="terms-acceptance">
                <p><i className="fas fa-check-circle"></i> By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</p>
              </div>

              <div className="terms-footer">
                <p>For any questions or concerns about these terms, please <Link to="/contact">contact us</Link>.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}