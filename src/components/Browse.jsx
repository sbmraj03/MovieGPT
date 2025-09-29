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
import Footer from "./Footer"

const Browse = () => {
  const showGPTSearch = useSelector(store => store.gpt.showGptSearch); // check if GPT search mode is active

  // fetch movies data when component mounts
  useGetNowPlayingMovies();
  useGetTrendingMovies();
  useGetPopularMovies();
  useGetUpcomingMovies();
  useGetTopRatedMovies();

  return (
    <div>
      <Header />
      {showGPTSearch ? (
        <GPTSearch />   // show GPT search results
      ) : (
        <>
          <MainContainer />     {/* Hero/banner movies */}
          <SecondaryContainer /> {/* Movie lists/rows */}
          <Footer />
        </>
      )}
    </div>
  )
}

export default Browse
