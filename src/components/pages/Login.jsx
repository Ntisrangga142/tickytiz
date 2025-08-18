import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

import googleIcon from "/assets/imgs/icon/icon-google.png";
import facebookIcon from "/assets/imgs/icon/icon-facebook.png";
import logoImg from "/assets/imgs/logo/logo.png";

import { login } from "../../redux/auth/authSlice";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const [showPass, setShowPass] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const { accounts } = useAuth();

  const emailRegex = /^.+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s]).{8,}$/;

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const pass = event.target.password.value; // gunakan 'password' sesuai name input

    if (!emailRegex.test(email)) {
      toast.error("Email format not valid!");
      return;
    }

    if (!passRegex.test(pass)) {
      toast.error(
        "Password must contain upper, lower, special char & min 8 chars!"
      );
      return;
    }

    const user = accounts.find((acc) => acc.email === email && acc.pass === pass);

    if (user) {
      dispatch(
        login({
          email: user.email,
          role: user.role,
        })
      );

      

      toast.success("Login success!");

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      toast.error("User not found!");
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div
      className="bg-fixed bg-cover bg-no-repeat flex flex-col items-center font-sans w-full"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/assets/imgs/log-in/background-login.png)",
      }}
    >
      <div className="mt-[80px]">
        <img
          src={logoImg}
          alt="logo"
          className="w-[17.25rem] h-[6.5rem] cursor-pointer"
          onClick={handleBackToHome}
        />
      </div>

      <main className="bg-white w-[546px] h-[825px] rounded-[0.5rem] mt-[21px] mb-[63px] p-[74px] flex flex-col items-start">
        <div className="w-[400px]">
          <h1 className="font-bold text-[32px] tracking-[1px] w-full">Welcome Back 👋</h1>
          <p className="w-full font-normal text-[18px] text-[#A0A3BD] mt-[34px]">
            Sign in with your data that you entered during your registration
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          {/* Email */}
          <div className="mt-[26px] flex flex-col w-full text-start">
            <label htmlFor="email" className="font-semibold text-base text-[#4E4B66]">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="mt-3 pl-[22px] w-full h-[64px] text-base font-normal text-[#A0A3BD] border border-border-line rounded"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col w-full relative mt-[26px]">
            <label htmlFor="password" className="text-[#4E4B66] text-base font-semibold">
              Password
            </label>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter your password"
              className="w-full h-16 mt-3 px-[22px] pr-12 text-[#A0A3BD] text-base font-normal border border-[#DEDEDE] rounded"
            />
            <span
              className="absolute right-4 top-[58%] cursor-pointer text-gray-500"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-[#1D4ED8] text-base font-normal mt-[26px]"
            >
              Forgot your password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full h-16 bg-[#1D4ED8] text-[#F7F7FC] text-base font-bold rounded mt-[26px] hover:brightness-90 transition"
          >
            Login
          </button>
        </form>

        {/* Or section */}
        <div className="flex items-center w-full mt-[26px]">
          <hr className="border-t border-[#AAAAAA] opacity-25 w-[153px]" />
          <p className="mx-3 font-normal text-[12px] text-[#AAAAAA]">Or</p>
          <hr className="border-t border-[#AAAAAA] opacity-25 w-[153px]" />
        </div>

        {/* Social login */}
        <div className="flex justify-between mt-[26px]">
          <div className="w-[182px] h-[64px] shadow-[0_4px_10px_0_#00000014] rounded flex items-center justify-center relative">
            <Link
              to="/register"
              className="text-[#A0A3BD] text-[18px] font-semibold no-underline relative"
            >
              <img
                src={googleIcon}
                alt="google-icon"
                className="w-[30px] absolute left-[-35px] top-1"
              />
              Google
            </Link>
          </div>

          <div className="w-[182px] h-[64px] shadow-[0_4px_10px_0_#00000014] rounded flex items-center justify-center relative">
            <Link
              to="/register"
              className="text-[#A0A3BD] text-[18px] font-semibold no-underline relative"
            >
              <img
                src={facebookIcon}
                alt="facebook-icon"
                className="w-[30px] absolute left-[-35px] top-1"
              />
              Facebook
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
