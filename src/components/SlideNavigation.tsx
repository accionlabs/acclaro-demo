import { useState } from 'react';

interface Slide {
  title: string;
  component: React.ComponentType;
}

interface SlideNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrevious: () => void;
  onGoToSlide: (index: number) => void;
  onHome: () => void;
  slides: Slide[];
}

const SlideNavigation = ({
  currentSlide,
  totalSlides,
  onNext,
  onPrevious,
  onGoToSlide,
  onHome,
  slides,
}: SlideNavigationProps) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      {/* Slide Counter */}
      <div className="fixed bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-lg text-sm font-semibold text-gray-700">
        {currentSlide + 1} / {totalSlides}
      </div>

      {/* Navigation Arrows */}
      {currentSlide > 0 && (
        <button
          onClick={onPrevious}
          className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur p-3 rounded-full shadow-lg transition-all hover:scale-110"
          aria-label="Previous slide"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {currentSlide < totalSlides - 1 && (
        <button
          onClick={onNext}
          className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur p-3 rounded-full shadow-lg transition-all hover:scale-110"
          aria-label="Next slide"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}

      {/* Menu Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="fixed top-4 left-4 bg-white/80 hover:bg-white backdrop-blur p-3 rounded-full shadow-lg transition-all hover:scale-110"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Home Button */}
      <button
        onClick={onHome}
        className="fixed top-4 right-4 bg-white/80 hover:bg-white backdrop-blur px-4 py-2 rounded-lg shadow-lg transition-all hover:scale-105 text-sm font-semibold text-gray-700"
        aria-label="Return home"
      >
        ← Home
      </button>

      {/* Slide Menu */}
      {showMenu && (
        <div className="fixed top-20 left-4 bg-white rounded-lg shadow-2xl p-4 max-h-[70vh] overflow-y-auto w-80 z-50">
          <h3 className="font-bold text-lg mb-3 text-gray-900">Slides</h3>
          <div className="space-y-1">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => {
                  onGoToSlide(index);
                  setShowMenu(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  currentSlide === index
                    ? 'bg-primary-100 text-primary-700 font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className="text-xs text-gray-500 mr-2">{index + 1}.</span>
                {slide.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Click outside to close menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowMenu(false)}
        />
      )}
    </>
  );
};

export default SlideNavigation;
