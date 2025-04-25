
import { useState } from 'react';
import { toast } from 'sonner';
import { FileImage } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ProjectFormProps {
  onSuccess?: () => void;
  initialData?: {
    id?: string;
    title: string;
    description: string;
    technologies: string[];
    github_url?: string;
    live_url?: string;
    image_url?: string;
    featured: boolean;
  };
}

const ProjectForm = ({ onSuccess, initialData }: ProjectFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    technologies: initialData?.technologies?.join(', ') || '',
    github_url: initialData?.github_url || '',
    live_url: initialData?.live_url || '',
    image_url: initialData?.image_url || '',
    featured: initialData?.featured || false
  });

  const handleImageUpload = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('project_images')
        .upload(fileName, file);
      
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage
        .from('project_images')
        .getPublicUrl(fileName);
      
      setFormData(prev => ({ ...prev, image_url: publicUrl }));
      toast.success('Image uploaded successfully');
    } catch (error: any) {
      toast.error('Failed to upload image: ' + error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const technologies = formData.technologies
        .split(',')
        .map(tech => tech.trim())
        .filter(Boolean);

      const projectData = {
        title: formData.title,
        description: formData.description,
        technologies,
        github_url: formData.github_url || null,
        live_url: formData.live_url || null,
        image_url: formData.image_url || null,
        featured: formData.featured
      };

      const { error } = initialData?.id
        ? await supabase
            .from('projects')
            .update(projectData)
            .eq('id', initialData.id)
        : await supabase
            .from('projects')
            .insert(projectData);

      if (error) throw error;
      
      toast.success(`Project ${initialData ? 'updated' : 'created'} successfully`);
      onSuccess?.();
    } catch (error: any) {
      toast.error('Error saving project: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <Input
          value={formData.title}
          onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <Textarea
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Technologies (comma-separated)</label>
        <Input
          value={formData.technologies}
          onChange={e => setFormData(prev => ({ ...prev, technologies: e.target.value }))}
          placeholder="React, TypeScript, Tailwind"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">GitHub URL</label>
        <Input
          type="url"
          value={formData.github_url}
          onChange={e => setFormData(prev => ({ ...prev, github_url: e.target.value }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Live URL</label>
        <Input
          type="url"
          value={formData.live_url}
          onChange={e => setFormData(prev => ({ ...prev, live_url: e.target.value }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Project Image</label>
        <div className="flex items-center gap-4">
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            id="project-image"
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file);
            }}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('project-image')?.click()}
          >
            <FileImage className="w-4 h-4 mr-2" />
            Upload Image
          </Button>
          {formData.image_url && (
            <img 
              src={formData.image_url} 
              alt="Project preview" 
              className="h-10 w-10 object-cover rounded"
            />
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured"
          checked={formData.featured}
          onChange={e => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
        />
        <label htmlFor="featured" className="text-sm font-medium">Featured Project</label>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : initialData ? 'Update Project' : 'Create Project'}
      </Button>
    </form>
  );
};

export default ProjectForm;
