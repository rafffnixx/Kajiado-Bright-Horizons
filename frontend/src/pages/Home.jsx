import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  const handleServiceClick = (serviceId) => {
    navigate(`/service/${serviceId}`);
    window.scrollTo(0, 0);
  };

  const services = [
    { id: 'business-startup', icon: 'fas fa-rocket', title: 'Business Start-Up Support', desc: 'Business registration, permits, licensing, and structuring for new ventures in Kenya.' },
    { id: 'daily-money-management', icon: 'fas fa-wallet', title: 'Daily Money Management', desc: 'Real-time cash flow tracking, expense monitoring, and operational finance oversight.' },
    { id: 'debt-tracking', icon: 'fas fa-credit-card', title: 'Payments & Debt Tracking', desc: 'Automated invoicing, accounts receivable, aging reports, and debt recovery strategies.' },
    { id: 'payroll', icon: 'fas fa-users', title: 'Payroll Services', desc: 'Payroll processing, statutory deductions, payslips, NSSF, NHIF, and leave management.' },
    { id: 'tax-compliance', icon: 'fas fa-file-invoice', title: 'Tax & KRA Compliance', desc: 'VAT, withholding tax, income tax filing, KRA PIN updates, and audit support.' },
    { id: 'financial-reports', icon: 'fas fa-chart-pie', title: 'Financial Reports', desc: 'Profit & loss, balance sheets, management accounts, and insightful dashboards.' },
    { id: 'business-advisory', icon: 'fas fa-handshake', title: 'Business Advisory', desc: 'Growth strategies, pricing guidance, financial forecasting & investment readiness.' },
    { id: 'kra-compliance-plus', icon: 'fas fa-shield-alt', title: 'KRA Compliance Plus', desc: 'ETR, iTax support, tax health checks and representation before KRA.' }
  ];

  return (
    <>
      <SEO 
        title="Home - Premier Financial Consulting in Kenya"
        description="M.K GATHU Financial Consulting offers expert business registration, KRA compliance, payroll, tax advisory, and debt tracking services. Trusted by 500+ Kenyan businesses. Free consultation available."
        path="/"
      />
      
      <div className="home-page">
        {/* Hero Section */}
        <section id="home" className="hero-section">
          <div className="hero-content">
            <div className="hero-tagline">
              <i className="fas fa-chart-line"></i> Trusted by Kenyan Enterprises
            </div>
            <h1>From Registration to <span>Profitability</span> – We Handle Your Finances.</h1>
            <p className="hero-desc">Strategic financial management for startups, SMEs, and corporations. KRA compliance, daily cash flow, payroll, and advisory all under one roof.</p>
            <div className="hero-buttons">
              <Link to="/contact" className="btn-gold">
                <i className="fas fa-calendar-check"></i> Book Consultation
              </Link>
              <Link to="/services" className="btn-outline">
                Explore Services →
              </Link>
            </div>
            <div className="hero-stats">
              <div><i className="fas fa-building"></i> 500+ Businesses</div>
              <div><i className="fas fa-file-invoice-dollar"></i> 98% KRA Compliance</div>
              <div><i className="fas fa-smile"></i> 100% Client Satisfaction</div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <div className="trust-badges">
          <div className="container">
            <div className="badges-grid">
              <div className="badge-item">
                <i className="fas fa-trophy"></i>
                <span>Award Winning Service</span>
              </div>
              <div className="badge-item">
                <i className="fas fa-shield-alt"></i>
                <span>Fully Insured</span>
              </div>
              <div className="badge-item">
                <i className="fas fa-certificate"></i>
                <span>Certified Experts</span>
              </div>
              <div className="badge-item">
                <i className="fas fa-handshake"></i>
                <span>100% Confidential</span>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <section id="services" className="services-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Our <span>Core Services</span></h2>
              <p className="section-subtitle">Comprehensive financial solutions tailored for Kenyan businesses from startup to profitability.</p>
            </div>
            <div className="services-grid">
              {services.map((service) => (
                <div 
                  key={service.id}
                  className="service-card clickable" 
                  onClick={() => handleServiceClick(service.id)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleServiceClick(service.id);
                  }}
                >
                  <div className="service-icon"><i className={service.icon}></i></div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  <div className="service-link">Learn More <i className="fas fa-arrow-right"></i></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Us Preview Section */}
        <section id="about" className="about-preview">
          <div className="container">
            <div className="about-flex">
              <div className="about-text">
                <h2>About <span>M.K GATHU</span></h2>
                <p>We are a premier financial consulting firm based in Nairobi, Kenya, dedicated to empowering businesses with clarity, control, and growth. With deep expertise in local regulations and global best practices, we offer end-to-end financial management, from business registration and KRA compliance to daily finance operations and profitability advisory.</p>
                <p>Our team of experienced financial professionals brings years of combined experience across multiple industries, ensuring that your business receives the highest quality of service and strategic guidance.</p>
                <Link to="/about" className="btn-outline">Learn More About Us <i className="fas fa-arrow-right"></i></Link>
              </div>
              <div className="about-img">
                <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80" alt="Financial consultant team" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="why-choose-us">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Why <span>Choose Us</span></h2>
              <p className="section-subtitle">What makes M.K GATHU the trusted financial partner for Kenyan businesses</p>
            </div>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon"><i className="fas fa-certificate"></i></div>
                <h3>Certified Experts</h3>
                <p>Fully certified financial professionals with extensive experience in Kenyan tax laws and regulations.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><i className="fas fa-clock"></i></div>
                <h3>Timely Delivery</h3>
                <p>We guarantee on-time filing and reporting, helping you avoid KRA penalties and late fees.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><i className="fas fa-shield-alt"></i></div>
                <h3>100% Confidential</h3>
                <p>Your financial data is safe with us. We maintain strict confidentiality and data protection standards.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><i className="fas fa-headset"></i></div>
                <h3>24/7 Support</h3>
                <p>Round-the-clock support for urgent financial matters and KRA inquiries.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><i className="fas fa-chart-line"></i></div>
                <h3>Proven Results</h3>
                <p>98% KRA compliance rate and 40% average profit increase for our clients.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><i className="fas fa-hand-holding-usd"></i></div>
                <h3>Affordable Pricing</h3>
                <p>Competitive rates tailored for Kenyan SMEs and startups.</p>
              </div>
            </div>
          </div>
        </section>

        {/* KRA & Tax Compliance Section */}
        <section className="tax-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">KRA & Tax <span>Compliance Simplified</span></h2>
              <p className="section-subtitle">We take the stress out of Kenya Revenue Authority filings. Stay compliant and avoid penalties.</p>
            </div>
            <div className="tax-showcase">
              <div className="tax-content">
                <ul className="list-check">
                  <li><i className="fas fa-check-circle"></i> VAT & Excise Returns Filing</li>
                  <li><i className="fas fa-check-circle"></i> iTax troubleshooting & KRA PIN registration</li>
                  <li><i className="fas fa-check-circle"></i> Tax Health Certificates & Compliance checks</li>
                  <li><i className="fas fa-check-circle"></i> Monthly & annual filings with precision</li>
                  <li><i className="fas fa-check-circle"></i> ETR machine installation and support</li>
                  <li><i className="fas fa-check-circle"></i> KRA audit representation</li>
                </ul>
                <Link to="/contact" className="btn-gold">
                  <i className="fas fa-file-signature"></i> Get KRA Support →
                </Link>
              </div>
              <div className="tax-image">
                <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=700&q=80" alt="KRA tax compliance" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Preview */}
        <section className="testimonials-preview">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">What Our <span>Clients Say</span></h2>
              <p className="section-subtitle">Real stories from businesses we've helped transform</p>
            </div>
            <div className="testimonials-grid">
              <div className="testimonial-card">
                <i className="fas fa-quote-left"></i>
                <p>"M.K GATHU transformed our financial records and ensured full KRA compliance. Our profitability soared within 6 months. Their attention to detail and proactive advice has been invaluable."</p>
                <h4>— Njeri K., Startup Founder</h4>
                <div className="rating">★★★★★</div>
              </div>
              <div className="testimonial-card">
                <i className="fas fa-quote-left"></i>
                <p>"Professional payroll & debt tracking services. Their advisory played a huge role in securing our business loan. I highly recommend their comprehensive financial management."</p>
                <h4>— James M., Retail Chain MD</h4>
                <div className="rating">★★★★★</div>
              </div>
              <div className="testimonial-card">
                <i className="fas fa-quote-left"></i>
                <p>"The team at M.K GATHU helped us navigate complex KRA requirements and set up proper accounting systems. Now we have clear financial visibility and peace of mind."</p>
                <h4>— Dr. Sarah W., Healthcare CEO</h4>
                <div className="rating">★★★★★</div>
              </div>
            </div>
            <div className="view-all-link">
              <Link to="/reviews" className="btn-outline">Read All Testimonials <i className="fas fa-arrow-right"></i></Link>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Transform Your Business Finances?</h2>
              <p>Join over 500 Kenyan businesses that trust M.K GATHU for their financial management needs.</p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn-gold">
                  <i className="fas fa-calendar-check"></i> Book Free Consultation
                </Link>
                <Link to="/services" className="btn-outline">
                  <i className="fas fa-info-circle"></i> Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}