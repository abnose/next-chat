import { message } from "antd";
import { useCallback, createContext, useContext } from "react";

export const MessageContext = ({ children }) => {
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
const messageContext = createContext(undefined);
export const useMessage = () => {
  const context = useContext(messageContext);
  return context;
};
