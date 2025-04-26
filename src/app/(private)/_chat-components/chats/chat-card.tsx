import { formatDate } from "@/helpers/date-format";
import { IChatType } from "@/interfaces";
import { IChatState, SetSelectedChat } from "@/redux/chatSlice";
import { useDispatch, useSelector } from "react-redux";

const ChatCard = ({ chat }: { chat: IChatType }) => {
  const { currentUserData, onLineUsers } = useSelector(
    (state: any) => state.user
  );
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
        : `${chat?.lastMessage?.sender?.name?.split(" ")[0]} :`;
    lastMessageTime = formatDate(chat?.lastMessage?.createdAt);
  }

  const onReadCounts = () => {
    if (
      !chat?.unreadCounts ||
      !chat?.unreadCounts?.[currentUserData?._id] ||
      chat._id == selectedChat?._id
    ) {
      return null;
    } else {
      return (
        <div className="bg-blue-300 border-1 border-solid border-gray-400 h-5 w-5 rounded-full flex justify-center items-center absolute right-[-20%] top-[-55%]">
          <span className="text-xs text-white">
            {chat?.unreadCounts?.[currentUserData?._id] > 9
              ? "9+"
              : chat?.unreadCounts?.[currentUserData?._id]}
          </span>
        </div>
      );
    }
  };

  const onLineIndicator = () => {
    if (chat?.isGroupChat) return null;

    const recipientId = chat.users.find(
      (user: any) => user._id !== currentUserData._id
    )?._id;

    if (onLineUsers?.includes(recipientId)) {
      return <div className="bg-green-500 h-2 w-2 rounded-full"></div>;
    } else {
      return <></>;
    }
  };

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
          <span className="text-gray-700 text-sm gap-2 flex items-center">
            {chatName} {onLineIndicator()}
          </span>
          <span className="text-gray-500 text-xs">
            {lastMessageSenderName}
            {lastMessage}
          </span>
        </div>
      </div>
      <div className=" relative">
        <span className="text-xs text-gray-500">{lastMessageTime}</span>
        {onReadCounts()}
      </div>
    </div>
  );
};

export default ChatCard;
