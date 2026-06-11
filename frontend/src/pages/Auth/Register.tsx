"use client";

import { registerFn } from "@/entities/user/api";
import { LocalTokens } from "@/shared/features/LocalTokens";
import { APIErrorType, AuthTokens } from "@/shared/types/type";
import AlertText from "@/shared/ui/AlertText";
import Button from "@/shared/ui/button";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

type Props = {};

type LoginForm = {
  email: string;
  password: string;
};

type ErrorStateType = {
  email: string[];
  password: string[];
  global: string;
};

export default function Register({}: Props) {
  const router = useRouter();
  const [isSaveTokens, setIsSaveTokens] = useState<boolean>(true);
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowSecondPass, setIsShowSecondPass] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatedPassword: "",
  });

  const [errors, setErrors] = useState<ErrorStateType>({
    email: [],
    password: [],
    global: "",
  });

  const mutation = useMutation<AuthTokens, AxiosError, LoginForm>({
    mutationFn: registerFn,
    onSuccess: (data) => {
      LocalTokens.clearTokens();
      if (isSaveTokens) {
        LocalTokens.setTokens(data);
      } else {
        LocalTokens.setSessionTokens(data);
      }

      router.push("/excercise");
    },
    onError: (err) => {
      const e = err.response?.data as APIErrorType;

      let localErrors: ErrorStateType = {
        email: [],
        password: [],
        global: "",
      };

      if (Array.isArray(e)) {
        for (let i = 0; i < e.length; i++) {
          localErrors[e[i].path[0] as "email" | "password"] = [
            ...localErrors[e[i].path[0] as "email" | "password"],
            e[i].message,
          ];
        }
      } else localErrors.global = e.message;

      setErrors(localErrors);
    },
  });

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formData.password !== formData.repeatedPassword)
      return setErrors((prew) => ({
        ...prew,
        global: "Пароли должны совпадать",
      }));
    const { repeatedPassword, ...data } = formData;
    mutation.mutate(data);
  }

  function onChange(key: "email" | "password" | "repeatedPassword") {
    return (e: ChangeEvent<HTMLInputElement>) => {
      setErrors((prew) => ({ ...prew, global: "", [key]: [] }));

      setFormData((prew) => ({
        ...prew,
        [key]: e.target?.value || "",
      }));
    };
  }

  return (
    <div className="min-h-[calc(100vh-64px)] px-2.5 py-10 flex items-center justify-center">
      <div className="flex items-center justify-center bg-[#1E2939] w-full max-w-[400px] text-white">
        <div className="relative w-full max-h-max max-w-md bg-neutral-primary-soft rounded-base shadow-sm p-4 md:p-6 rounded-xl">
          <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
            <h3 className="text-lg font-medium text-heading">Регистрация</h3>
          </div>

          <form onSubmit={onSubmit} className="pt-4 md:pt-6">
            <div className="mb-4">
              <label className="block mb-2.5 text-sm font-medium text-heading">
                Ваша почта
              </label>
              <input
                value={formData.email || ""}
                onChange={onChange("email")}
                type="email"
                className="w-full rounded-base px-3 py-2.5 bg-neutral-secondary-medium outline-0 rounded-sm text-white border border-default-medium"
                placeholder="example@company.com"
                required
              />
              {errors.email.map((item, index) => (
                <AlertText key={index}>{item}</AlertText>
              ))}
            </div>

            <div className="mb-4">
              <label className="block mb-2.5 text-sm font-medium text-heading">
                Ваш пароль
              </label>

              <div className="w-full rounded-base px-3 py-2.5 bg-neutral-secondary-medium  rounded-sm text-white border border-default-medium flex">
                <input
                  value={formData.password || ""}
                  onChange={onChange("password")}
                  type={isShowPass ? "text" : "password"}
                  className="outline-0 flex-1"
                  placeholder="••••••••"
                  required
                />

                <button
                  onClick={() => setIsShowPass((prew) => !prew)}
                  type="button"
                  className="cursor-pointer"
                >
                  {isShowPass ? (
                    <Image
                      alt={"Show password"}
                      width={20}
                      height={20}
                      src={"/svg/openEye.svg"}
                    />
                  ) : (
                    <Image
                      alt={"Hide password"}
                      width={20}
                      height={20}
                      src={"/svg/closeEye.svg"}
                    />
                  )}
                </button>
              </div>

              {errors.password.map((item, index) => (
                <AlertText key={index}>{item}</AlertText>
              ))}
            </div>

            <div className="mb-6">
              <label className="block mb-2.5 text-sm font-medium text-heading">
                Повторите пароль
              </label>
              <div className="w-full rounded-base px-3 py-2.5 bg-neutral-secondary-medium rounded-sm text-white border border-default-medium flex">
                <input
                  value={formData.repeatedPassword || ""}
                  onChange={onChange("repeatedPassword")}
                  type={isShowSecondPass ? "text" : "password"}
                  className="outline-0 flex-1"
                  placeholder="••••••••"
                  required
                />

                <button
                  onClick={() => setIsShowSecondPass((prew) => !prew)}
                  type="button"
                  className="cursor-pointer"
                >
                  {isShowSecondPass ? (
                    <Image
                      alt={"Show password"}
                      width={20}
                      height={20}
                      src={"/svg/openEye.svg"}
                    />
                  ) : (
                    <Image
                      alt={"Hide password"}
                      width={20}
                      height={20}
                      src={"/svg/closeEye.svg"}
                    />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-start my-2">
              <div className="flex items-center">
                <input
                  id="checkbox-remember"
                  type="checkbox"
                  checked={isSaveTokens}
                  onChange={() => setIsSaveTokens((prew) => !prew)}
                  className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft cursor-pointer"
                />
                <label
                  htmlFor="checkbox-remember"
                  className="ms-2 text-sm font-medium text-heading cursor-pointer"
                >
                  Запомнить меня
                </label>
              </div>
            </div>

            {errors.global ? (
              <AlertText className="mb-3">{errors.global}</AlertText>
            ) : null}

            <Button
              className="mx-auto max-w-[200px] w-full justify-center my-4"
              type="submit"
              variant="default"
            >
              Зарегистрироватся
            </Button>

            <div className="text-sm font-medium text-body">
              Уже есть аккаунт?{" "}
              <Link
                href="/auth/login"
                className="text-fg-brand hover:underline text-blue-500"
              >
                Войти
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
