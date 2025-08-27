import { useState } from "react";
import MovieCard from "../MovieCard.jsx";

function UpComing({ movies }) {
  const [page, setPage] = useState(1);
  const moviesPerPage = 4;

  const startIndex = (page - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const paginatedMovies = movies.slice(startIndex, endIndex);

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page < Math.ceil(movies.length / moviesPerPage)) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <section
      className="flex flex-col gap-7 py-4 px-[130px] mb-[25px] 
      2xl:px-[180px] xl:px-[150px] lg:px-[130px] md:px-12 sm:px-6"
    >
      {/* Header */}
      <div
        className="
        flex flex-col items-center text-center gap-[14px]
        lg:flex-row lg:justify-between lg:items-center lg:text-left lg:gap-0
      "
      >
        {/* Title */}
        <div>
          <h2
            className="font-bold text-[18px] tracking-[0.75px] text-[#1D4ED8]
            2xl:text-[22px] xl:text-[20px] lg:text-[18px] md:text-[18px] sm:text-[18px]"
          >
            UPCOMING MOVIES
          </h2>
          <h1
            className="text-[32px] font-normal tracking-[1px]
            2xl:text-[40px] xl:text-[36px] lg:text-[32px] md:text-[28px] sm:text-[28px]"
          >
            Exciting Movie Coming Soon
          </h1>
        </div>

        {/* Arrows (hidden below lg) */}
        <div className="hidden lg:flex justify-end items-center gap-[14px]">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className={`p-[15px] rounded-full text-center transition
            2xl:p-[18px] xl:p-[16px] lg:p-[15px] ${
              page === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-[#A0A3BD]"
            }`}
          >
            <img
              src="./assets/imgs/home/icon/arrow-left.png"
              alt="arrow-left"
              className="w-6 h-6 2xl:w-7 2xl:h-7 xl:w-[26px] xl:h-[26px]"
            />
          </button>
          <button
            onClick={handleNext}
            disabled={page === Math.ceil(movies.length / moviesPerPage)}
            className={`p-[15px] rounded-full text-center transition
            2xl:p-[18px] xl:p-[16px] lg:p-[15px] ${
              page === Math.ceil(movies.length / moviesPerPage)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-700"
            }`}
          >
            <img
              src="./assets/imgs/home/icon/arrow-right.png"
              alt="arrow-right"
              className="w-6 h-6 2xl:w-7 2xl:h-7 xl:w-[26px] xl:h-[26px]"
            />
          </button>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="w-full max-lg:overflow-x-scroll max-md:-mx-6 max-md:px-6 max-lg:overflow-y-visible">
        <div className="grid grid-cols-[repeat(4,minmax(200px,1fr))] gap-[20px] max-md:min-w-max md:ml-3 md:mt-3">
          <MovieCard movies={paginatedMovies} />
        </div>
      </div>
    </section>
  );
}

export default UpComing;
