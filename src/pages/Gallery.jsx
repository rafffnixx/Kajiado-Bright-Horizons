// src/pages/Gallery.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Daily Life', 'Education', 'Sports', 'Events', 'Anniversary'];

  const images = [
    { id: 1, category: 'Daily Life', title: 'Morning Assembly', image: '/images/gallery/morning-assembly.jpg' },
    { id: 2, category: 'Education', title: 'Classroom Session', image: '/images/gallery/classroom.jpg' },
    { id: 3, category: 'Sports', title: 'Football Match', image: '/images/gallery/football.jpg' },
    { id: 4, category: 'Events', title: 'Birthday Celebration', image: '/images/gallery/birthday.jpg' },
    { id: 5, category: 'Daily Life', title: 'Meal Time', image: '/images/gallery/meal-time.jpg' },
    { id: 6, category: 'Education', title: 'Library Time', image: '/images/gallery/library.jpg' },
    { id: 7, category: 'Anniversary', title: '20th Anniversary', image: '/images/gallery/anniversary.jpg' },
    { id: 8, category: 'Events', title: 'Graduation Ceremony', image: '/images/gallery/graduation.jpg' },
  ];

  const filteredImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <>
      <SEO 
        title="Gallery"
        description="Explore photos of our children, events, and daily life at Kajiado Bright Horizons. See the joy and hope we bring to vulnerable children."
        path="/gallery"
        keywords={['Kajiado Bright Horizons photos', 'childrens home gallery', 'orphanage Kenya photos', 'charity images']}
      />
      
      <div className="gallery-page">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="hero-bg-container">
            <div 
              className="hero-bg-image-about"
              style={{ backgroundImage: 'url("/images/hero/hero-bg3.jpg")' }}
            ></div>
            <div className="hero-overlay-dark"></div>
          </div>
          <div className="container">
            <div className="hero-content-about">
              <h1>Our <span>Gallery</span></h1>
              <p>Moments of joy, learning, and growth at Kajiado Bright Horizons</p>
              
            </div>
          </div>
        </section>

        <div className="container">
          {/* Category Filter */}
          <div className="gallery-filters">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Stats */}
          <div className="gallery-stats">
            <span><i className="fas fa-images"></i> {filteredImages.length} photos</span>
            <span><i className="fas fa-tag"></i> {activeCategory}</span>
          </div>

          {/* Gallery Grid */}
          <div className="gallery-grid">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="gallery-item"
              >
                <div className="gallery-image-wrapper">
                  <img 
                    src={image.image} 
                    alt={image.title}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/400x300/e2e8f0/3b82f6?text=' + image.title;
                    }}
                  />
                  <div className="gallery-overlay">
                    <div className="overlay-content">
                      <i className="fas fa-search-plus"></i>
                      <span>View Photo</span>
                    </div>
                  </div>
                </div>
                <div className="gallery-info">
                  <h3>{image.title}</h3>
                  <span className="gallery-category">{image.category}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredImages.length === 0 && (
            <div className="gallery-empty">
              <i className="fas fa-images"></i>
              <p>No images found in this category.</p>
              <button 
                onClick={() => setActiveCategory('All')}
                className="btn-outline"
                style={{ marginTop: '16px' }}
              >
                View All Photos
              </button>
            </div>
          )}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedImage(null)}>
                <i className="fas fa-times"></i>
              </button>
              <div className="modal-image-wrapper">
                <img 
                  src={selectedImage.image} 
                  alt={selectedImage.title}
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/600x400/e2e8f0/3b82f6?text=' + selectedImage.title;
                  }}
                />
              </div>
              <div className="modal-caption">
                <h3>{selectedImage.title}</h3>
                <p>{selectedImage.category}</p>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Want to Visit Us?</h2>
              <p>Come see our work firsthand and meet the children</p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn-gold">
                  <i className="fas fa-calendar-check"></i> Schedule a Visit
                </Link>
                <Link to="/donate" className="btn-outline-light">
                  <i className="fas fa-heart"></i> Support Our Work
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        /* ============================================
           GALLERY PAGE STYLES
           ============================================ */
        .gallery-page {
          background: var(--bg-deep);
          min-height: 100vh;
        }

        /* ============================================
           HERO SECTION
           ============================================ */
        .about-hero {
          background: linear-gradient(135deg, #1a365d 0%, #2b6cb0 50%, #2563eb 100%) !important;
          padding: 120px 0 80px !important;
          min-height: 400px;
          display: flex;
          align-items: center;
        }

        .hero-content-about {
          text-align: center;
        }

        .hero-content-about h1 {
          color: #ffffff !important;
          font-size: 3.2rem;
          font-weight: 700;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          margin-bottom: 16px;
        }

        .hero-content-about h1 span {
          color: #f6e05e !important;
        }

        .hero-content-about p {
          color: #e2e8f0 !important;
          font-size: 1.3rem;
        }

        .hero-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 32px;
        }

        .btn-gold {
          background: linear-gradient(105deg, #2563eb, #1d4ed8);
          border: none;
          padding: 14px 36px;
          font-weight: 700;
          border-radius: 50px;
          color: #ffffff !important;
          font-family: 'Poppins', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.35);
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .btn-gold:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(37, 99, 235, 0.45);
        }

        .btn-outline {
          background: transparent;
          border: 2px solid #ffffff;
          padding: 12px 32px;
          border-radius: 50px;
          color: #ffffff;
          font-weight: 600;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .btn-outline:hover {
          background: #ffffff;
          color: #2563eb !important;
          transform: translateY(-2px);
        }

        .btn-outline-light {
          background: transparent;
          border: 2px solid #ffffff;
          padding: 12px 32px;
          border-radius: 50px;
          color: #ffffff;
          font-weight: 600;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .btn-outline-light:hover {
          background: #ffffff;
          color: #2563eb !important;
          transform: translateY(-2px);
        }

        /* ============================================
           GALLERY FILTERS
           ============================================ */
        .gallery-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
          padding: 40px 0 20px;
        }

        .filter-btn {
          padding: 10px 24px;
          background: var(--card-bg);
          border: 2px solid var(--border-color);
          border-radius: 30px;
          color: var(--text-color);
          font-weight: 500;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
        }

        .filter-btn:hover {
          border-color: var(--primary-color);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
        }

        .filter-btn.active {
          background: var(--primary-color);
          border-color: var(--primary-color);
          color: #ffffff;
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
        }

        /* ============================================
           GALLERY STATS
           ============================================ */
        .gallery-stats {
          display: flex;
          gap: 24px;
          justify-content: center;
          padding: 16px 0 24px;
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .gallery-stats i {
          color: var(--primary-color);
          margin-right: 6px;
        }

        /* ============================================
           GALLERY GRID
           ============================================ */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
          padding: 20px 0 60px;
        }

        .gallery-item {
          cursor: pointer;
          border-radius: 16px;
          overflow: hidden;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }

        .gallery-item:hover {
          transform: translateY(-8px);
          border-color: var(--primary-color);
          box-shadow: 0 15px 40px rgba(59, 130, 246, 0.15);
        }

        .gallery-image-wrapper {
          position: relative;
          overflow: hidden;
          aspect-ratio: 4/3;
          background: var(--bg-deep);
        }

        .gallery-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .gallery-item:hover .gallery-image-wrapper img {
          transform: scale(1.08);
        }

        .gallery-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }

        .overlay-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: #ffffff;
          transform: translateY(20px);
          transition: transform 0.3s ease;
        }

        .gallery-item:hover .overlay-content {
          transform: translateY(0);
        }

        .overlay-content i {
          font-size: 2rem;
          opacity: 0.8;
        }

        .overlay-content span {
          font-size: 0.9rem;
          font-weight: 500;
        }

        .gallery-info {
          padding: 16px 20px;
        }

        .gallery-info h3 {
          color: var(--text-color);
          font-size: 1.05rem;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .gallery-category {
          color: var(--primary-color);
          font-size: 0.8rem;
          font-weight: 500;
          background: rgba(59, 130, 246, 0.1);
          padding: 2px 12px;
          border-radius: 12px;
          display: inline-block;
        }

        /* ============================================
           EMPTY STATE
           ============================================ */
        .gallery-empty {
          text-align: center;
          padding: 80px 20px;
          color: var(--text-muted);
        }

        .gallery-empty i {
          font-size: 4rem;
          color: var(--primary-color);
          opacity: 0.3;
          margin-bottom: 16px;
        }

        .gallery-empty p {
          font-size: 1.1rem;
        }

        /* ============================================
           MODAL
           ============================================ */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .modal-container {
          max-width: 700px;
          width: 100%;
          max-height: 90vh;
          background: var(--card-bg);
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          animation: scaleIn 0.3s ease;
          border: 1px solid var(--border-color);
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 10;
          background: rgba(0, 0, 0, 0.5);
          border: none;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          color: #ffffff;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-close:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: rotate(90deg);
        }

        .modal-image-wrapper {
          width: 100%;
          aspect-ratio: 4/3;
          background: var(--bg-deep);
        }

        .modal-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .modal-caption {
          padding: 20px 24px;
        }

        .modal-caption h3 {
          color: var(--text-color);
          font-size: 1.3rem;
          margin-bottom: 4px;
        }

        .modal-caption p {
          color: var(--primary-color);
          font-size: 0.9rem;
          font-weight: 500;
        }

        /* ============================================
           CTA SECTION
           ============================================ */
        .cta-section {
          padding: 80px 0;
          background: linear-gradient(135deg, #1a365d, #2563eb) !important;
        }

        .cta-content {
          text-align: center;
          max-width: 700px;
          margin: 0 auto;
        }

        .cta-content h2 {
          color: #ffffff !important;
          font-size: 2.4rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .cta-content p {
          color: #e2e8f0 !important;
          font-size: 1.2rem;
          margin-bottom: 32px;
        }

        .cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* ============================================
           RESPONSIVE DESIGN
           ============================================ */
        @media (max-width: 768px) {
          .about-hero {
            padding: 100px 0 60px !important;
          }

          .hero-content-about h1 {
            font-size: 2.2rem;
          }

          .hero-content-about p {
            font-size: 1.1rem;
          }

          .gallery-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 16px;
            padding: 16px 0 40px;
          }

          .gallery-filters {
            gap: 8px;
            padding: 24px 0 12px;
          }

          .filter-btn {
            padding: 8px 16px;
            font-size: 0.8rem;
          }

          .gallery-stats {
            font-size: 0.8rem;
            gap: 16px;
          }

          .modal-container {
            max-width: 100%;
            max-height: 95vh;
          }

          .modal-caption {
            padding: 16px;
          }

          .modal-caption h3 {
            font-size: 1.1rem;
          }

          .cta-content h2 {
            font-size: 1.8rem;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .btn-gold,
          .btn-outline,
          .btn-outline-light {
            width: 100%;
            justify-content: center;
          }

          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }
        }

        @media (max-width: 480px) {
          .gallery-grid {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }

          .gallery-info {
            padding: 12px 14px;
          }

          .gallery-info h3 {
            font-size: 0.9rem;
          }

          .gallery-category {
            font-size: 0.7rem;
          }

          .filter-btn {
            padding: 6px 12px;
            font-size: 0.75rem;
          }

          .modal-close {
            top: 10px;
            right: 10px;
            width: 36px;
            height: 36px;
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
}