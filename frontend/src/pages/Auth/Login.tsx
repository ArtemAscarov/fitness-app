"use client";

import Button from "@/shared/ui/button";
import Link from "next/link";

type Props = {};

export default function Login({}: Props) {
  return (
    <div className="min-h-[calc(100vh-400px)] px-2.5 py-10 flex items-center justify-center">
      <div className="flex items-center justify-center bg-[#1E2939] w-full max-w-[400px] text-white">
        <div className="relative w-full max-w-md bg-neutral-primary-soft rounded-base shadow-sm p-4 md:p-6 rounded-xl">
          <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
            <h3 className="text-lg font-medium text-heading">Sign in</h3>
          </div>

          <form className="pt-4 md:pt-6">
            <div className="mb-4">
              <label className="block mb-2.5 text-sm font-medium text-heading">
                Your email
              </label>
              <input
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
              <button
                type="button"
                className="ms-auto text-sm font-medium text-fg-brand hover:underline"
              >
                Lost Password?
              </button>
            </div>

            <Button
              className="mx-auto max-w-[200px] w-full justify-center my-2.5"
              type="submit"
              variant="default"
            >
              Login
            </Button>

            <div className="text-sm font-medium text-body">
              Not registered?{" "}
              <Link
                href="/auth/register"
                className="text-fg-brand hover:underline text-blue-500"
              >
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
