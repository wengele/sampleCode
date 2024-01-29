import React, { useState } from "react";
import { signup } from "../services/authNetwork";
import { useNavigate } from "react-router";

export default function SignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",

    role: "",
  });
  const change = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const navigateToSignIn = () => {
    navigate("/signin");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.username || !user.email || !user.password || !user.role) {
      alert("All fields are required");
      return;
    }
    const response = await signup(user);
    if (response && response.success) {
      alert("signed up Succesfully");
      navigate("/signin");
    } else {
      return null;
    }
  };

  return (
    <div className="signin-form">
      <form onSubmit={handleSubmit} className="formsignup">
        <h3 className="form h3">Create An Account </h3>
        <input
          className="form input"
          type="text"
          placeholder="Full Name"
          name="username"
          value={user.username}
          onChange={change}
        />
        <input
          className="form input"
          type="email"
          placeholder="Email"
          name="email"
          value={user.email}
          onChange={change}
        />
        <input
          className="form input"
          type="password"
          placeholder="Password"
          name="password"
          value={user.password}
          onChange={change}
        />

        <br />
        <select type="text" name="role" value={user.role} onChange={change}>
          <option value="employer">Employer</option>
          <option value="candidate">Candidate</option>
        </select>
        <button className="form button">SignUp</button>
      </form>
      <label>
        <h4> Already Have An Account?</h4>
        <button onClick={navigateToSignIn}>Return to Sign In </button>
      </label>
    </div>
  );
}
