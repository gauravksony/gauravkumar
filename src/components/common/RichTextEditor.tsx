
import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { FileImage, Bold, Italic, Underline, ListOrdered, ListUnordered, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
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
  const editorRef = useRef<HTMLDivElement>(null);
  
  const execCommand = useCallback((command: string, value: string = '') => {
    document.execCommand(command, false, value);
    
    // After executing the command, update the value with the HTML content
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);
  
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
      
      // Insert image HTML at cursor position
      execCommand('insertHTML', `<img src="${publicUrl}" alt="Content image" class="my-4 rounded-md max-w-full" />`);
      
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

  const handleEditorChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };
  
  return (
    <div className="w-full space-y-2">
      <div className="flex flex-wrap items-center gap-2 p-2 bg-portfolio-lightestNavy rounded-t-md">
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={() => execCommand('bold')}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </Button>
        
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={() => execCommand('italic')}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </Button>
        
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={() => execCommand('underline')}
          title="Underline"
        >
          <Underline className="w-4 h-4" />
        </Button>
        
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={() => execCommand('insertOrderedList')}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={() => execCommand('insertUnorderedList')}
          title="Bullet List"
        >
          <ListUnordered className="w-4 h-4" />
        </Button>
        
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={() => execCommand('justifyLeft')}
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </Button>
        
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={() => execCommand('justifyCenter')}
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </Button>
        
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={() => execCommand('justifyRight')}
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
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
      
      <div
        ref={editorRef}
        className="min-h-[250px] p-3 bg-portfolio-navy border border-portfolio-lightestNavy rounded-b-md text-portfolio-lightSlate focus:outline-none"
        contentEditable={true}
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={handleEditorChange}
        style={{ overflowY: 'auto' }}
      />
      
      <div className="text-sm text-portfolio-slate">
        <p>Use the toolbar above to format your text and insert images.</p>
        <p>You can also use keyboard shortcuts: Ctrl+B (bold), Ctrl+I (italic), Ctrl+U (underline).</p>
      </div>
    </div>
  );
};

export default RichTextEditor;
