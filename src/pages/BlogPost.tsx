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
        shareTitle + " " + shareUrl
      )}`,
      "_blank"
    );
    setShowShareMenu(false);
  };

  const shareOnInstagram = () => {
    // Instagram doesn't have a direct share URL like other platforms
    // So we'll show a toast notification with instructions
    toast.info(
      "Instagram sharing: Screenshot the post and share on your story or copy the link!"
    );
    setShowShareMenu(false);
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(
      () => {
        setCopySuccess(true);
        toast.success("Link copied to clipboard!");

        // Reset success icon after 2 seconds
        setTimeout(() => {
          setCopySuccess(false);
        }, 2000);
      },
      (err) => {
        toast.error("Could not copy link: " + err);
      }
    );
    setShowShareMenu(false);
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

            {/* Share buttons - REPLACED COMPLETELY */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-modern-textLight dark:text-gray-400 mr-1">
                Share:
              </span>

              {/* LinkedIn - Directly visible (replacing Twitter) */}
              <button
                onClick={(e) => {
                  createRipple(e);
                  shareOnLinkedIn();
                }}
                className="text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-600 transition-colors transform hover:scale-110 p-2 rounded-full relative overflow-hidden"
                aria-label="Share on LinkedIn"
              >
                <Linkedin size={18} />
              </button>

              {/* Facebook - Directly visible */}
              <button
                onClick={(e) => {
                  createRipple(e);
                  shareOnFacebook();
                }}
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-600 transition-colors transform hover:scale-110 p-2 rounded-full relative overflow-hidden"
                aria-label="Share on Facebook"
              >
                <Facebook size={18} />
              </button>

              {/* WhatsApp - Directly visible */}
              <button
                onClick={(e) => {
                  createRipple(e);
                  shareOnWhatsApp();
                }}
                className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-500 transition-colors transform hover:scale-110 p-2 rounded-full relative overflow-hidden"
                aria-label="Share on WhatsApp"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="hover:fill-green-500"
                >
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                </svg>
              </button>

              {/* More options dropdown */}
              <div className="relative" ref={shareMenuRef}>
                <button
                  ref={shareButtonRef}
                  onClick={(e) => {
                    createRipple(e);
                    toggleShareMenu();
                  }}
                  className="text-gray-600 dark:text-gray-400 hover:text-modern-primary dark:hover:text-blue-500 transition-colors transform hover:scale-110 p-2 rounded-full relative overflow-hidden"
                  aria-label="More share options"
                >
                  <Share2
                    size={18}
                    className={`${
                      showShareMenu
                        ? "text-modern-primary dark:text-blue-400"
                        : ""
                    }`}
                  />
                </button>

                {/* Dropdown menu for more share options */}
                <div
                  className={`absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-rich-lg border border-gray-200 dark:border-gray-700 z-10 py-2 transition-all duration-300 ease-in-out overflow-hidden ${
                    showShareMenu
                      ? "opacity-100 max-h-64 translate-y-0"
                      : "opacity-0 max-h-0 -translate-y-4 pointer-events-none"
                  }`}
                >
                  <div className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                    More options
                  </div>
                  <div className="p-2">
                    <button
                      onClick={(e) => {
                        createRipple(e);
                        shareOnTwitter();
                      }}
                      className="flex items-center gap-3 w-full text-left p-2 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative overflow-hidden"
                    >
                      <Twitter size={16} className="text-blue-400" />
                      <span className="text-sm">Twitter</span>
                    </button>
                    <button
                      onClick={(e) => {
                        createRipple(e);
                        shareOnInstagram();
                      }}
                      className="flex items-center gap-3 w-full text-left p-2 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative overflow-hidden"
                    >
                      <Instagram size={16} className="text-pink-500" />
                      <span className="text-sm">Instagram</span>
                    </button>
                    <button
                      onClick={(e) => {
                        createRipple(e);
                        copyLinkToClipboard();
                      }}
                      className="flex items-center gap-3 w-full text-left p-2 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative overflow-hidden"
                    >
                      {copySuccess ? (
                        <Check size={16} className="text-green-500" />
                      ) : (
                        <Copy size={16} className="text-gray-500" />
                      )}
                      <span className="text-sm">Copy link</span>
                    </button>
                  </div>
                </div>
              </div>
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
