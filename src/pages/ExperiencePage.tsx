import { useEffect, useState } from 'react';
import Layout from '@/components/common/Layout';
import ExperienceTimeline from '@/components/sections/ExperienceTimeline';
import { personalInfo } from '@/data/mockData';
import { Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const ExperiencePage = () => {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to ensure description is always an array
      const typedExperienceData = (data || []).map(item => ({
        ...item,
        // Parse the description field if it's a string, otherwise keep as is
        description: typeof item.description === 'string' 
          ? item.description.split('\n').filter(line => line.trim().length > 0)
          : Array.isArray(item.description)
            ? item.description
            : [],
        startDate: item.start_date,
        endDate: item.end_date,
        type: item.type as 'work' | 'education'
      }));

      setExperiences(typedExperienceData);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="hero-heading mb-4">Experience</h1>
            <p className="text-lg text-portfolio-slate max-w-2xl mx-auto">
              My professional experience, education, and qualifications.
            </p>
            <a 
              href={personalInfo.resumeUrl} 
              className="btn-primary inline-flex mt-6"
            >
              <Download size={18} className="mr-2" />
              Download Resume
            </a>
          </div>
          
          {/* Timeline */}
          {loading ? (
            <div className="text-center">Loading experiences...</div>
          ) : (
            <ExperienceTimeline items={experiences} />
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ExperiencePage;
