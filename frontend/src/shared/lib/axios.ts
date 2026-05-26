import axios, { AxiosError } from "axios";

export const API = axios.create({
  baseURL: process.env.BACKEND_URL || "",
});

API.interceptors.request.use((conf) => {
  const accesToken = localStorage.getItem("accesToken");

  if (accesToken) {
    conf.headers.Authorization = `Bearer ${accesToken}`;
    return conf;
  }

  return conf;
});

API.interceptors.response.use(
  (response) => response,
  (badReq: AxiosError) => {
    const conf = badReq.config as typeof badReq.config & { _retry: boolean };
    const code = badReq.response?.status;
    const refresh = localStorage.getItem("refreshToken");

    if (!refresh || !conf || code !== 401 || conf._retry)
      return Promise.reject(badReq);

    

    conf._retry = true;
  },
);
