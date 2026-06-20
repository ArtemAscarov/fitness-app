import z from "zod";

export const AuthValidator = z
  .object({
    email: z
      .email("Не валидный Email")
      .transform((v) => v.trim().toLowerCase()),
    password: z
      .string()
      .min(6, "Минимум 6 символов")
      .max(256, "Максимум 256 символов"),
    remember: z.boolean().default(true).optional(),
  })
  .strict();

export type AuthDataType = z.infer<typeof AuthValidator>;
