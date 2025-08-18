import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import MovieCard from "../MovieCard";
import MoviePagination from "./MoviePagination";
import { useMovies } from "../../../hooks/useMovies";
import { usePagination } from "../../../hooks/usePagination";
import { fetchGenres } from "../../../services/fetchMovie";

const MovieList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const pageParam = parseInt(searchParams.get("page")) || 1;

  const [searchValue, setSearchValue] = useState(query);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const { movies, totalPages } = useMovies(query, pageParam, selectedGenres);
  const { currentPage, setCurrentPage, getPageNumbers } = usePagination(
    totalPages,
    5,
    pageParam
  );

  // Fetch Genres (Map)
  useEffect(() => {
    const loadGenres = async () => {
      const g = await fetchGenres();
      setGenres([...g.values()]);
    };
    loadGenres();
  }, []);

  // Update URL Search Params 
  useEffect(() => {
    const params = {};
    if (query) params.query = query;
    if (selectedGenres.length > 0) params.genre = selectedGenres.join(",");
    params.page = currentPage;
    setSearchParams(params);
  }, [query, currentPage, selectedGenres, setSearchParams]);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchValue !== query) {
        setSearchParams({ query: searchValue, page: 1 });
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [searchValue, query, setSearchParams]);

  // Toggle genre filter
  const toggleGenre = (genre) => {
    if (genre === "All") {
      setSelectedGenres([]);
      setSearchParams({ page: 1 });
    } else {
      setSelectedGenres((prev) =>
        prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
      );
    }
  };

  MovieList

  

  return (
    <main className="sm:px-4 md:px-8 lg:px-[130px] py-8 flex flex-col gap-10">
      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-5 w-full">
        <div className="flex flex-col gap-3 relative w-full md:w-[510px]">
          <p className="text-[#4E4B66] font-semibold">Cari Event</p>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="New Born Expert"
            className="w-full h-[48px] pl-10 pr-4 border border-[#DEDEDE] rounded"
          />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <p className="text-[#4E4B66] font-semibold">Filter</p>
          <ul className="flex items-center gap-2 flex-wrap">
            <li>
              <button
                onClick={() => toggleGenre("All")}
                className={`px-4 py-2 rounded-[10px] ${
                  selectedGenres.length === 0 ? "bg-blue-600 text-white" : ""
                }`}
              >
                All
              </button>
            </li>
            {genres.map((genre) => (
              <li key={genre}>
                <button
                  onClick={() => toggleGenre(genre)}
                  className={`px-4 py-2 rounded-[10px] ${
                    selectedGenres.includes(genre)
                      ? "bg-blue-600 text-white"
                      : ""
                  }`}
                >
                  {genre}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Movies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.length === 0 ? (
          <div className="col-span-4 flex justify-center items-center py-8">
            <p className="text-gray-500 font-semibold">No movies found</p>
          </div>
        ) : (
          <MovieCard movies={movies} start={0} end={12} />
        )}
      </div>

      {/* Pagination */}
      <MoviePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        getPageNumbers={getPageNumbers}
        totalPages={totalPages}
      />
    </main>
  );
};

export default MovieList;

