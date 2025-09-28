import { useSelector } from "react-redux"
import useMovieTrailer from "../hooks/useMovieTrailer"

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo)

  useMovieTrailer(movieId)

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* YouTube video wrapper */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <iframe
          className="w-full h-full scale-125" 
          src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=0&mute=1&controls=0&showinfo=0&loop=1&playlist=${trailerVideo?.key}&vq=tiny`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
    </div>
  )
}

export default VideoBackground