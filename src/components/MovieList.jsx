import MovieCard from './MovieCard'

const MovieList = ({ title, movies }) => {
  console.log(movies)
  
  return (
    <div className="px-3 sm:px-6 lg:px-8">
      <div className="px-2 sm:px-4 relative z-10 pt-6 sm:pt-8 md:pt-12 lg:pt-15">
        {/* Title */}
        <h2 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4 px-1 sm:px-0">
          {title}
        </h2>

        {/* Horizontal scroll container */}
        <div className="relative">
          {/* Gradient overlays for better UX */}
          <div className="absolute left-0 top-0 bottom-0 w-4 sm:w-8 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-4 sm:w-8 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none" />
          
          <div
            className="
              flex 
              gap-3 sm:gap-4 md:gap-5 lg:gap-6
              overflow-x-scroll 
              scroll-smooth 
              scrollbar-hide
              pb-3 sm:pb-4 md:pb-5
              px-2 sm:px-3
            "
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {movies?.map((movie) => (
              <div 
                key={movie.id} 
                className="flex-shrink-0 transform transition-transform duration-200 hover:scale-105 focus:scale-105"
                style={{
                  // Better responsive card widths with larger mobile size
                  width: 'clamp(130px, 22vw, 200px)',
                  minWidth: '130px' // Ensures minimum width on very small screens
                }}
              >
                <MovieCard 
                  posterPath={movie.poster_path} 
                  movieData={movie}
                />
              </div>
            ))}
            
            {/* Spacer for better end scrolling */}
            <div className="flex-shrink-0 w-6 sm:w-8" />
          </div>
        </div>
        
        {/* Optional: Scroll indicators */}
        <div className="flex justify-center mt-2 gap-1">
          {movies?.length > 5 && (
            <div className="text-gray-500 text-xs hidden sm:block">
              Scroll horizontally to see more →
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieList