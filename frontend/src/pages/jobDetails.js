import React, { useEffect, useState } from "react";
import { getJobDetails } from "../services/jobPostingService";
import { useNavigate, useParams } from "react-router";
import { useAppContext } from "../services/GlobalContext";
import { applyToJob, checkCandidate } from "../services/jobApplicationService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";

const JobDetails = () => {
  const [jobDetail, setJobDetails] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useAppContext();
  const applyForJob = async () => {
    const { user } = state;
    if (!user) {
      alert("Please Sign In First!");
      navigate("/signin");
      return;
    } else {
      const { filename } = user.resume || {};
      if (filename) {
        try {
          const { success, data } = await checkCandidate(id, user._id);

          if (success) {
            if (!data.isAlreadyApplied) {
              await applyToJob(id, { user_id: user._id });
              alert("Successfully applied");
              navigate("/");
            } else {
              alert("You have already applied for this job.");
            }
          }
        } catch (error) {
          console.error("Error applying for the job:", error);
        }
      } else {
        alert("Please upload your resume");
        navigate("/profile");
      }
    }
  };

  const fetchJobDetails = async () => {
    const res = await getJobDetails(id);
    setJobDetails(res);
  };

  useEffect(() => {
    fetchJobDetails();
  }, []);

  return (
    <div className="job-posting">
      <h2>{jobDetail.title}</h2>
      <p>{jobDetail.description}</p>

      <div>
        <FontAwesomeIcon icon={faMapMarker} />
        {jobDetail.location}
      </div>
      <button onClick={applyForJob} className="admin-button">
        Apply
      </button>
    </div>
  );
};

export default JobDetails;
