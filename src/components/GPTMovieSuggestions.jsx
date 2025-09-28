import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  if (!movieNames) return null;

  return (
    <div className="min-h-screen bg-black/60 backdrop-blur-sm">
      {/* Content Container */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-10">
        {/* Header */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold text-center">
            Movie Suggestions
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-red-600 mx-auto mt-2"></div>
        </div>

        {/* Movie Lists */}
        <div className="space-y-6 sm:space-y-8 md:space-y-10">
          {movieNames.map((movieName, index) => (
            <div 
              key={movieName}
              className="bg-gray-900/40 backdrop-blur-sm rounded-lg p-3 sm:p-4 md:p-6 border border-gray-700/50"
            >
              <MovieList
                title={movieName}
                movies={movieResults[index]}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GptMovieSuggestions;