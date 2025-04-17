import React from "react";
import Header from "./layout-components/header";
import Content from "./layout-components/content";
import { MessageProvider } from "@/context/notification-context";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MessageProvider>
      <Header />
      <Content>{children}</Content>
    </MessageProvider>
  );
};

export default LayoutProvider;
