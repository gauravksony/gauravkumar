import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAbsoluteUrl } from "@/lib/metaTags";
import BlogMetaTags from "../blog/BlogMetaTags";
import ProjectMetaTags from "../projects/ProjectMetaTags";
import StudyMaterialMetaTags from "../study-materials/StudyMaterialMetaTags";

interface DynamicMetaTagsProps {
  title: string;
  description: string;
  image?: string;
  type?: "blog" | "project" | "study" | "default";
  isDetailPage?: boolean;
  publishedDate?: string;
}

/**
 * A component that sets meta tags based on the current route and passed parameters
 * Use this for dynamic content that needs to generate meta tags based on the current URL
 */
const DynamicMetaTags = ({
  title,
  description,
  image,
  type = "default",
  isDetailPage = false,
  publishedDate,
}: DynamicMetaTagsProps) => {
  const location = useLocation();
  const [url, setUrl] = useState<string>(getAbsoluteUrl(location.pathname));

  // Update URL if location changes
  useEffect(() => {
    setUrl(getAbsoluteUrl(location.pathname));
  }, [location.pathname]);

  // Render appropriate meta tags based on content type
  switch (type) {
    case "blog":
      return (
        <BlogMetaTags
          title={title}
          description={description}
          image={image}
          url={url}
          isDetailPage={isDetailPage}
          publishedDate={publishedDate}
        />
      );
    case "project":
      return (
        <ProjectMetaTags
          title={title}
          description={description}
          image={image}
          url={url}
          isDetailPage={isDetailPage}
        />
      );
    case "study":
      return (
        <StudyMaterialMetaTags
          title={title}
          description={description}
          image={image}
          url={url}
          isDetailPage={isDetailPage}
        />
      );
    default:
      // Use BlogMetaTags as a fallback since it has the most features
      return (
        <BlogMetaTags
          title={title}
          description={description}
          image={image}
          url={url}
          isDetailPage={isDetailPage}
          publishedDate={publishedDate}
        />
      );
  }
};

export default DynamicMetaTags;
