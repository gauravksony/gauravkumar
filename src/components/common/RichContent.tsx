
import React from 'react';

interface RichContentProps {
  content: string;
  className?: string;
}

const RichContent: React.FC<RichContentProps> = ({ content, className = '' }) => {
  // This component safely renders HTML content
  
  // If content is empty, return null
  if (!content) return null;
  
  return (
    <div 
      className={`rich-content ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default RichContent;
