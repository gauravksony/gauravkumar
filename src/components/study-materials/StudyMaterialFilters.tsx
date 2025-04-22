
import { FileText, BookOpen, Youtube, Link as LinkIcon } from 'lucide-react';
import { ResourceType } from '../cards/ResourceCard';

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
        <h3 className="text-sm font-medium text-portfolio-lightestSlate mb-3">Category</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange(null)}
            className={`tag ${!selectedCategory ? 'bg-portfolio-cyan text-portfolio-navy' : ''}`}
          >
            All
          </button>
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`tag ${selectedCategory === category ? 'bg-portfolio-cyan text-portfolio-navy' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Type Filter */}
      <div>
        <h3 className="text-sm font-medium text-portfolio-lightestSlate mb-3">Resource Type</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onTypeChange(null)}
            className={`tag ${!selectedType ? 'bg-portfolio-cyan text-portfolio-navy' : ''}`}
          >
            <LinkIcon size={14} className="mr-1" />
            All
          </button>
          <button
            onClick={() => onTypeChange('pdf')}
            className={`tag ${selectedType === 'pdf' ? 'bg-portfolio-cyan text-portfolio-navy' : ''}`}
          >
            <FileText size={14} className="mr-1" />
            PDF
          </button>
          <button
            onClick={() => onTypeChange('video')}
            className={`tag ${selectedType === 'video' ? 'bg-portfolio-cyan text-portfolio-navy' : ''}`}
          >
            <Youtube size={14} className="mr-1" />
            Video
          </button>
          <button
            onClick={() => onTypeChange('link')}
            className={`tag ${selectedType === 'link' ? 'bg-portfolio-cyan text-portfolio-navy' : ''}`}
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
