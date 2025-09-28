import { useSelector } from 'react-redux'
import MovieList from './MovieList'

const SecondaryContainer = () => {
  const movies = useSelector(store => store.movies)

  console.log("movies of secondary container", movies)
  console.log("Upto HERE")
  
  return (
      <div className='bg-black w-full'>
        <div className="-mt-52 relative z-20">
          <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies}/>
          <MovieList title={"Trending"} movies={movies?.trendingMovies}/>
          <MovieList title={"Popular"} movies={movies?.popularMovies}/>
          <MovieList title={"Top Rated"} movies={movies?.topRatedMovies}/>
          <MovieList title={"Upcoming"} movies={movies?.upcomingMovies}/>
        </div>
      </div>
  )
}

export default SecondaryContainer
 