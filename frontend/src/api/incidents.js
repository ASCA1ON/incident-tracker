import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const incidentsApi = {
  getAll: (params) => apiClient.get("/api/incidents", { params }),
  getById: (id) => apiClient.get(`/api/incidents/${id}`),
  create: (data) => apiClient.post("/api/incidents", data),
  update: (id, data) => apiClient.patch(`/api/incidents/${id}`, data),
  delete: (id) => apiClient.delete(`/api/incidents/${id}`),
};

export default apiClient;
