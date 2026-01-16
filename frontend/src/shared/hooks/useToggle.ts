import { useState } from "react";

type toogleFun = {
  (): void;
  (value: boolean): void;
};

export default function useToggle(defaulValue: boolean): [boolean, toogleFun] {
  const [state, setState] = useState<boolean>(defaulValue);

  const toggle = (value?: boolean) => {
    if (typeof value === "boolean") {
      setState(value);
    } else {
      setState((prew) => !prew);
    }
  };

  return [state, toggle];
}
