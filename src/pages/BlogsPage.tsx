import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/common/Layout";
import BlogCard from "@/components/cards/BlogCard";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { calculateReadTime } from "@/lib/textUtils";
import { initializeLazyLoading } from "@/lib/imageUtils";

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  featuredImage?: string;
  readTime: string;
  content: string;
  created_at: string;
}

interface BlogApiResponse {
  id: string;
  title: string;
  excerpt?: string;
  content?: string;
  tags?: string[];
  featured_image_url?: string;
  created_at: string;
}

// JSON content interfaces for content processing
interface BlockData {
  text?: string;
  level?: number;
  items?: string[];
  style?: string;
  file?: { url: string };
  url?: string;
  caption?: string;
  code?: string;
  language?: string;
  [key: string]: unknown;
}

interface ContentBlock {
  type: string;
  data: BlockData;
}

interface JsonContent {
  html?: string;
  content?: string;
  blocks?: ContentBlock[];
  [key: string]: unknown;
}

const BlogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    // Initialize lazy loading after blogs are loaded
    if (!loading) {
      initializeLazyLoading();
    }
  }, [loading, blogs]);

  // Helper function to convert JSON content to HTML - same as in BlogPost.tsx
  const processContent = (rawContent: string | object | null): string => {
    // If it's a string but might be JSON
    if (
      typeof rawContent === "string" &&
      (rawContent.trim().startsWith("{") || rawContent.trim().startsWith("["))
    ) {
      try {
        // Try to parse it as JSON
        const parsedContent = JSON.parse(rawContent);
        return convertJsonToHtml(parsedContent);
      } catch (e) {
        // If it fails, it's a plain string
        return rawContent;
      }
    }

    // If it's already an object
    if (typeof rawContent === "object" && rawContent !== null) {
      return convertJsonToHtml(rawContent as JsonContent);
    }

    // Default fallback
    return typeof rawContent === "string" ? rawContent : "";
  };

  // Convert JSON content to HTML - simplified version of the one in BlogPost.tsx
  const convertJsonToHtml = (jsonContent: JsonContent): string => {
    // Return HTML string directly if available
    if (jsonContent.html) {
      return jsonContent.html;
    }

    // Return content field if available
    if (jsonContent.content) {
      return jsonContent.content as string;
    }

    // Handle structured content with blocks
    if (jsonContent.blocks && Array.isArray(jsonContent.blocks)) {
      return jsonContent.blocks
        .map((block: ContentBlock) => {
          // Simplified processing - just extract text content for read time calculation
          switch (block.type) {
            case "heading":
            case "header":
              return block.data.text || "";
            case "paragraph":
              return block.data.text || "";
            case "list":
              return (block.data.items || []).join(" ");
            case "quote":
              return block.data.text || "";
            case "code":
              return block.data.code || "";
            default:
              return "";
          }
        })
        .join(" ");
    }

    // Fallback: return empty string
    return "";
  };

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Transform the data to match the BlogCard component props
      const formattedBlogs = data.map((blog: BlogApiResponse) => {
        // Process content in the same way as in BlogPost.tsx
        const processedContent = processContent(blog.content);

        // Calculate read time based on processed content
        const readTime = calculateReadTime(processedContent);

        return {
          id: blog.id,
          title: blog.title,
          excerpt: blog.excerpt || "",
          date: new Date(blog.created_at).toLocaleDateString(),
          tags: blog.tags || [],
          featuredImage: blog.featured_image_url,
          content: processedContent,
          readTime,
          created_at: blog.created_at,
        };
      });

      setBlogs(formattedBlogs);

      // Extract all unique tags
      const tags = Array.from(
        new Set(formattedBlogs.flatMap((blog) => blog.tags))
      );
      setAllTags(tags);
    } catch (error: unknown) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  // Filter blogs based on search term and selected tag
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      !searchTerm ||
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag = !selectedTag || blog.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  return (
    <Layout>
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="hero-heading mb-4">Blog</h1>
            <p className="text-lg text-portfolio-slate dark:text-gray-300 max-w-2xl mx-auto">
              Thoughts, tutorials, and insights on programming, computer
              science, and career development.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-12 flex flex-col md:flex-row gap-6 justify-between">
            {/* Search */}
            <div className="relative w-full md:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search
                  size={18}
                  className="text-portfolio-cyan dark:text-blue-400"
                />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-portfolio-navy dark:bg-gray-800 border border-portfolio-lightestNavy dark:border-gray-700 rounded-md text-portfolio-lightSlate dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-portfolio-cyan/50 dark:focus:ring-blue-500/50 focus:border-transparent"
              />
            </div>

            {/* Tag Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`tag ${
                  !selectedTag
                    ? "bg-portfolio-cyan dark:bg-blue-600 text-portfolio-navy dark:text-white"
                    : ""
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`tag ${
                    selectedTag === tag
                      ? "bg-portfolio-cyan dark:bg-blue-600 text-portfolio-navy dark:text-white"
                      : ""
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Grid */}
          {loading ? (
            <div className="text-center py-12">
              <h3 className="text-xl text-portfolio-lightestSlate dark:text-gray-300 mb-2">
                Loading blogs...
              </h3>
            </div>
          ) : filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  id={blog.id}
                  title={blog.title}
                  excerpt={blog.excerpt}
                  date={blog.date}
                  tags={blog.tags}
                  featuredImage={blog.featuredImage}
                  content={blog.content}
                  readTime={blog.readTime}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl text-portfolio-lightestSlate dark:text-gray-300 mb-2">
                No articles found
              </h3>
              <p className="text-portfolio-slate dark:text-gray-400">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default BlogsPage;
