import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";

const MovieFilter = ({ genres }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("query") || "");
  const [selectedGenres, setSelectedGenres] = useState(
    searchParams.get("genres") ? searchParams.get("genres").split(",") : []
  );

  // Debounce Search
  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();
      if (searchValue) params.set("query", searchValue);
      if (selectedGenres.length > 0) params.set("genres", selectedGenres.join(","));
      params.set("page", "1");
      setSearchParams(params);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchValue, selectedGenres]);

  const toggleGenre = (genre) => {
    if (genre === "All") {
      setSelectedGenres([]);
    } else {
      setSelectedGenres((prev) =>
        prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
      );
    }
  };

  return (
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
          {genres.slice(0, 5).map((genre) => (
            <li key={genre}>
              <button
                onClick={() => toggleGenre(genre)}
                className={`px-4 py-2 rounded-[10px] ${
                  selectedGenres.includes(genre) ? "bg-blue-600 text-white" : ""
                }`}
              >
                {genre}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieFilter;
