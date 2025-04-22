import { IMessageType } from "@/interfaces";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { formatDate } from "@/helpers/date-format";
const Message = ({ message }: { message: IMessageType }) => {
  const { selectedChat } = useSelector((state: any) => state.chat);
  const { currentUserData } = useSelector((state: any) => state.user);
  const isLoggedInUserMessage = message.sender._id === currentUserData._id;

  if (isLoggedInUserMessage) {
    return (
      <div className="flex justify-end gap-2">
        <div className="flex flex-col gap-1">
          <p className="bg-blue-950 text-white py-2 px-5 rounded-xl rounded-br-none">
            {message.text}
          </p>
          <span className="text-gray-500 text-xs mr-auto">
            {dayjs(message.createdAt).format("HH:mm")}
          </span>
        </div>
        <img
          src={message.sender.profilePicture}
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
    );
  } else {
    return (
      <div className="flex gap-2">
        <img
          src={message?.sender?.profilePicture}
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
        <div className="flex flex-col gap-1">
          <span className="text-sm text-blue-300">{message.sender.name}</span>
          <p className="bg-gray-200 py-2 px-5 rounded-xl rounded-bl-none">
            {message.text}
          </p>
          <span className="text-gray-500 text-xs ml-auto">
            {formatDate(message.createdAt)}
          </span>
        </div>
      </div>
    );
  }
};

export default Message;
