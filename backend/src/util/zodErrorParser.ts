import { ZodError } from "zod";

export const ZodErrorParser = (err: string) => {
  const parsedErr: ZodError[] = JSON.parse(err);
  const newErrors: any = [];

  parsedErr.forEach((item) => {
    const { message, ..._ } = item;
    newErrors.push({ message });
  });

  return newErrors;
};
