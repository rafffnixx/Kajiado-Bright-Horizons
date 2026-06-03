import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import CONFIG from '../config';

export default function Donate() {
  const [amount, setAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const [activeTab, setActiveTab] = useState('money');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [goodsDescription, setGoodsDescription] = useState('');
  const [volunteerArea, setVolunteerArea] = useState('');
  const [volunteerSkills, setVolunteerSkills] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const presetAmounts = [500, 1000, 2500, 5000, 10000];

  const handleMoneyDonation = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setSubmitStatus({ type: 'success', message: `Thank you for your donation of KES ${amount}! Use Paybill 247247, Account KCH to complete payment.` });
      setAmount('');
      setDonorName('');
      setDonorEmail('');
      setDonorPhone('');
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 8000);
    }, 1000);
  };

  const handleGoodsDonation = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setSubmitStatus({ type: 'success', message: 'Thank you! We will contact you within 2-3 business days to arrange donation pickup or drop-off.' });
      setDonorName('');
      setDonorEmail('');
      setDonorPhone('');
      setGoodsDescription('');
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 8000);
    }, 1000);
  };

  const handleVolunteerSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setSubmitStatus({ type: 'success', message: 'Thank you for volunteering! We will contact you soon.' });
      setDonorName('');
      setDonorEmail('');
      setDonorPhone('');
      setVolunteerArea('');
      setVolunteerSkills('');
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 8000);
    }, 1000);
  };

  const impactOptions = [
    { amount: 500, impact: "School supplies for 1 child" },
    { amount: 2500, impact: "Monthly sponsorship for 1 child" },
    { amount: 5000, impact: "Uniforms for 5 children" },
    { amount: 10000, impact: "Feed 20 children for 1 week" }
  ];

  return (
    <>
      <SEO 
        title="Donate - Support Kajiado Children's Home"
        description="Make a donation to Kajiado Children's Home. Your generosity provides shelter, education, healthcare, and love to vulnerable children in Kajiado, Kenya."
        path="/donate"
      />
      
      <div className="donate-page">
        {/* Hero Section with Background Image */}
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
              <p>Your generosity transforms young lives in Kajiado</p>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="donation-tabs">
          <div className="container">
            <div className="tabs-container">
              <button
                onClick={() => setActiveTab('money')}
                className={`tab-btn ${activeTab === 'money' ? 'active' : ''}`}
              >
                <i className="fas fa-money-bill-wave"></i> Money Donation
              </button>
              <button
                onClick={() => setActiveTab('goods')}
                className={`tab-btn ${activeTab === 'goods' ? 'active' : ''}`}
              >
                <i className="fas fa-box-open"></i> Goods & Foodstuff
              </button>
              <button
                onClick={() => setActiveTab('volunteer')}
                className={`tab-btn ${activeTab === 'volunteer' ? 'active' : ''}`}
              >
                <i className="fas fa-hands-helping"></i> Volunteer
              </button>
            </div>
          </div>
        </div>

        <div className="container">
          {submitStatus && (
            <div className={`form-feedback ${submitStatus.type}`} style={{ marginBottom: '30px' }}>
              {submitStatus.message}
            </div>
          )}

          {/* Money Donation Tab */}
          {activeTab === 'money' && (
            <div className="donation-content">
              <div className="donation-form-section">
                <div className="donation-form">
                  <h2>Donation Amount</h2>
                  
                  {/* Donation Type Toggle */}
                  <div className="donation-type-toggle">
                    <button
                      className={`toggle-btn ${donationType === 'one-time' ? 'active' : ''}`}
                      onClick={() => setDonationType('one-time')}
                    >
                      One-Time
                    </button>
                    <button
                      className={`toggle-btn ${donationType === 'monthly' ? 'active' : ''}`}
                      onClick={() => setDonationType('monthly')}
                    >
                      Monthly
                    </button>
                  </div>

                  {/* Preset Amounts */}
                  <div className="preset-amounts">
                    {presetAmounts.map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setAmount(preset.toString())}
                        className={`amount-btn ${amount === preset.toString() ? 'active' : ''}`}
                      >
                        KES {preset.toLocaleString()}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="custom-amount">
                    <label>Custom Amount (KES)</label>
                    <input
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>

                  {/* Personal Info */}
                  <h3>Your Information</h3>
                  <form onSubmit={handleMoneyDonation}>
                    <div className="form-row">
                      <input 
                        type="text" 
                        placeholder="Full Name *" 
                        required 
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                      />
                      <input 
                        type="email" 
                        placeholder="Email Address *" 
                        required 
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-row">
                      <input 
                        type="tel" 
                        placeholder="Phone Number" 
                        value={donorPhone}
                        onChange={(e) => setDonorPhone(e.target.value)}
                      />
                      <select>
                        <option>Kenya</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <button type="submit" className="btn-gold" disabled={isSubmitting}>
                      {isSubmitting ? <><i className="fas fa-spinner fa-spin"></i> Processing...</> : 'Proceed to Payment'}
                    </button>
                  </form>
                </div>

                {/* Payment Methods Sidebar */}
                <div className="payment-sidebar">
                  <div className="payment-card">
                    <h3><i className="fas fa-mobile-alt"></i> M-Pesa Paybill</h3>
                    <div className="paybill-details">
                      <p>Paybill Number:</p>
                      <p className="paybill-number">247247</p>
                      <p>Account Number:</p>
                      <p className="account-number">KCH</p>
                    </div>
                    <div className="steps">
                      <p>Steps:</p>
                      <ol>
                        <li>Go to M-Pesa menu</li>
                        <li>Select "Lipa na M-Pesa"</li>
                        <li>Choose "Paybill"</li>
                        <li>Enter Business No: <strong>247247</strong></li>
                        <li>Enter Account: <strong>KCH</strong></li>
                        <li>Enter Amount</li>
                        <li>Enter M-Pesa PIN</li>
                        <li>Confirm payment</li>
                      </ol>
                    </div>
                  </div>

                  <div className="payment-card">
                    <h3><i className="fas fa-credit-card"></i> Other Payment Methods</h3>
                    <ul className="payment-methods">
                      <li><i className="fab fa-cc-visa"></i> Visa / Mastercard</li>
                      <li><i className="fas fa-university"></i> Bank Transfer</li>
                    </ul>
                    <div className="bank-details">
                      <p>Bank: Equity Bank</p>
                      <p>Account: Kajiado Children's Home</p>
                      <p>Account No: 1234567890</p>
                    </div>
                  </div>

                  <div className="impact-card">
                    <h3><i className="fas fa-chart-line"></i> Impact of Your Donation</h3>
                    <ul>
                      {impactOptions.map((option, index) => (
                        <li key={index}>
                          <strong>KES {option.amount.toLocaleString()}</strong> = {option.impact}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Goods & Foodstuff Donation Tab */}
          {activeTab === 'goods' && (
            <div className="donation-content">
              <div className="goods-donation">
                <div className="goods-form">
                  <h2>Donate Goods & Foodstuff</h2>
                  <p>Your in-kind donations make a direct impact on our children's lives.</p>
                  
                  <h3>Items We Need:</h3>
                  <div className="items-grid">
                    <div className="item-card">🍚 Food Items<br /><span>Maize, beans, rice, cooking oil, sugar</span></div>
                    <div className="item-card">👕 Clothing<br /><span>Children's clothes, shoes, uniforms</span></div>
                    <div className="item-card">📚 School Supplies<br /><span>Books, pens, notebooks, backpacks</span></div>
                    <div className="item-card">🛏️ Bedding<br /><span>Blankets, sheets, mattresses</span></div>
                    <div className="item-card">⚽ Sports Equipment<br /><span>Balls, nets, sports uniforms</span></div>
                    <div className="item-card">💻 Electronics<br /><span>Computers, tablets, projectors</span></div>
                  </div>

                  <h3>Donation Process:</h3>
                  <div className="process-steps">
                    <ol>
                      <li>Fill in your contact information below</li>
                      <li>We will contact you to arrange drop-off or pickup</li>
                      <li>Bring items to: Kajiado Children's Home, Kajiado Town</li>
                      <li>For large donations, we can arrange pickup</li>
                    </ol>
                  </div>

                  <form onSubmit={handleGoodsDonation}>
                    <div className="form-row">
                      <input 
                        type="text" 
                        placeholder="Full Name *" 
                        required 
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                      />
                      <input 
                        type="email" 
                        placeholder="Email Address *" 
                        required 
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-row">
                      <input 
                        type="tel" 
                        placeholder="Phone Number *" 
                        required 
                        value={donorPhone}
                        onChange={(e) => setDonorPhone(e.target.value)}
                      />
                    </div>
                    <textarea 
                      rows="4" 
                      placeholder="What items would you like to donate? *"
                      required
                      value={goodsDescription}
                      onChange={(e) => setGoodsDescription(e.target.value)}
                    ></textarea>
                    <button type="submit" className="btn-gold" disabled={isSubmitting}>
                      {isSubmitting ? <><i className="fas fa-spinner fa-spin"></i> Submitting...</> : 'Submit Donation Offer'}
                    </button>
                  </form>
                </div>

                <div className="goods-info">
                  <h3><i className="fas fa-map-marker-alt"></i> Drop-off Location</h3>
                  <p>Kajiado Children's Home<br />Kajiado Town, Kajiado County<br />Kenya</p>
                  
                  <h3><i className="fas fa-phone-alt"></i> Contact for Drop-off</h3>
                  <p>Phone: +254 700 123 456</p>
                  <p>Email: donations@kajiadochildrenhome.org</p>
                  
                  <h3><i className="fas fa-clock"></i> Drop-off Hours</h3>
                  <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                  <p>Saturday: 10:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
          )}

          {/* Volunteer Tab */}
          {activeTab === 'volunteer' && (
            <div className="donation-content">
              <div className="volunteer-donation">
                <div className="volunteer-form">
                  <h2>Volunteer With Us</h2>
                  <p>Share your time, skills, and passion to make a difference in children's lives.</p>
                  
                  <h3>Volunteer Opportunities:</h3>
                  <div className="opportunities-grid">
                    <div className="opportunity-card">📚 Teaching & Tutoring<br /><span>Help children with homework and lessons</span></div>
                    <div className="opportunity-card">⚽ Sports & Recreation<br /><span>Organize games and sports activities</span></div>
                    <div className="opportunity-card">🏥 Medical/Healthcare<br /><span>Health checkups and medical care</span></div>
                    <div className="opportunity-card">🤝 Mentorship<br /><span>Be a role model for our children</span></div>
                    <div className="opportunity-card">💰 Fundraising<br /><span>Help organize fundraising events</span></div>
                    <div className="opportunity-card">🔧 Maintenance & Construction<br /><span>Help maintain our facilities</span></div>
                  </div>

                  <form onSubmit={handleVolunteerSubmit}>
                    <div className="form-row">
                      <input 
                        type="text" 
                        placeholder="Full Name *" 
                        required 
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                      />
                      <input 
                        type="email" 
                        placeholder="Email Address *" 
                        required 
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-row">
                      <input 
                        type="tel" 
                        placeholder="Phone Number *" 
                        required 
                        value={donorPhone}
                        onChange={(e) => setDonorPhone(e.target.value)}
                      />
                      <select 
                        required 
                        value={volunteerArea}
                        onChange={(e) => setVolunteerArea(e.target.value)}
                      >
                        <option value="">Select Area of Interest</option>
                        <option>Teaching & Tutoring</option>
                        <option>Sports & Recreation</option>
                        <option>Medical/Healthcare</option>
                        <option>Mentorship</option>
                        <option>Fundraising</option>
                        <option>Maintenance & Construction</option>
                        <option>Administration</option>
                      </select>
                    </div>
                    <textarea 
                      rows="4" 
                      placeholder="Tell us about your skills and availability... *"
                      required
                      value={volunteerSkills}
                      onChange={(e) => setVolunteerSkills(e.target.value)}
                    ></textarea>
                    <button type="submit" className="btn-gold" disabled={isSubmitting}>
                      {isSubmitting ? <><i className="fas fa-spinner fa-spin"></i> Submitting...</> : 'Submit Volunteer Application'}
                    </button>
                  </form>
                </div>

                <div className="volunteer-info">
                  <h3><i className="fas fa-clipboard-list"></i> Volunteer Requirements</h3>
                  <ul>
                    <li>✓ Minimum age: 18 years</li>
                    <li>✓ Commitment of at least 2 hours per week</li>
                    <li>✓ Passion for working with children</li>
                    <li>✓ Clean background check (for certain roles)</li>
                    <li>✓ Orientation session required</li>
                  </ul>
                  
                  <h3><i className="fas fa-gift"></i> Benefits of Volunteering</h3>
                  <ul>
                    <li>✓ Make a direct impact on children's lives</li>
                    <li>✓ Gain valuable experience</li>
                    <li>✓ Meet like-minded people</li>
                    <li>✓ Volunteer certificate provided</li>
                    <li>✓ Meal provided during volunteer hours</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Every Contribution Counts</h2>
              <p>Your support, whether big or small, makes a lasting impact on a child's life</p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn-outline">
                  <i className="fas fa-envelope"></i> Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}