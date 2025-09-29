import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  if (!movieNames) return null;

  return (
    <div className="p-4 bg-black/95 mt-12 text-white mx-4">
      <h2 className="text-2xl font-bold mt-4 mb-4 text-center">Movie Suggestions</h2>
      
      <div className="space-y-6">
        {movieNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[index]?.filter(movie => movie?.poster_path)}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;