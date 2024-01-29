import React from "react";
import { useNavigate } from "react-router";
import "../css/navbar.css";
import { useAppContext, useAppContextUpdater } from "../services/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const { setState } = useAppContextUpdater();

  const navigateToSignUp = () => {
    navigate("/signup");
  };
  const navigateToLogIn = () => {
    navigate("/signin");
  };

  const logout = () => {
    localStorage.clear();
    setState({ ...state, user: null });
    navigate("/");
  };
  const displayProfile = () => {
    navigate("/profile");
  };

  return (
    <nav>
      <div className="logo">
        <h1>
          <Link to="/">
            <span>J</span>obify
          </Link>
        </h1>
      </div>

      <div className="right">
        {!state.user ? (
          <div>
            <button onClick={navigateToSignUp}>Register</button>
            <button onClick={navigateToLogIn}>LogIn</button>
          </div>
        ) : (
          <div>
            <button onClick={displayProfile}>Profile</button>
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
