import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Logo paths - images in public folder
  const logoSrc = "/logo.png";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('menu-open');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('menu-open');
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'unset';
    document.body.classList.remove('menu-open');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location]);

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isMenuOpen]);

  // Navigation links - removed duplicate Get Involved from navLinks since it's now the CTA button
  const navLinks = [
    { path: '/', label: 'Home', icon: 'fas fa-home' },
    { path: '/about', label: 'About', icon: 'fas fa-heart' },
    { path: '/donors-partners', label: 'Partners', icon: 'fas fa-handshake' },
    { path: '/events', label: 'Events', icon: 'fas fa-calendar-alt' },
    { path: '/gallery', label: 'Gallery', icon: 'fas fa-images' },
    { path: '/contact', label: 'Contact', icon: 'fas fa-envelope' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleNavClick = (path) => {
    closeMenu();
    window.scrollTo(0, 0);
  };

  return (
    <>
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <Link to="/" className="logo" onClick={() => handleNavClick('/')}>
            <img 
              src={logoSrc}
              alt="Kajiado Children's Home Logo" 
              className="logo-image"
            />
            <div className="logo-text">
              <h1>Kajiado Children's Home</h1>
              <p>MAKING A DIFFERENCE ONE CHILD AT A TIME</p>
            </div>
          </Link>

          <button 
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>

          {/* Desktop Navigation */}
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  className={isActive(link.path) ? 'active' : ''}
                  onClick={() => handleNavClick(link.path)}
                >
                  <i className={link.icon}></i>
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
            <li className="desktop-cta">
              <Link to="/get-involved" className="btn-outline-small" onClick={() => handleNavClick('/get-involved')}>
                <i className="fas fa-hands-helping"></i> Get Involved
              </Link>
            </li>
          </ul>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <div className="mobile-logo">
            <img src={logoSrc} alt="Kajiado Children's Home Logo" className="mobile-logo-image" />
            <div className="mobile-logo-text">
              <h3>Kajiado Children's Home</h3>
              <p>CARING FOR CHILDREN • KENYA</p>
            </div>
          </div>
          <button className="mobile-menu-close" onClick={closeMenu} aria-label="Close menu">
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <ul className="mobile-nav-links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link 
                to={link.path} 
                className={isActive(link.path) ? 'active' : ''}
                onClick={() => handleNavClick(link.path)}
              >
                <i className={link.icon}></i>
                <span>{link.label}</span>
                <i className="fas fa-chevron-right arrow"></i>
              </Link>
            </li>
          ))}
        </ul>
        
        <div className="mobile-menu-footer">
          <Link to="/get-involved" className="btn-gold-mobile" onClick={() => handleNavClick('/get-involved')}>
            <i className="fas fa-hands-helping"></i> Get Involved
          </Link>
          <div className="mobile-contact-info">
            <a href="tel:+254700123456">
              <i className="fas fa-phone"></i> +254 700 123 456
            </a>
            <a href="mailto:info@kajiadochildrenhome.org">
              <i className="fas fa-envelope"></i> Email Us
            </a>
          </div>
        </div>
      </div>

      {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
    </>
  );
}