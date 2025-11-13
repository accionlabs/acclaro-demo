import SlideLayout from '../components/SlideLayout';
import SVGDiagram from '../components/SVGDiagram';
import { slideConfigs } from '../config/slideConfig';

const Slide05_Ontology = () => {
  const config = slideConfigs.slide05;

  return (
    <SlideLayout centered={false}>
      <div className="flex flex-col">
        <div className="flex items-center" style={{ height: '80px' }}>
          <h1 className="text-3xl font-bold text-gray-900">
            Content Language Constraint Ontology
          </h1>
        </div>
        <div className="relative flex items-center justify-center" style={{ height: `${config.svgAreaHeight}px` }}>
          <div style={{
            position: 'relative',
            left: `${config.svgX}px`,
            top: `${config.svgY}px`,
            height: `${config.svgAreaHeight}px`,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <SVGDiagram
              src="/diagrams/constraint-ontology.svg"
              alt="Constraint Ontology Diagram"
              className="max-h-full max-w-full"
            />
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};

export default Slide05_Ontology;
