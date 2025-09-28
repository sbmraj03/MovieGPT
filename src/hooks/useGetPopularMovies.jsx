import { useEffect } from "react"
import { API_OPTIONS, API_URL_POPULAR, API_URL_TOP_RATED } from "../utils/constants"
import { addPopularMovies } from "../utils/moviesSlice"
import { useDispatch, useSelector } from "react-redux"


const useGetPopularMovies = () => {
    const dispatch = useDispatch();
    const popularMovies = useSelector((store) => store.movies.popularMovies);
    
      const getPopularMovies = async () => {
        const data = await fetch(API_URL_POPULAR, API_OPTIONS)
        const json = await data.json()
        console.log(json.results)
    
        dispatch(addPopularMovies(json.results))
    
      }
    
      useEffect(() => {
        if(!popularMovies) getPopularMovies()
      }, [])

}

export default useGetPopularMovies