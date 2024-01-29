import React from "react";
import { useNavigate } from "react-router";

const NotApprovedPage = () => {
  const navigate = useNavigate();
  const navigateme = () => {
    navigate("/signin");
  };
  return (
    <div>
      <h2>Thank you for applying</h2>
      <p>
        Your employer account has not been approved yet. Please wait for admin
        approval.
      </p>
      <button onClick={navigateme}>Go To Home Page</button>
    </div>
  );
};

export default NotApprovedPage;
