import { prisma } from "../prisma";
import bcrypt from "bcrypt";
import { AuthDataType } from "../validators/auth.validator";
import { createToken } from "../util/createTokens";

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

    if (!findedUser) throw new Error("Неправильный логин или пароль");

    const isMatch = await bcrypt.compare(data.password, findedUser.password);
    if (!isMatch) throw new Error("Неправильный логин или пароль");

    const tokens = await createToken({
      id: findedUser.id,
    });
    return tokens;
  }
}

export const AuthService = new AuthServiceClass();
