const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute top-75 px-12 w-1/2 text-white z-10">
      {/* Title */}
      <h1 className="text-5xl font-extrabold drop-shadow-lg mb-4">
        {title}
      </h1>

      {/* Overview */}
      <p className="text-lg font-normal text-gray-200 drop-shadow-md mb-6">
        {overview}
      </p>

      {/* Action buttons */}
      <div className="flex gap-4">
        <button className="px-6 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition hover:cursor-pointer">
          ▶ Play
        </button>
        <button className="px-6 py-2 bg-gray-700 bg-opacity-70 text-white font-semibold rounded-md hover:bg-gray-600 transition hover:cursor-pointer">
          ℹ More Info
        </button>
      </div>
    </div>
  )
}

export default VideoTitle
