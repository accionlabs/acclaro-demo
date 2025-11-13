import type {
  LanguageConstraint,
  ValidationResult,
  ConstraintViolation,
  ConstraintSuggestion,
} from '../types/index';

// Extract key terms from constraint examples for smarter matching
const extractKeyTerms = (constraint: LanguageConstraint): { rejected: string[], approved: string[] } => {
  // Special handling for specific constraint types
  const typeId = constraint.typeId;

  // For brand name constraints, extract the brand name variations
  if (typeId === 'ct_term_product' || constraint.name.includes('Brand Name')) {
    // Determine which brand we're checking
    let brandName = '';
    let correctForm = '';

    // Check approved examples to find the correct form
    const approvedText = constraint.examples.approved.join(' ');
    if (approvedText.includes('StreamFlix')) {
      brandName = 'streamflix';
      correctForm = 'StreamFlix';
    } else if (approvedText.includes('CloudSync')) {
      brandName = 'cloudsync';
      correctForm = 'CloudSync';
    } else if (approvedText.includes('SecurePay')) {
      brandName = 'securepay';
      correctForm = 'SecurePay';
    }

    if (brandName && correctForm) {
      // Build list of incorrect variations (case-insensitive match but NOT the correct form)
      const rejectedTerms: string[] = [];

      // Add common incorrect capitalizations
      const variations = [
        brandName.toLowerCase(), // all lowercase
        brandName.charAt(0).toUpperCase() + brandName.slice(1).toLowerCase(), // First letter only
        brandName.toUpperCase(), // all uppercase
      ];

      // Only include variations that are NOT the correct form
      variations.forEach(variant => {
        if (variant !== correctForm) {
          rejectedTerms.push(variant);
        }
      });

      if (rejectedTerms.length > 0) {
        return { rejected: rejectedTerms, approved: [correctForm] };
      }
    }
  }

  // For terminology constraints, extract key terms
  if (typeId === 'ct_term_ui' || typeId === 'ct_brand_prohibited') {
    // For UI terminology, we want to match specific phrases
    const rejectedTerms = constraint.examples.rejected.flatMap(ex => {
      // Look for key distinguishing terms (usually 1-3 words)
      if (ex.includes('Watch List')) return ['Watch List'];
      if (ex.includes('Watchlist')) return ['Watchlist'];
      if (ex.includes('Favorites')) return ['Favorites'];
      if (ex.includes('buffering')) return ['buffering'];
      if (ex.includes('Buffering')) return ['Buffering'];
      if (ex.includes('Click here')) return ['Click here'];
      if (ex.includes('click here')) return ['click here'];
      if (ex.includes('System is down')) return ['System is down', 'system is down'];
      if (ex.includes('down')) return ['down'];
      if (ex.includes('guaranteed')) return ['guaranteed'];
      if (ex.includes('risk-free')) return ['risk-free'];
      if (ex.includes('Risk-free')) return ['Risk-free'];

      // Default: return the full phrase
      return [ex];
    });

    return { rejected: rejectedTerms, approved: [] };
  }

  // Default: use full examples
  return { rejected: constraint.examples.rejected, approved: constraint.examples.approved };
};

