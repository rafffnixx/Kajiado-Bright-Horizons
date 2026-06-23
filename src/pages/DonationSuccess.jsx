// src/pages/DonationSuccess.jsx
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';

export default function DonationSuccess() {
  const [searchParams] = useSearchParams();
  const [donationData, setDonationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reference = searchParams.get('reference');
  const orderTrackingId = searchParams.get('OrderTrackingId');

  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (!reference && !orderTrackingId) {
        setError('No transaction reference found');
        setLoading(false);
        return;
      }

      try {
        // Use the orderTrackingId from Pesapal or the reference
        const trackingId = orderTrackingId || reference;
        
        const response = await fetch(`/api/check-payment?orderTrackingId=${trackingId}`);
        const data = await response.json();

        if (data.success && data.status === 'COMPLETED') {
          // Get amount from URL or localStorage
          const amount = searchParams.get('amount') || localStorage.getItem('donationAmount') || '0';
          
          setDonationData({
            reference: reference || data.merchantReference || 'N/A',
            amount: amount,
            status: 'COMPLETED',
            paymentMethod: data.payment_method || 'N/A',
            paymentDate: data.payment_date || new Date().toISOString()
          });
        } else if (data.status === 'PENDING') {
          setDonationData({
            reference: reference || 'N/A',
            amount: searchParams.get('amount') || localStorage.getItem('donationAmount') || '0',
            status: 'PENDING',
            message: 'Your payment is being processed. Please wait.'
          });
        } else if (data.status === 'FAILED' || data.status === 'CANCELLED') {
          setDonationData({
            reference: reference || 'N/A',
            amount: searchParams.get('amount') || localStorage.getItem('donationAmount') || '0',
            status: data.status,
            message: 'Your payment was not completed. Please try again.'
          });
        } else {
          // If status not found, show pending
          setDonationData({
            reference: reference || 'N/A',
            amount: searchParams.get('amount') || localStorage.getItem('donationAmount') || '0',
            status: 'PENDING',
            message: 'Checking payment status...'
          });
        }
      } catch (err) {
        console.error('Error checking payment status:', err);
        setError('Could not verify payment status. Please check your M-PESA.');
      } finally {
        setLoading(false);
        // Clear stored amount
        localStorage.removeItem('donationAmount');
      }
    };

    checkPaymentStatus();
  }, [reference, orderTrackingId, searchParams]);

  if (loading) {
    return (
      <div className="donation-success-page">
        <div className="container">
          <div className="success-card">
            <div className="loading-spinner">
              <i className="fas fa-spinner fa-spin"></i>
              <p>Verifying your payment...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="donation-success-page">
        <div className="container">
          <div className="success-card error-card">
            <div className="error-icon">
              <i className="fas fa-exclamation-circle"></i>
            </div>
            <h1>Payment Verification Failed</h1>
            <p className="error-message">{error}</p>
            <div className="success-actions">
              <Link to="/donate" className="btn-gold">
                <i className="fas fa-redo"></i> Try Again
              </Link>
              <Link to="/contact" className="btn-outline">
                <i className="fas fa-envelope"></i> Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show different content based on status
  if (donationData?.status === 'PENDING') {
    return (
      <div className="donation-success-page">
        <div className="container">
          <div className="success-card pending-card">
            <div className="pending-icon">
              <i className="fas fa-clock"></i>
            </div>
            <h1>Payment Processing</h1>
            <p className="pending-message">{donationData.message || 'Your payment is being processed. Please wait for confirmation.'}</p>
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
                <span className="value pending">⏳ PENDING</span>
              </div>
            </div>
            <div className="success-actions">
              <Link to="/" className="btn-gold">
                <i className="fas fa-home"></i> Return Home
              </Link>
              <Link to="/contact" className="btn-outline">
                <i className="fas fa-envelope"></i> Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (donationData?.status === 'FAILED' || donationData?.status === 'CANCELLED') {
    return (
      <div className="donation-success-page">
        <div className="container">
          <div className="success-card error-card">
            <div className="error-icon">
              <i className="fas fa-times-circle"></i>
            </div>
            <h1>Payment Not Completed</h1>
            <p className="error-message">{donationData.message || 'Your payment was not completed. Please try again.'}</p>
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
                <span className="value failed">❌ {donationData.status}</span>
              </div>
            </div>
            <div className="success-actions">
              <Link to="/donate" className="btn-gold">
                <i className="fas fa-redo"></i> Try Again
              </Link>
              <Link to="/contact" className="btn-outline">
                <i className="fas fa-envelope"></i> Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success status
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
                  <span className="value success">✅ {donationData.status}</span>
                </div>
                {donationData.paymentMethod && donationData.paymentMethod !== 'N/A' && (
                  <div className="detail-item">
                    <span className="label">Payment Method:</span>
                    <span className="value">{donationData.paymentMethod}</span>
                  </div>
                )}
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
              <p>Your donation will help provide:</p>
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
        
        .error-icon {
          font-size: 4rem;
          color: #f44336;
          margin-bottom: 20px;
        }
        
        .pending-icon {
          font-size: 4rem;
          color: #ff9800;
          margin-bottom: 20px;
        }
        
        .success-card h1 {
          font-size: 2rem;
          margin-bottom: 16px;
          color: var(--text-color);
        }
        
        .success-message,
        .error-message,
        .pending-message {
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
        
        .detail-item .failed {
          color: #f44336;
        }
        
        .detail-item .pending {
          color: #ff9800;
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
        
        .loading-spinner {
          text-align: center;
          padding: 40px 0;
        }
        
        .loading-spinner i {
          font-size: 3rem;
          color: var(--primary-color);
          margin-bottom: 20px;
        }
        
        .loading-spinner p {
          color: var(--text-muted);
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