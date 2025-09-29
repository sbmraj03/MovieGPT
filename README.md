### LIVE URL => https://movienest-7063b.web.app

# MovieGPT - AI-Powered Movie Discovery Platform

MovieGPT is a modern movie discovery platform built with React and powered by AI, offering personalized movie recommendations and an immersive browsing experience.

## Features

- AI-powered movie recommendations using Google's Gemini API
- Seamless movie browsing with dynamic content loading
- Real-time movie trailers and previews
- Multi-language support
- Secure user authentication via Firebase
- Responsive design for all devices
- Integration with TMDB API for extensive movie data

## Tech Stack

- React 18 with Vite
- Redux Toolkit for state management
- Tailwind CSS for styling
- Firebase Authentication and Hosting
- TMDB API for movie data
- Google's Gemini API for AI features

## Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/sbmraj03/MovieNest.git
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Create a `.env` file with required API keys:
   ```
   VITE_TMDB_KEY=your_tmdb_key
   VITE_GEMINI_API_KEY=your_gemini_key
   ```
4. Start development server
   ```bash
   npm run dev
   ```

## Project Structure

```
MovieGPT/
├── src/                    # Source directory
│   ├── components/         # React components
│   │   ├── Body.jsx           # Main layout wrapper
│   │   ├── Browse.jsx         # Movie browsing interface
│   │   ├── Header.jsx         # Navigation and auth header
│   │   ├── Login.jsx          # Authentication component
│   │   ├── MainContainer.jsx  # Featured content display
│   │   ├── MovieCard.jsx      # Individual movie display
│   │   ├── MovieList.jsx      # Horizontal movie scroll
│   │   ├── VideoTitle.jsx     # Movie title overlay
│   │   ├── VideoBackground.jsx # Trailer background
│   │   ├── GPTSearch.jsx      # AI search container
│   │   ├── GPTSearchBar.jsx   # AI search input
│   │   └── GPTMovieSuggestions.jsx # AI recommendations
│   │
│   ├── hooks/              # Custom React hooks
│   │   ├── useMovieTrailer.jsx     # Trailer fetching
│   │   ├── useGetNowPlayingMovies.jsx  # Latest movies
│   │   ├── useGetPopularMovies.jsx     # Popular movies
│   │   ├── useGetTopRatedMovies.jsx    # Top rated
│   │   ├── useGetTrendingMovies.jsx    # Trending
│   │   └── useGetUpcomingMovies.jsx    # Upcoming
│   │
│   ├── utils/              # Utilities and config
│   │   ├── appStore.js         # Redux store config
│   │   ├── configSlice.js      # App settings slice
│   │   ├── moviesSlice.js      # Movies state
│   │   ├── gptSlice.js         # AI features state
│   │   ├── userSlice.js        # User auth state
│   │   ├── firebase.jsx        # Firebase setup
│   │   ├── genAI.js           # Gemini AI config
│   │   ├── constants.js        # API endpoints
│   │   ├── languageConstants.js # i18n strings
│   │   └── validate.jsx        # Form validation
│   │
│   ├── assets/             # Static resources
│   │   └── react.svg          # Images and icons
│   │
│   ├── App.jsx             # Root component
│   ├── main.jsx            # Entry point
│   ├── App.css             # Global styles
│   └── index.css           # Tailwind imports
│
├── public/                 # Public assets
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js         # Build config
├── tailwind.config.js     # Tailwind setup
├── firebase.json          # Firebase config
└── README.md              # Documentation
```
