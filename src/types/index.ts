// Core ontology node types
export type ConstraintCategory =
  | 'brand_identity'
  | 'terminology'
  | 'grammar_style'
  | 'cultural_localization'
  | 'compliance_legal'
  | 'technical_content';

export type ConstraintSeverity = 'critical' | 'high' | 'medium' | 'low' | 'suggestion';

export type ValidationMethod = 'automated' | 'human_review' | 'automated_with_review';

// Master ontology structure
export interface ConstraintType {
  id: string;
  name: string;
  category: ConstraintCategory;
  description: string;
  parentId?: string;
  level: number; // 0 = category, 1 = subcategory, 2 = specific type
}

// Individual constraint definition
export interface LanguageConstraint {
  id: string;
  typeId: string; // links to ConstraintType
  clientId: string;
  name: string;
  rule: string;
  description: string;
  languages: string[]; // ['en-US', 'es-ES', etc.]
  appliesTo: string[]; // ['ui_text', 'marketing', 'documentation', 'error_messages']
  severity: ConstraintSeverity;
  validationMethod: ValidationMethod;
  examples: {
    approved: string[];
    rejected: string[];
  };
  relatedConstraintIds: string[];
  tags: string[];
  createdDate: string;
  lastUpdated: string;
  source: string; // e.g., "Style Guide v2.3", "Email from client 2024-01"
}

// Client profile
export interface Client {
  id: string;
  name: string;
  industry: string;
  description: string;
  constraintCount: number;
  languages: string[];
  primaryContact: string;
}

// Content validation request
export interface ContentValidationRequest {
  contentId: string;
  clientId: string;
  content: string;
  contentType: string; // 'ui_text', 'marketing', 'documentation'
  language: string;
  targetLanguages?: string[];
}

// Validation result
export interface ValidationResult {
  contentId: string;
  overallStatus: 'pass' | 'fail' | 'warning';
  violations: ConstraintViolation[];
  suggestions: ConstraintSuggestion[];
  validatedAt: string;
  agentConfidence: number; // 0-1
  requiresHumanReview: boolean;
}

export interface ConstraintViolation {
  constraintId: string;
  constraintName: string;
  severity: ConstraintSeverity;
  description: string;
  location: {
    start: number;
    end: number;
    text: string;
  };
  suggestion: string;
  autoFixAvailable: boolean;
}

export interface ConstraintSuggestion {
  constraintId: string;
  constraintName: string;
  description: string;
  alternativeText: string;
  rationale: string;
}

// Knowledge graph structure
export interface KnowledgeGraph {
  client: Client;
  constraints: LanguageConstraint[];
  constraintTypes: ConstraintType[];
  relationships: ConstraintRelationship[];
}

export interface ConstraintRelationship {
  sourceId: string;
  targetId: string;
  relationshipType: 'related_to' | 'conflicts_with' | 'requires' | 'supersedes';
  description: string;
}

// Graph visualization types
export interface GraphNode {
  id: string;
  label: string;
  category: ConstraintCategory;
  severity?: ConstraintSeverity;
  type: 'category' | 'constraint';
}

export interface GraphEdge {
  source: string;
  target: string;
  relationshipType: 'related_to' | 'conflicts_with' | 'requires' | 'supersedes';
}
