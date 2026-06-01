"use client";

import { loginFn } from "@/entities/user/api/api";
import { LocalTokens } from "@/shared/features/LocalTokens";
import { APIErrorType, AuthTokens } from "@/shared/types/type";
import AlertText from "@/shared/ui/AlertText";
import Button from "@/shared/ui/button";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
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

export default function Login({}: Props) {
  const [isSaveTokens, setIsSaveTokens] = useState(true);
  const [FormData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<ErrorStateType>({
    email: [],
    password: [],
    global: "",
  });

  const mutation = useMutation<AuthTokens, AxiosError, LoginForm>({
    mutationFn: loginFn,
    onError: (e) => {
      const error = e.response?.data as APIErrorType;
      let localErrors: ErrorStateType = {
        email: [],
        password: [],
        global: "",
      };

      if (Array.isArray(error)) {
        for (let i = 0; i < error.length; i++) {
          localErrors[error[i].path[0] as "email" | "password"] = [
            ...localErrors[error[i].path[0] as "email" | "password"],
            error[i].message,
          ];
        }

        setErrors((prew) => ({ ...prew, ...localErrors }));
      } else localErrors.global = error.message;

      setErrors(localErrors);
    },
    onSuccess: (data) => {
      if (isSaveTokens) LocalTokens.setTokens(data);
      LocalTokens.clearTokens();
      LocalTokens.setSessionTokens(data);
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
              <input
                type="password"
                value={FormData.password || ""}
                onChange={onChange("password")}
                className="w-full rounded-base px-3 py-2.5 bg-neutral-secondary-medium outline-0 rounded-sm text-white border border-default-medium"
                placeholder="••••••••"
                required
              />
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
              <button
                type="button"
                className="ms-auto text-sm font-medium text-fg-brand hover:underline cursor-pointer"
              >
                Забыли пароль?
              </button>
            </div>

            {errors.global ? <AlertText className="mb-3">{errors.global}</AlertText> : null}
            
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
