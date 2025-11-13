import type { LanguageConstraint, ConstraintRelationship } from '../types/index';
import {
  additionalStreamflixConstraints,
  additionalSecurepayConstraints,
  additionalCloudsyncConstraints
} from './expandedConstraints';

// StreamFlix constraints (core set)
const coreStreamflixConstraints: LanguageConstraint[] = [
  {
    id: 'sf_001',
    typeId: 'ct_brand_voice',
    clientId: 'client_streaming',
    name: 'Conversational & Enthusiastic Tone',
    rule: 'Use active voice with enthusiastic but not overly casual language',
    description: 'Brand voice should feel like a recommendation from a knowledgeable friend',
    languages: ['en-US', 'en-GB'],
    appliesTo: ['ui_text', 'marketing', 'notifications'],
    severity: 'high',
    validationMethod: 'automated_with_review',
    examples: {
      approved: [
        'Discover your next favorite show',
        'Ready to binge? Start watching now',
        "We think you'll love this series"
      ],
      rejected: [
        'Content is available for viewing',
        'Proceed to commence playback',
        'Viewing may be initiated'
      ]
    },
    relatedConstraintIds: ['sf_002', 'sf_003'],
    tags: ['brand_voice', 'tone', 'ui_copy'],
    createdDate: '2024-01-15',
    lastUpdated: '2024-03-20',
    source: 'Brand Guidelines v4.2'
  },
  {
    id: 'sf_002',
    typeId: 'ct_brand_prohibited',
    clientId: 'client_streaming',
    name: 'Avoid Technical Jargon',
    rule: 'Never use technical terms like "buffering", "streaming protocol", or "codec"',
    description: 'Keep language consumer-friendly and avoid exposing technical complexity',
    languages: ['en-US', 'es-ES', 'fr-FR', 'de-DE', 'ja-JP', 'pt-BR'],
    appliesTo: ['ui_text', 'error_messages', 'help_documentation'],
    severity: 'critical',
    validationMethod: 'automated',
    examples: {
      approved: [
        'Having trouble playing? Check your connection',
        'Video loading...',
        'Preparing your video'
      ],
      rejected: [
        'Buffering in progress',
        'Codec not supported',
        'Stream initialization failed'
      ]
    },
    relatedConstraintIds: ['sf_001'],
    tags: ['prohibited_terms', 'technical', 'user_facing'],
    createdDate: '2024-01-15',
    lastUpdated: '2024-02-10',
    source: 'Engineering Style Guide'
  },
  {
    id: 'sf_003',
    typeId: 'ct_term_product',
    clientId: 'client_streaming',
    name: 'StreamFlix Brand Name Usage',
    rule: 'Always use "StreamFlix" (capital S and F) - never "Streamflix" or "streamflix"',
    description: 'Product name must maintain exact capitalization in all contexts',
    languages: ['en-US', 'es-ES', 'fr-FR', 'de-DE', 'ja-JP', 'pt-BR'],
    appliesTo: ['ui_text', 'marketing', 'documentation', 'legal'],
    severity: 'critical',
    validationMethod: 'automated',
    examples: {
      approved: [
        'Welcome to StreamFlix',
        'StreamFlix Originals',
        'Your StreamFlix subscription'
      ],
      rejected: [
        'Welcome to Streamflix',
        'streamflix originals',
        'STREAMFLIX Premium'
      ]
    },
    relatedConstraintIds: [],
    tags: ['product_name', 'branding', 'trademark'],
    createdDate: '2024-01-15',
    lastUpdated: '2024-01-15',
    source: 'Legal Trademark Guidelines'
  },
  {
    id: 'sf_004',
    typeId: 'ct_term_ui',
    clientId: 'client_streaming',
    name: 'Watch List Terminology',
    rule: 'Use "My List" consistently, never "Watch List" or "Favorites"',
    description: 'Standard UI terminology for user\'s saved content',
    languages: ['en-US'],
    appliesTo: ['ui_text'],
    severity: 'medium',
    validationMethod: 'automated',
    examples: {
      approved: [
        'Add to My List',
        'Remove from My List',
        'View My List'
      ],
      rejected: [
        'Add to Watch List',
        'Add to Favorites',
        'Save to Watchlist'
      ]
    },
    relatedConstraintIds: [],
    tags: ['ui_terminology', 'consistency'],
    createdDate: '2024-01-15',
    lastUpdated: '2024-01-15',
    source: 'Product Terminology Guide'
  }
];

