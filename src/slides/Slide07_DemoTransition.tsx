import { Link } from 'react-router-dom';
import SlideLayout from '../components/SlideLayout';

const Slide07_DemoTransition = () => {
  return (
    <SlideLayout>
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl font-bold text-gray-900 mb-8">
          Let's See This in Action
        </h1>
        <p className="text-2xl text-gray-600 mb-12">
          Interactive demonstration of the Knowledge Graph Explorer
        </p>

        <Link
          to="/demo/knowledge-graph"
          className="inline-block bg-gradient-to-r from-primary-500 to-primary-600 text-white px-12 py-6 rounded-xl text-xl font-semibold hover:from-primary-600 hover:to-primary-700 transform hover:scale-105 transition-all shadow-xl hover:shadow-2xl"
        >
          Launch Knowledge Graph Demo →
        </Link>

        <p className="mt-8 text-gray-500 text-sm">
          Press ESC to return to presentation
        </p>
      </div>
    </SlideLayout>
  );
};

export default Slide07_DemoTransition;
