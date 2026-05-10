import z from "zod";

export const ExcerciseSchema = z.object({
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

export const ExcerciseSchemaPatch = ExcerciseSchema.extend({
  isFavorite: z.boolean(),
})
  .partial()
  .strict();

export type ExcerciseSchemaType = z.infer<typeof ExcerciseSchema>;
export type ExcerciseSchemaPatchType = z.infer<typeof ExcerciseSchemaPatch>;