// Merge core and expanded StreamFlix constraints (deduplicate by ID)
const mergedStreamflix = [
  ...coreStreamflixConstraints,
  ...additionalStreamflixConstraints
];
export const streamflixConstraints: LanguageConstraint[] = Array.from(
  new Map(mergedStreamflix.map(c => [c.id, c])).values()
);

// SecurePay constraints (core set)
const coreSecurepayConstraints: LanguageConstraint[] = [
  {
    id: 'sp_001',
    typeId: 'ct_brand_voice',
    clientId: 'client_fintech',
    name: 'Professional & Trustworthy Tone',
    rule: 'Use formal, clear language that conveys security and reliability',
    description: 'Language must inspire confidence without being cold or distant',
    languages: ['en-US', 'en-GB'],
    appliesTo: ['ui_text', 'marketing', 'legal', 'notifications'],
    severity: 'high',
    validationMethod: 'automated_with_review',
    examples: {
      approved: [
        'Your account is protected by bank-level security',
        'Complete your secure payment',
        'We safeguard your financial information'
      ],
      rejected: [
        "Super safe! Don't worry about it!",
        'Chill, your money is fine',
        "Trust us, it's all good"
      ]
    },
    relatedConstraintIds: ['sp_002'],
    tags: ['brand_voice', 'security', 'trust'],
    createdDate: '2024-02-01',
    lastUpdated: '2024-03-15',
    source: 'Brand Voice Guidelines 2024'
  },
  {
    id: 'sp_002',
    typeId: 'ct_compliance_legal',
    clientId: 'client_fintech',
    name: 'Financial Disclaimer Requirements',
    rule: 'All investment-related content must include appropriate risk disclaimers',
    description: 'Regulatory requirement for any content discussing investments or returns',
    languages: ['en-US', 'en-GB', 'de-DE'],
    appliesTo: ['marketing', 'documentation', 'ui_text'],
    severity: 'critical',
    validationMethod: 'human_review',
    examples: {
      approved: [
        'Investment value may fluctuate. Past performance does not guarantee future results.',
        'Deposits are FDIC insured up to $250,000. Investment products are not FDIC insured.'
      ],
      rejected: [
        'Great returns guaranteed!',
        'Risk-free investment opportunity'
      ]
    },
    relatedConstraintIds: ['sp_001'],
    tags: ['legal', 'compliance', 'regulatory', 'investment'],
    createdDate: '2024-02-01',
    lastUpdated: '2024-02-01',
    source: 'Legal Compliance Team / SEC Requirements'
  },
  {
    id: 'sp_003',
    typeId: 'ct_term_ui',
    clientId: 'client_fintech',
    name: 'Preferred Financial Terminology',
    rule: 'Use "account balance" not "funds", "transaction" not "payment", "transfer" not "send money"',
    description: 'Standardized terminology for financial operations',
    languages: ['en-US', 'en-GB'],
    appliesTo: ['ui_text', 'documentation'],
    severity: 'medium',
    validationMethod: 'automated',
    examples: {
      approved: [
        'Check your account balance',
        'Review recent transactions',
        'Transfer between accounts'
      ],
      rejected: [
        'Check your funds',
        'Review recent payments',
        'Send money between accounts'
      ]
    },
    relatedConstraintIds: [],
    tags: ['terminology', 'ui', 'financial_terms'],
    createdDate: '2024-02-01',
    lastUpdated: '2024-03-10',
    source: 'Product Terminology Guide v2.1'
  },
  {
    id: 'sp_004',
    typeId: 'ct_brand_prohibited',
    clientId: 'client_fintech',
    name: 'Avoid Casual Financial Language',
    rule: 'Never use informal terms like "cash", "dough", "bucks" in UI or marketing',
    description: 'Maintain professional tone appropriate for financial services',
    languages: ['en-US', 'en-GB'],
    appliesTo: ['ui_text', 'marketing', 'notifications'],
    severity: 'high',
    validationMethod: 'automated',
    examples: {
      approved: [
        'Available funds: $1,250.00',
        'Your payment has been processed',
        'Account balance updated'
      ],
      rejected: [
        'You got some cash!',
        'Your dough has been moved',
        'Balance: 1250 bucks'
      ]
    },
    relatedConstraintIds: ['sp_001', 'sp_003'],
    tags: ['prohibited_terms', 'brand_voice', 'professionalism'],
    createdDate: '2024-02-01',
    lastUpdated: '2024-02-01',
    source: 'Brand Voice Guidelines 2024'
  }
];

