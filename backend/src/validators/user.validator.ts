import z from "zod";

export const UserSchema = z.object({
  email: z.email(),
});

export const UserGetQuerySchema = z.object({
  limit: z.coerce.number().max(100).min(1).default(20),
  page: z.coerce.number().default(1),
});

export type UserSchemaType = z.infer<typeof UserSchema>;
export type UserGetQuerySchemaType = z.infer<typeof UserGetQuerySchema>;
