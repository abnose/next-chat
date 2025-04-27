import { useMessage } from "@/context/notification-context";
import { IChatState, SetChats } from "@/redux/chatSlice";
import { getAllChats } from "@/server-actions/chat";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatCard from "./chat-card";
import socket from "@/config/socket-config";
import { IChatType, IMessageType } from "@/interfaces";
import store from "@/redux/store";

const ChatList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { currentUserData } = useSelector((state: any) => state.user);
  const { chats, selcetedChat }: IChatState = useSelector(
    (state: any) => state.chat
  );
  const notification = useMessage();
  const getChats = async () => {
    setLoading(true);
    try {
      const response = await getAllChats(currentUserData?._id!);
      if (!response)
        throw new Error("Something went wrong in getting chat list");
      dispatch(SetChats(response));
    } catch (error: any) {
      notification(error?.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  useEffect(() => {
    socket.on("new-message-received", (newMessage: IMessageType) => {
      let { chats } = store.getState().chat;
      let prevChats = [...chats];

      let indexOfChatToUpdate = prevChats.findIndex(
        (chat) => chat._id === newMessage.chat._id
      );

      if (indexOfChatToUpdate == -1) return;

      let chatToUpdate = prevChats[indexOfChatToUpdate];

      let chatToUpdateCopy: IChatType = { ...chatToUpdate };

      if (
        chatToUpdateCopy?.lastMessage?.socketMessageId ===
        newMessage?.socketMessageId
      )
        return;

      chatToUpdateCopy.lastMessage = newMessage;
      chatToUpdateCopy.updatedAt = newMessage.createdAt;

      chatToUpdateCopy.unreadCounts = { ...chatToUpdate.unreadCounts };

      if (
        newMessage.sender._id !== currentUserData?._id &&
        selcetedChat?._id !== newMessage.chat._id
      ) {
        chatToUpdateCopy.unreadCounts[currentUserData?._id!] =
          (chatToUpdateCopy.unreadCounts[currentUserData?._id!] || 0) + 1;
      }

      prevChats[indexOfChatToUpdate] = chatToUpdateCopy;

      prevChats = [
        prevChats[indexOfChatToUpdate],
        ...prevChats.filter((chat) => chat._id !== newMessage.chat._id),
      ];

      dispatch(SetChats(prevChats));
    });
  }, [selcetedChat]);

  return (
    <div className="">
      {loading && (
        <div className="flex justify-center text-xl mt-20">
          <Spin />
        </div>
      )}
      <div className="flex flex-col gap-1 mt-5">
        {chats?.map((chat: any) => {
          return <ChatCard key={chat?._id} chat={chat} />;
        })}
      </div>
    </div>
  );
};

export default ChatList;