// Merge core and expanded SecurePay constraints (deduplicate by ID)
const mergedSecurepay = [
  ...coreSecurepayConstraints,
  ...additionalSecurepayConstraints
];
export const securepayConstraints: LanguageConstraint[] = Array.from(
  new Map(mergedSecurepay.map(c => [c.id, c])).values()
);

// CloudSync constraints (core set)
const coreCloudsyncConstraints: LanguageConstraint[] = [
  {
    id: 'cs_001',
    typeId: 'ct_brand_voice',
    clientId: 'client_saas',
    name: 'Clear & Helpful Tone',
    rule: 'Use clear, straightforward language that helps users accomplish tasks',
    description: 'Focus on user productivity and efficiency',
    languages: ['en-US'],
    appliesTo: ['ui_text', 'documentation', 'help_documentation'],
    severity: 'high',
    validationMethod: 'automated_with_review',
    examples: {
      approved: [
        'Sync your files across all devices',
        'Share this folder with your team',
        'Access your work anywhere'
      ],
      rejected: [
        'Synergize your digital assets',
        'Leverage collaborative paradigms',
        'Facilitate ubiquitous accessibility'
      ]
    },
    relatedConstraintIds: [],
    tags: ['brand_voice', 'clarity', 'productivity'],
    createdDate: '2024-03-01',
    lastUpdated: '2024-03-01',
    source: 'Product Voice & Tone Guide'
  },
  {
    id: 'cs_002',
    typeId: 'ct_term_product',
    clientId: 'client_saas',
    name: 'CloudSync Brand Capitalization',
    rule: 'Always use "CloudSync" (capital C and S) in all contexts',
    description: 'Product name must maintain exact capitalization',
    languages: ['en-US', 'ja-JP', 'ko-KR', 'zh-CN'],
    appliesTo: ['ui_text', 'marketing', 'documentation'],
    severity: 'critical',
    validationMethod: 'automated',
    examples: {
      approved: [
        'Welcome to CloudSync',
        'CloudSync for Teams',
        'Your CloudSync workspace'
      ],
      rejected: [
        'Welcome to Cloudsync',
        'cloudsync for teams',
        'CLOUDSYNC workspace'
      ]
    },
    relatedConstraintIds: [],
    tags: ['product_name', 'branding', 'trademark'],
    createdDate: '2024-03-01',
    lastUpdated: '2024-03-01',
    source: 'Brand Guidelines'
  },
  {
    id: 'cs_003',
    typeId: 'ct_technical_error',
    clientId: 'client_saas',
    name: 'User-Friendly Error Messages',
    rule: 'Error messages should explain what happened and suggest next steps',
    description: 'Help users recover from errors with clear guidance',
    languages: ['en-US'],
    appliesTo: ['error_messages', 'ui_text'],
    severity: 'high',
    validationMethod: 'automated_with_review',
    examples: {
      approved: [
        'Unable to sync. Check your internet connection and try again.',
        'File name contains invalid characters. Remove special symbols and try again.',
        'Storage limit reached. Delete some files or upgrade your plan.'
      ],
      rejected: [
        'Error: SYNC_FAILED_ERR_001',
        'Invalid input',
        'Operation failed'
      ]
    },
    relatedConstraintIds: ['cs_001'],
    tags: ['error_messages', 'user_experience', 'clarity'],
    createdDate: '2024-03-01',
    lastUpdated: '2024-03-01',
    source: 'Error Message Standards'
  }
];

