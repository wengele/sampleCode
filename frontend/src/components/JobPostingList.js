import React, { useEffect, useState } from "react";
import JobPostingCard from "./JobPostingCard";
import { fetchJobPostings } from "../services/jobPostingService";
import { useNavigate } from "react-router";

const JobPostingList = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const [textQuery, setTextQuery] = useState("");
  const loadJobs = async (value) => {
    const result = await fetchJobPostings(value);
    setJobs(result);
  };

  const applySearch = () => {
    loadJobs(textQuery);
  };
  const handleEnterEvent = (e) => {
    const { key } = e;
    if (key === "Enter") {
      applySearch();
    } else return;
  };
  const updateText = (e) => {
    const { value } = e.target;
    setTextQuery(value);
  };

  useEffect(() => {
    loadJobs(textQuery);
  }, []);

  return (
    <div className="container jobs-section">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Title, technologies"
          value={textQuery}
          onChange={updateText}
          onKeyDown={handleEnterEvent}
        />
        <button onClick={applySearch}>Search</button>
      </div>

      <div className="job-list">
        {jobs.map((job) => (
          <JobPostingCard key={job._id} job={job} reload={loadJobs} />
        ))}
      </div>
    </div>
  );
};

export default JobPostingList;
