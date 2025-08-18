import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import { useSelector } from "react-redux";

import Header from "../components/templates/Header/Header";
import HeaderProfile from "../components/templates/Header/HeaderProfile";
import Footer from "../components/templates/Footer/Footer";

import Home from "../components/pages/Home";
import Movie from "../components/pages/Movie";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import ForgotPassword from "../components/pages/ForgotPassword";
import ResetPassword from "../components/pages/ResetPassword";
import Details from "../components/pages/Details";
import Order from "../components/pages/Order";
import Payment from "../components/pages/Payment";
import Ticket from "../components/pages/Ticket";
import Profile from "../components/pages/Profile";
import DashboardListMovie from "../components/templates/Dashboard/DashboardListMovie";
import HeaderAdmin from "../components/templates/Header/HeaderAdmin";
import DashboardAddMovie from "../components/templates/Dashboard/DashboardAddMovie";
import DashboardMain from "../components/templates/Dashboard/DashboardMain";

// 🔹 Private Route
const PrivateRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);

  if (!auth.isLogin) {  
    return <Navigate to="/login" replace />;
  }
  return children;
};

// 🔹 Layout untuk halaman Auth (tanpa header/footer)
const AuthLayout = ({ children }) => {
  return <>
  <main>{children}</main>
  </>
};

const DashboardLayout = ({ children, auth }) => {
  return <>
  {auth.role == "admin" ? <HeaderAdmin /> : <HeaderProfile />}
  <main>{children}</main>
  </>
};

// 🔹 Layout untuk halaman utama (dengan header & footer)
const MainLayout = ({ children, auth }) => {
  return (
    <>
      {auth.isLogin ? <HeaderProfile /> : <Header />}
      <main>{children}</main>
      <Footer />
    </>
  );
};

function Router() {
  const auth = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH ROUTES (NO HEADER/FOOTER) */}
        <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
        <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        <Route path="/forgot-password" element={<AuthLayout><ForgotPassword /></AuthLayout>} />
        <Route path="/reset-password" element={<AuthLayout><ResetPassword /></AuthLayout>} />

        {/* MAIN ROUTES (WITH HEADER/HEADERPROFILE & FOOTER) */}
        <Route path="/" element={<MainLayout auth={auth}><Home /></MainLayout>} />
        <Route path="/movies" element={<MainLayout auth={auth}><Movie /></MainLayout>} />
        <Route path="/movies/:id" element={<MainLayout auth={auth}><Details /></MainLayout>} />
        <Route path="/order/:id" element={<MainLayout auth={auth}><Order /></MainLayout>} />
        <Route path="/payment" element={<MainLayout auth={auth}><Payment /></MainLayout>} />
        <Route path="/ticket" element={<MainLayout auth={auth}><Ticket /></MainLayout>} />

        {/* PRIVATE ROUTE */}
        <Route path="/profile" element={<PrivateRoute><DashboardLayout auth={auth}><Profile /></DashboardLayout></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><DashboardLayout auth={auth}><DashboardMain /></DashboardLayout></PrivateRoute>} />
        <Route path="/admin/movies" element={<PrivateRoute><DashboardLayout auth={auth}><DashboardListMovie /></DashboardLayout></PrivateRoute>} />
        <Route path="/admin/form" element={<PrivateRoute><DashboardLayout auth={auth}><DashboardAddMovie /></DashboardLayout></PrivateRoute>} />
        

        {/* DEFAULT / NOT FOUND */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
