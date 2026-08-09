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

type Props = {
  children: React.ReactNode;
};

export default async function layout({ children }: Props) {
  const query = new QueryClient();
  
  Promise.all([
    await query.prefetchQuery({
      ...getUserQueryOptions(),
      queryFn: getMeServerFn,
    }),
    await query.prefetchQuery(getCategoryQueryOptions()),
  ]);

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </HydrationBoundary>
  );
}
