import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://phimart-gold.vercel.app/api/v1",
});

export default apiClient;