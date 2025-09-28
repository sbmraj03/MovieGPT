import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";


const MainContainer = () => {
    const movies = useSelector(store => store.movies?.trendingMovies)
    if(!movies) return
   
    const mainMovie = movies[1]
    const {original_title, overview, id} = mainMovie

    console.log("id is: ", id)

    return(
        <div>
            <VideoTitle title={original_title} overview={overview}/>
            <VideoBackground movieId={id}/>
        </div>
    )
}

export default MainContainer