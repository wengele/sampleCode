import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../services/GlobalContext";
import { editJob } from "../services/jobPostingService";

const EditJob = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [job, setJobs] = useState(location.state);

  const { state } = useAppContext();

  const change = (e) => {
    setJobs({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { user } = state;
    const data = {
      title: job.title,
      location: job.location,
      description: job.description,
      userId: user._id,
    };
    const res = await editJob(job._id, data);
    if (res) {
      navigate("/employer/jobs");
    } else {
      alert("Can not edit");
    }
  };

  return (
    <div className="add-jobs-form">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="title"
          name="title"
          value={job.title}
          onChange={change}
          type="text"
        />
        <br />
        <input
          placeholder="location"
          name="location"
          value={job.location}
          onChange={change}
          type="text"
        />
        <br />
        <textarea
          placeholder="description"
          name="description"
          value={job.description}
          onChange={change}
          rows={4}
          cols={50}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default EditJob;
