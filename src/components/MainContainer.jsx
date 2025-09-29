import { useSelector } from "react-redux";
import { useEffect } from "react";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import { MainContainerShimmer } from "./Shimmer";
import useMovieTrailer from "../hooks/useMovieTrailer";

const MainContainer = () => {
    const movies = useSelector(store => store.movies?.trendingMovies)
    const trailerVideo = useSelector(store => store.movies?.trailerVideo)
    const mainMovie = movies?.[1]
    const movieId = mainMovie?.id

    // Call hooks at the top level
    useMovieTrailer(movieId)

    // If data isn't ready, show shimmer
    if(!movies || !mainMovie) {
        return <MainContainerShimmer />;
    }

    const {original_title, overview} = mainMovie

    return(
        <div className="relative w-full h-screen">
            {/* While trailer loads, still show the background (will update when ready) */}
            <VideoBackground movieId={movieId}/>
            <div className="absolute inset-0 flex items-center z-10 px-4 sm:px-8 md:px-12 lg:px-16">
                <VideoTitle 
                    title={original_title} 
                    overview={overview}
                    movieId={movieId}
                    trailerKey={trailerVideo?.key}
                />
            </div>
        </div>
    )
}

export default MainContainer