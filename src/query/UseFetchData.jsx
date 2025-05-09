// utils/fetcher.js
import axios from "axios";
import { APPURL } from "../URL";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add 401 interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.clear();
      localStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

// Reusable fetcher
export const getData = async (url, token) => {
  const res = await api.get(url, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return res.data;
};
