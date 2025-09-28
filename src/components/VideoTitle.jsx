const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute top-75 px-4 sm:px-8 md:px-12 w-full sm:w-3/4 md:w-1/2 text-white z-10">
      {/* Title */}
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-lg mb-4">
        {title}
      </h1>

      {/* Overview */}
      <p className="text-sm sm:text-base md:text-lg font-normal text-gray-200 drop-shadow-md mb-6">
        {overview}
      </p>

      {/* Action buttons */}
      <div className="flex gap-2 sm:gap-4">
        <button className="px-4 sm:px-6 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition hover:cursor-pointer text-sm sm:text-base">
          ▶ Play
        </button>
        <button className="px-4 sm:px-6 py-2 bg-gray-700 bg-opacity-70 text-white font-semibold rounded-md hover:bg-gray-600 transition hover:cursor-pointer text-sm sm:text-base">
          ℹ More Info
        </button>
      </div>
    </div>
  )
}

export default VideoTitle