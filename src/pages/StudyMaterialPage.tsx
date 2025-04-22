
import { useState, useEffect } from 'react';
import Layout from '@/components/common/Layout';
import ResourceCard, { ResourceType } from '@/components/cards/ResourceCard';
import { Search, FileText, BookOpen, Youtube, Link as LinkIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  category: string;
  date: string;
  url: string;
  upload_date: string;
}

const StudyMaterialPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<ResourceType | null>(null);
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  
  useEffect(() => {
    fetchMaterials();
  }, []);
  
  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('study_materials')
        .select('*')
        .order('upload_date', { ascending: false });
      
      if (error) throw error;
      
      // Transform the data to match the ResourceCard component props
      const formattedMaterials = data.map((material: any) => ({
        id: material.id,
        title: material.title,
        description: material.description || '',
        // Determine the type based on the file_url extension or default to 'link'
        type: material.file_url ? 
          (material.file_url.endsWith('.pdf') ? 'pdf' as ResourceType : 
          (material.file_url.includes('youtube') ? 'video' as ResourceType : 'link' as ResourceType)) 
          : 'link' as ResourceType,
        category: material.category,
        date: new Date(material.upload_date).toLocaleDateString(),
        url: material.file_url || '#',
        upload_date: material.upload_date
      }));
      
      setMaterials(formattedMaterials);
      
      // Extract all unique categories
      const categories = Array.from(
        new Set(formattedMaterials.map(material => material.category))
      );
      setAllCategories(categories);
      
    } catch (error: any) {
      console.error('Error fetching study materials:', error);
      toast.error('Failed to load study materials');
    } finally {
      setLoading(false);
    }
  };
  
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
            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-portfolio-slate" />
              </div>
              <input
                type="text"
                placeholder="Search study materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-portfolio-navy border border-portfolio-lightestNavy rounded-md text-portfolio-lightSlate focus:outline-none focus:ring-2 focus:ring-portfolio-cyan/50 focus:border-transparent"
              />
            </div>
            
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              {/* Category Filter */}
              <div>
                <h3 className="text-sm font-medium text-portfolio-lightestSlate mb-3">Category</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`tag ${!selectedCategory ? 'bg-portfolio-cyan text-portfolio-navy' : ''}`}
                  >
                    All
                  </button>
                  {allCategories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
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
                    onClick={() => setSelectedType(null)}
                    className={`tag ${!selectedType ? 'bg-portfolio-cyan text-portfolio-navy' : ''}`}
                  >
                    <LinkIcon size={14} className="mr-1" />
                    All
                  </button>
                  <button
                    onClick={() => setSelectedType('pdf')}
                    className={`tag ${selectedType === 'pdf' ? 'bg-portfolio-cyan text-portfolio-navy' : ''}`}
                  >
                    <FileText size={14} className="mr-1" />
                    PDF
                  </button>
                  <button
                    onClick={() => setSelectedType('video')}
                    className={`tag ${selectedType === 'video' ? 'bg-portfolio-cyan text-portfolio-navy' : ''}`}
                  >
                    <Youtube size={14} className="mr-1" />
                    Video
                  </button>
                  <button
                    onClick={() => setSelectedType('link')}
                    className={`tag ${selectedType === 'link' ? 'bg-portfolio-cyan text-portfolio-navy' : ''}`}
                  >
                    <BookOpen size={14} className="mr-1" />
                    Resource Link
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Materials Grid */}
          {loading ? (
            <div className="text-center py-12">
              <h3 className="text-xl text-portfolio-lightestSlate mb-2">Loading study materials...</h3>
            </div>
          ) : filteredMaterials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMaterials.map(material => (
                <ResourceCard 
                  key={material.id}
                  title={material.title}
                  description={material.description}
                  type={material.type}
                  category={material.category}
                  date={material.date}
                  url={material.url}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl text-portfolio-lightestSlate mb-2">No resources found</h3>
              <p className="text-portfolio-slate">Try adjusting your search or filter criteria.</p>
            </div>
          )}
          
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
