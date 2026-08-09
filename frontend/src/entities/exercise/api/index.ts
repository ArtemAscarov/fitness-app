import { API } from "@/shared/lib/axios";
import { Exercise, ExerciseFormData } from "../types";
import { PaginationResultType } from "@/shared/types/type";
import { transformExerciseParam } from "../features/transformExerciseParam";

export const getExercisesFn = async (
  params: Record<string, string> = {},
): Promise<PaginationResultType<Exercise>> => {
  const transformedParams: URLSearchParams = transformExerciseParam(params);
  const { data } = await API.get<PaginationResultType<Exercise>>("exercise", {
    params: transformedParams,
  });

  return data;
};

export const editExercise = async (
  data: ExerciseFormData & { id: number },
): Promise<Exercise> => {
  const { id, ...other } = data;
  const { data: res } = await API.patch<Exercise>(`/exercise/${id}`, other);

  return res;
};

export const addExercise = async (
  data: ExerciseFormData,
): Promise<Exercise> => {
  const { data: res } = await API.post<Exercise>("/exercise", data);

  return res;
};

export const connectExerciseToCategory = async ({
  exerciseId,
  categoryId,
}: {
  exerciseId: number;
  categoryId: number;
}) => {
  const { data } = await API.post("/exercise/connectToCategory", {
    exerciseId,
    categoryId,
  });

  return data;
};

export const disconnectExerciseToCategory = async ({
  exerciseId,
  categoryId,
}: {
  exerciseId: number;
  categoryId: number;
}) => {
  const { data } = await API.post("/exercise/disconnectToCategory", {
    exerciseId,
    categoryId,
  });

  return data;
};
