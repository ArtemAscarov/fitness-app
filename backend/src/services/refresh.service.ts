import jwt from "jsonwebtoken";
import { prisma } from "../prisma";
import { tokenType } from "../validators/general.validators";
import { env } from "process";
import { RefreshJwtPayload } from "../lib/types/type";
import { CustomError } from "../util/CustomError";
import { createToken } from "../util/createTokens";

class RefreshServiceClass {
  async verifyAndGiveNewToekens({ token }: tokenType) {
    const secret = env.JWT_SECRET || "super_secret";

    const { refreshId } = jwt.verify(token, secret, {
      ignoreExpiration: true,
    }) as RefreshJwtPayload;

    const DbToken = await prisma.refresh.findUnique({
      where: { tokerId: refreshId },
    });

    if (!DbToken) throw new CustomError("Невалидный токен", 403);

    prisma.refresh.delete({
      where: {
        id: DbToken.id,
      },
    });

    if (+new Date(DbToken.expireDate) < +new Date())
      throw new CustomError("Токен просрочен", 403);

    const newTokens = await createToken({ id: DbToken.userId });

    return newTokens;
  }
}

export const RefreshService = new RefreshServiceClass();
