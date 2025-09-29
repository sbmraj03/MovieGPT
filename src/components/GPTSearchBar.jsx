import { useSelector, useDispatch } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef, useState } from "react";
import genAI from "../utils/genAI";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GPTSearchBar = () => {
    const dispatch = useDispatch();
    const langKey = useSelector((store) => store.config.lang);
    const searchText = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    // Search movie in TMDB API
    const searchMovieTMDB = async (movie) => {
        const data = await fetch(
            "https://api.themoviedb.org/3/search/movie?query=" +
            movie +
            "&include_adult=false&language=en-US&page=1",
            API_OPTIONS
        );
        const json = await data.json();

        return json.results;
    };

    const handleGeminiSearchClick = async () => {
        // console.log("Search input:", searchText.current.value);

        if (!searchText.current.value.trim()) {
            // console.log("No search text provided");
            return;
        }

        setIsLoading(true);

        try {
            // console.log("Initializing Gemini model...");
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
            // console.log("Model initialized successfully");

            const gptQuery =
                "Act as a Movie Recommendation system and suggest some movies for the query: " +
                searchText.current.value +
                ". IMPORTANT: Only respond with exactly 5 movie names separated by commas. No other text, no explanations, no formatting. Example format: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

            // console.log("Sending query to Gemini:", gptQuery);
            const geminiResult = await model.generateContent(gptQuery);
            // console.log("Received response from Gemini");

            if (!geminiResult.response) {
                // console.error("No response from Gemini API");
                return;
            }

            const textResult = geminiResult.response.text();
            // console.log("Gemini Response:", textResult);

            // Extract only movie names from the response
            let movieNames = textResult;
            
            if (textResult.includes(':')) {
                movieNames = textResult.split(':').pop();
            }
            
            const gptMovies = movieNames
                .split(',')
                .map(movie => movie.trim())
                .filter(movie => movie.length > 0);
            // console.log("GPT Movie Names:", gptMovies);

            // For each movie, search TMDB API
            // console.log("Searching TMDB for movies...");
            const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

            const tmdbResults = await Promise.all(promiseArray);
            // console.log("TMDB Results:", tmdbResults);

            // Dispatch the results to Redux store
            dispatch(
                addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
            );

            // console.log("Results stored in Redux store");

        } catch (error) {
            // console.error("Error fetching Gemini results:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="pt-[10%] flex flex-col justify-center items-center relative z-20 px-4">
            <form className="w-full max-w-md md:max-w-2xl bg-gray-800 border border-gray-600 rounded-lg shadow-2xl"
                onSubmit={(e) => e.preventDefault()}>

                {/* Search input + button */}
                <div className="flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-3 p-4">
                    <input
                        ref={searchText}
                        type="text"
                        disabled={isLoading}
                        className="w-full md:col-span-9 p-4 md:mr-4 bg-gray-700 text-white placeholder-gray-300 border border-gray-600 rounded focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder={lang[langKey].gptSearchPlaceholder}
                    />
                    <button
                        className="w-full md:col-span-3 py-4 md:py-2 px-4 bg-red-700 text-white rounded-lg hover:bg-red-800 active:bg-red-900 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-700"
                        onClick={handleGeminiSearchClick}
                        disabled={isLoading}
                    >
                        {isLoading ? "Searching..." : lang[langKey].search}
                    </button>
                </div>
            </form>
        </div>
    );
};
export default GPTSearchBar;
