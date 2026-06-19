import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "みんなの健康部",
  description: "みんなで続ける健康習慣",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
