import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const logoSrc = "/logo.png";

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/donors-partners', label: 'Partners' },
    { path: '/children', label: 'Sponsor a Child' },
    { path: '/get-involved', label: 'Get Involved' },
    { path: '/events', label: 'Events' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' }
  ];

  const supportLinks = [
    { path: '/donate', label: 'Make a Donation' },
    { path: '/children', label: 'Sponsor a Child' },
    { path: '/get-involved', label: 'Become a Volunteer' },
    { path: '/donors-partners', label: 'Become a Partner' }
  ];

  const handleNavClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* About Column */}
          <div className="footer-about">
            <div className="footer-logo">
              <img src={logoSrc} alt="Kajiado Children's Home Logo" className="footer-logo-image" />
              <div className="footer-logo-text">
                <h3>Kajiado Children's Home</h3>
                <p>CARING FOR CHILDREN • KENYA</p>
              </div>
            </div>
            <p className="footer-description">
              Kajiado Children's Home provides a safe and loving environment for abused, abandoned, 
              and orphaned children in Kajiado, Kenya. Since 1997, we have supported hundreds of children 
              by offering shelter, care, and opportunities for a better future.
            </p>
            <div className="social-links">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-links-col">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} onClick={handleNavClick}>
                    <i className="fas fa-chevron-right"></i> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links Column */}
          <div className="footer-links-col">
            <h4>Get Involved</h4>
            <ul>
              {supportLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} onClick={handleNavClick}>
                    <i className="fas fa-chevron-right"></i> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-contact">
            <h4>Contact Info</h4>
            <ul className="contact-info-list">
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <span>Kajiado Town, Kajiado County, Kenya</span>
                </div>
              </li>
              <li>
                <i className="fas fa-phone"></i>
                <div>
                  <a href="tel:+254700123456">+254 700 123 456</a>
                </div>
              </li>
              <li>
                <i className="fab fa-whatsapp"></i>
                <div>
                  <a href="https://wa.me/254700123456">+254 700 123 456 (WhatsApp)</a>
                </div>
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                <div>
                  <a href="mailto:info@kajiadochildrenhome.org">info@kajiadochildrenhome.org</a>
                </div>
              </li>
              <li>
                <i className="fas fa-clock"></i>
                <div>
                  <strong>Visiting Hours</strong>
                  <span>Mon-Fri: 9:00AM – 5:00PM</span>
                  <span>Sat: 10:00AM – 2:00PM</span>
                  <span>Sun: Closed (By appointment)</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              <p>&copy; {currentYear} Kajiado Children's Home. All rights reserved. Caring for vulnerable children in Kajiado, Kenya since 1997.</p>
            </div>
            <div className="footer-legal">
              <Link to="/terms" onClick={handleNavClick}>Terms of Service</Link>
              <span className="separator">|</span>
              <Link to="/privacy" onClick={handleNavClick}>Privacy Policy</Link>
            </div>
          </div>
        </div>

        {/* Developer Credit */}
        <div className="footer-developer">
          <p>
            Website by <strong>RAFFCODES IT SOLUTIONS</strong> | 
            <a href="https://raffcodes.vercel.app" target="_blank" rel="noopener noreferrer">
              raffcodes.vercel.app
            </a>
          </p>
        </div>
      </div>

      {/* WhatsApp Chat Button */}
      <a 
        href="https://wa.me/254700123456?text=Hello%20Kajiado%20Children%27s%20Home%2C%20I%20want%20to%20support%20your%20work" 
        className="whatsapp-chat"
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <i className="fab fa-whatsapp"></i>
      </a>
    </footer>
  );
}