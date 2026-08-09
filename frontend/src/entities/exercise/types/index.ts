import { Category } from "@/entities/category/type";

export type ExerciseSection = {
  id: number;
  title: string;
  description?: string;
  image?: string;
  list: string[];
};

export type Exercise = {
  id: number;
  title: string;
  description?: string;
  calory?: number;
  isFavorite: boolean;

  duration?: string;
  category: Category[];
  image: string;

  exerciseSections: ExerciseSection[];
};

export type ExerciseSectionFormData = {
  id?: number;
  title: string;
  description?: string;
  image?: string;
  list: string[];
};

export type ExerciseFormData = {
  title: string;
  description?: string;
  duration?: string;
  image: string;
  calory?: number;
  exerciseSections: ExerciseSectionFormData[];
};
