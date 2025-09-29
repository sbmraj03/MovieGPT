import { useState } from 'react';
import FullscreenVideoPlayer from './FullscreenVideoPlayer';

const VideoTitle = ({ title, overview, movieId, trailerKey }) => {
  const [showPlayer, setShowPlayer] = useState(false);

  const handlePlayClick = () => {
    if (trailerKey) {
      setShowPlayer(true);
    } else {
      alert('Trailer not available for this movie');
    }
  };

  return (
    <div className="absolute top-75 px-4 sm:px-8 md:px-12 w-full sm:w-3/4 md:w-1/2 text-white z-10">
      {/* Title */}
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-lg mb-4">
        {title}
      </h1>

      {/* Overview */}
      <p className="text-sm sm:text-base md:text-lg font-normal text-gray-200 drop-shadow-md mb-6">
        {overview}
      </p>

      {/* Action buttons */}
      <div className="flex gap-2 sm:gap-4">
        <button 
          onClick={handlePlayClick}
          className="px-4 sm:px-6 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition-all cursor-pointer text-sm sm:text-base flex items-center gap-2 hover:scale-105 transform"
        >
          <span className="text-lg">▶</span>
          Play Now
        </button>
      </div>

      {showPlayer && (
        <FullscreenVideoPlayer
          trailerKey={trailerKey}
          forceFullscreen={true}
          onClose={() => setShowPlayer(false)}
        />
      )}
    </div>
  );
};

export default VideoTitle;
