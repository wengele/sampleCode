import React, { useEffect, useState } from "react";
import { getUnapprovedEmployers } from "../services/authNetwork";
import AdminDashboardCard from "./adminDashboardCard";

const AdminDashborad = () => {
  const [clients, setClient] = useState([]);

  async function fetchResult() {
    try {
      const res = await getUnapprovedEmployers();
      if (res) {
        setClient([...res.data]);
      }
    } catch (error) {}
  }

  useEffect(() => {
    fetchResult();
  }, []);
  return (
    <div className="admin-container">
      {clients.map((client) => (
        <div key={client._id}>
          <AdminDashboardCard user={client} reload={fetchResult} />
        </div>
      ))}
    </div>
  );
};

export default AdminDashborad;
