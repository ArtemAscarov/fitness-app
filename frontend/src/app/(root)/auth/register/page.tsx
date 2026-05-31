import React, { Suspense } from "react";
import { RegisterSkeleton } from "@/shared/ui/skeletons";

const Register = React.lazy(() => import("@/pages/Auth/Register"));

type Props = {};

export default function page({}: Props) {
  return (
    <Suspense fallback={<RegisterSkeleton />}>
      <Register />
    </Suspense>
  );
}
