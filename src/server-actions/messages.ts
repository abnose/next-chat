"use server";

import MessageModel from "@/models/message-model";
import ChatModel from "@/models/chat-model";
import { saveFileToDiskWithPath } from "@/helpers/uploadFile";

export const sendNewMessage = async (payload: {
  text?: string;
  image?: string;
  chat: string;
  sender: string;
  socketMessageId: string;
}) => {
  try {
    const newMessage = new MessageModel({
      text: payload.text,
      image: payload.image,
      chat: payload.chat,
      sender: payload.sender,
      socketMessageId: payload.socketMessageId,
    });
    await newMessage.save();

    const existingChat = await ChatModel.findById(payload.chat);
    const existingUnreadCounts = existingChat?.unreadCounts;

    existingChat?.users.forEach((user) => {
      const userIdInString = user.toString();
      if (userIdInString === payload.sender) return;
      if (existingUnreadCounts?.[userIdInString]) {
        existingUnreadCounts[userIdInString] += 1;
      } else {
        existingUnreadCounts[userIdInString] = 1;
      }
    });

    await ChatModel.findByIdAndUpdate(payload.chat, {
      lastMessage: newMessage._id,
      unreadCounts: existingUnreadCounts,
      lastMessageAt: new Date().toISOString(),
    });

    return { message: "Send Successfully" };
  } catch (err: any) {
    console.log(err);
    return {
      error: err.message,
    };
  }
};

export const getAllMessages = async (chatId: string) => {
  try {
    const messages = await MessageModel.find({ chat: chatId })
      .populate("sender")
      .populate("chat");

    return JSON.parse(JSON.stringify(messages));
  } catch (err: any) {
    console.log(err);
    return {
      error: err.message,
    };
  }
};

export const readAllMessages = async ({
  chatId,
  userId,
}: {
  chatId: string;
  userId: string;
}) => {
  try {
    await MessageModel.updateMany(
      { chat: chatId, sender: { $ne: userId }, readBy: { $nin: [userId] } },
      { $addToSet: { readBy: userId } }
    );
    const existingChat = await ChatModel.findById(chatId);
    const existingUnreadCounts = existingChat?.unreadCounts;
    const newUnreadCounts = { ...existingUnreadCounts, [userId]: 0 };
    await ChatModel.findByIdAndUpdate(chatId, {
      unreadCounts: newUnreadCounts,
    });

    return { message: "Read Successfully" };
  } catch (err: any) {
    console.log(err);
    return {
      error: err.message,
    };
  }
};

export const uploadImage = async (formData: any) => {
  try {
    const file = formData.get("file") as File;
    const imageUrl = await saveFileToDiskWithPath(file, "chatImage");
    return {
      imageUrl,
    };
  } catch (err: any) {
    return {
      error: err.message,
    };
  }
};
