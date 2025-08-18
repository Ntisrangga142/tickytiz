import React from "react";

function Subscribe() {
  return (
    <section className="subscribe px-4 sm:px-[80px] lg:px-[130px] py-10 sm:py-[85px]">
      <div
        className="w-full h-auto lg:h-[318px] flex flex-col justify-center items-center 
                   gap-6 lg:gap-[48px] 
                   bg-blue-600
                   py-8 px-4 rounded-2xl relative md:pb-40 md:pt-20 lg:py-10 md:px-20"
      >
        {/* Lingkaran dekorasi */}
        <div className="absolute w-[237px] h-[237px] rounded-full border-white border-8 -bottom-30 -right-30"></div>

        {/* Title */}
        <h1
          className="text-white font-normal 
                     text-xl sm:text-[36px] lg:text-[48px] 
                     tracking-[1px] text-center leading-tight"
        >
          Subscribe to our newsletter
        </h1>

        {/* Form */}
        <div
          className="flex flex-col lg:flex-row 
                     justify-center items-center 
                     gap-3 lg:gap-[11px] 
                     w-full lg:w-[732px]"
        >
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First name"
            className="w-full h-[60px] 
                       text-[16px] font-normal 
                       border border-zinc-300 rounded px-4 
                       bg-transparent placeholder-white"
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email address"
            className="w-full h-[60px] 
                       text-[16px] font-normal 
                       border border-zinc-300 rounded px-4 
                       bg-transparent placeholder-white"
          />
          <button
            type="submit"
            className="text-[#1D4ED8] bg-white w-full h-[64px] 
                       rounded text-[18px] font-bold border-none"
          >
            Subscribe Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default Subscribe;
