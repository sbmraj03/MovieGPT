import { useDispatch } from "react-redux"
import { addTrailerVideo } from "../utils/moviesSlice"
import { API_OPTIONS } from "../utils/constants"
import { useEffect } from "react"


const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch()

    useEffect(() => {
        let isMounted = true;

        const getMovieVideos = async () => {
            // Don't fetch if no movieId
            if (!movieId) return;
            
            try {
                const data = await fetch(
                    `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, 
                    API_OPTIONS
                );
                const json = await data.json();

                if (!json.results?.length) return;

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

        // Cleanup function
        return () => {
            isMounted = false;
        };
    }, [movieId, dispatch]);
}

export default useMovieTrailer

