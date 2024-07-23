import type { Metadata } from "next";
import "./globals.css";
import MainMenu from "@/app/components/menu/menu.component";

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
      <body>
        <MainMenu />
        {children}
      </body>
    </html>
  );
}
