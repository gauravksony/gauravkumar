
import { useState, useRef, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
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
  const quillRef = useRef<ReactQuill>(null);
  
  function handleImageButtonClick() {
    fileInputRef.current?.click();
  }
  
  // Quill modules configuration
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['blockquote', 'code-block'],
        ['clean']
      ],
      handlers: {
        image: handleImageButtonClick
      }
    },
    clipboard: {
      matchVisual: false,
    }
  }), []);

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'color', 'background',
    'align', 'script',
    'direction', 'code-block'
  ];
  
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
      
      // Insert image into Quill editor
      const quill = quillRef.current?.getEditor();
      if (quill) {
        const range = quill.getSelection();
        const index = range ? range.index : quill.getLength();
        quill.insertEmbed(index, 'image', publicUrl);
        quill.setSelection(index + 1, 0);
      }
      
      toast.success('Image inserted successfully');
    } catch (error: any) {
      toast.error('Failed to upload image: ' + error.message);
    } finally {
      setLoading(false);
    }
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
      
      <div className="rich-text-editor">
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder="Write your content here..."
          style={{
            backgroundColor: 'hsl(var(--portfolio-navy))',
            color: 'hsl(var(--portfolio-lightSlate))',
            minHeight: '250px',
          }}
        />
      </div>
      
      <div className="text-sm text-portfolio-slate">
        <p>Use the toolbar above for rich formatting including bold, italic, headings, colors, and more.</p>
        <p>You can also insert images using the image button in the toolbar or the button above.</p>
      </div>
    </div>
  );
};

export default RichTextEditor;
