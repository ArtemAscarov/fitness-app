import axios, { AxiosError } from "axios";
import { LocalTokens } from "../features/LocalTokens";
import { AuthTokens } from "../types/type";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const AUTH_PATHS = ["/login", "/register", "/refresh"];
let refreshPromise: Promise<string> | null = null;

export const API = axios.create({
  baseURL: API_URL,
});

async function refreshAccesToken() {
  const token = LocalTokens.getRefresh();
  if (!token) throw new Error("no refresh token");
  const { data } = await axios.post<AuthTokens>(`${API_URL}/refresh`, {
    token,
  });

  LocalTokens.setTokens(data);

  return data.accesToken;
}

function refreshOnce() {
  refreshPromise ??= refreshAccesToken().finally(() => {
    refreshPromise = null;
  });
  return refreshPromise;
}

API.interceptors.request.use((conf) => {
  const accesToken = LocalTokens.getAcces();

  if (accesToken) {
    conf.headers.Authorization = `Bearer ${accesToken}`;
    return conf;
  }

  return conf;
});

API.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const conf = error.config as typeof error.config & { _retry: boolean };
    const code = error.response?.status;

    if (!conf) return Promise.reject(error);

    const isAuthPath = AUTH_PATHS.some((v) => conf.url?.includes(v));

    if (code !== 401 || conf._retry || isAuthPath) return Promise.reject(error);

    conf._retry = true;
    try {
      const acces = await refreshOnce();
      conf.headers.Authorization = `Bearer ${acces}`;
      return API(conf);
    } catch (err: any) {
      LocalTokens.clearTokens();
      return Promise.reject(err);
    }
  },
);
