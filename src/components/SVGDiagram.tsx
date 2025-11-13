interface SVGDiagramProps {
  src: string;
  alt: string;
  className?: string;
}

const SVGDiagram = ({ src, alt, className = '' }: SVGDiagramProps) => {
  const fullSrc = import.meta.env.BASE_URL + src.replace(/^\//, '');
  return (
    <img src={fullSrc} alt={alt} className={`object-contain ${className}`} />
  );
};

export default SVGDiagram;
