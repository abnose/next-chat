"use client";
import { IUserType } from "@/interfaces";
import { getCurrentUserFromMongoDB } from "@/server-actions/users";
import { Avatar, message } from "antd";
import { useEffect, useState } from "react";
import CurrentUserInfo from "./current-user-info";
import { useMessage } from "@/context/notification-context";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentUserData, SetOnLineUsers } from "@/redux/userSlice";
import socket from "@/config/socket-config";
const Header = () => {
  // const [currentUser, setCurrentUser] = useState<IUserType | null>(null);
  const [showCurrentUserInfo, setShowCurrentUserInfo] =
    useState<boolean>(false);
  const showMessage = useMessage();
  const { currentUserData } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const getCurrentUser = async () => {
    try {
      const response = await getCurrentUserFromMongoDB();
      if (response.error) throw new Error(response.error);
      dispatch(SetCurrentUserData(response as IUserType));
    } catch (error: any) {
      showMessage(error.message, "error");
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUserData) {
      socket.emit("join", currentUserData._id);

      socket.on("online-user-update", (users) => {
        dispatch(SetOnLineUsers(users));
      });
    }
  }, [currentUserData]);

  const pathname = usePathname();

  const privateRoute =
    pathname?.includes("sign-in") || pathname?.includes("sign-up");

  if (privateRoute) return <></>;

  return (
    currentUserData && (
      <div className="bg-blue-200 p-5 h-[10vh] flex justify-between items-center border-b border-solid border-orange-300">
        <div className="">
          <h1 className="text-2xl font-bold text-orange-400 uppercase">
            Next Chat
          </h1>
        </div>
        <div className="gap-5 flex items-center">
          <span className="text-sm">{currentUserData?.name}</span>
          <Avatar
            className="cursor-pointer"
            onClick={() => {
              setShowCurrentUserInfo(true);
            }}
            src={currentUserData?.profilePicture}
          ></Avatar>
        </div>

        {showCurrentUserInfo && (
          <CurrentUserInfo
            setShowCurrentUserInfo={setShowCurrentUserInfo}
            showCurrentUserInfo={showCurrentUserInfo}
          />
        )}
      </div>
    )
  );
};

export default Header;
