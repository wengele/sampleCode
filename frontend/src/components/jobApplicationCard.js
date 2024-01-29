import React from "react";
import { useAppContext } from "../services/GlobalContext";
import {
  acceptAppilcationForJob,
  rejectAppilcationForJob,
} from "../services/jobApplicationService";
import { useParams } from "react-router";

const JobApplicationCard = ({ applicants, reload }) => {
  const { state } = useAppContext();
  const { role } = state.user || {};
  const { id } = useParams();

  const acceptApplicants = async () => {
    const response = await acceptAppilcationForJob(id, applicants._id);
    if (response) {
      reload();
      alert("Accepted Succesfull");
    } else {
      alert("unable to accept");
    }
  };

  const rejectApplicants = async () => {
    const response = await rejectAppilcationForJob(id, applicants._id);
    if (response) {
      reload();
      alert("rejected Succesfull");
    } else {
      alert("unable to reject");
    }
  };

  return (
    <div className="job-posting">
      {role === "employer" && (
        <div>
          <h3>Name: {applicants.candidate.username}</h3>

          <h3>Status: {applicants.status}</h3>
          <p>Resume {applicants.candidate.resume.filename}</p>
          <button onClick={acceptApplicants}>Accept</button>
          <button onClick={rejectApplicants}>Reject</button>
        </div>
      )}
    </div>
  );
};

export default JobApplicationCard;
