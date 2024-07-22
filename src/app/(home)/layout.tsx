import type { Metadata } from "next";
import { anybody } from "./fonts";
import "./globals.css";
import { LayoutComp } from "@/components/layoutComp";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode,
}>) {

  return (
    <html lang="en">
      <body className={anybody.className}>
        <LayoutComp>{children}</LayoutComp>
      </body>
    </html>
  );
}
