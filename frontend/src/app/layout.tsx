import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/layouts/Providers";
import Loader from "@/layouts/Loader";

export const metadata: Metadata = {
  title: "FitnesPro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Loader>
        <html lang="ru">
          <body
            className={`bg-[#101828] bg-gradient-to-b from-[#101828] via-[#0f1726] to-[#0c1320] min-h-screen`}
          >
            <div className="max-w-[1920px] w-full mx-auto">{children}</div>
          </body>
        </html>
      </Loader>
    </Providers>
  );
}
