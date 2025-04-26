import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Image } from "lucide-react";
import RichTextEditor from "@/components/common/RichTextEditor";
import { cropImage, THUMBNAIL_DIMENSIONS } from "@/lib/imageUtils";

interface Blog {
  id: string;
  title: string;
  slug: string;
  content?: string;
  featured_image_url?: string;
}

interface BlogFormProps {
  blog?: Blog;
  onClose: () => void;
}

const BlogForm = ({ blog, onClose }: BlogFormProps) => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState<
    string | null
  >(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setSlug(blog.slug);
      setContent(blog.content || "");
      if (blog.featured_image_url) {
        setFeaturedImagePreview(blog.featured_image_url);
      }
    }
  }, [blog]);

  const handleFeaturedImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Show original image preview immediately for better UX
        const originalPreviewUrl = URL.createObjectURL(file);
        setFeaturedImagePreview(originalPreviewUrl);

        // Process the image with proper cropping
        const dimensions = THUMBNAIL_DIMENSIONS.blog;
        const croppedFile = await cropImage(
          file,
          dimensions.width,
          dimensions.height,
          dimensions.aspectRatio
        );

        setFeaturedImage(croppedFile);

        // Update preview to show the cropped version
        URL.revokeObjectURL(originalPreviewUrl);
        const croppedPreviewUrl = URL.createObjectURL(croppedFile);
        setFeaturedImagePreview(croppedPreviewUrl);

        toast.success("Image cropped to ideal dimensions");
      } catch (error) {
        console.error("Error cropping image:", error);
        toast.error("Failed to process image");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      let featuredImageUrl = blog?.featured_image_url;

      if (featuredImage) {
        const fileExt = featuredImage.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("blog_images")
          .upload(fileName, featuredImage);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("blog_images").getPublicUrl(fileName);

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
          .from("blogs")
          .update(blogData)
          .eq("id", blog.id);
        if (error) throw error;
        toast.success("Blog updated successfully");
      } else {
        const { error } = await supabase.from("blogs").insert([blogData]);
        if (error) throw error;
        toast.success("Blog created successfully");
      }

      onClose();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      toast.error(errorMessage);
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
        <RichTextEditor
          value={content}
          onChange={setContent}
          bucket="blog_images"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Featured Image</Label>
        <p className="text-xs text-portfolio-slate mb-2">
          Recommended size: {THUMBNAIL_DIMENSIONS.blog.width}×
          {THUMBNAIL_DIMENSIONS.blog.height}px (16:9 ratio)
        </p>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleFeaturedImageChange}
        />

        {featuredImagePreview && (
          <div className="mt-2 relative">
            <img
              src={featuredImagePreview}
              alt="Featured image preview"
              className="w-full max-w-md h-auto object-cover rounded-md"
            />
            <p className="text-xs text-portfolio-slate mt-1">
              Preview of cropped thumbnail
            </p>
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
          {loading ? "Saving..." : blog ? "Update Blog" : "Create Blog"}
        </Button>
      </div>
    </form>
  );
};

export default BlogForm;
