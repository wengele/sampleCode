import React, { useEffect, useState } from "react";
import { getEmployerPostedJobs } from "../services/jobPostingService";
import { useAppContext } from "../services/GlobalContext";
import JobPostingCard from "../components/JobPostingCard";
import { useNavigate } from "react-router";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const { state } = useAppContext();
  const navigate = useNavigate();

  const loadJobs = async (value) => {
    const result = await getEmployerPostedJobs(value);
    setJobs(result);
  };

  const navigateToAddJobs = () => {
    navigate("/employer/Addjobs");
  };
  useEffect(() => {
    const { user } = state;

    let { _id } = state.user || {};
    if (!user) {
      const localUser = JSON.parse(localStorage.getItem("user"));
      _id = localUser._id;
    }

    loadJobs(_id);
  }, []);
  return (
    <div className="container jobs-section">
      <div className="card">
        <button onClick={navigateToAddJobs}>Add New Job</button>
      </div>
      <div className="job-list">
        {jobs.map((job) => (
          <JobPostingCard key={job._id} job={job} />
        ))}

        {/* <JobPostingCard /> */}
      </div>
    </div>
  );
};

export default JobList;
