import axios, { AxiosError } from "axios";
import { LocalTokens } from "../widgetes/LocalTokens";

const API_URL = process.env.BACKEND_URL || "";

export const API = axios.create({
  baseURL: API_URL,
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
  async (error: AxiosError) => {
    const { clearTokens, getRefresh, setTokens } = LocalTokens;
    const conf = error.config as typeof error.config & { _retry: boolean };
    const code = error.response?.status;
    const refresh = getRefresh();

    if (!refresh || !conf || code !== 401 || conf._retry)
      return Promise.reject(error);

    conf._retry = true;

    const { data } = await axios.post(`${API_URL}/refresh`);

    if (!data) {
      clearTokens();
      return Promise.reject(error);
    }

    setTokens(data);

    conf.headers.Authorization = `Bearer ${data.accesToken}`;
    return API(conf);
  },
);
