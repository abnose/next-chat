import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RecipientInfo from "./recipient-info";
import socket from "@/config/socket-config";

const Recipient = () => {
  const [typing, setTyping] = useState(false);
  const [senderName, setSenderName] = useState("");
  const { selectedChat } = useSelector((state: any) => state.chat);
  const [showRecipientInfo, setShowRecipientInfo] = useState(false);
  let chatName = "";
  let chatImage = "";

  if (selectedChat?.isGroupChat) {
    chatName = selectedChat?.groupName;
    chatImage = selectedChat?.groupProfilePicture;
  } else {
    const otherUser = selectedChat?.users?.find(
      (user: any) => user?._id !== selectedChat?._id
    );
    chatName = otherUser?.name!;
    chatImage = otherUser?.profilePicture!;
  }

  const typingAnimation = () => {
    if (typing)
      return (
        <span className="text-green-700 text-xs">
          {selectedChat?.isGroupChat && senderName?.split(" ")[0] + " Is"}
          Typing ...
        </span>
      );
  };

  useEffect(() => {
    socket.on(
      "typing",
      ({ chat, senderName }: { chat: any; senderName: string }) => {
        if (chat?._id === selectedChat?._id) {
          setTyping(true);
          setTimeout(() => {
            setTyping(false);
          }, 3000);
          if (chat.isGroupChat) {
            setSenderName(senderName);
          }
        }
      }
    );

    return () => {
      socket.off("typing");
    };
  }, [selectedChat]);

  return (
    <div className="flex justify-between items-center py-3 px-5 border-0 border-b border-gray-200 border-solid bg-gray-400/5">
      <div
        className="flex gap-5 items-center cursor-pointer"
        onClick={() => setShowRecipientInfo(true)}
      >
        <img src={chatImage} alt="" className="w-10 h-10 rounded-full" />
        <div className="flex flex-col gap-1">
          <span className="text-gray-500 text-sm">{chatName}</span>
          {typingAnimation()}
        </div>
      </div>

      {showRecipientInfo && (
        <RecipientInfo
          showRecipientInfo={showRecipientInfo}
          setShowRecipientInfo={setShowRecipientInfo}
        />
      )}
    </div>
  );
};

export default Recipient;
