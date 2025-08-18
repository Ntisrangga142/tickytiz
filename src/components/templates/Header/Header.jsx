import { useState } from "react";
import { Link } from "react-router";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-white border-b border-[#DEDEDE] w-full">
    <header className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center px-8 lg:px-[130px] py-4 lg:py-6">
      {/* Logo */}
      <div className="flex justify-between items-center w-full lg:w-auto">
        <img
          src={`/assets/imgs/logo/logo-1.png`}
          alt="logo.png"
          className="h-8 md:h-10"
        />

        {/* Hamburger button (md to lg only) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:block lg:hidden text-[#0F172A] focus:outline-none"
        >
          {/* Icon Hamburger */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Navigation + Buttons for lg */}
      <nav className="hidden lg:flex">
        <ul className="w-full flex flex-row justify-between gap-[60px]">
          <li className="list-none">
            <Link
              className="font-normal text-sm text-[#0F172A] no-underline"
              to={`/`}
            >
              Home
            </Link>
          </li>
          <li className="list-none">
            <Link
              className="font-normal text-sm text-[#0F172A] no-underline"
              to={`/movies`}
            >
              Movie
            </Link>
          </li>
          <li className="list-none">
            <Link
              className="font-normal text-sm text-[#0F172A] no-underline"
              to={`/movies`}
            >
              Buy Ticket
            </Link>
          </li>
        </ul>
      </nav>

      <div className="hidden lg:flex flex-row justify-between gap-[6px] sm:mt-5 lg:mt-0 items-center">
        <Link
          className="border border-[#1D4ED8] text-[#1D4ED8] font-normal text-sm tracking-[0.75px] rounded-[5px] no-underline px-[18px] py-[12px]"
          to="/login"
        >
          Sign In
        </Link>
        <Link
          className="bg-[#1D4ED8] text-[#F8FAFC] font-normal text-sm tracking-[0.75px] rounded-[5px] no-underline px-[18px] py-[12px]"
          to="/register"
        >
          Sign Up
        </Link>
      </div>

      {/* Dropdown for md */}
      {menuOpen && (
        <div className="md:flex lg:hidden flex-col mt-4 gap-4 border-t border-[#DEDEDE] pt-4 md:px-8 sm:px-8">
          <nav>
            <ul className="flex flex-col gap-4">
              <li className="list-none">
                <Link
                  className="font-normal text-sm text-[#0F172A] no-underline"
                  to={`/`}
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li className="list-none">
                <Link
                  className="font-normal text-sm text-[#0F172A] no-underline"
                  to={`/movies`}
                  onClick={() => setMenuOpen(false)}
                >
                  Movie
                </Link>
              </li>
              <li className="list-none">
                <Link
                  className="font-normal text-sm text-[#0F172A] no-underline"
                  to={`/movies`}
                  onClick={() => setMenuOpen(false)}
                >
                  Buy Ticket
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex flex-col gap-2 sm:mt-5 md:mt-0">
            <Link
              className="border border-[#1D4ED8] text-[#1D4ED8] font-normal text-sm tracking-[0.75px] rounded-[5px] no-underline px-[18px] py-[12px] text-center"
              to="/login"
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link
              className="bg-[#1D4ED8] text-[#F8FAFC] font-normal text-sm tracking-[0.75px] rounded-[5px] no-underline px-[18px] py-[12px] text-center"
              to="/register"
              onClick={() => setMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>

    </div>
  );
}

export default Header;
