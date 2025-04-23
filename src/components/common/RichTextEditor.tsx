
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { FileImage } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  bucket: 'blog_images' | 'study_material_images';
}

const RichTextEditor = ({ value, onChange, bucket }: RichTextEditorProps) => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleInsertImage = async (file: File) => {
    try {
      setLoading(true);
      
      // Generate a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      
      // Upload to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);
      
      if (uploadError) throw uploadError;
      
      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);
      
      // Insert image tag at cursor position or at the end
      const imageHtml = `\n<img src="${publicUrl}" alt="Content image" class="my-4 rounded-md max-w-full" />\n`;
      
      // Simple insertion at the end if we don't have more complex cursor handling
      onChange(value + imageHtml);
      
      toast.success('Image inserted successfully');
    } catch (error: any) {
      toast.error('Failed to upload image: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleInsertImage(file);
    }
  };
  
  return (
    <div className="w-full space-y-2">
      <div className="flex items-center space-x-2 mb-2 bg-portfolio-lightestNavy p-2 rounded-t-md">
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={handleImageButtonClick}
          disabled={loading}
        >
          <FileImage className="w-4 h-4 mr-2" />
          {loading ? 'Inserting...' : 'Insert Image'}
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
      
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-h-[250px] p-3 bg-portfolio-navy border border-portfolio-lightestNavy rounded-b-md text-portfolio-lightSlate focus:outline-none focus:ring-2 focus:ring-portfolio-cyan/50 focus:border-transparent"
        placeholder="Write your content here... You can add rich content like HTML tags and images."
      />
      
      <div className="text-sm text-portfolio-slate">
        <p>To add images, click the "Insert Image" button above.</p>
        <p>You can also use HTML tags for formatting: &lt;h1&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, etc.</p>
      </div>
    </div>
  );
};

export default RichTextEditor;
