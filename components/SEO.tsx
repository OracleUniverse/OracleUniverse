
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BlogPost } from '../types';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  article?: boolean;
  post?: BlogPost;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  image, 
  url, 
  article, 
  post 
}) => {
  const siteTitle = 'Oracle Universe';
  const siteDescription = 'The definitive source for high-performance Oracle ecosystem insights, Database features, and APEX development.';
  const siteUrl = 'https://oracle-universe.vercel.app'; // Replace with actual production URL if known
  const defaultImage = '/og-image.png'; // Make sure this exists or replace with a default

  const seo = {
    title: post ? `${post.title} | ${siteTitle}` : (title ? `${title} | ${siteTitle}` : siteTitle),
    description: post ? post.excerpt : (description || siteDescription),
    image: `${siteUrl}${post ? post.image : (image || defaultImage)}`,
    url: `${siteUrl}${url || ''}`,
  };

  // Structured Data (JSON-LD) for Google Rich Results
  const structuredData = post ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": seo.image,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "datePublished": post.date, // Note: Assuming date format is compatible or handled
    "url": seo.url,
    "publisher": {
      "@type": "Organization",
      "name": "Oracle Universe",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/avatar.png`
      }
    }
  } : null;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={seo.url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article || post ? 'article' : 'website'} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
