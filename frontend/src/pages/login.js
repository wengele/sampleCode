import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppContext, useAppContextUpdater } from "../services/GlobalContext";
import { login } from "../services/authNetwork";
// import "../css/logIn.css";
export default function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({ email: "", password: "" });
  const { state } = useAppContext();
  const { setState } = useAppContextUpdater();

  const change = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const navigateToSignUp = () => {
    navigate("/signup");
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!user.email || !user.password) {
        alert("All fields are required");
        return;
      }
      const { email, password } = user;

      const res = await login({ email, password });
      if (res && res.success) {
        setState({ ...state, user: res.data });
        localStorage.setItem("user", JSON.stringify(res.data));

        if (res.data.role === "employer") {
          if (res.data.approved === true) {
            navigate("/employer/jobs");
          } else {
            navigate("/notApproved");
          }
        } else if (res.data.role === "admin") {
          navigate("/admin/Dashboard");
        } else {
          navigate("/");
        }
      } else {
        alert("wrong Email or password");
      }
    } catch (error) {
      return null;
    }
  };
  return (
    <div className="signin-form">
      <form onSubmit={handleSubmit}>
        <h3>Sign In </h3>
        <input
          placeholder="email"
          value={user.email}
          type="email"
          name="email"
          onChange={change}
        />
        <input
          placeholder="password"
          value={user.password}
          type="password"
          name="password"
          onChange={change}
        />
        <button type="submit">Login</button>
      </form>
      <label>
        <h4>No account Yet?</h4>
        <button onClick={navigateToSignUp}>Go to Register page</button>
      </label>
    </div>
  );
}
