import { IMG_CDN_URL } from "../utils/constants"

const MovieCard = ({posterPath, movieData}) => {
  if(!posterPath) return null;
  
  return (
    <div className="w-full h-full">
      <img 
        src={IMG_CDN_URL + posterPath} 
        alt={movieData?.title || "Movie Card"}
        className="w-full h-auto rounded-lg shadow-lg object-cover"
        loading="lazy"
      />
    </div>
  )
}

export default MovieCard