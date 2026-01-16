import Button from "@/shared/ui/button";
import SyrveyRadio from "@/shared/ui/SyrveyRadio";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  data: { bodypart: string };
  setData: Dispatch<
    SetStateAction<{
      target: string;
      level: string;
      excount: string;
      bodypart: string;
    }>
  >;
};

export default function BodyPart({ setStep, setData, data }: Props) {
  const targets = [
    {
      name: "Грудь",
      slug: "breast",
    },
    {
      name: "Спина",
      slug: "back",
    },
    {
      name: "Ноги",
      slug: "legs",
    },
    {
      name: "Руки",
      slug: "hands",
    },
    {
      name: "Плечи",
      slug: "shoulders",
    },
    {
      name: "Пресс",
      slug: "press",
    },
  ];

  const nextPage = () => {
    if (!data.bodypart) return;

    setStep((prew) => prew + 1);
  };

  return (
    <div>
      <h3 className="text-[20px] mb-1">Какова ваша основная цель?</h3>
      <p className="text-[16px] text-gray-400">
        Выберите то, что наиболее точно описывает ваши намерения
      </p>

      <div className="mt-5 w-full grid grid-cols-2 gap-[15px] mb-5">
        {targets.map((item, index) => (
          <SyrveyRadio
            onClick={() =>
              setData((prew) => ({ ...prew, bodypart: item.slug }))
            }
            className="p-5"
            key={index}
            item={item}
            isActive={data.bodypart === item.slug}
          />
        ))}
      </div>

      <Button onClick={() => nextPage()} className="w-full justify-center">
        Далее
      </Button>
    </div>
  );
}
