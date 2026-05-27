import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Services() {
  const navigate = useNavigate();

  const coreServices = [
    { 
      id: "business-startup",
      icon: "fas fa-rocket", 
      title: "Business Start-Up Support", 
      desc: "Business registration, permits, licensing, and structuring for new ventures in Kenya." 
    },
    { 
      id: "daily-money-management",
      icon: "fas fa-wallet", 
      title: "Daily Money Management", 
      desc: "Real-time cash flow tracking, expense monitoring, and operational finance oversight." 
    },
    { 
      id: "debt-tracking",
      icon: "fas fa-credit-card", 
      title: "Payments & Debt Tracking", 
      desc: "Automated invoicing, accounts receivable, aging reports, and debt recovery strategies." 
    },
    { 
      id: "payroll",
      icon: "fas fa-users", 
      title: "Payroll Services", 
      desc: "Payroll processing, statutory deductions, payslips, NSSF, NHIF, and leave management." 
    },
    { 
      id: "tax-compliance",
      icon: "fas fa-file-invoice", 
      title: "Tax & KRA Compliance", 
      desc: "VAT, withholding tax, income tax filing, KRA PIN updates, and audit support." 
    },
    { 
      id: "financial-reports",
      icon: "fas fa-chart-pie", 
      title: "Financial Reports", 
      desc: "Profit & loss, balance sheets, management accounts, and insightful dashboards." 
    },
    { 
      id: "business-advisory",
      icon: "fas fa-handshake", 
      title: "Business Advisory", 
      desc: "Growth strategies, pricing guidance, financial forecasting & investment readiness." 
    },
    { 
      id: "kra-compliance-plus",
      icon: "fas fa-shield-alt", 
      title: "KRA Compliance Plus", 
      desc: "ETR, iTax support, tax health checks and representation before KRA." 
    }
  ];

  const advisoryServices = [
    { 
      id: "growth-roadmaps",
      icon: "fas fa-chart-line", 
      title: "Growth Roadmaps", 
      desc: "Data-driven expansion plans, market entry & financial forecasting." 
    },
    { 
      id: "pricing-guidance",
      icon: "fas fa-tags", 
      title: "Pricing Guidance", 
      desc: "Strategic pricing models to maximize margins and competitiveness." 
    },
    { 
      id: "capital-funding",
      icon: "fas fa-hand-holding-usd", 
      title: "Capital & Funding", 
      desc: "Liaison with banks, investors and grant readiness for Kenyan SMEs." 
    }
  ];

  const handleServiceClick = (serviceId) => {
    navigate(`/service/${serviceId}`);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <SEO 
        title="Our Services - Financial Consulting Kenya"
        description="Comprehensive financial services for Kenyan businesses: business registration, KRA compliance, payroll, tax advisory, debt tracking, and strategic advisory. Get expert financial guidance today."
        path="/services"
      />
      
      <div className="services-page">
        <section className="page-header">
          <div className="container">
            <h1>Our <span>Services</span></h1>
            <p>Comprehensive financial solutions tailored for Kenyan businesses from startup to profitability.</p>
          </div>
        </section>

        {/* Service Highlight Banner */}
        <div className="service-highlight">
          <div className="container">
            <div className="highlight-banner">
              <div className="highlight-text">
                <i className="fas fa-gem"></i>
                <div>
                  <h3>Expert Financial Guidance</h3>
                  <p>Trusted by 500+ Kenyan businesses</p>
                </div>
              </div>
              <Link to="/contact" className="btn-outline">
                Free Consultation <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>

        <section id="core-services" className="services-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Core <span>Services</span></h2>
              <p className="section-subtitle">Our primary financial solutions designed for business success</p>
            </div>
            <div className="services-grid">
              {coreServices.map((service, index) => (
                <div 
                  className="service-card clickable" 
                  key={index}
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
                  <div className="service-link">
                    Learn More <i className="fas fa-arrow-right"></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="tax-compliance" className="tax-section">
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
                  <li><i className="fas fa-check-circle"></i> ETR machine support</li>
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

        <section id="advisory" className="advisory-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Business <span>Advisory & Strategy</span></h2>
              <p className="section-subtitle">Navigate financial complexities with expert guidance from registration to profitability.</p>
            </div>
            <div className="advisory-grid">
              {advisoryServices.map((service, index) => (
                <div 
                  className="service-card clickable" 
                  key={index}
                  onClick={() => handleServiceClick(service.id)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleServiceClick(service.id);
                  }}
                >
                  <i className={service.icon + " service-icon"}></i>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  <div className="service-link">
                    Learn More <i className="fas fa-arrow-right"></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Our Services Section */}
        <section className="why-our-services">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Why Choose <span>Our Services</span></h2>
              <p className="section-subtitle">What makes our financial solutions stand out</p>
            </div>
            <div className="why-grid">
              <div className="why-card">
                <i className="fas fa-user-tie"></i>
                <h4>Expert Team</h4>
                <p>Certified professionals with years of experience</p>
              </div>
              <div className="why-card">
                <i className="fas fa-clock"></i>
                <h4>Timely Delivery</h4>
                <p>On-time filing and reporting guaranteed</p>
              </div>
              <div className="why-card">
                <i className="fas fa-shield-alt"></i>
                <h4>100% Compliant</h4>
                <p>Full KRA compliance assurance</p>
              </div>
              <div className="why-card">
                <i className="fas fa-headset"></i>
                <h4>Dedicated Support</h4>
                <p>24/7 expert assistance available</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}