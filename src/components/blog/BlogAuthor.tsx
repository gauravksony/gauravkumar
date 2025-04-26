
const BlogAuthor = () => {
  return (
    <div className="border-t border-portfolio-lightestNavy mt-12 pt-12">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img 
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374" 
          alt="Author"
          className="w-24 h-24 rounded-full object-cover border-4 border-portfolio-lightestNavy"
        />
        <div>
          <h3 className="text-xl font-bold text-portfolio-lightestSlate mb-2">John Doe</h3>
          <p className="text-portfolio-slate mb-4">
            Software Engineer & Computer Science Educator with over 5 years of industry experience.
            Passionate about teaching and making complex concepts accessible to everyone.
          </p>
          <div className="flex space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-portfolio-slate hover:text-portfolio-cyan transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-portfolio-slate hover:text-portfolio-cyan transition-colors">
              LinkedIn
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-portfolio-slate hover:text-portfolio-cyan transition-colors">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogAuthor;
