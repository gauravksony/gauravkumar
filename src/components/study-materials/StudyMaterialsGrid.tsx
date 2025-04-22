
import ResourceCard, { ResourceType } from '../cards/ResourceCard';

interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  category: string;
  date: string;
  url: string;
  upload_date: string;
}

interface StudyMaterialsGridProps {
  materials: StudyMaterial[];
  loading: boolean;
}

const StudyMaterialsGrid = ({ materials, loading }: StudyMaterialsGridProps) => {
  if (loading) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl text-portfolio-lightestSlate mb-2">Loading study materials...</h3>
      </div>
    );
  }

  if (materials.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl text-portfolio-lightestSlate mb-2">No resources found</h3>
        <p className="text-portfolio-slate">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {materials.map(material => (
        <ResourceCard
          key={material.id}
          title={material.title}
          description={material.description}
          type={material.type}
          category={material.category}
          date={material.date}
          url={material.url}
        />
      ))}
    </div>
  );
};

export default StudyMaterialsGrid;
