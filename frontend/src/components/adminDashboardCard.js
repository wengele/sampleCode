import React from "react";
import {
  acceptApplicationOfuser,
  declineApplicationOfuser,
} from "../services/authNetwork";
import { useAppContext } from "../services/GlobalContext";

const AdminDashboardCard = ({ user, reload }) => {
  const { state } = useAppContext();
  const { role } = state.user || {};

  const approveEmployee = async () => {
    const res = await acceptApplicationOfuser(user._id);

    if (res) {
      reload();
      alert("successfully apporved the user ");
    }
  };

  const declineEmployee = async () => {
    const res = await declineApplicationOfuser(user._id);
    if (res) {
      reload();
      alert("successfully declined the user  ");
    }
  };

  return (
    <div>
      {role === "admin" && (
        <div className="admin-posting">
          <h3>UserName - {user.username}</h3>
          <h3>Email -{user.email}</h3>
          <button onClick={approveEmployee} className="admin-button">
            Approve Employer
          </button>
          <button onClick={declineEmployee} className="admin-button">
            Decline Employer
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardCard;
