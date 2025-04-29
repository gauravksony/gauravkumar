
import Layout from '@/components/common/Layout';
import ContactForm from '@/components/sections/ContactForm';
import { personalInfo } from '@/data/mockData';
import { Mail, Phone, MapPin, Github, Linkedin, Youtube, Instagram } from 'lucide-react';

const ContactPage = () => {
  return (
    <Layout>
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="hero-heading mb-4">Contact Me</h1>
            <p className="text-lg text-portfolio-slate max-w-2xl mx-auto">
              Have a question or want to work together? Feel free to reach out!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-portfolio-lightestSlate mb-6">
                Get In Touch
              </h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-3 bg-portfolio-lightNavy rounded-md mr-4">
                    <Mail size={24} className="text-portfolio-cyan" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-portfolio-lightestSlate mb-1">
                      Email
                    </h3>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-portfolio-slate hover:text-portfolio-cyan transition-colors"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 p-3 bg-portfolio-lightNavy rounded-md mr-4">
                    <Phone size={24} className="text-portfolio-cyan" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-portfolio-lightestSlate mb-1">
                      Phone
                    </h3>
                    <a
                      href={`tel:${personalInfo.phone}`}
                      className="text-portfolio-slate hover:text-portfolio-cyan transition-colors"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 p-3 bg-portfolio-lightNavy rounded-md mr-4">
                    <MapPin size={24} className="text-portfolio-cyan" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-portfolio-lightestSlate mb-1">
                      Location
                    </h3>
                    <p className="text-portfolio-slate">
                      {personalInfo.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-medium text-portfolio-lightestSlate mb-4">
                  Connect With Me
                </h3>
                <div className="flex space-x-4">
                  <a
                    href={personalInfo.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-portfolio-lightNavy rounded-md text-portfolio-slate hover:text-portfolio-cyan transition-colors"
                  >
                    <Github size={24} className="text-portfolio-cyan" />
                  </a>
                  <a
                    href={personalInfo.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-portfolio-lightNavy rounded-md text-portfolio-slate hover:text-portfolio-cyan transition-colors"
                  >
                    <Linkedin size={24} className="text-portfolio-cyan" />
                  </a>
                  <a
                    href={personalInfo.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-portfolio-lightNavy rounded-md text-portfolio-slate hover:text-portfolio-cyan transition-colors"
                  >
                    <Youtube size={24} className="text-portfolio-cyan" />
                  </a>
                  <a
                    href={personalInfo.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-portfolio-lightNavy rounded-md text-portfolio-slate hover:text-portfolio-cyan transition-colors"
                  >
                    <Instagram size={24} className="text-portfolio-cyan" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
