
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

export const useBlogPost = (id: string | undefined) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchBlog(id);
    }
  }, [id]);

  const fetchBlog = async (blogId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', blogId)
        .single();
      
      if (error) throw error;
      
      if (!data) {
        navigate('/blogs');
        return;
      }
      
      let contentString: string;
      if (typeof data.content === 'string') {
        contentString = data.content;
      } else {
        contentString = JSON.stringify(data.content);
      }
      
      const formattedBlog = {
        id: data.id,
        title: data.title,
        content: contentString,
        excerpt: data.excerpt || '',
        date: new Date(data.created_at).toLocaleDateString(),
        tags: data.tags || [],
        featuredImage: data.featured_image_url,
        readTime: estimateReadTime(contentString) + ' min read',
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

  const estimateReadTime = (content: string): string => {
    const div = document.createElement('div');
    div.innerHTML = content;
    const text = div.textContent || '';
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return minutes.toString();
  };

  return { blog, loading };
};
