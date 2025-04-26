
import React from 'react';

interface RichContentProps {
  content: string;
  className?: string;
}

const RichContent: React.FC<RichContentProps> = ({ content, className = '' }) => {
  // If content is empty, return null
  if (!content) return null;
  
  return (
    <div 
      className={`rich-content prose prose-invert prose-cyan max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default RichContent;
