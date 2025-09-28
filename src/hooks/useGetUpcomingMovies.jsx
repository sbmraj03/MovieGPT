import { useEffect } from "react"
import { API_OPTIONS, API_URL_UPCOMING } from "../utils/constants"
import { useDispatch } from "react-redux"
import { addUpcomingMovies } from "../utils/moviesSlice"

const useGetUpcomingMovies = () => {
    const dispatch = useDispatch();
    const upcomingMovies = useSelector((store) => store.movies.upcomingMovies) 
    const getUpcomingMovies = async () => {
        const data = await fetch(API_URL_UPCOMING, API_OPTIONS)
        const json = await data.json()
        dispatch(addUpcomingMovies(json.results))
    }
    
    useEffect(() => {
        if(!upcomingMovies) getUpcomingMovies()
    }, [])
}

export default useGetUpcomingMovies


