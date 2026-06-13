import z from "zod";

export const FavoriteSchema = z.object({
  exerciseId: z.number().int(),
});

export type FavoriteSchemaType = z.infer<typeof FavoriteSchema>;
