import { useSelector } from 'react-redux'
import MovieList from './MovieList'
import { MovieListShimmer } from './Shimmer'

const SecondaryContainer = () => {
  const movies = useSelector(store => store.movies)

  console.log("movies of secondary container", movies)
  console.log("Upto HERE")
  
  // Check if any movies are loaded
  const hasMovies = movies?.nowPlayingMovies || movies?.trendingMovies || movies?.popularMovies || movies?.topRatedMovies || movies?.upcomingMovies;
  
  return (
      <div className='bg-black w-full'>
        <div className="-mt-52 relative z-20">
          {/* Keep stable placeholders for each section to avoid layout shifts */}
          {movies ? (
            <>
              {movies?.nowPlayingMovies ? (
                <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies}/>
              ) : (
                <MovieListShimmer title={true} />
              )}

              {movies?.trendingMovies ? (
                <MovieList title={"Trending"} movies={movies?.trendingMovies}/>
              ) : (
                <MovieListShimmer title={true} />
              )}

              {movies?.popularMovies ? (
                <MovieList title={"Popular"} movies={movies?.popularMovies}/>
              ) : (
                <MovieListShimmer title={true} />
              )}

              {movies?.topRatedMovies ? (
                <MovieList title={"Top Rated"} movies={movies?.topRatedMovies}/>
              ) : (
                <MovieListShimmer title={true} />
              )}

              {movies?.upcomingMovies ? (
                <MovieList title={"Upcoming"} movies={movies?.upcomingMovies}/>
              ) : (
                <MovieListShimmer title={true} />
              )}
            </>
          ) : (
            <>
              <MovieListShimmer title={true} />
              <MovieListShimmer title={true} />
              <MovieListShimmer title={true} />
              <MovieListShimmer title={true} />
              <MovieListShimmer title={true} />
            </>
          )}
        </div>
      </div>
  )
}

export default SecondaryContainer
 