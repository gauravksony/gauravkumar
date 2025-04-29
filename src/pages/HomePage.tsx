import { Link } from "react-router-dom";
import Layout from "../components/common/Layout";
import { personalInfo } from "../data/mockData";
import {
  Download,
  Book,
  FileText,
  Code,
  Star,
  Zap,
  Brain,
  Phone,
  Mail,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Card3D from "../components/ui/3d-card";
import { FloatingOrb, GradientBackground } from "../components/ui/3d-shapes";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  // Handle smooth scrolling for anchor links
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
    }
  };

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const { left, top, width, height } =
          heroRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width - 0.5) * 25;
        const y = ((e.clientY - top) / height - 0.5) * 25;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => {
      el.classList.add("opacity-0");
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll(".reveal").forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto parallax-container relative"
      >
        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-modern-accent/10 dark:bg-blue-500/20 filter blur-3xl mix-blend-multiply dark:mix-blend-normal animate-float-slow"></div>
        <div
          className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-modern-highlight/10 dark:bg-purple-500/20 filter blur-3xl mix-blend-multiply dark:mix-blend-normal animate-float-slow"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 relative z-10">
            <div className="absolute -left-8 -top-8 w-16 h-16 morphing-shape opacity-20"></div>
            <span className="inline-block py-1 px-3 rounded-full bg-modern-primaryLight/30 dark:bg-blue-900/50 text-modern-primary dark:text-blue-300 font-medium text-sm mb-6 border border-modern-primary/20 dark:border-blue-500/30 shadow-sm">
              Full Stack Developer & AI Enthusiast
            </span>
            <h1 className="text-lg font-mono text-modern-primary dark:text-blue-400 mb-4 font-semibold tracking-wide">
              Hi! My name is
            </h1>
            <h2 className="hero-heading mb-4 tracking-tight">
              {personalInfo.name}
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-modern-textLight dark:text-gray-200 mb-8 font-outfit tracking-tight">
              {personalInfo.title}
            </h3>
            <p className="text-lg text-modern-textLight dark:text-gray-300 max-w-2xl mb-8 leading-relaxed">
              {personalInfo.bio}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/projects" className="btn-primary group">
                <span className="relative z-10 flex items-center">
                  <Code
                    size={18}
                    className="mr-2 group-hover:animate-pulse-soft"
                  />
                  View Projects
                </span>
              </Link>
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary group"
              >
                <span className="flex items-center">
                  <Download
                    size={18}
                    className="mr-2 group-hover:animate-pulse-soft"
                  />
                  Download Resume
                </span>
              </a>
              <Link to="/blogs" className="btn-primary group">
                <span className="relative z-10 flex items-center">
                  <Book
                    size={18}
                    className="mr-2 group-hover:animate-pulse-soft"
                  />
                  Read Blog
                </span>
              </Link>
              <Link to="/study-material" className="btn-secondary group">
                <span className="flex items-center">
                  <FileText
                    size={18}
                    className="mr-2 group-hover:animate-pulse-soft"
                  />
                  Study Material
                </span>
              </Link>
            </div>
          </div>
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div
              className="parallax-child relative"
              style={{
                transform: `translateX(${mousePosition.x}px) translateY(${mousePosition.y}px)`,
              }}
            >
              <div className="layered-card">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-rich-md border-2 border-modern-primary/20 dark:border-blue-500/30 relative hover:scale-105 transition-transform duration-500 bg-gradient-to-br from-modern-cardBg to-modern-surface dark:from-gray-800 dark:to-gray-900 layer-1">
                  <img
                    src={personalInfo.profileImage}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover layer-2"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-modern-primary/10 via-transparent to-modern-highlight/20 dark:from-transparent dark:via-transparent dark:to-transparent mix-blend-overlay dark:mix-blend-normal opacity-70 layer-3"></div>
                </div>
                <div
                  className="absolute -bottom-6 -right-6 w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-modern-primary/30 dark:border-blue-500/30 -z-10 layer-1"
                  style={{
                    transform: `translateX(${
                      mousePosition.x * 1.5
                    }px) translateY(${mousePosition.y * 1.5}px)`,
                  }}
                ></div>

                <FloatingOrb
                  className="absolute -top-10 -left-10"
                  size="70px"
                  color="rgba(54, 214, 231, 0.2)"
                  animation="animate-float-slow"
                  zIndex={-1}
                />

                <FloatingOrb
                  className="absolute -bottom-12 left-12"
                  size="40px"
                  color="rgba(132, 94, 247, 0.25)"
                  animation="animate-pulse-soft"
                  zIndex={-1}
                />

                {/* Tech stack floating badges */}
                <div
                  className="absolute -right-8 top-10 bg-white dark:bg-gray-800 py-1 px-3 rounded-full shadow-rich-sm text-sm font-medium text-modern-text dark:text-gray-200 flex items-center border border-modern-border dark:border-gray-700 layer-5 animate-float"
                  style={{ animationDelay: "1s" }}
                >
                  <Star
                    size={14}
                    className="text-modern-primary dark:text-blue-400 mr-1"
                  />{" "}
                  React
                </div>

                <div
                  className="absolute -left-10 top-1/3 bg-white dark:bg-gray-800 py-1 px-3 rounded-full shadow-rich-sm text-sm font-medium text-modern-text dark:text-gray-200 flex items-center border border-modern-border dark:border-gray-700 layer-4 animate-float"
                  style={{ animationDelay: "2s" }}
                >
                  <Zap
                    size={14}
                    className="text-modern-highlight dark:text-purple-400 mr-1"
                  />{" "}
                  Node.js
                </div>

                <div
                  className="absolute -right-12 bottom-1/4 bg-white dark:bg-gray-800 py-1 px-3 rounded-full shadow-rich-sm text-sm font-medium text-modern-text dark:text-gray-200 flex items-center border border-modern-border dark:border-gray-700 layer-4 animate-float"
                  style={{ animationDelay: "0.5s" }}
                >
                  <Brain
                    size={14}
                    className="text-modern-accent dark:text-cyan-400 mr-1"
                  />{" "}
                  AI
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        className="py-20 px-6 md:px-12 bg-modern-surface/50 dark:bg-gray-800/50 relative"
      >
        <GradientBackground
          colors={["rgba(0, 90, 226, 0.05)", "rgba(54, 214, 231, 0.05)"]}
          blur="100px"
        />
        <div className="dots-bg absolute inset-0 opacity-30"></div>

        <div className="max-w-7xl mx-auto relative">
          <h2 className="section-heading reveal">About Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <div className="reveal" style={{ transitionDelay: "0.1s" }}>
              <Card3D className="glass-card p-8 h-full border border-modern-border dark:border-gray-700">
                <p className="text-modern-text dark:text-gray-200 mb-5">
                  I'm an aspiring Software Engineer, Developer and Freelancer
                  with practical experience across AI, machine learning,
                  full-stack web development. I specialize in building scalable
                  applications from AI-powered systems to dynamic web platforms
                  with a strong focus on performance and user experience.
                </p>
                <p className="text-modern-text dark:text-gray-200 mb-5">
                  With a solid background in Data Structures and Algorithms
                  (DSA), Machine Learning, and Web Developement, I bring both
                  depth and versatility to every project. I am passionate about
                  turning complex ideas into practical, accessible solutions.
                </p>
                <p className="text-modern-text dark:text-gray-200 mb-5">
                  Driven by continuous learning, I stay at the forefront of new
                  technologies and actively share knowledge through blogs and
                  mentoring. My mission is to solve real-world problems through
                  impactful software, whether by developing innovative AI
                  applications or crafting seamless digital experience.
                </p>

                <p className="text-modern-text dark:text-gray-200">
                  I am excited to collaborate with forward-thinking teams and
                  clients who value quality, creativity, and a strong work
                  ethic. Let's build something meaningful together.
                </p>

                {/* Signature or personal element */}
                <div className="mt-8 pt-6 border-t border-modern-border dark:border-gray-700 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-modern-primary/10 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                      <Code
                        size={20}
                        className="text-modern-primary dark:text-blue-400"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-modern-text dark:text-gray-200 font-outfit">
                        {personalInfo.name}
                      </p>
                      <p className="text-sm text-modern-textLight dark:text-gray-400">
                        Full Stack Developer
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={`tel:${personalInfo.phone}`}
                      className="w-10 h-10 rounded-full bg-modern-primary/10 dark:bg-blue-900/30 flex items-center justify-center text-modern-primary dark:text-blue-400 hover:bg-modern-primary dark:hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                    >
                      <Phone size={18} className="animate-pulse-soft" />
                    </a>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="w-10 h-10 rounded-full bg-modern-highlight/10 dark:bg-purple-900/30 flex items-center justify-center text-modern-highlight dark:text-purple-400 hover:bg-modern-highlight dark:hover:bg-purple-600 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-rotate-12"
                    >
                      <Mail size={18} className="animate-pulse-soft" />
                    </a>
                  </div>
                </div>
              </Card3D>
            </div>
            <div
              ref={skillsRef}
              className="space-y-6 reveal"
              style={{ transitionDelay: "0.3s" }}
            >
              <h3 className="text-xl font-bold text-modern-text dark:text-gray-200 mb-6 pb-2 relative inline-block font-outfit">
                Skills & Expertise
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-modern-primary to-modern-accent dark:from-blue-500 dark:to-purple-500 rounded-full"></span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="depth-card p-6 bg-white dark:bg-gray-800 hover:shadow-rich-md transition-shadow border border-modern-border dark:border-gray-700 rounded-xl">
                  <h4 className="font-mono text-modern-primary dark:text-blue-400 mb-4 font-medium flex items-center">
                    <div className="w-8 h-8 rounded-full bg-modern-primaryLight/50 dark:bg-blue-900/50 flex items-center justify-center mr-3">
                      <Code
                        size={16}
                        className="text-modern-primary dark:text-blue-400"
                      />
                    </div>
                    Programming & Web
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="tag shadow-sm hover:shadow-md transition-shadow hover:bg-modern-primary hover:text-white dark:hover:bg-blue-600">
                      C++
                    </span>
                    <span className="tag shadow-sm hover:shadow-md transition-shadow hover:bg-modern-primary hover:text-white dark:hover:bg-blue-600">
                      Python
                    </span>
                    <span className="tag shadow-sm hover:shadow-md transition-shadow hover:bg-modern-primary hover:text-white dark:hover:bg-blue-600">
                      Java
                    </span>
                    <span className="tag shadow-sm hover:shadow-md transition-shadow hover:bg-modern-primary hover:text-white dark:hover:bg-blue-600">
                      HTML
                    </span>
                    <span className="tag shadow-sm hover:shadow-md transition-shadow hover:bg-modern-primary hover:text-white dark:hover:bg-blue-600">
                      CSS
                    </span>
                    <span className="tag shadow-sm hover:shadow-md transition-shadow hover:bg-modern-primary hover:text-white dark:hover:bg-blue-600">
                      JavaScript
                    </span>
                    <span className="tag shadow-sm hover:shadow-md transition-shadow hover:bg-modern-primary hover:text-white dark:hover:bg-blue-600">
                      React.js
                    </span>
                    <span className="tag shadow-sm hover:shadow-md transition-shadow hover:bg-modern-primary hover:text-white dark:hover:bg-blue-600">
                      Tailwind CSS
                    </span>
                    <span className="tag shadow-sm hover:shadow-md transition-shadow hover:bg-modern-primary hover:text-white dark:hover:bg-blue-600">
                      Django
                    </span>
                    <span className="tag shadow-sm hover:shadow-md transition-shadow hover:bg-modern-primary hover:text-white dark:hover:bg-blue-600">
                      Figma
                    </span>
                  </div>
                </div>

                <div className="depth-card p-6 bg-white dark:bg-gray-800 hover:shadow-rich-md transition-shadow border border-modern-border dark:border-gray-700 rounded-xl">
                  <h4 className="font-mono text-modern-highlight dark:text-purple-400 mb-4 font-medium flex items-center">
                    <div className="w-8 h-8 rounded-full bg-modern-highlight/20 dark:bg-purple-900/50 flex items-center justify-center mr-3">
                      <Brain
                        size={16}
                        className="text-modern-highlight dark:text-purple-400"
                      />
                    </div>
                    Machine Learning & Data
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="tag shadow-sm hover:shadow-md transition-shadow hover:bg-modern-highlight hover:text-white dark:hover:bg-purple-600">
                      Supervised Learning
                    </span>
                    <span className="tag shadow-sm hover:shadow-md transition-shadow hover:bg-modern-highlight hover:text-white dark:hover:bg-purple-600">
                      Unsupervised Learning
                    </span>
                    <span className="tag shadow-sm hover:shadow-md transition-shadow hover:bg-modern-highlight hover:text-white dark:hover:bg-purple-600">
                      Ensemble Methods
                    </span>
                    <span className="tag shadow-sm hover:shadow-md transition-shadow hover:bg-modern-highlight hover:text-white dark:hover:bg-purple-600">
                      Decision Trees
                    </span>
                    <span className="tag shadow-sm hover:shadow-md transition-shadow hover:bg-modern-highlight hover:text-white dark:hover:bg-purple-600">
                      Regression Analysis
                    </span>
                    <span className="tag shadow-sm hover:shadow-md transition-shadow hover:bg-modern-highlight hover:text-white dark:hover:bg-purple-600">
                      NumPy
                    </span>
                    <span className="tag shadow-sm hover:shadow-md transition-shadow hover:bg-modern-highlight hover:text-white dark:hover:bg-purple-600">
                      Pandas
                    </span>
                    <span className="tag shadow-sm hover:shadow-md transition-shadow hover:bg-modern-highlight hover:text-white dark:hover:bg-purple-600">
                      Scikit-learn
                    </span>
                    <span className="tag shadow-sm hover:shadow-md transition-shadow hover:bg-modern-highlight hover:text-white dark:hover:bg-purple-600">
                      Matplotlib
                    </span>
                    <span className="tag shadow-sm hover:shadow-md transition-shadow hover:bg-modern-highlight hover:text-white dark:hover:bg-purple-600">
                      Seaborn
                    </span>
                    <span className="tag shadow-sm hover:shadow-md transition-shadow hover:bg-modern-highlight hover:text-white dark:hover:bg-purple-600">
                      NLTK
                    </span>
                    <span className="tag shadow-sm hover:shadow-md transition-shadow hover:bg-modern-highlight hover:text-white dark:hover:bg-purple-600">
                      SpaCy
                    </span>
                  </div>
                </div>

                <div className="depth-card p-6 bg-white dark:bg-gray-800 hover:shadow-rich-md transition-shadow border border-modern-border dark:border-gray-700 rounded-xl">
                  <h4 className="font-mono text-modern-accent dark:text-cyan-400 mb-4 font-medium flex items-center">
                    <div className="w-8 h-8 rounded-full bg-modern-accent/20 dark:bg-cyan-900/50 flex items-center justify-center mr-3">
                      <Zap
                        size={16}
                        className="text-modern-accent dark:text-cyan-400"
                      />
                    </div>
                    Tools & Others
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="tag shadow-sm hover:shadow-md transition-shadow hover:bg-modern-accent hover:text-white dark:hover:bg-cyan-600">
                      Git
                    </span>
                    <span className="tag shadow-sm hover:shadow-md transition-shadow hover:bg-modern-accent hover:text-white dark:hover:bg-cyan-600">
                      GitHub
                    </span>
                    <span className="tag shadow-sm hover:shadow-md transition-shadow hover:bg-modern-accent hover:text-white dark:hover:bg-cyan-600">
                      Streamlit
                    </span>
                    <span className="tag shadow-sm hover:shadow-md transition-shadow hover:bg-modern-accent hover:text-white dark:hover:bg-cyan-600">
                      Jupyter Notebook
                    </span>
                    <span className="tag shadow-sm hover:shadow-md transition-shadow hover:bg-modern-accent hover:text-white dark:hover:bg-cyan-600">
                      DSA (C++)
                    </span>
                    <span className="tag shadow-sm hover:shadow-md transition-shadow hover:bg-modern-accent hover:text-white dark:hover:bg-cyan-600">
                      API Integration
                    </span>
                    <span className="tag shadow-sm hover:shadow-md transition-shadow hover:bg-modern-accent hover:text-white dark:hover:bg-cyan-600">
                      SQL
                    </span>
                    <span className="tag shadow-sm hover:shadow-md transition-shadow hover:bg-modern-accent hover:text-white dark:hover:bg-cyan-600">
                      JSON
                    </span>
                    <span className="tag shadow-sm hover:shadow-md transition-shadow hover:bg-modern-accent hover:text-white dark:hover:bg-cyan-600">
                      Pickle
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
