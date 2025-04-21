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
  return (
    <div
      onClick={() => dispatch(SetSelectedChat(chat))}
      className={`flex justify-between hover:bg-gray-100 py-3 px-2 cursor-pointer rounded-md ${
        isSelected ? "bg-gray-50 border-solid border border-gray-200" : ""
      }`}
    >
      <div className="flex gap-5 items-center">
        <img src={chatImage} alt="" className="w-10 h-10 rounded-full" />
        <span className="text-gray-500 text-sm">{chatName}</span>
      </div>
      <div className="">
        <span>{lastMessageTime}</span>
      </div>
    </div>
  );
};

export default ChatCard;
