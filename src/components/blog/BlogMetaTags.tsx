import { Helmet } from "react-helmet-async";
import {
  DEFAULT_IMAGE,
  SITE_NAME,
  TWITTER_HANDLE,
  formatMetaDate,
  BASE_URL,
} from "@/lib/metaTags";

interface BlogMetaTagsProps {
  title: string;
  description: string;
  image?: string;
  url: string;
  isDetailPage?: boolean;
  publishedDate?: string;
  author?: string;
  readTime?: string;
  tags?: string[];
}

const BlogMetaTags = ({
  title,
  description,
  image = DEFAULT_IMAGE,
  url,
  isDetailPage = false,
  publishedDate,
  author = SITE_NAME,
  readTime,
  tags = [],
}: BlogMetaTagsProps) => {
  const fullTitle = isDetailPage
    ? `${title} | ${SITE_NAME}'s Blog`
    : `Blog | ${SITE_NAME}`;

  const formattedDate = publishedDate
    ? formatMetaDate(publishedDate)
    : undefined;

  // Generate path from URL for the OG image
  const path = url.replace(BASE_URL, "").replace(/^\//, "");

  // Create dynamic OG image URL with improved quality
  const ogImageUrl = `${BASE_URL}/api/og?title=${encodeURIComponent(
    title
  )}&type=blog${path ? `&path=${encodeURIComponent(path)}` : ""}&quality=100`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph Meta Tags - Enhanced for better previews */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={isDetailPage ? "article" : "website"} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:site_name" content={`${SITE_NAME}'s Blog`} />

      {/* Article specific meta tags */}
      {isDetailPage && (
        <>
          <meta property="article:published_time" content={formattedDate} />
          <meta property="article:author" content={author} />
          <meta property="article:section" content="Technology" />
          {tags.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
          {readTime && (
            <meta
              property="article:read_time"
              content={readTime.replace(/\D/g, "")}
            />
          )}
        </>
      )}

      {/* Twitter Cards - Enhanced for better previews */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:label1" content="Written by" />
      <meta name="twitter:data1" content={author} />
      {readTime && (
        <>
          <meta name="twitter:label2" content="Reading time" />
          <meta name="twitter:data2" content={readTime} />
        </>
      )}

      {/* WhatsApp specific meta tags */}
      <meta property="og:image:secure_url" content={ogImageUrl} />
      <meta property="og:locale" content="en_US" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* JSON-LD for Article (only for detail pages) */}
      {isDetailPage && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: title,
            image: [ogImageUrl],
            datePublished: formattedDate,
            dateModified: formattedDate,
            author: {
              "@type": "Person",
              name: author,
              url: BASE_URL,
            },
            publisher: {
              "@type": "Organization",
              name: SITE_NAME,
              logo: {
                "@type": "ImageObject",
                url: DEFAULT_IMAGE,
              },
            },
            description: description,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": url,
            },
            keywords: tags.join(", "),
            wordCount: description.split(/\s+/).length,
            timeRequired: readTime,
          })}
        </script>
      )}
    </Helmet>
  );
};

export default BlogMetaTags;
