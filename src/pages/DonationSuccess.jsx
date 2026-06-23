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
        const trackingId = orderTrackingId || reference;
        
        const response = await fetch(`/api/pesapal/check-status?orderTrackingId=${trackingId}`);
        const data = await response.json();

        if (data.success && data.status === 'COMPLETED') {
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
        localStorage.removeItem('donationAmount');
      }
    };

    checkPaymentStatus();
  }, [reference, orderTrackingId, searchParams]);

  if (loading) {
    return (
      <>
        <SEO 
          title="Payment Processing - Kajiado Children's Home"
          description="Verifying your donation payment. Please wait..."
          path="/donation-success"
        />
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
      </>
    );
  }

  if (error) {
    return (
      <>
        <SEO 
          title="Payment Verification Failed - Kajiado Children's Home"
          description="Could not verify your donation payment. Please contact us."
          path="/donation-success"
        />
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
      </>
    );
  }

  if (donationData?.status === 'PENDING') {
    return (
      <>
        <SEO 
          title="Payment Processing - Kajiado Children's Home"
          description="Your donation is being processed. Please wait for confirmation."
          path="/donation-success"
        />
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
      </>
    );
  }

  if (donationData?.status === 'FAILED' || donationData?.status === 'CANCELLED') {
    return (
      <>
        <SEO 
          title="Payment Not Completed - Kajiado Children's Home"
          description="Your donation payment was not completed. Please try again."
          path="/donation-success"
        />
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
      </>
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
    </>
  );
}

// CSS Styles for the component
const styles = `
  .donation-success-page {
    padding: 120px 0 80px;
    min-height: 80vh;
    display: flex;
    align-items: center;
    background: var(--bg-deep, #f8f9fa);
  }
  
  .success-card {
    max-width: 600px;
    margin: 0 auto;
    background: var(--card-bg, #ffffff);
    padding: 50px;
    border-radius: 24px;
    border: 1px solid var(--border-color, #dee2e6);
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }
  
  .loading-spinner {
    text-align: center;
    padding: 40px 0;
  }
  
  .loading-spinner i {
    font-size: 3rem;
    color: var(--primary-color, #3B82F6);
    margin-bottom: 20px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .loading-spinner p {
    color: var(--text-muted, #6c757d);
    font-size: 1.1rem;
  }
  
  .success-icon {
    font-size: 4rem;
    color: #4caf50;
    margin-bottom: 20px;
  }
  
  .pending-icon {
    font-size: 4rem;
    color: #ff9800;
    margin-bottom: 20px;
    animation: pulse 1.5s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.7; }
  }
  
  .error-icon {
    font-size: 4rem;
    color: #f44336;
    margin-bottom: 20px;
  }
  
  .success-card h1 {
    font-size: 2rem;
    margin-bottom: 16px;
    color: var(--text-color, #212529);
  }
  
  .success-message,
  .error-message,
  .pending-message {
    color: var(--text-muted, #6c757d);
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
    border-bottom: 1px solid var(--border-color, #dee2e6);
  }
  
  .detail-item:last-child {
    border-bottom: none;
  }
  
  .detail-item .label {
    color: var(--text-muted, #6c757d);
    font-weight: 500;
  }
  
  .detail-item .value {
    color: var(--text-color, #212529);
    font-weight: 500;
  }
  
  .detail-item .highlight {
    color: var(--primary-color, #3B82F6);
    font-weight: 700;
    font-size: 1.1rem;
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
  
  .success-actions .btn-gold {
    background: linear-gradient(105deg, var(--primary-color, #3B82F6), var(--primary-dark, #2563EB));
    border: none;
    padding: 12px 32px;
    font-weight: 700;
    border-radius: 48px;
    color: #ffffff;
    font-family: 'Poppins', sans-serif;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.95rem;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
  }
  
  .success-actions .btn-gold:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
  }
  
  .success-actions .btn-outline {
    background: transparent;
    border: 1.5px solid var(--primary-color, #3B82F6);
    padding: 12px 32px;
    border-radius: 48px;
    color: var(--primary-color, #3B82F6);
    font-weight: 600;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  
  .success-actions .btn-outline:hover {
    background: var(--primary-color, #3B82F6);
    color: #ffffff;
    transform: translateY(-2px);
  }
  
  .impact-message {
    padding-top: 20px;
    border-top: 1px solid var(--border-color, #dee2e6);
    text-align: left;
  }
  
  .impact-message h3 {
    color: var(--text-color, #212529);
    margin-bottom: 12px;
  }
  
  .impact-message ul {
    list-style: none;
    padding: 0;
    margin: 12px 0;
  }
  
  .impact-message li {
    padding: 6px 0;
    color: var(--text-muted, #6c757d);
  }
  
  .blessing {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--border-color, #dee2e6);
    font-style: italic;
    color: var(--text-color, #212529);
    text-align: center;
  }
  
  .blessing strong {
    color: var(--primary-color, #3B82F6);
  }
  
  @media (max-width: 768px) {
    .donation-success-page {
      padding: 100px 0 60px;
    }
    
    .success-card {
      padding: 30px 20px;
      margin: 0 16px;
    }
    
    .success-card h1 {
      font-size: 1.5rem;
    }
    
    .success-actions {
      flex-direction: column;
    }
    
    .success-actions .btn-gold,
    .success-actions .btn-outline {
      width: 100%;
      justify-content: center;
    }
    
    .detail-item {
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 4px;
    }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleTag = document.createElement('style');
  styleTag.textContent = styles;
  document.head.appendChild(styleTag);
}