"use server";
import { connectDB } from "@/config/db";
import UserModel from "@/models/user-model";
import { currentUser, EmailAddress } from "@clerk/nextjs/server";
export const getCurrentUserFromMongoDB = async () => {
  try {
    const clerkUser = await currentUser();

    const mongoUser = await UserModel.findOne({ clerkUserId: clerkUser?.id });

    if (mongoUser) {
      return JSON.parse(JSON.stringify(mongoUser));
    }

    const newUserPayload = {
      clerkUserId: clerkUser?.id,
      name: clerkUser?.firstName + " " + clerkUser?.lastName,
      userName: clerkUser?.username,
      email: clerkUser?.emailAddresses[0].emailAddress || "",
      profilePicture: clerkUser?.imageUrl || "",
      createdAt: clerkUser?.createdAt || "",
    };

    const newUser = await UserModel.create(newUserPayload);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
