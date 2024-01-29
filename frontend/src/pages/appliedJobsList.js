import React, { useEffect, useState } from "react";
import { getAllAppliedJobsstatus } from "../services/jobApplicationService";
import { useParams } from "react-router";
import { useAppContext } from "../services/GlobalContext";

const AppliedJobsList = () => {
  const { state } = useAppContext();

  const [applications, setApplications] = useState([]);
  const fetchApplications = async () => {
    const { user } = state;
    const result = await getAllAppliedJobsstatus(user._id);
    console.log(result);
    setApplications(result.data);
  };
  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="application-container">
      {applications.map((application, index) => (
        <div key={index} className="application-status">
          <h3>Job Title - {application.job.title}</h3>
          <h3>
            Applied Date -
            {new Date(application.applicationDate).toLocaleDateString()}
          </h3>
          <h3> Application status -{application.status}</h3>
        </div>
      ))}
    </div>
  );
};

export default AppliedJobsList;
