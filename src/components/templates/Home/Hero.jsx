function Hero({ movies }) {
  return (
    <>
        <section className="flex flex-col lg:flex-row justify-between items-stretch gap-6 px-4 sm:px-6 md:px-8 lg:px-[130px] pt-6 md:pt-10 lg:pt-[40px] pb-0 mb-10 lg:mb-[40px] aspect-[1366/300]">
          {/* KIRI */}
          <div className="flex flex-col gap-2 sm:gap-3 md:gap-[10px] justify-center w-full lg:w-7/12 py-4 md:py-6 lg:py-[30px]">
            <h2 className="font-bold text-xs sm:text-sm md:text-[18px] tracking-wide text-[#1D4ED8] md:text-center lg:text-left">MOVIE TICKET PURCHASES #1 IN INDONESIA</h2>
            <h1 className="font-medium text-xl sm:text-2xl md:text-[32px] lg:text-[48px] tracking-wide text-[#121212] leading-snug md:text-center lg:text-left">Experience the Magic of Cinema: Book Your Tickets Today</h1>
            <p className="font-normal text-sm sm:text-base tracking-normal text-[#A0A3BD] md:text-center lg:text-left">Sign up and get the ticket with a lot of discount</p>
          </div>

          {/* KANAN */}
          <div className="w-full lg:w-5/12 aspect-[1366/300] sm:h-[360px] md:h-[400px] grid grid-cols-2 gap-2 sm:gap-[6px] md:gap-[8px] grid-rows-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,2fr)]">
            <img src={`https://image.tmdb.org/t/p/original${movies[0].poster_path}`} alt="hero-1" className="w-full h-full object-cover object-[center_30%] col-start-1 col-end-2 row-start-1 row-end-2 rounded-t-[12px] sm:rounded-t-[16px] md:rounded-t-[20px]" />
            <img src={`https://image.tmdb.org/t/p/original${movies[1].poster_path}`} alt="hero-2" className="w-full h-full object-cover object-top col-start-2 col-end-3 row-start-1 row-end-3 rounded-t-[12px] sm:rounded-t-[16px] md:rounded-t-[20px]" />
            <img src={`https://image.tmdb.org/t/p/original${movies[2].poster_path}`} alt="hero-3" className="w-full h-full object-cover object-top col-start-1 col-end-2 row-start-2 row-end-4 rounded-b-[12px] sm:rounded-b-[16px] md:rounded-b-[20px]" />
            <img src={`https://image.tmdb.org/t/p/original${movies[3].poster_path}`} alt="hero-4" className="w-full h-full object-cover object-center col-start-2 col-end-3 row-start-3 row-end-4 rounded-b-[12px] sm:rounded-b-[16px] md:rounded-b-[20px]" />
          </div>
        </section>
    </>
  );
}

export default Hero;
