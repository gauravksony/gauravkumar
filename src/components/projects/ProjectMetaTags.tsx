import { Helmet } from "react-helmet-async";

interface ProjectMetaTagsProps {
  title: string;
  description: string;
  image?: string;
  url: string;
  isDetailPage?: boolean;
}

const ProjectMetaTags = ({
  title,
  description,
  image,
  url,
  isDetailPage = false,
}: ProjectMetaTagsProps) => {
  const pageTitle = isDetailPage ? `${title} | Portfolio` : title;
  const defaultImage = `${window.location.origin}/placeholder.svg`;
  const metaImage = image || defaultImage;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={metaImage} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default ProjectMetaTags;