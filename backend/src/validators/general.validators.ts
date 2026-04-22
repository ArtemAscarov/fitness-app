import z from "zod";

export const IdParamsSchema = z
  .object({
    id: z.coerce.number().int().positive(),
  })
  .strict();

export type IdParamsType = z.infer<typeof IdParamsSchema>;

export const tokenSchema = z.object({
  token: z.jwt("Некорректный токен"),
});

export type tokenType = z.infer<typeof tokenSchema>;
