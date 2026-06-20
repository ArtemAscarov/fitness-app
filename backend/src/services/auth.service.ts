import { prisma } from "../prisma";
import bcrypt from "bcrypt";
import { AuthDataType } from "../validators/auth.validator";
import { createToken } from "../util/createTokens";
import jwt from "jsonwebtoken";
import { RefreshJwtPayload } from "../lib/types/type";
import { CustomError } from "../util/CustomError";

class AuthServiceClass {
  async register(data: AuthDataType) {
    const hashedPass = await bcrypt.hash(data.password, 10);
    const { id } = await prisma.user.create({
      data: {
        password: hashedPass,
        email: data.email,
      },
    });

    const tokens = await createToken({ id });

    return tokens;
  }

  async login(data: AuthDataType) {
    const findedUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!findedUser)
      throw new CustomError("Неправильный логин или пароль", 401);

    const isMatch = await bcrypt.compare(data.password, findedUser.password);
    if (!isMatch) throw new CustomError("Неправильный логин или пароль", 401);

    const tokens = await createToken({
      id: findedUser.id,
    });

    return tokens;
  }

  async logout(token: string) {
    if (!token) return;

    const secret = process.env.JWT_SECRET || "It_is_secret";

    const { refreshId } = jwt.verify(token, secret, {
      ignoreExpiration: false,
    }) as RefreshJwtPayload;

    await prisma.refresh.deleteMany({
      where: {
        tokenId: refreshId,
      },
    });
  }
}

export const AuthService = new AuthServiceClass();
