import type { LanguageConstraint } from '../types/index';

// Additional StreamFlix constraints to reach 47 total
export const additionalStreamflixConstraints: LanguageConstraint[] = [
  {
    id: 'sf_005',
    typeId: 'ct_grammar_voice',
    clientId: 'client_streaming',
    name: 'Active Voice Preference',
    rule: 'Always use active voice for calls-to-action and primary messaging',
    description: 'Active voice makes content more engaging and direct',
    languages: ['en-US', 'en-GB'],
    appliesTo: ['ui_text', 'marketing'],
    severity: 'medium',
    validationMethod: 'automated_with_review',
    examples: {
      approved: ['Watch now', 'Download the app', 'Create your profile'],
      rejected: ['Can be watched now', 'The app can be downloaded', 'Your profile can be created']
    },
    relatedConstraintIds: ['sf_001'],
    tags: ['grammar', 'voice', 'engagement'],
    createdDate: '2024-01-15',
    lastUpdated: '2024-02-01',
    source: 'Content Style Guide v3.0'
  },
  {
    id: 'sf_006',
    typeId: 'ct_term_ui',
    clientId: 'client_streaming',
    name: 'Playback Controls Terminology',
    rule: 'Use consistent playback terminology: Play/Pause, Skip Intro, Next Episode',
    description: 'Standard UI terminology for video controls',
    languages: ['en-US'],
    appliesTo: ['ui_text'],
    severity: 'high',
    validationMethod: 'automated',
    examples: {
      approved: ['Play', 'Pause', 'Skip Intro', 'Next Episode'],
      rejected: ['Start', 'Stop', 'Skip Opening', 'Continue to Next']
    },
    relatedConstraintIds: ['sf_004'],
    tags: ['ui', 'playback', 'controls'],
    createdDate: '2024-01-20',
    lastUpdated: '2024-01-20',
    source: 'Product UI Standards'
  },
  {
    id: 'sf_007',
    typeId: 'ct_cultural_regional',
    clientId: 'client_streaming',
    name: 'Regional Content Categories',
    rule: 'Use region-appropriate genre names (e.g., "Football" vs "Soccer")',
    description: 'Adapt content categories for regional audiences',
    languages: ['en-US', 'en-GB'],
    appliesTo: ['ui_text', 'marketing'],
    severity: 'medium',
    validationMethod: 'human_review',
    examples: {
      approved: ['Soccer (US)', 'Football (UK)', 'Anime (Global)'],
      rejected: ['Football (US)', 'Soccer (UK)']
    },
    relatedConstraintIds: [],
    tags: ['cultural', 'regional', 'sports'],
    createdDate: '2024-02-01',
    lastUpdated: '2024-03-15',
    source: 'Localization Team Guidelines'
  },
  {
    id: 'sf_008',
    typeId: 'ct_compliance_accessibility',
    clientId: 'client_streaming',
    name: 'Alt Text for Images',
    rule: 'All promotional images must have descriptive alt text',
    description: 'Required for accessibility compliance (WCAG 2.1 AA)',
    languages: ['en-US', 'es-ES', 'fr-FR'],
    appliesTo: ['marketing', 'ui_text'],
    severity: 'critical',
    validationMethod: 'automated_with_review',
    examples: {
      approved: ['Movie poster showing action scene from "Title"', 'Actor headshot portrait'],
      rejected: ['Image', 'Poster', 'Photo']
    },
    relatedConstraintIds: [],
    tags: ['accessibility', 'wcag', 'images'],
    createdDate: '2024-01-10',
    lastUpdated: '2024-01-10',
    source: 'Accessibility Standards Team'
  },
  {
    id: 'sf_009',
    typeId: 'ct_grammar_formatting',
    clientId: 'client_streaming',
    name: 'Title Case for Titles',
    rule: 'Use title case for show/movie titles, sentence case for descriptions',
    description: 'Consistent capitalization improves readability',
    languages: ['en-US'],
    appliesTo: ['ui_text', 'marketing'],
    severity: 'low',
    validationMethod: 'automated',
    examples: {
      approved: ['Stranger Things', 'The Crown', 'Breaking Bad'],
      rejected: ['stranger things', 'THE CROWN', 'breaking bad']
    },
    relatedConstraintIds: [],
    tags: ['formatting', 'capitalization', 'titles'],
    createdDate: '2024-01-15',
    lastUpdated: '2024-01-15',
    source: 'Content Formatting Guidelines'
  },
  {
    id: 'sf_010',
    typeId: 'ct_brand_tone',
    clientId: 'client_streaming',
    name: 'Error Message Tone',
    rule: 'Error messages should be helpful and empathetic, never blaming',
    description: 'Maintain positive brand experience even during errors',
    languages: ['en-US'],
    appliesTo: ['error_messages', 'ui_text'],
    severity: 'high',
    validationMethod: 'automated_with_review',
    examples: {
      approved: ["We're having trouble connecting. Check your network and try again", "Oops! Something went wrong. We're looking into it"],
      rejected: ['Connection failed', 'Error: Invalid input', 'Your connection is broken']
    },
    relatedConstraintIds: ['sf_001'],
    tags: ['tone', 'errors', 'user_experience'],
    createdDate: '2024-02-10',
    lastUpdated: '2024-02-10',
    source: 'Error Messaging Standards'
  },
  {
    id: 'sf_011',
    typeId: 'ct_term_product',
    clientId: 'client_streaming',
    name: 'Plan Names Consistency',
    rule: 'Always use exact plan names: "Basic", "Standard", "Premium"',
    description: 'Product tier names must be consistent across all content',
    languages: ['en-US', 'es-ES', 'fr-FR', 'de-DE'],
    appliesTo: ['ui_text', 'marketing', 'documentation'],
    severity: 'critical',
    validationMethod: 'automated',
    examples: {
      approved: ['StreamFlix Basic', 'StreamFlix Standard', 'StreamFlix Premium'],
      rejected: ['Basic Plan', 'Standard Tier', 'Premium Subscription']
    },
    relatedConstraintIds: ['sf_003'],
    tags: ['product', 'plans', 'branding'],
    createdDate: '2024-01-15',
    lastUpdated: '2024-01-15',
    source: 'Product Marketing'
  },
  {
    id: 'sf_012',
    typeId: 'ct_cultural_formats',
    clientId: 'client_streaming',
    name: 'Date Format by Region',
    rule: 'Use MM/DD/YYYY for US, DD/MM/YYYY for UK, YYYY-MM-DD for technical',
    description: 'Region-appropriate date formatting',
    languages: ['en-US', 'en-GB'],
    appliesTo: ['ui_text', 'documentation'],
    severity: 'medium',
    validationMethod: 'automated',
    examples: {
      approved: ['12/25/2024 (US)', '25/12/2024 (UK)', '2024-12-25 (Technical)'],
      rejected: ['25/12/2024 (US)', '12/25/2024 (UK)']
    },
    relatedConstraintIds: [],
    tags: ['formatting', 'dates', 'localization'],
    createdDate: '2024-01-15',
    lastUpdated: '2024-01-15',
    source: 'Localization Standards'
  },
  {
    id: 'sf_013',
    typeId: 'ct_brand_prohibited',
    clientId: 'client_streaming',
    name: 'Avoid Competitor References',
    rule: 'Never mention competitor names (Netflix, Hulu, Disney+, etc.)',
    description: 'Focus on own value proposition without competitor mentions',
    languages: ['en-US', 'es-ES', 'fr-FR', 'de-DE', 'ja-JP', 'pt-BR'],
    appliesTo: ['marketing', 'ui_text', 'documentation'],
    severity: 'critical',
    validationMethod: 'automated',
    examples: {
      approved: ['The leading streaming service', 'Top entertainment platform'],
      rejected: ['Better than Netflix', 'Netflix alternative', 'Like Hulu but better']
    },
    relatedConstraintIds: ['sf_002'],
    tags: ['prohibited', 'competitors', 'marketing'],
    createdDate: '2024-01-15',
    lastUpdated: '2024-02-01',
    source: 'Marketing Guidelines'
  },
  {
    id: 'sf_014',
    typeId: 'ct_technical_api',
    clientId: 'client_streaming',
    name: 'API Error Code Format',
    rule: 'API error codes must follow format: SF-[CATEGORY]-[NUMBER] (e.g., SF-AUTH-401)',
    description: 'Standardized error code format for API documentation',
    languages: ['en-US'],
    appliesTo: ['documentation', 'error_messages'],
    severity: 'high',
    validationMethod: 'automated',
    examples: {
      approved: ['SF-AUTH-401', 'SF-PLAY-503', 'SF-SEARCH-404'],
      rejected: ['ERROR_401', 'AUTH_ERROR', 'STREAMFLIX_AUTH_ERROR']
    },
    relatedConstraintIds: [],
    tags: ['api', 'error_codes', 'technical'],
    createdDate: '2024-03-01',
    lastUpdated: '2024-03-01',
    source: 'API Documentation Standards'
  }
];

