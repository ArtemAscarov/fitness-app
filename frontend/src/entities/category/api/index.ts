import { SERVER_BACKEND_URL } from "@/shared/config/backend";

export const getCategoryServerFetch = async () => {
  const url =
    typeof window === "undefined"
      ? `${SERVER_BACKEND_URL}/category`
      : `/api/category`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};
