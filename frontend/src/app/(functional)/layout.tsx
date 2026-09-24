import { getCategoryQueryOptions } from "@/entities/category/features/getCategoryQueryOptions";
import { getMeServerFn } from "@/entities/user/api/server";
import { getUserQueryOptions } from "@/entities/user/features/getUserQueryOptions";
import Footer from "@/widgets/Footer";
import Header from "@/widgets/Header";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";

type Props = {
  children: React.ReactNode;
};

export default async function layout({ children }: Props) {
  const query = new QueryClient();

  await Promise.all([
    query.prefetchQuery({
      ...getUserQueryOptions(),
      queryFn: getMeServerFn,
    }),
    query.prefetchQuery(getCategoryQueryOptions()),
  ]);

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div>
        <Suspense fallback={<div className="h-16" />}>
          <Header />
        </Suspense>
        <main>{children}</main>
        <Footer />
      </div>
    </HydrationBoundary>
  );
}
