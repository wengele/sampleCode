// Layout.jsx
import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Navbar from "./navbar";
import Footer from "./footer";
import "../css/layoutcss.css";
import { useAppContext, useAppContextUpdater } from "../services/GlobalContext";

const Layout = () => {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const { setState } = useAppContextUpdater();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setState({ ...state, user: JSON.parse(user) });
    } else {
      navigate("/signin");
    }
  }, []);
  return (
    <div className="layout-container">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
