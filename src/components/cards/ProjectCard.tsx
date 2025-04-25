
import { Github, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image_url?: string; // Updated to match Supabase field name
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  githubUrl,
  liveUrl,
  image_url // Updated to match Supabase field name
}) => {
  return (
    <div className="card group overflow-hidden flex flex-col h-full">
      {/* Project Image */}
      {image_url && (
        <div className="w-full h-48 overflow-hidden rounded-md mb-4">
          <img 
            src={image_url} 
            alt={title} 
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      
      {/* Project Content */}
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-portfolio-lightestSlate mb-2 group-hover:text-portfolio-cyan transition-colors">
          {title}
        </h3>
        
        <p className="text-portfolio-slate mb-4">{description}</p>
        
        {/* Tech Stack */}
        <div className="mb-4">
          {technologies.map((tech) => (
            <span key={tech} className="tag font-mono">{tech}</span>
          ))}
        </div>
      </div>
      
      {/* Links */}
      <div className="flex space-x-4 mt-2">
        {githubUrl && (
          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-portfolio-lightSlate hover:text-portfolio-cyan transition-colors flex items-center"
          >
            <Github size={18} className="mr-1" />
            <span>Code</span>
          </a>
        )}
        
        {liveUrl && (
          <a 
            href={liveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-portfolio-lightSlate hover:text-portfolio-cyan transition-colors flex items-center"
          >
            <ExternalLink size={18} className="mr-1" />
            <span>Live Demo</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
