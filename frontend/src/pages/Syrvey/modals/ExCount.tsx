import Button from "@/shared/ui/button";
import SyrveyRadio from "@/shared/ui/SyrveyRadio";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  data: { excount: string };
  setData: Dispatch<
    SetStateAction<{
      target: string;
      level: string;
      excount: string;
      bodypart: string;
    }>
  >;
};

export default function ExCount({ setStep, setData, data }: Props) {
  const targets = [
    {
      name: "1-2 раза в неделю",
      slug: "1-2",
      description: "Легкая нагрузка",
    },
    {
      name: "3-4 раза в неделю",
      slug: "3-4",
      description: "Средняя нагрузка",
    },
    {
      name: "5-6 раз в неделю",
      slug: "5-6",
      description: "Интенсивная нагрузка",
    },
    {
      name: "Каждый день",
      slug: "everyDay",
      description: "Максимальная нагрузка",
    },
  ];

  const nextPage = () => {
    if (!data.excount) return;

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
            onClick={() => setData((prew) => ({ ...prew, excount: item.slug }))}
            className="text-left"
            key={index}
            item={item}
            isActive={data.excount === item.slug}
          />
        ))}
      </div>

      <Button onClick={() => nextPage()} className="w-full justify-center">
        Далее
      </Button>
    </div>
  );
}
