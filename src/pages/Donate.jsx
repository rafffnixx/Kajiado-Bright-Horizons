import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Donate() {
  const [activeTab, setActiveTab] = useState('mpesa');
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
  const [mpesaData, setMpesaData] = useState({
    phoneNumber: '',
    amount: ''
  });

  const presetAmounts = [500, 1000, 2500, 5000, 10000];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    setMpesaData({...mpesaData, amount: amount.toString()});
  };

  const handleCustomAmount = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    setSelectedAmount(null);
    setMpesaData({...mpesaData, amount: value});
  };

  const getTotalAmount = () => {
    if (customAmount) return parseInt(customAmount);
    if (selectedAmount) return selectedAmount;
    return 0;
  };

  // Handle Pesapal API 3.0 Payment
  const handlePesapalPayment = async (e, paymentMethod) => {
    e.preventDefault();
    const amount = getTotalAmount();
    
    if (amount === 0) {
      alert('Please select or enter an amount to donate');
      return;
    }

    // For M-PESA, validate phone number
    if (paymentMethod === 'mpesa') {
      if (!mpesaData.phoneNumber || mpesaData.phoneNumber.length < 9) {
        alert('Please enter a valid M-PESA phone number (e.g., 712345678)');
        return;
      }
    }

    setIsProcessing(true);

    try {
      const response = await fetch('/api/pesapal-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          phoneNumber: paymentMethod === 'mpesa' ? mpesaData.phoneNumber : formData.phone || '0700000000',
          email: formData.email || 'donor@kajiadochildrenshome.org',
          fullName: formData.fullName || 'Kajiado Donor',
          donationType: donationType,
          paymentMethod: paymentMethod // 'mpesa' or 'card'
        })
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to Pesapal checkout page (API 3.0)
        window.location.href = data.paymentUrl;
      } else {
        alert(`❌ Payment failed: ${data.error || 'Please try again'}`);
      }
    } catch (error) {
      console.error('Pesapal Error:', error);
      alert('❌ There was an error processing your payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <SEO 
        title="Donate - Kajiado Children's Home"
        description="Support vulnerable children in Kajiado through M-PESA or card payments via Pesapal. Every contribution makes a difference."
        path="/donate"
      />
      
      <div className="donate-page">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="hero-bg-container">
            <div 
              className="hero-bg-image-about"
              style={{ backgroundImage: 'url("/images/hero/donate-hero.jpg")' }}
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
          {/* Donation Type Toggle */}
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
              {/* Donation Form */}
              <div className="donation-form">
                <h2>Your <span>Donation</span></h2>
                
                {/* Amount Selection */}
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

                {/* Payment Method Tabs */}
                <div className="payment-tabs">
                  <button 
                    className={`payment-tab ${activeTab === 'mpesa' ? 'active' : ''}`}
                    onClick={() => setActiveTab('mpesa')}
                  >
                    <i className="fas fa-mobile-alt"></i> M-PESA
                  </button>
                  <button 
                    className={`payment-tab ${activeTab === 'card' ? 'active' : ''}`}
                    onClick={() => setActiveTab('card')}
                  >
                    <i className="fas fa-credit-card"></i> Card
                  </button>
                </div>

                {/* Payment Method Details */}
                <div className="payment-details">
                  {/* M-PESA via Pesapal */}
                  {activeTab === 'mpesa' && (
                    <div className="payment-method-detail">
                      <h4><i className="fas fa-mobile-alt"></i> M-PESA via Pesapal</h4>
                      <div className="paybill-info">
                        <div className="paybill-row">
                          <span className="label">Paybill Number:</span>
                          <span className="value highlight">123456</span>
                        </div>
                        <div className="paybill-row">
                          <span className="label">Account Number:</span>
                          <span className="value">KCH{Date.now()}</span>
                        </div>
                        <p className="paybill-note">
                          <i className="fas fa-info-circle"></i>
                          You will be redirected to Pesapal's secure page to complete your payment
                        </p>
                      </div>
                      
                      <form onSubmit={(e) => handlePesapalPayment(e, 'mpesa')}>
                        <div className="form-group">
                          <label>Full Name</label>
                          <input
                            type="text"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          />
                        </div>

                        <div className="form-group">
                          <label>Email Address</label>
                          <input
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>

                        <div className="form-group">
                          <label>M-PESA Phone Number *</label>
                          <div className="phone-input-wrapper">
                            <span className="phone-prefix">+254</span>
                            <input
                              type="tel"
                              placeholder="712345678"
                              value={mpesaData.phoneNumber}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '');
                                setMpesaData({...mpesaData, phoneNumber: value});
                              }}
                              required
                              disabled={isProcessing}
                              maxLength="9"
                            />
                          </div>
                          <small className="input-hint">Enter phone number without 0 or +254 (e.g., 712345678)</small>
                        </div>

                        <button 
                          type="submit" 
                          className="btn-gold mpesa-btn"
                          disabled={isProcessing || getTotalAmount() === 0}
                        >
                          {isProcessing ? (
                            <><i className="fas fa-spinner fa-spin"></i> Processing...</>
                          ) : (
                            <><i className="fas fa-mobile-alt"></i> Pay KES {getTotalAmount().toLocaleString()} via Pesapal</>
                          )}
                        </button>
                      </form>

                      <div className="mpesa-steps">
                        <h5>How it works:</h5>
                        <ol>
                          <li>Enter your M-PESA phone number</li>
                          <li>Click "Pay via Pesapal"</li>
                          <li>You'll be redirected to Pesapal's secure page</li>
                          <li>Choose M-PESA as payment method</li>
                          <li>You'll receive a prompt on your phone</li>
                          <li>Enter your PIN to confirm</li>
                        </ol>
                      </div>
                    </div>
                  )}

                  {/* Card Payment via Pesapal */}
                  {activeTab === 'card' && (
                    <div className="payment-method-detail">
                      <h4><i className="fas fa-credit-card"></i> Card Payment via Pesapal</h4>
                      <p className="secure-note">
                        <i className="fas fa-lock"></i> Secure payment processed by Pesapal (PCI-DSS certified)
                      </p>
                      
                      <div className="card-info">
                        <div className="card-logos">
                          <i className="fab fa-cc-visa"></i>
                          <i className="fab fa-cc-mastercard"></i>
                          <i className="fab fa-cc-amex"></i>
                        </div>
                        <p className="card-description">
                          You will be redirected to Pesapal's secure payment page where you can enter your card details.
                          Pesapal is <strong>PCI-DSS certified</strong>, ensuring your card data is handled with the highest security standards.
                        </p>
                      </div>
                      
                      <form onSubmit={(e) => handlePesapalPayment(e, 'card')}>
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

                        <div className="form-group">
                          <label>Phone Number</label>
                          <input 
                            type="tel" 
                            placeholder="+254 712 345 678"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          />
                        </div>

                        <button 
                          type="submit" 
                          className="btn-gold"
                          disabled={isProcessing || getTotalAmount() === 0}
                          style={{width: '100%', justifyContent: 'center', marginTop: '16px'}}
                        >
                          {isProcessing ? (
                            <><i className="fas fa-spinner fa-spin"></i> Processing...</>
                          ) : (
                            <><i className="fas fa-credit-card"></i> Pay KES {getTotalAmount().toLocaleString()} via Pesapal</>
                          )}
                        </button>
                      </form>

                      <div className="mpesa-steps">
                        <h5>How it works:</h5>
                        <ol>
                          <li>Enter your personal details</li>
                          <li>Click "Pay via Pesapal"</li>
                          <li>You'll be redirected to Pesapal's secure page</li>
                          <li>Enter your card details on the PCI-DSS certified page</li>
                          <li>Complete the payment</li>
                        </ol>
                      </div>
                    </div>
                  )}
                </div>

                {/* Personal Information */}
                <div className="personal-info">
                  <h3>Additional Information</h3>
                  <div className="form-group">
                    <label>Message (Optional)</label>
                    <textarea 
                      rows="2"
                      placeholder="Any special instructions or dedication..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>
                </div>

                <div className="donation-security">
                  <i className="fas fa-shield-alt"></i>
                  <span>Your donation is secure and tax-deductible</span>
                </div>
              </div>

              {/* Sidebar */}
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

        {/* CTA Section */}
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
          background: var(--bg-deep);
        }
        
        .donation-type-section {
          padding: 40px 0 20px;
        }
        
        .donation-type-toggle {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .toggle-btn {
          padding: 12px 32px;
          background: var(--card-bg);
          border: 2px solid var(--border-color);
          border-radius: 48px;
          color: var(--text-color);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .toggle-btn.active {
          background: var(--primary-color);
          border-color: var(--primary-color);
          color: #fff;
        }
        
        .toggle-btn:hover {
          border-color: var(--primary-color);
        }
        
        .donation-content {
          padding: 20px 0 60px;
        }
        
        .donation-form-section {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 40px;
        }
        
        .donation-form {
          background: var(--card-bg);
          padding: 40px;
          border-radius: 24px;
          border: 1px solid var(--border-color);
        }
        
        .donation-form h2 {
          font-size: 2rem;
          margin-bottom: 30px;
          color: var(--text-color);
        }
        
        .donation-form h2 span {
          color: var(--primary-color);
        }
        
        .amount-section {
          margin-bottom: 30px;
        }
        
        .amount-section h3 {
          font-size: 1.1rem;
          margin-bottom: 16px;
          color: var(--text-color);
        }
        
        .preset-amounts {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }
        
        .amount-btn {
          padding: 12px;
          background: var(--input-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          color: var(--text-color);
        }
        
        .amount-btn:hover {
          border-color: var(--primary-color);
        }
        
        .amount-btn.active {
          background: var(--primary-color);
          color: #fff;
          border-color: var(--primary-color);
        }
        
        .custom-amount input {
          width: 100%;
          padding: 12px 16px;
          background: var(--input-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          color: var(--text-color);
          font-size: 1rem;
        }
        
        .total-amount {
          margin-top: 16px;
          padding: 16px;
          background: rgba(59, 130, 246, 0.1);
          border-radius: 12px;
          text-align: center;
        }
        
        .total-amount strong {
          font-size: 1.3rem;
          color: var(--primary-color);
        }
        
        .payment-tabs {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }
        
        .payment-tab {
          padding: 14px;
          background: var(--input-bg);
          border: 2px solid var(--border-color);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 0.95rem;
        }
        
        .payment-tab:hover {
          border-color: var(--primary-color);
        }
        
        .payment-tab.active {
          background: var(--primary-color);
          color: #fff;
          border-color: var(--primary-color);
        }
        
        .payment-method-detail {
          padding: 24px;
          background: var(--input-bg);
          border-radius: 16px;
          margin-bottom: 24px;
        }
        
        .payment-method-detail h4 {
          font-size: 1.2rem;
          margin-bottom: 16px;
          color: var(--text-color);
        }
        
        .paybill-info {
          background: rgba(59, 130, 246, 0.05);
          padding: 16px;
          border-radius: 12px;
          margin-bottom: 16px;
        }
        
        .paybill-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid var(--border-color);
        }
        
        .paybill-row:last-child {
          border-bottom: none;
        }
        
        .paybill-row .label {
          color: var(--text-muted);
        }
        
        .paybill-row .value {
          color: var(--text-color);
          font-weight: 500;
        }
        
        .paybill-row .highlight {
          color: var(--primary-color);
          font-weight: 700;
          font-size: 1.1rem;
        }
        
        .paybill-note {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
          font-size: 0.85rem;
          margin-top: 8px;
        }
        
        .paybill-note i {
          color: var(--primary-color);
        }
        
        .phone-input-wrapper {
          display: flex;
          align-items: center;
          background: var(--input-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          overflow: hidden;
        }
        
        .phone-input-wrapper:focus-within {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .phone-prefix {
          padding: 12px 12px 12px 16px;
          background: rgba(59, 130, 246, 0.05);
          color: var(--text-color);
          font-weight: 600;
          border-right: 1px solid var(--border-color);
        }
        
        .phone-input-wrapper input {
          flex: 1;
          padding: 12px 16px;
          border: none;
          background: transparent;
          color: var(--text-color);
          font-size: 1rem;
          outline: none;
        }
        
        .input-hint {
          display: block;
          color: var(--text-muted);
          font-size: 0.75rem;
          margin-top: 4px;
        }
        
        .mpesa-btn {
          width: 100%;
          justify-content: center;
          margin-top: 16px;
          padding: 16px;
          font-size: 1rem;
        }
        
        .mpesa-steps {
          margin-top: 16px;
          padding: 16px;
          background: rgba(59, 130, 246, 0.05);
          border-radius: 12px;
        }
        
        .mpesa-steps h5 {
          color: var(--text-color);
          margin-bottom: 8px;
        }
        
        .mpesa-steps ol {
          margin-left: 20px;
          color: var(--text-muted);
          line-height: 1.8;
          font-size: 0.9rem;
        }
        
        .secure-note {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #4caf50;
          font-size: 0.9rem;
          margin-bottom: 16px;
        }
        
        .card-info {
          text-align: center;
          padding: 16px;
          background: rgba(59, 130, 246, 0.05);
          border-radius: 12px;
          margin-bottom: 16px;
        }
        
        .card-logos {
          display: flex;
          gap: 16px;
          justify-content: center;
          font-size: 2.5rem;
          color: var(--text-muted);
          margin-bottom: 12px;
        }
        
        .card-description {
          color: var(--text-muted);
          font-size: 0.9rem;
          line-height: 1.6;
          margin: 0;
        }
        
        .card-description strong {
          color: var(--text-color);
        }
        
        .personal-info {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid var(--border-color);
        }
        
        .personal-info h3 {
          font-size: 1.1rem;
          margin-bottom: 16px;
          color: var(--text-color);
        }
        
        .donation-security {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 16px;
          color: var(--text-muted);
          font-size: 0.9rem;
        }
        
        .donation-security i {
          color: #4caf50;
        }
        
        .donation-sidebar {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        
        .impact-card,
        .bank-details-card,
        .recurring-card {
          background: var(--card-bg);
          padding: 24px;
          border-radius: 20px;
          border: 1px solid var(--border-color);
        }
        
        .impact-card h3,
        .bank-details-card h3,
        .recurring-card h3 {
          font-size: 1.1rem;
          margin-bottom: 16px;
          color: var(--text-color);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .impact-item {
          padding: 12px 0;
          border-bottom: 1px solid var(--border-color);
        }
        
        .impact-item:last-child {
          border-bottom: none;
        }
        
        .impact-item span {
          display: block;
          font-weight: 700;
          color: var(--primary-color);
          font-size: 1.1rem;
        }
        
        .impact-item p {
          color: var(--text-muted);
          font-size: 0.85rem;
          margin: 4px 0 0;
        }
        
        .bank-detail {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid var(--border-color);
        }
        
        .bank-detail:last-child {
          border-bottom: none;
        }
        
        .bank-detail .label {
          color: var(--text-muted);
          font-size: 0.85rem;
        }
        
        .bank-detail .value {
          color: var(--text-color);
          font-weight: 500;
          font-size: 0.85rem;
        }
        
        .bank-detail .highlight {
          color: var(--primary-color);
          font-weight: 700;
        }
        
        .recurring-card p {
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 16px;
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
          
          .preset-amounts {
            grid-template-columns: repeat(3, 1fr);
          }
          
          .payment-tabs {
            grid-template-columns: 1fr;
          }
          
          .donation-type-toggle {
            flex-direction: column;
          }
          
          .donation-type-toggle .toggle-btn {
            width: 100%;
            justify-content: center;
          }
        }
        
        @media (max-width: 480px) {
          .preset-amounts {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </>
  );
}