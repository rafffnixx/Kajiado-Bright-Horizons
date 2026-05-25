import React, { useState } from 'react';
import CONFIG from '../config';
import { submitReview } from '../services/googleSheetsService';

export default function Reviews() {
  const [filter, setFilter] = useState('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    position: '',
    rating: 5,
    service: '',
    review: '',
    agreeToTerms: false
  });

  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Njeri K.",
      company: "InnovateTech Solutions",
      position: "Startup Founder",
      rating: 5,
      content: "M.K GATHU transformed our financial records and ensured full KRA compliance. Our profitability soared within 6 months. Their attention to detail and proactive advice has been invaluable.",
      service: "Tax & KRA Compliance",
      date: "2025-02-15",
      verified: true,
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      id: 2,
      name: "James M.",
      company: "SmartMart Retail Chain",
      position: "Managing Director",
      rating: 5,
      content: "Professional payroll & debt tracking services. Their advisory played a huge role in securing our business loan. I highly recommend their comprehensive financial management.",
      service: "Payroll & Debt Tracking",
      date: "2025-01-20",
      verified: true,
      image: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      id: 3,
      name: "Dr. Sarah Wanjiku",
      company: "Nairobi Wellness Center",
      position: "CEO",
      rating: 5,
      content: "The team at M.K GATHU helped us navigate complex KRA requirements and set up proper accounting systems. Now we have clear financial visibility and peace of mind.",
      service: "Business Start-Up",
      date: "2024-12-10",
      verified: true,
      image: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    {
      id: 4,
      name: "Peter Odhiambo",
      company: "Coastal Logistics",
      position: "Operations Director",
      rating: 4,
      content: "Excellent advisory services that helped us restructure our debt and improve cash flow. Their financial reports give us the insights we need to make better decisions.",
      service: "Business Advisory",
      date: "2024-11-05",
      verified: true,
      image: "https://randomuser.me/api/portraits/men/4.jpg"
    },
    {
      id: 5,
      name: "Grace Muthoni",
      company: "Graceful Events",
      position: "Owner",
      rating: 5,
      content: "From business registration to daily money management, M.K GATHU has been our trusted partner. They handle everything so we can focus on growing our business.",
      service: "Daily Money Management",
      date: "2024-10-18",
      verified: true,
      image: "https://randomuser.me/api/portraits/women/5.jpg"
    },
    {
      id: 6,
      name: "Michael Kipchoge",
      company: "Highland Farmers Co-op",
      position: "Chairman",
      rating: 5,
      content: "Their KRA Compliance Plus service saved us from hefty penalties. They represent us before KRA and ensure all filings are accurate and on time. Highly professional!",
      service: "KRA Compliance",
      date: "2024-09-22",
      verified: true,
      image: "https://randomuser.me/api/portraits/men/6.jpg"
    }
  ]);

  const servicesList = ['all', ...new Set(testimonials.map(t => t.service))];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setSubmissionError('');
    setIsSubmitting(true);

    // Validation
    if (!formData.name || !formData.email || !formData.review) {
      setSubmissionError('Please fill in all required fields (Name, Email, and Review)');
      setIsSubmitting(false);
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setSubmissionError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setSubmissionError('Please agree to the terms and conditions');
      setIsSubmitting(false);
      return;
    }

    // Submit using the centralized service
    const result = await submitReview(formData);
    
    if (result.success) {
      console.log('✅ Review submitted successfully!');
      console.log('📧 Email notification sent to admin');
      console.log('📊 Data saved to Google Sheet');

      // Create new review for display (unverified)
      const newReview = {
        id: testimonials.length + 1,
        name: formData.name,
        company: formData.company || 'Happy Client',
        position: formData.position || 'Client',
        rating: parseInt(formData.rating),
        content: formData.review,
        service: formData.service || 'General Services',
        date: new Date().toISOString().split('T')[0],
        verified: false,
        image: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=D4AF37&color=fff&length=2`
      };

      setTestimonials([newReview, ...testimonials]);
      setSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        position: '',
        rating: 5,
        service: '',
        review: '',
        agreeToTerms: false
      });

      setTimeout(() => setSubmitted(false), 5000);
      
    } else {
      console.error('❌ Submission error:', result.error);
      setSubmissionError('There was an error submitting your review. Please try again or contact us directly.');
    }
    
    setIsSubmitting(false);
  };

  const filteredTestimonials = filter === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.service === filter);

  const renderStars = (rating) => {
    return Array(5).fill().map((_, i) => (
      <i key={i} className={`fas fa-star ${i < rating ? 'filled' : 'empty'}`}></i>
    ));
  };

  const renderRatingInput = (currentRating) => {
    return (
      <div className="rating-input">
        {[5, 4, 3, 2, 1].map(star => (
          <label key={star} className="rating-star">
            <input 
              type="radio" 
              name="rating" 
              value={star} 
              checked={parseInt(currentRating) === star}
              onChange={handleInputChange}
            />
            <i className={`fas fa-star ${parseInt(currentRating) >= star ? 'filled' : ''}`}></i>
          </label>
        ))}
      </div>
    );
  };

  const averageRating = (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1);
  const totalReviews = testimonials.length;
  const verifiedCount = testimonials.filter(t => t.verified).length;

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => {
    const count = testimonials.filter(t => t.rating === star).length;
    const percentage = (count / totalReviews) * 100;
    return { star, count, percentage };
  });

  return (
    <div className="reviews-page">
      <section className="page-header">
        <div className="container">
          <h1>Client <span>Testimonials</span></h1>
          <p>What our clients say about their experience with M.K GATHU</p>
        </div>
      </section>

      {/* Ratings Summary Section */}
      <section className="ratings-summary">
        <div className="container">
          <div className="summary-card">
            <div className="rating-score">
              <h2>{averageRating}</h2>
              <div className="stars">{renderStars(Math.round(averageRating))}</div>
              <p>Based on {totalReviews} reviews</p>
              <p className="verified-badge">
                <i className="fas fa-check-circle"></i> {verifiedCount} Verified Reviews
              </p>
            </div>
            <div className="rating-bars">
              {ratingDistribution.map((item) => (
                <div className="rating-bar-item" key={item.star}>
                  <span>{item.star} Star</span>
                  <div className="bar">
                    <div className="fill" style={{width: `${item.percentage}%`}}></div>
                  </div>
                  <span>{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="reviews-filter">
        <div className="container">
          <div className="filter-buttons">
            {servicesList.map(service => (
              <button 
                key={service}
                className={`filter-btn ${filter === service ? 'active' : ''}`}
                onClick={() => setFilter(service)}
              >
                {service === 'all' ? 'All Services' : service}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="testimonials-grid-section">
        <div className="container">
          <div className="testimonials-grid">
            {filteredTestimonials.map(testimonial => (
              <div className="testimonial-card" key={testimonial.id}>
                <div className="testimonial-header">
                  <div className="client-info">
                    <div className="client-image">
                      <img src={testimonial.image} alt={testimonial.name} />
                    </div>
                    <div>
                      <h3>{testimonial.name}</h3>
                      <p className="company">{testimonial.company}</p>
                      <p className="position">{testimonial.position}</p>
                    </div>
                  </div>
                  <div className="rating">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                <div className="testimonial-content">
                  <i className="fas fa-quote-left"></i>
                  <p>"{testimonial.content}"</p>
                </div>
                <div className="testimonial-footer">
                  <div className="footer-left">
                    <span className="service-tag">{testimonial.service}</span>
                    {testimonial.verified && (
                      <span className="verified-tag">
                        <i className="fas fa-check-circle"></i> Verified
                      </span>
                    )}
                  </div>
                  <span className="date">{new Date(testimonial.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Write a Review Section - Two Column Layout like Contact page */}
      <section className="write-review">
        <div className="container">
          <div className="contact-grid" style={{ alignItems: 'flex-start' }}>
            {/* Left Column - Information */}
            <div className="contact-info">
              <h3><i className="fas fa-pen-alt"></i> Share Your Feedback</h3>
              
              <div className="contact-detail">
                <i className="fas fa-star"></i>
                <div>
                  <strong>Why Your Review Matters</strong><br />
                  Your feedback helps us improve our services and helps other clients make informed decisions.
                </div>
              </div>
              
              <div className="contact-detail">
                <i className="fas fa-shield-alt"></i>
                <div>
                  <strong>Privacy Guaranteed</strong><br />
                  Your email will not be published. We only ask for verification purposes.
                </div>
              </div>
              
              <div className="contact-detail">
                <i className="fas fa-clock"></i>
                <div>
                  <strong>Quick & Easy</strong><br />
                  Takes less than 2 minutes to share your experience with us.
                </div>
              </div>
              
              <div className="contact-detail">
                <i className="fas fa-check-circle"></i>
                <div>
                  <strong>Verification Process</strong><br />
                  Reviews are verified before being published to ensure authenticity.
                </div>
              </div>

              <div className="contact-detail">
                <i className="fas fa-envelope"></i>
                <div>
                  <strong>Alternative Contact</strong><br />
                  Prefer to share privately? Email us at <a href={`mailto:${CONFIG.COMPANY_EMAIL}`}>{CONFIG.COMPANY_EMAIL}</a>
                </div>
              </div>

              <div className="social-contact">
                <h4>Follow Us</h4>
                <div className="social-links">
                  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Review Form */}
            <div className="contact-form">
              <h3><i className="fas fa-pen-alt"></i> Write Your Review</h3>
              
              {submitted && (
                <div className="success-message">
                  <i className="fas fa-check-circle"></i>
                  <p>Thank you for your review! It will be published after verification.</p>
                </div>
              )}
              
              {submissionError && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  <p>{submissionError}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmitReview}>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange}
                    placeholder="Your email (will not be published)"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="company">Company Name</label>
                  <input 
                    type="text" 
                    id="company"
                    name="company" 
                    value={formData.company} 
                    onChange={handleInputChange}
                    placeholder="Your company name"
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="position">Your Position</label>
                  <input 
                    type="text" 
                    id="position"
                    name="position" 
                    value={formData.position} 
                    onChange={handleInputChange}
                    placeholder="e.g., CEO, Founder, Manager"
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="form-group">
                  <label>Rating *</label>
                  {renderRatingInput(formData.rating)}
                </div>
                
                <div className="form-group">
                  <label htmlFor="service">Service Received</label>
                  <select 
                    id="service"
                    name="service" 
                    value={formData.service} 
                    onChange={handleInputChange} 
                    disabled={isSubmitting}
                  >
                    <option value="">Select a service</option>
                    <option>Business Start-Up</option>
                    <option>Tax & KRA Compliance</option>
                    <option>Payroll Services</option>
                    <option>Debt Tracking</option>
                    <option>Financial Reports</option>
                    <option>Business Advisory</option>
                    <option>KRA Compliance Plus</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="review">Your Review *</label>
                  <textarea 
                    id="review"
                    name="review" 
                    rows="5" 
                    value={formData.review} 
                    onChange={handleInputChange}
                    placeholder="Tell us about your experience with M.K GATHU Financial Consulting..."
                    required
                    disabled={isSubmitting}
                  ></textarea>
                </div>
                
                <div className="form-group checkbox">
                  <label>
                    <input 
                      type="checkbox" 
                      name="agreeToTerms" 
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                    I agree to the <a href="/terms">terms and conditions</a> and confirm this review is based on my genuine experience.
                  </label>
                </div>
                
                <button 
                  type="submit" 
                  className="btn-gold" 
                  style={{ width: '100%', justifyContent: 'center' }} 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <><i className="fas fa-spinner fa-spin"></i> Submitting...</>
                  ) : (
                    <><i className="fas fa-paper-plane"></i> Submit Review</>
                  )}
                </button>
              </form>
              
              <div className="form-note">
                <p><i className="fas fa-lock"></i> Your information is secure and will not be shared with third parties.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}