
import { Github, Linkedin, Instagram, Youtube, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-portfolio-lightNavy py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold text-portfolio-lightestSlate mb-4">
              About
            </h3>
            <p className="text-portfolio-slate mb-4">
              A portfolio showcasing my skills, projects, blog posts, and study
              materials for computer science and programming.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/gauravkumarsony"
                target="_blank"
                rel="noopener noreferrer"
                className="text-portfolio-lightSlate hover:text-portfolio-cyan transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/gauravksony/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-portfolio-lightSlate hover:text-portfolio-cyan transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://youtube.com/@gauravksony"
                target="_blank"
                rel="noopener noreferrer"
                className="text-portfolio-lightSlate hover:text-portfolio-cyan transition-colors"
              >
                <Youtube size={20} />
              </a>
              <a
                href="https://instagram.com/gauravksony"
                target="_blank"
                rel="noopener noreferrer"
                className="text-portfolio-lightSlate hover:text-portfolio-cyan transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-portfolio-lightestSlate mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-portfolio-slate hover:text-portfolio-cyan transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="text-portfolio-slate hover:text-portfolio-cyan transition-colors"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  to="/study-material"
                  className="text-portfolio-slate hover:text-portfolio-cyan transition-colors"
                >
                  Study Material
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-portfolio-slate hover:text-portfolio-cyan transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/experience"
                  className="text-portfolio-slate hover:text-portfolio-cyan transition-colors"
                >
                  Experience
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-portfolio-slate hover:text-portfolio-cyan transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold text-portfolio-lightestSlate mb-4">
              Contact
            </h3>
            <div className="space-y-2">
              <div className="flex items-center text-portfolio-slate">
                <Mail size={16} className="mr-2 text-portfolio-cyan" />
                <a
                  href="mailto:gauravkumar.byte@gmail.com"
                  className="hover:text-portfolio-cyan transition-colors"
                >
                  gauravkumar.byte@gmail.com
                </a>
              </div>
              <div className="flex items-center text-portfolio-slate">
                <Phone size={16} className="mr-2 text-portfolio-cyan" />
                <a
                  href="tel:+917999617868"
                  className="hover:text-portfolio-cyan transition-colors"
                >
                  (+91) 7999617868
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-portfolio-lightestNavy mt-10 pt-6 text-center text-portfolio-slate">
          <p>© {currentYear} By Gaurav Kumar. All rights reserved.</p>
          <p className="mt-1 text-sm">Built with React, TailwindCSS and ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
