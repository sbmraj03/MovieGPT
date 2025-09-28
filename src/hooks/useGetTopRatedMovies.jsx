import { useDispatch } from "react-redux"
import { addTopRatedMovies } from "../utils/moviesSlice"
import { API_OPTIONS, API_URL_TOP_RATED } from "../utils/constants"
import { useEffect } from "react"


const useGetTopRatedMovies = () => {
    const dispatch = useDispatch()
    
      const getTopRatedMovies = async () => {
        const data = await fetch(API_URL_TOP_RATED, API_OPTIONS)
        const json = await data.json()
        console.log("get top rated", json.results)
    
        dispatch(addTopRatedMovies(json.results))
    
      }
    
      useEffect(() => {
        getTopRatedMovies()
      }, [])

}

export default useGetTopRatedMovies