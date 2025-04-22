
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ResourceType } from '@/components/cards/ResourceCard';

export interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  category: string;
  date: string;
  url: string;
  upload_date: string;
}

export const useStudyMaterials = () => {
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [allCategories, setAllCategories] = useState<string[]>([]);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('study_materials')
        .select('*')
        .order('upload_date', { ascending: false });
      
      if (error) throw error;
      
      const formattedMaterials = data.map((material: any) => ({
        id: material.id,
        title: material.title,
        description: material.description || '',
        type: material.file_url ? 
          (material.file_url.endsWith('.pdf') ? 'pdf' as ResourceType : 
          (material.file_url.includes('youtube') ? 'video' as ResourceType : 'link' as ResourceType)) 
          : 'link' as ResourceType,
        category: material.category,
        date: new Date(material.upload_date).toLocaleDateString(),
        url: material.file_url || '#',
        upload_date: material.upload_date
      }));
      
      setMaterials(formattedMaterials);
      
      const categories = Array.from(
        new Set(formattedMaterials.map(material => material.category))
      );
      setAllCategories(categories);
      
    } catch (error: any) {
      console.error('Error fetching study materials:', error);
      toast.error('Failed to load study materials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  return { materials, loading, allCategories };
};
