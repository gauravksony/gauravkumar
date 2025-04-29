import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Instagram,
  Youtube,
  SunIcon,
  MoonIcon,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        mobileMenuButtonRef.current &&
        !mobileMenuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 py-4 px-6 md:px-12 
      ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/95 backdrop-blur-md shadow-rich-sm border-b border-modern-border/30 dark:border-gray-800/50 translate-y-0"
          : "bg-transparent translate-y-0"
      } ${isScrolled ? "animate-slide-down" : ""}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-modern-primary font-outfit text-xl font-bold relative group"
        >
          <span className="relative z-10 text-gradient dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400">
            gkdev<span className="text-modern-text dark:text-white">.</span>
          </span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-modern-primary to-modern-accent dark:from-blue-400 dark:to-purple-400 rounded-full group-hover:w-full transition-all duration-300"></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          <ul className="flex space-x-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`nav-link font-medium ${
                    isActive(link.path) ? "active-nav-link" : ""
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Icons and Theme Toggle - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-6">
              <div className="flex gap-4">
                {/* Social Media Links */}
                <a
                  href="https://youtube.com/@gauravksony"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-foreground transition-colors dark:text-gray-300 dark:hover:text-white transform hover:scale-110 hover:rotate-3 transition-transform duration-300"
                  aria-label="YouTube"
                >
                  <Youtube size={20} className="hover:animate-pulse" />
                </a>
                <a
                  href="https://github.com/gauravkumarsony"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-foreground transition-colors dark:text-gray-300 dark:hover:text-white transform hover:scale-110 hover:rotate-3 transition-transform duration-300"
                  aria-label="GitHub"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="hover:animate-pulse"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/gauravksony"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-foreground transition-colors dark:text-gray-300 dark:hover:text-white transform hover:scale-110 hover:rotate-3 transition-transform duration-300"
                  aria-label="LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="hover:animate-pulse"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={toggleTheme}
                      className="flex items-center justify-center h-9 w-9 rounded-md bg-secondary hover:bg-secondary/80 transition-colors dark:bg-gray-800 dark:hover:bg-gray-700"
                      aria-label={
                        theme === "light"
                          ? "Switch to dark mode"
                          : "Switch to light mode"
                      }
                    >
                      {theme === "light" ? (
                        <MoonIcon className="h-5 w-5 text-foreground" />
                      ) : (
                        <SunIcon className="h-5 w-5 text-gray-200" />
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {theme === "light"
                      ? "Switch to dark mode"
                      : "Switch to light mode"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button and Theme Toggle */}
        <div className="md:hidden flex items-center gap-3">
          {/* Theme Toggle Button - Mobile */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center h-9 w-9 rounded-md bg-secondary hover:bg-secondary/80 transition-colors dark:bg-gray-800 dark:hover:bg-gray-700"
                  aria-label={
                    theme === "light"
                      ? "Switch to dark mode"
                      : "Switch to light mode"
                  }
                >
                  {theme === "light" ? (
                    <MoonIcon className="h-5 w-5 text-foreground" />
                  ) : (
                    <SunIcon className="h-5 w-5 text-gray-200" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                {theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Menu Button */}
          <button
            className="text-modern-text dark:text-gray-300 hover:text-modern-primary dark:hover:text-white bg-modern-surface/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 rounded-full shadow-neo-sm active:scale-95 transition-transform"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            ref={mobileMenuButtonRef}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className={`md:hidden fixed top-[4rem] right-0 h-screen w-3/4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-depth z-50 py-8 px-6 transition-all duration-300 ease-in-out border-l border-modern-border dark:border-gray-800 transform ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex flex-col items-center">
            <ul className="flex flex-col space-y-6 w-full">
              {navLinks.map((link) => (
                <li key={link.name} className="text-center">
                  <Link
                    to={link.path}
                    className={`text-modern-text dark:text-gray-300 hover:text-modern-primary dark:hover:text-white font-medium transition-colors block py-2 ${
                      isActive(link.path)
                        ? "text-modern-primary dark:text-blue-400"
                        : ""
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
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
                className="text-modern-text dark:text-gray-300 hover:text-modern-primary dark:hover:text-white transition-colors p-2 rounded-full"
              >
                <Github
                  size={20}
                  className="hover:animate-spin-slow"
                  style={{ animationDuration: "8s" }}
                />
              </a>
              <a
                href="https://linkedin.com/in/gauravksony"
                target="_blank"
                rel="noopener noreferrer"
                className="text-modern-text dark:text-gray-300 hover:text-modern-primary dark:hover:text-white transition-colors p-2 rounded-full"
              >
                <Linkedin
                  size={20}
                  className="hover:animate-spin-slow"
                  style={{ animationDuration: "8s" }}
                />
              </a>
              <a
                href="https://youtube.com/@gauravksony"
                target="_blank"
                rel="noopener noreferrer"
                className="text-modern-text dark:text-gray-300 hover:text-modern-primary dark:hover:text-white transition-colors p-2 rounded-full"
              >
                <Youtube
                  size={20}
                  className="hover:animate-spin-slow"
                  style={{ animationDuration: "8s" }}
                />
              </a>
              <a
                href="https://instagram.com/gauravksony"
                target="_blank"
                rel="noopener noreferrer"
                className="text-modern-text dark:text-gray-300 hover:text-modern-primary dark:hover:text-white transition-colors p-2 rounded-full"
              >
                <Instagram
                  size={20}
                  className="hover:animate-spin-slow"
                  style={{ animationDuration: "8s" }}
                />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
