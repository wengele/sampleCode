import axios from "axios";

export async function applyToJob(job_id, payload) {
  try {
    const res = await axios.post(`/jobApplications/${job_id}/apply`, payload);
    return res.data.data;
  } catch (error) {
    return null;
  }
}

export async function getAllAppilcationsForSpecificJob(job_id, searchedText) {
  try {
    const res = await axios.get(
      `/jobApplications/${job_id}/applications?q=${searchedText}`
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    return null;
  }
}
// export async function addRviews(candidate_id) {
//   try {
//     const res = await axios.post(`/jobApplications/${candidate_id}/review`);
//     return res.data;
//   } catch (error) {
//     return null;
//   }
// }

// export async function getRviews(candidate_id) {
//   try {
//     const res = await axios.get(
//       `/jobApplications/${candidate_id}/reviewOFemployer`
//     );
//     return res.data;
//   } catch (error) {
//     return null;
//   }
// }

export async function checkCandidate(job_id, candidate_id) {
  try {
    const res = await axios.get(
      `/jobApplications/${job_id}/checkIfApplied/${candidate_id}`
    );

    return res.data;
  } catch (error) {
    return null;
  }
}

export async function getAllAppilcations(application_id) {
  try {
    const res = await axios.get(`/jobApplications/${application_id}`);
    return res.data.data;
  } catch (error) {
    return null;
  }
}

export async function getAllAppliedJobsstatus(candidate_id) {
  try {
    const res = await axios.get(`/jobApplications/${candidate_id}`);
    return res.data;
  } catch (error) {
    return null;
  }
}

export async function acceptAppilcationForJob(job_id, application_id) {
  try {
    const res = await axios.get(
      `/jobApplications/${job_id}/applications/${application_id}/accept`
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
}

export async function rejectAppilcationForJob(job_id, application_id) {
  try {
    const res = await axios.get(
      `/jobApplications/${job_id}/applications/${application_id}/reject`
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
}
