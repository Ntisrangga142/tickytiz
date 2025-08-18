import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";


export const useSearch = (selectedGenres, setSelectedGenres) => {
  const navigate = useNavigate();
  const { page, search } = useParams();

  const [searchValue, setSearchValue] = useState(search || "");

  // Toggle genre
  const updateSelectedGenres = (genre) => {
    let newSelected;
    if (Array.isArray(genre)) {
      newSelected = [];
    } else {
      if (selectedGenres.includes(genre)) {
        newSelected = selectedGenres.filter((g) => g !== genre);
      } else {
        newSelected = [...selectedGenres, genre];
      }
    }

    setSelectedGenres(newSelected);
    updateParams(searchValue, newSelected);
  };

  // Debounce search
  useEffect(() => {
    const timeout = setTimeout(() => {
      updateParams(searchValue, selectedGenres);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchValue]);

  // Update URL params
  const updateParams = (search, genresArr) => {
    let url = `/movies/${page || 1}`;

    if (search) {
      url += `/search/${encodeURIComponent(search)}`;
    }

    if (genresArr.length > 0) {
      url += `/filters/${encodeURIComponent(genresArr.join(","))}`;
    }

    navigate(url);
  };

  return {
    searchValue,
    setSearchValue,
    updateSelectedGenres,
  };
};
