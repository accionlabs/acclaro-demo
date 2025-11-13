import React from 'react';

interface SlideLayoutProps {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
}

const SlideLayout = ({ children, className = '', centered = true }: SlideLayoutProps) => {
  return (
    <div className={`h-full w-full bg-gradient-to-br from-gray-50 to-blue-50 p-12 ${className}`}>
      <div className={`h-full w-full ${centered ? 'flex items-center justify-center' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default SlideLayout;
