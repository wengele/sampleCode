import axios from "axios";

export async function fetchJobPostings(searchedText) {
  try {
    const res = await axios.get(`/jobPostings?searchedText=${searchedText}`);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
}

export async function creatJob(payload) {
  try {
    const res = await axios.post("/jobPostings", payload);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getEmployerPostedJobs(userId) {
  try {
    const res = await axios.get(`/jobPostings?userId=${userId}`);
    return res.data.data;
  } catch (error) {
    return null;
  }
}
export async function getJobDetails(jobId) {
  try {
    const res = await axios.get(`/jobPostings/${jobId}`);
    return res.data;
  } catch (error) {
    return null;
  }
}

export async function editJob(jobId, payload) {
  try {
    const res = await axios.put(`/jobPostings/${jobId}`, payload);
    return res.data;
  } catch (error) {
    return null;
  }
}

export async function deleteJob(jobId) {
  try {
    const res = await axios.delete(`/jobPostings/${jobId}`);
    console.log(res);
    return res.data;
  } catch (error) {
    return null;
  }
}
