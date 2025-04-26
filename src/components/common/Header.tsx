import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Github, Linkedin, Instagram, Youtube } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // This function checks if the current path matches the nav link path
  const isActive = (path: string) => {
    // Check if it's the home page
    if (path === "/" && location.pathname === "/") {
      return true;
    }
    // For other pages, check if the pathname starts with the path (to match nested routes)
    // For example, /blogs/123 should highlight the Blogs link
    return path !== "/" && location.pathname.startsWith(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/blogs" },
    { name: "Study Material", path: "/study-material" },
    { name: "Projects", path: "/projects" },
    { name: "Experience", path: "/experience" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 px-6 md:px-12 
      ${
        isScrolled
          ? "bg-portfolio-navy/90 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-portfolio-cyan font-mono text-xl font-bold"
        >
          Portfolio<span className="text-portfolio-white">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6">
            {navLinks.map((link, index) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`nav-link font-medium ${
                    isActive(link.path) ? "active-nav-link" : ""
                  }`}
                >
                  <span className="text-portfolio-cyan font-mono mr-1"></span>{" "}
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Icons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="https://github.com/gauravkumarsony"
            target="_blank"
            rel="noopener noreferrer"
            className="text-portfolio-lightSlate hover:text-portfolio-cyan transition-colors"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-portfolio-lightSlate hover:text-portfolio-cyan transition-colors"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-portfolio-lightSlate hover:text-portfolio-cyan transition-colors"
          >
            <Youtube size={20} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-portfolio-lightSlate hover:text-portfolio-cyan transition-colors"
          >
            <Instagram size={20} />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-portfolio-lightSlate hover:text-portfolio-cyan"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed top-[4rem] right-0 h-screen w-3/4 bg-portfolio-lightNavy/95 backdrop-blur-lg z-50 py-8 px-6 animate-slide-in-right">
            <nav className="flex flex-col items-center">
              <ul className="flex flex-col space-y-6 w-full">
                {navLinks.map((link, index) => (
                  <li key={link.name} className="text-center">
                    <Link
                      to={link.path}
                      className={`text-portfolio-lightSlate hover:text-portfolio-cyan font-medium transition-colors block py-2 ${
                        isActive(link.path) ? "text-portfolio-cyan" : ""
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="text-portfolio-cyan font-mono mr-1 block text-sm"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Social Icons - Mobile */}
              <div className="flex items-center space-x-6 mt-12">
                <a
                  href="https://github.com/gauravkumarsony"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-portfolio-lightSlate hover:text-portfolio-cyan transition-colors"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-portfolio-lightSlate hover:text-portfolio-cyan transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-portfolio-lightSlate hover:text-portfolio-cyan transition-colors"
                >
                  <Youtube size={20} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-portfolio-lightSlate hover:text-portfolio-cyan transition-colors"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
