import { useMessage } from "@/context/notification-context";
import { IChatState, SetChats } from "@/redux/chatSlice";
import { getAllChats } from "@/server-actions/chat";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatCard from "./chat-card";

const ChatList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { currentUserData } = useSelector((state: any) => state.user);
  const { chats }: IChatState = useSelector((state: any) => state.chat);
  const notification = useMessage();
  const getChats = async () => {
    setLoading(true);
    try {
      const response = await getAllChats(currentUserData?._id!);
      if (!response) throw new Error("Something went wrong");
      console.log(response);
      dispatch(SetChats(response));
    } catch (error: any) {
      notification(error?.message, "error");
    } finally {
      setLoading(false);
    }
  };
  console.log(chats, "here");
  useEffect(() => {
    getChats();
  }, []);
  return (
    <div className="">
      {loading && (
        <div className="flex justify-center text-xl mt-20">
          <Spin />
        </div>
      )}
      <div className="flex flex-col gap5 mt-5">
        {chats?.map((chat: any) => {
          return <ChatCard key={chat?._id} chat={chat} />;
        })}
      </div>
    </div>
  );
};

export default ChatList;
