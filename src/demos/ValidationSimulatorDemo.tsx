import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clients } from '../data/clients';
import { getConstraintsByClient } from '../data/constraints';
import { validateContent, applyFix, getSeverityColor, getSeverityIcon } from '../utils/validation';
import type { ValidationResult } from '../types/index';

const ValidationSimulatorDemo = () => {
  const navigate = useNavigate();
  const [selectedClientId, setSelectedClientId] = useState('client_streaming');
  const [content, setContent] = useState('Welcome to Streamflix! Start buffering your favorite shows now.');
  const [contentType, setContentType] = useState('ui_text');
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);

  const selectedClient = clients.find((c) => c.id === selectedClientId);

  const handleValidate = () => {
    const constraints = getConstraintsByClient(selectedClientId);
    const result = validateContent(content, constraints, contentType);
    setValidationResult(result);
  };

  const handleApplyFix = (violationIndex: number) => {
    if (!validationResult) return;

    const violation = validationResult.violations[violationIndex];
    const fixedContent = applyFix(content, violation);
    setContent(fixedContent);

    // Re-validate after applying fix
    setTimeout(() => handleValidate(), 100);
  };

  const handleReset = () => {
    setContent('');
    setValidationResult(null);
  };

  const contentTypes = [
    { value: 'ui_text', label: 'UI Text' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'documentation', label: 'Documentation' },
    { value: 'error_messages', label: 'Error Messages' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Content Validation Simulator
            </h1>
            <p className="text-gray-600">
              Real-time validation against client-specific language constraints
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-white rounded-lg shadow hover:shadow-md transition-all text-gray-700 font-semibold"
          >
            ← Back
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Panel - Input */}
          <div className="lg:col-span-2 space-y-6">
            {/* Client Selection */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Client
              </label>
              <div className="grid grid-cols-3 gap-3">
                {clients.map((client) => (
                  <button
                    key={client.id}
                    onClick={() => {
                      setSelectedClientId(client.id);
                      setValidationResult(null);
                    }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedClientId === client.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 text-sm">
                      {client.name.split(' ')[0]}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {client.constraintCount} rules
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Input */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Content to Validate
                </label>
                <select
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {contentTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  setValidationResult(null);
                }}
                className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono text-sm"
                placeholder="Enter content to validate..."
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleValidate}
                  disabled={!content.trim()}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow hover:shadow-lg"
                >
                  Validate Content
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Validation Results */}
            {validationResult && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    Validation Results
                  </h3>
                  <span
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      validationResult.overallStatus === 'pass'
                        ? 'bg-green-100 text-green-700'
                        : validationResult.overallStatus === 'warning'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {validationResult.overallStatus === 'pass' && '✅ Passed'}
                    {validationResult.overallStatus === 'warning' && '⚠️ Warning'}
                    {validationResult.overallStatus === 'fail' && '❌ Failed'}
                  </span>
                </div>

                {/* Violations */}
                {validationResult.violations.length > 0 ? (
                  <div className="space-y-3">
                    {validationResult.violations.map((violation, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border-2 ${getSeverityColor(
                          violation.severity
                        )}`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xl">
                                {getSeverityIcon(violation.severity)}
                              </span>
                              <span className="font-semibold uppercase text-sm">
                                {violation.severity}
                              </span>
                              <span className="text-sm font-medium">
                                {violation.constraintName}
                              </span>
                            </div>
                            <p className="text-sm mb-2">{violation.description}</p>
                            <div className="bg-white/50 rounded p-2 mb-2 font-mono text-sm">
                              "{violation.location.text}"
                            </div>
                            {violation.suggestion && (
                              <div className="text-sm">
                                <span className="font-semibold">Suggestion:</span>{' '}
                                "{violation.suggestion}"
                              </div>
                            )}
                          </div>
                          {violation.autoFixAvailable && (
                            <button
                              onClick={() => handleApplyFix(index)}
                              className="ml-4 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all text-sm font-semibold"
                            >
                              Apply Fix
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-green-600">
                    <div className="text-4xl mb-2">✅</div>
                    <p className="font-semibold">All constraints satisfied!</p>
                  </div>
                )}

                {/* Agent Info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <span className="text-gray-600">Agent Confidence:</span>
                      <span className="ml-2 font-semibold text-gray-900">
                        {Math.round(validationResult.agentConfidence * 100)}%
                      </span>
                    </div>
                    {validationResult.requiresHumanReview && (
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">
                        👤 Human review recommended
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Client Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {selectedClient?.name}
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">Industry:</span>
                  <span className="ml-2 font-semibold text-gray-900">
                    {selectedClient?.industry}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Constraints:</span>
                  <span className="ml-2 font-semibold text-gray-900">
                    {selectedClient?.constraintCount} rules
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Languages:</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedClient?.languages.map((lang) => (
                      <span
                        key={lang}
                        className="px-2 py-1 bg-gray-100 rounded text-xs"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Try These Examples
              </h3>
              <div className="space-y-2 text-sm">
                <button
                  onClick={() => {
                    setContent('Welcome to Streamflix! Start buffering now.');
                    setValidationResult(null);
                  }}
                  className="w-full text-left p-3 bg-white rounded-lg hover:shadow-md transition-all"
                >
                  StreamFlix: Brand name + technical jargon
                </button>
                <button
                  onClick={() => {
                    setContent('Great returns guaranteed! Check your funds.');
                    setValidationResult(null);
                    setSelectedClientId('client_fintech');
                  }}
                  className="w-full text-left p-3 bg-white rounded-lg hover:shadow-md transition-all"
                >
                  SecurePay: Compliance violation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationSimulatorDemo;
