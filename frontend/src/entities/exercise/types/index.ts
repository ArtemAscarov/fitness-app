import { Category } from "@/entities/category/type";
import { Level } from "@/entities/level/type";

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
  level: Level;
  calory?: number;

  duration?: string;
  category: Category[];
  image: string;

  sections: ExerciseSection[];
};
