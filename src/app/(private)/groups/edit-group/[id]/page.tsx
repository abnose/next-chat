import Link from "next/link";
import GroupForm from "../../_components/group-form";
import { getAllUsers } from "@/server-actions/users";
import { getChatById } from "@/server-actions/chat";

const EditGroup = async ({ params }: { params: any }) => {
  const { id } = params;
  const users = await getAllUsers();
  const chats = await getChatById(id);
  return (
    <div className="p-5">
      <Link
        className="text-primary border border-primary px-5 py-2 no-underline border-solid text-sm"
        href="/"
      >
        Back To Chats
      </Link>
      <h1 className="text-primary text-xl font-bold py-2 uppercase">
        Create Group Chat
      </h1>
      <GroupForm
        initialData={chats}
        users={JSON.parse(JSON.stringify(users))}
      />
    </div>
  );
};

export default EditGroup;
