import React from "react";
import Header from "./layout-components/header";
import Content from "./layout-components/content";
import { MessageProvider } from "@/helpers/useMessageApi";
const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <MessageProvider>
        <Header />
        <Content>{children}</Content>
      </MessageProvider>
    </div>
  );
};

export default LayoutProvider;
