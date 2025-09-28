import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
    const movies = useSelector(store => store.movies?.trendingMovies)
    if(!movies) return null;
   
    const mainMovie = movies[1]
    if(!mainMovie) return null;
    
    const {original_title, overview, id} = mainMovie

    return(
        <div className="relative w-full h-screen">
            <VideoBackground movieId={id}/>
            <div className="absolute inset-0 flex items-center z-10 px-4 sm:px-8 md:px-12 lg:px-16">
                <VideoTitle title={original_title} overview={overview}/>
            </div>
        </div>
    )
}

export default MainContainer