import type { Metadata } from "next";
import "./globals.css";

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
      <body className={`bg-[#101828]`}>
        <div className="max-w-[1920px] w-full mx-auto">{children}</div>
      </body>
    </html>
  );
}
