import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { clients } from '../data/clients';
import { getConstraintsByClient, getConstraintById, constraintRelationships } from '../data/constraints';
import { constraintTypes } from '../data/constraintTypes';
import type { LanguageConstraint, ValidationResult } from '../types/index';
import ConstraintGraphD3 from '../components/ConstraintGraphD3';
import { validateContent, applyFix, getSeverityColor, getSeverityIcon } from '../utils/validation';

const KnowledgeGraphDemo = () => {
  const navigate = useNavigate();
  const [selectedClientId, setSelectedClientId] = useState('client_streaming');
  const [selectedConstraint, setSelectedConstraint] = useState<LanguageConstraint | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  // Validation state
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState('ui_text');
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isValidationExpanded, setIsValidationExpanded] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  clients.find((c) => c.id === selectedClientId);
  const constraints = getConstraintsByClient(selectedClientId);
  const filteredConstraints = filterCategory
    ? constraints.filter((c) => {
        const type = constraintTypes.find((t) => t.id === c.typeId);
        return type?.category === filterCategory;
      })
    : constraints;

  // Auto-select first constraint if none selected
  useEffect(() => {
    if (!selectedConstraint && filteredConstraints.length > 0) {
      setSelectedConstraint(filteredConstraints[0]);
    }
  }, [filteredConstraints, selectedConstraint]);

  // Get related constraints
  const relatedConstraintIds = selectedConstraint
    ? [
        ...constraintRelationships
          .filter((r) => r.sourceId === selectedConstraint.id)
          .map((r) => r.targetId),
        ...constraintRelationships
          .filter((r) => r.targetId === selectedConstraint.id)
          .map((r) => r.sourceId),
      ]
    : [];

  const relatedConstraints = relatedConstraintIds
    .map((id) => getConstraintById(id))
    .filter((c): c is LanguageConstraint => c !== undefined);

  // Get category counts
  const categoryCount = (category: string) =>
    constraints.filter((c) => {
      const type = constraintTypes.find((t) => t.id === c.typeId);
      return type?.category === category;
    }).length;

  // Validation handlers
  const handleValidate = () => {
    const result = validateContent(content, constraints, contentType);
    setValidationResult(result);
  };

  const handleApplyFix = (index: number) => {
    if (!validationResult) return;
    const violation = validationResult.violations[index];
    const newContent = applyFix(content, violation);
    setContent(newContent);
    // Auto re-validate
    setTimeout(() => handleValidate(), 100);
  };

  const handleViolationClick = (constraintId: string) => {
    const constraint = getConstraintById(constraintId);
    if (constraint) {
      setSelectedConstraint(constraint);
    }
  };

  const categories = [
    { id: 'brand_identity', name: 'Brand Identity', color: '#3b82f6' },
    { id: 'terminology', name: 'Terminology', color: '#10b981' },
    { id: 'grammar_style', name: 'Grammar & Style', color: '#f59e0b' },
    { id: 'cultural_localization', name: 'Cultural', color: '#a855f7' },
    { id: 'compliance_legal', name: 'Compliance', color: '#ef4444' },
    { id: 'technical_content', name: 'Technical', color: '#14b8a6' },
  ];

  // Sample strings for demo - organized by client and content type
  const sampleStrings: Record<string, Record<string, Record<string, string>>> = {
    client_streaming: {
      ui_text: {
        with_violations: "Welcome to Streamflix! Buffering in progress. Click here to start. Add to Watch List.",
        without_violations: "Welcome to StreamFlix! Preparing your video. Select to start. Add to My List.",
      },
      marketing: {
        with_violations: "Streamflix Originals - Better than Netflix! Click here to subscribe. Unlimited streaming guaranteed!",
        without_violations: "StreamFlix Originals - Award-winning entertainment. Discover your next favorite show. Start watching now.",
      },
      error_messages: {
        with_violations: "Error: Buffering failed. Stream initialization error. Your connection is broken.",
        without_violations: "We're having trouble playing this video. Check your connection and try again. Need help? Contact support.",
      },
      documentation: {
        with_violations: "Streamflix uses advanced codec technology for buffering. Click here for technical specs.",
        without_violations: "StreamFlix uses advanced video technology for smooth playback. Learn more about our video quality.",
      },
    },
    client_fintech: {
      ui_text: {
        with_violations: "Great returns! Check your funds. Send money to friends. Risk-free banking!",
        without_violations: "View account balance. Transfer between accounts. Review recent transactions. Your deposits are FDIC insured up to $250,000.",
      },
      marketing: {
        with_violations: "Amazing returns guaranteed! Zero risk investment! Get rich quick with our platform!",
        without_violations: "Investment value may fluctuate. Past performance does not guarantee future results. Deposits are FDIC insured up to $250,000.",
      },
      error_messages: {
        with_violations: "Transaction failed. Error 4001. Cannot process payment.",
        without_violations: "Insufficient funds. Add money to complete this transaction or try again with a different account.",
      },
      documentation: {
        with_violations: "Our Platinum Card offers great rates and risk-free investing options.",
        without_violations: "The SecurePay Platinum card offers competitive rates. Investment products are not FDIC insured and may lose value. Annual Percentage Rate (APR): 15.99% variable.",
      },
    },
    client_saas: {
      ui_text: {
        with_violations: "Welcome to Cloudsync! Click here to upload. System is down for maintenance.",
        without_violations: "Welcome to CloudSync! Select to upload. System maintenance in progress - we'll be back shortly.",
      },
      marketing: {
        with_violations: "Cloudsync - guaranteed 100% uptime! Never lose your files! Click here now!",
        without_violations: "CloudSync - High availability service for your important files. Sync your files across all devices.",
      },
      error_messages: {
        with_violations: "Error: SYNC_FAILED_ERR_001. Operation failed. System is down.",
        without_violations: "Unable to sync. Check your internet connection and try again. Storage limit reached? Upgrade your plan.",
      },
      documentation: {
        with_violations: "Cloudsync Free plan offers unlimited storage. Click here to get started.",
        without_violations: "CloudSync Free plan offers 5GB storage. CloudSync Pro provides 100GB. Learn more about our plans.",
      },
    },
  };

  const loadSample = (withViolations: boolean) => {
    const clientSamples = sampleStrings[selectedClientId];
    if (clientSamples && clientSamples[contentType]) {
      setContent(withViolations ? clientSamples[contentType].with_violations : clientSamples[contentType].without_violations);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col p-4 lg:p-6">
      {/* Compact Header and Client Selection - Single Row */}
      <div className="bg-white rounded-xl shadow-lg p-3 mb-3 flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Knowledge Graph Explorer
            </h1>
            <p className="text-xs text-gray-600">
              Interactive exploration of client constraint ontologies
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="px-3 py-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all text-gray-700 text-xs font-semibold"
          >
            ← Back
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {clients.map((client) => (
            <button
              key={client.id}
              onClick={() => {
                setSelectedClientId(client.id);
                setSelectedConstraint(null);
                setFilterCategory(null);
              }}
              className={`p-2 rounded-lg border-2 transition-all text-left ${
                selectedClientId === client.id
                  ? 'border-primary-500 bg-primary-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-bold text-gray-900 text-xs mb-0.5">
                {client.name}
              </div>
              <div className="text-xs text-gray-600">{client.industry}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Graph Overlay */}
      {isFullScreen && (
        <div className="fixed inset-0 z-50 bg-gray-50 p-4 flex gap-4">
          {/* Graph in Fullscreen */}
          <div className={`bg-white rounded-xl shadow-lg flex flex-col min-h-0 ${selectedConstraint ? 'flex-1' : 'w-full'}`}>
            <div className="p-4 border-b flex-shrink-0 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Knowledge Graph
              </h2>
              <button
                onClick={() => setIsFullScreen(false)}
                className="px-3 py-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all text-gray-700 text-xs font-semibold flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Exit Fullscreen
              </button>
            </div>
            <div className="flex-1 relative min-h-0">
              <ConstraintGraphD3
                constraints={filteredConstraints}
                onNodeClick={setSelectedConstraint}
                selectedConstraintId={selectedConstraint?.id}
                filterCategory={filterCategory}
              />
            </div>
          </div>

          {/* Constraint Details Panel in Fullscreen */}
          {selectedConstraint && (
            <div className="w-96 bg-white rounded-xl shadow-lg flex flex-col min-h-0">
              <div className="overflow-y-auto flex-1 p-4">
                <div className="space-y-4">
                  {/* Constraint Header */}
                  <div className="bg-white rounded-xl shadow-lg p-4">
                    <div className="mb-3">
                      <h2 className="text-xl font-bold text-gray-900 mb-2">
                        {selectedConstraint.name}
                      </h2>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getSeverityColor(
                          selectedConstraint.severity
                        )}`}
                      >
                        {selectedConstraint.severity.toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-semibold text-gray-700">Rule:</span>
                        <p className="text-gray-600 mt-1">{selectedConstraint.rule}</p>
                      </div>

                      <div>
                        <span className="font-semibold text-gray-700">Description:</span>
                        <p className="text-gray-600 mt-1">{selectedConstraint.description}</p>
                      </div>

                      <div>
                        <span className="font-semibold text-gray-700">Applies To:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedConstraint.appliesTo.map((type) => (
                            <span
                              key={type}
                              className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                            >
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="font-semibold text-gray-700">Languages:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedConstraint.languages.map((lang) => (
                            <span
                              key={lang}
                              className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Examples */}
                  <div className="bg-white rounded-xl shadow-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-3">Examples</h3>

                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-green-600 font-semibold text-sm">✓ Approved</span>
                        </div>
                        <div className="space-y-1">
                          {selectedConstraint.examples.approved.map((ex, i) => (
                            <div
                              key={i}
                              className="p-2 bg-green-50 border border-green-200 rounded text-sm text-gray-700"
                            >
                              {ex}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-red-600 font-semibold text-sm">✗ Rejected</span>
                        </div>
                        <div className="space-y-1">
                          {selectedConstraint.examples.rejected.map((ex, i) => (
                            <div
                              key={i}
                              className="p-2 bg-red-50 border border-red-200 rounded text-sm text-gray-700"
                            >
                              {ex}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Three Column Layout - Takes remaining height */}
      <div className="flex-1 grid lg:grid-cols-12 gap-4 min-h-0">
        {/* Left Panel - Constraints List */}
        <div className="lg:col-span-2 flex flex-col gap-4 min-h-0">
          {/* Category Filter */}
          <div className="bg-white rounded-xl shadow-lg p-3 flex-shrink-0">
            <h3 className="text-sm font-bold text-gray-900 mb-2">
              Filter by Category
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => setFilterCategory(null)}
                className={`w-full text-left px-3 py-1.5 rounded-lg transition-all text-xs ${
                  filterCategory === null
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                All Categories ({constraints.length})
              </button>
              {categories.map((category) => {
                const count = categoryCount(category.id);
                return (
                  <button
                    key={category.id}
                    onClick={() => setFilterCategory(category.id)}
                    disabled={count === 0}
                    className={`w-full text-left px-3 py-1.5 rounded-lg transition-all flex justify-between items-center text-xs ${
                      filterCategory === category.id
                        ? 'shadow-md'
                        : 'hover:shadow'
                    } ${count === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    style={{
                      backgroundColor:
                        filterCategory === category.id ? category.color : undefined,
                      color: filterCategory === category.id ? 'white' : undefined,
                    }}
                  >
                    <span>{category.name}</span>
                    <span className="text-xs">({count})</span>
                  </button>
                );
              })}
              </div>
            </div>

          {/* Constraints List - Scrollable */}
          <div className="bg-white rounded-xl shadow-lg flex-1 flex flex-col min-h-0">
            <div className="p-4 border-b flex-shrink-0">
              <h3 className="text-lg font-bold text-gray-900">
                Constraints ({filteredConstraints.length})
              </h3>
            </div>
            <div className="overflow-y-auto flex-1 p-4">
              <div className="space-y-2">
                {filteredConstraints.map((constraint) => (
                  <button
                    key={constraint.id}
                    onClick={() => setSelectedConstraint(constraint)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                      selectedConstraint?.id === constraint.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 text-sm truncate">
                          {constraint.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {constraint.appliesTo.join(', ')}
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold border ${getSeverityColor(
                          constraint.severity
                        )}`}
                      >
                        {constraint.severity}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center Panel - Graph Visualization and Validation */}
        <div className="lg:col-span-6 flex flex-col gap-4 min-h-0">
          {/* Graph Visualization */}
          <div className="bg-white rounded-xl shadow-lg flex-1 flex flex-col min-h-0">
            <div className="p-4 border-b flex-shrink-0 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Knowledge Graph
              </h2>
              <button
                onClick={() => setIsFullScreen(true)}
                className="px-3 py-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all text-gray-700 text-xs font-semibold flex items-center gap-1"
                title="Fullscreen"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                Fullscreen
              </button>
            </div>
            <div className="flex-1 relative min-h-0">
              <ConstraintGraphD3
                constraints={filteredConstraints}
                onNodeClick={setSelectedConstraint}
                selectedConstraintId={selectedConstraint?.id}
                filterCategory={filterCategory}
              />
            </div>
          </div>

          {/* Validation Panel - Collapsible */}
          <div className="bg-white rounded-xl shadow-lg flex-shrink-0" style={{
            height: isValidationExpanded ? '350px' : 'auto',
            display: 'flex',
            flexDirection: 'column'
          }}>
              <div
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors border-b"
                onClick={() => setIsValidationExpanded(!isValidationExpanded)}
              >
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  Content Validation
                  {validationResult && (
                    <span className={`px-2 py-0.5 text-xs rounded-full font-semibold ${
                      validationResult.overallStatus === 'pass' ? 'bg-green-100 text-green-700' :
                      validationResult.overallStatus === 'fail' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {validationResult.violations.length} {validationResult.violations.length === 1 ? 'Issue' : 'Issues'}
                    </span>
                  )}
                </h3>
                <button className="text-gray-500 hover:text-gray-700 transition-colors">
                  <svg
                    className={`w-5 h-5 transform transition-transform ${isValidationExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {isValidationExpanded && (
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Content Type
                      </label>
                      <select
                        value={contentType}
                        onChange={(e) => setContentType(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="ui_text">UI Text</option>
                        <option value="marketing">Marketing</option>
                        <option value="documentation">Documentation</option>
                        <option value="error_messages">Error Messages</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={handleValidate}
                        disabled={!content}
                        className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold text-sm"
                      >
                        Validate Content
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => loadSample(true)}
                        className="px-3 py-1 text-xs bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-all font-semibold"
                      >
                        Load Sample (With Violations)
                      </button>
                      <button
                        onClick={() => loadSample(false)}
                        className="px-3 py-1 text-xs bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition-all font-semibold"
                      >
                        Load Sample (Clean)
                      </button>
                    </div>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Enter content to validate against constraints..."
                      className="w-full h-24 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                    />
                  </div>

                  {/* Validation Results */}
                  {validationResult && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          validationResult.overallStatus === 'pass'
                            ? 'bg-green-100 text-green-700'
                            : validationResult.overallStatus === 'fail'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {validationResult.overallStatus.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-600">
                          {validationResult.violations.length} violation(s) found
                        </span>
                      </div>

                      {validationResult.violations.length > 0 && (
                        <div className="space-y-2">
                          {validationResult.violations.map((violation, index) => (
                            <div
                              key={index}
                              onClick={() => handleViolationClick(violation.constraintId)}
                              className={`p-2 rounded-lg border-2 transition-all cursor-pointer ${
                                selectedConstraint?.id === violation.constraintId
                                  ? 'bg-blue-50 border-blue-500 shadow-md'
                                  : 'bg-gray-50 border-gray-200 hover:border-blue-300 hover:shadow-sm'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span>{getSeverityIcon(violation.severity)}</span>
                                    <span className="text-xs font-semibold text-gray-900">
                                      {violation.constraintName}
                                    </span>
                                    <span className="text-xs text-blue-600 ml-auto">
                                      Click to view →
                                    </span>
                                  </div>
                                  <div className="text-xs text-gray-600 mb-1">
                                    Violated: "<span className="font-mono bg-red-50 px-1 rounded">{violation.location.text}</span>"
                                  </div>
                                  {violation.suggestion && (
                                    <div className="text-xs text-gray-600">
                                      Suggested: "<span className="font-mono bg-green-50 px-1 rounded">{violation.suggestion}</span>"
                                    </div>
                                  )}
                                </div>
                                {violation.autoFixAvailable && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleApplyFix(index);
                                    }}
                                    className="px-2 py-1 bg-primary-600 text-white rounded text-xs hover:bg-primary-700"
                                  >
                                    Fix
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
          </div>
        </div>

        {/* Right Panel - Constraint Details - Scrollable */}
        <div className="lg:col-span-4 flex flex-col min-h-0">
          {selectedConstraint ? (
            <div className="bg-white rounded-xl shadow-lg flex-1 flex flex-col min-h-0">
              <div className="overflow-y-auto flex-1 p-4">
                <div className="space-y-4">
                  {/* Constraint Header */}
                  <div className="bg-white rounded-xl shadow-lg p-4">
                    <div className="mb-3">
                      <h2 className="text-xl font-bold text-gray-900 mb-2">
                        {selectedConstraint.name}
                      </h2>
                      <p className="text-sm text-gray-600">{selectedConstraint.description}</p>
                    </div>
                    <span
                      className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold border-2 ${getSeverityColor(
                        selectedConstraint.severity
                      )}`}
                    >
                      {selectedConstraint.severity.toUpperCase()}
                    </span>

                    <div className="mt-4 space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Validation:</span>
                        <span className="ml-2 font-semibold text-gray-900">
                          {selectedConstraint.validationMethod.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Applies To:</span>
                        <span className="ml-2 font-semibold text-gray-900">
                          {selectedConstraint.appliesTo.join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Rule */}
                  <div className="bg-white rounded-xl shadow-lg p-4">
                    <h3 className="text-base font-bold text-gray-900 mb-2">Rule</h3>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {selectedConstraint.rule}
                    </p>
                  </div>

                  {/* Examples */}
                  <div className="bg-white rounded-xl shadow-lg p-4">
                    <h3 className="text-base font-bold text-gray-900 mb-3">Examples</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold text-green-700 mb-2 flex items-center gap-2">
                          <span>✅</span> Approved
                        </h4>
                        <div className="space-y-1">
                          {selectedConstraint.examples.approved.map((ex, i) => (
                            <div
                              key={`approved-${i}`}
                              className="p-2 bg-green-50 border border-green-200 rounded text-xs"
                            >
                              "{ex}"
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-red-700 mb-2 flex items-center gap-2">
                          <span>❌</span> Rejected
                        </h4>
                        <div className="space-y-1">
                          {selectedConstraint.examples.rejected.map((ex, i) => (
                            <div
                              key={`rejected-${i}`}
                              className="p-2 bg-red-50 border border-red-200 rounded text-xs"
                            >
                              "{ex}"
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Related Constraints */}
                  {relatedConstraints.length > 0 && (
                    <div className="bg-white rounded-xl shadow-lg p-4">
                      <h3 className="text-base font-bold text-gray-900 mb-3">
                        Related Constraints
                      </h3>
                      <div className="space-y-2">
                        {relatedConstraints.map((rc) => (
                          <button
                            key={rc.id}
                            onClick={() => setSelectedConstraint(rc)}
                            className="w-full text-left p-2 bg-gradient-to-r from-blue-50 to-teal-50 hover:from-blue-100 hover:to-teal-100 rounded-lg transition-all"
                          >
                            <div className="font-semibold text-gray-900 text-xs">{rc.name}</div>
                            <div className="text-xs text-gray-600 mt-1">{rc.rule}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Metadata */}
                  <div className="bg-white rounded-xl shadow-lg p-4">
                    <h3 className="text-base font-bold text-gray-900 mb-3">Metadata</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Source:</span>
                        <span className="ml-2 font-semibold text-gray-900 text-xs">
                          {selectedConstraint.source}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Updated:</span>
                        <span className="ml-2 font-semibold text-gray-900 text-xs">
                          {selectedConstraint.lastUpdated}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Languages:</span>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {selectedConstraint.languages.map((lang) => (
                            <span
                              key={lang}
                              className="px-2 py-0.5 bg-gray-100 rounded-full text-xs font-semibold"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg flex-1 flex items-center justify-center">
              <div className="text-center p-12">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Select a Constraint
                </h3>
                <p className="text-gray-600">
                  Click on any constraint from the list to view its details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeGraphDemo;
