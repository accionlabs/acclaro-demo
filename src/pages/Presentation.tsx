import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SlideNavigation from '../components/SlideNavigation';
import { slides } from '../slides';

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const totalSlides = slides.length;

  const goToNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const goToPrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index);
    }
  };

  const goHome = () => {
    navigate('/');
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ': // Space bar
          e.preventDefault();
          goToNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevious();
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(totalSlides - 1);
          break;
        case 'Escape':
          e.preventDefault();
          goHome();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide, totalSlides]);

  const CurrentSlideComponent = slides[currentSlide].component;

  return (
    <div className="slide-container bg-gray-900 relative flex items-center justify-center">
      {/* Fixed Dimension Slide Container - 16:9 aspect ratio */}
      <div className="relative bg-white shadow-2xl" style={{
        width: '1280px',
        height: '720px',
        maxWidth: '95vw',
        maxHeight: '95vh'
      }}>
        <CurrentSlideComponent />
      </div>

      {/* Navigation Overlay */}
      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onNext={goToNext}
        onPrevious={goToPrevious}
        onGoToSlide={goToSlide}
        onHome={goHome}
        slides={slides}
      />
    </div>
  );
};

export default Presentation;
