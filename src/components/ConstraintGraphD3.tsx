import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { LanguageConstraint } from '../types/index';
import { constraintTypes, getCategoryColor } from '../data/constraintTypes';
import { constraintRelationships } from '../data/constraints';

interface ConstraintGraphD3Props {
  constraints: LanguageConstraint[];
  onNodeClick: (constraint: LanguageConstraint) => void;
  selectedConstraintId?: string;
  filterCategory?: string | null;
}

interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  constraint: LanguageConstraint | null;
  color: string;
  size: number;
  type: 'root' | 'category' | 'constraint';
  category?: string;
}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
  type: string;
}

const ConstraintGraphD3 = ({ constraints, onNodeClick, selectedConstraintId, filterCategory }: ConstraintGraphD3Props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentTransformRef = useRef<d3.ZoomTransform | null>(null);
  const isInitialRenderRef = useRef(true);

  // Categories definition
  const categories = [
    { id: 'brand_identity', name: 'Brand Identity', color: '#3b82f6' },
    { id: 'terminology', name: 'Terminology', color: '#10b981' },
    { id: 'grammar_style', name: 'Grammar & Style', color: '#f59e0b' },
    { id: 'cultural_localization', name: 'Cultural', color: '#a855f7' },
    { id: 'compliance_legal', name: 'Compliance', color: '#ef4444' },
    { id: 'technical_content', name: 'Technical', color: '#14b8a6' },
  ];

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || constraints.length === 0) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Create category nodes - only include categories that have constraints
    // If a filter is applied, only show the filtered category
    const relevantCategories = filterCategory
      ? categories.filter(cat => cat.id === filterCategory)
      : categories.filter(cat => {
          // Check if this category has any constraints in the current list
          return constraints.some(constraint => {
            const type = constraintTypes.find(t => t.id === constraint.typeId);
            return type?.category === cat.id;
          });
        });

    // Group constraints by category
    const constraintsByCategory = new Map<string, LanguageConstraint[]>();
    constraints.forEach(constraint => {
      const type = constraintTypes.find(t => t.id === constraint.typeId);
      if (type?.category) {
        if (!constraintsByCategory.has(type.category)) {
          constraintsByCategory.set(type.category, []);
        }
        constraintsByCategory.get(type.category)!.push(constraint);
      }
    });

    // Calculate layout - doubled grid size for maximum clarity
    const padding = 100;
    const categoryWidth = ((width - padding * 2) / relevantCategories.length) * 2;
    const rootY = 40;
    const categoryY = 160;
    const constraintStartY = 280;
    const constraintSpacing = 110;

    const nodes: GraphNode[] = [];
    const links: GraphLink[] = [];

    // Add root node at the top center
    const rootNode: GraphNode = {
      id: 'root',
      label: 'Constraint Ontology',
      constraint: null,
      color: '#6366f1',
      size: 20,
      type: 'root',
      x: width / 2,
      y: rootY,
      fx: width / 2,
      fy: rootY,
    };
    nodes.push(rootNode);

    // Position category nodes
    relevantCategories.forEach((cat, catIndex) => {
      const categoryX = padding + categoryWidth * catIndex + categoryWidth / 2;

      const categoryNode: GraphNode = {
        id: `category_${cat.id}`,
        label: cat.name,
        constraint: null,
        color: cat.color,
        size: 18,
        type: 'category',
        category: cat.id,
        x: categoryX,
        y: categoryY,
        fx: categoryX,
        fy: categoryY,
      };
      nodes.push(categoryNode);

      // Link from root to category
      links.push({
        source: rootNode.id,
        target: categoryNode.id,
        type: 'root_to_category',
      });

      // Position constraint nodes under their category
      const categoryConstraints = constraintsByCategory.get(cat.id) || [];
      categoryConstraints.forEach((constraint, cIndex) => {
        const type = constraintTypes.find(t => t.id === constraint.typeId);
        const color = type ? getCategoryColor(type.category) : '#6b7280';
        const size = constraint.severity === 'critical' ? 12 :
                     constraint.severity === 'high' ? 10 : 8;

        const constraintNode: GraphNode = {
          id: constraint.id,
          label: constraint.name,
          constraint,
          color,
          size,
          type: 'constraint',
          category: type?.category,
          x: categoryX,
          y: constraintStartY + cIndex * constraintSpacing,
          fx: categoryX,
          fy: constraintStartY + cIndex * constraintSpacing,
        };
        nodes.push(constraintNode);

        // Link from category to constraint
        links.push({
          source: categoryNode.id,
          target: constraintNode.id,
          type: 'category_to_constraint',
        });
      });
    });

    // Add relationship links
    const relationshipLinks: GraphLink[] = constraintRelationships
      .filter((rel) => {
        const sourceExists = nodes.find((n) => n.id === rel.sourceId);
        const targetExists = nodes.find((n) => n.id === rel.targetId);
        return sourceExists && targetExists;
      })
      .map((rel) => ({
        source: rel.sourceId,
        target: rel.targetId,
        type: rel.relationshipType,
      }));

    links.push(...relationshipLinks);

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height]);

    // Add zoom behavior
    const g = svg.append('g');

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 2])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
        // Store the current transform
        currentTransformRef.current = event.transform;
      });

    svg.call(zoom);

    // Set initial zoom only on first render, otherwise restore previous transform
    if (isInitialRenderRef.current) {
      const initialScale = 0.6;
      const initialTransform = d3.zoomIdentity.translate(width * 0.2, height * 0.1).scale(initialScale);
      svg.call(zoom.transform, initialTransform);
      currentTransformRef.current = initialTransform;
      isInitialRenderRef.current = false;
    } else if (currentTransformRef.current) {
      // Restore the previous zoom/pan state
      svg.call(zoom.transform, currentTransformRef.current);
    }

    // Create arrow markers
    const defs = svg.append('defs');

    defs
      .append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '-0 -5 10 10')
      .attr('refX', 20)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 8)
      .attr('markerHeight', 8)
      .append('svg:path')
      .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
      .attr('fill', '#94a3b8');

    // Draw links
    g
      .append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('x1', (d) => {
        const source = nodes.find(n => n.id === d.source);
        return source?.x || 0;
      })
      .attr('y1', (d) => {
        const source = nodes.find(n => n.id === d.source);
        return source?.y || 0;
      })
      .attr('x2', (d) => {
        const target = nodes.find(n => n.id === d.target);
        return target?.x || 0;
      })
      .attr('y2', (d) => {
        const target = nodes.find(n => n.id === d.target);
        return target?.y || 0;
      })
      .attr('stroke', (d) => {
        if (d.type === 'root_to_category') return '#818cf8';
        if (d.type === 'category_to_constraint') return '#e2e8f0';
        if (d.type === 'conflicts_with') return '#f87171';
        return '#cbd5e1';
      })
      .attr('stroke-width', (d) => {
        if (d.type === 'root_to_category') return 2;
        if (d.type === 'category_to_constraint') return 1.5;
        if (d.type === 'conflicts_with') return 2;
        return 1.5;
      })
      .attr('stroke-dasharray', (d) => (d.type === 'conflicts_with' ? '5,5' : '0'))
      .attr('marker-end', (d) => (d.type === 'category_to_constraint' || d.type === 'root_to_category' ? '' : 'url(#arrowhead)'))
      .attr('opacity', (d) => {
        if (d.type === 'root_to_category') return 0.4;
        if (d.type === 'category_to_constraint') return 0.3;
        return 0.5;
      });

    // Draw nodes
    const node = g
      .append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('cx', (d) => d.x!)
      .attr('cy', (d) => d.y!)
      .attr('r', (d) => d.size)
      .attr('fill', (d) => d.color)
      .attr('stroke', (d) => {
        if (d.type === 'category') return '#374151';
        return d.id === selectedConstraintId ? '#1e40af' : '#fff';
      })
      .attr('stroke-width', (d) => {
        if (d.type === 'category') return 2;
        return d.id === selectedConstraintId ? 3 : 2;
      })
      .style('cursor', (d) => (d.type === 'constraint' ? 'pointer' : 'default'))
      .on('click', function(event, d) {
        if (d.type !== 'constraint' || !d.constraint) return;
        event.stopPropagation();

        // Update stroke colors directly without re-rendering
        // Use the parent group to select all circles
        d3.select((this as any).parentNode)
          .selectAll('circle')
          .filter((n: any) => n.type === 'constraint')
          .attr('stroke', (n: any) => n.id === d.id ? '#1e40af' : '#fff')
          .attr('stroke-width', (n: any) => n.id === d.id ? 3 : 2);

        onNodeClick(d.constraint);
      });

    // Add labels
    g
      .append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .attr('x', (d) => d.x!)
      .attr('y', (d) => d.y!)
      .text((d) => d.label)
      .attr('font-size', (d) => {
        if (d.type === 'category') return '14px';
        return '11px';
      })
      .attr('font-weight', (d) => {
        if (d.type === 'category') return '700';
        return '500';
      })
      .attr('dx', 0)
      .attr('dy', (d) => {
        if (d.type === 'category') return -24;
        return 20; // Position constraint labels below nodes
      })
      .attr('text-anchor', 'middle')
      .attr('fill', (d) => {
        if (d.type === 'category') return '#1f2937';
        return '#374151';
      })
      .style('pointer-events', 'none')
      .style('user-select', 'none');

    // Add tooltips
    node.append('title').text((d) => {
      if (d.type === 'category') return d.label;
      return d.constraint ? `${d.label}\n${d.constraint.rule}` : d.label;
    });

    // No cleanup needed for static layout
  }, [constraints, filterCategory]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <svg ref={svgRef} className="w-full h-full" />
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-lg p-3 text-xs space-y-1 shadow-lg">
        <div className="font-semibold text-gray-700 mb-2">Controls:</div>
        <div className="text-gray-600">• Scroll to zoom</div>
        <div className="text-gray-600">• Click constraint for details</div>
      </div>
    </div>
  );
};

export default ConstraintGraphD3;
