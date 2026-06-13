"use client";

import { loginFn } from "@/entities/user/api";
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

type ErrorStateType = {
  email: string[];
  password: string[];
  global: string;
};

export default function Login({}: Props) {
  const router = useRouter();
  const [isSaveTokens, setIsSaveTokens] = useState(true);
  const [isShowPass, setIsShowPass] = useState(false);
  const [FormData, setFormData] = useState<Parameters<typeof loginFn>[0]>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<ErrorStateType>({
    email: [],
    password: [],
    global: "",
  });

  const mutation = useMutation<
    AuthTokens,
    AxiosError,
    Parameters<typeof loginFn>[0]
  >({
    mutationFn: loginFn,

    onError: (e) => {
      const error = e.response?.data as APIErrorType | undefined;
      let localErrors: ErrorStateType = {
        email: [],
        password: [],
        global: "",
      };

      if (!error) {
        setErrors({
          email: [],
          password: [],
          global: "Сервер недоступен, попробуйте позже",
        });
        return;
      }

      if (Array.isArray(error)) {
        for (let i = 0; i < error.length; i++) {
          localErrors[error[i].path[0] as "email" | "password"] = [
            ...localErrors[error[i].path[0] as "email" | "password"],
            error[i].message,
          ];
        }
      } else localErrors.global = error.message;

      setErrors(localErrors);
    },

    onSuccess: (data) => {
      LocalTokens.clearTokens();
      if (isSaveTokens) {
        LocalTokens.setTokens(data);
      } else {
        LocalTokens.setSessionTokens(data);
      }

      router.push("/exercise");
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (FormData.password.length < 6)
      return setErrors((prew) => ({
        ...prew,
        password: ["Пароль должен быть минимум 6 символов"],
      }));

    mutation.mutate(FormData);
  };

  function onChange(key: "email" | "password") {
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
        <div className="relative w-full max-w-md bg-neutral-primary-soft rounded-base shadow-sm p-4 md:p-6 rounded-xl">
          <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
            <h3 className="text-lg font-medium text-heading">Вход</h3>
          </div>

          <form onSubmit={onSubmit} className="pt-4 md:pt-6">
            <div className="mb-4">
              <label className="block mb-2.5 text-sm font-medium text-heading">
                Ваша почта
              </label>
              <input
                type="email"
                value={FormData.email || ""}
                onChange={onChange("email")}
                className="w-full rounded-base px-3 py-2.5 bg-neutral-secondary-medium outline-0 rounded-sm text-white border border-default-medium"
                placeholder="example@company.com"
                required
              />
              {errors.email.map((item, index) => (
                <AlertText key={index}>{item}</AlertText>
              ))}
            </div>

            <div className="mb-6">
              <label className="block mb-2.5 text-sm font-medium text-heading">
                Ваш пароль
              </label>
              <div className="w-full rounded-base px-3 py-2.5 bg-neutral-secondary-medium rounded-sm text-white border border-default-medium flex">
                <input
                  type={isShowPass ? "text" : "password"}
                  value={FormData.password || ""}
                  onChange={onChange("password")}
                  className="outline-none flex-1"
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
                  className="ms-2 text-sm font-medium text-heading cursor-pointer "
                >
                  Запомнить меня
                </label>
              </div>
            </div>

            {errors.global ? (
              <AlertText className="mb-3">{errors.global}</AlertText>
            ) : null}

            <Button
              className="mx-auto max-w-[200px] w-full justify-center my-2.5"
              type="submit"
              variant="default"
            >
              Войти
            </Button>

            <div className="text-sm font-medium text-body flex gap-1">
              Нет аккаунта?
              <Link
                href="/auth/register"
                className="text-fg-brand hover:underline text-blue-500"
              >
                Создать аккаунт
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
