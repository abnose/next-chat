"use server";

import MessageModel from "@/models/message-model";
import ChatModel from "@/models/chat-model";

export const sendNewMessage = async (payload: {
  text?: string;
  img?: string;
  chat: string;
  sender: string;
}) => {
  try {
    const newMessage = new MessageModel({
      text: payload.text,
      image: payload.img,
      chat: payload.chat,
      sender: payload.sender,
    });
    await newMessage.save();
    await ChatModel.findByIdAndUpdate(payload.chat, {
      lastMessage: newMessage._id,
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
      .populate("chat")
      .sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(messages));
  } catch (err: any) {
    console.log(err);
    return {
      error: err.message,
    };
  }
};
