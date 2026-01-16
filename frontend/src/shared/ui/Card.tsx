import Image from "next/image";
import Button from "./button";
import useToggle from "../hooks/useToggle";
import { cn } from "../lib/cn";

type Props = {};

export default function Card({}: Props) {
  const [instruction, toggle] = useToggle(false);

  return (
    <div className="max-w-[610px]">
      <div className="relative">
        <div className="px-[15px] py-[5px] border border-green-700 rounded-xl bg-[#245e23] hover:bg-[#225021] cursor-pointer absolute right-2.5 top-2.5">
          <p className="text-[#74f376]">Новичок</p>
        </div>
        <img
          className="max-h-[300px] w-full object-cover rounded-t-[10px]"
          alt="trainMan2"
          src={"/img/trainMan2.png"}
        />
      </div>

      <div className="p-2.5">
        <h4 className="text-white text-[20px] mb-1">Отжимания</h4>
        <p className="text-[#99a1af] mb-2.5 text-[18px] max-w-[480px]">
          Классическое упражнение для развития грудных мышц, трицепсов и плеч
        </p>
        <div className="flex items-center gap-2.5 mb-5">
          <div className="px-[15px] py-[5px] border border-blue-800 rounded-xl bg-[#1d2e53] hover:bg-[#293e6c] cursor-pointer">
            <p className="text-[#74b6f3]">#asdf</p>
          </div>
          <div className="px-[15px] py-[5px] border border-blue-800 rounded-xl bg-[#1d2e53] hover:bg-[#293e6c] cursor-pointer">
            <p className="text-[#74b6f3]">#asdf</p>
          </div>
          <div className="px-[15px] py-[5px] border border-blue-800 rounded-xl bg-[#1d2e53] hover:bg-[#293e6c] cursor-pointer">
            <p className="text-[#74b6f3]">#asdf</p>
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <Image
              width={20}
              height={20}
              src="/svg/progress.svg"
              alt="progres"
            />
            <p className="text-[#ebbd3e]">8 ккал/мин</p>
          </div>
        </div>

        <div
          className={cn(
            !instruction ? "max-h-0" : "max-h-[9999px]",
            "overflow-hidden transition-all duration-500"
          )}
        >
          <div className="bg-[#4444441c] rounded-md p-2.5 my-5">
            <h5 className="text-white mb-2">Как выполнять:</h5>
            <ol className="list-decimal list-inside text-[#99A197] space-y-2">
              <li>Примите исходное положение </li>
              <li>Выполните движение плавно и контролируемо</li>
              <li>Сделайте паузу в точке максимального напряжения</li>
              <li>Вернитесь в исходное положение</li>
            </ol>
          </div>
        </div>

        <div className="flex gap-[15px]">
          <Button onClick={toggle} className="flex-1 justify-center">
            {instruction ? "Скрыть" : "Подробнее"}
          </Button>
          <button className="cursor-pointer w-[50px] flex items-center justify-center">
            <Image
              width={25}
              height={25}
              alt="emptyHurt"
              src={"/svg/emptyHurt.svg"}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
