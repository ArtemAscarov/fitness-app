"use client";

import { registerFn } from "@/entities/user/api/api";
import { LocalTokens } from "@/shared/features/LocalTokens";
import Button from "@/shared/ui/button";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { FormEvent, useState } from "react";

type Props = {};

export default function Register({}: Props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatedPassword: "",
  });

  const mutation = useMutation({
    mutationFn: registerFn,
    onSuccess: (data) => {
      LocalTokens.setTokens(data);
    },
  });
  
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formData.password !== formData.repeatedPassword) return;
    const { repeatedPassword, ...data } = formData;
    mutation.mutate(data);
  }

  return (
    <div className="min-h-[calc(100vh-64px)] px-2.5 py-10 flex items-center justify-center">
      <div className="flex items-center justify-center bg-[#1E2939] w-full max-w-[400px] text-white">
        <div className="relative w-full max-h-max max-w-md bg-neutral-primary-soft rounded-base shadow-sm p-4 md:p-6 rounded-xl">
          <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
            <h3 className="text-lg font-medium text-heading">Register</h3>
          </div>

          <form onSubmit={onSubmit} className="pt-4 md:pt-6">
            <div className="mb-4">
              <label className="block mb-2.5 text-sm font-medium text-heading">
                Your email
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
            </div>

            <div className="mb-6">
              <label className="block mb-2.5 text-sm font-medium text-heading">
                Your password
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
            </div>

            <div className="mb-6">
              <label className="block mb-2.5 text-sm font-medium text-heading">
                Repeat password
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

            <div className="flex items-start my-6">
              <div className="flex items-center">
                <input
                  id="checkbox-remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
                />
                <label
                  htmlFor="checkbox-remember"
                  className="ms-2 text-sm font-medium text-heading"
                >
                  Remember me
                </label>
              </div>
            </div>

            <Button
              className="mx-auto max-w-[200px] w-full justify-center my-2.5"
              type="submit"
              variant="default"
            >
              Register
            </Button>

            <div className="text-sm font-medium text-body">
              Have account?{" "}
              <Link
                href="/auth/login"
                className="text-fg-brand hover:underline text-blue-500"
              >
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
