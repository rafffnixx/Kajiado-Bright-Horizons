import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <>
      <SEO 
        title="Page Not Found - 404 Error"
        description="The page you're looking for doesn't exist. Please check the URL or return to our homepage."
        path="/404"
        noIndex={true}
      />
      
      <div className="not-found-page">
        <div className="container">
          <div className="not-found-content">
            <div className="not-found-icon">
              <i className="fas fa-search"></i>
            </div>
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>Sorry, the page you are looking for doesn't exist or has been moved.</p>
            <div className="not-found-buttons">
              <Link to="/" className="btn-gold">
                <i className="fas fa-home"></i> Back to Home
              </Link>
              <Link to="/contact" className="btn-outline">
                <i className="fas fa-envelope"></i> Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}