// Additional SecurePay constraints to reach 62 total
export const additionalSecurepayConstraints: LanguageConstraint[] = [
  {
    id: 'sp_005',
    typeId: 'ct_grammar_voice',
    clientId: 'client_fintech',
    name: 'Passive Voice for Security',
    rule: 'Use passive voice for security events to depersonalize actions',
    description: 'Reduces user anxiety about security notifications',
    languages: ['en-US', 'en-GB'],
    appliesTo: ['ui_text', 'notifications'],
    severity: 'medium',
    validationMethod: 'automated_with_review',
    examples: {
      approved: ['Your password was changed', 'A new device was added', 'Access was granted'],
      rejected: ['You changed your password', 'You added a device', 'You granted access']
    },
    relatedConstraintIds: ['sp_001'],
    tags: ['security', 'voice', 'notifications'],
    createdDate: '2024-02-05',
    lastUpdated: '2024-02-05',
    source: 'Security Communications Guide'
  },
  {
    id: 'sp_006',
    typeId: 'ct_cultural_formats',
    clientId: 'client_fintech',
    name: 'Currency Formatting',
    rule: 'Always use proper currency symbols with 2 decimal places: $1,234.56',
    description: 'Standard currency display format',
    languages: ['en-US', 'en-GB'],
    appliesTo: ['ui_text', 'documentation'],
    severity: 'high',
    validationMethod: 'automated',
    examples: {
      approved: ['$1,234.56', '€1.234,56', '£1,234.56'],
      rejected: ['$1234.5', '1234.56 USD', '$1234']
    },
    relatedConstraintIds: [],
    tags: ['currency', 'formatting', 'financial'],
    createdDate: '2024-02-01',
    lastUpdated: '2024-02-01',
    source: 'Financial Display Standards'
  },
  {
    id: 'sp_007',
    typeId: 'ct_compliance_regulatory',
    clientId: 'client_fintech',
    name: 'FDIC Insurance Disclosure',
    rule: 'All deposit account content must include FDIC insurance disclosure',
    description: 'Required by federal banking regulations',
    languages: ['en-US'],
    appliesTo: ['marketing', 'ui_text', 'legal'],
    severity: 'critical',
    validationMethod: 'human_review',
    examples: {
      approved: ['FDIC insured up to $250,000', 'Member FDIC'],
      rejected: ['Insured', 'Protected by insurance']
    },
    relatedConstraintIds: ['sp_002'],
    tags: ['regulatory', 'fdic', 'legal'],
    createdDate: '2024-02-01',
    lastUpdated: '2024-02-01',
    source: 'Legal Compliance / FDIC Requirements'
  },
  {
    id: 'sp_008',
    typeId: 'ct_term_ui',
    clientId: 'client_fintech',
    name: 'Account Action Verbs',
    rule: 'Use specific verbs: "Deposit", "Withdraw", "Transfer" (not generic "Move" or "Send")',
    description: 'Precise financial terminology reduces confusion',
    languages: ['en-US', 'en-GB'],
    appliesTo: ['ui_text'],
    severity: 'high',
    validationMethod: 'automated',
    examples: {
      approved: ['Deposit funds', 'Withdraw to bank', 'Transfer between accounts'],
      rejected: ['Move money', 'Send funds', 'Put money in']
    },
    relatedConstraintIds: ['sp_003'],
    tags: ['terminology', 'actions', 'precision'],
    createdDate: '2024-02-05',
    lastUpdated: '2024-02-05',
    source: 'Product Terminology Guide'
  },
  {
    id: 'sp_009',
    typeId: 'ct_compliance_accessibility',
    clientId: 'client_fintech',
    name: 'Screen Reader Compatibility',
    rule: 'All financial data must have ARIA labels for screen readers',
    description: 'WCAG 2.1 AA compliance for financial information',
    languages: ['en-US'],
    appliesTo: ['ui_text'],
    severity: 'critical',
    validationMethod: 'automated_with_review',
    examples: {
      approved: ['aria-label="Account balance: $1,234.56"', 'aria-label="Available credit: $5,000"'],
      rejected: ['$1,234.56', 'Balance: $1,234.56']
    },
    relatedConstraintIds: [],
    tags: ['accessibility', 'aria', 'screen_readers'],
    createdDate: '2024-02-01',
    lastUpdated: '2024-02-01',
    source: 'Accessibility Team'
  },
  {
    id: 'sp_010',
    typeId: 'ct_brand_tone',
    clientId: 'client_fintech',
    name: 'Fraud Alert Tone',
    rule: 'Fraud alerts must be clear and urgent without causing panic',
    description: 'Balance urgency with reassurance in security communications',
    languages: ['en-US', 'en-GB'],
    appliesTo: ['notifications', 'ui_text'],
    severity: 'high',
    validationMethod: 'human_review',
    examples: {
      approved: ['Unusual activity detected. Please review immediately', 'We paused your card for security. Contact us to resolve'],
      rejected: ['FRAUD ALERT!!!', 'Your account has been compromised', 'Someone stole your card!']
    },
    relatedConstraintIds: ['sp_001'],
    tags: ['security', 'fraud', 'tone'],
    createdDate: '2024-02-10',
    lastUpdated: '2024-02-10',
    source: 'Security Communications Guide'
  },
  {
    id: 'sp_011',
    typeId: 'ct_term_product',
    clientId: 'client_fintech',
    name: 'Card Product Names',
    rule: 'Official card names: "SecurePay Platinum", "SecurePay Business", "SecurePay Rewards"',
    description: 'Consistent product naming across all channels',
    languages: ['en-US', 'en-GB'],
    appliesTo: ['marketing', 'ui_text', 'documentation'],
    severity: 'critical',
    validationMethod: 'automated',
    examples: {
      approved: ['SecurePay Platinum', 'SecurePay Business', 'SecurePay Rewards'],
      rejected: ['Platinum Card', 'Business Card', 'Rewards Card']
    },
    relatedConstraintIds: [],
    tags: ['product', 'cards', 'branding'],
    createdDate: '2024-02-01',
    lastUpdated: '2024-02-01',
    source: 'Product Marketing'
  },
  {
    id: 'sp_012',
    typeId: 'ct_technical_error',
    clientId: 'client_fintech',
    name: 'Error Message Clarity',
    rule: 'Error messages must explain issue and provide resolution steps',
    description: 'Help users resolve issues independently when possible',
    languages: ['en-US'],
    appliesTo: ['error_messages', 'ui_text'],
    severity: 'high',
    validationMethod: 'automated_with_review',
    examples: {
      approved: ['Insufficient funds. Add money to complete this transaction', 'Daily limit reached. Try again tomorrow or increase your limit in settings'],
      rejected: ['Transaction failed', 'Error 4001', 'Cannot process']
    },
    relatedConstraintIds: [],
    tags: ['errors', 'clarity', 'ux'],
    createdDate: '2024-02-15',
    lastUpdated: '2024-02-15',
    source: 'UX Writing Standards'
  },
  {
    id: 'sp_013',
    typeId: 'ct_compliance_legal',
    clientId: 'client_fintech',
    name: 'APR Disclosure',
    rule: 'All credit offers must display APR prominently and clearly',
    description: 'Required by Truth in Lending Act (TILA)',
    languages: ['en-US'],
    appliesTo: ['marketing', 'ui_text'],
    severity: 'critical',
    validationMethod: 'human_review',
    examples: {
      approved: ['15.99% APR variable', 'Annual Percentage Rate (APR): 18.24%'],
      rejected: ['Low rates', 'Competitive APR', 'Great rates']
    },
    relatedConstraintIds: ['sp_002', 'sp_007'],
    tags: ['legal', 'apr', 'credit', 'tila'],
    createdDate: '2024-02-01',
    lastUpdated: '2024-02-01',
    source: 'Legal Compliance / TILA'
  }
];

