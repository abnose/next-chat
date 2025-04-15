import { IUserType } from "@/interfaces";
import { useClerk } from "@clerk/nextjs";
import { Button, Divider, Drawer, message } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import useMessageApi from "@/helpers/useMessageApi";
import useMessage from "antd/es/message/useMessage";
const CurrentUserInfo = ({
  currentUser,
  showCurrentUserInfo,
  setShowCurrentUserInfo,
}: {
  currentUser: IUserType | null;
  showCurrentUserInfo: boolean;
  setShowCurrentUserInfo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState(false);
  const { notification } = useMessage();
  //   const { notification, setMessageApi } = useMessageApi();
  const router = useRouter();
  const getProperty = (key: string, value: string) => {
    return (
      <div className="flex flex-col">
        <span className="font-semibold text-gray-500">{key}</span>
        <span className="text-gray-400">{value}</span>
      </div>
    );
  };

  const { signOut } = useClerk();

  const onLogout = async () => {
    console.log("aaaa");
    notification("hallow", "error");
    // try {
    //   setLoading(true);
    //   await signOut();
    //   router.push("/sign-in");
    // } catch (error) {
    //   message.error(error.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <Drawer
      className=""
      open={showCurrentUserInfo}
      onClose={() => setShowCurrentUserInfo(false)}
      title="profile"
    >
      {setMessageApi}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 justify-center items-center">
          <img
            className="w-28 h-28 rounded-full"
            src={currentUser?.profilePicture}
            alt="profile"
          />
          <span className="text-gray-700 cursor-pointer">
            Change profile picture
          </span>
        </div>

        <Divider className="my-1 border-gray-200" />
        <div className="flex flex-col gap-5">
          {getProperty("Name", currentUser?.name)}
          {getProperty("Username", currentUser?.userName)}
          {getProperty("id", currentUser?._id)}
          {getProperty(
            "Joined On",
            dayjs(currentUser?.createdAt)?.format("DD MMM YYYY hh:mm A")
          )}
        </div>
        <div className="mt-5">
          <Button onClick={onLogout} loading={loading} className="w-full" block>
            Logout
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default CurrentUserInfo;
