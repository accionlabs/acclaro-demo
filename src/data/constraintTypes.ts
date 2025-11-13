import type { ConstraintType } from '../types/index';

export const constraintTypes: ConstraintType[] = [
  // Brand Identity - Level 0
  {
    id: 'ct_brand',
    name: 'Brand Identity Constraints',
    category: 'brand_identity',
    description: 'Rules governing brand voice, tone, and personality',
    level: 0
  },
  {
    id: 'ct_brand_voice',
    name: 'Brand Voice',
    category: 'brand_identity',
    description: 'Overall personality and character of brand communication',
    parentId: 'ct_brand',
    level: 1
  },
  {
    id: 'ct_brand_tone',
    name: 'Tone Guidelines',
    category: 'brand_identity',
    description: 'Situational adaptations of brand voice',
    parentId: 'ct_brand',
    level: 1
  },
  {
    id: 'ct_brand_prohibited',
    name: 'Prohibited Terms',
    category: 'brand_identity',
    description: 'Words and phrases never to be used',
    parentId: 'ct_brand',
    level: 1
  },

  // Terminology - Level 0
  {
    id: 'ct_terminology',
    name: 'Terminology Constraints',
    category: 'terminology',
    description: 'Standardized terms and naming conventions',
    level: 0
  },
  {
    id: 'ct_term_product',
    name: 'Product Names',
    category: 'terminology',
    description: 'Official product and feature names',
    parentId: 'ct_terminology',
    level: 1
  },
  {
    id: 'ct_term_ui',
    name: 'UI Labels',
    category: 'terminology',
    description: 'User interface terminology standards',
    parentId: 'ct_terminology',
    level: 1
  },
  {
    id: 'ct_term_industry',
    name: 'Industry Jargon',
    category: 'terminology',
    description: 'Industry-specific terminology standards',
    parentId: 'ct_terminology',
    level: 1
  },

  // Grammar & Style - Level 0
  {
    id: 'ct_grammar',
    name: 'Grammar & Style Constraints',
    category: 'grammar_style',
    description: 'Writing style and grammar rules',
    level: 0
  },
  {
    id: 'ct_grammar_structure',
    name: 'Sentence Structure',
    category: 'grammar_style',
    description: 'Rules for sentence construction',
    parentId: 'ct_grammar',
    level: 1
  },

  // Cultural & Localization - Level 0
  {
    id: 'ct_cultural',
    name: 'Cultural & Localization Constraints',
    category: 'cultural_localization',
    description: 'Cultural sensitivities and regional preferences',
    level: 0
  },
  {
    id: 'ct_cultural_sensitivity',
    name: 'Cultural Sensitivities',
    category: 'cultural_localization',
    description: 'Cultural considerations and adaptations',
    parentId: 'ct_cultural',
    level: 1
  },

  // Compliance - Level 0
  {
    id: 'ct_compliance',
    name: 'Compliance & Legal Constraints',
    category: 'compliance_legal',
    description: 'Legal requirements and regulatory compliance',
    level: 0
  },
  {
    id: 'ct_compliance_legal',
    name: 'Legal Requirements',
    category: 'compliance_legal',
    description: 'Mandatory legal disclaimers and disclosures',
    parentId: 'ct_compliance',
    level: 1
  },

  // Technical Content - Level 0
  {
    id: 'ct_technical',
    name: 'Technical Content Constraints',
    category: 'technical_content',
    description: 'Technical documentation and code-related content',
    level: 0
  },
  {
    id: 'ct_technical_error',
    name: 'Error Messages',
    category: 'technical_content',
    description: 'User-facing error message standards',
    parentId: 'ct_technical',
    level: 1
  },
  {
    id: 'ct_technical_api',
    name: 'API Documentation',
    category: 'technical_content',
    description: 'API reference and technical docs',
    parentId: 'ct_technical',
    level: 1
  },

  // Additional Grammar & Style subcategories
  {
    id: 'ct_grammar_formatting',
    name: 'Formatting Standards',
    category: 'grammar_style',
    description: 'Text formatting and layout rules',
    parentId: 'ct_grammar',
    level: 1
  },
  {
    id: 'ct_grammar_voice',
    name: 'Active vs Passive Voice',
    category: 'grammar_style',
    description: 'Voice preference guidelines',
    parentId: 'ct_grammar',
    level: 1
  },

  // Additional Terminology subcategories
  {
    id: 'ct_term_standard',
    name: 'Standard Terms',
    category: 'terminology',
    description: 'Common standardized terminology',
    parentId: 'ct_terminology',
    level: 1
  },

  // Additional Cultural subcategories
  {
    id: 'ct_cultural_regional',
    name: 'Regional Preferences',
    category: 'cultural_localization',
    description: 'Regional language and cultural preferences',
    parentId: 'ct_cultural',
    level: 1
  },
  {
    id: 'ct_cultural_formats',
    name: 'Date/Time/Number Formats',
    category: 'cultural_localization',
    description: 'Locale-specific formatting',
    parentId: 'ct_cultural',
    level: 1
  },

  // Additional Compliance subcategories
  {
    id: 'ct_compliance_accessibility',
    name: 'Accessibility Requirements',
    category: 'compliance_legal',
    description: 'WCAG and accessibility standards',
    parentId: 'ct_compliance',
    level: 1
  },
  {
    id: 'ct_compliance_regulatory',
    name: 'Industry Regulations',
    category: 'compliance_legal',
    description: 'Industry-specific regulatory requirements',
    parentId: 'ct_compliance',
    level: 1
  }
];

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    brand_identity: '#3b82f6',  // blue
    terminology: '#10b981',      // green
    grammar_style: '#f59e0b',    // amber
    cultural_localization: '#8b5cf6', // purple
    compliance_legal: '#ef4444', // red
    technical_content: '#14b8a6' // teal
  };
  return colors[category] || '#6b7280';
};
