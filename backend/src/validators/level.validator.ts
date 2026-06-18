import z from "zod";

export const LevelSchema = z.object({
  name: z.string().max(100).min(3),
  slug: z.string().max(100).min(3),
});

export type LevelDataType = z.infer<typeof LevelSchema>;

export const LevelSchemaPatch = LevelSchema.partial().strict();
export type LevelDataTypePatch = z.infer<typeof LevelSchemaPatch>;
