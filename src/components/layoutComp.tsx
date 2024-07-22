'use client'
import { usePathname } from "next/navigation";
import NavBar from "./navigation/navBar";

export const LayoutComp = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const shouldHideNavBar = pathname === "/login" || pathname === "/register";

  return (
    <>
      {!shouldHideNavBar && <NavBar />}
      {children}
    </>
  );
};
