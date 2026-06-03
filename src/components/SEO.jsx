// src/components/SEO.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

const defaultSEO = {
  title: 'Kajiado Children\'s Home - Hope & Care for Vulnerable Children',
  titleTemplate: '%s | Kajiado Children\'s Home',
  description: 'Providing shelter, education, healthcare, and love to orphaned and vulnerable children in Kajiado, Kenya since 1997. Support us through donations, sponsorship, or volunteering.',
  siteUrl: 'https://www.kajiadochildrenhome.org',
  image: 'https://www.kajiadochildrenhome.org/og-image.jpg',
  twitterHandle: '@kajiadochildren',
};

const SEO = ({ title, description, path, image, article, noIndex }) => {
  const seo = {
    title: title ? `${title} | Kajiado Children's Home` : defaultSEO.title,
    description: description || defaultSEO.description,
    image: image || defaultSEO.image,
    url: `${defaultSEO.siteUrl}${path || '/'}`,
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content="Kajiado Children's Home, orphanage Kenya, sponsor a child Kenya, donate to children, vulnerable children, child sponsorship, children's charity Kenya" />
      <meta name="author" content="Kajiado Children's Home" />
      <meta name="theme-color" content="#3B82F6" />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:site_name" content="Kajiado Children's Home" />
      <meta property="og:locale" content="en_KE" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:site" content={defaultSEO.twitterHandle} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={seo.url} />
      
      {/* Structured Data - Organization (NGO) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NGO",
          "name": "Kajiado Children's Home",
          "url": defaultSEO.siteUrl,
          "logo": `${defaultSEO.siteUrl}/logo.png`,
          "image": seo.image,
          "description": defaultSEO.description,
          "foundingDate": "1997",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Kajiado Town",
            "addressLocality": "Kajiado",
            "addressRegion": "Kajiado County",
            "addressCountry": "KE"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+254700123456",
            "contactType": "customer service",
            "email": "info@kajiadochildrenhome.org",
            "availableLanguage": ["English", "Swahili", "Maa"]
          },
          "sameAs": [
            "https://www.facebook.com/kajiadochildrenshome",
            "https://twitter.com/kajiadochildren",
            "https://www.instagram.com/kajiadochildrenshome",
            "https://www.linkedin.com/company/kajiado-childrens-home"
          ],
          "donation": {
            "@type": "DonateAction",
            "name": "Support Kajiado Children's Home",
            "url": `${defaultSEO.siteUrl}/donate`
          }
        })}
      </script>
      
      {/* Additional Structured Data for Breadcrumbs (if applicable) */}
      {path && path !== '/' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": defaultSEO.siteUrl
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": title || "Page",
                "item": seo.url
              }
            ]
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;