import { useSelector } from "react-redux"
import useGetNowPlayingMovies from "../hooks/useGetNowPlayingMovies"
import useGetPopularMovies from "../hooks/useGetPopularMovies"
import useGetTopRatedMovies from "../hooks/useGetTopRatedMovies"
import useGetTrendingMovies from "../hooks/useGetTrendingMovies"
import useGetUpcomingMovies from "../hooks/useGetUpcomingMovies"
import GPTSearch from "./GPTSearch"
import Header from "./Header"
import MainContainer from "./MainContainer"
import SecondaryContainer from "./SecondaryContainer"

const Browse = () => {
  const showGPTSearch = useSelector(store => store.gpt.showGptSearch);


  useGetNowPlayingMovies();
  useGetTrendingMovies();
  useGetPopularMovies();
  useGetUpcomingMovies();
  useGetTopRatedMovies();


  return (
    <div>
      <Header />
      {showGPTSearch ? (
        <GPTSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )
      }
    </div>
  )
}

export default Browse
