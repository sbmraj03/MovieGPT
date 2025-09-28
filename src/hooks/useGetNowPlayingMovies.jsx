import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { API_OPTIONS, API_URL_NOW_PLAYING } from "../utils/constants"
import { addNowPlayingMovies } from "../utils/moviesSlice"


const useGetNowPlayingMovies = () => {
    const dispatch = useDispatch()
    
      const getNowPlayingMovies = async () => {
        const data = await fetch(API_URL_NOW_PLAYING, API_OPTIONS)
        const json = await data.json()
        console.log(json.results)
    
        dispatch(addNowPlayingMovies(json.results))
    
      }
    
      useEffect(() => {
        getNowPlayingMovies()
      }, [])

}

export default useGetNowPlayingMovies