export const validateContent = (
  content: string,
  constraints: LanguageConstraint[],
  contentType: string,
  language: string = 'en-US'
): ValidationResult => {
  const violations: ConstraintViolation[] = [];
  const suggestions: ConstraintSuggestion[] = [];

  // Filter applicable constraints
  const applicableConstraints = constraints.filter(
    (c) => c.appliesTo.includes(contentType) && c.languages.includes(language)
  );

  // Check each constraint
  applicableConstraints.forEach((constraint) => {
    const terms = extractKeyTerms(constraint);

    // Check rejected terms with smart extraction
    if (terms.rejected.length > 0 && terms.rejected !== constraint.examples.rejected) {
      // Use extracted key terms (smart matching)
      const isBrandNameConstraint = constraint.typeId === 'ct_term_product' || constraint.name.includes('Brand Name');

      terms.rejected.forEach((rejectedTerm) => {
        // Use word boundary matching for better accuracy
        const pattern = rejectedTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // For brand names, use case-sensitive matching. For others, case-insensitive.
        const flags = isBrandNameConstraint ? 'g' : 'gi';
        const regex = new RegExp(`\\b${pattern}\\b`, flags);
        let match;

        while ((match = regex.exec(content)) !== null) {
          // Find corresponding approved term if available
          const suggestedFix = terms.approved.length > 0 ? terms.approved[0] :
            constraint.examples.approved.length > 0 ? constraint.examples.approved[0] : '';

          violations.push({
            constraintId: constraint.id,
            constraintName: constraint.name,
            severity: constraint.severity,
            description: `Violates constraint: ${constraint.rule}`,
            location: {
              start: match.index,
              end: match.index + match[0].length,
              text: match[0],
            },
            suggestion: suggestedFix,
            autoFixAvailable: suggestedFix.length > 0,
          });
        }
      });
    } else {
      // Use full phrase examples for exact matches (fallback for complex constraints)
      constraint.examples.rejected.forEach((rejectedExample) => {
        const regex = new RegExp(rejectedExample.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        let match;

        while ((match = regex.exec(content)) !== null) {
          const suggestedFix =
            constraint.examples.approved.length > 0 ? constraint.examples.approved[0] : '';

          violations.push({
            constraintId: constraint.id,
            constraintName: constraint.name,
            severity: constraint.severity,
            description: `Violates constraint: ${constraint.rule}`,
            location: {
              start: match.index,
              end: match.index + match[0].length,
              text: match[0],
            },
            suggestion: suggestedFix,
            autoFixAvailable: suggestedFix.length > 0,
          });
        }
      });
    }

    // Add suggestions based on approved examples
    if (constraint.severity === 'suggestion' || constraint.severity === 'low') {
      if (constraint.examples.approved.length > 0) {
        suggestions.push({
          constraintId: constraint.id,
          constraintName: constraint.name,
          description: constraint.description,
          alternativeText: constraint.examples.approved[0],
          rationale: `Consider using: "${constraint.examples.approved[0]}"`,
        });
      }
    }
  });

  // Calculate overall status
  const criticalViolations = violations.filter((v) => v.severity === 'critical');
  const highViolations = violations.filter((v) => v.severity === 'high');

  let overallStatus: 'pass' | 'fail' | 'warning' = 'pass';
  if (criticalViolations.length > 0 || highViolations.length > 0) {
    overallStatus = 'fail';
  } else if (violations.length > 0) {
    overallStatus = 'warning';
  }

  // Calculate agent confidence (mock calculation)
  const agentConfidence =
    violations.length === 0 ? 0.95 : Math.max(0.6, 1 - violations.length * 0.1);

  // Require human review for edge cases
  const requiresHumanReview =
    violations.some((v) => v.severity === 'critical') || agentConfidence < 0.7;

  return {
    contentId: `content_${Date.now()}`,
    overallStatus,
    violations,
    suggestions,
    validatedAt: new Date().toISOString(),
    agentConfidence,
    requiresHumanReview,
  };
};

export const applyFix = (
  content: string,
  violation: ConstraintViolation
): string => {
  if (!violation.autoFixAvailable || !violation.suggestion) {
    return content;
  }

  const before = content.substring(0, violation.location.start);
  const after = content.substring(violation.location.end);

  return before + violation.suggestion + after;
};

export const getSeverityColor = (severity: string): string => {
  const colors: Record<string, string> = {
    critical: 'text-red-600 bg-red-50 border-red-200',
    high: 'text-orange-600 bg-orange-50 border-orange-200',
    medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    low: 'text-blue-600 bg-blue-50 border-blue-200',
    suggestion: 'text-gray-600 bg-gray-50 border-gray-200',
  };
  return colors[severity] || colors.suggestion;
};

export const getSeverityIcon = (severity: string): string => {
  const icons: Record<string, string> = {
    critical: '🔴',
    high: '🟡',
    medium: '🟠',
    low: '🔵',
    suggestion: '💡',
  };
  return icons[severity] || icons.suggestion;
};
