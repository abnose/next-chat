import { useMessage } from "@/context/notification-context";
import { IUserType } from "@/interfaces";
import { IChatState, SetChats } from "@/redux/chatSlice";
import { createNewChat } from "@/server-actions/chat";
import { getAllUsers } from "@/server-actions/users";
import { Button, Divider, Modal, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const NewChatModal = ({
  showNewChatModal,
  setShowNewChatModal,
}: {
  showNewChatModal: boolean;
  setShowNewChatModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const notification = useMessage();
  const { chats } = useSelector((state: any) => state.chat);
  const [users, setUsers] = useState<IUserType[]>([]);
  const [loading, setLoading] = useState(false);
  const { currentUserData } = useSelector((state: any) => state.user);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      if (!response) throw new Error("No Users Found");
      console.log(response);
      setUsers(response);
    } catch (error: any) {
      notification(error?.message, "error");
    } finally {
      setLoading(false);
    }
  };
  const dispatch = useDispatch();

  const onAddToChat = async (userId: string) => {
    try {
      setSelectedUserId(userId);
      setLoading(true);
      const response = await createNewChat({
        users: [userId, currentUserData?._id],
        createdBy: currentUserData?._id,
        isGroupChat: false,
        groupName: "",
        groupProfilePicture: "",
        groupBio: "",
        groupAdmins: [],
        unreadCounts: {},
      });
      if (!response) throw new Error("Something went wrong");
      notification("Chat created successfully", "success");
      console.log(response);
      dispatch(SetChats(response));
      setShowNewChatModal(false);
    } catch (error: any) {
      notification(error?.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Modal
      title={null}
      open={showNewChatModal}
      onCancel={() => setShowNewChatModal(false)}
      footer={null}
      centered
    >
      <div className="flex flex-col gap-3">
        <h1 className="text-primary text-center text-xl font-bol uppercase border-b-1 pb-2 border-gray-200">
          Create New Chat
        </h1>
        {loading && !selectedUserId && (
          <div className="flex justify-center text-xl mt-20">
            <Spin />
          </div>
        )}
        {!loading && users?.length > 0 && (
          <div className="flex flex-col">
            {users?.map((user: IUserType) => {
              const chatAlreadyCreated = chats?.find((chat: any) =>
                chat?.users?.find((u: IUserType) => u?._id == user?._id)
              );
              if (user?._id === currentUserData?._id || chatAlreadyCreated)
                return null;
              return (
                <>
                  <div
                    key={user?._id}
                    className="flex justify-between items-center my-2"
                  >
                    <div className="flex gap-5 items-center">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={user?.profilePicture}
                        alt=""
                      />
                      <span className="text-gray-500">{user?.name}</span>
                    </div>
                    <Button
                      loading={selectedUserId === user?._id && loading}
                      size="small"
                      onClick={() => onAddToChat(user?._id)}
                    >
                      Add To Chat
                    </Button>
                  </div>
                </>
              );
            })}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default NewChatModal;
