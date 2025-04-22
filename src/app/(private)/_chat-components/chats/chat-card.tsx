import { formatDate } from "@/helpers/date-format";
import { IChatType } from "@/interfaces";
import { IChatState, SetSelectedChat } from "@/redux/chatSlice";
import { useDispatch, useSelector } from "react-redux";

const ChatCard = ({ chat }: { chat: IChatType }) => {
  const { currentUserData } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const { selectedChat }: IChatState = useSelector((state: any) => state.chat);
  let chatName = "";
  let chatImage = "";

  if (chat?.isGroupChat) {
    chatName = chat?.groupName;
    chatImage = chat?.groupProfilePicture;
  } else {
    const otherUser = chat?.users?.find(
      (user: any) => user?._id !== currentUserData?._id
    );
    chatName = otherUser?.name!;
    chatImage = otherUser?.profilePicture!;
  }

  const isSelected = selectedChat?._id === chat?._id;

  let lastMessage = "";
  let lastMessageSenderName = "";
  let lastMessageTime = "";

  if (chat?.lastMessage) {
    lastMessage = chat?.lastMessage?.text;
    lastMessageSenderName =
      chat?.lastMessage?.sender?._id === currentUserData?._id
        ? "You :"
        : `${chat.lastMessage.sender.name.split(" ")[0]} :`;
    lastMessageTime = formatDate(chat?.lastMessage?.createdAt);
  }

  return (
    <div
      onClick={() => dispatch(SetSelectedChat(chat))}
      className={`flex justify-between hover:bg-gray-100 py-3 px-2 cursor-pointer rounded-md ${
        isSelected ? "bg-gray-50 border-solid border border-gray-200" : ""
      }`}
    >
      <div className="flex gap-5 items-center">
        <img src={chatImage} alt="" className="w-10 h-10 rounded-full" />
        <div className="flex flex-col gap-1">
          <span className="text-gray-700 text-sm">{chatName}</span>
          <span className="text-gray-500 text-xs">
            {lastMessageSenderName}
            {lastMessage}
          </span>
        </div>
      </div>
      <div className="">
        <span className="text-xs text-gray-500">{lastMessageTime}</span>
      </div>
    </div>
  );
};

export default ChatCard;
