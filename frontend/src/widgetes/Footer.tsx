import Link from "@/shared/ui/Link";
import Image from "next/image";

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className="bg-[#0d0f15] text-gray-300 py-10 px-4">
      <div className="max-w-[1600px] w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg font-semibold">ФитнесПро</span>
            </div>

            <p className="text-gray-400 leading-relaxed max-w-sm">
              Ваш персональный помощник в мире фитнеса и здорового образа жизни
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Разделы</h3>

            <ul className="space-y-2 text-gray-400">
              <li>
                <Link variant="whiteHover" href="/excercises">
                  Упражнения
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Информация</h3>

            <ul className="space-y-2 text-gray-400">
              <li>
                <Link variant="whiteHover" href="/">
                  О нас
                </Link>
              </li>
              <li>
                <Link variant="whiteHover" href="https://github.com/Artem34236">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400 text-sm">
          © 2025 ФитнесПро. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
