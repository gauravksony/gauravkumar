import { FileText, BookOpen, Youtube, Link as LinkIcon } from "lucide-react";
import { ResourceType } from "../cards/ResourceCard";

interface StudyMaterialFiltersProps {
  selectedCategory: string | null;
  selectedType: ResourceType | null;
  allCategories: string[];
  onCategoryChange: (category: string | null) => void;
  onTypeChange: (type: ResourceType | null) => void;
}

const StudyMaterialFilters = ({
  selectedCategory,
  selectedType,
  allCategories,
  onCategoryChange,
  onTypeChange,
}: StudyMaterialFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center">
      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-medium text-portfolio-lightestSlate mb-3">
          Category
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange(null)}
            className={`tag ${
              !selectedCategory
                ? "bg-portfolio-cyan dark:bg-indigo-600 dark:hover:bg-indigo-500 text-portfolio-navy dark:text-white dark:border-indigo-400 dark:shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                : ""
            }`}
          >
            All
          </button>
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`tag ${
                selectedCategory === category
                  ? "bg-portfolio-cyan dark:bg-indigo-600 dark:hover:bg-indigo-500 text-portfolio-navy dark:text-white dark:border-indigo-400 dark:shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                  : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Type Filter */}
      <div>
        <h3 className="text-sm font-medium text-portfolio-lightestSlate mb-3">
          Resource Type
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onTypeChange(null)}
            className={`tag ${
              !selectedType
                ? "bg-portfolio-cyan dark:bg-indigo-600 dark:hover:bg-indigo-500 text-portfolio-navy dark:text-white dark:border-indigo-400 dark:shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                : ""
            }`}
          >
            <LinkIcon size={14} className="mr-1" />
            All
          </button>
          <button
            onClick={() => onTypeChange("pdf")}
            className={`tag ${
              selectedType === "pdf"
                ? "bg-portfolio-cyan dark:bg-indigo-600 dark:hover:bg-indigo-500 text-portfolio-navy dark:text-white dark:border-indigo-400 dark:shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                : ""
            }`}
          >
            <FileText size={14} className="mr-1" />
            PDF
          </button>
          <button
            onClick={() => onTypeChange("video")}
            className={`tag ${
              selectedType === "video"
                ? "bg-portfolio-cyan dark:bg-indigo-600 dark:hover:bg-indigo-500 text-portfolio-navy dark:text-white dark:border-indigo-400 dark:shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                : ""
            }`}
          >
            <Youtube size={14} className="mr-1" />
            Video
          </button>
          <button
            onClick={() => onTypeChange("link")}
            className={`tag ${
              selectedType === "link"
                ? "bg-portfolio-cyan dark:bg-indigo-600 dark:hover:bg-indigo-500 text-portfolio-navy dark:text-white dark:border-indigo-400 dark:shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                : ""
            }`}
          >
            <BookOpen size={14} className="mr-1" />
            Resource Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyMaterialFilters;
