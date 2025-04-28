import { formatDate } from "@/helpers/date-format";
import { Button, Divider, Drawer } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const RecipientInfo = ({
  showRecipientInfo,
  setShowRecipientInfo,
}: {
  showRecipientInfo: boolean;
  setShowRecipientInfo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const { selectedChat } = useSelector((state) => state.chat);
  const { currentUserData } = useSelector((state) => state.user);

  let chatName = "";
  let chatImage = "";

  if (selectedChat?.isGroupChat) {
    chatName = selectedChat?.groupName;
    chatImage = selectedChat?.groupProfilePicture;
  } else {
    const recipient = selectedChat?.users.find(
      (user) => user._id !== currentUserData?._id
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

      <Divider className=" border-gray-200" />
      {selectedChat?.isGroupChat && (
        <div className="flex flex-col gap-5 overflow-y-scroll max-h-[300px]">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {selectedChat?.users?.length} Members
            </span>
            <Button
              onClick={() =>
                router.push(`/groups/edit-group/${selectedChat?._id}`)
              }
              size="small"
              className="mr-5"
            >
              Edit Group
            </Button>
          </div>
          {selectedChat?.users?.map((user: any) => (
            <div key={user?._id} className="flex gap-5 items-center">
              <img
                src={user?.profilePicture}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-gray-500">
                  {user?.name}
                </span>
                <span className="text-gray-400">
                  {user?._id === selectedChat?.groupAdmin?._id
                    ? "Admin"
                    : "Member"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <Divider className="my-3 border-gray-200" />

      <div className="flex flex-col gap-5">
        {getProperty("Created On", formatDate(selectedChat?.createdAt!))}
        {getProperty("Created By", selectedChat?.createdBy?.name)}
      </div>
    </Drawer>
  );
};

export default RecipientInfo;
