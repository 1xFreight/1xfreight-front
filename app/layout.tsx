import type { Metadata } from "next";
import "./globals.css";
import MainMenu from "@/app/components/menu/menu.component";
import Providers from "@/common/providers/providers";
import { useMemo } from "react";

export const metadata: Metadata = {
  title: "1xFreight",
  description: "No description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const memoizedChildren = useMemo(() => children, [children]);

  return (
    <html lang="en">
      <body>
        <Providers>
          <MainMenu />
          {memoizedChildren}
        </Providers>
      </body>
    </html>
  );
}
