import axios from "axios";

export const baseUrl = "http://192.168.49.2:30008";

export const apiClient = axios.create({
  baseURL: baseUrl,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

export const authorize = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.replace("/");
    }
    return Promise.reject(error);
  }
);
