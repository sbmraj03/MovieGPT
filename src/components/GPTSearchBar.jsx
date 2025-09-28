import { useSelector, useDispatch } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import genAI from "../utils/genai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GPTSearchBar = () => {
    const dispatch = useDispatch();
    const langKey = useSelector((store) => store.config.lang);
    const searchText = useRef(null);

    // search movie in TMDB
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
        console.log("Search input:", searchText.current.value);

        if (!searchText.current.value.trim()) {
            console.log("No search text provided");
            return;
        }

        try {
            console.log("Initializing Gemini model...");
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
            console.log("Model initialized successfully");

            const gptQuery =
                "Act as a Movie Recommendation system and suggest some movies for the query: " +
                searchText.current.value +
                ". Only give me names of 5 movies, comma separated. Example: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

            console.log("Sending query to Gemini:", gptQuery);
            const geminiResult = await model.generateContent(gptQuery);
            console.log("Received response from Gemini");

            if (!geminiResult.response) {
                console.error("No response from Gemini API");
                return;
            }

            const textResult = geminiResult.response.text();
            console.log("Gemini Response:", textResult);

            // Process the movie names from Gemini response
            const gptMovies = textResult.split(',').map(movie => movie.trim());
            console.log("GPT Movie Names:", gptMovies);

            // For each movie, search TMDB API
            console.log("Searching TMDB for movies...");
            const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
            
            const tmdbResults = await Promise.all(promiseArray);
            console.log("TMDB Results:", tmdbResults);

            // Dispatch the results to Redux store
            dispatch(
                addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
            );
            
            console.log("Results stored in Redux store");

        } catch (error) {
            console.error("Error fetching Gemini results:", error);
        }
    };

    return (
        <div className="pt-[10%] flex justify-center relative z-20">
            <form className="w-1/2 bg-gray-800 border border-gray-600 rounded-lg grid grid-cols-12 shadow-2xl" onSubmit={(e) => e.preventDefault()}>
                <input
                    ref={searchText}
                    type="text"
                    className="p-4 m-4 col-span-9 bg-gray-700 text-white placeholder-gray-300 border border-gray-600 rounded focus:outline-none focus:border-red-500"
                    placeholder={lang[langKey].gptSearchPlaceholder}
                />
                <button className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors"
                    onClick={handleGeminiSearchClick}>
                    {lang[langKey].search}
                </button>
            </form>
        </div>
    );
};
export default GPTSearchBar