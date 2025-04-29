import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { calculateReadTime } from "@/lib/textUtils";

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  featuredImage?: string;
  readTime?: string;
  content: string;
}

interface RecommendedBlogsProps {
  currentBlogId: string;
  tags: string[];
  limit?: number;
}

const RecommendedBlogs = ({
  currentBlogId,
  tags,
  limit = 3,
}: RecommendedBlogsProps) => {
  const [recommendedBlogs, setRecommendedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendedBlogs();
  }, [currentBlogId, tags]);

  const fetchRecommendedBlogs = async () => {
    if (!tags || tags.length === 0) return;

    try {
      setLoading(true);

      // Query blogs that have at least one matching tag
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .neq("id", currentBlogId) // Exclude current blog
        .overlaps("tags", tags) // Find blogs with overlapping tags
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) throw error;

      // Format the blogs
      const formattedBlogs = data.map((blog) => ({
        id: blog.id,
        title: blog.title,
        excerpt: blog.excerpt || "",
        date: new Date(blog.created_at).toLocaleDateString(),
        tags: blog.tags || [],
        featuredImage: blog.featured_image_url,
        content: blog.content || "",
      }));

      setRecommendedBlogs(formattedBlogs);
    } catch (error) {
      console.error("Error fetching recommended blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || recommendedBlogs.length === 0) return null;

  return (
    <div className="mt-12 pt-12 border-t border-portfolio-lightestNavy">
      <h2 className="text-2xl font-bold text-portfolio-lightestSlate mb-8">
        Recommended Articles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendedBlogs.map((blog) => (
          <Link
            to={`/blogs/${blog.id}`}
            key={blog.id}
            className="card group hover:transform hover:-translate-y-1 transition-all duration-300"
          >
            {/* Featured Image */}
            {blog.featuredImage && (
              <div className="h-40 mb-4 overflow-hidden rounded-lg">
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            {/* Blog Meta */}
            <div className="flex items-center text-sm mb-2">
              <div className="flex items-center mr-4">
                <Calendar size={14} className="mr-1 text-portfolio-cyan" />
                <span className="text-portfolio-slate">{blog.date}</span>
              </div>
              <div className="flex items-center">
                <Clock size={14} className="mr-1 text-portfolio-cyan" />
                <span className="text-portfolio-slate">
                  {calculateReadTime(blog.content || blog.excerpt)}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-portfolio-lightestSlate mb-2 group-hover:text-portfolio-cyan transition-colors">
              {blog.title}
            </h3>

            {/* Excerpt */}
            <p className="text-portfolio-slate text-sm mb-3 line-clamp-2">
              {blog.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {blog.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="tag text-xs px-2 py-0.5">
                  {tag}
                </span>
              ))}
              {blog.tags.length > 2 && (
                <span className="tag text-xs px-2 py-0.5">
                  +{blog.tags.length - 2}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendedBlogs;
