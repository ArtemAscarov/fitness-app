import z from "zod";

export const IdParamsSchema = z
  .object({
    id: z.coerce.number().int().positive(),
  })
  .strict();

export type IdParamsType = z.infer<typeof IdParamsSchema>;
