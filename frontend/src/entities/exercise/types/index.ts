export type ExerciseSection = {
  id: number;
  title: string;
  instruction: string;
  image: string;
  list: string[];
};

export type Exercise = {
  id: number;
  title: string;
  description?: string;
  level: string;
  calory?: number;
  duration?: string;
  tags: string[];
  image: string;
  mainInfo: string;
  sections: ExerciseSection[];
};
