// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  const logoSrc = isDarkMode ? "/logo.png" : "/logo-dark.png";

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

  const handleNavClick = (path, e) => {
    closeMenu();
    if (path !== '/') {
      window.scrollTo(0, 0);
    }
  };

  const handleLogoClick = () => {
    closeMenu();
    if (location.pathname !== '/') {
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          {/* Logo */}
          <Link to="/" className="logo" onClick={handleLogoClick}>
            <img 
              src={logoSrc}
              alt="Kajiado Bright Horizons Logo" 
              className="logo-image"
              onError={(e) => {
                e.target.src = "/logo.png";
                e.target.onerror = null;
              }}
            />
            <div className="logo-text">
              <h1>Kajiado Bright Horizons</h1>
            </div>
          </Link>

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
            
            {/* Desktop CTA - inside nav-links for desktop */}
            <li className="desktop-cta">
              <Link to="/get-involved" className="btn-outline-small" onClick={() => handleNavClick('/get-involved')}>
                <i className="fas fa-hand-holding-heart"></i> Get Involved
              </Link>
            </li>
          </ul>

          {/* ⭐ FIXED: nav-actions outside nav-links */}
          <div className="nav-actions">
            {/* Theme Toggle Button */}
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <i className="fas fa-sun"></i>
              ) : (
                <i className="fas fa-moon"></i>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <div className="mobile-logo">
            <img 
              src={logoSrc} 
              alt="Kajiado Bright Horizons Logo" 
              className="mobile-logo-image"
              onError={(e) => {
                e.target.src = "/logo.png";
                e.target.onerror = null;
              }}
            />
            <div className="mobile-logo-text">
              <h3>Kajiado Bright Horizons</h3>
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
          
          {/* Mobile Theme Toggle */}
          <li className="mobile-theme-toggle">
            <button onClick={toggleTheme} className="theme-toggle-mobile">
              <i className={isDarkMode ? "fas fa-sun" : "fas fa-moon"}></i>
              <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </li>
        </ul>
        
        <div className="mobile-menu-footer">
          <Link to="/get-involved" className="btn-gold-mobile" onClick={() => handleNavClick('/get-involved')}>
            <i className="fas fa-hand-holding-heart"></i> Get Involved
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

      {/* Overlay */}
      {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
    </>
  );
}