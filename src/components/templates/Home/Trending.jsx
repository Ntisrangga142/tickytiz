import { Link } from "react-router";
import MovieCard from "../MovieCard.jsx";

function Trending({ movies }) {
  return (
    <section className="py-4 px-6 md:px-12 lg:px-[130px] flex justify-center">
      <div className="flex flex-col justify-between items-center gap-3 w-full">
        
        {/* Sub Title */}
        <div className="text-center">
          <h2 className="font-bold text-sm sm:text-base md:text-lg lg:text-[18px] tracking-[0.75px] text-[#1D4ED8]">
            MOVIES
          </h2>
        </div>

        {/* Main Title */}
        <div className="text-center w-full sm:w-[90%] md:w-[70%] lg:w-[545px]">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[32px] 
                         leading-6 sm:leading-7 md:leading-9 lg:leading-[45px] 
                         font-normal tracking-[1px] text-[#121212]">
            Exciting Movies That Should Be Watched Today
          </h1>
        </div>

        {/* Grid Movies dengan scroll hanya di md kebawah */}
        <div className="w-full max-lg:overflow-x-scroll max-md:-mx-6 max-md:px-6 max-lg:overflow-y-visible ">
          <div className="grid grid-cols-[repeat(4,minmax(200px,1fr))] gap-[20px] max-md:min-w-max md:ml-3 md:mt-3">
            <MovieCard movies={movies} limit={4} />
          </div>
        </div>

        {/* View All */}
        <div className="w-full mt-5 text-center">
          <Link to="/movies" className="hover: font-bold text-sm sm:text-base md:text-lg lg:text-[18px] tracking-[1px] no-underline text-[#1D4ED8] cursor-pointer">
            View All →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Trending;