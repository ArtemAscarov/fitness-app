import { getExercisesFn } from "../api";

export const getExercisesQueryOptions = (filters: Record<any, any> = {}) => ({
  queryKey: ["exercise", filters],
  queryFn: () => getExercisesFn(filters),
  staleTime: 1000 * 60 * 10,
  gcTime: 1000 * 60 * 10,
});
