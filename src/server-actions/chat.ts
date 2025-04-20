"use server";
import ChatModel from "@/models/chat-model";

export const createNewChat = async (payload: any) => {
  try {
    const newChat = await ChatModel.create(payload);
    return JSON.parse(JSON.stringify(newChat));
  } catch (error) {
    console.log(error);
  }
};

export const getAllChats = async (userId: string) => {
  try {
    const chats = await ChatModel.find({
      members: { $in: [userId] },
    }).populate("users");
    return JSON.parse(JSON.stringify(chats));
  } catch (error) {
    console.log(error);
  }
};
