import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_MODE === "dev" ? `${import.meta.env.VITE_BACKEND_URL}/api` :"/api",
  withCredentials: true,
});
