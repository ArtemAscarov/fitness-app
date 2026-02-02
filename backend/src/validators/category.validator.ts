import z from "zod";

export const CategoryValidator = z.object({
    name: z.string().max(100).min(3),
    slug: z.string().max(100).min(3),
})

export type CategoryDataType = z.infer<typeof CategoryValidator>