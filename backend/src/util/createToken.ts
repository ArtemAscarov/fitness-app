import jwt from "jsonwebtoken";

export function createToken(data: Record<any, any>) {
  const secret = process.env.JWT_SECRET || "It_is_secret";

  return jwt.sign(data, secret);
}
