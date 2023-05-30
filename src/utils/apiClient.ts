import axios from "axios";

export const baseUrl = "http://localhost:3000";

export const apiClient = () => {
  const token = localStorage.getItem("token");

  const axiosInstance = axios.create({
    baseURL: baseUrl,
    responseType: "json",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.response.use(
    (result) => {
      return result;
    },
    (error) => {
      console.log(error);
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.reload();
      } else {
        throw error;
      }
    }
  );

  return axiosInstance;
};
