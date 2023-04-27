import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export default axios.create({
  baseURL: "http://localhost:4000",
  headers: { "Content-Type": "application/json" },
});

export const axiosAuth = axios.create({
  baseURL: "http://localhost:4000",
  headers: { "Content-Type": "application/json" },
});
