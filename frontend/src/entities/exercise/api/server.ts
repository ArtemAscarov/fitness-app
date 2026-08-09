import { PaginationResultType } from "@/shared/types/type";
import { Exercise } from "../types";
import { cookies } from "next/headers";
import { transformExerciseParam } from "../features/transformExerciseParam";

export async function getExercisesServerFetch(
  filters: Record<string, any>,
): Promise<PaginationResultType<Exercise>> {
  const cookieStore = await cookies();
  const access = cookieStore.get("accessToken")?.value;

  const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/exercise`);
  const params = transformExerciseParam(filters);

  params.forEach((value, key) => {
    url.searchParams.append(key, value);
  });
  console.log(access);
  

  const res = await fetch(url, {
    headers: access ? { Cookie: `accessToken=${access}` } : {},
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch exercises");

  return res.json();
}

export async function getExerciseServerFetch(
  id: number | string,
): Promise<Exercise> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/exercise/${id}`);

  const res = await fetch(url, {
    headers: token ? { Cookie: `accessToken=${token}` } : {},
    cache: "default",
  });

  if (!res.ok) throw new Error("Ошибка при загрузке упражнения");

  return res.json();
}
