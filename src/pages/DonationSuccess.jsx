import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';

export default function DonationSuccess() {
  const [searchParams] = useSearchParams();
  const [donationData, setDonationData] = useState(null);
  const reference = searchParams.get('reference');
  const status = searchParams.get('status');
  const amount = searchParams.get('amount');

  useEffect(() => {
    if (reference) {
      setDonationData({
        reference: reference,
        status: status || 'COMPLETED',
        amount: amount || '0'
      });
    }
  }, [reference, status, amount]);

  return (
    <>
      <SEO 
        title="Donation Successful - Kajiado Children's Home"
        description="Thank you for your generous donation to Kajiado Children's Home. Your support transforms lives."
        path="/donation-success"
      />
      
      <div className="donation-success-page">
        <div className="container">
          <div className="success-card">
            <div className="success-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h1>🎉 Thank You for Your Donation!</h1>
            <p className="success-message">
              Your generous contribution will help us provide love, care, education, and hope to vulnerable children at Kajiado Children's Home.
            </p>
            
            {donationData && (
              <div className="donation-details">
                <div className="detail-item">
                  <span className="label">Transaction Reference:</span>
                  <span className="value">{donationData.reference}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Amount:</span>
                  <span className="value highlight">KES {donationData.amount}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Status:</span>
                  <span className="value success">✅ Completed</span>
                </div>
              </div>
            )}

            <div className="success-actions">
              <Link to="/" className="btn-gold">
                <i className="fas fa-home"></i> Return Home
              </Link>
              <Link to="/contact" className="btn-outline">
                <i className="fas fa-envelope"></i> Contact Us
              </Link>
            </div>

            <div className="impact-message">
              <h3>Your Impact</h3>
              <p>
                Your donation will help provide:
              </p>
              <ul>
                <li>🍲 Nutritious meals for children</li>
                <li>📚 Quality education and school supplies</li>
                <li>🏥 Medical care and healthcare support</li>
                <li>🏠 Safe shelter and loving care</li>
                <li>💖 Hope and a brighter future</li>
              </ul>
              <p className="blessing">
                "The generous will themselves be blessed, for they share their food with the poor."<br />
                <strong>Proverbs 22:9</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .donation-success-page {
          padding: 120px 0 80px;
          min-height: 80vh;
          display: flex;
          align-items: center;
          background: var(--bg-deep);
        }
        
        .success-card {
          max-width: 600px;
          margin: 0 auto;
          background: var(--card-bg);
          padding: 50px;
          border-radius: 24px;
          border: 1px solid var(--border-color);
          text-align: center;
        }
        
        .success-icon {
          font-size: 4rem;
          color: #4caf50;
          margin-bottom: 20px;
        }
        
        .success-card h1 {
          font-size: 2rem;
          margin-bottom: 16px;
          color: var(--text-color);
        }
        
        .success-message {
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 30px;
        }
        
        .donation-details {
          background: rgba(59, 130, 246, 0.05);
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 30px;
          text-align: left;
        }
        
        .detail-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid var(--border-color);
        }
        
        .detail-item:last-child {
          border-bottom: none;
        }
        
        .detail-item .label {
          color: var(--text-muted);
        }
        
        .detail-item .value {
          color: var(--text-color);
          font-weight: 500;
        }
        
        .detail-item .highlight {
          color: var(--primary-color);
          font-weight: 700;
        }
        
        .detail-item .success {
          color: #4caf50;
        }
        
        .success-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 30px;
        }
        
        .impact-message {
          padding-top: 20px;
          border-top: 1px solid var(--border-color);
          text-align: left;
        }
        
        .impact-message h3 {
          color: var(--text-color);
          margin-bottom: 12px;
        }
        
        .impact-message ul {
          list-style: none;
          padding: 0;
          margin: 12px 0;
        }
        
        .impact-message li {
          padding: 6px 0;
          color: var(--text-muted);
        }
        
        .blessing {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid var(--border-color);
          font-style: italic;
          color: var(--text-color);
          text-align: center;
        }
        
        .blessing strong {
          color: var(--primary-color);
        }
        
        @media (max-width: 768px) {
          .success-card {
            padding: 30px 20px;
          }
          
          .success-card h1 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </>
  );
}