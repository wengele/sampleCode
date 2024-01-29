import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAppContext, useAppContextUpdater } from "../services/GlobalContext";
import { creatJob } from "../services/jobPostingService";

const AddJobs = () => {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const { setState } = useAppContextUpdater();

  const [jobs, setJobs] = useState({
    location: "",
    title: "",
    description: "",
  });

  const change = (e) => {
    setJobs({ ...jobs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { user } = state;
    const data = {
      location: jobs.location,
      title: jobs.title,
      description: jobs.description,
      userId: user._id,
    };
    const res = await creatJob(data);
    if (res) {
      navigate("/employer/jobs");
    } else {
      alert("Sorry you cant add new job");
    }
  };

  return (
    <div className="add-jobs-form">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="title"
          name="title"
          value={jobs.title}
          onChange={change}
          type="text"
        />
        <br />
        <input
          placeholder="location"
          name="location"
          value={jobs.location}
          onChange={change}
          type="text"
        />
        <br />
        <textarea
          placeholder="description"
          name="description"
          value={jobs.description}
          onChange={change}
          rows={4}
          cols={50}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddJobs;
