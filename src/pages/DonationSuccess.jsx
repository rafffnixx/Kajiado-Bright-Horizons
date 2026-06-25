// src/pages/DonationSuccess.jsx
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { logDonation } from '../services/googleSheetsService';

export default function DonationSuccess() {
  const [searchParams] = useSearchParams();
  const [donationData, setDonationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('PENDING');
  const [statusMessage, setStatusMessage] = useState('Waiting for payment confirmation...');
  const reference = searchParams.get('reference');
  const orderTrackingId = searchParams.get('OrderTrackingId');
  const [pollCount, setPollCount] = useState(0);
  const [isLogged, setIsLogged] = useState(false);
  const [logError, setLogError] = useState(null);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (!reference && !orderTrackingId) {
        setError('No transaction reference found');
        setLoading(false);
        return;
      }

      try {
        const trackingId = orderTrackingId || reference;
        
        // Poll for status every 3 seconds, up to 15 times (45 seconds)
        const pollStatus = async (attempt = 0) => {
          // Update status messages based on attempt
          if (attempt === 0) {
            setStatusMessage('🔍 Checking payment status...');
          } else if (attempt === 1) {
            setStatusMessage('⏳ Payment is being processed...');
          } else if (attempt === 2) {
            setStatusMessage('⏳ Still processing, this may take a moment...');
          } else if (attempt === 3) {
            setStatusMessage('⏳ Please wait, we are confirming your payment...');
          } else if (attempt >= 4 && attempt <= 6) {
            setStatusMessage('⏳ Payment confirmation in progress...');
          } else if (attempt >= 7 && attempt <= 9) {
            setStatusMessage('⏳ Almost there! Finalizing payment...');
          } else if (attempt >= 10) {
            setStatusMessage('⏳ Taking longer than expected. Please wait...');
          }

          // Max 15 attempts (45 seconds)
          if (attempt > 15) {
            setLoading(false);
            setPaymentStatus('TIMEOUT');
            setDonationData({
              reference: reference || 'N/A',
              amount: searchParams.get('amount') || localStorage.getItem('donationAmount') || '0',
              status: 'TIMEOUT',
              message: 'Payment is taking longer than expected. Please check your M-PESA and refresh the page.'
            });
            return;
          }

          try {
            const response = await fetch(`/api/pesapal/check-status?orderTrackingId=${trackingId}`);
            const data = await response.json();

            console.log(`📊 Poll attempt ${attempt + 1}:`, data);

            // ============================================
            // ✅ PAYMENT COMPLETED - LOG TO SHEETS HERE
            // ============================================
            if (data.success && data.status === 'COMPLETED') {
              setPaymentStatus('COMPLETED');
              setStatusMessage('✅ Payment confirmed successfully!');
              
              const amount = searchParams.get('amount') || localStorage.getItem('donationAmount') || '0';
              
              // Get donation data from localStorage
              const donorData = JSON.parse(localStorage.getItem('donationData') || '{}');
              
              // ✅ LOG TO GOOGLE SHEETS (only after confirmation)
              try {
                setStatusMessage('📊 Saving your donation record...');
                
                const logResult = await logDonation({
                  fullName: donorData.fullName || 'Anonymous',
                  email: donorData.email || '',
                  phone: donorData.phone || '',
                  amount: parseFloat(amount),
                  paymentMethod: donorData.paymentMethod || 'PesaPal',
                  reference: reference || data.merchantReference || 'N/A',
                  status: 'Completed',
                  donationType: donorData.donationType || 'one-time',
                  transactionDate: data.payment_date || new Date().toISOString()
                });
                
                if (logResult.success) {
                  setIsLogged(true);
                  setStatusMessage('✅ Donation record saved successfully!');
                  console.log('✅ Donation logged to Google Sheets successfully');
                } else {
                  console.warn('⚠️ Donation logging returned:', logResult);
                  setLogError('Could not save donation record, but your payment is confirmed.');
                  setStatusMessage('✅ Payment confirmed! (Record saving pending)');
                }
              } catch (logError) {
                console.error('❌ Failed to log donation to Google Sheets:', logError);
                setLogError('Could not save donation record, but your payment is confirmed.');
                setStatusMessage('✅ Payment confirmed! (Record saving pending)');
                // Don't stop the flow if logging fails - user should still see success
              }
              
              // Clean up localStorage
              localStorage.removeItem('donationData');
              localStorage.removeItem('donationAmount');
              
              setDonationData({
                reference: reference || data.merchantReference || 'N/A',
                amount: amount,
                status: 'COMPLETED',
                paymentMethod: data.payment_method || 'N/A',
                paymentDate: data.payment_date || new Date().toISOString(),
                confirmationCode: data.confirmation_code || 'N/A'
              });
              setLoading(false);
              return;
            } 
            // ============================================
            // ❌ PAYMENT FAILED
            // ============================================
            else if (data.status === 'FAILED' || data.status === 'CANCELLED') {
              setPaymentStatus('FAILED');
              setStatusMessage('❌ Payment was not completed');
              
              // Log failed payment attempt to sheets (optional)
              try {
                const donorData = JSON.parse(localStorage.getItem('donationData') || '{}');
                await logDonation({
                  fullName: donorData.fullName || 'Anonymous',
                  email: donorData.email || '',
                  phone: donorData.phone || '',
                  amount: parseFloat(searchParams.get('amount') || localStorage.getItem('donationAmount') || '0'),
                  paymentMethod: donorData.paymentMethod || 'PesaPal',
                  reference: reference || 'N/A',
                  status: data.status,
                  donationType: donorData.donationType || 'one-time'
                });
              } catch (logError) {
                console.error('Failed to log failed donation:', logError);
              }
              
              localStorage.removeItem('donationData');
              localStorage.removeItem('donationAmount');
              
              setDonationData({
                reference: reference || 'N/A',
                amount: searchParams.get('amount') || localStorage.getItem('donationAmount') || '0',
                status: data.status,
                message: data.payment_status_description || 'Payment was not completed.'
              });
              setLoading(false);
              return;
            } 
            // ============================================
            // ⏳ STILL PENDING - Continue polling
            // ============================================
            else {
              // Still pending, poll again after 3 seconds
              setPollCount(attempt + 1);
              setPaymentStatus('PENDING');
              
              // Update status message with more detail
              if (attempt >= 5) {
                setStatusMessage(`⏳ Payment still processing (${attempt + 1}/15)... Please wait`);
              }
              
              setTimeout(() => pollStatus(attempt + 1), 3000);
            }
          } catch (err) {
            console.error('Polling error:', err);
            // Continue polling on error
            setStatusMessage(`⚠️ Network issue, retrying... (${attempt + 1}/15)`);
            setTimeout(() => pollStatus(attempt + 1), 3000);
          }
        };

        await pollStatus(0);

      } catch (err) {
        console.error('Error checking payment status:', err);
        setError('Could not verify payment status. Please check your M-PESA.');
        setLoading(false);
      }
    };

    checkPaymentStatus();
  }, [reference, orderTrackingId, searchParams]);

  // ============================================
  // RENDER: LOADING STATE
  // ============================================
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
                <p className="status-message">{statusMessage}</p>
                {pollCount > 0 && (
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${(pollCount / 15) * 100}%` }}
                      ></div>
                    </div>
                    <p className="poll-count">Checking payment... ({pollCount}/15)</p>
                  </div>
                )}
                {pollCount > 3 && (
                  <p className="status-hint">Please don't refresh the page. We're confirming your payment.</p>
                )}
                {pollCount > 8 && (
                  <p className="status-hint">Payments can take up to 60 seconds to process. Thank you for your patience.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ============================================
  // RENDER: ERROR STATE
  // ============================================
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

  // ============================================
  // RENDER: PENDING / TIMEOUT STATE
  // ============================================
  if (donationData?.status === 'PENDING' || donationData?.status === 'TIMEOUT') {
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
                  <span className="value pending">⏳ {paymentStatus}</span>
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

  // ============================================
  // RENDER: FAILED / CANCELLED STATE
  // ============================================
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

  // ============================================
  // RENDER: SUCCESS STATE
  // ============================================
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
                {donationData.confirmationCode && donationData.confirmationCode !== 'N/A' && (
                  <div className="detail-item">
                    <span className="label">Confirmation Code:</span>
                    <span className="value">{donationData.confirmationCode}</span>
                  </div>
                )}
                {isLogged && (
                  <div className="detail-item" style={{ borderTop: '1px solid #4caf50', marginTop: '8px', paddingTop: '12px' }}>
                    <span className="label">📊 Data Status:</span>
                    <span className="value success">✅ Logged to Google Sheets</span>
                  </div>
                )}
                {logError && (
                  <div className="detail-item" style={{ borderTop: '1px solid #f44336', marginTop: '8px', paddingTop: '12px' }}>
                    <span className="label">⚠️ Data Status:</span>
                    <span className="value failed">{logError}</span>
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
          animation: pulse 1.5s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
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
        
        .status-message {
          color: var(--text-color);
          font-size: 1.1rem;
          margin: 10px 0;
        }
        
        .status-hint {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-top: 8px;
          font-style: italic;
        }
        
        .progress-container {
          margin: 20px 0;
          width: 100%;
        }
        
        .progress-bar {
          width: 100%;
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
          margin: 10px 0;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #2563eb, #4caf50);
          border-radius: 4px;
          transition: width 0.5s ease;
        }
        
        .poll-count {
          color: var(--text-muted);
          font-size: 0.85rem;
          margin: 5px 0;
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
        
        .btn-gold {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--primary-color);
          color: #fff;
          padding: 12px 28px;
          border-radius: 30px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          border: 2px solid var(--primary-color);
        }
        
        .btn-gold:hover {
          background: transparent;
          color: var(--primary-color);
        }
        
        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: var(--text-color);
          padding: 12px 28px;
          border-radius: 30px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          border: 2px solid var(--border-color);
        }
        
        .btn-outline:hover {
          border-color: var(--primary-color);
          color: var(--primary-color);
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
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .loading-spinner p {
          color: var(--text-muted);
          font-size: 1.1rem;
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