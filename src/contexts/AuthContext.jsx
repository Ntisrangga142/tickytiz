import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // default admin account
  const defaultAdmin = {
    email: "admin@gmail.com",
    pass: "Ad!min123",
    role: "admin",
  };

  // isi default admin di state awal
  const [accounts, setAccounts] = useState([defaultAdmin]);

  const addAccount = (newUser) => {
    setAccounts((prev) => [...prev, newUser]);
  };

  return (
    <AuthContext.Provider value={{ accounts, setAccounts, addAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook biar gampang dipakai
export const useAuth = () => {
  return useContext(AuthContext);
};
