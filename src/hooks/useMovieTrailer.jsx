import { useDispatch } from "react-redux"
import { addTrailerVideo } from "../utils/moviesSlice"
import { API_OPTIONS } from "../utils/constants"
import { useEffect } from "react"

// Custom hook to fetch and store the trailer video for a given movie
const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch()

    useEffect(() => {
        let isMounted = true; // Flag to prevent state updates after unmount

        const getMovieVideos = async () => {
            if (!movieId) return; // Skip if movieId is not provided
            
            try {
                const data = await fetch(
                    `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, 
                    API_OPTIONS
                );
                const json = await data.json();

                if (!json.results?.length) return; // No videos available

                // Prefer trailers, fallback to first available video
                const filterdata = json.results.filter(video => video.type === "Trailer");
                const trailer = filterdata.length ? filterdata[0] : json.results[0];
                
                if (trailer && isMounted) {
                    dispatch(addTrailerVideo(trailer));
                }
            } catch (error) {
                if (isMounted) {
                    console.error("Error fetching movie trailer:", error);
                }
            }
        };

        getMovieVideos();

        // Cleanup to prevent updates on unmounted component
        return () => {
            isMounted = false;
        };
    }, [movieId, dispatch]);
}

export default useMovieTrailer
