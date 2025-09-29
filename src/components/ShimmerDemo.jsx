import React, { useState, useEffect } from 'react';
import Shimmer, {
  MovieCardShimmer,
  MovieListShimmer,
  VideoTitleShimmer,
  HeaderShimmer,
  SearchBarShimmer,
  GPTSuggestionsShimmer,
  LoadingOverlayShimmer,
  TextShimmer,
  ButtonShimmer,
  ImageShimmer,
  CardShimmer,
  GridShimmer,
  TableShimmer,
  MainContainerShimmer,
  ShimmerWrapper,
  useShimmer
} from './Shimmer';

const ShimmerDemo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  const showShimmer = useShimmer(isLoading, 1000);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">🎬 MovieNest Shimmer UI Demo</h1>
        
        {/* Basic Shimmer Variants */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Basic Shimmer Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Default</h3>
              <Shimmer height="40px" variant="default" />
              <Shimmer height="20px" width="80%" variant="default" />
              <Shimmer height="20px" width="60%" variant="default" />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Pulse</h3>
              <Shimmer height="40px" variant="pulse" />
              <Shimmer height="20px" width="80%" variant="pulse" />
              <Shimmer height="20px" width="60%" variant="pulse" />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Wave</h3>
              <Shimmer height="40px" variant="wave" />
              <Shimmer height="20px" width="80%" variant="wave" />
              <Shimmer height="20px" width="60%" variant="wave" />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Glow</h3>
              <Shimmer height="40px" variant="glow" />
              <Shimmer height="20px" width="80%" variant="glow" />
              <Shimmer height="20px" width="60%" variant="glow" />
            </div>
          </div>
        </section>

        {/* Component Shimmers */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Component Shimmers</h2>
          
          {/* Movie Card Shimmer */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Movie Card Shimmer</h3>
            <div className="flex gap-4 overflow-x-auto">
              {Array.from({ length: 5 }).map((_, index) => (
                <MovieCardShimmer key={index} />
              ))}
            </div>
          </div>

          {/* Movie List Shimmer */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Movie List Shimmer</h3>
            <MovieListShimmer />
          </div>

          {/* Video Title Shimmer */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Video Title Shimmer</h3>
            <div className="bg-gray-800 p-8 rounded-lg">
              <VideoTitleShimmer />
            </div>
          </div>

          {/* Header Shimmer */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Header Shimmer</h3>
            <HeaderShimmer />
          </div>

          {/* Search Bar Shimmer */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Search Bar Shimmer</h3>
            <SearchBarShimmer />
          </div>

          {/* GPT Suggestions Shimmer */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">GPT Suggestions Shimmer</h3>
            <GPTSuggestionsShimmer />
          </div>
        </section>

        {/* Advanced Shimmers */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Advanced Shimmers</h2>
          
          {/* Grid Shimmer */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Grid Shimmer</h3>
            <GridShimmer columns={3} rows={2} />
          </div>

          {/* Table Shimmer */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Table Shimmer</h3>
            <TableShimmer rows={5} columns={4} />
          </div>

          {/* Card Shimmer */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Card Shimmer</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <CardShimmer key={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Shimmer Wrapper Demo */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Shimmer Wrapper Demo</h2>
          <div className="bg-gray-800 p-6 rounded-lg">
            <ShimmerWrapper
              isLoading={showShimmer}
              shimmerComponent={<TextShimmer lines={3} />}
            >
              <div>
                <h3 className="text-xl font-semibold mb-2">Loaded Content!</h3>
                <p className="text-gray-300">
                  This content appears after the shimmer loading animation completes.
                  The shimmer wrapper automatically handles the transition between loading and loaded states.
                </p>
              </div>
            </ShimmerWrapper>
          </div>
        </section>

        {/* Main Container Shimmer */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Main Container Shimmer</h2>
          <div className="relative h-96 rounded-lg overflow-hidden">
            <MainContainerShimmer />
          </div>
        </section>

        {/* Interactive Demo */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Interactive Demo</h2>
          <div className="flex gap-4 mb-6">
            <ButtonShimmer 
              width="150px" 
              height="40px"
              className="cursor-pointer"
              onClick={() => setIsLoading(!isLoading)}
            />
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => setIsLoading(!isLoading)}
            >
              Toggle Loading State
            </button>
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              onClick={toggleOverlay}
            >
              Toggle Overlay
            </button>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <ShimmerWrapper
              isLoading={isLoading}
              shimmerComponent={<TextShimmer lines={4} variant="wave" />}
            >
              <div>
                <h3 className="text-xl font-semibold mb-4">Dynamic Content</h3>
                <p className="text-gray-300 mb-4">
                  This content changes based on the loading state. Click the buttons above to see the shimmer effects in action.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ImageShimmer height="200px" borderRadius="8px" />
                  <div>
                    <TextShimmer lines={2} variant="pulse" />
                    <ButtonShimmer width="120px" height="32px" className="mt-4" />
                  </div>
                </div>
              </div>
            </ShimmerWrapper>
          </div>
        </section>

        {/* Performance Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Performance Tips</h2>
          <div className="bg-gray-800 p-6 rounded-lg">
            <ul className="space-y-2 text-gray-300">
              <li>• Use <code className="bg-gray-700 px-2 py-1 rounded">useShimmer</code> hook for automatic loading state management</li>
              <li>• Implement <code className="bg-gray-700 px-2 py-1 rounded">ShimmerWrapper</code> for seamless transitions</li>
              <li>• Choose appropriate shimmer variants based on content type</li>
              <li>• Use <code className="bg-gray-700 px-2 py-1 rounded">delay</code> parameter to prevent flickering</li>
              <li>• Optimize shimmer animations with CSS transforms</li>
              <li>• Consider using skeleton screens for better UX</li>
            </ul>
          </div>
        </section>
      </div>

      {/* Loading Overlay */}
      {showOverlay && <LoadingOverlayShimmer />}
    </div>
  );
};

export default ShimmerDemo;