// Additional CloudSync constraints to reach 38 total
export const additionalCloudsyncConstraints: LanguageConstraint[] = [
  {
    id: 'cs_004',
    typeId: 'ct_term_ui',
    clientId: 'client_saas',
    name: 'File Operation Terminology',
    rule: 'Use: "Upload", "Download", "Share", "Move" (not "Send", "Get", "Give access")',
    description: 'Standard file operation terminology',
    languages: ['en-US'],
    appliesTo: ['ui_text'],
    severity: 'medium',
    validationMethod: 'automated',
    examples: {
      approved: ['Upload file', 'Download to device', 'Share with team', 'Move to folder'],
      rejected: ['Send file', 'Get file', 'Give access', 'Put in folder']
    },
    relatedConstraintIds: [],
    tags: ['terminology', 'file_operations'],
    createdDate: '2024-03-01',
    lastUpdated: '2024-03-01',
    source: 'Product Terminology'
  },
  {
    id: 'cs_005',
    typeId: 'ct_grammar_voice',
    clientId: 'client_saas',
    name: 'Action-Oriented Language',
    rule: 'Use imperative voice for instructions and CTAs',
    description: 'Direct, actionable language improves task completion',
    languages: ['en-US'],
    appliesTo: ['ui_text', 'help_documentation'],
    severity: 'medium',
    validationMethod: 'automated_with_review',
    examples: {
      approved: ['Click to upload', 'Drag files here', 'Select a folder'],
      rejected: ['You can click to upload', 'Files can be dragged here', 'A folder should be selected']
    },
    relatedConstraintIds: ['cs_001'],
    tags: ['grammar', 'actions', 'instructions'],
    createdDate: '2024-03-01',
    lastUpdated: '2024-03-01',
    source: 'UX Writing Guide'
  },
  {
    id: 'cs_006',
    typeId: 'ct_compliance_accessibility',
    clientId: 'client_saas',
    name: 'Keyboard Navigation Labels',
    rule: 'All interactive elements must have keyboard-accessible labels',
    description: 'WCAG 2.1 Level AA keyboard accessibility',
    languages: ['en-US'],
    appliesTo: ['ui_text'],
    severity: 'critical',
    validationMethod: 'automated',
    examples: {
      approved: ['Press Enter to upload', 'Tab to navigate', 'Ctrl+S to save'],
      rejected: ['Click here', 'Use mouse', 'Drag to upload']
    },
    relatedConstraintIds: [],
    tags: ['accessibility', 'keyboard', 'wcag'],
    createdDate: '2024-03-01',
    lastUpdated: '2024-03-01',
    source: 'Accessibility Standards'
  },
  {
    id: 'cs_007',
    typeId: 'ct_technical_api',
    clientId: 'client_saas',
    name: 'API Response Format',
    rule: 'API docs must show response format with HTTP status codes',
    description: 'Standardized API documentation format',
    languages: ['en-US'],
    appliesTo: ['documentation'],
    severity: 'high',
    validationMethod: 'automated_with_review',
    examples: {
      approved: ['200 OK: Success', '404 Not Found: File does not exist', '429 Too Many Requests: Rate limit exceeded'],
      rejected: ['Success', 'Error', 'Failed']
    },
    relatedConstraintIds: ['cs_003'],
    tags: ['api', 'documentation', 'http'],
    createdDate: '2024-03-10',
    lastUpdated: '2024-03-10',
    source: 'API Documentation Team'
  },
  {
    id: 'cs_008',
    typeId: 'ct_cultural_formats',
    clientId: 'client_saas',
    name: 'File Size Display',
    rule: 'Display file sizes using appropriate units: bytes, KB, MB, GB, TB',
    description: 'User-friendly file size formatting',
    languages: ['en-US', 'ja-JP', 'ko-KR', 'zh-CN'],
    appliesTo: ['ui_text'],
    severity: 'low',
    validationMethod: 'automated',
    examples: {
      approved: ['1.5 MB', '245 KB', '3.2 GB'],
      rejected: ['1500000 bytes', '1.5MB', '3GB']
    },
    relatedConstraintIds: [],
    tags: ['formatting', 'file_sizes', 'units'],
    createdDate: '2024-03-01',
    lastUpdated: '2024-03-01',
    source: 'Display Standards'
  },
  {
    id: 'cs_009',
    typeId: 'ct_brand_tone',
    clientId: 'client_saas',
    name: 'Onboarding Tone',
    rule: 'Onboarding content should be encouraging and educational',
    description: 'Help new users feel confident and supported',
    languages: ['en-US'],
    appliesTo: ['ui_text', 'help_documentation'],
    severity: 'medium',
    validationMethod: 'human_review',
    examples: {
      approved: ["Let's get you started", "You're doing great", "Here's how to make the most of CloudSync"],
      rejected: ['Complete these required steps', 'You must configure settings', 'Mandatory setup']
    },
    relatedConstraintIds: ['cs_001'],
    tags: ['onboarding', 'tone', 'new_users'],
    createdDate: '2024-03-05',
    lastUpdated: '2024-03-05',
    source: 'Onboarding Experience Guide'
  },
  {
    id: 'cs_010',
    typeId: 'ct_term_product',
    clientId: 'client_saas',
    name: 'Plan Tier Names',
    rule: 'Official plan names: "CloudSync Free", "CloudSync Pro", "CloudSync Business", "CloudSync Enterprise"',
    description: 'Consistent product tier naming',
    languages: ['en-US', 'ja-JP', 'ko-KR', 'zh-CN'],
    appliesTo: ['ui_text', 'marketing', 'documentation'],
    severity: 'critical',
    validationMethod: 'automated',
    examples: {
      approved: ['CloudSync Free', 'CloudSync Pro', 'CloudSync Business', 'CloudSync Enterprise'],
      rejected: ['Free Plan', 'Professional', 'Business Plan', 'Enterprise Edition']
    },
    relatedConstraintIds: ['cs_002'],
    tags: ['product', 'plans', 'branding'],
    createdDate: '2024-03-01',
    lastUpdated: '2024-03-01',
    source: 'Product Marketing'
  }
];
