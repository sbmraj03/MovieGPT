import { useDispatch } from "react-redux"
import { addTrendingMovies } from "../utils/moviesSlice"
import { API_OPTIONS, API_URL_TRENDING } from "../utils/constants"
import { useEffect } from "react"


const useGetTrendingMovies = () => {
    const dispatch = useDispatch()
    
      const getTrendingMovies = async () => {
        const data = await fetch(API_URL_TRENDING, API_OPTIONS)
        const json = await data.json()
        console.log("getTrending", json.results)
    
        dispatch(addTrendingMovies(json.results))
    
      }
    
      useEffect(() => {
        getTrendingMovies()
      }, [])

}

export default useGetTrendingMovies