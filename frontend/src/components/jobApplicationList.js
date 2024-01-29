import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useAppContext } from "../services/GlobalContext";
import { getAllAppilcationsForSpecificJob } from "../services/jobApplicationService";
import JobApplicationCard from "./jobApplicationCard";

const JobApplicationList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [applicants, setApplicants] = useState([]);
  const [textQuery, setTextQuery] = useState("");
  const { id } = useParams();
  const { state } = useAppContext();

  const fetchApplicants = async (searchedText) => {
    const result = await getAllAppilcationsForSpecificJob(id, searchedText);

    setApplicants(result.data);
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

  const applySearch = () => {
    fetchApplicants(textQuery);
  };

  useEffect(() => {
    fetchApplicants(textQuery);
  }, []);

  return (
    <div className="container jobs-section">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Skills ..."
          value={textQuery}
          onChange={updateText}
          onKeyDown={handleEnterEvent}
        />
        <button onClick={applySearch}>Search</button>
      </div>
      <div className="job-list">
        {applicants.map((application) => (
          <JobApplicationCard
            key={application._id}
            applicants={application}
            reload={fetchApplicants}
          />
        ))}
      </div>
    </div>
  );
};

export default JobApplicationList;
