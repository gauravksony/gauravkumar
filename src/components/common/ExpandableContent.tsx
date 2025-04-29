import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExpandableContentProps {
  content: string;
  maxHeight?: number;
  excerpt?: string;
  className?: string;
  style?: React.CSSProperties;
}

const ExpandableContent = ({
  content,
  maxHeight = 300,
  excerpt,
  className = "",
  style = {},
}: ExpandableContentProps) => {
  const [expanded, setExpanded] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Check if content needs expansion button
  useEffect(() => {
    // Delay checking height to ensure content is rendered
    const timer = setTimeout(() => {
      if (contentRef.current) {
        setShouldRender(contentRef.current.scrollHeight > maxHeight);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [content, maxHeight]);

  const toggleExpand = () => {
    setExpanded(!expanded);

    // If collapsing, scroll smoothly to the top of the content
    if (expanded && contentRef.current) {
      const elementPosition = contentRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 100;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`${className} relative`}>
      {/* Container with conditional height */}
      <div
        className="transition-all duration-700 ease-in-out relative"
        style={{
          maxHeight: expanded ? "none" : `${maxHeight}px`,
          overflow: expanded ? "visible" : "hidden",
        }}
      >
        <div className="relative" ref={contentRef}>
          {/* Full content as HTML */}
          <div
            className="prose prose-lg max-w-none blog-content"
            dangerouslySetInnerHTML={{ __html: content }}
            style={{
              color: "var(--color-text, black)",
              ...style,
            }}
          />
        </div>

        {/* Fade out effect at bottom when not expanded */}
        {!expanded && shouldRender && (
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-portfolio-navy dark:via-portfolio-navy/80 dark:to-transparent" />
        )}
      </div>

      {/* Continue Reading button positioned at the cutoff point */}
      {shouldRender && (
        <div
          className={
            expanded
              ? "mt-8 flex justify-center"
              : "flex justify-center relative -mt-12"
          }
        >
          <button
            onClick={toggleExpand}
            className="group inline-flex items-center px-6 py-2 rounded-md border border-portfolio-cyan text-portfolio-cyan hover:bg-portfolio-cyan/10 transition-all duration-300 bg-white dark:bg-portfolio-navy z-10"
            aria-expanded={expanded}
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
      )}
    </div>
  );
};

export default ExpandableContent;
