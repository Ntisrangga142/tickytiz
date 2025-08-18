import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function MovieCard({ movies, start= 0, end = 4}) {
  const navigate = useNavigate();

  const { trending } = useSelector((state) => state.movies);

  if (!movies || movies.length === 0) { return <h1>No movies found</h1>; }

  return (
    <>
      {movies.slice(start, end).map((movie) => (
        <div
          key={movie.id}
          className="card-movie w-full flex flex-col gap-3 lg:gap-[12px] justify-between 
               min-h-[420px] md:min-h-[450px] lg:min-h-[500px]">
          {/* Poster */}
          <div className="group imgContent w-full [aspect-ratio:217.25/325.88] relative ">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="relative w-full h-auto rounded-lg text-center z-1" />

            {/* Hover Actions */}
            <div className="absolute inset-0 flex justify-center items-center z-1 group-hover:bg-black/40 [aspect-ratio:217.25/325.88]">
              <ul className="flex flex-col items-center gap-4 md:gap-5 lg:gap-[20px] h-1/5 w-[70%]">
                <li>
                  <button
                    onClick={() => navigate(`/movies/${movie.id}`)}
                    className="hidden group-hover:block px-3 md:px-6 lg:px-8 py-2 lg:py-[12px]
                         w-full text-xs lg:text-[14px] tracking-[0.75px] rounded-[5px]
                         border border-white text-white cursor-pointer">
                    Details
                  </button>
                </li>
                <li>
                  <a
                    href="#"
                    className="hidden group-hover:block px-3 md:px-4 lg:px-5 py-2 lg:py-[12px]
                         w-full text-xs lg:text-[14px] tracking-[0.75px] rounded-[5px]
                         text-white bg-[#1D4ED8]">
                    Buy Ticket
                  </a>
                </li>
              </ul>
            </div>

            {/* Recommended Tag */}
            <div
              className={`absolute -top-2 lg:top-[-10px] -left-3 lg:-left-[15px] 
                    w-[130px] lg:w-[175px] 
                    [aspect-ratio:135/25] rounded-tl-[10px] rounded-br-[20px] rounded-tr-[20px] 
                    bg-[#1D4ED8] text-center z-2 ${!trending.some((p) => p.id === movie.id) && "hidden"}`}>
              <p className="text-xs lg:text-[14px] leading-5 lg:leading-[24px] tracking-[0.75px] text-white">Recommended</p>
            </div>

            {/* Segitiga kecil */}
            <div
              className={`absolute -left-[8px] lg:-left-[9px] top-1.5 lg:top-[10px] 
                    w-[20px] lg:w-[25px] [aspect-ratio:1/1] bg-[#163899] rotate-45 z-0 ${!trending.some((p) => p.id === movie.id) && "hidden"}`}
            />
          </div>

          {/* Title */}
          <div className="h-[50px] lg:h-[70px] flex items-start">
            <h1
              className="font-bold text-base md:text-xl lg:text-[24px] tracking-[1px]
                   leading-6 md:leading-8 lg:leading-[34px] break-words text-[#14142B] 
                   line-clamp-2">
              {movie.title}
            </h1>
          </div>

          {/* Genres */}
          <div className="min-h-[40px] flex items-center">
            <ul
              className="flex flex-wrap overflow-x-auto no-scrollbar gap-1 
                   text-[#14142B] font-bold text-base md:text-xl lg:text-[24px]
                   leading-6 md:leading-8 lg:leading-[34px]">
              {movie.genres?.slice(0, 3).map((genre) => {
                if (genre.name === "Science Fiction")
                  return (
                    <li
                      key={genre.id}
                      className="whitespace-nowrap px-2 rounded-[25px] bg-[#A0A3BD1A]
                         list-none text-[#A0A3BD] font-normal text-xs md:text-base lg:text-[16px]
                         tracking-[0.75px] leading-6 md:leading-8 lg:leading-[32px]">
                      {`Sci-Fi`}
                    </li>
                  );
                if (genre.name !== "Science Fiction")
                  return (
                    <li
                      key={genre.id}
                      className="whitespace-nowrap px-2 rounded-[25px] bg-[#A0A3BD1A]
                         list-none text-[#A0A3BD] font-normal text-xs md:text-base lg:text-[16px]
                         tracking-[0.75px] leading-6 md:leading-8 lg:leading-[32px]">
                      {genre.name}
                    </li>
                  );
              })}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
}

export default MovieCard;
