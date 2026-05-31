import React, { Suspense } from "react";
import { LoginSkeleton } from "@/shared/ui/skeletons";

const Login = React.lazy(() => import("@/pages/Auth/Login"));

type Props = {};

export default function page({}: Props) {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <Login />
    </Suspense>
  );
}
