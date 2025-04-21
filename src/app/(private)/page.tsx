"use client";
import { connectDB } from "@/config/db";
import Chats from "./_chat-components/chats";
import ChatArea from "./_chat-components/chat-area";
import { Divider } from "antd";

export default function Home() {
  connectDB();
  return (
    <div className="flex h-[85vh]">
      <Chats />
      <Divider type="vertical" className="h-full border-blue-300" />
      <ChatArea />
    </div>
  );
}
