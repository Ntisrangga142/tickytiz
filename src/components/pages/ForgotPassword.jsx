import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../contexts/AuthContext"; // pastikan path sesuai

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { accounts } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    // regex validasi email sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return;
    }

    // cek apakah email ada di context auth
    const user = accounts.find((acc) => acc.email === email);

    if (user) {
      // di ForgotPassword
      navigate("/reset-password", { state: { email } });
    } else {
      toast.error("User not found");
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  }
  return (
    <div className="min-h-screen flex flex-col items-center bg-[url('/assets/imgs/log-in/background-login.png')] bg-no-repeat bg-cover bg-fixed bg-black/50 bg-blend-overlay font-[Mulish] text-center">
      <img src="../assets/imgs/logo/logo.png" alt="logo" className="mt-20 w-[17.25rem] h-[6.5rem]" onClick={handleBackToLogin}  />

      <main className="bg-white w-[34.125rem] h-full rounded-lg mt-[1.313rem] mb-[3.938rem] px-[73px] py-[35px] flex flex-col items-center">
        {/* Progress Indicator */}
        <div className="flex flex-col justify-start items-start gap-[16px] w-full m-5">
          <h1 className="text-[#414a4c] text-4xl font-bold">Forgot Password</h1>
          <p className="text-[#696F79] text-base font-normal text-left">Please enter your email address to reset your password.</p>
        </div>

        {/* Form Section */}
        <div className="w-full mt-[20px]">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col text-left w-full">
              <label htmlFor="email" className="text-[#4E4B66] text-base font-semibold">
                Email
              </label>
              <input type="text" name="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-16 mt-3 px-[22px] text-[#A0A3BD] text-base font-normal border border-[#DEDEDE] rounded" />
            </div>

            <button type="submit" className="w-full h-16 bg-[#1D4ED8] text-[#F7F7FC] text-base font-bold rounded mt-[26px] hover:brightness-90 transition">
              Forgot Password
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ForgotPassword;
