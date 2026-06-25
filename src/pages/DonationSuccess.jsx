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
        
        const pollStatus = async (attempt = 0) => {
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

            if (data.success && data.status === 'COMPLETED') {
              setPaymentStatus('COMPLETED');
              setStatusMessage('✅ Payment confirmed successfully!');
              
              const amount = searchParams.get('amount') || localStorage.getItem('donationAmount') || '0';
              const donorData = JSON.parse(localStorage.getItem('donationData') || '{}');
              
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
              }
              
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
            } else if (data.status === 'FAILED' || data.status === 'CANCELLED') {
              setPaymentStatus('FAILED');
              setStatusMessage('❌ Payment was not completed');
              
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
            } else {
              setPollCount(attempt + 1);
              setPaymentStatus('PENDING');
              if (attempt >= 5) {
                setStatusMessage(`⏳ Payment still processing (${attempt + 1}/15)... Please wait`);
              }
              setTimeout(() => pollStatus(attempt + 1), 3000);
            }
          } catch (err) {
            console.error('Polling error:', err);
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
  // LOADING STATE
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
            <div className="status-card status-loading">
              <div className="status-icon loading-icon">
                <i className="fas fa-spinner fa-spin"></i>
              </div>
              <h2 className="status-title">Processing Payment</h2>
              <p className="status-message">{statusMessage}</p>
              {pollCount > 0 && (
                <div className="progress-container">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${(pollCount / 15) * 100}%` }}></div>
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
      </>
    );
  }

  // ============================================
  // ERROR STATE
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
            <div className="status-card status-error">
              <div className="status-icon error-icon">
                <i className="fas fa-exclamation-circle"></i>
              </div>
              <h2 className="status-title">Verification Failed</h2>
              <p className="status-message">{error}</p>
              <div className="status-actions">
                <Link to="/donate" className="btn-primary">
                  <i className="fas fa-redo"></i> Try Again
                </Link>
                <Link to="/contact" className="btn-secondary">
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
  // PENDING / TIMEOUT STATE
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
            <div className="status-card status-pending">
              <div className="status-icon pending-icon">
                <i className="fas fa-clock"></i>
              </div>
              <h2 className="status-title">Payment Processing</h2>
              <p className="status-message">{donationData.message || 'Your payment is being processed. Please wait for confirmation.'}</p>
              <div className="status-details">
                <div className="detail-row">
                  <span className="detail-label">Transaction Reference</span>
                  <span className="detail-value">{donationData.reference}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Amount</span>
                  <span className="detail-value highlight">KES {donationData.amount}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status</span>
                  <span className="detail-value status-badge pending">⏳ PENDING</span>
                </div>
              </div>
              <div className="status-actions">
                <Link to="/" className="btn-primary">
                  <i className="fas fa-home"></i> Return Home
                </Link>
                <Link to="/contact" className="btn-secondary">
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
  // FAILED / CANCELLED STATE
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
            <div className="status-card status-failed">
              <div className="status-icon failed-icon">
                <i className="fas fa-times-circle"></i>
              </div>
              <h2 className="status-title">Payment Not Completed</h2>
              <p className="status-message">{donationData.message || 'Your payment was not completed. Please try again.'}</p>
              <div className="status-details">
                <div className="detail-row">
                  <span className="detail-label">Transaction Reference</span>
                  <span className="detail-value">{donationData.reference}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Amount</span>
                  <span className="detail-value highlight">KES {donationData.amount}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status</span>
                  <span className="detail-value status-badge failed">❌ {donationData.status}</span>
                </div>
              </div>
              <div className="status-actions">
                <Link to="/donate" className="btn-primary">
                  <i className="fas fa-redo"></i> Try Again
                </Link>
                <Link to="/contact" className="btn-secondary">
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
  // SUCCESS STATE
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
          <div className="status-card status-success">
            <div className="status-icon success-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h2 className="status-title">🎉 Thank You for Your Donation!</h2>
            <p className="status-message">
              Your generous contribution will help us provide love, care, education, and hope to vulnerable children at Kajiado Children's Home.
            </p>
            
            {donationData && (
              <div className="status-details">
                <div className="detail-row">
                  <span className="detail-label">Transaction Reference</span>
                  <span className="detail-value">{donationData.reference}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Amount</span>
                  <span className="detail-value highlight">KES {donationData.amount}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status</span>
                  <span className="detail-value status-badge success">✅ COMPLETED</span>
                </div>
                {donationData.paymentMethod && donationData.paymentMethod !== 'N/A' && (
                  <div className="detail-row">
                    <span className="detail-label">Payment Method</span>
                    <span className="detail-value">{donationData.paymentMethod}</span>
                  </div>
                )}
                {donationData.confirmationCode && donationData.confirmationCode !== 'N/A' && (
                  <div className="detail-row">
                    <span className="detail-label">Confirmation Code</span>
                    <span className="detail-value">{donationData.confirmationCode}</span>
                  </div>
                )}
                {isLogged && (
                  <div className="detail-row success-log">
                    <span className="detail-label">📊 Data Status</span>
                    <span className="detail-value status-badge success">✅ Logged to Google Sheets</span>
                  </div>
                )}
                {logError && (
                  <div className="detail-row error-log">
                    <span className="detail-label">⚠️ Data Status</span>
                    <span className="detail-value status-badge warning">{logError}</span>
                  </div>
                )}
              </div>
            )}

            <div className="status-actions">
              <Link to="/" className="btn-primary">
                <i className="fas fa-home"></i> Return Home
              </Link>
              <Link to="/contact" className="btn-secondary">
                <i className="fas fa-envelope"></i> Contact Us
              </Link>
            </div>

            <div className="impact-section">
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
        /* ============================================
           PAGE CONTAINER
           ============================================ */
        .donation-success-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%);
          padding: 120px 20px 60px;
        }
        
        .donation-success-page .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        /* ============================================
           STATUS CARD - BASE
           ============================================ */
        .status-card {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          padding: 50px 45px;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.10);
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .status-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
        }
        
        .status-card:hover {
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.12);
          transform: translateY(-2px);
        }
        
        /* ============================================
           STATUS CARD - VARIANTS
           ============================================ */
        /* Success */
        .status-success::before {
          background: linear-gradient(90deg, #4caf50, #66bb6a);
        }
        
        .status-success .status-icon {
          color: #4caf50;
        }
        
        /* Error / Failed */
        .status-error::before,
        .status-failed::before {
          background: linear-gradient(90deg, #f44336, #ef5350);
        }
        
        .status-error .status-icon,
        .status-failed .status-icon {
          color: #f44336;
        }
        
        /* Pending / Loading */
        .status-pending::before,
        .status-loading::before {
          background: linear-gradient(90deg, #ff9800, #ffa726);
        }
        
        .status-pending .status-icon,
        .status-loading .status-icon {
          color: #ff9800;
        }
        
        /* ============================================
           STATUS ICONS
           ============================================ */
        .status-icon {
          font-size: 4.5rem;
          margin-bottom: 16px;
          display: block;
        }
        
        .success-icon {
          animation: successPop 0.6s ease;
        }
        
        .failed-icon,
        .error-icon {
          animation: shake 0.5s ease;
        }
        
        .pending-icon {
          animation: pulse 1.5s ease-in-out infinite;
        }
        
        .loading-icon i {
          animation: spin 1s linear infinite;
          display: inline-block;
        }
        
        @keyframes successPop {
          0% { transform: scale(0) rotate(-20deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(5deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-15px); }
          40% { transform: translateX(15px); }
          60% { transform: translateX(-10px); }
          80% { transform: translateX(10px); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        /* ============================================
           STATUS TITLE & MESSAGE
           ============================================ */
        .status-title {
          font-size: 2rem;
          margin-bottom: 12px;
          color: #1a202c;
          font-weight: 700;
          line-height: 1.3;
        }
        
        .status-message {
          color: #4a5568;
          line-height: 1.7;
          margin-bottom: 28px;
          font-size: 1rem;
        }
        
        .status-hint {
          color: #718096;
          font-size: 0.9rem;
          margin-top: 10px;
          font-style: italic;
        }
        
        /* ============================================
           PROGRESS BAR
           ============================================ */
        .progress-container {
          margin: 24px 0 16px;
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
          color: #718096;
          font-size: 0.85rem;
          margin: 8px 0 0;
        }
        
        /* ============================================
           STATUS DETAILS
           ============================================ */
        .status-details {
          background: #f7fafc;
          padding: 20px 24px;
          border-radius: 14px;
          margin-bottom: 28px;
          text-align: left;
          border: 1px solid #e2e8f0;
        }
        
        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .detail-row:last-child {
          border-bottom: none;
        }
        
        .detail-label {
          color: #718096;
          font-size: 0.9rem;
          font-weight: 500;
        }
        
        .detail-value {
          color: #2d3748;
          font-weight: 500;
          font-size: 0.95rem;
          text-align: right;
          word-break: break-word;
          max-width: 60%;
        }
        
        .detail-value.highlight {
          color: #2563eb;
          font-weight: 700;
          font-size: 1.05rem;
        }
        
        .detail-value .status-badge {
          display: inline-block;
          padding: 4px 14px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }
        
        .status-badge.success {
          background: #e8f5e9;
          color: #2e7d32;
        }
        
        .status-badge.failed {
          background: #ffebee;
          color: #c62828;
        }
        
        .status-badge.pending {
          background: #fff3e0;
          color: #e65100;
        }
        
        .status-badge.warning {
          background: #fff8e1;
          color: #f57f17;
        }
        
        .detail-row.success-log {
          border-top: 2px solid #4caf50;
          margin-top: 8px;
          padding-top: 12px;
        }
        
        .detail-row.error-log {
          border-top: 2px solid #f44336;
          margin-top: 8px;
          padding-top: 12px;
        }
        
        /* ============================================
           STATUS ACTIONS (BUTTONS)
           ============================================ */
        .status-actions {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 30px;
        }
        
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: #ffffff !important;
          padding: 14px 32px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          border: 2px solid #2563eb;
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
        }
        
        .btn-primary:hover {
          background: transparent;
          color: #2563eb !important;
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(37, 99, 235, 0.35);
        }
        
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: #4a5568;
          padding: 14px 32px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          border: 2px solid #e2e8f0;
        }
        
        .btn-secondary:hover {
          border-color: #2563eb;
          color: #2563eb;
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(37, 99, 235, 0.1);
        }
        
        /* ============================================
           IMPACT SECTION
           ============================================ */
        .impact-section {
          padding-top: 24px;
          border-top: 2px solid #e2e8f0;
          text-align: left;
        }
        
        .impact-section h3 {
          color: #1a202c;
          margin-bottom: 12px;
          font-size: 1.2rem;
          font-weight: 600;
          text-align: center;
        }
        
        .impact-section > p {
          text-align: center;
          color: #4a5568;
          margin-bottom: 12px;
        }
        
        .impact-section ul {
          list-style: none;
          padding: 0;
          margin: 12px 0 16px;
        }
        
        .impact-section ul li {
          padding: 10px 0;
          color: #4a5568;
          font-size: 0.95rem;
          border-bottom: 1px solid #f0f4f8;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .impact-section ul li:last-child {
          border-bottom: none;
        }
        
        .blessing {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #e2e8f0;
          font-style: italic;
          color: #2d3748;
          text-align: center;
          font-size: 1rem;
        }
        
        .blessing strong {
          color: #2563eb;
        }
        
        /* ============================================
           RESPONSIVE DESIGN
           ============================================ */
        @media (max-width: 1024px) {
          .donation-success-page {
            padding: 110px 20px 50px;
          }
        }
        
        @media (max-width: 768px) {
          .donation-success-page {
            padding: 100px 16px 40px;
            align-items: flex-start;
          }
          
          .status-card {
            padding: 32px 24px;
            border-radius: 20px;
          }
          
          .status-title {
            font-size: 1.6rem;
          }
          
          .status-icon {
            font-size: 3.5rem;
          }
          
          .status-details {
            padding: 16px;
          }
          
          .detail-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
            padding: 8px 0;
          }
          
          .detail-value {
            max-width: 100%;
            text-align: left;
          }
          
          .status-actions {
            flex-direction: column;
            gap: 12px;
          }
          
          .btn-primary,
          .btn-secondary {
            width: 100%;
            justify-content: center;
            padding: 12px 24px;
          }
          
          .impact-section ul li {
            font-size: 0.9rem;
            padding: 8px 0;
          }
        }
        
        @media (max-width: 480px) {
          .donation-success-page {
            padding: 90px 12px 30px;
          }
          
          .status-card {
            padding: 24px 16px;
          }
          
          .status-title {
            font-size: 1.3rem;
          }
          
          .status-message {
            font-size: 0.9rem;
          }
          
          .status-icon {
            font-size: 3rem;
          }
          
          .progress-container {
            margin: 16px 0;
          }
          
          .status-details {
            padding: 12px 14px;
          }
          
          .detail-label {
            font-size: 0.8rem;
          }
          
          .detail-value {
            font-size: 0.85rem;
          }
          
          .detail-value.highlight {
            font-size: 0.95rem;
          }
          
          .impact-section h3 {
            font-size: 1rem;
          }
          
          .impact-section ul li {
            font-size: 0.85rem;
            padding: 6px 0;
          }
          
          .blessing {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </>
  );
}``