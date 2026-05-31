"use client";

import Link from "@/shared/ui/Link";

type Props = { error: any; reset: () => void };

export default function error({ error, reset }: Props) {
  console.log(error);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1e2939] text-gray-300 px-6">
      <h1 className="text-7xl md:text-[120px] font-bold text-white tracking-widest">
        Oops
      </h1>

      <p className="mt-4 text-xl md:text-2xl text-gray-400">
        Что-то пошло не так
      </p>

      <p className="mt-2 text-gray-500 max-w-md text-center leading-relaxed">
        Произошла непредвиденная ошибка. Попробуйте обновить страницу или
        вернуться позже.
      </p>

      {process.env.NODE_ENV === "development" && (
        <div className="mt-6 max-w-2xl w-full rounded-lg border border-red-500/20 bg-red-500/10 p-4 overflow-auto">
          <p className="text-red-400 text-sm font-medium">{error.message}</p>
        </div>
      )}

      <div className="flex flex-col items-center gap-4 mt-8">
        <button
          onClick={() => reset()}
          className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition cursor-pointer"
        >
          Попробовать снова
        </button>

        <Link
          href="/"
          className="px-6 py-3 bg-red-600 rounded-lg border border-gray-700 text-gray-300 hover:bg-red-700 transition w-full justify-center"
        >
          На главную
        </Link>
      </div>
    </div>
  );
}
