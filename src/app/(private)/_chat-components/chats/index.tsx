import ChatHeader from "./chat-header";
import ChatList from "./chat-list";

const Chats = () => {
  return (
    <div className="w-[400px] h-full">
      <ChatHeader />
      <ChatList />
    </div>
  );
};

export default Chats;
