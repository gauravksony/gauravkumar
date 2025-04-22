
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import StudyMaterialForm from './StudyMaterialForm';
import { toast } from 'sonner';

const AdminStudyMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const { data, error } = await supabase
        .from('study_materials')
        .select('*')
        .order('upload_date', { ascending: false });

      if (error) throw error;
      setMaterials(data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('study_materials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Study material deleted successfully');
      fetchMaterials();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      {!showForm ? (
        <>
          <Button onClick={() => setShowForm(true)} className="mb-6">
            Add New Study Material
          </Button>
          <div className="space-y-4">
            {materials.map((material: any) => (
              <div
                key={material.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <h3 className="font-medium">{material.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {material.category}
                  </p>
                </div>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingMaterial(material);
                      setShowForm(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(material.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <StudyMaterialForm
          material={editingMaterial}
          onClose={() => {
            setShowForm(false);
            setEditingMaterial(null);
            fetchMaterials();
          }}
        />
      )}
    </div>
  );
};

export default AdminStudyMaterials;
