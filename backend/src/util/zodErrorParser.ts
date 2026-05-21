import { ZodError } from "zod";

export const ZodErrorParser = (err: string) => {
  const parsedErr: any[] = JSON.parse(err);
  const newErrors: any = [];

  parsedErr.forEach((item) => {
    const { message, path, ..._ } = item;
    newErrors.push({ path, message });
  });

  return newErrors;
};
