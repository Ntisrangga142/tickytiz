import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useDirector from "../../../hooks/useDirector.js";
import useCast from "../../../hooks/useCast.js";
import { fetchMovieDetails } from "../../../services/fetchMovie.js";
import { addOrder } from "../../../redux/order/orderSlice.js";
import { useDispatch } from "react-redux";

function MainDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCinema, setSelectedCinema] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();


  useEffect(() => {
    async function loadMovie() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError("Failed to load movie details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadMovie();
    }
  }, [id]);

  const director = useDirector(movie?.id);
  const cast = useCast(movie?.id);

  useEffect(() => {
    if (date && time && location && selectedCinema && movie) {
      dispatch(addOrder({ key: 'date', order: date }));
      dispatch(addOrder({ key: 'time', order: time }));
      dispatch(addOrder({ key: 'location', order: location }));
      dispatch(addOrder({ key: 'cinema', order: selectedCinema }));
      dispatch(addOrder({ key: 'movieId', order: movie.id }));
      dispatch(addOrder({ key: 'movieTitle', order: movie.title }));
    }
  }, [date, time, location, selectedCinema, movie, dispatch]);

  const cinemas = ["Cine One 21", "hiflix", "ebu.id", "Cinemark"];

  const handleSelect = (cinema) => {
    setSelectedCinema(cinema);
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-red-600">{error}</div>;
  if (!movie) return null; // safety fallback

  // RENDERING tetap sama, hanya ubah input agar controllable
  return (
    <main className="relative w-full">
      <div className="w-full h-full">
        {/* Hero Background */}
        <div
          className="w-full h-[415px] bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            backgroundPosition: "50% 16%",
          }}
        />

        {/* Poster + Info */}
        <div className="flex lg:flex-row lg:px-[130px] md:flex-col md:items-start md:justify-center md:w-full md:px-8 md:relative md:top-0 md:left-0">
          {/* Movie Poster */}
          <div className="md:absolute md:-top-50 md:left-60 lg:left-[130px]">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-[264px] h-[405px]" />
          </div>

          {/* Movie Info */}
          <div className="flex flex-col gap-[20px] md:mt-65 md:w-full md:items-center lg:items-start lg:w-auto lg:mt-0 lg:ml-70 2xl:ml-0">
            <h1 className="font-bold text-[32px] tracking-[1px]">{movie.title}</h1>
            <ul className="flex gap-[7px] md:justify-center">
              {(movie.genres_name || []).slice(0, 2).map((genre, index) => (
                <li key={index} className="bg-[#A0A3BD] text-[16px] px-[15px] py-[5px] rounded-[20px] tracking-[0.75px]">
                  {genre || "Unknown"}
                </li>
              ))}
            </ul>

            {/* Detail Info Grid */}
            <div className="grid grid-cols-[0.5fr_1fr] grid-rows-[0.5fr_1fr] gap-4 w-full md:grid-cols-[1fr_1fr] md:grid-rows-[1fr_1fr] md:items-center">
              <div>
                <h2 className="text-sm text-[#8692A6] tracking-[0.75px]">Release date</h2>
                <p className="text-base text-[#121212] tracking-[0.75px]">{movie.release_date}</p>
              </div>
              <div>
                <h2 className="text-sm text-[#8692A6] tracking-[0.75px]">Directed by</h2>
                <p className="text-base text-[#121212] tracking-[0.75px]">{director}</p>
              </div>
              <div>
                <h2 className="text-sm text-[#8692A6] tracking-[0.75px]">Duration</h2>
                <p className="text-base text-[#121212] tracking-[0.75px]">{movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "Unknown"}</p>
              </div>
              <div>
                <h2 className="text-sm text-[#8692A6] tracking-[0.75px]">Cast</h2>
                <p className="text-base text-[#121212] tracking-[0.75px]">{cast.length > 0 ? cast.join(", ") : "Unknown"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Synopsis */}
      <div className="flex flex-col gap-[20px] lg:px-[130px] md:px-8 px-4 lg:mt-20 md:mt-10 mt-6 w-full">
        <h1 className="text-[20px] font-semibold text-black tracking-[0.5px]">Synopsis</h1>
        <p className="text-[#A0A3BD] text-[16px] tracking-[0.5px] leading-[32px]">{movie.overview || "No synopsis available."}</p>
      </div>

      {/* Booking Filters */}
      <div className="lg:px-[130px] lg:mt-[50px] md:px-8">
        <h1 className="text-[32px] tracking-[1px] text-[#121212] leading-[45px] font-normal">Book Tickets</h1>
        <div className="flex gap-[30px] mt-[15px] md:flex-col">
          {/* Date */}
          <div className="flex lg:flex-row md:flex-col lg:w-full justify-between">
            <div className="flex flex-col gap-[12px]">
              <label htmlFor="date" className="text-[20px] font-semibold text-black tracking-[0.5px]">
                Choose Date:
              </label>
              <div className="relative bg-[#EFF0F6] lg:w-[284px] h-[56px] pl-[50px] rounded-[6px] md:w-full">
                <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full h-full appearance-none border-none outline-none bg-transparent [::-webkit-calendar-picker-indicator]:hidden" />
                <img src="/assets/imgs/icon/calendar (1) 1.png" className="absolute top-[20px] left-[20px] pointer-events-none" />
                <img src="../assets/imgs/icon/Forward.png" className="absolute top-[28px] right-[15px] pointer-events-none" />
              </div>
            </div>

            {/* Time */}
            <div className="flex flex-col gap-[12px ] md:mt-5 lg:mt-0 justify-between">
              <label htmlFor="time" className="text-[20px] font-semibold text-black tracking-[0.5px]">
                Choose Time
              </label>
              <div className="relative bg-[#EFF0F6] lg:w-[284px] h-[56px] pl-[50px] rounded-[6px] md:w-full">
                <input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full h-full appearance-none border-none outline-none bg-transparent [::-webkit-calendar-picker-indicator]:hidden" />
                <img src="/assets/imgs/icon/time.png" className="absolute top-[20px] left-[20px] pointer-events-none" />
                <img src="/assets/imgs/icon/Forward.png" className="absolute top-[28px] right-[15px] pointer-events-none" />
              </div>
            </div>

            {/* Location */}
            <div className="flex flex-col gap-[12px] md:mt-5 lg:mt-0 justify-between">
              <label htmlFor="location" className="text-[20px] font-semibold text-black tracking-[0.5px]">
                Choose Location
              </label>
              <div className="relative bg-[#EFF0F6] lg:w-[284px] h-[56px] pl-[50px] rounded-[6px] md:w-full">
                <select id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full h-full appearance-none border-none outline-none bg-transparent pr-[40px] [::-webkit-calendar-picker-indicator]:hidden [::-ms-expand]:hidden">
                  <option value="">-- Select City --</option>
                  <option value="jakarta">Jakarta</option>
                  <option value="bandung">Bandung</option>
                  <option value="surabaya">Surabaya</option>
                  <option value="medan">Medan</option>
                  <option value="yogyakarta">Yogyakarta</option>
                  <option value="denpasar">Denpasar</option>
                  <option value="makassar">Makassar</option>
                  <option value="semarang">Semarang</option>
                </select>
                <img src="/assets/imgs/icon/entypo_location.png" className="absolute top-[20px] left-[20px] pointer-events-none" />
                <img src="/assets/imgs/icon/Forward.png" className="absolute top-[28px] right-[15px] pointer-events-none" />
              </div>
            </div>

            {/* Filter Button */}
            <div className="flex flex-col justify-end">
              <button className="md:mt-5 lg:mt-0 lg:w-[188px] h-[56px] bg-blue-700 text-white rounded md:w-full hover:bg-blue-800 transition-colors duration-200">Filter</button>
            </div>
          </div>
        </div>
      </div>

      {/* Cinema List */}
      <div className="flex flex-col gap-[10px] lg:px-[130px] mt-[25px] mb-[20px] md:px-8">
        <div className="flex gap-[25px] items-center">
          <h1 className="text-[20px] font-semibold tracking-[0.5px] text-black leading-[34px]">Choose Cinema</h1>
          <h2 className="text-[18px] font-bold text-[#8692A6] tracking-[0.75px] leading-[24px] md:hidden">39 Result</h2>
        </div>
        <div className="lg:flex justify-around gap-[10px] md:grid md:grid-cols-2 md:w-full">
          {cinemas.map((img, i) => (
            <button key={i} onClick={() => handleSelect(img)} className={`md:w-full w-[264px] h-[157px] border-2 rounded-[8px] flex justify-center items-center transition-transform duration-200 ${i == 1 ? `bg-blue-700` : ""} ${selectedCinema === img ? "border-blue-700 scale-105" : "border-[#DEDEDE] hover:border-blue-700 hover:scale-105"}`}>
              <img src={`/assets/imgs/cinema/${img}.png`} alt={img} />
            </button>
          ))}
        </div>
      </div>

      {/* Book Now Button */}
      <div className="md:px-8 flex justify-center items-center mt-[25px]">
        <button
          className="md:w-full lg:w-[188px] h-[56px] bg-blue-700 text-white rounded mt-[25px]"
          onClick={() => {
            if (!date || !time || !location || !selectedCinema) {
              return;
            }
            navigate(`/order/${movie.id}`);
          }}>
          Book Now
        </button>
      </div>
    </main>
  );
}

export default MainDetail;
