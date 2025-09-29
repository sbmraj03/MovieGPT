import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../utils/moviesSlice";
import { API_OPTIONS, API_URL_TOP_RATED } from "../utils/constants";
import { useEffect } from "react";

const useGetTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);

  const getTopRatedMovies = async () => {
    try {
      const data = await fetch(API_URL_TOP_RATED, API_OPTIONS);
      const json = await data.json();
      // console.log("get top rated", json.results);
      dispatch(addTopRatedMovies(json.results));
    } catch (error) {
      console.error("Failed to fetch top rated movies:", error);
    }
  };

  useEffect(() => {
    if (!topRatedMovies) getTopRatedMovies();
  }, []); // Runs only once on mount
};

export default useGetTopRatedMovies;
