
import { Search } from 'lucide-react';

interface SearchStudyMaterialsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchStudyMaterials = ({ searchTerm, onSearchChange }: SearchStudyMaterialsProps) => {
  return (
    <div className="relative max-w-xl mx-auto">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search size={18} className="text-portfolio-slate" />
      </div>
      <input
        type="text"
        placeholder="Search study materials..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-3 py-2 bg-portfolio-navy border border-portfolio-lightestNavy rounded-md text-portfolio-lightSlate focus:outline-none focus:ring-2 focus:ring-portfolio-cyan/50 focus:border-transparent"
      />
    </div>
  );
};

export default SearchStudyMaterials;
