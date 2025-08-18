import { useState, useEffect } from "react";
import {
  fetchPopularMovies,
  fetchSearchMovies,
  fetchDiscoverMovies,
  fetchGenres,
  addGenreNames
} from "../services/fetchMovie";

export const useMovies = (query, page, selectedGenres) => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(500);
  const [genresMap, setGenresMap] = useState(new Map());

  // Fetch Genres 
  useEffect(() => {
    const loadGenres = async () => {
      const g = await fetchGenres();
      setGenresMap(g);
    };
    loadGenres();
  }, []);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        let results = [];
        let total_results = 0;
        let total_pages = 500;

        // CASE 1: Popular (default)
        if (!query && selectedGenres.length === 0) {
          const res = await fetchPopularMovies(page);
          results = addGenreNames(res.results, genresMap);
          total_results = 500 * 12; // default max
        }

        // CASE 2: Search
        else if (query && selectedGenres.length === 0) {
          const res = await fetchSearchMovies(query, page);
          results = addGenreNames(res.results, genresMap);
          total_results = res.total_results;
          total_pages = Math.ceil(total_results / 12);
        }

        // CASE 3: Filter Only
        else if (!query && selectedGenres.length > 0) {
          // ambil ID genre → karena dari fetchGenres hasilnya Map
          const genreIds = [];
          genresMap.forEach((name, id) => {
            if (selectedGenres.includes(name)) genreIds.push(id);
          });

          const res = await fetchDiscoverMovies(page, genreIds.join(","));
          results = addGenreNames(res.results, genresMap);
          total_results = res.total_results;
          total_pages = Math.ceil(total_results / 12);
        }

        // CASE 4: Search + Filter
        else if (query && selectedGenres.length > 0) {
          const res = await fetchSearchMovies(query, page);
          results = addGenreNames(res.results, genresMap);
          results = results.filter((m) =>
            m.genre_ids.some((gid) => {
              const gname = genresMap.get(gid);
              return selectedGenres.includes(gname);
            })
          );
          total_results = results.length;
          total_pages = Math.ceil(total_results / 12);
        }

        setMovies(results);
        setTotalPages(total_pages);
      } catch (err) {
        console.error("Error fetching movies", err);
      }
    };

    loadMovies();
  }, [query, page, selectedGenres, genresMap]);

  return { movies, totalPages, genresMap };
};
