/** Секция в деталях упражнения: своё название, инструкция, фото и список пунктов. */
export type ExerciseSection = {
  id: number;
  title: string;
  instruction: string;
  image: string;
  list: string[];
};

export type Exercise = {
  id: number;
  /** Базовые данные */
  title: string;
  description?: string;
  level: string;
  calory?: number;
  duration?: string;
  tags: string[];
  image: string;
  /** Детали */
  mainInfo: string;
  sections: ExerciseSection[];
};
