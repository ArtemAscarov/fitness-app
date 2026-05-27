import React, { Suspense } from "react";

const Login = React.lazy(() => import("@/pages/Auth/Login"));

type Props = {};

export default function page({}: Props) {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Login />
    </Suspense>
  );
}
