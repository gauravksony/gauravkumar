import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { THUMBNAIL_DIMENSIONS } from "@/lib/imageUtils";
import { calculateReadTime } from "@/lib/textUtils";
import { useEffect, useState } from "react";

export interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  date?: string; // Changed from required to optional
  tags: string[];
  featuredImage?: string;
  readTime?: string;
  content?: string; // Add content for read time calculation
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  excerpt,
  date,
  tags,
  featuredImage,
  readTime,
  content,
}) => {
  // Calculate read time dynamically if content is available
  const [estimatedReadTime, setEstimatedReadTime] = useState(
    readTime || "5 min read"
  );

  useEffect(() => {
    // First use the provided readTime if available (pre-calculated)
    if (readTime) {
      setEstimatedReadTime(readTime);
    }
    // Otherwise, if content is available, calculate read time from it
    else if (content) {
      // Make sure to clean the content from HTML tags for accurate word count
      setEstimatedReadTime(calculateReadTime(content));
    }
    // If no content but excerpt is available, calculate from excerpt
    else if (excerpt) {
      setEstimatedReadTime(calculateReadTime(excerpt));
    }
    // Otherwise use default
    else {
      setEstimatedReadTime("5 min read");
    }
  }, [content, excerpt, readTime]);

  return (
    <div className="card group h-full flex flex-col hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-300 animate-on-scroll">
      {/* Blog Image */}
      {featuredImage && (
        <div className="w-full aspect-video overflow-hidden rounded-md mb-4">
          <img
            src={featuredImage}
            alt={title}
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      )}

      {/* Blog Meta */}
      <div className="flex items-center text-sm text-portfolio-slate mb-2">
        {date && (
          <div className="flex items-center mr-4">
            <Calendar size={14} className="mr-1" />
            <span>{date}</span>
          </div>
        )}
        <div className="flex items-center text-portfolio-slate">
          <Clock size={14} className="mr-1" />
          <span>{estimatedReadTime}</span>
        </div>
      </div>

      {/* Blog Content */}
      <div className="flex-grow">
        <Link to={`/blogs/${id}`}>
          <h3 className="text-xl font-bold mb-2 text-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
            {title}
          </h3>
        </Link>

        <p className="text-portfolio-slate mb-4 line-clamp-3">{excerpt}</p>

        {/* Tags */}
        <div className="mb-4">
          {tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Read More Link */}
      <Link
        to={`/blogs/${id}`}
        className="text-portfolio-cyan font-medium hover:underline inline-flex"
      >
        Read More
      </Link>
    </div>
  );
};

export default BlogCard;
