import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-white px-6 sm:px-4 md:px-8 lg:px-[130px] pt-[60px] pb-[40px]">
      {/* GRID KONTAINER */}
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-y-10 gap-x-10">
        {/* LOGO & DESKRIPSI */}
        <div className="flex flex-col gap-4">
          <img
            src="/assets/imgs/logo/logo-1.png"
            alt="Tickitz Logo"
            className="w-[150px] md:w-[180px] lg:w-[200px] h-auto object-contain"
          />
          <p className="text-[#6E7191] font-normal text-[14px] md:text-[15px] lg:text-[16px] tracking-[0.5px] leading-[24px] md:leading-[28px] lg:leading-[32px] max-w-[285px]">
            Stop waiting in line. Buy tickets conveniently, watch movies quietly.
          </p>
        </div>

        {/* EXPLORE */}
        <div className="flex flex-col gap-6">
          <h2 className="text-black font-bold text-[14px] md:text-[15px] lg:text-[16px] tracking-[0.5px]">
            Explore
          </h2>
          <ul className="flex flex-col gap-3">
            <li><a href="#" className="text-[#4E4B66] text-[13px] md:text-[14px] tracking-[0.5px]">Cinemas</a></li>
            <li><a href="#" className="text-[#4E4B66] text-[13px] md:text-[14px] tracking-[0.5px]">Movies List</a></li>
            <li><a href="#" className="text-[#4E4B66] text-[13px] md:text-[14px] tracking-[0.5px]">My Ticket</a></li>
            <li><a href="#" className="text-[#4E4B66] text-[13px] md:text-[14px] tracking-[0.5px]">Notification</a></li>
          </ul>
        </div>

        {/* SPONSORS */}
        <div className="flex flex-col gap-6">
          <h2 className="text-black font-bold text-[14px] md:text-[15px] lg:text-[16px] tracking-[0.5px]">
            Our Sponsors
          </h2>
          <ul className="flex flex-col gap-3">
            <li><img src="/assets/imgs/home/sponsor/sp1.png" alt="Sponsor 1" className="w-auto h-[30px]" /></li>
            <li><img src="/assets/imgs/home/sponsor/sp2.png" alt="Sponsor 2" className="w-auto h-[30px]" /></li>
            <li><img src="/assets/imgs/home/sponsor/sp3.png" alt="Sponsor 3" className="w-auto h-[30px]" /></li>
          </ul>
        </div>

        {/* SOCIAL MEDIA */}
        <div className="flex flex-col gap-6">
          <h2 className="text-black font-bold text-[14px] md:text-[15px] lg:text-[16px] tracking-[0.5px]">
            Follow Us
          </h2>
          <ul className="flex flex-col gap-3">
            <li>
              <a href="#" className="flex items-center text-[#4E4B66] text-[13px] md:text-[14px] tracking-[0.5px]">
                <img src="/assets/imgs/home/feather/sp-facebook.png" alt="Facebook" className="w-6 h-6 mr-4" />
                Tickitz Cinema id
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-[#4E4B66] text-[13px] md:text-[14px] tracking-[0.5px]">
                <img src="/assets/imgs/home/feather/sp-ig.png" alt="Instagram" className="w-6 h-6 mr-4" />
                tickitz.id
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-[#4E4B66] text-[13px] md:text-[14px] tracking-[0.5px]">
                <img src="/assets/imgs/home/feather/sp-twitter.png" alt="Twitter" className="w-6 h-6 mr-4" />
                tickitz.id
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-[#4E4B66] text-[13px] md:text-[14px] tracking-[0.5px]">
                <img src="/assets/imgs/home/feather/sp-yt.png" alt="YouTube" className="w-6 h-6 mr-4" />
                Tickitz Cinema id
              </a>
            </li>
          </ul> 
        </div>
      </section>

      {/* COPYRIGHT */}
      <div className="mt-[60px] text-center">
        <p className="text-[13px] md:text-[14px] text-[#6E7191] tracking-[0.5px]">
          © 2020 Tickitz. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
