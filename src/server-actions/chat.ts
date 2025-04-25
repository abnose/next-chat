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
      users: { $in: [userId] },
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

export const getChatById = async (chatId: string) => {
  try {
    const chat = await ChatModel.findOne({ _id: chatId });
    return JSON.parse(JSON.stringify(chat));
  } catch (error) {
    console.log(error);
  }
};

export const updateGroup = async ({ chatId, payload }: { chatId: string, payload: any }) => {
  console.log(chatId)
  console.log(payload)


  const file = payload.get("file") as File;

  const groupName = payload.get("groupName") as string;
  const groupBio = payload.get("groupBio") as string;
  const users = JSON.parse(payload.get("users")) as any;
  const createdBy = payload.get("createdBy") as string;
  const isGroupChat = payload.get("isGroupChat") as string;

  let imageUrl

  if (typeof file === "string") {
    imageUrl = file
  } else {
    const prevImageUrl = await getChatById(chatId);
    if (prevImageUrl?.groupProfilePicture) {
      imageUrl = await saveFileToDiskWithPath(file, "groupPic", prevImageUrl.groupProfilePicture);
    }
  }

  const data = {
    groupName,
    groupBio,
    users,
    createdBy,
    isGroupChat,
    groupProfilePicture: imageUrl,
  };

  try {
    const updatedChat = await ChatModel.findByIdAndUpdate(chatId, data);
    return JSON.parse(JSON.stringify(updatedChat));
  } catch (error) {
    console.log(error);
  }
};