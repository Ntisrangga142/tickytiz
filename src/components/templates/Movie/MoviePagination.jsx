const MoviePagination = ({ setCurrentPage, currentPage, getPageNumbers, totalPages }) => {
  return (
    <div className="flex justify-center items-center mt-8">
      <ul className="flex gap-4 items-center">
        {/* Prev */}
        <li>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded-full disabled:opacity-50"
          >
            Prev
          </button>
        </li>

        {/* Page numbers */}
        {getPageNumbers().map((page) => (
          <li key={page}>
            <button
              onClick={() => setCurrentPage(page)}
              className={`w-[40px] h-[40px] rounded-full ${
                currentPage === page ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {page}
            </button>
          </li>
        ))}

        {/* Next */}
        <li>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded-full disabled:opacity-50"
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default MoviePagination;
