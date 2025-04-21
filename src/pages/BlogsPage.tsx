
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import BlogCard from '@/components/cards/BlogCard';
import { blogsData } from '@/data/mockData';
import { Search } from 'lucide-react';

const BlogsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Get all unique tags
  const allTags = Array.from(
    new Set(blogsData.flatMap(blog => blog.tags))
  );
  
  // Filter blogs based on search term and selected tag
  const filteredBlogs = blogsData.filter(blog => {
    const matchesSearch = !searchTerm || 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = !selectedTag || blog.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  return (
    <Layout>
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="hero-heading mb-4">Blog</h1>
            <p className="text-lg text-portfolio-slate max-w-2xl mx-auto">
              Thoughts, tutorials, and insights on programming, computer science, and career development.
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="mb-12 flex flex-col md:flex-row gap-6 justify-between">
            {/* Search */}
            <div className="relative w-full md:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-portfolio-slate" />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-portfolio-navy border border-portfolio-lightestNavy rounded-md text-portfolio-lightSlate focus:outline-none focus:ring-2 focus:ring-portfolio-cyan/50 focus:border-transparent"
              />
            </div>
            
            {/* Tag Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`tag ${!selectedTag ? 'bg-portfolio-cyan text-portfolio-navy' : ''}`}
              >
                All
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`tag ${selectedTag === tag ? 'bg-portfolio-cyan text-portfolio-navy' : ''}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          {/* Blog Grid */}
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map(blog => (
                <BlogCard key={blog.id} {...blog} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl text-portfolio-lightestSlate mb-2">No articles found</h3>
              <p className="text-portfolio-slate">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default BlogsPage;
