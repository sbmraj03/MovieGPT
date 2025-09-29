import { BG_URL } from "../utils/constants";
import GptSearchBar from "./GPTSearchBar";
import GPTMovieSuggestions from "./GPTMovieSuggestions";

const GPTSearch = () => {
    return (
        <div className="relative min-h-screen">
            {/* Background image */}
            <div className="absolute inset-0 z-0">
                <img
                    className="w-full h-full object-cover"
                    src={BG_URL}
                    alt="background"
                />
            </div>

            {/* Search bar + suggestions (overlayed above background) */}
            <div className="relative z-10 pt-32 md:pt-0">
                <GptSearchBar />
                <GPTMovieSuggestions />
            </div>
        </div>
    )
};

export default GPTSearch;
