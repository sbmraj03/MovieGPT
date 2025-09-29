import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_OPTIONS, API_URL_NOW_PLAYING } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const useGetNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(store => store.movies.nowPlayingMovies);

  const getNowPlayingMovies = async () => {
    try {
      const data = await fetch(API_URL_NOW_PLAYING, API_OPTIONS);
      const json = await data.json();
      // console.log(json.results);
      dispatch(addNowPlayingMovies(json.results));
    } catch (error) {
      console.error("Failed to fetch now playing movies:", error);
    }
  };

  useEffect(() => {
    if (!nowPlayingMovies) {
      getNowPlayingMovies();
    }
  }, []); // Only run once on mount
};

export default useGetNowPlayingMovies;
