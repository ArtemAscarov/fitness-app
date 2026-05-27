import React, { Suspense } from "react";

const Excercise = React.lazy(() => import("../../../pages/Excercise/index"));

type Props = {};

export default function page({}: Props) {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Excercise />
    </Suspense>
  );
}
