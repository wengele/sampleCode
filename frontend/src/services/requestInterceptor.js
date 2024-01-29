import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    const { token } = JSON.parse(localStorage.getItem("user")) || {};
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
