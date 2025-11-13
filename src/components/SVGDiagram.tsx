interface SVGDiagramProps {
  src: string;
  alt: string;
  className?: string;
}

const SVGDiagram = ({ src, alt, className = '' }: SVGDiagramProps) => {
  return (
    <img src={src} alt={alt} className={`object-contain ${className}`} />
  );
};

export default SVGDiagram;
