import z from "zod";

export const ExcerciseSchema = z.object({
  title: z.string().max(256).min(1),
});
export const ExcerciseSchemaPatch = ExcerciseSchema.partial().strict();

export type ExcerciseSchemaType = z.infer<typeof ExcerciseSchema>;
export type ExcerciseSchemaPatchType = z.infer<typeof ExcerciseSchemaPatch>;
