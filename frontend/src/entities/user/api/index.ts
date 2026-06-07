import { API } from "@/shared/lib/axios";
import { AuthTokens } from "@/shared/types/type";
import { User } from "../types";

export const loginFn = async (body: { email: string; password: string }) => {
  const { data } = await API.post<AuthTokens>("/login", body);

  return data;
};

export const registerFn = async (body: { email: string; password: string }) => {
  const { data } = await API.post<AuthTokens>("/register", body);

  return data;
};

export const getMeFn = async () => {
  const { data } = await API.get<User>("/users/me");

  return data;
};
