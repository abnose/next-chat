"use client";
import { connectDB } from "@/config/db";
import Chats from "./_chat-components/chats";
import ChatArea from "./_chat-components/chat-area";
import { Divider } from "antd";

export default function Home() {
  // connectDB();
  return (
    <div className="flex h-[90.5vh]">
      <Chats />
      <Divider
        type="vertical"
        style={{ height: "100% !important", padding: 0, margin: 0 }}
        className="h-full border-1 border-orange-200"
      />
      <ChatArea />
    </div>
  );
}
