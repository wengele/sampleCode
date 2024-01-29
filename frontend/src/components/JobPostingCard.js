import React from "react";
import { useAppContext } from "../services/GlobalContext";
import { useNavigate, useParams } from "react-router";
import { deleteJob } from "../services/jobPostingService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";

const JobPostingCard = ({ job, reload }) => {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const { id } = useParams();
  const { role, username } = state.user || {};

  const editJob = () => {
    navigate("/employer/Editjobs", { state: job });
  };

  const viewDetails = () => {
    navigate(`/jobDetails/${job._id}`);
  };

  const viewApplicants = () => {
    navigate(`/employer/viewJobs/${job._id}`);
  };
  const deletedJob = async () => {
    const alertres = window.confirm("Are you sure  you want to delete?");
    if (alertres) {
      const response = await deleteJob(job._id);
      if (response) {
        alert("delete");
        navigate("/");
      } else {
        alert("not deleted");
      }
    }
  };

  const getAvatar = () => {
    const res = job.employer.username.substring(0, 2);
    return res;
  };

  return (
    <div className="job-posting">
      <div className="avatar">
        <div className="avatar-short">
          <div style={{ backgroundColor: job.employer.color }}>
            {getAvatar()}
          </div>
        </div>

        <div>{job.employer.username}</div>
      </div>

      <h3>{job.title}</h3>
      <div>
        <FontAwesomeIcon icon={faMapMarker} style={{ marginRight: "5px" }} />
        {job.location}
      </div>

      <div className="posting-actions">
        {role === "employer" ? (
          <div className="card">
            <button onClick={deletedJob}>Delete</button>
            <button onClick={editJob}>Edit</button>

            <button onClick={viewApplicants}>View Job Applications</button>
          </div>
        ) : (
          <div className="card">
            <button onClick={viewDetails}>View</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobPostingCard;
