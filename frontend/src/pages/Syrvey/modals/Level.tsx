import Button from "@/shared/ui/button";
import SyrveyRadio from "@/shared/ui/SyrveyRadio";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  data: { level: string };
  setData: Dispatch<
    SetStateAction<{
      target: string;
      level: string;
      excount: string;
      bodypart: string;
    }>
  >;
};

export default function Level({ setStep, setData, data }: Props) {
  const targets = [
    {
      name: "Новичок",
      slug: "beginer",
      description: "Только начинаю заниматься",
    },
    {
      name: "Средний уровень",
      slug: "middle",
      description: "Занимаюсь несколько месяцев",
    },
    {
      name: "Продвинутый",
      slug: "pro",
      description: "Регулярно тренируюсь больше года",
    },
  ];

  const nextPage = () => {
    if (!data.level) return;

    setStep((prew) => prew + 1);
  };

  return (
    <div>
      <h3 className="text-[20px] mb-1">Какова ваша основная цель?</h3>
      <p className="text-[16px] text-gray-400">
        Выберите то, что наиболее точно описывает ваши намерения
      </p>

      <div className="mt-5 w-full flex flex-col gap-[15px] mb-5">
        {targets.map((item, index) => (
          <SyrveyRadio
            onClick={() => setData((prew) => ({ ...prew, level: item.slug }))}
            className="text-left"
            key={index}
            item={item}
            isActive={data.level === item.slug}
          />
        ))}
      </div>

      <Button onClick={() => nextPage()} className="w-full justify-center">
        Далее
      </Button>
    </div>
  );
}
