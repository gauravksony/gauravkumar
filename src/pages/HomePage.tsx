
import { Link } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import { personalInfo } from '@/data/mockData';
import { ArrowDown, Download, Book, FileText, Code } from 'lucide-react';

const HomePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 animate-fade-in-up">
            <h1 className="text-lg font-mono text-portfolio-cyan mb-4">
              Hi, my name is
            </h1>
            <h2 className="hero-heading mb-4">{personalInfo.name}</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-portfolio-slate mb-6">
              {personalInfo.title}
            </h3>
            <p className="text-lg text-portfolio-slate max-w-2xl mb-8">
              {personalInfo.bio}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/projects" className="btn-primary">
                <Code size={18} className="mr-2" />
                View Projects
              </Link>
              <a href={personalInfo.resumeUrl} className="btn-primary">
                <Download size={18} className="mr-2" />
                Download Resume
              </a>
              <Link to="/blogs" className="btn-primary">
                <Book size={18} className="mr-2" />
                Read Blog
              </Link>
              <Link to="/study-material" className="btn-primary">
                <FileText size={18} className="mr-2" />
                Study Material
              </Link>
            </div>
          </div>
          <div className="md:col-span-5 flex justify-center md:justify-end animate-fade-in">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-portfolio-cyan/20 shadow-xl">
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-portfolio-cyan -z-10"></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
          <a href="#about" className="text-portfolio-cyan">
            <ArrowDown size={24} />
          </a>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 px-6 md:px-12 bg-portfolio-lightNavy/30"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="section-heading">About Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
            <div>
              <p className="text-portfolio-slate mb-4">
                I’m a passionate software engineer with hands-on experience in
                AI, machine learning, web development, and C++. I've worked on a
                variety of projects, from building full-stack web apps to
                developing AI-powered solutions. I also have a strong foundation
                in DSA, SQL, and databases.
              </p>
              <p className="text-portfolio-slate mb-4">
                With a love for learning, I continuously explore new
                technologies and enjoy sharing my knowledge through blogs and
                mentoring. My goal is to make complex computer science concepts
                accessible while building impactful software solutions.
              </p>
              <p className="text-portfolio-slate">
                Whether it’s developing innovative AI applications or creating
                seamless web experiences, I’m always excited to solve problems
                and grow in my craft.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-portfolio-lightestSlate mb-4">
                Skills & Expertise
              </h3>
              <div className="mb-6">
                <h4 className="font-mono text-portfolio-cyan mb-2">
                  Languages
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="tag">JavaScript</span>
                  <span className="tag">TypeScript</span>
                  <span className="tag">Python</span>
                  <span className="tag">Java</span>
                  <span className="tag">C++</span>
                  <span className="tag">SQL</span>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="font-mono text-portfolio-cyan mb-2">Frontend</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="tag">React</span>
                  <span className="tag">Vue.js</span>
                  <span className="tag">Next.js</span>
                  <span className="tag">Tailwind CSS</span>
                  <span className="tag">Material UI</span>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="font-mono text-portfolio-cyan mb-2">
                  Backend & DevOps
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="tag">Node.js</span>
                  <span className="tag">Express</span>
                  <span className="tag">Django</span>
                  <span className="tag">MongoDB</span>
                  <span className="tag">PostgreSQL</span>
                  <span className="tag">Docker</span>
                  <span className="tag">AWS</span>
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
