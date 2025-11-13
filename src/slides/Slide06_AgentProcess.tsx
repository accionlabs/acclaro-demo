import SlideLayout from '../components/SlideLayout';
import SVGDiagram from '../components/SVGDiagram';
import { slideConfigs } from '../config/slideConfig';

const Slide06_AgentProcess = () => {
  const config = slideConfigs.slide06;

  return (
    <SlideLayout centered={false}>
      <div className="flex flex-col">
        <div className="flex items-center" style={{ height: '80px' }}>
          <h1 className="text-3xl font-bold text-gray-900">
            Agent-Driven Constraint Extraction
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
              src="/diagrams/agent-extraction-process.svg"
              alt="Agent Extraction Process Diagram"
              className="max-h-full max-w-full"
            />
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};

export default Slide06_AgentProcess;
