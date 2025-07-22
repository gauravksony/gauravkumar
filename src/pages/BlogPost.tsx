import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Layout from "@/components/common/Layout";
import { Helmet } from "react-helmet-async";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  Copy,
  Check,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ExpandableContent from "@/components/common/ExpandableContent";
import RecommendedBlogs from "@/components/blog/RecommendedBlogs";
import { applyMouseTilt, resetTransform } from "@/lib/animation";
import { calculateReadTime } from "@/lib/textUtils";

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
  const [showShareMenu, setShowShareMenu] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);
  const shareButtonRef = useRef<HTMLButtonElement>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlog();

    // Close share menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        shareMenuRef.current &&
        !shareMenuRef.current.contains(event.target as Node)
      ) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [id]);

  // Setup mouse move handler for share button
  useEffect(() => {
    const shareButton = shareButtonRef.current;
    if (!shareButton) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (shareButton) {
        applyMouseTilt(e, shareButton, 800, 5, false);
      }
    };

    const handleMouseLeave = () => {
      if (shareButton) {
        resetTransform(shareButton);
      }
    };

    shareButton.addEventListener("mousemove", handleMouseMove);
    shareButton.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      shareButton.removeEventListener("mousemove", handleMouseMove);
      shareButton.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [blog, loading]);

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

      // Since content is now stored as HTML text, we can use it directly
      const processedContent = data.content || "";

      // Calculate read time based on content
      const estimatedReadTime = calculateReadTime(processedContent);

      // Transform the data
      const formattedBlog = {
        id: data.id,
        title: data.title,
        content: processedContent,
        excerpt: data.excerpt || "",
        date: new Date(data.created_at).toLocaleDateString(),
        tags: data.tags || [],
        featuredImage: data.featured_image_url,
        readTime: estimatedReadTime,
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

  // Helper function to convert JSON content to HTML with updated typography
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
                  ? "text-4xl font-bold text-black dark:text-white mb-6 mt-8 font-noe"
                  : "text-2xl font-semibold text-black dark:text-white mb-4 mt-6 font-marat";
              return `<h${level} class="${headingClasses}">${block.data.text}</h${level}>`;
            case "header":
              headerLevel = block.data.level || 2;
              headerClasses =
                headerLevel === 1
                  ? "text-4xl font-bold text-black dark:text-white mb-6 mt-8 font-noe"
                  : "text-2xl font-semibold text-black dark:text-white mb-4 mt-6 font-marat";
              return `<h${headerLevel} class="${headerClasses}">${block.data.text}</h${headerLevel}>`;
            case "paragraph":
              return `<p class="text-xl text-gray-800 dark:text-gray-300 mb-4 leading-relaxed font-charter">${block.data.text}</p>`;
            case "list": {
              const items =
                block.data.items
                  ?.map(
                    (item) =>
                      `<li class="mb-2 text-xl text-gray-800 dark:text-gray-300 font-charter">${item}</li>`
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
                    ? `<figcaption class="text-center text-sm text-gray-800 dark:text-gray-300 mt-2">${block.data.caption}</figcaption>`
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
              return `<blockquote class="border-l-4 border-portfolio-green pl-4 my-6 italic text-gray-800 dark:text-gray-300">
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

  // Share functionality
  const shareUrl = window.location.href;
  const shareTitle = blog?.title || "Check out this blog post";

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        shareUrl
      )}&text=${encodeURIComponent(shareTitle)}`,
      "_blank"
    );
    setShowShareMenu(false);
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      "_blank"
    );
    setShowShareMenu(false);
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        shareUrl
      )}&title=${encodeURIComponent(shareTitle)}`,
      "_blank"
    );
    setShowShareMenu(false);
  };

  const shareOnWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${shareTitle}\n${shareUrl}`
      )}`,
      "_blank"
    );
  };

  const shareOnInstagram = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast.success("Link copied! Share it on your Instagram story or post");
    });
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopySuccess(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const toggleShareMenu = () => {
    setShowShareMenu(!showShareMenu);
  };

  // Function to create ripple effect on button click
  const createRipple = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const button = event.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${
      event.clientX - button.getBoundingClientRect().left - diameter / 2
    }px`;
    circle.style.top = `${
      event.clientY - button.getBoundingClientRect().top - diameter / 2
    }px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
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
      {blog && (
        <Helmet>
          <title>{blog.title} | Gaurav Kumar</title>
          <meta
            name="description"
            content={
              blog.excerpt || `Read ${blog.title} on Gaurav Kumar's blog`
            }
          />

          {/* Open Graph Meta Tags */}
          <meta property="og:title" content={blog.title} />
          <meta
            property="og:description"
            content={
              blog.excerpt || `Read ${blog.title} on Gaurav Kumar's blog`
            }
          />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={window.location.href} />
          {blog.featuredImage && (
            <meta property="og:image" content={blog.featuredImage} />
          )}
          <meta property="og:site_name" content="Gaurav Kumar's Blog" />
          <meta property="article:author" content="Gaurav Kumar" />

          {/* Twitter Cards */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@gauravkumarsony" />
          <meta name="twitter:title" content={blog.title} />
          <meta
            name="twitter:description"
            content={
              blog.excerpt || `Read ${blog.title} on Gaurav Kumar's blog`
            }
          />
          {blog.featuredImage && (
            <meta name="twitter:image" content={blog.featuredImage} />
          )}
          <meta name="twitter:creator" content="@gauravkumarsony" />

          {/* JSON-LD for Article */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: blog.title,
              image: blog.featuredImage,
              datePublished: blog.created_at,
              dateModified: blog.created_at,
              author: {
                "@type": "Person",
                name: "Gaurav Kumar",
              },
              publisher: {
                "@type": "Person",
                name: "Gaurav Kumar",
                logo: {
                  "@type": "ImageObject",
                  url: "https://whnwzoxwuipgmwkqcops.supabase.co/storage/v1/object/public/project_images//1732425738630-photoaidcom-cropped.jpg",
                },
              },
              description:
                blog.excerpt || `Read ${blog.title} on Gaurav Kumar's blog`,
            })}
          </script>
        </Helmet>
      )}

      <div className="py-24 md:py-32">
        {/* Go back link */}
        <div className="max-w-3xl mx-auto px-6 mb-8">
          <Link
            to="/blogs"
            className="flex items-center text-modern-primary dark:text-blue-400 hover:underline mb-4"
          >
            <ArrowLeft size={18} className="mr-2" /> Back to all blogs
          </Link>

          {/* Blog title - Now at the very top */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-6 font-noe">
            {blog.title}
          </h1>

          {/* Blog excerpt/summary */}
          {blog.excerpt && (
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 font-charter leading-relaxed border-l-4 border-modern-primary dark:border-blue-500 pl-4 py-1">
              {blog.excerpt}
            </p>
          )}

          {/* Blog metadata */}
          <div className="flex flex-wrap items-center justify-between mb-8 border-b border-gray-200 dark:border-gray-700 pb-6">
            <div className="flex items-center text-modern-textLight dark:text-gray-400 text-sm mb-4 md:mb-0">
              <Calendar size={16} className="mr-2" />
              {blog.date}
              <span className="mx-2">•</span>
              <Clock size={16} className="mr-2" />
              {blog.readTime}
            </div>

            {/* Share buttons - Replace the existing share buttons section */}
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Share:
              </span>

              {/* WhatsApp */}
              <button
                onClick={(e) => {
                  createRipple(e);
                  shareOnWhatsApp();
                }}
                className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors transform hover:scale-110 p-2 rounded-full relative overflow-hidden"
                aria-label="Share on WhatsApp"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </button>

              {/* Instagram */}
              <button
                onClick={(e) => {
                  createRipple(e);
                  shareOnInstagram();
                }}
                className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors transform hover:scale-110 p-2 rounded-full relative overflow-hidden"
                aria-label="Share on Instagram"
              >
                <Instagram size={18} />
              </button>

              {/* Facebook */}
              <button
                onClick={(e) => {
                  createRipple(e);
                  shareOnFacebook();
                }}
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110 p-2 rounded-full relative overflow-hidden"
                aria-label="Share on Facebook"
              >
                <Facebook size={18} />
              </button>

              {/* LinkedIn */}
              <button
                onClick={(e) => {
                  createRipple(e);
                  shareOnLinkedIn();
                }}
                className="text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-500 transition-colors transform hover:scale-110 p-2 rounded-full relative overflow-hidden"
                aria-label="Share on LinkedIn"
              >
                <Linkedin size={18} />
              </button>

              {/* Copy Link */}
              <button
                onClick={(e) => {
                  createRipple(e);
                  copyLinkToClipboard();
                }}
                className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors transform hover:scale-110 p-2 rounded-full relative overflow-hidden group"
                aria-label="Copy link"
              >
                {copySuccess ? (
                  <Check size={18} className="text-green-500" />
                ) : (
                  <Copy size={18} />
                )}
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {copySuccess ? "Copied!" : "Copy link"}
                </span>
              </button>
            </div>
          </div>

          {/* Featured image */}
          {blog.featuredImage && (
            <div className="mb-8">
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-auto object-cover rounded-xl shadow-rich-md"
              />
            </div>
          )}
        </div>

        {/* Blog content */}
        <div className="max-w-3xl mx-auto px-6">
          <div
            className="blog-content prose prose-lg max-w-none prose-headings:font-marat prose-h1:font-noe prose-headings:text-black dark:prose-headings:text-white prose-p:font-charter prose-p:text-xl prose-p:text-gray-800 dark:prose-p:text-gray-300 prose-li:text-xl prose-li:text-gray-800 dark:prose-li:text-gray-300 prose-li:font-charter"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/blogs?tag=${tag}`}
                    className="tag hover:bg-modern-primary hover:text-white dark:hover:bg-blue-600 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recommended blogs section */}
        <div className="max-w-6xl mx-auto px-6 mt-16">
          <RecommendedBlogs currentBlogId={blog.id} tags={blog.tags} />
        </div>
      </div>
    </Layout>
  );
};

export default BlogPost;
