import React, { useContext } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { SocialContext } from "../context/Context";

const Layout = () => {
  const { state } = useContext(SocialContext);
  const location = useLocation();
  const path = location?.pathname?.split("/")[1];

  if (!path || path === "register") {
    if (state?.user?.email) {
      if (!state.user.name || !state.user.profileImage)
        return <Navigate to="/profile" />;
      else return <Navigate to="/home" />;
    }
  } else {
    if (
      path !== "profile" &&
      state.user._id &&
      (!state.user.name || !state.user.profileImage)
    )
      return <Navigate to="/profile" />;
    if (!state?.user?.email) {
      return <Navigate to="/" />;
    }
  }
  return (
    <>
      <header>
        <nav>
          <Navbar />
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className=" modal-footer ">
        <p>by Rami Al-Saadi - 2023 &copy;</p>
      </footer>
    </>
  );
};
export default Layout;
