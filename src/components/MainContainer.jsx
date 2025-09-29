import { useSelector } from "react-redux";
import { useEffect } from "react";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import { MainContainerShimmer } from "./Shimmer";
import useMovieTrailer from "../hooks/useMovieTrailer";

const MainContainer = () => {
    const movies = useSelector(store => store.movies?.trendingMovies); // get trending movies from Redux
    const trailerVideo = useSelector(store => store.movies?.trailerVideo); // current trailer video
    const mainMovie = movies?.[1]; // choose the second trending movie as main
    const movieId = mainMovie?.id;

    // Fetch trailer video for the main movie
    useMovieTrailer(movieId);

    // Show shimmer while data isn't ready
    if(!movies || !mainMovie) {
        return <MainContainerShimmer />;
    }

    const { original_title, overview } = mainMovie;

    return (
        <div className="relative w-full h-screen">
            {/* Background video */}
            <VideoBackground movieId={movieId} />
            
            {/* Movie title and overview overlay */}
            <div className="absolute inset-0 flex items-center z-10 px-4 sm:px-8 md:px-12 lg:px-16">
                <VideoTitle 
                    title={original_title} 
                    overview={overview}
                    movieId={movieId}
                    trailerKey={trailerVideo?.key}
                />
            </div>
        </div>
    );
};

export default MainContainer;
