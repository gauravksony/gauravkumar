import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ExperienceFormProps {
  onSuccess?: () => void;
  initialData?: {
    id?: string;
    title: string;
    organization: string;
    location: string;
    start_date: string;
    end_date: string;
    description: string[];
    type: "work" | "education";
  };
}

const ExperienceForm = ({ onSuccess, initialData }: ExperienceFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    organization: initialData?.organization || "",
    location: initialData?.location || "",
    start_date: initialData?.start_date || "",
    end_date: initialData?.end_date || "",
    description: initialData?.description?.join("\n") || "",
    type: initialData?.type || "work",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const description = formData.description
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      const experienceData = {
        title: formData.title,
        organization: formData.organization,
        location: formData.location,
        start_date: formData.start_date,
        end_date: formData.end_date,
        description,
        type: formData.type as "work" | "education",
      };

      const { error } = initialData?.id
        ? await supabase
            .from("experiences")
            .update(experienceData)
            .eq("id", initialData.id)
        : await supabase.from("experiences").insert(experienceData);

      if (error) throw error;

      toast.success(
        `Experience ${initialData ? "updated" : "created"} successfully`
      );
      onSuccess?.();
    } catch (error: any) {
      toast.error("Error saving experience: " + error.message);
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
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Organization</label>
        <Input
          value={formData.organization}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, organization: e.target.value }))
          }
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Location</label>
        <Input
          value={formData.location}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, location: e.target.value }))
          }
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <Input
            value={formData.start_date}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, start_date: e.target.value }))
            }
            required
            placeholder="e.g. Jan 2023"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <Input
            value={formData.end_date}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, end_date: e.target.value }))
            }
            required
            placeholder="e.g. Present"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Description (one point per line)
        </label>
        <Textarea
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          required
          rows={5}
          placeholder="• Led a team of 5 developers&#10;• Implemented new features&#10;• Improved performance by 50%"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Type</label>
        <select
          value={formData.type}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              type: e.target.value as "work" | "education",
            }))
          }
          className="w-full px-3 py-2 bg-background border border-input rounded-md"
          required
        >
          <option value="work">Work</option>
          <option value="education">Education</option>
        </select>
      </div>

      <Button type="submit" disabled={loading}>
        {loading
          ? "Saving..."
          : initialData
          ? "Update Experience"
          : "Create Experience"}
      </Button>
    </form>
  );
};

export default ExperienceForm;
