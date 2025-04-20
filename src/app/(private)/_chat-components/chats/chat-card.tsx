import { IChatType } from "@/interfaces";

const ChatCard = ({ chat }: { chat: IChatType }) => {
  let chatName =
    chat?.groupName || chat?.users?.map((user: any) => user?.name)?.join(", ");
  let chatImage = "";
  let lastMessage = chat?.lastMessage?.text || "No messages yet";
  let lastMessageSenderName = "";
  let lastMessageTime = chat?.lastMessage?.createdAt || "";
  return (
    <div className="flex justify-between">
      <div className="flex gap-5 items-center">
        <img src={chatImage} alt="" className="w-10 h-10 rounded full" />
        <span className="text-gray-500 text-sm">{chatName}</span>
      </div>
      <div className="">
        <span>{lastMessageTime}</span>
      </div>
    </div>
  );
};

export default ChatCard;
