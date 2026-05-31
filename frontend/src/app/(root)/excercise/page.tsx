import React, { Suspense } from "react";
import { ExcerciseSkeleton } from "@/shared/ui/skeletons";

const Excercise = React.lazy(() => import("../../../pages/Excercise/index"));

type Props = {};

export default function page({}: Props) {
  return (
    <Suspense fallback={<ExcerciseSkeleton />}>
      <Excercise />
    </Suspense>
  );
}
