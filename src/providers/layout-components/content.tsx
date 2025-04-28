import Loader from "@/app/components/loader";
import { usePathname } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
const Content = ({ children }: { children: React.ReactNode }) => {
  const isPublicRoute =
    usePathname().includes("sign-in") || usePathname().includes("sign-up");

  if (isPublicRoute) return children;

  const { currentUserData } = useSelector((state: any) => state.user);

  if (!currentUserData) {
    return <Loader />;
  }

  return <div className="h-[90vh]">{children}</div>;
};

export default Content;
