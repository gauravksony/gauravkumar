import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Image } from 'lucide-react';

interface BlogFormProps {
  blog?: any;
  onClose: () => void;
}

const BlogForm = ({ blog, onClose }: BlogFormProps) => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setSlug(blog.slug);
      setContent(blog.content || '');
      if (blog.featured_image_url) {
        setFeaturedImagePreview(blog.featured_image_url);
      }
    }
  }, [blog]);

  const handleFeaturedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeaturedImage(file);
      const previewUrl = URL.createObjectURL(file);
      setFeaturedImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      let featuredImageUrl = blog?.featured_image_url;

      if (featuredImage) {
        const fileExt = featuredImage.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('blog_images')
          .upload(fileName, featuredImage);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('blog_images')
          .getPublicUrl(fileName);

        featuredImageUrl = publicUrl;
      }

      const blogData = {
        title,
        slug,
        content,
        featured_image_url: featuredImageUrl,
      };

      if (blog) {
        const { error } = await supabase
          .from('blogs')
          .update(blogData)
          .eq('id', blog.id);
        if (error) throw error;
        toast.success('Blog updated successfully');
      } else {
        const { error } = await supabase
          .from('blogs')
          .insert([blogData]);
        if (error) throw error;
        toast.success('Blog created successfully');
      }

      onClose();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="image">Featured Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleFeaturedImageChange}
        />
        
        {featuredImagePreview && (
          <div className="mt-2 relative w-64 h-40">
            <img
              src={featuredImagePreview}
              alt="Featured image preview"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        )}
        
        {!featuredImagePreview && (
          <div className="mt-2 w-64 h-40 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
            <Image className="w-8 h-8 text-gray-400" />
          </div>
        )}
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : blog ? 'Update Blog' : 'Create Blog'}
        </Button>
      </div>
    </form>
  );
};

export default BlogForm;
