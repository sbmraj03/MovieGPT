import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        trendingMovies: null,
        trailerVideo: null,
        nowPlayingMovies: null,
        popularMovies: null,
        upcomingMovies: null,
        topRatedMovies: null,
        currentlyPlayingMovieId: null
    },
    reducers: {
        addTrendingMovies: (state, action) => {
            state.trendingMovies = action.payload;
        },
        addTrailerVideo: (state, action) => {
            state.trailerVideo = action.payload
        },
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        addUpcomingMovies: (state, action) => {
            state.upcomingMovies = action.payload;
        },
        addTopRatedMovies: (state, action) => {
            state.topRatedMovies = action.payload;
        },
        setCurrentlyPlayingMovieId: (state, action) => {
            state.currentlyPlayingMovieId = action.payload; // movie id or null
        },

    },

});

export const { addTrendingMovies, addTrailerVideo, addNowPlayingMovies, addPopularMovies, addUpcomingMovies, addTopRatedMovies, setCurrentlyPlayingMovieId } = movieSlice.actions;
export default movieSlice.reducer;