import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { logout } from "../../../redux/auth/authSlice";

function HeaderProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = () => {
      dispatch(logout());
      navigate("/");
    };

  return (
    <div className="relative w-full">
      {/* Header */}
      <header className="px-[24px] md:px-[40px] lg:px-[75px] py-[20px] flex justify-between items-center w-full border-b border-gray-200 bg-white">
        {/* Logo */}
        <div>
          <img
            src="../assets/imgs/logo/logo-1.png"
            alt="logo"
            className="h-8 md:h-10"
          />
        </div>

        {/* Navigasi untuk LG ke atas */}
        <nav className="hidden lg:flex">
          <ul className="flex flex-row gap-[60px]">
            <li>
              <Link
                className="font-normal text-sm text-[#0F172A] no-underline"
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="font-normal text-sm text-[#0F172A] no-underline"
                to="/movies"
              >
                Movie
              </Link>
            </li>
            <li>
              <Link
                className="font-normal text-sm text-[#0F172A] no-underline"
                to="/buyticket"
              >
                Buy Ticket
              </Link>
            </li>
          </ul>
        </nav>

        {/* Profile picture */}
        <div className="relative">
          <div className="w-[38px] h-[38px] md:w-[48px] md:h-[48px] flex items-center overflow-hidden rounded-full">
            <button onClick={toggleDropdown} className="w-full h-full">
              <img
                className="w-full h-full object-cover"
                src="../assets/imgs/profile.png"
                alt="profile"
              />
            </button>
          </div>

          {/* DROPDOWN UNTUK LG SCREEN */}
          {isOpen && (
            <div className="hidden lg:block absolute top-[70px] right-0 w-[200px] bg-white border border-gray-200 shadow-lg rounded-md z-50">
              <div className="flex flex-col p-3 gap-2">
                <Link
                  to="/profile"
                  className="block text-sm px-4 py-[12px] text-[#0F172A] hover:bg-gray-100 rounded font-normal tracking-[0.75px] no-underline"
                  onClick={() => setIsOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block text-sm px-4 py-[12px] bg-[#DC2626] hover:bg-[#b91c1c] text-white rounded text-center font-normal tracking-[0.75px] no-underline"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* DROPDOWN UNTUK SMALL & MEDIUM SCREEN */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-200 px-6 py-8 z-50">
          <ul className="flex flex-col gap-4 mb-8">
            <li>
              <Link
                to="/"
                className="text-sm text-[#0F172A] block font-normal no-underline tracking-[0.75px]"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/movies"
                className="text-sm text-[#0F172A] block font-normal no-underline tracking-[0.75px]"
                onClick={() => setIsOpen(false)}
              >
                Movie
              </Link>
            </li>
            <li>
              <Link
                to="/buyticket"
                className="text-sm text-[#0F172A] block font-normal no-underline tracking-[0.75px]"
                onClick={() => setIsOpen(false)}
              >
                Buy Ticket
              </Link>
            </li>
          </ul>

          <div className="flex flex-col gap-3">
            <Link
              to="/profile"
              className="w-full text-center py-[12px] rounded-[5px] bg-gray-100 text-sm text-[#0F172A] font-normal tracking-[0.75px] no-underline"
              onClick={() => setIsOpen(false)}
            >
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-center py-[12px] rounded-[5px] bg-[#DC2626] text-sm text-white font-normal tracking-[0.75px] no-underline"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeaderProfile;
