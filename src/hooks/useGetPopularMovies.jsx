import { useEffect } from "react"
import { API_OPTIONS, API_URL_POPULAR, API_URL_TOP_RATED } from "../utils/constants"
import { addPopularMovies } from "../utils/moviesSlice"
import { useDispatch } from "react-redux"


const useGetPopularMovies = () => {
    const dispatch = useDispatch()
    
      const getPopularMovies = async () => {
        const data = await fetch(API_URL_POPULAR, API_OPTIONS)
        const json = await data.json()
        console.log(json.results)
    
        dispatch(addPopularMovies(json.results))
    
      }
    
      useEffect(() => {
        getPopularMovies()
      }, [])

}

export default useGetPopularMovies