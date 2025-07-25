import { Download, FileText, ExternalLink, Calendar } from "lucide-react";
import { THUMBNAIL_DIMENSIONS } from "@/lib/imageUtils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type ResourceType = "pdf" | "video" | "link";

export interface ResourceCardProps {
  title: string;
  description: string;
  type: ResourceType;
  category: string;
  date: string;
  url: string;
  thumbnailUrl?: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  type,
  category,
  date,
  url,
  thumbnailUrl,
}) => {
  const getIcon = () => {
    switch (type) {
      case "pdf":
        return <FileText size={20} className="text-portfolio-cyan" />;
      case "video":
        return <ExternalLink size={20} className="text-portfolio-cyan" />;
      case "link":
        return <ExternalLink size={20} className="text-portfolio-cyan" />;
      default:
        return <FileText size={20} className="text-portfolio-cyan" />;
    }
  };

  const getTooltipText = () => {
    switch (type) {
      case "pdf":
        return "PDF Document";
      case "video":
        return "Video Resource";
      case "link":
        return "External Link";
      default:
        return "Resource";
    }
  };

  return (
    <div className="card group h-full flex flex-col">
      {thumbnailUrl && (
        <div
          className="w-full overflow-hidden rounded-md mb-4"
          style={{ aspectRatio: "1" }}
        >
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        {/* Resource Type Icon with Tooltip */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="p-2 bg-portfolio-navy rounded-md cursor-help">
                {getIcon()}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{getTooltipText()}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Category Tag */}
        <span className="tag">{category}</span>
      </div>

      {/* Resource Content */}
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-portfolio-lightestSlate mb-2 group-hover:text-portfolio-cyan transition-colors">
          {title}
        </h3>

        <p className="text-portfolio-slate mb-4">{description}</p>
      </div>

      {/* Resource Footer */}
      <div className="mt-auto">
        <div className="flex items-center text-sm text-portfolio-slate mb-4">
          <Calendar size={14} className="mr-1" />
          <span>Added on {date}</span>
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center ${
            type === "pdf"
              ? "btn-primary"
              : "text-portfolio-cyan hover:underline"
          }`}
        >
          {type === "pdf" ? (
            <>
              <Download size={16} className="mr-2" />
              Download PDF
            </>
          ) : (
            <>
              <ExternalLink size={16} className="mr-2" />
              {type === "video" ? "Watch Video" : "Visit Resource"}
            </>
          )}
        </a>
      </div>
    </div>
  );
};

export default ResourceCard;
