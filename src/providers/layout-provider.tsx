import React from "react";
import Header from "./layout-components/header";
import Content from "./layout-components/content";
import { MessageProvider } from "@/context/notification-context";
import { AntdRegistry } from "@ant-design/nextjs-registry";
const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AntdRegistry>
      <MessageProvider>
        <Header />
        <Content>{children}</Content>
      </MessageProvider>
    </AntdRegistry>
  );
};

export default LayoutProvider;
