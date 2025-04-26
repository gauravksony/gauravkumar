
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2, Twitter, Facebook, Linkedin } from 'lucide-react';

interface BlogHeaderProps {
  title: string;
  date: string;
  readTime: string;
  tags: string[];
}

const BlogHeader = ({ title, date, readTime, tags }: BlogHeaderProps) => {
  return (
    <header className="mb-12">
      <Link to="/blogs" className="inline-flex items-center text-portfolio-cyan hover:underline mb-8">
        <ArrowLeft size={18} className="mr-2" />
        Back to all articles
      </Link>
      
      <h1 className="hero-heading mb-4">{title}</h1>
      
      <div className="flex flex-wrap items-center text-portfolio-slate mb-6">
        <div className="flex items-center mr-6 mb-2">
          <Calendar size={16} className="mr-2 text-portfolio-cyan" />
          <span>{date}</span>
        </div>
        <div className="flex items-center mb-2">
          <Clock size={16} className="mr-2 text-portfolio-cyan" />
          <span>{readTime}</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map(tag => (
          <Link to={`/blogs?tag=${tag}`} key={tag} className="tag">
            {tag}
          </Link>
        ))}
      </div>
      
      <div className="flex items-center">
        <span className="text-portfolio-lightSlate mr-4">Share:</span>
        <div className="flex items-center space-x-3">
          <a href={`https://twitter.com/intent/tweet?text=${title}&url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="text-portfolio-slate hover:text-portfolio-cyan transition-colors">
            <Twitter size={18} />
          </a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="text-portfolio-slate hover:text-portfolio-cyan transition-colors">
            <Facebook size={18} />
          </a>
          <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${title}`} target="_blank" rel="noopener noreferrer" className="text-portfolio-slate hover:text-portfolio-cyan transition-colors">
            <Linkedin size={18} />
          </a>
          <button 
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="text-portfolio-slate hover:text-portfolio-cyan transition-colors"
            title="Copy link"
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default BlogHeader;
