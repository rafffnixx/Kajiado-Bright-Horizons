// src/pages/Donate.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const presetAmounts = [500, 1000, 2500, 5000, 10000];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmount = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const getTotalAmount = () => {
    if (customAmount) return parseInt(customAmount);
    if (selectedAmount) return selectedAmount;
    return 0;
  };

  // Handle Pesapal API 3.0 Payment
  const handlePesapalPayment = async (e) => {
    e.preventDefault();
    const amount = getTotalAmount();
    
    if (amount === 0) {
      alert('Please select or enter an amount to donate');
      return;
    }

    // Validate phone number
    if (!formData.phone || formData.phone.length < 9) {
      alert('Please enter a valid phone number (e.g., 712345678)');
      return;
    }

    // Store donation data in localStorage for the success page
    const donationData = {
      fullName: formData.fullName || 'Anonymous',
      email: formData.email || '',
      phone: formData.phone || '',
      paymentMethod: 'PesaPal',
      donationType: donationType,
      amount: amount.toString(),
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('donationData', JSON.stringify(donationData));
    localStorage.setItem('donationAmount', amount.toString());

    setIsProcessing(true);

    try {
      const response = await fetch('/api/pesapal/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          phoneNumber: formData.phone || '0700000000',
          email: formData.email || 'donor@kajiadochildrenshome.org',
          fullName: formData.fullName || 'Kajiado Donor',
          donationType: donationType,
          paymentMethod: 'pesapal' // Pesapal handles both M-PESA and Card
        })
      });

      const data = await response.json();

      if (data.success) {
        console.log('✅ Payment initiated, waiting for confirmation...');
        console.log('📝 Donor data stored in localStorage, will be logged on confirmation');
        window.location.href = data.paymentUrl;
      } else {
        alert(`❌ Payment failed: ${data.error || 'Please try again'}`);
        localStorage.removeItem('donationData');
        localStorage.removeItem('donationAmount');
      }
    } catch (error) {
      console.error('Pesapal Error:', error);
      alert('❌ There was an error processing your payment. Please try again.');
      localStorage.removeItem('donationData');
      localStorage.removeItem('donationAmount');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
    <SEO 
      title="Donate - Kajiado Bright Horizons"
      description="Support vulnerable children in Kajiado through M-PESA, Airtel Money, or card payments. Every contribution makes a difference in a child's life."
      path="/donate"
      keywords={['donate to charity', 'child sponsorship', 'M-PESA donation', 'support orphans Kenya', 'Kajiado Bright Horizons donation']}
    />
      
      <div className="donate-page">
        <section className="about-hero">
          <div className="hero-bg-container">
            <div 
              className="hero-bg-image-about"
              style={{ backgroundImage: 'url("/images/hero/get-involved-hero.jpg")' }}
            ></div>
            <div className="hero-overlay-dark"></div>
          </div>
          <div className="container">
            <div className="hero-content-about">
              <h1>Make a <span>Donation</span></h1>
              <p>Your generosity transforms lives and builds brighter futures</p>
            </div>
          </div>
        </section>

        <div className="container">
          <section className="donation-type-section">
            <div className="donation-type-toggle">
              <button 
                className={`toggle-btn ${donationType === 'one-time' ? 'active' : ''}`}
                onClick={() => setDonationType('one-time')}
              >
                <i className="fas fa-hand-holding-heart"></i> One-Time Donation
              </button>
              <button 
                className={`toggle-btn ${donationType === 'monthly' ? 'active' : ''}`}
                onClick={() => setDonationType('monthly')}
              >
                <i className="fas fa-calendar-check"></i> Monthly Giving
              </button>
            </div>
          </section>

          <section className="donation-content">
            <div className="donation-form-section">
              <div className="donation-form">
                <h2>Your <span>Donation</span></h2>
                
                <div className="amount-section">
                  <h3>Select Amount (KES)</h3>
                  <div className="preset-amounts">
                    {presetAmounts.map((amount) => (
                      <button
                        key={amount}
                        className={`amount-btn ${selectedAmount === amount ? 'active' : ''}`}
                        onClick={() => handleAmountSelect(amount)}
                      >
                        KES {amount.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <div className="custom-amount">
                    <label>Or enter custom amount:</label>
                    <input
                      type="number"
                      placeholder="Enter amount in KES"
                      value={customAmount}
                      onChange={handleCustomAmount}
                      min="10"
                      step="10"
                    />
                  </div>
                  <div className="total-amount">
                    <strong>Total: KES {getTotalAmount().toLocaleString()}</strong>
                  </div>
                </div>

                <div className="payment-method-detail">
                  <h4><i className="fas fa-lock"></i> Secure Payment via Pesapal</h4>
                  <div className="paybill-info">
                    <p className="paybill-note">
                      <i className="fas fa-info-circle"></i>
                      Pesapal secure page where you can choose to pay via <strong>M-PESA</strong>, <strong>Airtel Money</strong>, or <strong>Card</strong>.
                    </p>
                  </div>
                  
                  <form onSubmit={handlePesapalPayment}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Full Name *</label>
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Email Address *</label>
                        <input
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Phone Number *</label>
                      <div className="phone-input-wrapper">
                        <span className="phone-prefix">+254</span>
                        <input
                          type="tel"
                          placeholder="712345678"
                          value={formData.phone}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            setFormData({...formData, phone: value});
                          }}
                          required
                          disabled={isProcessing}
                          maxLength="9"
                        />
                      </div>
                      <small className="input-hint">Enter phone number without 0 or +254 (e.g., 712345678)</small>
                    </div>

                    <div className="form-group">
                      <label>Message (Optional)</label>
                      <textarea 
                        rows="2"
                        placeholder="Any special instructions or dedication..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="btn-gold"
                      disabled={isProcessing || getTotalAmount() === 0}
                      style={{width: '100%', justifyContent: 'center'}}
                    >
                      {isProcessing ? (
                        <><i className="fas fa-spinner fa-spin"></i> Processing...</>
                      ) : (
                        <><i className="fas fa-shield-alt"></i> Pay KES {getTotalAmount().toLocaleString()} via Pesapal</>
                      )}
                    </button>
                  </form>

                  <div className="payment-info">
                    <div className="payment-icons">
                      <i className="fas fa-mobile-alt" title="M-PESA"></i>
                      <i className="fas fa-credit-card" title="Card"></i>
                      <i className="fas fa-university" title="Bank Transfer"></i>
                    </div>
                    <p className="secure-note">
                      <i className="fas fa-lock"></i> PCI-DSS Certified • Secure • Encrypted
                    </p>
                  </div>

                  <div className="payment-steps">
                    <h5>How it works:</h5>
                    <ol>
                      <li>Fill in your personal details</li>
                      <li>Click "Pay via Pesapal"</li>
                      <li>You'll be redirected to Pesapal's secure page</li>
                      <li>Choose your preferred payment method:</li>
                      <ul>
                        <li>📱 M-PESA or Airtel Money</li>
                        <li>💳 Visa, Mastercard, or Amex</li>
                      </ul>
                      <li>Complete the payment</li>
                      <li>You'll receive a confirmation email</li>
                    </ol>
                  </div>
                </div>

                <div className="donation-security">
                  <i className="fas fa-shield-alt"></i>
                  <span>Your donation is secure and tax-deductible</span>
                </div>
              </div>

              <div className="donation-sidebar">
                <div className="impact-card">
                  <h3><i className="fas fa-heart"></i> Your Impact</h3>
                  <div className="impact-item">
                    <span>KES 500</span>
                    <p>Provides 1 week of meals for a child</p>
                  </div>
                  <div className="impact-item">
                    <span>KES 2,500</span>
                    <p>Sponsors a child for 1 month</p>
                  </div>
                  <div className="impact-item">
                    <span>KES 5,000</span>
                    <p>Covers school fees for 1 term</p>
                  </div>
                  <div className="impact-item">
                    <span>KES 10,000</span>
                    <p>Provides medical care for 5 children</p>
                  </div>
                </div>

                <div className="bank-details-card">
                  <h3><i className="fas fa-university"></i> Bank Transfer</h3>
                  <div className="bank-detail">
                    <span className="label">Bank:</span>
                    <span className="value">Equity Bank Kenya</span>
                  </div>
                  <div className="bank-detail">
                    <span className="label">Account Name:</span>
                    <span className="value">Kajiado Children's Home</span>
                  </div>
                  <div className="bank-detail">
                    <span className="label">Account Number:</span>
                    <span className="value highlight">0123456789</span>
                  </div>
                  <div className="bank-detail">
                    <span className="label">Branch:</span>
                    <span className="value">Kajiado Town</span>
                  </div>
                </div>

                <div className="recurring-card">
                  <h3><i className="fas fa-calendar-check"></i> Monthly Giving</h3>
                  <p>Become a monthly donor and provide sustainable support to our children.</p>
                  <Link to="/contact" className="btn-outline" style={{width: '100%', justifyContent: 'center'}}>
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Other Ways to Support</h2>
              <p>Partner with us through child sponsorship, volunteering, or donating items</p>
              <div className="cta-buttons">
                <Link to="/children" className="btn-gold">
                  <i className="fas fa-child"></i> Sponsor a Child
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
        .donate-page {
          background: #f0f4f8;
          min-height: 100vh;
        }

        .about-hero {
          background: linear-gradient(135deg, #1a365d 0%, #2b6cb0 50%, #2563eb 100%) !important;
          padding: 100px 0 70px !important;
          min-height: 350px;
          display: flex;
          align-items: center;
        }

        .hero-content-about h1 {
          color: #ffffff !important;
          font-size: 2.8rem;
          font-weight: 700;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .hero-content-about h1 span {
          color: #f6e05e !important;
        }

        .hero-content-about p {
          color: #e2e8f0 !important;
          font-size: 1.2rem;
        }

        .donation-type-section {
          padding: 30px 0 20px;
        }

        .donation-type-toggle {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .toggle-btn {
          padding: 12px 32px;
          background: #ffffff;
          border: 2px solid #e2e8f0;
          border-radius: 48px;
          color: #2d3748;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .toggle-btn:hover {
          border-color: #2563eb;
          transform: translateY(-2px);
        }

        .toggle-btn.active {
          background: #2563eb;
          border-color: #2563eb;
          color: #ffffff;
        }

        .donation-content {
          padding: 10px 0 60px;
        }

        .donation-form-section {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 40px;
        }

        .donation-form {
          background: #ffffff;
          padding: 40px;
          border-radius: 24px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
        }

        .donation-form h2 {
          font-size: 2rem;
          margin-bottom: 30px;
          color: #1a202c;
        }

        .donation-form h2 span {
          color: #2563eb;
        }

        .amount-section {
          margin-bottom: 30px;
        }

        .amount-section h3 {
          font-size: 1.1rem;
          margin-bottom: 16px;
          color: #2d3748;
        }

        .preset-amounts {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }

        .amount-btn {
          padding: 12px;
          background: #f7fafc;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          color: #2d3748;
        }

        .amount-btn:hover {
          border-color: #2563eb;
          background: rgba(37, 99, 235, 0.05);
        }

        .amount-btn.active {
          background: #2563eb;
          color: #ffffff;
          border-color: #2563eb;
        }

        .custom-amount input {
          width: 100%;
          padding: 12px 16px;
          background: #f7fafc;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          color: #1a202c;
          font-size: 1rem;
        }

        .custom-amount input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
          outline: none;
        }

        .total-amount {
          margin-top: 16px;
          padding: 16px;
          background: rgba(37, 99, 235, 0.08);
          border-radius: 12px;
          text-align: center;
        }

        .total-amount strong {
          font-size: 1.3rem;
          color: #2563eb;
        }

        .payment-method-detail {
          padding: 24px;
          background: #f7fafc;
          border-radius: 16px;
          margin-bottom: 24px;
          border: 1px solid #e2e8f0;
        }

        .payment-method-detail h4 {
          font-size: 1.2rem;
          margin-bottom: 16px;
          color: #1a202c;
        }

        .paybill-info {
          background: rgba(37, 99, 235, 0.05);
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 16px;
        }

        .paybill-note {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #4a5568;
          font-size: 0.9rem;
          margin: 0;
        }

        .paybill-note i {
          color: #2563eb;
        }

        .form-group {
          margin-bottom: 18px;
        }

        .form-group label {
          display: block;
          margin-bottom: 6px;
          font-weight: 500;
          color: #2d3748;
          font-size: 0.9rem;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 12px 16px;
          background: #ffffff;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          color: #1a202c;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
          outline: none;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .phone-input-wrapper {
          display: flex;
          align-items: center;
          background: #ffffff;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
        }

        .phone-input-wrapper:focus-within {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
        }

        .phone-prefix {
          padding: 12px 12px 12px 16px;
          background: rgba(37, 99, 235, 0.06);
          color: #2d3748;
          font-weight: 600;
          border-right: 1px solid #e2e8f0;
        }

        .phone-input-wrapper input {
          flex: 1;
          padding: 12px 16px;
          border: none !important;
          background: transparent !important;
          color: #1a202c;
          font-size: 1rem;
          outline: none;
          box-shadow: none !important;
        }

        .input-hint {
          display: block;
          color: #718096;
          font-size: 0.75rem;
          margin-top: 4px;
        }

        .btn-gold {
          background: linear-gradient(105deg, #2563eb, #1d4ed8);
          border: none;
          padding: 14px 36px;
          font-weight: 700;
          border-radius: 48px;
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
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(37, 99, 235, 0.45);
        }

        .btn-gold:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .btn-outline {
          background: transparent;
          border: 2px solid #2563eb;
          padding: 12px 32px;
          border-radius: 48px;
          color: #2563eb;
          font-weight: 600;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .btn-outline:hover {
          background: #2563eb;
          color: #ffffff !important;
          transform: translateY(-2px);
        }

        .payment-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #e2e8f0;
          margin-bottom: 12px;
        }

        .payment-icons {
          display: flex;
          gap: 16px;
          font-size: 1.5rem;
          color: #718096;
        }

        .payment-icons i {
          transition: color 0.3s ease;
        }

        .payment-icons i:hover {
          color: #2563eb;
        }

        .secure-note {
          color: #4a5568;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .secure-note i {
          color: #2563eb;
        }

        .payment-steps {
          margin-top: 12px;
          padding: 16px;
          background: rgba(37, 99, 235, 0.05);
          border-radius: 12px;
        }

        .payment-steps h5 {
          color: #1a202c;
          margin-bottom: 8px;
          font-size: 0.95rem;
        }

        .payment-steps ol {
          margin-left: 20px;
          color: #4a5568;
          line-height: 1.8;
          font-size: 0.9rem;
        }

        .payment-steps ul {
          margin-left: 20px;
          color: #4a5568;
          line-height: 1.8;
          font-size: 0.9rem;
          list-style: none;
        }

        .payment-steps ul li {
          padding: 2px 0;
        }

        .personal-info {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #e2e8f0;
        }

        .personal-info h3 {
          font-size: 1.1rem;
          margin-bottom: 16px;
          color: #1a202c;
        }

        .donation-security {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 16px;
          color: #4a5568;
          font-size: 0.9rem;
        }

        .donation-security i {
          color: #48bb78;
        }

        .donation-sidebar {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .impact-card,
        .bank-details-card,
        .recurring-card {
          background: #ffffff;
          padding: 24px;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
        }

        .impact-card h3,
        .bank-details-card h3,
        .recurring-card h3 {
          font-size: 1.1rem;
          margin-bottom: 16px;
          color: #1a202c;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .impact-item {
          padding: 12px 0;
          border-bottom: 1px solid #e2e8f0;
        }

        .impact-item:last-child {
          border-bottom: none;
        }

        .impact-item span {
          display: block;
          font-weight: 700;
          color: #2563eb;
          font-size: 1.1rem;
        }

        .impact-item p {
          color: #4a5568;
          font-size: 0.85rem;
          margin: 4px 0 0;
        }

        .bank-detail {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #e2e8f0;
        }

        .bank-detail:last-child {
          border-bottom: none;
        }

        .bank-detail .label {
          color: #718096;
          font-size: 0.85rem;
        }

        .bank-detail .value {
          color: #1a202c;
          font-weight: 500;
          font-size: 0.85rem;
        }

        .bank-detail .highlight {
          color: #2563eb;
          font-weight: 700;
        }

        .recurring-card p {
          color: #4a5568;
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .cta-section {
          padding: 60px 0;
          background: linear-gradient(135deg, #1a365d, #2563eb) !important;
        }

        .cta-content h2 {
          color: #ffffff !important;
        }

        .cta-content p {
          color: #e2e8f0 !important;
        }

        @media (max-width: 1024px) {
          .donation-form-section {
            grid-template-columns: 1fr;
          }
          
          .donation-sidebar {
            order: -1;
          }
        }

        @media (max-width: 768px) {
          .donation-form {
            padding: 24px;
          }

          .donation-form h2 {
            font-size: 1.6rem;
          }

          .preset-amounts {
            grid-template-columns: repeat(3, 1fr);
          }
          
          .donation-type-toggle {
            flex-direction: column;
          }
          
          .donation-type-toggle .toggle-btn {
            width: 100%;
            justify-content: center;
          }

          .about-hero {
            padding: 80px 0 50px !important;
          }

          .hero-content-about h1 {
            font-size: 2rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .payment-info {
            flex-direction: column;
            gap: 8px;
            align-items: flex-start;
          }
        }

        @media (max-width: 480px) {
          .preset-amounts {
            grid-template-columns: repeat(2, 1fr);
          }

          .donation-form {
            padding: 16px;
          }
        }
      `}</style>
    </>
  );
}