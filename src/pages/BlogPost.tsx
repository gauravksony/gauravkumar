import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "@/components/common/Layout";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ExpandableContent from "@/components/common/ExpandableContent";
import RecommendedBlogs from "@/components/blog/RecommendedBlogs";

interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  tags: string[];
  featuredImage?: string;
  readTime?: string;
  created_at: string;
  featured_image_url?: string;
}

// Type definitions for JSON content structures
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

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      if (!data) {
        navigate("/blogs");
        return;
      }

      // Process the blog content
      let processedContent = "";

      try {
        // For JSONB content from Supabase
        if (data.content && typeof data.content === "object") {
          // Convert structured content to HTML
          processedContent = convertJsonToHtml(data.content);
        }
        // For JSON string content
        else if (
          data.content &&
          typeof data.content === "string" &&
          (data.content.trim().startsWith("{") ||
            data.content.trim().startsWith("["))
        ) {
          const parsedContent = JSON.parse(data.content);
          processedContent = convertJsonToHtml(parsedContent);
        }
        // For plain HTML content
        else if (data.content) {
          processedContent = data.content;
        }
      } catch (err) {
        console.error("Error processing blog content:", err);
        // Fallback to using the content directly
        processedContent = data.content || "";
      }

      // Transform the data
      const formattedBlog = {
        id: data.id,
        title: data.title,
        content: processedContent,
        excerpt: data.excerpt || "",
        date: new Date(data.created_at).toLocaleDateString(),
        tags: data.tags || [],
        featuredImage: data.featured_image_url,
        readTime: "5 min read", // Default read time
        created_at: data.created_at,
      };

      setBlog(formattedBlog);
    } catch (error: unknown) {
      console.error("Error fetching blog:", error);
      toast.error("Failed to load blog post");
      navigate("/blogs");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to convert JSON content to HTML
  const convertJsonToHtml = (jsonContent: JsonContent): string => {
    // Return HTML string directly if available
    if (jsonContent.html) {
      return jsonContent.html;
    }

    // Return content field if available
    if (jsonContent.content) {
      return jsonContent.content;
    }

    // Handle structured content with blocks
    if (jsonContent.blocks && Array.isArray(jsonContent.blocks)) {
      return jsonContent.blocks
        .map((block: ContentBlock) => {
          let level: number;
          let headingClasses: string;
          let headerLevel: number;
          let headerClasses: string;

          // Handle different block types based on common editor formats
          switch (block.type) {
            case "heading":
              level = block.data.level || 1;
              headingClasses =
                level === 1
                  ? "text-4xl font-bold text-portfolio-lightestSlate mb-6 mt-8"
                  : "text-2xl font-semibold text-portfolio-lightestSlate mb-4 mt-6";
              return `<h${level} class="${headingClasses}">${block.data.text}</h${level}>`;
            case "header":
              headerLevel = block.data.level || 2;
              headerClasses =
                headerLevel === 1
                  ? "text-4xl font-bold text-portfolio-lightestSlate mb-6 mt-8"
                  : "text-2xl font-semibold text-portfolio-lightestSlate mb-4 mt-6";
              return `<h${headerLevel} class="${headerClasses}">${block.data.text}</h${headerLevel}>`;
            case "paragraph":
              return `<p class="text-lg text-portfolio-slate mb-4 leading-relaxed font-baskerville">${block.data.text}</p>`;
            case "list": {
              const items =
                block.data.items
                  ?.map(
                    (item) =>
                      `<li class="mb-2 text-portfolio-slate">${item}</li>`
                  )
                  .join("") || "";
              const listClasses = "my-4 ml-6 space-y-2";
              return block.data.style === "ordered"
                ? `<ol class="${listClasses} list-decimal">${items}</ol>`
                : `<ul class="${listClasses} list-disc">${items}</ul>`;
            }
            case "image":
              return `<figure class="my-6">
                <img 
                  src="${block.data.file?.url || block.data.url || ""}" 
                  alt="${block.data.caption || ""}"
                  class="max-w-full rounded-lg shadow-lg"
                />
                ${
                  block.data.caption
                    ? `<figcaption class="text-center text-sm text-portfolio-slate mt-2">${block.data.caption}</figcaption>`
                    : ""
                }
              </figure>`;
            case "code":
              return `<pre class="bg-portfolio-navy p-4 rounded-lg my-4 overflow-x-auto">
                <code class="text-portfolio-lightestSlate">${
                  block.data.code || ""
                }</code>
              </pre>`;
            case "quote":
              return `<blockquote class="border-l-4 border-portfolio-green pl-4 my-6 italic text-portfolio-lightSlate">
                ${block.data.text || ""}
              </blockquote>`;
            default:
              return `<div class="my-4">${JSON.stringify(block.data)}</div>`;
          }
        })
        .join("");
    }

    // Fallback: return stringified JSON
    return `<pre class="bg-portfolio-navy p-4 rounded-lg">${JSON.stringify(
      jsonContent,
      null,
      2
    )}</pre>`;
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-portfolio-lightestSlate mb-4">
              Loading...
            </h2>
          </div>
        </div>
      </Layout>
    );
  }

  if (!blog) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-portfolio-lightestSlate mb-4">
              Blog Post Not Found
            </h2>
            <p className="text-portfolio-slate mb-6">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/blogs" className="btn-primary">
              <ArrowLeft size={18} className="mr-2" />
              Back to Blogs
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Link
            to="/blogs"
            className="inline-flex items-center text-portfolio-cyan hover:underline mb-8"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to all articles
          </Link>

          {/* Featured Image */}
          {blog.featuredImage && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Blog Header */}
          <header className="mb-12">
            <h1 className="hero-heading mb-4">{blog.title}</h1>

            {/* Meta Data */}
            <div className="flex flex-wrap items-center text-portfolio-slate mb-6">
              <div className="flex items-center mr-6 mb-2">
                <Calendar size={16} className="mr-2 text-portfolio-cyan" />
                <span>{blog.date}</span>
              </div>
              <div className="flex items-center mb-2">
                <Clock size={16} className="mr-2 text-portfolio-cyan" />
                <span>{blog.readTime}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags.map((tag) => (
                <Link to={`/blogs?tag=${tag}`} key={tag} className="tag">
                  {tag}
                </Link>
              ))}
            </div>

            {/* Social Share */}
            <div className="flex items-center">
              <span className="text-portfolio-lightSlate mr-4">Share:</span>
              <div className="flex items-center space-x-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${blog.title}&url=${window.location.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-portfolio-slate hover:text-portfolio-cyan transition-colors"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-portfolio-slate hover:text-portfolio-cyan transition-colors"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${blog.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-portfolio-slate hover:text-portfolio-cyan transition-colors"
                >
                  <Linkedin size={18} />
                </a>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(window.location.href)
                  }
                  className="text-portfolio-slate hover:text-portfolio-cyan transition-colors"
                  title="Copy link"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </header>

          {/* Blog Content */}
          <div className="prose prose-lg prose-invert prose-cyan max-w-none">
            <ExpandableContent
              content={blog.content}
              excerpt={blog.excerpt}
              maxHeight={500}
              className="text-portfolio-slate"
            />
          </div>

          {/* Author Bio */}
          <div className="border-t border-portfolio-lightestNavy mt-12 pt-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <img
                src="https://whnwzoxwuipgmwkqcops.supabase.co/storage/v1/object/public/project_images//1732425738630.jpg"
                alt="Author"
                className="w-24 h-24 rounded-full object-cover border-4 border-portfolio-lightestNavy"
              />
              <div>
                <h3 className="text-xl font-bold text-portfolio-lightestSlate mb-2">
                  Gaurav Kumar
                </h3>
                <p className="text-portfolio-slate mb-4">
                  Tech enthusiast in the making with hands-on experience in
                  full-stack development using modern technologies. I enjoy
                  learning modern technologies, building real-world projects,
                  and sharing my knowledge through blogs, educational content,
                  and helping fellow students grow.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/gauravkumarsony"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-portfolio-slate hover:text-portfolio-cyan transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-portfolio-slate hover:text-portfolio-cyan transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-portfolio-slate hover:text-portfolio-cyan transition-colors"
                  >
                    Twitter
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Blogs */}
          {blog && blog.id && blog.tags && (
            <RecommendedBlogs
              currentBlogId={blog.id}
              tags={blog.tags}
              limit={3}
            />
          )}
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
