import { Button, Flex } from "antd";
import { UserButton } from "@clerk/nextjs";
export default function Home() {
  return (
    <div className="p-10 w-full h-[100vh] flex justify-center items-center bg-amber-200">
      <UserButton />
    </div>
  );
}
