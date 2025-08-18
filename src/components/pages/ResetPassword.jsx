import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext"; // pastikan path sesuai
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const { accounts, setAccounts } = useAuth(); // akses context
  const email = location.state?.email;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = (pwd) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return regex.test(pwd);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      toast.error("Password must contain uppercase, lowercase, symbol, and at least 8 characters!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password are not the same!");
      return;
    }

    // cek apakah email ada di context
    const userIndex = accounts.findIndex((acc) => acc.email === email);
    if (userIndex === -1) {
      toast.error("User tidak ditemukan!");
      return;
    }

    // update password
    const updatedAccounts = [...accounts];
    updatedAccounts[userIndex] = {
      ...updatedAccounts[userIndex],
      pass: password,
    };

    setAccounts(updatedAccounts);
    toast.success("Password berhasil direset, silakan login!");
    navigate("/login");
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[url('/assets/imgs/log-in/background-login.png')] bg-no-repeat bg-cover bg-fixed bg-black/50 bg-blend-overlay font-[Mulish] text-center">
      <img src="../assets/imgs/logo/logo.png" alt="logo" className="mt-20 w-[17.25rem] h-[6.5rem]" onClick={handleBackToLogin} />

      <main className="bg-white w-[34.125rem] h-full rounded-lg mt-[1.313rem] mb-[3.938rem] px-[73px] py-[35px] flex flex-col items-center">
        <div className="flex flex-col justify-start items-start gap-[16px] w-full m-5">
          <h1 className="text-[#414a4c] text-4xl font-bold">Reset Password</h1>
          <p className="text-[#696F79] text-base font-normal text-left">Please enter your new password to reset your password.</p>
        </div>

        <div className="w-full mt-[20px]">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* Password */}
            <div className="flex flex-col text-left w-full relative">
              <label htmlFor="password" className="text-[#4E4B66] text-base font-semibold">
                New Password
              </label>
              <input type={showPassword ? "text" : "password"} id="password" placeholder="Enter your password" className="w-full h-16 mt-3 px-[22px] pr-12 text-[#A0A3BD] text-base font-normal border border-[#DEDEDE] rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
              <span className="absolute right-4 top-[58%] cursor-pointer text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col text-left w-full relative">
              <label htmlFor="confirm-password" className="text-[#4E4B66] text-base font-semibold">
                Confirm Password
              </label>
              <input type={showConfirmPassword ? "text" : "password"} id="confirm-password" placeholder="Enter your password" className="w-full h-16 mt-3 px-[22px] pr-12 text-[#A0A3BD] text-base font-normal border border-[#DEDEDE] rounded" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              <span className="absolute right-4 top-[58%] cursor-pointer text-gray-500" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            <button type="submit" className="w-full h-16 bg-[#1D4ED8] text-[#F7F7FC] text-base font-bold rounded mt-[26px] hover:brightness-90 transition">
              Reset Password
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ResetPassword;
