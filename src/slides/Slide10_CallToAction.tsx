import SlideLayout from '../components/SlideLayout';

const Slide10_CallToAction = () => {
  return (
    <SlideLayout centered={false}>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-12 text-center">
          The Opportunity
        </h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Market Timing</h2>
            <p className="text-blue-800">
              AI-powered content creation is exploding. Organizations need governance more than ever.
            </p>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-teal-900 mb-4">Competitive Window</h2>
            <p className="text-teal-800">
              Your accumulated knowledge gives you a 12-18 month head start before competitors recognize this opportunity.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-8 shadow-xl border-2 border-amber-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Next Steps</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6">
              <div className="text-3xl font-bold text-primary-600 mb-2">1</div>
              <h3 className="font-bold text-gray-900 mb-2">Validate the Vision</h3>
              <p className="text-sm text-gray-600">Present to stakeholders, engage 2-3 pilot clients</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <div className="text-3xl font-bold text-primary-600 mb-2">2</div>
              <h3 className="font-bold text-gray-900 mb-2">Secure Pilot Commitment</h3>
              <p className="text-sm text-gray-600">Formalize agreements, define success criteria</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <div className="text-3xl font-bold text-primary-600 mb-2">3</div>
              <h3 className="font-bold text-gray-900 mb-2">Begin Ontology Development</h3>
              <p className="text-sm text-gray-600">Catalog constraint patterns, build knowledge graphs</p>
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-xl font-semibold text-gray-700">
          Transform from services to platform — Lead the content governance revolution
        </p>
      </div>
    </SlideLayout>
  );
};

export default Slide10_CallToAction;
