import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "../prisma";
import { CustomError } from "./CustomError";

type DataType = {
  id: number;
};

export async function createToken(data: DataType) {
  const secret = process.env.JWT_SECRET || "It_is_secret";

  const refreshId = uuidv4();
  const refreshToken = jwt.sign({ refreshId }, secret);
  const accesToken = jwt.sign(data, secret, {
    expiresIn: `${2}Hours`,
  });

  const result = await prisma.refresh.create({
    data: {
      userId: data.id,
      tokenId: refreshId,
      expireDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    },
  });

  if (!result) throw new CustomError("Ошибка при создании токена", 500);

  return { accesToken, refreshToken };
}
