export const LOGO = "https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"

export const API_URL_TRENDING = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US'

export const API_URL_NOW_PLAYING = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1'

export const API_URL_UPCOMING = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1'

export const API_URL_POPULAR = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'

export const API_URL_TOP_RATED = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';


export const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTRjMzgyOWM5NWZmZjlmNzZhOTgyZWRjMWRjYjkxYyIsIm5iZiI6MTc1NTc2MTc2Mi4xNiwic3ViIjoiNjhhNmNjNjIxNTk5NjA0ZTVmODM0ZWZhIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.kR8SOXG_umdfkBPJ6aZ9e28X6LCtgT9rjHKeqDZWL84'
  }
};

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w780/"

export const BG_URL = "https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_large.jpg"

export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "hindi", name: "Hindi" },
  { identifier: "spanish", name: "Spanish" },
];

export const GEMINI_API_KEY="AIzaSyA89I2ZHQamisD5O86OnIUuJBfHdw_chCg";