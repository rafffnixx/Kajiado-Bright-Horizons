import { useEffect } from 'react';

function ImagePreloader() {
  useEffect(() => {
    // Preload images when hovering over navigation links
    const preloadCache = new Set();
    
    const preloadImage = (src) => {
      if (!src || preloadCache.has(src)) return;
      preloadCache.add(src);
      const img = new Image();
      img.src = src;
    };

    // Map navigation paths to their images
    const pageImages = {
      '/gallery': [
        '/images/gallery/morning-assembly.jpg',
        '/images/gallery/classroom.jpg',
        '/images/gallery/football.jpg',
        '/images/gallery/birthday.jpg'
      ],
      '/events': [
        '/images/events/gala.jpg',
        '/images/events/sports-day.jpg',
        '/images/events/charity-walk.jpg'
      ],
      '/donors-partners': [
        '/images/partners/kcb.png',
        '/images/partners/safaricom.png',
        '/images/partners/equity.png'
      ],
      '/about': [
        '/images/staff/director.jpg',
        '/images/staff/teachers.jpg'
      ]
    };

    const handleMouseEnter = (e) => {
      const link = e.currentTarget;
      const href = link.getAttribute('href');
      
      if (href && pageImages[href]) {
        pageImages[href].forEach(img => preloadImage(img));
      }
    };

    // Find all navigation links
    const navLinks = document.querySelectorAll('nav a, .nav-link, [data-preload]');
    
    navLinks.forEach(link => {
      link.addEventListener('mouseenter', handleMouseEnter);
    });

    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('mouseenter', handleMouseEnter);
      });
    };
  }, []);

  return null;
}

export default ImagePreloader;