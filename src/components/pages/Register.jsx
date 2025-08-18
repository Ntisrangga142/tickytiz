import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react"; // untuk icon mata

import googleIcon from "/assets/imgs/icon/icon-google.png";
import facebookIcon from "/assets/imgs/icon/icon-facebook.png";

function Register() {
  const { addAccount } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    pass: "",
    termCheck: false,
  });

  const emailRegex = /^.+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).+$/;

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailRegex.test(formData.email)) {
      toast.error("Email format not valid!");
      return;
    }

    if (!passRegex.test(formData.pass)) {
      toast.error("Password must contain upper, lower, special char & min 8 chars!");
      return;
    }

    if (!formData.termCheck) {
      toast.error("You must agree to terms & conditions!");
      return;
    }

    const newUser = {
      email: formData.email,
      pass: formData.pass,
      role: "user",
    };

    addAccount(newUser);
    toast.success("Register success, please login!");
    navigate("/login");
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[url('/assets/imgs/log-in/background-login.png')] bg-no-repeat bg-cover bg-fixed bg-black/50 bg-blend-overlay font-[Mulish] text-center">
      <img src="../assets/imgs/logo/logo.png" alt="logo" className="mt-20 w-[17.25rem] h-[6.5rem]" onClick={handleBackToHome} />

      <main className="bg-white w-[34.125rem] h-full rounded-lg mt-[1.313rem] mb-[3.938rem] px-[73px] py-[35px] flex flex-col items-center">
        {/* Progress Indicator */}
        <div className="flex flex-row justify-between items-center gap-[27px] w-full">
          {["Fill Form", "Active", "Done"].map((label, i) => (
            <>
              <div key={i} className="flex flex-col items-center justify-center gap-[1vh] grow">
                <div className={`w-[47px] h-[47px] rounded-full flex items-center justify-center text-white ${i === 0 ? "bg-[#1D4ED8]" : "bg-[#A0A3BD]"}`}>
                  <h1 className="text-base font-medium">{i + 1}</h1>
                </div>
                <p className={`text-sm ${i === 0 ? "font-semibold" : "font-light"}`}>{label}</p>
              </div>
              {i < 2 && <hr className="w-[70px] border-t border-dashed border-[#A0A3BD]" />}
            </>
          ))}
        </div>

        {/* Form Section */}
        <div className="w-full mt-[46px]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Email */}
            <div className="flex flex-col text-left w-full">
              <label htmlFor="email" className="text-[#4E4B66] text-base font-semibold">
                Email
              </label>
              <input type="email" name="email" id="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} className="w-full h-16 mt-3 px-[22px] text-[#A0A3BD] text-base font-normal border border-[#DEDEDE] rounded" />
            </div>

            {/* Password */}
            <div className="flex flex-col text-left w-full relative mt-[10px]">
              <label htmlFor="password" className="text-[#4E4B66] text-base font-semibold">
                Password
              </label>
              <input type={showPassword ? "text" : "password"} name="pass" id="password" placeholder="Enter your password" value={formData.pass} onChange={handleChange} className="w-full h-16 mt-3 px-[22px] pr-12 text-[#A0A3BD] text-base font-normal border border-[#DEDEDE] rounded" />

              <span className="absolute right-4 top-[58%] cursor-pointer text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            {/* Terms */}
            <div className="relative flex items-center mt-[26px] pl-[25px]">
              <input type="checkbox" name="termCheck" id="termCheck" checked={formData.termCheck} onChange={handleChange} className="w-[18px] h-[18px] mr-2 accent-[#1D4ED8] absolute left-0 top-[3px]" />
              <label htmlFor="termCheck" className="pl-6 text-[#696F79] font-normal text-lg">
                I agree to term & conditions
              </label>
            </div>

            <button type="submit" className="w-full h-16 bg-[#1D4ED8] text-[#F7F7FC] text-base font-bold rounded mt-[26px] hover:brightness-90 transition">
              Join For Free Now
            </button>
          </form>
        </div>

        {/* Footer Section */}
        <div className="w-full mt-[26px]">
          <p className="text-base font-medium text-[#696F79]">
            Already have an account?{" "}
            <Link to="/login" className="text-[#1D4ED8]">
              Log in
            </Link>
          </p>

          {/* Or Separator */}
          <div className="flex flex-row justify-between items-center w-full mt-[26px]">
            <hr className="w-[153px] border-t border-[#AAAAAA] opacity-25" />
            <p className="font-[Inter] text-xs font-normal text-[#AAAAAA]">Or</p>
            <hr className="w-[153px] border-t border-[#AAAAAA] opacity-25" />
          </div>

          {/* Social Buttons */}
          <div className="flex flex-row justify-between mt-[26px] text-center">
            <div className="loginCard w-[182px] h-[64px] shadow-[0_4px_10px_0_#00000014] rounded">
              <Link to="/login" className="text-[#A0A3BD] text-[18px] font-semibold no-underline relative top-[15px] left-0">
                <img src={googleIcon} alt="google-icon" className="w-[30px] absolute top-[-3px] left-[-35px]" />
                Google
              </Link>
            </div>
            <div className="loginCard w-[182px] h-[64px] shadow-[0_4px_10px_0_#00000014] rounded">
              <Link to="/login" className="text-[#A0A3BD] text-[18px] font-semibold no-underline relative top-[15px] left-0">
                <img src={facebookIcon} alt="facebook-icon" className="w-[30px] absolute top-[-3px] left-[-35px]" />
                Facebook
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Register;
