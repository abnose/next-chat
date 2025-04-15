"use client";
import { message } from "antd";
import { useCallback, createContext, useContext } from "react";
const MessageContext = createContext(undefined);
export const MessageProvider = ({ children }) => {
  const [messageApi, setMessageApi] = message.useMessage();

  const notification = useCallback(
    (msg: string, type: "error" | "info" | "warning") => {
      messageApi.open({
        type: type,
        content: msg,
        duration: 10,
      });
    },
    []
  );

  return (
    <MessageContext.provider value={notification}>
      {setMessageApi}
      {children}
    </MessageContext.provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  return context;
};
