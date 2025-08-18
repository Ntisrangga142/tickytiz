import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

const API_GENRES = import.meta.env.VITE_API_URL_GENRES;
const API_NOW_PLAYING = import.meta.env.VITE_API_URL_NOW_PLAYING;
const API_TRENDING = import.meta.env.VITE_API_URL_TRENDING;
const API_UPCOMING = import.meta.env.VITE_API_URL_UPCOMING;
const API_POPULAR = import.meta.env.VITE_API_URL_POPULAR;

const API_SEARCH = import.meta.env.VITE_API_URL_SEARCH;
const API_DISCOVER = import.meta.env.VITE_API_URL_DISCOVER;
const API_DETAILS = import.meta.env.VITE_API_URL_DETAILS;

export const addGenreNames = (movies, genresMap) => {
  return movies.map((movie) => ({
    ...movie,
    genres: movie.genre_ids.map((id) => ({
      id,
      name: genresMap.get(id) || "",
    })),
  }));
};

export const fetchGenres = async () => {
  try {
    const response = await axios.get(`${API_GENRES}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });

    const data = response.data;

    // Ubah array genres jadi Map id -> name
    const genresMap = new Map();
    data.genres.forEach((genre) => {
      genresMap.set(genre.id, genre.name);
    });

    return genresMap;
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const genresMap = await fetchGenres();

    const response = await axios.get(`${API_DETAILS}${id}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });
    const data = response.data;

    // Dari data.genres (array objek {id, name}) buat array nama genre
    const genres_name = data.genres?.map((g) => genresMap.get(g.id) || g.name || "") || [];

    return {
      ...data,
      genres_name,
    };
  } catch (error) {
    console.error("Error fetching movie details with genres:", error);
    throw error;
  }
};

export const fetchSearchMovies = async (query, page = 1) => {
  let url = import.meta.env.VITE_API_URL_SEARCH;
  let params = { api_key: API_KEY, language: "en-US", query, page };

  const res = await axios.get(url, { params });
  return res.data;
};

export const fetchDiscoverMovies = async (page = 1, genreId = null) => {
  try {
    const params = {
      api_key: API_KEY,
      language: "en-US",
      page,
    };
    if (genreId) {
      params.with_genres = genreId;
    }

    const response = await axios.get(`${API_DISCOVER}`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching discover movies:", error);
    throw error;
  }
};

export const fetchNowPlayingMovies = async (page = 1) => {
  try {
    const response = await axios.get(`${API_NOW_PLAYING}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    throw error;
  }
};

export const fetchTrendingMovies = async (page = 1) => {
  try {
    const response = await axios.get(`${API_TRENDING}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

export const fetchUpcomingMovies = async (page = 1) => {
  try {
    const response = await axios.get(`${API_UPCOMING}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

export const fetchPopularMovies = async (page = 1) => {
  try {
    const response = await axios.get(`${API_POPULAR}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

export const fetchAllMovies = async (page = 1) => {
  try {
    const [genres, nowPlaying, trending, upcoming, popular] = await Promise.all([fetchGenres(), fetchNowPlayingMovies(page), fetchTrendingMovies(page), fetchUpcomingMovies(page), fetchPopularMovies(page)]);

    const allMovies = {
      movies: {
        nowPlaying: addGenreNames(nowPlaying.results, genres),
        trending: addGenreNames(trending.results, genres),
        upcoming: addGenreNames(upcoming.results, genres),
        popular: addGenreNames(popular.results, genres),
      },
    };

    return allMovies;
  } catch (error) {
      console.error("Error fetching all movies:", error);
    throw error;
  }
};
