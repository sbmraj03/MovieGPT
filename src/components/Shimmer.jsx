import React from 'react';

// Base Shimmer Component
const Shimmer = ({ 
  className = '', 
  variant = 'default', 
  width = '100%', 
  height = '20px',
  borderRadius = '4px',
  ...props 
}) => {
  const baseClasses = 'shimmer-dark rounded';
  
  const variants = {
    default: 'shimmer-dark',
    pulse: 'shimmer-dark shimmer-pulse',
    wave: 'shimmer-dark shimmer-wave',
    glow: 'shimmer-dark shimmer-glow',
    light: 'shimmer',
    lightPulse: 'shimmer shimmer-pulse',
    lightWave: 'shimmer shimmer-wave',
    lightGlow: 'shimmer shimmer-glow'
  };

  return (
    <div
      className={`${baseClasses} ${variants[variant]} ${className}`}
      style={{
        width,
        height,
        borderRadius,
        ...props.style
      }}
      {...props}
    />
  );
};

// Movie Card Shimmer
export const MovieCardShimmer = ({ className = '' }) => (
  <div className={`flex-shrink-0 ${className}`} style={{ width: 'clamp(130px, 22vw, 200px)', minWidth: '130px' }}>
    <div className="w-full h-auto rounded-lg overflow-hidden">
      <Shimmer height="280px" borderRadius="8px" variant="wave" className="w-full" />
    </div>
  </div>
);

// Movie List Shimmer
export const MovieListShimmer = ({ title = true, className = '' }) => (
  <div className={`px-3 sm:px-6 lg:px-8 ${className}`}>
    <div className="px-2 sm:px-4 relative z-10 pt-6 sm:pt-8 md:pt-12 lg:pt-15">
      {title && (
        <div className="mb-2 sm:mb-3 md:mb-4 px-1 sm:px-0">
          <Shimmer height="24px" width="200px" variant="pulse" className="mb-2" />
        </div>
      )}
      
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-4 sm:w-8 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-4 sm:w-8 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none" />
        
        <div className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-6 overflow-x-hidden px-2 sm:px-3 pb-3 sm:pb-4 md:pb-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <MovieCardShimmer key={index} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Video Title Shimmer
export const VideoTitleShimmer = ({ className = '' }) => (
  <div className={`max-w-2xl ${className}`}>
    <Shimmer height="48px" width="80%" variant="wave" className="mb-4" />
    <Shimmer height="20px" width="100%" variant="pulse" className="mb-2" />
    <Shimmer height="20px" width="90%" variant="pulse" className="mb-2" />
    <Shimmer height="20px" width="70%" variant="pulse" />
  </div>
);

// Header Shimmer
export const HeaderShimmer = ({ className = '' }) => (
  <div className={`flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 ${className}`}>
    <Shimmer height="40px" width="120px" variant="glow" borderRadius="8px" />
    <div className="flex items-center gap-4">
      <Shimmer height="36px" width="80px" variant="pulse" borderRadius="20px" />
      <Shimmer height="36px" width="36px" variant="wave" borderRadius="50%" />
    </div>
  </div>
);

// Search Bar Shimmer
export const SearchBarShimmer = ({ className = '' }) => (
  <div className={`w-full max-w-md md:max-w-2xl mx-auto bg-gray-800 border border-gray-600 rounded-lg shadow-2xl ${className}`}>
    <div className="flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-3 p-4">
      <Shimmer height="48px" width="100%" variant="wave" borderRadius="8px" className="md:col-span-9" />
      <Shimmer height="48px" width="100%" variant="pulse" borderRadius="8px" className="md:col-span-3" />
    </div>
  </div>
);

// GPT Suggestions Shimmer
export const GPTSuggestionsShimmer = ({ className = '' }) => (
  <div className={`min-h-screen bg-black/60 backdrop-blur-sm ${className}`}>
    <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-10">
      {/* Header */}
      <div className="mb-6 sm:mb-8 md:mb-10 text-center">
        <Shimmer height="32px" width="300px" variant="pulse" className="mx-auto mb-4" />
        <div className="w-16 sm:w-20 md:w-24 h-1 bg-gray-600 mx-auto"></div>
      </div>
      {/* Movie Lists */}
      <div className="space-y-6 sm:space-y-8 md:space-y-10">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="bg-gray-900/40 backdrop-blur-sm rounded-lg p-3 sm:p-4 md:p-6 border border-gray-700/50">
            <MovieListShimmer title={true} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Main Container Shimmer
export const MainContainerShimmer = ({ className = '' }) => (
  <div className={`relative w-full h-screen ${className}`}>
    <Shimmer height="100vh" width="100%" variant="wave" className="absolute inset-0" />
    <div className="absolute inset-0 flex items-center z-10 px-4 sm:px-8 md:px-12 lg:px-16">
      <VideoTitleShimmer />
    </div>
  </div>
);

// Custom Hook for Shimmer States
export const useShimmer = (isLoading, delay = 0) => {
  const [showShimmer, setShowShimmer] = React.useState(isLoading);
  React.useEffect(() => {
    if (isLoading) {
      setShowShimmer(true);
    } else {
      const timer = setTimeout(() => setShowShimmer(false), delay);
      return () => clearTimeout(timer);
    }
  }, [isLoading, delay]);
  return showShimmer;
};

// Shimmer Wrapper Component
export const ShimmerWrapper = ({ isLoading, children, shimmerComponent, delay = 0, className = '' }) => {
  const showShimmer = useShimmer(isLoading, delay);
  if (showShimmer) {
    return shimmerComponent || <Shimmer className={className} />;
  }
  return children;
};

export default Shimmer;
