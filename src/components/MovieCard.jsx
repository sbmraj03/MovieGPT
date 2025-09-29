import { IMG_CDN_URL, API_OPTIONS } from "../utils/constants"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentlyPlayingMovieId } from "../utils/moviesSlice"

const MovieCard = ({posterPath, movieData}) => {
  const dispatch = useDispatch();
  const currentlyPlayingMovieId = useSelector(store => store.movies?.currentlyPlayingMovieId);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  
  if(!posterPath) return null;

  const handlePlayClick = async (e) => {
    e.stopPropagation();
    if (!movieData?.id) return alert('Trailer not available for this movie');

    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${movieData.id}/videos?language=en-US`, API_OPTIONS);
      const json = await res.json();
      const trailers = (json?.results || []).filter(v => v.type === 'Trailer');
      const video = trailers.length > 0 ? trailers[0] : (json?.results || [])[0];
      if (video?.key) {
        setTrailerKey(video.key);
        // Mark this card as the global currently playing
        dispatch(setCurrentlyPlayingMovieId(movieData.id));
        setIsPlayingVideo(true);
      } else {
        alert('Trailer not available for this movie');
      }
    } catch (err) {
      console.error('Failed to fetch trailer', err);
      alert('Failed to load trailer');
    }
  };

  const handleCloseVideo = () => {
    setIsPlayingVideo(false);
    setTrailerKey(null);
    // Clear global playing if this card was the active one
    if (currentlyPlayingMovieId === movieData?.id) {
      dispatch(setCurrentlyPlayingMovieId(null));
    }
  };
  
  return (
    <div className="w-full h-full group cursor-pointer relative">
      <div className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl">
        {/* If another card is playing, ensure this one shows poster */}
        {(!isPlayingVideo || currentlyPlayingMovieId !== movieData?.id) ? (
          <>
            <img 
              src={IMG_CDN_URL + posterPath} 
              alt={movieData?.title || "Movie Card"}
              className="w-full h-auto rounded-lg shadow-lg object-cover transition-all duration-300 group-hover:brightness-110"
              loading="lazy"
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
              <button
                onClick={handlePlayClick}
                className="bg-white/90 hover:bg-white text-black rounded-full p-3 transition-all duration-200 hover:scale-110 shadow-lg"
                title={`Play ${movieData?.title || 'Movie'} Trailer`}
              >
                <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Video Player */}
            <div className="w-full h-full aspect-[2/3] bg-black rounded-lg overflow-hidden">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=0&controls=1&showinfo=1&rel=0&modestbranding=1&fs=1&cc_load_policy=1`}
                title={`${movieData?.title || 'Movie'} Trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            {/* Close button */}
            <button
              onClick={handleCloseVideo}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition-colors z-10"
              title="Close trailer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default MovieCard