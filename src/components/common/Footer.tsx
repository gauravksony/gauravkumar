import {
  Github,
  Linkedin,
  Instagram,
  Youtube,
  Mail,
  Phone,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-modern-surface/80 dark:bg-gray-800/80 py-16 px-6 md:px-12 border-t border-modern-border/30 dark:border-gray-700/30 overflow-hidden">
      {/* Background Elements */}
      <div
        className="absolute inset-0 diagonal-lines-bg opacity-50 dark:opacity-20"
        aria-hidden="true"
      ></div>
      <div
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-modern-primary via-modern-accent to-modern-highlight dark:from-blue-500 dark:via-cyan-500 dark:to-purple-500"
        aria-hidden="true"
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* About */}
          <div className="float-element md:col-span-5">
            <h3 className="text-xl font-bold text-modern-text dark:text-gray-200 mb-4 pb-2 relative font-outfit">
              About
              <span className="absolute -bottom-0.5 left-0 w-12 h-1 bg-gradient-to-r from-modern-primary to-modern-accent dark:from-blue-500 dark:to-purple-500 rounded-full"></span>
            </h3>
            <p className="text-modern-textLight dark:text-gray-300 mb-5 max-w-md">
              A portfolio showcasing my skills, projects, blog posts, and study
              materials for computer science and programming.
            </p>
            <div className="flex space-x-5 mb-8">
              <a
                href="https://github.com/gauravkumarsony"
                target="_blank"
                rel="noopener noreferrer"
                className="text-modern-text dark:text-gray-300 hover:text-modern-primary dark:hover:text-blue-400 transition-colors transform hover:scale-110 bg-white dark:bg-gray-700 p-2.5 rounded-full shadow-sm hover:shadow-rich-sm"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com/in/gauravksony/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-modern-text dark:text-gray-300 hover:text-modern-primary dark:hover:text-blue-400 transition-colors transform hover:scale-110 bg-white dark:bg-gray-700 p-2.5 rounded-full shadow-sm hover:shadow-rich-sm"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://youtube.com/@gauravksony"
                target="_blank"
                rel="noopener noreferrer"
                className="text-modern-text dark:text-gray-300 hover:text-modern-primary dark:hover:text-blue-400 transition-colors transform hover:scale-110 bg-white dark:bg-gray-700 p-2.5 rounded-full shadow-sm hover:shadow-rich-sm"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
              <a
                href="https://instagram.com/gauravksony"
                target="_blank"
                rel="noopener noreferrer"
                className="text-modern-text dark:text-gray-300 hover:text-modern-primary dark:hover:text-blue-400 transition-colors transform hover:scale-110 bg-white dark:bg-gray-700 p-2.5 rounded-full shadow-sm hover:shadow-rich-sm"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="float-element md:col-span-3">
            <h3 className="text-xl font-bold text-modern-text dark:text-gray-200 mb-4 pb-2 relative font-outfit">
              Quick Links
              <span className="absolute -bottom-0.5 left-0 w-12 h-1 bg-gradient-to-r from-modern-primary to-modern-accent dark:from-blue-500 dark:to-purple-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-modern-textLight dark:text-gray-300 hover:text-modern-primary dark:hover:text-blue-400 transition-colors group flex items-center bg-white/50 dark:bg-gray-700/70 hover:bg-white dark:hover:bg-gray-700 rounded-md p-2 hover:shadow-sm"
                >
                  <ChevronRight
                    size={16}
                    className="mr-2 text-modern-primary dark:text-blue-400 transform group-hover:translate-x-1 transition-transform"
                  />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="text-modern-textLight dark:text-gray-300 hover:text-modern-primary dark:hover:text-blue-400 transition-colors group flex items-center bg-white/50 dark:bg-gray-700/70 hover:bg-white dark:hover:bg-gray-700 rounded-md p-2 hover:shadow-sm"
                >
                  <ChevronRight
                    size={16}
                    className="mr-2 text-modern-primary dark:text-blue-400 transform group-hover:translate-x-1 transition-transform"
                  />
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  to="/study-material"
                  className="text-modern-textLight dark:text-gray-300 hover:text-modern-primary dark:hover:text-blue-400 transition-colors group flex items-center bg-white/50 dark:bg-gray-700/70 hover:bg-white dark:hover:bg-gray-700 rounded-md p-2 hover:shadow-sm"
                >
                  <ChevronRight
                    size={16}
                    className="mr-2 text-modern-primary dark:text-blue-400 transform group-hover:translate-x-1 transition-transform"
                  />
                  Study Material
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-modern-textLight dark:text-gray-300 hover:text-modern-primary dark:hover:text-blue-400 transition-colors group flex items-center bg-white/50 dark:bg-gray-700/70 hover:bg-white dark:hover:bg-gray-700 rounded-md p-2 hover:shadow-sm"
                >
                  <ChevronRight
                    size={16}
                    className="mr-2 text-modern-primary dark:text-blue-400 transform group-hover:translate-x-1 transition-transform"
                  />
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/experience"
                  className="text-modern-textLight dark:text-gray-300 hover:text-modern-primary dark:hover:text-blue-400 transition-colors group flex items-center bg-white/50 dark:bg-gray-700/70 hover:bg-white dark:hover:bg-gray-700 rounded-md p-2 hover:shadow-sm"
                >
                  <ChevronRight
                    size={16}
                    className="mr-2 text-modern-primary dark:text-blue-400 transform group-hover:translate-x-1 transition-transform"
                  />
                  Experience
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-modern-textLight dark:text-gray-300 hover:text-modern-primary dark:hover:text-blue-400 transition-colors group flex items-center bg-white/50 dark:bg-gray-700/70 hover:bg-white dark:hover:bg-gray-700 rounded-md p-2 hover:shadow-sm"
                >
                  <ChevronRight
                    size={16}
                    className="mr-2 text-modern-primary dark:text-blue-400 transform group-hover:translate-x-1 transition-transform"
                  />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="float-element md:col-span-4">
            <h3 className="text-xl font-bold text-modern-text dark:text-gray-200 mb-4 pb-2 relative font-outfit">
              Contact
              <span className="absolute -bottom-0.5 left-0 w-12 h-1 bg-gradient-to-r from-modern-primary to-modern-accent dark:from-blue-500 dark:to-purple-500 rounded-full"></span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center text-modern-textLight dark:text-gray-300 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm hover:shadow-rich-sm transition-shadow border border-modern-border dark:border-gray-600">
                <div className="mr-3 bg-modern-primaryLight dark:bg-blue-900/50 p-2 rounded-full">
                  <Mail
                    size={16}
                    className="text-modern-primary dark:text-blue-400"
                  />
                </div>
                <a
                  href="mailto:gauravkumar.byte@gmail.com"
                  className="hover:text-modern-primary dark:hover:text-blue-400 transition-colors"
                >
                  gauravkumar.byte@gmail.com
                </a>
              </div>
              <div className="flex items-center text-modern-textLight dark:text-gray-300 bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm hover:shadow-rich-sm transition-shadow border border-modern-border dark:border-gray-600">
                <div className="mr-3 bg-modern-primaryLight dark:bg-blue-900/50 p-2 rounded-full">
                  <Phone
                    size={16}
                    className="text-modern-primary dark:text-blue-400"
                  />
                </div>
                <a
                  href="tel:+917999617868"
                  className="hover:text-modern-primary dark:hover:text-blue-400 transition-colors"
                >
                  (+91) 7999617868
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-modern-border/30 dark:border-gray-700/30 mt-12 pt-8 text-center">
          <p className="text-modern-textLight dark:text-gray-400">
            © {currentYear} By Gaurav Kumar. All rights reserved.
          </p>
          <p className="mt-2 text-sm flex items-center justify-center">
            <span className="dark:text-gray-400">Built with</span>
            <span className="text-modern-primary dark:text-blue-400 mx-1">
              ❤️
            </span>
            <span className="dark:text-gray-400">
              using React & TailwindCSS
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
