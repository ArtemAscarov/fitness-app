import Link from "@/shared/ui/Link";

type Props = {};

export default function notFind({}: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d0f15] text-gray-300 px-6">
      <h1 className="text-7xl md:text-[120px] font-bold text-white tracking-widest">
        404
      </h1>

      <p className="mt-4 text-xl md:text-2xl text-gray-400">
        Страница не найдена
      </p>

      <p className="mt-2 text-gray-500 max-w-md text-center leading-relaxed">
        Возможно, вы перешли по неверной ссылке или страница была удалена.
      </p>

      <Link
        href="/"
        className="mt-8 inline-block px-6 py-3 rounded-lg bg-blue-600 text-white font-medium 
            hover:bg-blue-500 transition"
      >
        Вернуться на главную
      </Link>
    </div>
  );
}
