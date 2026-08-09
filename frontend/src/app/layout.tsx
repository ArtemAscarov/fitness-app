import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/layouts/Providers";

export const metadata: Metadata = {
  title: "FitnesPro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`bg-[#101828] bg-gradient-to-b from-[#101828] via-[#0f1726] to-[#0c1320] min-h-screen`}
      >
        <Providers>
          <div className="max-w-[1920px] w-full mx-auto">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
