import { useSelector } from "react-redux";
import Messages from "./messages";
import Recipient from "./recipient";
import NewMessage from "./new-message";

const ChatArea = () => {
  const { selectedChat } = useSelector((state: any) => state.chat);

  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center flex flex-col items-center justify-center">
          <img
            width={150}
            height={150}
            src="/google-messages-icon.svg"
            alt="no chat selected"
          />
          <p className="text-gray-500 mt-5">Select Chat To Start Message</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-between">
      <Recipient />
      <Messages />
      <NewMessage />
    </div>
  );
};

export default ChatArea;
