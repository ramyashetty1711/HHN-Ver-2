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


export const getCountData = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};



export const getUserRole = () => {
  try {
    const user = JSON.parse(sessionStorage.getItem("user"));
    return user?.role || null;
  } catch (error) {
    console.error("Error parsing user data from sessionStorage:", error);
    return null;
  }
};