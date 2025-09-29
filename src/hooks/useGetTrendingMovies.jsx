import { useDispatch, useSelector } from "react-redux";
import { addTrendingMovies } from "../utils/moviesSlice";
import { API_OPTIONS, API_URL_TRENDING } from "../utils/constants";
import { useEffect } from "react";

const useGetTrendingMovies = () => {
  const dispatch = useDispatch();
  const trendingMovies = useSelector((store) => store.movies.trendingMovies);

  const getTrendingMovies = async () => {
    try {
      const data = await fetch(API_URL_TRENDING, API_OPTIONS);
      const json = await data.json();
      // console.log("getTrending", json.results);
      dispatch(addTrendingMovies(json.results));
    } catch (error) {
      console.error("Failed to fetch trending movies:", error);
    }
  };

  useEffect(() => {
    if (!trendingMovies) getTrendingMovies();
  }, []); // Only run on mount
};

export default useGetTrendingMovies;
