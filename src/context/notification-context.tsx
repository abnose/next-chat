"use client";
import { App, message } from "antd";
import React, { useCallback, createContext, useContext } from "react";

type NotificationFunction = (
  msg: string,
  type: "error" | "info" | "warning"
) => void;

const MessageContext = createContext<NotificationFunction | undefined>(
  undefined
);

export const MessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  const notification = useCallback(
    (msg: string, type: "error" | "info" | "warning") => {
      messageApi.open({
        type: type,
        content: msg,
        duration: 10,
      });
    },
    [messageApi]
  );

  return (
    <MessageContext.Provider value={notification}>
      <App>
        {contextHolder}
        {children}
      </App>
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
};
