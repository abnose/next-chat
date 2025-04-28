import ChatHeader from "./chat-header";
import ChatList from "./chat-list";

const Chats = () => {
  return (
    <div className="lg:w-[400px] bg-gray-50 w-[350px] h-full p-3">
      <ChatHeader />
      <ChatList />
    </div>
  );
};

export default Chats;
