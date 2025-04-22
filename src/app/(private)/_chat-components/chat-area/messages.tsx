import { useMessage } from "@/context/notification-context";
import { IMessageType } from "@/interfaces";
import { getAllMessages, readAllMessages } from "@/server-actions/messages";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState<IMessageType[]>();
  const [loading, setLoading] = useState(false);
  const { selectedChat } = useSelector((state: any) => state.chat);
  const notification = useMessage();
  const { currentUserData } = useSelector((state) => state.user);

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
    readAllMessages({
      userId: currentUserData?._id,
      chatId: selectedChat?._id,
    });
    getMessages();
  }, [selectedChat]);

  return (
    <div className="flex-1 p-3 overflow-y-scroll">
      <div className="flex flex-col gap-3">
        {messages?.map((message: IMessageType) => (
          <Message key={message._id} message={message} />
        ))}
      </div>
    </div>
  );
};

export default Messages;
