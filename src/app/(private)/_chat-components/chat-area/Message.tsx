import { IMessageType } from "@/interfaces";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { formatDate } from "@/helpers/date-format";
const Message = ({ message }: { message: IMessageType }) => {
  const { selectedChat } = useSelector((state: any) => state.chat);
  const { currentUserData } = useSelector((state: any) => state.user);
  const isLoggedInUserMessage = message.sender._id === currentUserData._id;
  let read = false;

  if (selectedChat?.users?.length - 1 == message?.readBy?.length) {
    read = true;
  }

  if (isLoggedInUserMessage) {
    return (
      <div className="flex justify-end gap-2">
        <div className="flex flex-col gap-1">
          {message.text && (
            <p className="bg-blue-950 text-white py-2 px-5 rounded-xl rounded-br-none">
              {message.text}
            </p>
          )}
          {message.image && (
            <img
              src={message.image}
              alt="message-image"
              className="w-32 h-32 rounded-xl rounded-br-none object-cover"
            />
          )}
          <div className="flex justify-between">
            <span className="text-gray-500 text-xs mr-auto">
              {dayjs(message.createdAt).format("HH:mm")}
            </span>
            <i
              className={`ri-check-double-line ${
                read ? "text-blue-500" : "text-gray-500"
              }`}
            ></i>
          </div>
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
          {message.text && (
            <p className="bg-gray-200 py-2 px-5 rounded-xl rounded-bl-none">
              {message.text}
            </p>
          )}
          {message.image && (
            <img
              src={message.image}
              alt="message-image"
              className="w-32 h-32 rounded-xl rounded-bl-none object-cover"
            />
          )}
          <span className="text-gray-500 text-xs ml-auto">
            {formatDate(message.createdAt)}
          </span>
        </div>
      </div>
    );
  }
};

export default Message;
