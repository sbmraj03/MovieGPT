import MovieCard from './MovieCard'

const MovieList = ({ title, movies }) => {

  console.log(movies)
  return (
    <div className="px-6">
      <div className="px-4 relative z-10 pt-15">
        {/* Title */}
        <h2 className="text-white text-lg md:text-2xl font-semibold mb-3">
          {title}
        </h2>

        {/* Horizontal scroll container */}
        <div>
          <div
            className="
              flex gap-4 
              overflow-x-scroll 
              scroll-smooth flex-nowrap w-full
            "
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {movies?.map((movie) => (
              <div key={movie.id} className="flex-shrink-0">
                <MovieCard posterPath={movie.poster_path} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieList
