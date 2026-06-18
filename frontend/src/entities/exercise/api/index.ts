import { API } from "@/shared/lib/axios";
import { Exercise } from "../types";
import { PaginationResultType } from "@/shared/types/type";

export const getExercisesFn = async (
  params: Record<string, any> = {},
): Promise<PaginationResultType<Exercise>> => {
  const { data } = await API.get<PaginationResultType<Exercise>>("exercise", {
    params,
  });

  return data;
};
