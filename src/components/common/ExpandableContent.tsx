import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExpandableContentProps {
  content: string;
  maxHeight?: number;
  excerpt?: string;
  className?: string;
}

const ExpandableContent = ({
  content,
  maxHeight = 300,
  excerpt,
  className = "",
}: ExpandableContentProps) => {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleExpand = () => {
    setExpanded(!expanded);

    // If collapsing, scroll smoothly to the top of the content
    if (expanded) {
      window.scrollTo({
        top: window.scrollY - 200,
        behavior: "smooth",
      });
    }
  };

  // Prevent content flash on initial load
  useEffect(() => {
    document.body.style.overflow = expanded ? "auto" : "visible";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [expanded]);

  return (
    <div className={`${className} relative`}>
      {/* Container with conditional height */}
      <div
        className="transition-all duration-700 ease-in-out relative"
        style={{
          maxHeight: expanded ? "100000px" : "80vh", // Show only 1/3 of viewport height when collapsed
          overflow: expanded ? "visible" : "hidden",
        }}
      >
        <div className="relative" ref={contentRef}>
          {/* Full content as HTML */}
          <div
            className="prose prose-lg prose-invert prose-cyan max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        {/* Fade out effect at bottom when not expanded */}
        {!expanded && (
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-portfolio-navy via-portfolio-navy/80 to-transparent" />
        )}
      </div>

      {/* Continue Reading button positioned at the cutoff point */}
      <div
        className={
          expanded
            ? "mt-8 flex justify-center"
            : "flex justify-center relative -mt-12"
        }
      >
        <button
          onClick={toggleExpand}
          className="group inline-flex items-center px-6 py-2 rounded-md border border-portfolio-cyan text-portfolio-cyan hover:bg-portfolio-cyan/10 transition-all duration-300 bg-portfolio-navy z-10"
        >
          <span className="font-medium">
            {expanded ? "Show Less" : "Continue Reading"}
          </span>
          {expanded ? (
            <ChevronUp
              size={18}
              className="ml-2 group-hover:transform group-hover:-translate-y-1 transition-transform duration-300"
            />
          ) : (
            <ChevronDown
              size={18}
              className="ml-2 group-hover:transform group-hover:translate-y-1 transition-transform duration-300"
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default ExpandableContent;
