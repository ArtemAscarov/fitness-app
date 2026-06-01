"use client";

import { registerFn } from "@/entities/user/api/api";
import { LocalTokens } from "@/shared/features/LocalTokens";
import { APIErrorType, AuthTokens } from "@/shared/types/type";
import AlertText from "@/shared/ui/AlertText";
import Button from "@/shared/ui/button";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import { FormEvent, useState } from "react";

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
  const [isSaveTokens, setIsSaveTokens] = useState<boolean>(true);
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
      if (isSaveTokens) LocalTokens.setTokens(data);
      LocalTokens.setSessionTokens(data);
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
                onChange={(e) =>
                  setFormData((prew) => ({ ...prew, email: e.target.value }))
                }
                type="email"
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
                value={formData.password || ""}
                onChange={(e) =>
                  setFormData((prew) => ({ ...prew, password: e.target.value }))
                }
                type="password"
                className="w-full rounded-base px-3 py-2.5 bg-neutral-secondary-medium outline-0 rounded-sm text-white border border-default-medium"
                placeholder="••••••••"
                required
              />
              {errors.password.map((item, index) => (
                <AlertText key={index}>{item}</AlertText>
              ))}
            </div>

            <div className="mb-6">
              <label className="block mb-2.5 text-sm font-medium text-heading">
                Повторите пароль
              </label>
              <input
                value={formData.repeatedPassword || ""}
                onChange={(e) =>
                  setFormData((prew) => ({
                    ...prew,
                    repeatedPassword: e.target.value,
                  }))
                }
                type="password"
                className="w-full rounded-base px-3 py-2.5 bg-neutral-secondary-medium outline-0 rounded-sm text-white border border-default-medium"
                placeholder="••••••••"
                required
              />
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

            {errors.global ? <AlertText className="mb-3">{errors.global}</AlertText> : null}

            <Button
              className="mx-auto max-w-[200px] w-full justify-center my-2.5"
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
