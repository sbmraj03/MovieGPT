import { BG_URL } from "../utils/constants";
import GptSearchBar from "./GPTSearchBar";

const GPTSearch = () => {
    return (
        <div className="relative min-h-screen">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    className="w-full h-full object-cover"
                    src={BG_URL}
                    alt="background"
                />
            </div>
            {/* Search Bar with higher z-index */}
            <div className="relative z-10">
                <GptSearchBar />
            </div>
        </div>
    )
};

export default GPTSearch;