import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Daily Life', 'Education', 'Sports', 'Events'];

  const images = [
    { id: 1, category: 'Daily Life', title: 'Morning Assembly', image: '/images/gallery/morning-assembly.jpg' },
    { id: 2, category: 'Education', title: 'Classroom Session', image: '/images/gallery/classroom.jpg' },
    { id: 3, category: 'Sports', title: 'Football Match', image: '/images/gallery/football.jpg' },
    { id: 4, category: 'Events', title: 'Birthday Celebration', image: '/images/gallery/birthday.jpg' },
    { id: 5, category: 'Daily Life', title: 'Meal Time', image: '/images/gallery/meal-time.jpg' },
    { id: 6, category: 'Education', title: 'Library Time', image: '/images/gallery/library.jpg' },
    { id: 7, category: 'Sports', title: 'Athletics Day', image: '/images/gallery/athletics.jpg' },
    { id: 8, category: 'Events', title: 'Graduation Ceremony', image: '/images/gallery/graduation.jpg' },
  ];

  const filteredImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <>
      <SEO 
        title="Gallery - Kajiado Children's Home"
        description="View moments of joy, learning, and growth at Kajiado Children's Home. See our children in daily activities, education, sports, and special events."
        path="/gallery"
      />
      
      <div className="gallery-page">
        {/* Hero Section with Background Image */}
        <section className="about-hero">
          <div className="hero-bg-container">
            <div 
              className="hero-bg-image-about"
              style={{ backgroundImage: 'url("/images/hero/get-involved-hero.jpg")' }}
            ></div>
            <div className="hero-overlay-dark"></div>
          </div>
          <div className="container">
            <div className="hero-content-about">
              <h1>Our <span>Gallery</span></h1>
              <p>Moments of joy, learning, and growth at Kajiado Children's Home</p>
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
                  />
                  <div className="gallery-overlay">
                    <span className="view-btn">Click to view</span>
                  </div>
                </div>
                <div className="gallery-info">
                  <h3>{image.title}</h3>
                  <p>{image.category}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredImages.length === 0 && (
            <div className="gallery-empty">
              <i className="fas fa-images"></i>
              <p>No images found in this category.</p>
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
              <img 
                src={selectedImage.image} 
                alt={selectedImage.title}
              />
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
                <Link to="/donate" className="btn-outline">
                  <i className="fas fa-heart"></i> Support Our Work
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}