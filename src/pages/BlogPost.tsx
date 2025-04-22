
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '@/components/common/Layout';
import { Calendar, Clock, ArrowLeft, Share2, Twitter, Facebook, Linkedin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      if (!data) {
        navigate('/blogs');
        return;
      }
      
      // Transform the data
      const formattedBlog = {
        id: data.id,
        title: data.title,
        content: data.content || '',
        excerpt: data.excerpt || '',
        date: new Date(data.created_at).toLocaleDateString(),
        tags: data.tags || [],
        featuredImage: data.featured_image_url,
        readTime: '5 min read', // Default read time
        created_at: data.created_at
      };
      
      setBlog(formattedBlog);
    } catch (error: any) {
      console.error('Error fetching blog:', error);
      toast.error('Failed to load blog post');
      navigate('/blogs');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-portfolio-lightestSlate mb-4">Loading...</h2>
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
            <h2 className="text-2xl font-bold text-portfolio-lightestSlate mb-4">Blog Post Not Found</h2>
            <p className="text-portfolio-slate mb-6">The article you're looking for doesn't exist or has been removed.</p>
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
          <Link to="/blogs" className="inline-flex items-center text-portfolio-cyan hover:underline mb-8">
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
              {blog.tags.map(tag => (
                <Link to={`/blogs?tag=${tag}`} key={tag} className="tag">
                  {tag}
                </Link>
              ))}
            </div>
            
            {/* Social Share */}
            <div className="flex items-center">
              <span className="text-portfolio-lightSlate mr-4">Share:</span>
              <div className="flex items-center space-x-3">
                <a href={`https://twitter.com/intent/tweet?text=${blog.title}&url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="text-portfolio-slate hover:text-portfolio-cyan transition-colors">
                  <Twitter size={18} />
                </a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="text-portfolio-slate hover:text-portfolio-cyan transition-colors">
                  <Facebook size={18} />
                </a>
                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${blog.title}`} target="_blank" rel="noopener noreferrer" className="text-portfolio-slate hover:text-portfolio-cyan transition-colors">
                  <Linkedin size={18} />
                </a>
                <button 
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
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
            {/* In a real app, you would render the content using a markdown parser */}
            <div className="text-portfolio-slate">
              {blog.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
          
          {/* Author Bio */}
          <div className="border-t border-portfolio-lightestNavy mt-12 pt-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374" 
                alt="Author"
                className="w-24 h-24 rounded-full object-cover border-4 border-portfolio-lightestNavy"
              />
              <div>
                <h3 className="text-xl font-bold text-portfolio-lightestSlate mb-2">John Doe</h3>
                <p className="text-portfolio-slate mb-4">
                  Software Engineer & Computer Science Educator with over 5 years of industry experience.
                  Passionate about teaching and making complex concepts accessible to everyone.
                </p>
                <div className="flex space-x-4">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-portfolio-slate hover:text-portfolio-cyan transition-colors">
                    GitHub
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-portfolio-slate hover:text-portfolio-cyan transition-colors">
                    LinkedIn
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-portfolio-slate hover:text-portfolio-cyan transition-colors">
                    Twitter
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
