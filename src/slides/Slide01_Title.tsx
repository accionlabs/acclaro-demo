import SlideLayout from '../components/SlideLayout';

const Slide01_Title = () => {
  return (
    <SlideLayout>
      <div className="text-center max-w-4xl">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
          Acclaro
        </h1>
        <h2 className="text-4xl font-semibold text-primary-600 mb-8">
          Evolution to a Content Governance Platform
        </h2>
        <p className="text-2xl text-gray-600 mb-12">
          Transforming Language Services Through Semantic Intelligence
        </p>
        <div className="border-t-2 border-gray-300 pt-8 mt-8">
          <p className="text-lg text-gray-500">
            Strategic Proposal for Platform Evolution
          </p>
        </div>
      </div>
    </SlideLayout>
  );
};

export default Slide01_Title;
