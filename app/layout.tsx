import type { Metadata } from "next";
import "./globals.css";
import MainMenu from "@/app/components/menu/menu.component";
import Head from "next/head";

export const metadata: Metadata = {
  title: "1xFreight",
  description: "No description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
      </Head>
      <body>
        <MainMenu />
        {children}
      </body>
    </html>
  );
}
