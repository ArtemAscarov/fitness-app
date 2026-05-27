import React, { Suspense } from "react";

const Register = React.lazy(() => import("@/pages/Auth/Register"));

type Props = {};

export default function page({}: Props) {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Register />
    </Suspense>
  );
}
