"use client";
import { connectDB } from "@/config/db";
import { IUserType } from "@/interfaces";
import { getCurrentUserFromMongoDB } from "@/server-actions/users";
import { Avatar, message } from "antd";
import { useEffect, useState } from "react";
import CurrentUserInfo from "./current-user-info";

const Header = () => {
  connectDB();
  const [currentUser, setCurrentUser] = useState<IUserType | null>(null);
  const [showCurrentUserInfo, setShowCurrentUserInfo] =
    useState<boolean>(false);

  const getCurrentUser = async () => {
    try {
      const response = await getCurrentUserFromMongoDB();
      if (response.error) throw new Error(response.error);
      setCurrentUser(response);
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div className="bg-blue-200 p-5 flex justify-between items-center border-b border-solid border-orange-300">
      <div className="">
        <h1 className="text-2xl font-bold text-orange-400 uppercase">
          Next Chat
        </h1>
      </div>
      <div className="gap-5 flex items-center">
        <span className="text-sm">{currentUser?.name}</span>
        <Avatar
          className="cursor-pointer"
          onClick={() => {
            setShowCurrentUserInfo(true);
          }}
          src={currentUser?.profilePicture}
        ></Avatar>
      </div>

      {showCurrentUserInfo && (
        <CurrentUserInfo
          currentUser={currentUser}
          setShowCurrentUserInfo={setShowCurrentUserInfo}
          showCurrentUserInfo={showCurrentUserInfo}
        />
      )}
    </div>
  );
};

export default Header;
