
import { useState } from 'react';
import Layout from '@/components/common/Layout';
import { ResourceType } from '@/components/cards/ResourceCard';
import SearchStudyMaterials from '@/components/study-materials/SearchStudyMaterials';
import StudyMaterialFilters from '@/components/study-materials/StudyMaterialFilters';
import StudyMaterialsGrid from '@/components/study-materials/StudyMaterialsGrid';
import { useStudyMaterials } from '@/hooks/useStudyMaterials';

const StudyMaterialPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<ResourceType | null>(null);
  
  const { materials, loading, allCategories } = useStudyMaterials();
  
  // Filter materials based on search term, category, and type
  const filteredMaterials = materials.filter(material => {
    const matchesSearch = !searchTerm || 
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || material.category === selectedCategory;
    const matchesType = !selectedType || material.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <Layout>
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="hero-heading mb-4">Study Material</h1>
            <p className="text-lg text-portfolio-slate max-w-2xl mx-auto">
              Free resources, lecture notes, and practice problems to help you prepare for exams, interviews, and deepen your understanding of computer science concepts.
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="mb-12 space-y-6">
            <SearchStudyMaterials 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            
            <StudyMaterialFilters
              selectedCategory={selectedCategory}
              selectedType={selectedType}
              allCategories={allCategories}
              onCategoryChange={setSelectedCategory}
              onTypeChange={setSelectedType}
            />
          </div>
          
          {/* Materials Grid */}
          <StudyMaterialsGrid 
            materials={filteredMaterials}
            loading={loading}
          />
          
          {/* Request Resources */}
          <div className="mt-16 p-8 border border-portfolio-lightestNavy rounded-lg bg-portfolio-lightNavy/30 text-center">
            <h3 className="text-xl font-bold text-portfolio-lightestSlate mb-4">Can't find what you're looking for?</h3>
            <p className="text-portfolio-slate mb-6">
              If you'd like to request specific study materials, feel free to contact me with your request.
            </p>
            <a href="/contact" className="btn-primary inline-flex">
              Request Materials
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default StudyMaterialPage;
