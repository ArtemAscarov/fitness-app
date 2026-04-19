import z from "zod";

export const CategorySchema = z.object({
  name: z.string().max(100).min(3),
  slug: z.string().max(100).min(3),
});

export type CategoryDataType = z.infer<typeof CategorySchema>;

export const CategorySchemaPatch = CategorySchema.partial().strict();
export type CategoryDataTypePatch = z.infer<typeof CategorySchemaPatch>;
