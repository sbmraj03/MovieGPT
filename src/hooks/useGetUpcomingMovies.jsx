import { useEffect } from "react";
import { API_OPTIONS, API_URL_UPCOMING } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../utils/moviesSlice";

const useGetUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);

  const getUpcomingMovies = async () => {
    try {
      const data = await fetch(API_URL_UPCOMING, API_OPTIONS);
      const json = await data.json();
      dispatch(addUpcomingMovies(json.results));
    } catch (error) {
      console.error("Failed to fetch upcoming movies:", error);
    }
  };

  useEffect(() => {
    if (!upcomingMovies) getUpcomingMovies();
  }, []); // Run only on mount
};

export default useGetUpcomingMovies;
