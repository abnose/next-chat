import { useMessage } from "@/context/notification-context";
import { IMessageType } from "@/interfaces";
import { getAllMessages } from "@/server-actions/messages";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState<IMessageType[]>();
  const [loading, setLoading] = useState(false);
  const { selectedChat } = useSelector((state: any) => state.chat);
  const notification = useMessage();
  const getMessages = async () => {
    try {
      setLoading(true);
      const response = await getAllMessages(selectedChat?._id);
      if (response?.error) throw new Error(response.error);
      setMessages(response);
    } catch (error: any) {
      notification(error?.message, "error");
    }
  };

  useEffect(() => {
    getMessages();
  }, [selectedChat]);

  return (
    <div className="flex-1 p-3">
      <div className="flex flex-col gap-3">
        {messages?.map((message: IMessageType) => (
          <Message key={message._id} message={message} />
        ))}
      </div>
    </div>
  );
};

export default Messages;
