function Hero() {
  return (
    <>
      <section
        className="
          hero w-full h-[462px]
          px-4 sm:px-6 md:px-[130px]
          text-white flex flex-col justify-center
          relative bg-cover bg-center bg-no-repeat
          items-center text-center lg:items-start lg:text-left
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(../assets/imgs/log-in/background-login.png)",
        }}
      >
        <h3
          className="
            font-bold
            text-[14px] sm:text-[16px] md:text-[18px]
            tracking-[0.5px] md:tracking-[0.75px]
            leading-[24px] sm:leading-[28px] md:leading-[34px]
            w-full lg:w-[638px]
          "
        >
          LIST MOVIE OF THE WEEK
        </h3>

        <h1
          className="
            font-medium
            text-[24px] sm:text-[32px] md:text-[48px]
            tracking-[0.5px] md:tracking-[1px]
            leading-[36px] sm:leading-[44px] md:leading-[70px]
            w-full lg:w-[638px]
          "
        >
          Experience the Magic of Cinema: Book Your Tickets Today
        </h1>

        {/* indikator */}
        <div
          className="
            flex justify-center gap-[5px] mt-6
            lg:mt-0 lg:absolute lg:top-[440px]
            lg:left-1/2 lg:-translate-x-1/2
          "
        >
          <div className="w-[43px] h-[5px] bg-blue-700 rounded-[20px]"></div>
          <div className="w-[5px] h-[5px] bg-white rounded-full"></div>
          <div className="w-[5px] h-[5px] bg-white rounded-full"></div>
        </div>
      </section>
    </>
  );
}

export default Hero;
