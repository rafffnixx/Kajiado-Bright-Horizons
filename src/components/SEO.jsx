// src/components/SEO.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  path, 
  image, 
  type = 'website',
  keywords = [],
  author = 'Kajiado Bright Horizons',
  publishedDate,
  modifiedDate,
  children 
}) => {
  const siteName = 'Kajiado Bright Horizons';
  const defaultDescription = 'Providing hope, care, and education to vulnerable children in Kajiado, Kenya. Support orphaned and vulnerable children through sponsorship, donations, and volunteering.';
  const defaultImage = 'https://kajiado-bright-horizons.vercel.app/images/og-image.jpg';
  const url = `https://kajiado-bright-horizons.vercel.app${path || ''}`;
  
  const metaDescription = description || defaultDescription;
  const metaImage = image || defaultImage;
  const metaKeywords = keywords.length > 0 ? keywords.join(', ') : 'Kajiado Bright Horizons, childrens home, orphanage, charity, donations, child sponsorship, Kenya, Kajiado, vulnerable children, Christian care, education, shelter, feeding program';

  // Organization structured data
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Kajiado Bright Horizons',
    url: 'https://kajiado-bright-horizons.vercel.app',
    logo: 'https://kajiado-bright-horizons.vercel.app/logo.png',
    description: defaultDescription,
    email: 'info@kajiadochildrenhome.org',
    telephone: '+254700123456',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kajiado',
      addressRegion: 'Kajiado County',
      addressCountry: 'KE',
      streetAddress: 'Kajiado Town'
    },
    sameAs: [
      'https://www.facebook.com/kajiadochildrenshome',
      'https://twitter.com/kajiadochildren',
      'https://www.instagram.com/kajiadochildrenshome'
    ]
  };

  // Website structured data
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: 'https://kajiado-bright-horizons.vercel.app',
    description: defaultDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://kajiado-bright-horizons.vercel.app/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  // Breadcrumb structured data (if path is provided)
  const breadcrumbSchema = path ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://kajiado-bright-horizons.vercel.app/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: title || 'Kajiado Bright Horizons',
        item: url
      }
    ]
  } : null;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title ? `${title} | ${siteName}` : siteName}</title>
      <meta name="title" content={title ? `${title} | ${siteName}` : siteName} />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content={author} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title ? `${title} | ${siteName}` : siteName} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_KE" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title ? `${title} | ${siteName}` : siteName} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:site" content="@kajiadochildren" />
      <meta name="twitter:creator" content="@kajiadochildren" />
      
      {/* Article meta (if type is article) */}
      {type === 'article' && (
        <>
          <meta property="article:published_time" content={publishedDate} />
          <meta property="article:modified_time" content={modifiedDate} />
          <meta property="article:author" content={author} />
          <meta property="article:tag" content={metaKeywords} />
        </>
      )}
      
      {/* Favicon and App Icons */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      <meta name="theme-color" content="#2563eb" />
      
      {/* Additional SEO */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="msapplication-tap-highlight" content="no" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      
      {children}
    </Helmet>
  );
};

export default SEO;