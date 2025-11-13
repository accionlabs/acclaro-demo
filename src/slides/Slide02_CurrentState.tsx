import SlideLayout from '../components/SlideLayout';

const Slide02_CurrentState = () => {
  return (
    <SlideLayout centered={false}>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Current State: Acclaro's Unique Value Proposition
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-primary-600 mb-6">
            What Makes Acclaro Different
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Traditional Translation Services</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Generic style guides</li>
                <li>• Standard translation memories</li>
                <li>• Basic linguist matching</li>
                <li>• Manual constraint documentation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Acclaro's Differentiated Approach</h3>
              <ul className="space-y-2 text-primary-700 font-semibold">
                <li>• Client-specific language constraints</li>
                <li>• Customized translation memories</li>
                <li>• Expert domain-specialized teams</li>
                <li>• Engineered TMS integration</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Your Hidden Asset: Language Constraint Intelligence
          </h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white rounded-lg p-4">
              <p className="text-gray-700">Deep understanding of brand-specific language rules</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-gray-700">Expertise in UI terminology standardization</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-gray-700">Knowledge of industry-specific compliance</p>
            </div>
          </div>
          <p className="text-center mt-6 text-lg font-bold text-amber-700">
            This knowledge is your platform foundation.
          </p>
        </div>
      </div>
    </SlideLayout>
  );
};

export default Slide02_CurrentState;
