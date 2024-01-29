import axios from "axios";

export async function signup(payload) {
  try {
    const res = await axios.post("/users/signup", payload);
    return res.data;
  } catch (error) {
    return null;
  }
}

export async function login(credentials) {
  try {
    const res = await axios.post("/users/signin", credentials);
    return res.data;
  } catch (error) {
    return null;
  }
}

export async function getUserProfile(userId) {
  try {
    const res = await axios.get(`/users/profile/${userId}`);

    return res.data.data;
  } catch (error) {
    return null;
  }
}

export async function updateUserProfile(userId, payload) {
  try {
    const res = await axios.put(`/users/profile/${userId}`, payload);
    return res.data;
  } catch (error) {
    return null;
  }
}

export async function getUnapprovedEmployers() {
  try {
    const response = await axios.get("/users/unapproved");

    return response.data;
  } catch (error) {
    return null;
  }
}

export async function acceptApplicationOfuser(userId) {
  try {
    const response = await axios.post("/users/approve", { userId: userId });

    return response.data;
  } catch (error) {
    console.error("Error approving user:", error);
    return null;
  }
}

export async function declineApplicationOfuser(userId) {
  try {
    const response = await axios.post("/users/decline", { userId: userId });

    return response.data;
  } catch (error) {
    console.error("Error approving user:", error);
    return null;
  }
}
