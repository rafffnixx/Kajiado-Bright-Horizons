// src/components/SEO.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

const defaultSEO = {
  title: 'M.K GATHU Financial Consulting - Premier Financial Management Kenya',
  titleTemplate: '%s | M.K GATHU Financial Consulting',
  description: 'Expert financial consulting in Kenya: business registration, KRA compliance, payroll, tax advisory, and debt tracking. Trusted by 500+ businesses.',
  siteUrl: 'https://www.mkgathuconsulting.co.ke',
  image: 'https://www.mkgathuconsulting.co.ke/og-image.jpg',
  twitterHandle: '@mkgathu',
};

const SEO = ({ title, description, path, image, article, noIndex }) => {
  const seo = {
    title: title ? `${title} | M.K GATHU Financial Consulting` : defaultSEO.title,
    description: description || defaultSEO.description,
    image: image || defaultSEO.image,
    url: `${defaultSEO.siteUrl}${path || '/'}`,
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:site_name" content="M.K GATHU Financial Consulting" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:site" content={defaultSEO.twitterHandle} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={seo.url} />
      
      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FinancialService",
          "name": "M.K GATHU Financial Consulting",
          "url": defaultSEO.siteUrl,
          "logo": `${defaultSEO.siteUrl}/logo.png`,
          "image": seo.image,
          "description": defaultSEO.description,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Nairobi",
            "addressCountry": "KE",
            "addressRegion": "Nairobi",
            "streetAddress": "Westlands"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+254762610912",
            "contactType": "customer service",
            "email": "gathukamau23@gmail.com",
            "availableLanguage": ["English", "Swahili"]
          },
          "sameAs": [
            "https://www.facebook.com/mkgathu",
            "https://twitter.com/mkgathu",
            "https://www.linkedin.com/company/mkgathu",
            "https://www.instagram.com/mkgathu"
          ],
          "priceRange": "$$"
        })}
      </script>
    </Helmet>
  );
};

export default SEO;