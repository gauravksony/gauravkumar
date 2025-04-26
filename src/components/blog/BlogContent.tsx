
import RichContent from '@/components/common/RichContent';

interface BlogContentProps {
  content: string;
  featuredImage?: string;
  title: string;
}

const BlogContent = ({ content, featuredImage, title }: BlogContentProps) => {
  return (
    <>
      {featuredImage && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <img 
            src={featuredImage} 
            alt={title}
            className="w-full h-auto"
          />
        </div>
      )}
      
      <div className="prose prose-lg prose-invert prose-cyan max-w-none">
        <RichContent 
          content={content} 
          className="text-portfolio-slate"
        />
      </div>
    </>
  );
};

export default BlogContent;
