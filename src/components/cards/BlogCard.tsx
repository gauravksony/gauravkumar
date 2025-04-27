import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { THUMBNAIL_DIMENSIONS } from "@/lib/imageUtils";

export interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  date?: string; // Changed from required to optional
  tags: string[];
  featuredImage?: string;
  readTime?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  excerpt,
  date,
  tags,
  featuredImage,
  readTime = "5 min read",
}) => {
  return (
    <div className="card group h-full flex flex-col">
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
        {readTime && <div className="text-portfolio-slate">{readTime}</div>}
      </div>

      {/* Blog Content */}
      <div className="flex-grow">
        <Link to={`/blogs/${id}`}>
          <h3 className="text-xl font-bold text-portfolio-lightestSlate mb-2 group-hover:text-portfolio-cyan transition-colors">
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
