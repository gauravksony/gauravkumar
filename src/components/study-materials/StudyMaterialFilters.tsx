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
  // Function to get category-specific styles
  const getCategoryStyles = (category: string | null) => {
    const baseStyles =
      "inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-300 transform hover:scale-105";
    const selectedStyles =
      "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-900";

    if (!category) {
      return `${baseStyles} ${
        !selectedCategory
          ? `${selectedStyles} bg-modern-primary text-white dark:bg-blue-600 dark:text-white ring-blue-400 dark:ring-blue-500`
          : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      }`;
    }

    const categoryColors: Record<string, string> = {
      Programming:
        selectedCategory === category
          ? `${selectedStyles} bg-blue-500 text-white dark:bg-blue-600 ring-blue-400 dark:ring-blue-500`
          : "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-800",
      DSA:
        selectedCategory === category
          ? `${selectedStyles} bg-green-500 text-white dark:bg-green-600 ring-green-400 dark:ring-green-500`
          : "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300 dark:hover:bg-green-800",
      DBMS:
        selectedCategory === category
          ? `${selectedStyles} bg-purple-500 text-white dark:bg-purple-600 ring-purple-400 dark:ring-purple-500`
          : "bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:hover:bg-purple-800",
      OS:
        selectedCategory === category
          ? `${selectedStyles} bg-red-500 text-white dark:bg-red-600 ring-red-400 dark:ring-red-500`
          : "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-800",
      Networking:
        selectedCategory === category
          ? `${selectedStyles} bg-indigo-500 text-white dark:bg-indigo-600 ring-indigo-400 dark:ring-indigo-500`
          : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-300 dark:hover:bg-indigo-800",
      "Web Development":
        selectedCategory === category
          ? `${selectedStyles} bg-yellow-500 text-white dark:bg-yellow-600 ring-yellow-400 dark:ring-yellow-500`
          : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:hover:bg-yellow-800",
      "Mobile Development":
        selectedCategory === category
          ? `${selectedStyles} bg-orange-500 text-white dark:bg-orange-600 ring-orange-400 dark:ring-orange-500`
          : "bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900/50 dark:text-orange-300 dark:hover:bg-orange-800",
      "Machine Learning":
        selectedCategory === category
          ? `${selectedStyles} bg-cyan-500 text-white dark:bg-cyan-600 ring-cyan-400 dark:ring-cyan-500`
          : "bg-cyan-100 text-cyan-700 hover:bg-cyan-200 dark:bg-cyan-900/50 dark:text-cyan-300 dark:hover:bg-cyan-800",
      "Interview Prep":
        selectedCategory === category
          ? `${selectedStyles} bg-pink-500 text-white dark:bg-pink-600 ring-pink-400 dark:ring-pink-500`
          : "bg-pink-100 text-pink-700 hover:bg-pink-200 dark:bg-pink-900/50 dark:text-pink-300 dark:hover:bg-pink-800",
    };

    return `${baseStyles} ${
      categoryColors[category] || categoryColors["Programming"]
    }`;
  };

  // Function to get resource type-specific styles
  const getTypeStyles = (type: ResourceType | null) => {
    const baseStyles =
      "inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-300 transform hover:scale-105";
    const selectedStyles =
      "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-900";

    if (!type) {
      return `${baseStyles} ${
        !selectedType
          ? `${selectedStyles} bg-modern-primary text-white dark:bg-blue-600 dark:text-white ring-blue-400 dark:ring-blue-500`
          : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      }`;
    }

    const typeColors: Record<ResourceType, string> = {
      pdf:
        selectedType === type
          ? `${selectedStyles} bg-red-500 text-white dark:bg-red-600 ring-red-400 dark:ring-red-500`
          : "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-800",
      video:
        selectedType === type
          ? `${selectedStyles} bg-blue-500 text-white dark:bg-blue-600 ring-blue-400 dark:ring-blue-500`
          : "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-800",
      link:
        selectedType === type
          ? `${selectedStyles} bg-green-500 text-white dark:bg-green-600 ring-green-400 dark:ring-green-500`
          : "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300 dark:hover:bg-green-800",
    };

    return `${baseStyles} ${typeColors[type]}`;
  };

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
            className={getCategoryStyles(null)}
          >
            All
          </button>
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={getCategoryStyles(category)}
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
            className={getTypeStyles(null)}
          >
            <LinkIcon size={14} className="mr-1" />
            All
          </button>
          <button
            onClick={() => onTypeChange("pdf")}
            className={getTypeStyles("pdf")}
          >
            <FileText size={14} className="mr-1" />
            PDF
          </button>
          <button
            onClick={() => onTypeChange("video")}
            className={getTypeStyles("video")}
          >
            <Youtube size={14} className="mr-1" />
            Video
          </button>
          <button
            onClick={() => onTypeChange("link")}
            className={getTypeStyles("link")}
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
