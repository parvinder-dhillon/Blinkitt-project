import axios from "axios";
import SummaryApi, { baseUrl } from "../common/SummaryApi";

const Axios = axios.create({
  baseURL: baseUrl,
  withCredentials: true
});
console.log("Axios file loaded");

//Request Interceptor (Add Token)
Axios.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("Sending Token:", accessToken);
    if (accessToken){
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Separate instance for refresh

const refreshAxios = axios.create({
  baseURL: baseUrl,
  withCredentials: true
});

// 🔹 Response Interceptor (Handle 401)

Axios.interceptors.response.use(
      (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const res = await refreshAxios({
            ...SummaryApi.refreshToken,
            headers: {
              Authorization:`Bearer ${refreshToken}`
            }
          });

          const newAccessToken = res.data.data.accessToken;

          localStorage.setItem("accessToken", newAccessToken);

          // retry original request
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return Axios(originalRequest);
        } catch (err) {
          console.log("Refresh failed");
        }
      }
    }
    return Promise.reject(error);
  }
);

export default Axios;