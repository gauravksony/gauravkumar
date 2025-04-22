
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Database } from '@/integrations/supabase/types';
import { Image } from 'lucide-react';

type StudyMaterialCategory = Database['public']['Enums']['study_material_category'];

interface StudyMaterialFormProps {
  material?: any;
  onClose: () => void;
}

const categories: StudyMaterialCategory[] = [
  'Programming',
  'DSA',
  'DBMS',
  'OS',
  'Networking',
  'Web Development',
  'Mobile Development',
  'Machine Learning',
  'Interview Prep',
  'Other',
];

const StudyMaterialForm = ({ material, onClose }: StudyMaterialFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<StudyMaterialCategory>('Programming');
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (material) {
      setTitle(material.title);
      setDescription(material.description || '');
      setCategory(material.category as StudyMaterialCategory);
      if (material.thumbnail_url) {
        setThumbnailPreview(material.thumbnail_url);
      }
    }
  }, [material]);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      const previewUrl = URL.createObjectURL(file);
      setThumbnailPreview(previewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      let fileUrl = material?.file_url;
      let thumbnailUrl = material?.thumbnail_url;

      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('study_materials')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('study_materials')
          .getPublicUrl(fileName);

        fileUrl = publicUrl;
      }

      if (thumbnail) {
        const fileExt = thumbnail.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('study_material_thumbnails')
          .upload(fileName, thumbnail);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('study_material_thumbnails')
          .getPublicUrl(fileName);

        thumbnailUrl = publicUrl;
      }

      const materialData = {
        title,
        description,
        category,
        file_url: fileUrl,
        thumbnail_url: thumbnailUrl,
      };

      if (material) {
        const { error } = await supabase
          .from('study_materials')
          .update(materialData)
          .eq('id', material.id);
        if (error) throw error;
        toast.success('Study material updated successfully');
      } else {
        const { error } = await supabase
          .from('study_materials')
          .insert([materialData]);
        if (error) throw error;
        toast.success('Study material created successfully');
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
        <Label htmlFor="category">Category</Label>
        <Select
          value={category}
          onValueChange={(value: StudyMaterialCategory) => setCategory(value)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        <Input
          id="file"
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="thumbnail">Thumbnail Image</Label>
        <Input
          id="thumbnail"
          type="file"
          accept="image/*"
          onChange={handleThumbnailChange}
        />
        {thumbnailPreview && (
          <div className="mt-2 relative w-32 h-32">
            <img
              src={thumbnailPreview}
              alt="Thumbnail preview"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        )}
        {!thumbnailPreview && (
          <div className="mt-2 w-32 h-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
            <Image className="w-8 h-8 text-gray-400" />
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : material ? 'Update Material' : 'Create Material'}
        </Button>
      </div>
    </form>
  );
};

export default StudyMaterialForm;

