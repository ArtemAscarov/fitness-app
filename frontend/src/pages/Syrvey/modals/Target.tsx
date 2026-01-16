import Button from "@/shared/ui/button";
import SyrveyRadio from "@/shared/ui/SyrveyRadio";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  data: { target: string };
  setData: Dispatch<
    SetStateAction<{
      target: string;
      level: string;
      excount: string;
      bodypart: string;
    }>
  >;
};

export default function Target({ setStep, setData, data }: Props) {
  const targets = [
    {
      name: "Похудеть",
      slug: "slim",
    },
    {
      name: "Набрать мышечную массу",
      slug: "muscles",
    },
    {
      name: "Повысить выносливость",
      slug: "endurance",
    },
    {
      name: "Улучшить гибкость",
      slug: "flexibility",
    },
    {
      name: "Поддерживать здоровье",
      slug: "health",
    },
  ];

  const nextPage = () => {
    if (!data.target) return;

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
            onClick={() => setData((prew) => ({ ...prew, target: item.slug }))}
            key={index}
            item={item}
            isActive={data.target === item.slug}
          />
        ))}
      </div>

      <Button onClick={() => nextPage()} className="w-full justify-center">
        Далее
      </Button>
    </div>
  );
}
