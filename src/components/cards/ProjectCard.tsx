import { Github, ExternalLink } from "lucide-react";
import { THUMBNAIL_DIMENSIONS } from "@/lib/imageUtils";

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
  image_url, // Updated to match Supabase field name
}) => {
  return (
    <div className="card group overflow-hidden flex flex-col h-full">
      {/* Project Image */}
      {image_url && (
        <div
          className="w-full overflow-hidden rounded-md mb-4"
          style={{ aspectRatio: `${THUMBNAIL_DIMENSIONS.project.aspectRatio}` }}
        >
          <img
            src={image_url}
            alt={title}
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
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
            <span key={tech} className="tag font-mono">
              {tech}
            </span>
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
            className="project-link code-link flex items-center relative overflow-hidden group/link"
            aria-label={`View code for ${title}`}
          >
            <span className="project-link-icon-wrapper code-icon">
              <Github size={18} className="project-link-icon" />
            </span>
            <span className="project-link-text">Code</span>
            <span className="project-link-hover-effect"></span>
          </a>
        )}

        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link demo-link flex items-center relative overflow-hidden group/link"
            aria-label={`View live demo for ${title}`}
          >
            <span className="project-link-icon-wrapper demo-icon">
              <ExternalLink size={18} className="project-link-icon" />
            </span>
            <span className="project-link-text">Live Demo</span>
            <span className="project-link-hover-effect"></span>
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
