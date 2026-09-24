import jwt from "jsonwebtoken";
import { prisma } from "../prisma.js";
import { tokenType } from "../validators/general.validators.js";
import { env } from "process";
import { RefreshJwtPayload } from "../lib/types/type.js";
import { CustomError } from "../util/CustomError.js";
import { createToken } from "../util/createTokens.js";

class RefreshServiceClass {
  async verifyAndGiveNewToekens({ token }: tokenType) {
    const secret = env.JWT_SECRET || "It_is_secret";

    const { refreshId } = jwt.verify(token, secret, {
      ignoreExpiration: true,
    }) as RefreshJwtPayload;
    console.log(refreshId);
    
    const DbToken = await prisma.refresh.findUnique({
      where: { tokenId: refreshId },
    });

    if (!DbToken) throw new CustomError("Нету такого токена", 404);

    await prisma.refresh.delete({
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
