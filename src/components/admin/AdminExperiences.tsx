import { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ExperienceForm from "./ExperienceForm";
import { toast } from "sonner";

const AdminExperiences = () => {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setExperiences(data || []);
    } catch (error: any) {
      toast.error("Error fetching experiences: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;

    try {
      const { error } = await supabase
        .from("experiences")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Experience deleted successfully");
      fetchExperiences();
    } catch (error: any) {
      toast.error("Error deleting experience: " + error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Experiences</h2>
        <Button
          onClick={() => {
            setSelectedExperience(null);
            setShowForm(true);
          }}
        >
          Add Experience
        </Button>
      </div>

      {loading ? (
        <p>Loading experiences...</p>
      ) : experiences.length === 0 ? (
        <p>No experiences found. Add your first experience!</p>
      ) : (
        <div className="grid gap-4">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="p-4 border rounded-lg bg-card flex items-center justify-between"
            >
              <div>
                <h3 className="font-medium">{experience.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {experience.organization} • {experience.location}
                </p>
                <p className="text-xs text-muted-foreground">
                  {experience.start_date} - {experience.end_date}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setSelectedExperience(experience);
                    setShowForm(true);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDelete(experience.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedExperience ? "Edit Experience" : "Add Experience"}
            </DialogTitle>
          </DialogHeader>
          <ExperienceForm
            initialData={selectedExperience}
            onSuccess={() => {
              setShowForm(false);
              fetchExperiences();
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminExperiences;
