import { useSearchParams } from "react-router";

export const usePagination = (totalPages, limit = 5) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const setCurrentPage = (page) => {
    if (page < 1 || page > totalPages) return;
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };

  const getPageNumbers = () => {
    let start = Math.max(1, currentPage - Math.floor(limit / 2));
    let end = Math.min(totalPages, start + limit - 1);

    if (end - start < limit - 1) {
      start = Math.max(1, end - limit + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return { currentPage, setCurrentPage, getPageNumbers };
};
