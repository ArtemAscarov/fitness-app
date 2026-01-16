"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";
import Target from "./modals/Target";
import Link from "@/shared/ui/Link";
import { cn } from "@/shared/lib/cn";
import Level from "./modals/Level";
import ExCount from "./modals/ExCount";
import BodyPart from "./modals/BodyPart";

type Props = {};

export default function index({}: Props) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    target: "",
    level: "",
    excount: "",
    bodypart: "",
  });

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Target setData={setData} data={data} setStep={setStep} />;
      case 2:
        return <Level setData={setData} data={data} setStep={setStep} />;
      case 3:
        return <ExCount setData={setData} data={data} setStep={setStep} />;
      case 4:
        return <BodyPart setData={setData} data={data} setStep={setStep} />;
      case 5:
        return null;
      default:
        return (
          <div className="text-white font-bold text-[22px] flex flex-col gap-3">
            Упс... Что-то пошло не так :(
            <Link className="justify-center" href="/">
              {"Обратно =>"}
            </Link>
          </div>
        );
    }
  };

  return (
    <div className="p-2.5 md:py-5 h-[calc(100vh-200px)] flex items-center justify-center flex-col">
      <div className="p-3 bg-[#1e2939] rounded-md text-white">
        <p className="mb-3">Шаг {step} из 5</p>
        <div className="relative h-1.5 rounded bg-gray-700 overflow-hidden">
          <div
            className={cn(
              "h-full bg-linear-to-r from-blue-400 to-blue-600 transition-transform duration-500 ease-out origin-left",
              step === 1 && "scale-x-[0.20]",
              step === 2 && "scale-x-[0.4]",
              step === 3 && "scale-x-[0.6]",
              step === 4 && "scale-x-[0.8]",
              step === 5 && "scale-x-100"
            )}
          />
        </div>

        {renderStep()}
      </div>
    </div>
  );
}
