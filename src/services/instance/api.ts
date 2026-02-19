import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers["x-access-token"] = token;
      config.headers["ngrok-skip-browser-warning"] = "true";
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error("Registry API Error:", error);

    if (error.response?.status === 401) {
      console.warn("Unauthorized Registry request");
    }

    return Promise.reject(error);
  },
);

export default api;
