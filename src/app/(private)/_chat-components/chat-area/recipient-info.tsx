import { formatDate } from "@/helpers/date-format";
import { Divider, Drawer } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const RecipientInfo = ({
  showRecipientInfo,
  setShowRecipientInfo,
}: {
  showRecipientInfo: boolean;
  setShowRecipientInfo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { selectedChat } = useSelector((state) => state.chat);
  const { currentUserData } = useSelector((state) => state.user);

  let chatName = "";
  let chatImage = "";

  if (selectedChat?.isGroupChat) {
    chatName = selectedChat?.groupName;
    chatImage = selectedChat?.groupProfilePicture;
  } else {
    const recipient = selectedChat?.users.find(
      (user) => user._id !== selectedChat?._id
    );
    chatName = recipient?.name;
    chatImage = recipient?.profilePicture;
  }

  const getProperty = (key: string, value: string) => {
    return (
      <div className="flex flex-col">
        <span className="font-semibold text-gray-500">{key}</span>
        <span className="text-gray-400">{value}</span>
      </div>
    );
  };

  return (
    <Drawer
      title={chatName}
      placement="right"
      onClose={() => setShowRecipientInfo(false)}
      open={showRecipientInfo}
      width={500}
    >
      <div className="flex justify-center flex-col items-center gap-5">
        <img src={chatImage} alt="" className="w-28 h-28 rounded-full" />
        <span className="text-gray-700">{chatName}</span>
      </div>

      <Divider className="my-3 border-gray-200" />

      <div className="flex flex-col gap-5">
        {getProperty("Created On", formatDate(selectedChat?.createdAt!))}
        {getProperty("Created By", selectedChat?.createdBy?.name)}
      </div>
    </Drawer>
  );
};

export default RecipientInfo;
