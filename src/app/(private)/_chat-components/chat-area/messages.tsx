import { useMessage } from "@/context/notification-context";
import { IMessageType } from "@/interfaces";
import { getAllMessages, readAllMessages } from "@/server-actions/messages";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
import socket from "@/config/socket-config";

const Messages = () => {
  const [messages, setMessages] = useState<IMessageType[]>();
  const [loading, setLoading] = useState(false);
  const messagesDivRef = useRef();
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

  useEffect(() => {
    socket.on("new-message-received", (message) => {
      if (selectedChat?._id == message?.chat?._id) {
        setMessages((prev) => {
          const isMessageExist = prev?.find(
            (msg) => msg.socketMessageId === message.socketMessageId
          );
          if (isMessageExist) return prev;
          else return [...prev, message];
        });
      }
    });
  }, [selectedChat]);

  useEffect(() => {
    if (messagesDivRef.current) {
      messagesDivRef.current.scrollTop =
        messagesDivRef.current.scrollHeight + 100;
    }
  }, [messages]);

  return (
    <div className="flex-1 p-3 overflow-y-scroll" ref={messagesDivRef}>
      <div className="flex flex-col gap-3">
        {messages?.map((message: IMessageType) => (
          <Message key={message._id} message={message} />
        ))}
      </div>
    </div>
  );
};

export default Messages;
