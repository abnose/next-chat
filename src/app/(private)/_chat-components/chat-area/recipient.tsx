import { useState } from "react";
import { useSelector } from "react-redux";
import RecipientInfo from "./recipient-info";

const Recipient = () => {
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

  return (
    <div className="flex justify-between items-center py-3 px-5 border-0 border-b border-gray-200 border-solid bg-gray-400/5">
      <div
        className="flex gap-5 items-center cursor-pointer"
        onClick={() => setShowRecipientInfo(true)}
      >
        <img src={chatImage} alt="" className="w-10 h-10 rounded-full" />
        <span className="text-gray-500 text-sm">{chatName}</span>
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
