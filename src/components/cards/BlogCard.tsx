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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [estimatedReadTime, setEstimatedReadTime] = useState(
    readTime || "5 min read"
  );

  useEffect(() => {
    if (readTime) {
      setEstimatedReadTime(readTime);
    } else if (content) {
      setEstimatedReadTime(calculateReadTime(content));
    } else if (excerpt) {
      setEstimatedReadTime(calculateReadTime(excerpt));
    }
  }, [content, excerpt, readTime]);

  return (
    <div className="card group h-full flex flex-col hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-300 animate-on-scroll">
      {/* Blog Image with lazy loading */}
      {featuredImage && (
        <div className="w-full aspect-video overflow-hidden rounded-md mb-4 relative">
          <div
            className={`absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse ${
              imageLoaded ? "hidden" : "block"
            }`}
          />
          <img
            data-src={featuredImage}
            alt={title}
            className={`w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500 lazy ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      )}

      {/* Blog Meta with stagger animation */}
      <div className="flex items-center text-sm text-portfolio-slate mb-2 stagger-list">
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

        {/* Tags with stagger animation */}
        <div className="mb-4 stagger-list">
          {tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Read More Link with hover effect */}
      <Link
        to={`/blogs/${id}`}
        className="text-portfolio-cyan font-medium hover:underline inline-flex items-center group"
      >
        Read More
        <svg
          className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </div>
  );
};

export default BlogCard;
