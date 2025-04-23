"use server";
import { saveFileToDiskWithPath } from "@/helpers/uploadFile";
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

export const createNewGroup = async (formData: any) => {
  const file = formData.get("file") as File;

  const groupName = formData.get("groupName") as string;
  const groupBio = formData.get("groupBio") as string;
  const users = JSON.parse(formData.get("users")) as any;
  const createdBy = formData.get("createdBy") as string;
  const isGroupChat = formData.get("isGroupChat") as string;
  const imageUrl = await saveFileToDiskWithPath(file, "groupPic");

  try {
    const newGroup = await ChatModel.create({
      groupName,
      groupBio,
      users,
      createdBy,
      isGroupChat,
      groupProfilePicture: imageUrl,
    });
    const chats = await ChatModel.find({
      users: { $in: [createdBy] },
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
      .populate("createdBy")
      .populate({
        path: "lastMessage",
        populate: {
          path: "sender",
        },
      })
      .sort({ updatedAt: -1 });
    return JSON.parse(JSON.stringify(chats));
  } catch (error) {
    console.log(error);
  }
};
