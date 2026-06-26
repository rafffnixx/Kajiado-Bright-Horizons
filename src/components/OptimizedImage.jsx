// src/components/OptimizedImage.jsx
import React, { useState, useEffect, useRef } from 'react';

export default function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  className, 
  lazy = true 
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    if (!lazy) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [lazy]);

  return (
    <div 
      ref={imgRef}
      className={`optimized-image ${className || ''}`}
      style={{ 
        width: width || '100%', 
        height: height || 'auto',
        background: '#f0f4f8',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {inView && (
        <>
          <img
            src={src}
            alt={alt}
            loading={lazy ? 'lazy' : 'eager'}
            width={width}
            height={height}
            onLoad={() => setIsLoaded(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }}
          />
          {!isLoaded && (
            <div className="image-skeleton" style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(90deg, #f0f4f8 25%, #e2e8f0 50%, #f0f4f8 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite'
            }} />
          )}
        </>
      )}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}