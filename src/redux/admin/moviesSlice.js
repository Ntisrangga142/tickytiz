import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [], // simpan list movie
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    addMovie: (state, action) => {
      state.movies.push(action.payload); // tambah movie baru
    },
    removeMovie: (state, action) => {
      state.movies = state.movies.filter((_, index) => index !== action.payload);
    },
    updateMovie: (state, action) => {
      const { id, updatedMovie } = action.payload;
      if (id !== -1) {
        state.movies[id] = { ...state.movies[id], ...updatedMovie };
      }
    },

    resetMovies: (state) => {
      state.movies = [];
    },
  },
});

export const { addMovie, removeMovie, updateMovie, resetMovies } = movieSlice.actions;
export default movieSlice.reducer;
