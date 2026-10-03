import { cookies } from "next/headers";
import { User } from "../types";
import { SERVER_BACKEND_URL } from "@/shared/config/backend";

export const getMeServerFn = async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const url = new URL(`${SERVER_BACKEND_URL}/users/me`);

  const res = await fetch(url, {
    headers: token ? { Cookie: `accessToken=${token}` } : {},
  });

  if (!res.ok) throw new Error("Не удалось получить пользователя");

  return res.json();
};
