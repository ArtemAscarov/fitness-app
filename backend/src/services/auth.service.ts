import { prisma } from "../prisma";
import bcrypt from "bcrypt";
import { AuthDataType } from "../validators/auth.validator";
import { createToken } from "../util/createToken";

class AuthServiceClass {
  async register(data: AuthDataType) {
    // const findedUser = await prisma.user.findUnique({
    //   where: {
    //     email: data.email,
    //   },
    // });

    // if (findedUser) throw new Error("Данная почта уже зарегестрирована");

    const hashedPass = await bcrypt.hash(data.password, 10);
    const { email, id } = await prisma.user.create({
      data: {
        password: hashedPass,
        email: data.email,
      },
    });

    const token = createToken({ id, email });

    return {
      email,
      token,
    };
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

      const token = createToken({ id: findedUser.id, email: findedUser.email });
      return {
        email: findedUser.email,
        token,
      };
  
  }
}

export const AuthService = new AuthServiceClass();
