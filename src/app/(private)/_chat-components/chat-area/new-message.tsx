import { useMessage } from "@/context/notification-context";
import { sendNewMessage } from "@/server-actions/messages";
import { Button } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";

const NewMessage = () => {
  const [text, setText] = useState("");
  const { currentUserData } = useSelector((state: any) => state.user);
  const { selectedChat } = useSelector((state: any) => state.chat);
  const notification = useMessage();
  const onSendMessage = async () => {
    try {
      const dbPayload = {
        text,
        image: "",
        sender: currentUserData._id!,
        chat: selectedChat?._id!,
      };
      const response = await sendNewMessage(dbPayload);
      if (response?.error) throw new Error(response.error);
      setText("");
    } catch (error: any) {
      notification(error.message, "error");
    }
  };

  return (
    <div className="p-3 bg-gray-100 border-1 border-solid border-gray-200 flex gap-5">
      <div className=""></div>
      <div className="flex-1">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Type a message"
          className="w-full bg-white rounded-md border-1 border-solid h-[46px] px-3 border-gray-100 focus:outline-none focus:border-gray-500"
        />
      </div>
      <Button type="primary" onClick={onSendMessage}>
        SEND
      </Button>
    </div>
  );
};

export default NewMessage;
