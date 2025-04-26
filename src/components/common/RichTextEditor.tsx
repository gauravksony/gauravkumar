
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { 
  FileImage, 
  Bold, 
  Italic,
  Heading1,
  Heading2,
  Heading3
} from 'lucide-react';
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
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
      insertAtCursor(imageHtml);
      
      toast.success('Image inserted successfully');
    } catch (error: any) {
      toast.error('Failed to upload image: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const insertAtCursor = (text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const before = value.substring(0, startPos);
    const after = value.substring(endPos);

    onChange(before + text + after);
    
    // Set cursor position after inserted text
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = startPos + text.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };
  
  const handleFormat = (tag: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selectedText = value.substring(startPos, endPos);

    if (selectedText) {
      const formattedText = `<${tag}>${selectedText}</${tag}>`;
      insertAtCursor(formattedText);
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
          onClick={() => handleFormat('h1')}
        >
          <Heading1 className="w-4 h-4" />
        </Button>
        
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={() => handleFormat('h2')}
        >
          <Heading2 className="w-4 h-4" />
        </Button>
        
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={() => handleFormat('h3')}
        >
          <Heading3 className="w-4 h-4" />
        </Button>
        
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={() => handleFormat('strong')}
        >
          <Bold className="w-4 h-4" />
        </Button>
        
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={() => handleFormat('em')}
        >
          <Italic className="w-4 h-4" />
        </Button>
        
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
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-h-[250px] p-3 bg-portfolio-navy border border-portfolio-lightestNavy rounded-b-md text-portfolio-lightSlate focus:outline-none focus:ring-2 focus:ring-portfolio-cyan/50 focus:border-transparent"
        placeholder="Write your content here... You can use the formatting buttons above or HTML tags for rich content."
      />
      
      <div className="text-sm text-portfolio-slate">
        <p>Use the formatting buttons above to style your content.</p>
        <p>You can also directly use HTML tags: &lt;h1&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, etc.</p>
      </div>
    </div>
  );
};

export default RichTextEditor;
