import { Helmet } from "react-helmet-async";
import {
  DEFAULT_IMAGE,
  SITE_NAME,
  TWITTER_HANDLE,
  BASE_URL,
} from "@/lib/metaTags";

interface StudyMaterialMetaTagsProps {
  title: string;
  description: string;
  image?: string;
  url: string;
  isDetailPage?: boolean;
}

const StudyMaterialMetaTags = ({
  title,
  description,
  image = DEFAULT_IMAGE,
  url,
  isDetailPage = false,
}: StudyMaterialMetaTagsProps) => {
  const fullTitle = isDetailPage
    ? `${title} | ${SITE_NAME} Study Materials`
    : `Study Materials | ${SITE_NAME}`;

  // Generate path from URL for the OG image
  const path = url.replace(BASE_URL, "").replace(/^\//, "");

  // Create dynamic OG image URL
  const ogImageUrl = `${BASE_URL}/api/og?title=${encodeURIComponent(
    title
  )}&type=study${path ? `&path=${encodeURIComponent(path)}` : ""}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={isDetailPage ? "article" : "website"} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:site_name"
        content={`${SITE_NAME} | Free Study Materials`}
      />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta name="twitter:image:alt" content={title} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default StudyMaterialMetaTags;
