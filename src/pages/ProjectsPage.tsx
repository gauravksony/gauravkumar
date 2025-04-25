
import { useState, useEffect } from 'react';
import Layout from '@/components/common/Layout';
import ProjectCard from '@/components/cards/ProjectCard';
import { supabase } from '@/integrations/supabase/client';
import { Search } from 'lucide-react';

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Get all unique tech
  const allTech = Array.from(
    new Set(projects.flatMap(project => project.technologies))
  );
  
  // Filter projects based on search term, selected tech, and featured status
  const filteredProjects = projects.filter(project => {
    const matchesSearch = !searchTerm || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTech = !selectedTech || project.technologies.includes(selectedTech);
    const matchesFeatured = !showFeaturedOnly || project.featured;
    
    return matchesSearch && matchesTech && matchesFeatured;
  });

  return (
    <Layout>
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="hero-heading mb-4">Projects</h1>
            <p className="text-lg text-portfolio-slate max-w-2xl mx-auto">
              A showcase of my technical projects, demonstrating my skills in web development, machine learning, and more.
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="mb-12 flex flex-col md:flex-row gap-6 justify-between">
            {/* Search */}
            <div className="relative w-full md:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-portfolio-slate" />
              </div>
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-portfolio-navy border border-portfolio-lightestNavy rounded-md text-portfolio-lightSlate focus:outline-none focus:ring-2 focus:ring-portfolio-cyan/50 focus:border-transparent"
              />
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              {/* Featured Filter */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={showFeaturedOnly}
                  onChange={() => setShowFeaturedOnly(!showFeaturedOnly)}
                  className="h-4 w-4 bg-portfolio-navy border-portfolio-lightestNavy text-portfolio-cyan focus:ring-portfolio-cyan/25 rounded"
                />
                <label htmlFor="featured" className="ml-2 text-portfolio-lightSlate">
                  Featured Only
                </label>
              </div>
              
              {/* Tech Filter Dropdown */}
              <div>
                <select
                  value={selectedTech || ''}
                  onChange={(e) => setSelectedTech(e.target.value || null)}
                  className="px-3 py-2 bg-portfolio-navy border border-portfolio-lightestNavy rounded-md text-portfolio-lightSlate focus:outline-none focus:ring-2 focus:ring-portfolio-cyan/50 focus:border-transparent"
                >
                  <option value="">All Technologies</option>
                  {allTech.map(tech => (
                    <option key={tech} value={tech}>{tech}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Projects Grid */}
          {loading ? (
            <div className="text-center py-12">
              <h3 className="text-xl text-portfolio-lightestSlate mb-2">Loading projects...</h3>
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map(project => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl text-portfolio-lightestSlate mb-2">No projects found</h3>
              <p className="text-portfolio-slate">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ProjectsPage;
