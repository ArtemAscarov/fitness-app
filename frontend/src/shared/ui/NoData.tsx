import { cn } from "../lib/cn";

type Props = {
  className?: string;
  extraText?: string;
};

export default function NoData({ className, extraText }: Props) {
  return (
    <div
      className={cn([
        "flex flex-col items-center justify-center text-gray-300 px-6",
        className,
      ])}
    >
      <p className="mt-4 text-xl md:text-2xl text-gray-400">Ой :(</p>
      <div className="flex flex-col mt-2">
        <p className="text-gray-500 max-w-md text-center leading-relaxed">
          Похоже что тут ничего нет.
        </p>
        <p className="text-gray-500 font-[600] max-w-md text-center leading-relaxed">
          {extraText}
        </p>
      </div>
    </div>
  );
}
