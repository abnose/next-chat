"use server";
import ChatModel from "@/models/chat-model";

export const createNewChat = async (payload: any) => {
  try {
    const newChat = await ChatModel.create(payload);
    const chats = await ChatModel.find({
      users: { $in: [payload.createdBy] },
    })
      .populate("users")
      .sort({ updatedAt: -1 });
    return JSON.parse(JSON.stringify(chats));
  } catch (error) {
    console.log(error);
  }
};

export const getAllChats = async (userId: string) => {
  try {
    const chats = await ChatModel.find({
      members: { $in: [userId] },
    })
      .populate("users")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });
    return JSON.parse(JSON.stringify(chats));
  } catch (error) {
    console.log(error);
  }
};
