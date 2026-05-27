import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const servicesData = {
    'business-startup': {
      title: 'Business Start-Up Support',
      icon: 'fas fa-rocket',
      tagline: 'Launch Your Business with Confidence',
      description: 'Complete business setup and registration services for new ventures in Kenya.',
      fullDescription: `Starting a business in Kenya involves navigating complex registration processes, permits, and regulatory requirements. Our Business Start-Up Support service ensures you get off the ground smoothly and compliantly. We handle all the paperwork, registrations, and compliance requirements so you can focus on what matters most - building your business.`,
      features: [
        'Business name search and reservation with eCitizen',
        'Company incorporation (Limited, LLC, Sole Proprietorship)',
        'KRA PIN registration and tax compliance setup',
        'Business permits and licensing (county and national)',
        'Bank account opening assistance',
        'NHIF, NSSF, and statutory registrations',
        'Business structuring advisory for tax efficiency',
        'Post-registration compliance checklist'
      ],
      benefits: [
        'Save 20+ hours navigating bureaucracy',
        'Avoid costly registration mistakes',
        'Start compliant from day one',
        'Professional business image from launch',
        'Peace of mind with expert guidance'
      ],
      process: [
        'Free initial consultation to understand your business',
        'Document preparation and verification',
        'Submission to relevant authorities',
        'Follow-up and expedited processing',
        'Handover of all registration documents',
        'Post-registration compliance briefing'
      ],
      faqs: [
        { q: 'How long does business registration take?', a: 'Typically 5-14 business days depending on the business structure and county requirements.' },
        { q: 'What documents do I need?', a: 'ID/Passport copies, passport photos, KRA PIN, and proposed business names.' },
        { q: 'Do you help with foreign investors?', a: 'Yes, we assist foreign investors with all regulatory requirements including work permits and company registration.' }
      ]
    },
    'daily-money-management': {
      title: 'Daily Money Management',
      icon: 'fas fa-wallet',
      tagline: 'Stay on Top of Your Finances Every Day',
      description: 'Real-time cash flow tracking, expense monitoring, and operational finance oversight.',
      fullDescription: `Keep your business finances organized and under control with our daily money management services. We help you track every shilling, monitor expenses in real-time, and maintain healthy cash flow. Perfect for busy business owners who want financial clarity without the daily hassle.`,
      features: [
        'Real-time cash flow tracking and reporting',
        'Daily expense monitoring and categorization',
        'Bank reconciliation services',
        'Accounts payable management',
        'Accounts receivable tracking',
        'Petty cash management',
        'Financial transaction recording',
        'Weekly financial summaries'
      ],
      benefits: [
        'Never lose track of expenses',
        'Real-time visibility into cash position',
        'Reduce accounting errors',
        'Save time on daily bookkeeping',
        'Make informed spending decisions'
      ],
      process: [
        'Initial financial assessment',
        'Setup accounting system',
        'Daily transaction recording',
        'Weekly reconciliation',
        'Monthly financial reports',
        'Ongoing advisory support'
      ],
      faqs: [
        { q: 'How do you track my daily expenses?', a: 'We use cloud-based accounting software that integrates with your bank accounts and allows receipt upload via mobile app.' },
        { q: 'Do I need to provide documents daily?', a: 'We can set up systems for automatic data capture or schedule regular document collection.' }
      ]
    },
    'debt-tracking': {
      title: 'Payments & Debt Tracking',
      icon: 'fas fa-credit-card',
      tagline: 'Get Paid Faster, Reduce Bad Debt',
      description: 'Professional accounts receivable management and debt recovery strategies.',
      fullDescription: `Improve your cash flow with our systematic debt tracking and collection services. We help you get paid faster while maintaining positive customer relationships. Our proven strategies reduce outstanding receivables and minimize bad debt write-offs.`,
      features: [
        'Automated invoicing systems',
        'Accounts receivable aging reports',
        'Payment reminder automation (SMS/Email)',
        'Debt recovery strategies',
        'Customer payment history tracking',
        'Collection agency liaison',
        'Cash flow forecasting',
        'Bad debt provision management'
      ],
      benefits: [
        'Reduce average collection time by 40%',
        'Lower outstanding receivables',
        'Improved cash flow predictability',
        'Professional debt recovery process',
        'Better customer payment compliance'
      ],
      process: [
        'Initial accounts receivable assessment',
        'Setup invoicing and reminder system',
        'Regular aging report generation',
        'Structured follow-up sequence (7/14/30 days)',
        'Escalation for overdue accounts',
        'Monthly cash flow reporting'
      ],
      faqs: [
        { q: 'How do you handle late payments?', a: 'We have a graduated approach - friendly reminders, formal notices, phone calls, then escalation to collection partners if needed.' }
      ]
    },
    'payroll': {
      title: 'Payroll Services',
      icon: 'fas fa-users',
      tagline: 'Simplify Employee Payments & Statutory Compliance',
      description: 'Complete payroll processing and statutory deductions management.',
      fullDescription: `Simplify employee payments and statutory compliance with our comprehensive payroll services. We ensure your team gets paid accurately and on time, while you stay fully compliant with KRA, NSSF, and NHIF requirements. No more payroll headaches or penalty fears.`,
      features: [
        'Monthly payroll processing',
        'Statutory deductions (PAYE, NSSF, NHIF)',
        'Payslip generation and distribution',
        'Leave management and tracking',
        'Overtime and bonus calculations',
        'Employee records management',
        'P9A and P10 forms preparation',
        'Payroll reports for management',
        'Bank file generation for salary transfers'
      ],
      benefits: [
        '100% accurate payroll calculations',
        'Timely statutory remittances',
        'Confidential and secure processing',
        'Reduced administrative burden',
        'No KRA penalty surprises'
      ],
      process: [
        'Employee data collection and verification',
        'Monthly payroll run (by 25th of month)',
        'Payslip generation and distribution',
        'Statutory deduction remittance',
        'Monthly reporting to client',
        'Year-end tax forms preparation'
      ],
      faqs: [
        { q: 'When is payroll processed?', a: 'We process payroll monthly, with salary calculations completed by the 25th for end-of-month payments.' },
        { q: 'How are statutory deductions handled?', a: 'We calculate, deduct, and remit all statutory payments (PAYE, NSSF, NHIF) to the respective authorities on your behalf.' }
      ]
    },
    'tax-compliance': {
      title: 'Tax & KRA Compliance',
      icon: 'fas fa-file-invoice',
      tagline: 'Stay Compliant, Avoid Penalties',
      description: 'Complete tax management and Kenya Revenue Authority compliance services.',
      fullDescription: `Stay on the right side of KRA with our comprehensive tax compliance services. We handle all your tax obligations, from monthly filings to annual returns, ensuring you never miss a deadline. Our experts keep up with changing tax laws so you don't have to.`,
      features: [
        'VAT returns filing (monthly/quarterly)',
        'Withholding tax management',
        'Income tax (corporate and individual)',
        'Pay As You Earn (PAYE) filing',
        'iTax account management',
        'Tax health checks and audits',
        'Penalty negotiation and waiver assistance',
        'Tax compliance certificates',
        'Annual tax returns'
      ],
      benefits: [
        'Zero penalty guarantee on timely filings',
        'Peace of mind with expert compliance',
        'Professional representation before KRA',
        'Tax optimization strategies',
        'Complete audit trail'
      ],
      process: [
        'Initial tax health assessment',
        'Setup automated filing reminders',
        'Monthly/quarterly data collection',
        'Accurate return preparation',
        'Timely filing and payment processing',
        'Regular compliance reporting'
      ],
      faqs: [
        { q: 'What happens if I miss a filing deadline?', a: 'We have automated reminders to prevent missed deadlines. If penalties occur due to our oversight, we cover them.' }
      ]
    },
    'financial-reports': {
      title: 'Financial Reports',
      icon: 'fas fa-chart-pie',
      tagline: 'Clear Insights for Better Decisions',
      description: 'Professional financial reporting and management accounts.',
      fullDescription: `Make informed business decisions with accurate, timely financial reports. We transform your raw financial data into clear, actionable insights. Understand your business performance, identify trends, and spot opportunities with our comprehensive reporting services.`,
      features: [
        'Monthly profit & loss statements',
        'Balance sheets',
        'Cash flow statements',
        'Management accounts',
        'Budget vs actual analysis',
        'Financial ratio analysis',
        'KPI dashboards',
        'Custom report generation',
        'Year-end financial statements'
      ],
      benefits: [
        'Clear visibility of business performance',
        'Data-driven decision making',
        'Early warning of financial issues',
        'Professional reports for stakeholders',
        'Bank and investor ready financials'
      ],
      process: [
        'Chart of accounts setup',
        'Monthly data compilation',
        'Report preparation and review',
        'Management presentation',
        'Strategy discussion'
      ],
      faqs: [
        { q: 'How often do I get reports?', a: 'We provide monthly management reports within 10 days of month-end, plus quarterly and annual reports.' }
      ]
    },
    'business-advisory': {
      title: 'Business Advisory',
      icon: 'fas fa-handshake',
      tagline: 'Strategic Guidance for Growth',
      description: 'Expert financial advisory and business growth strategies.',
      fullDescription: `Take your business to the next level with our strategic advisory services. We help you navigate complex financial decisions, identify growth opportunities, and build sustainable success. Our advisors bring years of experience across multiple industries.`,
      features: [
        'Growth strategy development',
        'Business restructuring',
        'Profitability improvement',
        'Cost optimization',
        'Pricing strategy',
        'Market entry planning',
        'Risk management',
        'Succession planning',
        'Business valuation'
      ],
      benefits: [
        'Accelerated business growth',
        'Improved profitability margins',
        'Strategic competitive advantage',
        'Reduced business risks',
        'Clear roadmap to goals'
      ],
      process: [
        'Initial strategy session',
        'Business health assessment',
        'Strategic plan development',
        'Implementation support',
        'Regular review and adjustment'
      ],
      faqs: [
        { q: 'Do you work with small businesses?', a: 'Yes, we work with businesses of all sizes from startups to established enterprises.' }
      ]
    },
    'kra-compliance-plus': {
      title: 'KRA Compliance Plus',
      icon: 'fas fa-shield-alt',
      tagline: 'Complete KRA Protection',
      description: 'ETR, iTax support, tax health checks and representation before KRA.',
      fullDescription: `Our premium KRA compliance service provides comprehensive protection and support for all your Kenya Revenue Authority obligations. From ETR machines to audit representation, we've got you covered. Perfect for businesses that want complete peace of mind.`,
      features: [
        'ETR machine installation and support',
        'iTax profile management',
        'Real-time compliance monitoring',
        'Tax health certificates',
        'KRA audit representation',
        'Objection handling',
        'Refund claims processing',
        'Tax amnesty applications',
        '24/7 compliance alerts'
      ],
      benefits: [
        'Complete KRA peace of mind',
        'Professional audit defense',
        'Priority issue resolution',
        'Never miss a compliance deadline',
        'Expert representation'
      ],
      process: [
        'Comprehensive tax health check',
        'Compliance gap analysis',
        'Remediation plan implementation',
        'Ongoing monitoring and alerts',
        'Quarterly compliance reviews'
      ],
      faqs: [
        { q: 'What is ETR and do I need it?', a: 'ETR (Electronic Tax Register) is required for businesses making over KES 5 million annually in taxable supplies.' }
      ]
    }
  };

  const service = servicesData[id];

  if (!service) {
    return (
      <>
        <SEO 
          title="Service Not Found"
          description="The service you're looking for does not exist. Please check our services page for available financial consulting services."
          path={`/service/${id}`}
          noIndex={true}
        />
        <div className="service-not-found">
          <div className="container">
            <h1>Service Not Found</h1>
            <p>Sorry, the service you're looking for doesn't exist.</p>
            <button onClick={() => navigate('/services')} className="btn-gold">
              Back to Services
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO 
        title={`${service.title} - Financial Consulting Kenya`}
        description={service.description}
        path={`/service/${id}`}
      />
      
      <div className="service-detail-page">
        <section className="service-hero">
          <div className="container">
            <div className="service-hero-content">
              <i className={service.icon}></i>
              <span className="service-tagline">{service.tagline}</span>
              <h1>{service.title}</h1>
              <p>{service.description}</p>
              <div className="service-hero-buttons">
                <Link to="/contact" className="btn-gold">
                  <i className="fas fa-calendar-check"></i> Get This Service
                </Link>
                <button onClick={() => navigate('/services')} className="btn-outline">
                  <i className="fas fa-arrow-left"></i> Back to Services
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="service-full-description">
          <div className="container">
            <div className="description-content">
              <h2>Service Overview</h2>
              <p>{service.fullDescription}</p>
            </div>
          </div>
        </section>

        <section className="service-features">
          <div className="container">
            <div className="features-grid">
              <div className="features-list">
                <h2><i className="fas fa-check-circle"></i> What We Offer</h2>
                <ul>
                  {service.features.map((feature, index) => (
                    <li key={index}><i className="fas fa-check"></i> {feature}</li>
                  ))}
                </ul>
              </div>
              <div className="benefits-list">
                <h2><i className="fas fa-gem"></i> Key Benefits</h2>
                <ul>
                  {service.benefits.map((benefit, index) => (
                    <li key={index}><i className="fas fa-star"></i> {benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="service-process">
          <div className="container">
            <h2>Our Process</h2>
            <div className="process-steps">
              {service.process.map((step, index) => (
                <div className="process-step" key={index}>
                  <div className="step-number">{index + 1}</div>
                  <div className="step-content">
                    <p>{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {service.faqs && (
          <section className="service-faqs">
            <div className="container">
              <h2>Frequently Asked Questions</h2>
              <div className="faqs-grid">
                {service.faqs.map((faq, index) => (
                  <div className="faq-item" key={index}>
                    <h3><i className="fas fa-question-circle"></i> {faq.q}</h3>
                    <p>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Services Section */}
        <section className="related-services">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Related <span>Services</span></h2>
              <p className="section-subtitle">You might also be interested in these services</p>
            </div>
            <div className="related-services-grid">
              <div className="related-card" onClick={() => navigate('/service/tax-compliance')}>
                <i className="fas fa-file-invoice"></i>
                <h4>Tax & KRA Compliance</h4>
                <p>Complete tax management services</p>
              </div>
              <div className="related-card" onClick={() => navigate('/service/payroll')}>
                <i className="fas fa-users"></i>
                <h4>Payroll Services</h4>
                <p>Simplified payroll management</p>
              </div>
              <div className="related-card" onClick={() => navigate('/service/business-advisory')}>
                <i className="fas fa-handshake"></i>
                <h4>Business Advisory</h4>
                <p>Strategic growth guidance</p>
              </div>
            </div>
          </div>
        </section>

        <section className="service-cta">
          <div className="container">
            <div className="cta-box">
              <h2>Ready to Get Started with {service.title}?</h2>
              <p>Contact us today for a free consultation and personalized quote</p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn-gold">
                  <i className="fas fa-calendar-check"></i> Book Free Consultation
                </Link>
                <a href="tel:+254762610912" className="btn-outline">
                  <i className="fas fa-phone"></i> Call +254 762 610 912
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}