// Merge core and expanded CloudSync constraints (deduplicate by ID)
const mergedCloudsync = [
  ...coreCloudsyncConstraints,
  ...additionalCloudsyncConstraints
];
export const cloudsyncConstraints: LanguageConstraint[] = Array.from(
  new Map(mergedCloudsync.map(c => [c.id, c])).values()
);

// All constraints combined
export const allConstraints: LanguageConstraint[] = [
  ...streamflixConstraints,
  ...securepayConstraints,
  ...cloudsyncConstraints
];

// Constraint relationships
export const constraintRelationships: ConstraintRelationship[] = [
  // StreamFlix relationships
  {
    sourceId: 'sf_001',
    targetId: 'sf_002',
    relationshipType: 'related_to',
    description: 'Enthusiastic tone and avoiding jargon both serve consumer-friendly communication'
  },
  {
    sourceId: 'sf_001',
    targetId: 'sf_003',
    relationshipType: 'related_to',
    description: 'Brand voice includes proper brand name usage'
  },
  {
    sourceId: 'sf_002',
    targetId: 'sf_001',
    relationshipType: 'related_to',
    description: 'Avoiding technical terms supports conversational tone'
  },

  // SecurePay relationships
  {
    sourceId: 'sp_001',
    targetId: 'sp_002',
    relationshipType: 'related_to',
    description: 'Professional tone complements legal compliance'
  },
  {
    sourceId: 'sp_001',
    targetId: 'sp_003',
    relationshipType: 'related_to',
    description: 'Professional terminology supports trustworthy tone'
  },
  {
    sourceId: 'sp_001',
    targetId: 'sp_004',
    relationshipType: 'related_to',
    description: 'Avoiding casual language maintains professional tone'
  },
  {
    sourceId: 'sp_003',
    targetId: 'sp_004',
    relationshipType: 'related_to',
    description: 'Both enforce professional financial terminology'
  },

  // CloudSync relationships
  {
    sourceId: 'cs_001',
    targetId: 'cs_003',
    relationshipType: 'related_to',
    description: 'Clear tone extends to error messages'
  },

  // Additional StreamFlix relationships (expanded constraints)
  {
    sourceId: 'sf_001',
    targetId: 'sf_005',
    relationshipType: 'related_to',
    description: 'Both enforce active, engaging voice'
  },
  {
    sourceId: 'sf_005',
    targetId: 'sf_002',
    relationshipType: 'related_to',
    description: 'Active voice avoids passive technical language'
  },
  {
    sourceId: 'sf_004',
    targetId: 'sf_006',
    relationshipType: 'related_to',
    description: 'UI terminology consistency across different features'
  },
  {
    sourceId: 'sf_003',
    targetId: 'sf_010',
    relationshipType: 'related_to',
    description: 'Brand name and subscription plan naming both require consistency'
  },
  {
    sourceId: 'sf_008',
    targetId: 'sf_009',
    relationshipType: 'related_to',
    description: 'Accessibility and formatting standards support inclusive design'
  },
  {
    sourceId: 'sf_007',
    targetId: 'sf_011',
    relationshipType: 'related_to',
    description: 'Regional content and date formatting both handle localization'
  },
  {
    sourceId: 'sf_002',
    targetId: 'sf_013',
    relationshipType: 'related_to',
    description: 'Avoiding technical jargon applies to both UI and API errors'
  },
  {
    sourceId: 'sf_009',
    targetId: 'sf_003',
    relationshipType: 'related_to',
    description: 'Error messages reinforce brand tone'
  },
  {
    sourceId: 'sf_006',
    targetId: 'sf_013',
    relationshipType: 'related_to',
    description: 'Playback and API terminology both require standardization'
  },
  {
    sourceId: 'sf_012',
    targetId: 'sf_001',
    relationshipType: 'conflicts_with',
    description: 'Mentioning competitors conflicts with enthusiastic brand voice'
  },

  // Additional SecurePay relationships (expanded constraints)
  {
    sourceId: 'sp_001',
    targetId: 'sp_005',
    relationshipType: 'related_to',
    description: 'Professional tone uses passive voice for security context'
  },
  {
    sourceId: 'sp_003',
    targetId: 'sp_006',
    relationshipType: 'related_to',
    description: 'Financial terminology consistency across operations and formats'
  },
  {
    sourceId: 'sp_002',
    targetId: 'sp_007',
    relationshipType: 'related_to',
    description: 'FDIC and investment disclaimers are both legal requirements'
  },
  {
    sourceId: 'sp_002',
    targetId: 'sp_013',
    relationshipType: 'related_to',
    description: 'APR disclosure and investment disclaimers both ensure compliance'
  },
  {
    sourceId: 'sp_003',
    targetId: 'sp_008',
    relationshipType: 'related_to',
    description: 'Clear terminology in both standard operations and account actions'
  },
  {
    sourceId: 'sp_009',
    targetId: 'sp_001',
    relationshipType: 'related_to',
    description: 'Accessibility requirements support trustworthy, inclusive experience'
  },
  {
    sourceId: 'sp_010',
    targetId: 'sp_005',
    relationshipType: 'related_to',
    description: 'Security alerts and passive voice both convey seriousness'
  },
  {
    sourceId: 'sp_011',
    targetId: 'sp_003',
    relationshipType: 'related_to',
    description: 'Product naming and terminology standards ensure consistency'
  },
  {
    sourceId: 'sp_012',
    targetId: 'sp_001',
    relationshipType: 'related_to',
    description: 'Clear error messages maintain professional, trustworthy tone'
  },
  {
    sourceId: 'sp_004',
    targetId: 'sp_005',
    relationshipType: 'related_to',
    description: 'Both enforce formal, professional language'
  },
  {
    sourceId: 'sp_006',
    targetId: 'sp_011',
    relationshipType: 'related_to',
    description: 'Currency and product naming both require precision'
  },

  // Additional CloudSync relationships (expanded constraints)
  {
    sourceId: 'cs_001',
    targetId: 'cs_004',
    relationshipType: 'related_to',
    description: 'Clear, helpful tone applies to file operations terminology'
  },
  {
    sourceId: 'cs_004',
    targetId: 'cs_005',
    relationshipType: 'related_to',
    description: 'File operations and action-oriented language both drive user productivity'
  },
  {
    sourceId: 'cs_003',
    targetId: 'cs_007',
    relationshipType: 'related_to',
    description: 'Error messages and API responses both require clear communication'
  },
  {
    sourceId: 'cs_006',
    targetId: 'cs_008',
    relationshipType: 'related_to',
    description: 'Keyboard navigation and file size display both enhance accessibility'
  },
  {
    sourceId: 'cs_009',
    targetId: 'cs_001',
    relationshipType: 'related_to',
    description: 'Onboarding tone sets expectations for overall product voice'
  },
  {
    sourceId: 'cs_002',
    targetId: 'cs_010',
    relationshipType: 'related_to',
    description: 'Brand naming and plan tier naming require consistency'
  },
  {
    sourceId: 'cs_005',
    targetId: 'cs_009',
    relationshipType: 'related_to',
    description: 'Action-oriented language drives onboarding engagement'
  },
  {
    sourceId: 'cs_007',
    targetId: 'cs_003',
    relationshipType: 'related_to',
    description: 'API standards ensure consistent technical communication'
  }
];

// Helper functions
export const getConstraintsByClient = (clientId: string): LanguageConstraint[] => {
  return allConstraints.filter(c => c.clientId === clientId);
};

export const getConstraintById = (id: string): LanguageConstraint | undefined => {
  return allConstraints.find(c => c.id === id);
};

export const getRelatedConstraints = (constraintId: string): LanguageConstraint[] => {
  const constraint = getConstraintById(constraintId);
  if (!constraint) return [];

  return constraint.relatedConstraintIds
    .map(id => getConstraintById(id))
    .filter((c): c is LanguageConstraint => c !== undefined);
};
