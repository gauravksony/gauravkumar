
import { BriefcaseIcon, BookIcon, Calendar } from 'lucide-react';

interface TimelineItem {
  id: string;
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  type: 'work' | 'education';
}

interface ExperienceTimelineProps {
  items: TimelineItem[];
}

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ items }) => {
  return (
    <div className="space-y-12">
      {items.map((item, index) => (
        <div 
          key={item.id} 
          className={`relative pl-8 lg:pl-0 ${
            index !== items.length - 1 ? 'pb-12' : ''
          }`}
        >
          {/* Timeline Line */}
          {index !== items.length - 1 && (
            <div className="absolute left-4 lg:left-1/2 top-0 h-full w-0.5 bg-portfolio-lightestNavy transform lg:-translate-x-1/2" />
          )}
          
          <div className={`lg:flex items-start ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
            {/* Timeline Icon */}
            <div className="absolute left-0 lg:static lg:flex-shrink-0 lg:mx-4 z-10">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-portfolio-lightNavy border-2 border-portfolio-cyan">
                {item.type === 'work' ? 
                  <BriefcaseIcon size={16} className="text-portfolio-cyan" /> : 
                  <BookIcon size={16} className="text-portfolio-cyan" />
                }
              </div>
            </div>
            
            {/* Timeline Content */}
            <div className={`card lg:w-[calc(50%-2rem)] animate-fade-in-up ${
              index % 2 === 0 ? 'lg:mr-auto' : 'lg:ml-auto'
            }`}>
              {/* Date */}
              <div className="flex items-center text-sm text-portfolio-cyan font-mono mb-2">
                <Calendar size={14} className="mr-1" />
                <span>{item.startDate} - {item.endDate}</span>
              </div>
              
              {/* Title and Organization */}
              <h3 className="text-xl font-bold text-portfolio-lightestSlate">{item.title}</h3>
              <h4 className="text-lg text-portfolio-cyan mb-1">{item.organization}</h4>
              <p className="text-sm text-portfolio-slate mb-4">{item.location}</p>
              
              {/* Description */}
              <ul className="space-y-2 list-disc pl-5">
                {item.description.map((point, i) => (
                  <li key={i} className="text-portfolio-slate">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceTimeline;
