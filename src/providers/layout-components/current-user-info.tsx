import { IUserType } from "@/interfaces";
import { useClerk } from "@clerk/nextjs";
import { Button, Divider, Drawer, message, Upload } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMessage } from "@/context/notification-context";
import { useDispatch, useSelector } from "react-redux";
import { onProfilePictureUpdate } from "@/server-actions/users";
import { SetCurrentUserData, UserState } from "@/redux/userSlice";
const CurrentUserInfo = ({
  showCurrentUserInfo,
  setShowCurrentUserInfo,
}: {
  showCurrentUserInfo: boolean;
  setShowCurrentUserInfo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { currentUserData } = useSelector((state: any) => state.user);
  const dispath = useDispatch();
  const showMessage = useMessage();
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
    try {
      setLoading(true);
      await signOut();
      router.push("/sign-in");
      showMessage("Logged out successfully", "success");
      setShowCurrentUserInfo(false);
    } catch (error: any) {
      showMessage(error?.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("file", selectedFile as File);
      formData.append("userId", currentUserData._id); // Add user ID to FormData
      const response = await onProfilePictureUpdate(formData);
      console.log(response);
      dispath(SetCurrentUserData(response as UserState));
      showMessage("Profile picture updated successfully", "success");
      setShowCurrentUserInfo(false);
    } catch (error: any) {
      showMessage(error?.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      className=""
      open={showCurrentUserInfo}
      onClose={() => setShowCurrentUserInfo(false)}
      title="profile"
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 justify-center items-center">
          <img
            className="w-28 h-28 rounded-full"
            src={
              selectedFile
                ? URL.createObjectURL(selectedFile)
                : currentUserData?.profilePicture
            }
            alt="profile"
          />
          <Upload
            beforeUpload={(file) => {
              setSelectedFile(file);
              return false;
            }}
            showUploadList={false}
          >
            {/* Change profile picture */}
            <span className="text-gray-700 cursor-pointer text-center w-full text-nowrap">
              {selectedFile ? selectedFile?.name : "Change profile picture"}
            </span>
          </Upload>
          {selectedFile && (
            <Button
              onClick={handleUpload}
              loading={loading}
              className="w-50 mt-2"
              block
            >
              change
            </Button>
          )}
        </div>

        <Divider className="my-1 border-gray-200" />
        <div className="flex flex-col gap-5">
          {getProperty("Name", currentUserData?.name)}
          {getProperty("Username", currentUserData?.userName)}
          {getProperty("id", currentUserData?._id)}
          {getProperty(
            "Joined On",
            dayjs(currentUserData?.createdAt)?.format("DD MMM YYYY hh:mm A")
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
