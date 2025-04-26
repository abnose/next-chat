import { useMessage } from "@/context/notification-context";
import { IMessageType } from "@/interfaces";
import { getAllMessages, readAllMessages } from "@/server-actions/messages";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import socket from "@/config/socket-config";
import { SetChats } from "@/redux/chatSlice";

const Messages = () => {
  const [messages, setMessages] = useState<IMessageType[]>();
  const [loading, setLoading] = useState(false);
  const messagesDivRef = useRef();
  const { selectedChat, chats } = useSelector((state: any) => state.chat);
  const notification = useMessage();
  const { currentUserData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
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

    const newChats = chats.map((chat) => {
      if (chat._id === selectedChat._id) {
        let chatData = { ...chat };
        chatData.unreadCounts = { ...chatData.unreadCounts };
        chatData.unreadCounts[currentUserData._id] = 0;
        return chatData;
      }
      return chat;
    });

    dispatch(SetChats(newChats));
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

    readAllMessages({
      userId: currentUserData?._id,
      chatId: selectedChat?._id,
    });
    getMessages();

    const newChats = chats.map((chat) => {
      if (chat._id === selectedChat._id) {
        let chatData = { ...chat };
        chatData.unreadCounts = { ...chatData.unreadCounts };
        chatData.unreadCounts[currentUserData._id] = 0;
        return chatData;
      }
      return chat;
    });

    dispatch(SetChats(newChats));
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
