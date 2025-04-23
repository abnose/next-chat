import { Dropdown, MenuProps } from "antd";
import { useState } from "react";
import NewChatModal from "./new-chat-modal";
import { useRouter } from "next/navigation";
const ChatHeader = () => {
  const [showNewChatModal, setShowChatModal] = useState(false);
  const router = useRouter();
  const items: MenuProps["items"] = [
    {
      label: "New Chat",
      key: "1",
      onClick: () => setShowChatModal(true),
    },
    {
      label: "New Group",
      key: "2",
      onClick: () => router.push("/groups/create-group"),
    },
  ];
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl text-gray-500 font-bold uppercase">My Chats</h1>
        <div className="">
          <Dropdown.Button className="w-max" menu={{ items }} size="small">
            New
          </Dropdown.Button>
        </div>
      </div>

      <input
        type="text"
        placeholder="search chats ..."
        className="bg-gray-100 w-full border border-gray-300 outline-none border-solid rounded-md px-2 h-14 mt-5 focus:outline-none focus:border-primary"
      />

      {showNewChatModal && (
        <NewChatModal
          showNewChatModal={showNewChatModal}
          setShowNewChatModal={setShowChatModal}
        />
      )}
    </>
  );
};

export default ChatHeader;
