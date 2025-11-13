import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Acclaro Content Governance Platform
          </h1>
          <p className="text-xl text-gray-600">
            Evolution from Translation Services to Platform Company
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Presentation Mode */}
          <Link
            to="/presentation"
            className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-transparent hover:border-primary-500"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Presentation Mode
              </h2>
              <p className="text-gray-600">
                Walk through the proposal with slides and diagrams
              </p>
              <div className="mt-4 text-primary-600 font-semibold group-hover:translate-x-2 transition-transform">
                Start Presentation →
              </div>
            </div>
          </Link>

          {/* Interactive Demo */}
          <Link
            to="/demo/knowledge-graph"
            className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-transparent hover:border-accent-500"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent-200 transition-colors">
                <svg
                  className="w-8 h-8 text-accent-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Interactive Demo
              </h2>
              <p className="text-gray-600">
                Explore constraint ontologies and validate content in real-time
              </p>
              <div className="mt-4 text-accent-600 font-semibold group-hover:translate-x-2 transition-transform">
                Launch Demo →
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Use arrow keys (← →) to navigate presentation slides</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
