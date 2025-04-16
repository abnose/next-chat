// import { Button, Flex } from "antd";
// import { UserButton } from "@clerk/nextjs";
// import { connectDB } from "@/config/db";

import { connectDB } from "@/config/db";

// import { getCurrentUserFromMongoDB } from "@/server-actions/users";
export default async function Home() {
  // const loggedInUserData = await getCurrentUserFromMongoDB();

  // console.log(loggedInUserData);
  connectDB();
  return (
    // <div className="p-10 w-full h-[100vh] text-black flex flex-col flex justify-center items-center bg-amber-200">
    //   <UserButton />
    // </div>
    <div className="p-5 text-sm">HomePage</div>
  );
}
