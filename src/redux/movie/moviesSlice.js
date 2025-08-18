import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllMovies } from "../../services/fetchMovie.js";

export const fetchAllMoviesThunk = createAsyncThunk(
  "movies/fetchAll",
  async (page = 1, thunkAPI) => {
    try {
      const data = await fetchAllMovies(page);
      console.log(data)
      return data.movies;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlaying  : [],
    trending    : [],
    upcoming    : [],
    popular     : [],
    status      : "idle",
    error       : null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMoviesThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllMoviesThunk.fulfilled, (state, action) => {
        state.status      = "succeeded";
        state.nowPlaying  = action.payload.nowPlaying;
        state.trending    = action.payload.trending;
        state.upcoming    = action.payload.upcoming;
        state.popular     = action.payload.popular;
      })
      .addCase(fetchAllMoviesThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default moviesSlice.reducer;
