import z from "zod";

export const ExerciseSchema = z.object({
  title: z
    .string()
    .max(256, "Максимум 512 символов")
    .min(1, "Минимум 1 символ"),
  description: z
    .string()
    .max(512, "Максимум 512 символов")
    .min(1, "Минимум 1 символ")
    .optional(),
  instructionTitle: z
    .string()
    .max(256, "Максимум 512 символов")
    .min(1, "Минимум 1 символ"),
  instruction: z
    .string()
    .max(512, "Максимум 512 символов")
    .min(1, "Минимум 1 символ"),
  image: z.url("Некорретная ссылка"),
  calory: z.number().optional(),
});

export const ExerciseFilters = z.object({
  title: z
    .string()
    .max(256, "Максимум 512 символов")
    .min(1, "Минимум 1 символ")
    .optional(),
  calory: z.coerce.number().optional(),
  isFavorite: z.stringbool().optional(),
  category: z
    .union([z.string(), z.array(z.coerce.string())])
    .transform((val) => (Array.isArray(val) ? val : [val]))
    .optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const ExerciseCategroyUpdate = z.object({
  exerciseId: z.coerce.number(),
  categoryId: z.coerce.number(),
});

export const ExerciseSchemaPatch = ExerciseSchema.partial().strict();

export type ExerciseCategroyUpdateType = z.infer<
  typeof ExerciseCategroyUpdate
>;
export type ExerciseSchemaType = z.infer<typeof ExerciseSchema>;
export type ExerciseSchemaPatchType = z.infer<typeof ExerciseSchemaPatch>;
export type ExerciseFiltersType = z.infer<typeof ExerciseFilters>;
