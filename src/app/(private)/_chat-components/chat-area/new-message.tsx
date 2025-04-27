import socket from "@/config/socket-config";
import { useMessage } from "@/context/notification-context";
import { sendNewMessage } from "@/server-actions/messages";
import { Button } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
const NewMessage = () => {
  const [text, setText] = useState("");
  const { currentUserData } = useSelector((state: any) => state.user);
  const { selectedChat } = useSelector((state: any) => state.chat);
  const inputRef = useState(null);
  const notification = useMessage();
  const onSendMessage = async () => {
    try {
      if (!text) return;

      const commonPayload = {
        text,
        image: "",
        socketMessageId: dayjs().unix(),
      };

      const socketPayload = {
        ...commonPayload,
        chat: selectedChat,
        sender: currentUserData,
      };

      socket.emit("send-new-message", socketPayload);

      const dbPayload = {
        ...commonPayload,
        sender: currentUserData._id!,
        chat: selectedChat?._id!,
      };
      await sendNewMessage(dbPayload);
      setShowEmojiPicker(false);
      setText("");
    } catch (error: any) {
      notification(error.message, "error");
    }
  };

  useEffect(() => {
    socket.emit("typing", {
      chat: selectedChat,
      senderId: currentUserData?._id,
      senderName: currentUserData?.name,
    });
  }, [text, selectedChat]);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  return (
    <div className="p-3 bg-gray-100 border-1 border-solid border-gray-200 flex gap-5 relative">
      <div className="">
        {showEmojiPicker && (
          <div className=" absolute left-0 bottom-20">
            <EmojiPicker
              onEmojiClick={(e) => setText((prev) => prev + e.emoji)}
              height={350}
            />
          </div>
        )}
        <Button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="border-gray-300"
        >
          {showEmojiPicker ? (
            <i className="ri-close-fill"></i>
          ) : (
            <i className="ri-emoji-sticker-line"></i>
          )}
        </Button>
      </div>
      <div className="flex-1">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Type a message"
          ref={inputRef as any}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSendMessage();
            }
          }}
          className="w-full bg-white rounded-md border-1 border-solid h-[46px] px-3 border-gray-100 focus:outline-none focus:border-gray-500"
        />
      </div>
      <Button type="primary" onClick={onSendMessage}>
        <i className="ri-send-plane-fill"></i>
      </Button>
    </div>
  );
};

export default NewMessage;
